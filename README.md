# WEATHER APPLICATION

## Coding Challenge

For this coding challenge we would like you to write a simple reactive page that will display a summary of todays weather based on the users location. The location can be obtained however you want (Browser location, geoip lookup). The app must make api calls to a free weather service, e.g. https://openweathermap.org/api.

## Technology

The Site should be built using React. If you want you can add a Node.js back end to handle the api call (This can be in a seperate repo if needed)

## Criteria

We will be looking at
* Code Quality
* Test Strategy
* Reactive design
* Readability of code
* Usage of current good practices
* Use of Javascript built in data structures and methods

Feel free to show us what you can do, at Seenit we love to be impressed.

## Test Submission

* Fork this repo
* Make your changes (We dont expect you to spend a long time on this, hopefully you can get this done in a few hours)
* Send us a link to your repo either directly or through your recruiter

## Running Locally

Go to this repository and click on the 'Clone or download' green button. Then copy the URL that appears (git@github.com:harrygturner/seenit-weather-test.git).

Open up terminal and move yourself into a directory you wish this file to be located in and then issue the command below into the command line:

`git clone <URL you copied (git@github.com:harrygturner/seenit-weather-test.git)>`

Then using the command line (`cd`) enter the file you just created and ensure npm has been installed by entering:

`npm -v`

If you have npm alread installed on your computer then go ahead and install the dependecies with:

`npm install`

Before starting the app, however, you will need to add your own API keys into the `src/App.js` file. These are clearly located at the top of the file and are commented out at present: 

```
// const openWeatherApiKey = < insert open weather api key here >;
// const googleMapsApiKey= < insert google maps api key here >;
```

Once you have added your own API keys then please start the app with:

`npm start`
