let loc = document.getElementById("location");
let tempicon = document.getElementById("temp-icon");
let tempvalue = document.getElementById("temp-val");
let climate = document.getElementById("climate");
let iconfile;

const searchIP = document.getElementById("search_input");
const searchBT = document.getElementById("btn-srch");


searchBT.addEventListener('click', (e)=>
{

    e.preventDefault();
    getWeather(searchIP.value);
    searchIP.value='';
});

const getWeather=async (city)=>
{
    try{

        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=a6082c88097c75c0ff882b53e6b7554e`,

        {mode: 'cors'});
    

    const weatherData = await response.json();
    console.log(weatherData);
    const{name}=weatherData;
    const{feels_like}=weatherData.main;
    const{id,main}=weatherData.weather[0];
    loc.textContent=name;
    climate.textContent=main;
    tempvalue.textContent=Math.round(feels_like-273);

    if(id<300 && id>200)
    {
        tempicon.src="./webicons/thunderstorm.png"
    }
   else  if(id<=400 && id>=300)
    {
        tempicon.src="./webicons/sun.png"
    }
   else if(id<=600&& id>=500)
    {
        tempicon.src="./webicons/rainy.png"
    }
   else  if(id<=700 && id>=600)
    {
        tempicon.src="./webicons/snowy.png"
    }
   else  if(id<=900 && id>=700)
    {
        tempicon.src="./webicons/sun.png"
    }
     else if(id==800)
    {
        tempicon.src="./webicons/cloudy"
    }


}





catch(error)
{
    alert('city not found');
}

   

};



    






window.addEventListener("load", ()=>{

    let long;
    let lat;

    if(navigator.geolocation)
    {
        navigator.geolocation.getCurrentPosition((position)=>
        {

            long=position.coords.longitude;
            lat=position.coords.latitude;
            const proxy="https://cors-anywhere.herokuapp.com/";

                const api = `${proxy}api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=a6082c88097c75c0ff882b53e6b7554e`

                fetch(api).then((response)=>
                {
                    return response.json();
                })

                .then (data => {

                    const{name}=data;
                    const{feels_like}=data.main;
                    const{id,main}=data.weather[0];

                    loc.textContent=name;
                    climate.textContent=main;

                    tempvalue.textContent=Math.round(feels_like-273);

                    if(id<300 && id>200)
                    {
                        tempicon.src="./webicons/thunderstorm.png"
                    }
                   else  if(id<400 && id>300)
                    {
                        tempicon.src="./webicons/sun.png"
                    }
                   else if(id<600&& id>500)
                    {
                        tempicon.src="./webicons/rainy.png"
                    }
                   else  if(id<700 && id>600)
                    {
                        tempicon.src="./webicons/snowy.png"
                    }
                   else  if(id<900 && id>700)
                    {
                        tempicon.src="./webicons/overcast.png"
                    }
                     else if(id==800)
                    {
                        tempicon.src="./webicons/cloudy"
                    }




                    console.log(data);



                })
        }
        )
    }
})