// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic', 'ngCordova', 'firebase'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

.controller('AppCtrl', function($scope, $cordovaCamera, $ionicPlatform, $http, $firebase) {
  var firebaseRef = new Firebase("https://clow.firebaseio.com");
  $scope.code = Math.floor(Math.random() * 10000);
  $scope.showForm = true;
  $scope.showCode = false;
  $scope.showIllness = false;

  $scope.submitForm = function(firstName, lastName) {
    $ionicPlatform.ready(function() {
      var options = {
        destinationType: Camera.DestinationType.DATA_URL,
        sourceType: Camera.PictureSourceType.CAMERA
      };

      $cordovaCamera.getPicture(options).then(function(imageURI) {
        var options = {
          "method": "POST",
          "url": "https://api.imgur.com/3/image",
          "headers": {
            "Authorization": "Client-ID a2e67e0f711ee48"
          },
          "data": { "image": imageURI, "type": "base64" }
        };

        $http(options).then(function(res) {
          console.log(res);
          var imgLink = res.data.data.link;
          console.log(imgLink);

          var config = {
            "method": "POST",
            "url": "https://api.projectoxford.ai/emotion/v1.0/recognize",
            "headers": {
              "Ocp-Apim-Subscription-Key": "7af2742a55ff4cc7bdc90afd9804bf14",
              "Content-Type": "application/json"
            },
            "data": { "url": imgLink }
          };

          $http(config).then(function(res) {
            $scope.showForm = false;

            $scope.anger = res.data[0].scores.anger;
            $scope.contempt = res.data[0].scores.contempt;
            $scope.disgust = res.data[0].scores.disgust;
            $scope.fear = res.data[0].scores.fear;
            $scope.happiness = res.data[0].scores.happiness;
            $scope.neutral = res.data[0].scores.neutral;
            $scope.sadness = res.data[0].scores.sadness;
            $scope.surprise = res.data[0].scores.surprise;

            $scope.firstName = firstName;
            $scope.lastName = lastName;

            console.log(res);

            var userRef = firebaseRef.child("user");
            userRef.set({
              "firstname": firstName,
              "lastname": lastName,
              "code": $scope.code,
              "room": "G-5",
              "time": 7
            })

            $scope.showCode = true;
          }, function(err) {
            console.log(err);
          })
        }, function(err) {
          console.log(err);
        });

      }, function(err) {
        // error
      });
    });
  }

  $scope.backToStaff = function() {
    $scope.showCode = false;

    var options = {
      "method": "POST",
      "url": "https://europewest.services.azureml.net/workspaces/3646ada8ed934009af6f6b3bfd47c5cb/services/57eeebd63acd4d34b6a88034f79123ec/execute?api-version=2.0&details=true",
      "headers": {
        "Authorization": "Bearer o+MRy+YMpZvCD90puFu3k8/jc33NVNkLMqB+yZa2Z1RI7i2MU6R9yYIzmtb13vOVpzpWnsWOj0tkQuO6Qt2WRw==",
        "Content-Type": "application/json"
      },
      "data": {
        "Inputs": {
          "input1": {
            "ColumnNames": [
              "Illness",
              "Anger",
              "Contempt",
              "Disgust",
              "Fear",
              "Happiness",
              "Neutral",
              "Sadness",
              "Surprise"
            ],
            "Values": [
              [
                "value",
                $scope.anger,
                $scope.contempt,
                $scope.disgust,
                $scope.fear,
                $scope.happiness,
                $scope.neutral,
                $scope.sadness,
                $scope.surprise
              ],
              [
                "value",
                $scope.anger,
                $scope.contempt,
                $scope.disgust,
                $scope.fear,
                $scope.happiness,
                $scope.neutral,
                $scope.sadness,
                $scope.surprise
              ]
            ]
          }
        },
        "GlobalParameters": {}
      }
    };

    $http(options).then(function(res) {
      console.log(res);
    })

    $scope.showIllness = true;
  }
})