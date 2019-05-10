"use strict"; //opt-out of "sloppy mode"
const debug = true; //debuggen
//bind HTML elements via DOM
let weerButton = document.getElementById("weatherButton"); // bind via DOM
let weerButton2 = document.getElementById("weatherButton2"); // bind via DOM
let weatherTickerTape = document.getElementById("weatherTickerTape"); // bind via DOM
let weerHier = document.getElementById("weerHier"); // bind via DOM
let completeWeerHier = document.getElementById("completeWeerHier"); // bind via DOM

weerButton.addEventListener('click', getWeather);
weerButton2.addEventListener('click', getWeather2);

// overige variablen
let apiAddress = "http://weerlive.nl/api/json-data-10min.php?key="; // apiAddress
// let key = "demo";
let key = "77f9e00dfd"; //key van docent
let locatie = "&locatie=";
// let geolocation = "52.391225, 4.856799" // longitude als locatie
let geoLocation = "Amsterdam"; // loactie als string
let url = apiAddress + key + locatie + geoLocation;// haal hier data

function makeAjaxCall(url, methodType){
  let promiseObj = new Promise(function(resolve, reject){
        debug ? console.log(url) : "" ; // conditinal ternary
        let xmlhttp = new XMLHttpRequest();
        xmlhttp.open(methodType, url, true);
        xmlhttp.send();
        xmlhttp.onreadystatechange = function(){
          if (xmlhttp.readyState === 4){
            if (xmlhttp.status === 200){
              debug ? console.log("xmlhttp done successfully") : "" ;
              let serverResponse = xmlhttp.responseText; // server antwoord met string
              debug ? console.log(serverResponse) : ""; // debug
              resolve(serverResponse); // wordt via return promiseObj teruggeven
            } else {
              reject(xmlhttp.status);
              console.log("xmlhttp failed"); // debug
            }
          } else {
            debug ? console.log("xmlhttp processing going on") : "";
          }
        }
        debug ? console.log("request sent succesfully") : ""; // debug
      });
    return promiseObj;
  }

function errorHandler(statusCode){
  console.log("failed with status", status)
}

function showWeather2(weatherString){
    let weatherObject = JSON.parse(weatherString);// confort JSON string => Object
    let completeData = "";
    for (const [key, value] of Object.entries(weatherObject.liveweer[0])) {
      debug ? console.log('${key}: ${value}') : ""; // debug naar console
      completeData += key + " : " + value +"<br>"; // maak string
      weerHier.innerHTML = completeData; // string printen in browser
    }
}

function getWeather2(){
  weerHier.innerHTML = "";
  makeAjaxCall(url, "GET"). then (showWeather2, errorHandler);
}

function getWeather() {
  weerHier.innerHTML = "";
  makeAjaxCall(url, "GET"). then (showWeather, errorHandler);
}

function showWeather(weatherString) {
  let weatherObject = JSON.parse(weatherString);
  let ditWeer = weatherObject.liveweer[0].plaats + "<br>Temperatuur: " + weatherObject.liveweer[0].temp + " &#176;C" + "<br> Verwachting: " + weatherObject.liveweer[0].verw + '<br>' + weatherObject.liveweer[0].image + '<img src="weerIcons/' + weatherObject.liveweer[0].image + '.png"><br>Windkracht: ' + weatherObject.liveweer[0].windk ;
  weerHier.innerHTML = ditWeer;
}
