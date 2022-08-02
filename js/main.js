/*jslint browser:true */
"use strict";
function addMonths(elem) {
  var annualUseKw = 0;
  var dailyUseKw = 0;
  var i = 0;
  var x = 0;
  var months = document.getElementById(elem).getElementsByTagName("input");

  for (i = 0; i < months.length; i++) {
    x = Number(months[i].value);
    annualUseKw += x;
  }
  dailyUseKw = annualUseKw / 365;
  return dailyUseKw;
}

const sunHours = () => {
  var theZone = document.forms.solarForm.zone.selectedIndex;
  var hrs;
  theZone += 1;
  switch (theZone) {
    case 1:
      hrs = 6;
      break;
    case 2:
      hrs = 5.5;
      break;
    case 3:
      hrs = 5;
      break;
    case 4:
      hrs = 4.5;
      break;
    case 5:
      hrs = 4.2;
      break;
    case 6:
      hrs = 3.5;
      break;
    default:
      hrs = 0;
  }
  return hrs;
};
const calculatePanel = () => {
  var userChoice = document.forms.solarForm.panel.selectedIndex;
  var panelsOptions = document.forms.solarForm.panel.options;
  var power = panelsOptions[userChoice].value;
  var name = panelsOptions[userChoice].text;
  var x = [power, name];
  return x;
};

function calculateSolar() {
  var sunHoursPerDay = sunHours();
  console.log(sunHoursPerDay);
  var dailyUseKw = addMonths("mpc");
  console.log(dailyUseKw);

  var minKwNeeds = dailyUseKw / sunHoursPerDay;

  var realKWNeeds = minKwNeeds * 1.25;

  var realWattNeeds = realKWNeeds * 1000;
  console.log(realWattNeeds);

  var panelInfo = calculatePanel();
  var panelOutput = panelInfo[0];
  var panelName = panelInfo[1];
  console.log(panelOutput);
  console.log(panelName);

  var panelsNeeded = Math.ceil(realWattNeeds / panelOutput);
  console.log(panelsNeeded);
  var perHourW = dailyUseKw * 1000;
  var perHour = Math.round(perHourW / 24);

  var feedback = "";
  feedback +=
    "<p>Based on your average daily use of " +
    Math.round(dailyUseKw) +
    " kWh, you will need to purchase " +
    panelsNeeded +
    " " +
    panelName +
    "brand solar panels to offset your monthly bill.</p>";
  feedback += "<h3>Additional Details</h3>";
  feedback +=
    "<p>Your average daily electricity consumption: " +
    Math.round(dailyUseKw) +
    " kWh per day.</p>";
  feedback +=
    "<p>Average sunshine hours per day: " + sunHoursPerDay + " hours</p>";
  feedback +=
    "<p>Realistic watts needed per hour: " + perHour + " watts/hour.</p>";
  feedback +=
    "<p>The " +
    panelName +
    " panel you selected generates about " +
    panelOutput +
    " watts per hour</p>";
  document.getElementById("feedback").innerHTML = feedback;
}
