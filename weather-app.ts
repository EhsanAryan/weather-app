// Get Elements From DOM
let cityInput = document.querySelector("#city-input") as HTMLInputElement;
let submitBtn = document.querySelector("#submit-btn") as HTMLButtonElement;
let cityNameSpan = document.querySelector("#city-name") as HTMLSpanElement;
let countryNameSpan = document.querySelector("#country-name") as HTMLSpanElement;
let tempSpan = document.querySelector("#temp") as HTMLSpanElement;
let windSpan = document.querySelector("#wind") as HTMLSpanElement;

let apiKey = "c2fe170db43574838e6adf54622988b9";


// Validate
interface Validatable {
    value: string;
    required: boolean;
}

function validate(cityObject: Validatable) : boolean {
    let isValid = true;

    if(cityObject.required){
        isValid = isValid && cityObject.value.trim().length != 0;
    }

    return isValid;
}


// Main Codes
submitBtn.addEventListener("click" , getInfo);

async function getInfo(){
    let cityName = cityInput.value;
    if(validate({value: cityName , required: true})){
        let response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`);
        let weatherJson = await response.json();

        if(weatherJson.cod == "404"){
            cityNameSpan.innerText = "City not found!";
            countryNameSpan.innerText = "-";
            tempSpan.innerText = "-";
            windSpan.innerText = "-";
        }
        else{
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
}

function convertKelvinIntoCelsius(temp: number): number {
    return temp - 273;
}


cityInput.addEventListener("keydown" , getInfoWithKey);

function getInfoWithKey(event: any){
    if(event.key == "Enter"){
        getInfo();
    }
}