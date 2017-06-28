# PLANIT
Thinkful (https://www.thinkful.com/) Final portofolio project. Using SkyScanner's API to help user calculate their travelling cost.

![home-page](https://github.com/andreasadinata/final-capstone-project/blob/master/public/screenshot/Screenshot%202017-06-27%2018.20.15.png)

![people's-plan](https://github.com/andreasadinata/final-capstone-project/blob/master/public/screenshot/Screenshot%202017-06-27%2018.20.44.png)

![why-travelling](https://github.com/andreasadinata/final-capstone-project/blob/master/public/screenshot/Screenshot%202017-06-27%2018.21.01.png)

![about-PLANIT](https://github.com/andreasadinata/final-capstone-project/blob/master/public/screenshot/Screenshot%202017-06-27%2018.21.12.png)

![flight-not-found](https://github.com/andreasadinata/final-capstone-project/blob/master/public/screenshot/Screenshot%202017-06-27%2018.22.08.png)

![flight-found](https://github.com/andreasadinata/final-capstone-project/blob/master/public/screenshot/Screenshot%202017-06-27%2018.22.51.png)

![accomodation](https://github.com/andreasadinata/final-capstone-project/blob/master/public/screenshot/Screenshot%202017-06-27%2018.23.07.png)

![food-transportation](https://github.com/andreasadinata/final-capstone-project/blob/master/public/screenshot/Screenshot%202017-06-27%2018.23.16.png)

![input-title](https://github.com/andreasadinata/final-capstone-project/blob/master/public/screenshot/Screenshot%202017-06-27%2018.23.51.png)

![plan-submitted](https://github.com/andreasadinata/final-capstone-project/blob/master/public/screenshot/Screenshot%202017-06-27%2018.24.23.png)

## Introduction
I came up with the name PLANIT because of the two words "Plan" and "It". Personally, I love to spend most of my long weekend
by travelling outside of my place, and this website can be a simple calculator to estimate the cost of the trip.
It helps the user find the cheapest flight and accomodation. Moreover, PLANIT also gives a few sections that maybe can be helpful
for the user to input their additional cost other than flight and accomodation.

## Use Case
Why is this app useful? Many travelling websites are not combining the latest Vacation Rental Industry (Airbnb/Homeaway) with the flight tickets.
This app can help people find the cheapest flight ticket and yet we still gives them the option to use Airbnb/Homeaway at the same time instead of hotels.
Other than more variety, this website relatively faster than the other since there is no ads.
This app can be very helpful to guide the user throughout the planning process. Furthermore the sharing system will allow the user to share
their travel plan with the other.

## Live Site
You can access the demo here https://merrython.herokuapp.com/

## Technical
* The app is built by HTML5, JS, CSS, JQuery, nodeJS and ReactJS.
* SkyScanner API is the main source of the data
* The app is responsive where it can be easily accessed by mobile phone, tablet, and computer.
* The database of the user's comment will be store with mongoDB.
* Database will be stored in mLab.
* We are using Travis CI to be the main platform in testing out the program.

## Road Map
The app will have the data authentication in the future. and most importantly, for the future development,
the app will have two new main features to increase the functionally for this app from the travel calculator to travel planner.
The first thing that we are planning to have is the table time.
The table time will help user to input their timing for each hours based on their preferences.
The second feature will help the first feature. We are planning to use TripAdvisor's API call for reviews to help user learn the place before they
set the time table.
