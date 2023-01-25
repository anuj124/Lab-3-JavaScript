const api ={
    key:"7e3f21edee540e6110af347b55eb1ab2",
    base:"https://api.openweathermap.org/data/2.5/"
}

const searchBox = document.querySelector('.search-box');

searchBox.addEventListener('keypress', setQuery);

function setQuery(evt){
    if(evt.keyCode==13){
        getResults(searchBox.value);
    }
}

function getResults(query){
    const url =`${api.base}weather?q=${query}&units=metric&appid=${api.key}`;
    fetch(url).then(weather => {
        return weather.json();
    }).then(response =>{
        console.log(response);
        displayResults(response);
    })
}

function displayResults(weather){
    let city = document.querySelector(' .location .city');
    city.innerText =`${weather.name}, ${weather.sys.country}`;

    let d = new Date();
    let date = document.querySelector('.location .date');
    date.innerText = dateBuilder(d);

    let temp = document.querySelector('.current .temp');
    temp.innerHTML = `${Math.round(weather.main.temp)} <span>°C</span>`;

    let weather_main = document.querySelector(' .current .weather');
    weather_main.innerText =weather.weather[0].main;
    let hiLow = document.querySelector(' .current .hi-low');
    hiLow.innerHTML =`${Math.round(weather.main.temp_min)}<span>°C </span> / ${Math.round(weather.main.temp_max)} <span>°C </span>`;
    
}

function dateBuilder(d){
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November","December"];
    let days =["Sunday", "Moday", "Tuesdau", "Wednesday", "Thursday", "Friday", "Saturday"];

    let date = d.getDate();
    let day = days[d.getDay()];
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day}, ${date} ${month} ${year}`;


}