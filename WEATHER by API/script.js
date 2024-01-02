

const whetherform = document.querySelector(".whetherform");
const cityinput = document.querySelector(".cityinput");
const card = document.querySelector(".card");
const apikey = "71918e878702a2cfe772e73a9ce3d9f6";

whetherform.addEventListener("submit", async (event) => {
    event.preventDefault();

    const city = cityinput.value;

    if(city){
        try{
            const whetherdata = await getwhetherdata(city);
            displaywhetherinfo(whetherdata);
        }
        catch(error){
            alert(error);
        }
    }
    else{
        alert("Please Enter a City");
    }

});

async function getwhetherdata(city){
    const apiURl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}`;

    const response = await fetch(apiURl);
    console.log(response);

    if(!response.ok){
        alert("Could not fetch Data");
    }
    else{
        return await response.json();
    }

}

function displaywhetherinfo(data){
    const {name: city, main: {temp, humidity}, weather: [{description, id}]} = data;

    card.textContent = "";
    card.style.display = "flex";

    const citydisplay = document.createElement("h1");
    const tempdisplay = document.createElement("p");
    const humiditydisplay = document.createElement("p");
    const descdisplay = document.createElement("p");
    const weatheremoji = document.createElement("p");

    citydisplay.textContent = city;
    tempdisplay.textContent = `${ (temp -273.15).toFixed(1)}°C`;
    humiditydisplay.textContent = `Humidity: ${humidity}%`;
    descdisplay.textContent = description;
    weatheremoji.textContent = getwhetheremoji(id);


    citydisplay.classList.add("citydisplay");
    tempdisplay.classList.add("tempdisplay");
    humiditydisplay.classList.add("humiditydiaplay");
    descdisplay.classList.add("descdisplay");
    weatheremoji.classList.add("whetheremoji");


    card.appendChild(citydisplay);
    card.appendChild(tempdisplay);
    card.appendChild(humiditydisplay);
    card.appendChild(descdisplay);
    card.appendChild(weatheremoji);
}

function getwhetheremoji(weatherId){
    switch(true){
        case (weatherId >= 200 && weatherId < 300):
            return "⛈";
        case (weatherId >= 300 && weatherId < 400):
            return "🌧";
        case (weatherId >= 500 && weatherId < 600):
            return "🌧";
        case (weatherId >= 600 && weatherId < 700):
            return "❄";
        case (weatherId >= 700 && weatherId < 800):
            return "🌫";
        case (weatherId === 800):
            return "☀";
        case (weatherId >= 801 && weatherId < 810):
            return "☁";
        default:
            return "❓";
    }
}

