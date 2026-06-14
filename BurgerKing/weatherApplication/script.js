const apiKey = "ca018df54353f065aaed7d802825b8be";

const cityInput = document.querySelector("#cityInput");
const result = document.querySelector("#dataResult");
const forecast = document.querySelector("#forecast");


// Enter Key Support

cityInput.addEventListener("keypress", (e) => {

    if (e.key === "Enter") {

        getWeatherData();

    }

});




// Live Date & Time

function updateDateTime() {

    const now = new Date();

    document.querySelector("#dateTime").innerHTML =

        now.toLocaleDateString('en-IN', {

            weekday: 'long',

            day: 'numeric',

            month: 'long',

            year: 'numeric'

        })

        +

        "<br>"

        +

        now.toLocaleTimeString();

}

setInterval(updateDateTime, 1000);

updateDateTime();





// Dark Mode

function toggleTheme() {

    document.body.classList.toggle("dark");

    const btn = document.querySelector(".darkBtn");

    if (document.body.classList.contains("dark")) {

        btn.innerHTML = "☀";

    }

    else {

        btn.innerHTML = "🌙";

    }

}





// Search Weather

async function getWeatherData(city = cityInput.value.trim()) {


    if (city === "") {

        alert("Please Enter City Name");

        return;

    }



    result.innerHTML = `

    <div class="text-center mt-4">

        <div class="spinner-border text-light"></div>

        <p class="mt-2">

        Loading...

        </p>

    </div>

    `;



    try {


        const response = await fetch(

            `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`

        );


        const data = await response.json();



        if (data.cod != 200) {

            result.innerHTML = `

            <div class="alert alert-danger mt-3">

            ❌ City Not Found

            </div>

            `;

            return;

        }



        renderData(data);


        getForecast(city);


        changeBackground(

            data.weather[0].main

        );


    }

    catch (error) {


        result.innerHTML = `

        <div class="alert alert-danger">

        Something Went Wrong

        </div>

        `;

    }



    cityInput.value = "";

}






// Render Weather

function renderData(data) {


    let icon = "fa-cloud";


    if (data.weather[0].main === "Clear") {

        icon = "fa-sun";

    }

    else if (data.weather[0].main === "Rain") {

        icon = "fa-cloud-rain";

    }

    else if (data.weather[0].main === "Clouds") {

        icon = "fa-cloud";

    }

    else if (data.weather[0].main === "Snow") {

        icon = "fa-snowflake";

    }



    result.innerHTML = `


    <div class="city">

    ${data.name}

    </div>



    <div class="country">

    ${data.sys.country}

    </div>



    <div class="weather-icon">

    <img

    src=

    "https://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png"

    >

    </div>



    <div class="temp">

    ${Math.round(data.main.temp)}°C

    </div>



    <div class="condition">

    <i class="fa-solid ${icon}"></i>

    ${data.weather[0].main}

    </div>



    <div class="description">

    ${data.weather[0].description}

    </div>




    <div class="extra">



        <div class="extra-box">

        <h3>

        <i class="fa-solid fa-droplet"></i>

        </h3>

        <h5>

        ${data.main.humidity}%

        </h5>

        <p>

        Humidity

        </p>

        </div>




        <div class="extra-box">

        <h3>

        <i class="fa-solid fa-temperature-half"></i>

        </h3>

        <h5>

        ${Math.round(data.main.feels_like)}°C

        </h5>

        <p>

        Feels Like

        </p>

        </div>




        <div class="extra-box">

        <h3>

        <i class="fa-solid fa-wind"></i>

        </h3>

        <h5>

        ${(data.wind.speed * 3.6).toFixed(1)}

        </h5>

        <p>

        Wind km/h

        </p>

        </div>


    </div>

    `;

}






// Current Location


function getLocationWeather() {


    navigator.geolocation.getCurrentPosition(

        async (position) => {


            const lat = position.coords.latitude;

            const lon = position.coords.longitude;



            const response = await fetch(

                `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`

            );



            const data = await response.json();



            renderData(data);


            getForecast(data.name);


            changeBackground(

                data.weather[0].main

            );


        }

    );


}






// 5 Days Forecast


async function getForecast(city) {


    forecast.innerHTML = "";


    const response = await fetch(

        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${apiKey}`

    );


    const data = await response.json();




    for (let i = 0; i < data.list.length; i += 8) {


        const day = data.list[i];


        const date = new Date(

            day.dt_txt

        );



        forecast.innerHTML += `


        <div class="forecast-card">


        <h6>

        ${date.toLocaleDateString(

            'en-US',

            {

                weekday: 'short'

            }

        )}

        </h6>



        <img

        src=

        "https://openweathermap.org/img/wn/${day.weather[0].icon}.png"

        >



        <h5>

        ${Math.round(day.main.temp)}°C

        </h5>



        <p>

        ${day.weather[0].main}

        </p>


        </div>

        `;


    }


}






// Background Change


function changeBackground(weather) {



    if (weather === "Clear") {


        document.body.style.background =

            "linear-gradient(135deg,#f6d365,#fda085)";

    }



    else if (weather === "Rain") {


        document.body.style.background =

            "linear-gradient(135deg,#4b79a1,#283e51)";

    }



    else if (weather === "Clouds") {


        document.body.style.background =

            "linear-gradient(135deg,#bdc3c7,#2c3e50)";

    }



    else if (weather === "Snow") {


        document.body.style.background =

            "linear-gradient(135deg,#83a4d4,#b6fbff)";

    }



    else {


        document.body.style.background =

            "linear-gradient(135deg,#667eea,#764ba2)";

    }


}