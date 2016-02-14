# Clow

![Clow Logo](https://raw.githubusercontent.com/chriswongtv/clow-clinic/master/clow-clinic/www/img/clow.png)

## Inspiration
Patients usually have to go through multiple diagnosis before getting the right doctor. With the astonishing computational power we have today, we could use predictive analysis to suggest the patients' potential illness.

## What it does
Clow takes a picture of the patient's face during registration and run it through an emotion analysis algorithm. With the "scores" that suggest the magnitude of a certain emotional trait, Clow matches these data with the final diagnosis result given by the doctor to predict illnesses.

## How we built it
We integrated machine learning and emotion analysis algorithms from Microsoft Azure cloud services on our Ionic-based app to predict the trends. We "trained" our machine by pairing the "scores" of images of sick patients with its illness, allowing it to predict illnesses based on the "scores".

## Challenges we ran into
All of us are new to machine learning and this has proved to be a challenge to all of us. Fortunately, Microsoft's representative was really helpful and guided us through the process. We also had a hard time writing the code to upload the image taken from the camera to a cloud server in order to run it through Microsoft's emotion analysis API, since we have to encode the image before uploading it.

## Accomplishments that we're proud of
Learning a new skill over a weekend and deploy it on a working prototype ain't easy. We did that, not one but two skills, over a weekend. And it's machine learning and emotion analysis. And they are actually the main components that powers our product.

## What we learned
We all came in with zero knowledge of machine learning and now we are able to walk away with a good idea of what it is. Well, at least we can visualize it now, and we are excited to work with machine learning and unleash its potential in the future.

## What's next for Clow
Clow needs the support of medical clinics and hospitals in order to be deployed. As the correlation between emotion and illness is still relatively unproven, research studies have to be done in order to prove its effectiveness. It may not be effectively produce results in the beginning, but if Clow analyzes thousands of patients' emotion and illness, it can actually very accurately yield these results.