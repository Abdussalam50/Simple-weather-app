var inputTxt=document.querySelector(".insert-location input");
var imgWeatherInfo=document.querySelector(".weather-info-pic h2");
var weatherInfoHum=document.querySelector(".weather-info .humidity span");
var weatherInfoWindSpeed=document.querySelector(".weather-info .windSpeed span");
var imgWeather=document.querySelector(".weather-info-pic img");
var errors=document.querySelector(".container-error");
var errorsImg=document.querySelector(".container-error img");
var weatherInfo=document.querySelector(".weather-info-pic h3");
const button=document.querySelector(".insert-location button");
var containerWeather=document.querySelector(".container-weather")
button.addEventListener("click",locations);
function locations(){
   var ApiKey="b5df1e0269f3ef0aaffe112143b74981";
   var city=inputTxt.value;

   if(city===""){
      return 0;
   }


   
   fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${ApiKey}`)
   .then(response=>response.json())
   .then(data=>{
     var arr=[];
     for(let x of data.list){
         var elementTime= new Date(x.dt_txt)*1000;
         var currentTime= new Date()*1000
         if(elementTime<currentTime){
            arr.push(x);
         }
     }
     var lis=arr[arr.length-1];
     var result=lis.main.temp-273.15;
     imgWeatherInfo.innerText=Math.floor(result)+" °C";
     weatherInfoHum.innerText=lis.main.humidity+"%";
     weatherInfoWindSpeed.innerText=lis.wind.speed+"Km/h";     
     switch(lis.weather[0].main){
         case "Clear":
            imgWeather.src="clear.jpg";
            break;
         case "Clouds":
            imgWeather.src="clouds.jpg";
            break;
         case "Rain":
            imgWeather.src="rainy.jpg";
            break;
         case "Snow":
            imgWeather.src="snowy.jpg";
            break;
     }

     errors.style.display="none";
     containerWeather.style.display="flex";
     weatherInfo.innerText=lis.weather[0].main;

     console.log(data.list);
   }) 
   .catch(
      errors.style.display="flex",
      containerWeather.style.display="none",
      errorsImg.style.opacity="1"
   );
      
}