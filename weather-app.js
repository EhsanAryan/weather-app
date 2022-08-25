"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// Get Elements From DOM
let cityInput = document.querySelector("#city-input");
let submitBtn = document.querySelector("#submit-btn");
let cityNameSpan = document.querySelector("#city-name");
let countryNameSpan = document.querySelector("#country-name");
let tempSpan = document.querySelector("#temp");
let windSpan = document.querySelector("#wind");
let apiKey = "c2fe170db43574838e6adf54622988b9";
function validate(cityObject) {
    let isValid = true;
    if (cityObject.required) {
        isValid = isValid && cityObject.value.trim().length != 0;
    }
    return isValid;
}
// Main Codes
submitBtn.addEventListener("click", getInfo);
function getInfo() {
    return __awaiter(this, void 0, void 0, function* () {
        let cityName = cityInput.value;
        if (validate({ value: cityName, required: true })) {
            let response = yield fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`);
            let weatherJson = yield response.json();
            if (weatherJson.cod == "404") {
                cityNameSpan.innerText = "City not found!";
                countryNameSpan.innerText = "-";
                tempSpan.innerText = "-";
                windSpan.innerText = "-";
            }
            else {
                cityNameSpan.innerText = weatherJson.name;
                countryNameSpan.innerText = weatherJson.sys.country;
                tempSpan.innerText = `${convertKelvinIntoCelsius(weatherJson.main.temp).toFixed(2)} celsius`;
                windSpan.innerText = `${weatherJson.wind.speed} km/h`;
            }
            cityInput.value = "";
        }
        else {
            alert("Input field can't be empty !!!");
        }
    });
}
function convertKelvinIntoCelsius(temp) {
    return temp - 273;
}
cityInput.addEventListener("keydown", getInfoWithKey);
function getInfoWithKey(event) {
    if (event.key == "Enter") {
        getInfo();
    }
}
