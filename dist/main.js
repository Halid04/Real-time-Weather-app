const weatherFollowingDays = document.getElementById("weather-following-days")
weatherFollowingDays.addEventListener("wheel", (e) => {
    e.preventDefault();
    weatherFollowingDays.scrollLeft += e.deltaY;
})

const temperatureForHours = document.getElementById("temperature-for-hours");
temperatureForHours.addEventListener("wheel", (e) => {
    e.preventDefault();
    temperatureForHours.scrollLeft += e.deltaY;
})

document.getElementById("searchInput").focus();

let data1, data2, data3;  
const bgVideo = document.getElementById("bgVideo");
const container = document.getElementById("container");
const currentWeatherContainer = document.getElementById("current-weather");
const weatherFollowingDaysContainer = document.getElementById("weather-following-days")
const searchBtn = document.getElementById("searchBtn");
const currentTemperature = document.getElementById("current-temperature");
const cityName = document.getElementById("city");
const humidity = document.getElementById("humidity");
const pressure = document.getElementById("pressure");
const visibility = document.getElementById("visibility");
const wind = document.getElementById("wind");
const currentTemperatureIcon = document.getElementById("current-temperature-icon");
let cityLatitude, cityLongitude, kelvinTemp, celciusTemp, fahrenheitTemp;
let kelvinTempForwadHour, celciusTempForwadHour, fahrenheitTempForwadHour;
let celciusTempMinForwadDay, fahrenheitTempMinForwadDay, celciusTempMaxForwadDay, fahrenheitTempMaxForwadDay;
let searchDone = false;
const hours = document.querySelectorAll(".hours");
const temperatureForwadHours = document.querySelectorAll('.flex.items-center.scrollbar-hide.overflow-x-scroll.w-full .text-5xl');
const forwadDays = document.querySelectorAll(".text-center.text-3xl");
const forwadDaysTemp = document.querySelectorAll(".text-4xl")
const fordawTempHourIcons = document.querySelectorAll(".flex.items-center.scrollbar-hide.overflow-x-scroll.w-full .w-14.aspect-square");



searchBtn.addEventListener("click", async function getData(){
    try{
        const searchInput = document.getElementById("searchInput").value.toLowerCase();

        const endpoint = `https://api.openweathermap.org/geo/1.0/direct?q=${searchInput}&appid=b3cf9e3829acc3b0f53ab1c534b8cc96`;
        const response = await fetch(endpoint);
        data1 = await response.json();
        // console.log(data1);

        cityLatitude = data1[0].lat;
        cityLongitude = data1[0].lon;

        const endpoint2 = `https://api.openweathermap.org/data/2.5/forecast?lat=${cityLatitude}&lon=${cityLongitude}&appid=b3cf9e3829acc3b0f53ab1c534b8cc96`;
        const response2 = await fetch(endpoint2);
        data2 = await response2.json();
        // console.log(data2);

        kelvinTemp = data2.list[0].main.temp;
        celciusTemp = Math.round(kelvinTemp - 274.15);
        fahrenheitTemp = Math.round((kelvinTemp * 9/5) - 459.67);

        cityName.innerHTML = data1[0].name+","+data1[0].country;
        currentTemperatureIcon.src = `https://openweathermap.org/img/wn/${data2.list[0].weather[0].icon}@2x.png`;
        humidity.innerHTML = data2.list[0].main.humidity+"%";
        pressure.innerHTML = data2.list[0].main.pressure+" mb";
        if(data2.list[0].visibility/1000>=10){
            visibility.innerHTML = ">"+(data2.list[0].visibility/1000)+" km";
        }else{
            visibility.innerHTML = data2.list[0].visibility/1000+" km";
        }
        wind.innerHTML = Math.round((data2.list[0].wind.speed*3.6))+" km/h";

        if(C && !F){
            currentTemperature.innerHTML = celciusTemp+"°";
        }else{
            currentTemperature.innerHTML = fahrenheitTemp+"°";
        }
        searchDone = true;

        for(let i=0; i<hours.length; i++){
            const dataOfDate = data2.list[i].dt_txt;
            const date = new Date(dataOfDate);
            const forwardHours  = date.getHours().toString().padStart(2, "0");
            const forwardMin = date.getMinutes().toString().padStart(2, "0");
            hours[i].innerHTML = (forwardHours+":"+forwardMin);
            fordawTempHourIcons[i].src = `https://openweathermap.org/img/wn/${data2.list[i].weather[0].icon}@2x.png`;
        }
        
        conversionTempForwadHour();

        const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
        const endpoint3 =`https://api.open-meteo.com/v1/forecast?latitude=${cityLatitude}&longitude=${cityLongitude}&daily=temperature_2m_max,temperature_2m_min&timezone=${timezone}`;
        const response3 = await fetch(endpoint3);
        data3 = await response3.json();
        let todayDate = new Date();
        let today = todayDate.toLocaleDateString("en-GB", {weekday:"long"});
        for(let i=0; i<forwadDays.length;i++){
            const dataofDate2 = data3.daily.time[i];
            const date2 = new Date(dataofDate2);
            if(date2.toLocaleDateString("en-GB", {weekday:"long"}) == today){
                forwadDays[i].innerHTML = "today";
            }else{
                forwadDays[i].innerHTML = date2.toLocaleDateString("en-GB", {weekday:"long"});
            }   
        }
        conversionTempForwadDay();

        transition();

        // sortedName = await data1.sort();
        // console.log("ecco: "+sortedName);


        if(data2.list[0].weather[0].main == "Rain" || data2.list[0].weather[0].main == "Drizzle"){
            bgVideo.src = "/dist/video/pioggia.mp4"
        }else if(data2.list[0].weather[0].main == "Snow"){
            bgVideo.src = "/dist/video/neve.mp4";
        }else if(data2.list[0].weather[0].main == "Thunderstorm"){
            bgVideo.src = "/dist/video/Thunderstorm.mp4";
        }else if(data2.list[0].weather[0].main == "Fog" || data2.list[0].weather[0].main == "Mist"){
            bgVideo.src = "/dist/video/nebbia.mp4";
        }else if(data2.list[0].weather[0].main == "Squall" || data2.list[0].weather[0].main == "Tornado"){
            bgVideo.src = "/dist/video/Strong winds.mp4";
        }else{
            bgVideo.src = "/dist/video/soleggiato-nuvoloso.mp4";
        }

        container.style.width = "85%";
        container.style.height = "90%";

        currentWeatherContainer.classList.remove("hidden");
        currentWeatherContainer.classList.add("flex");
        weatherFollowingDaysContainer.classList.remove("hidden");
        weatherFollowingDaysContainer.classList.add("flex");
        document.querySelector("form").classList.remove("gap-7")
        document.querySelector("form").classList.add("gap-5")
        inputList.classList.remove("-m-5");
        inputList.classList.add("m-3")

    }catch{
        alert("City not found");
    }
    
    searchInput.value = "";
    document.getElementById("searchInput").focus();
    
})

async function conversionTempForwadHour(){
    for(let i=0; i<temperatureForwadHours.length; i++){
        kelvinTempForwadHour = await data2.list[i].main.temp;
        celciusTempForwadHour = Math.round(kelvinTempForwadHour - 274.15);
        fahrenheitTempForwadHour = Math.round((kelvinTempForwadHour * 9/5) - 459.67);

        if(C && !F){
            temperatureForwadHours[i].innerHTML = celciusTempForwadHour+"°";
        }else{
            temperatureForwadHours[i].innerHTML = fahrenheitTempForwadHour+"°";
        }
    }
}

async function conversionTempForwadDay(){
    for(let i=0; i<forwadDays.length;i++){
        celciusTempMinForwadDay= await data3.daily.temperature_2m_min[i];
        fahrenheitTempMinForwadDay= (celciusTempMinForwadDay*9/5)+32;

        celciusTempMaxForwadDay= await data3.daily.temperature_2m_max[i];
        fahrenheitTempMaxForwadDay= (celciusTempMaxForwadDay*9/5)+32;
    
        if(C && !F){
            forwadDaysTemp[i].innerHTML = Math.round(celciusTempMaxForwadDay)+"&nbsp;&nbsp;&nbsp;&nbsp;"+Math.round(celciusTempMinForwadDay);
        }else{
            forwadDaysTemp[i].innerHTML = Math.round(fahrenheitTempMaxForwadDay)+"&nbsp;&nbsp;&nbsp;&nbsp;"+Math.round(fahrenheitTempMinForwadDay);
        }
    }
}

let executed = false;
function transition(){
    if(!executed){
        const transition = document.createElement("span");
        document.querySelector("body").appendChild(transition)
        transition.className = "absolute top-0 left-0 w-full h-full bg-black z-10 animate-transition";
        setTimeout(function() {
            transition.parentNode.removeChild(transition);
        }, 500);
    }
    executed = true;
}

const celciusBtn = document.getElementById("celciusBtn");
let C = true;

celciusBtn.addEventListener("click", ()=>{
    if(searchDone){
        currentTemperature.innerHTML = celciusTemp+"°";
        conversionTempForwadHour();
        conversionTempForwadDay();

        celciusBtn.classList.add("text-[#ffffff]");
        fahrenheitBtn.classList.add("text-[#ffffff98]");
        fahrenheitBtn.classList.remove("text-[#ffffff]");
        celciusBtn.classList.remove("text-[#ffffff98]");

        C=true;
        F=false;
    }
})

const fahrenheitBtn = document.getElementById("fahrenheitBtn");
let F=false;
fahrenheitBtn.addEventListener("click", ()=>{
    if(searchDone){
        currentTemperature.innerHTML = fahrenheitTemp+"°";
        conversionTempForwadHour();
        conversionTempForwadDay();

        fahrenheitBtn.classList.add("text-[#ffffff]");
        celciusBtn.classList.add("text-[#ffffff98]");
        celciusBtn.classList.remove("text-[#ffffff]");
        fahrenheitBtn.classList.remove("text-[#ffffff98]");

        F=true;
        C=false;
    }
})


//vi avverto il codice sotto lascia da desiderare ma per mia difesa mi sono cominciato a rompere il cazzo

const input = document.getElementById("searchInput");
let newArray = [];
let data4;
let nameOfCity = [];
let inputList = document.getElementById("input-list"); 
let addedCities = {};

let suggestionContainer = document.createElement("ol");
suggestionContainer.className = "m-2 border-2 rounded-lg border-white text-xl"

input.addEventListener("input", async function() {
  if(this.value.length===0){
    inputList.removeChild(suggestionContainer);
  }else{
    inputList.appendChild(suggestionContainer);
  }

  const endpoint4 = `https://api.openweathermap.org/geo/1.0/direct?q=${this.value.toLowerCase()}&limit=5&appid=b3cf9e3829acc3b0f53ab1c534b8cc96`;
  const response4 = await fetch(endpoint4);
  data4 = await response4.json();

  if (data4.length === 0){
    inputList.removeChild(suggestionContainer);
  }

  suggestionContainer.innerHTML = "";
  nameOfCity.length = 0;
  addedCities = {};

  for (let i in data4){
    let cityName = data4[i].name;
    if (!addedCities[cityName]){
      addedCities[cityName] = true;

      const suggestion = document.createElement("li");
      suggestion.className = "bg-[#ffffffbe] flex-shrink-0 text-black backdrop-blur-lg h-7 z-30 cursor-pointer border-b-2 border-white";
      suggestion.innerHTML = cityName;
      suggestion.addEventListener("click", () => {
        input.value = cityName;
        inputList.removeChild(suggestionContainer);
      })
    
      suggestionContainer.appendChild(suggestion);
    }
}
})   

input.addEventListener("keydown", (e) => {
    if (e.keyCode === 13) {
      inputList.removeChild(suggestionContainer);
    }
})