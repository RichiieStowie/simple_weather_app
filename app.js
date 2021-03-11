window.addEventListener('load',()=> {
    //Declaring the variables needed
    let long;
    let lat;
    let display= document.querySelector('.time');
    //creating the clock
    function showClock(){
    let date = new Date();
    let hours= date.getHours();
    let minutes = date.getMinutes();
    let seconds = date.getSeconds();
    if(hours<10){
      hours= '0'+hours;
    }
    if(minutes<10){
      minutes= '0'+minutes;
    }
    if (seconds<10){
      seconds= '0'+ seconds;
    }
    let time = hours +':' + minutes + ':' + seconds;
   setTimeout(showClock,1000);
    display.innerHTML= time;
  }
  showClock();

  //Variables to display the present weather conditions
    let timeZone=document.querySelector('.location-timezone');
    let presentDay= document.querySelector('.dayOfWeek');
    let tempSummary= document.querySelector('.temperature-summary')
    let currentTemp= document.querySelector('.temperature-degree');
    let degreeUnit= document.querySelector('#degree-unit')
    let iconImage= document.querySelector('.icon');
    let form= document.querySelector('.location-status');
    let input= document.querySelector('.request-location');
//handling form submission

form.addEventListener('submit',e=>{
  let inputVal=input.value;
  e.preventDefault();
  input.value='';


  //Retrieve API data
  const api_key='d09a15e8ae6360f0895391bdc903346e';
        const api= `http:api.openweathermap.org/data/2.5/weather?q=${inputVal}&units=imperial&APPID=${api_key}`
        fetch(api)
        .then(response=>
            {
                return response.json()
            })
        .then(data=>{
            console.log(data);
            const {temp}= data.main;
            const{description,main}= data.weather[0];
            //DOM manipulation
            tempSummary.textContent= description;
            currentTemp.textContent= temp;
            timeZone.textContent= `${data.name}/${data.sys.country}`;
            //Set icon
            let iconCode = data.weather[0].icon;
            let iconUrl = "http://openweathermap.org/img/w/" + iconCode + ".png";
            iconImage.src= iconUrl;
            //Convert temperature units
            let celsius=Math.floor((temp)-32*(5/9));
            currentTemp.addEventListener('click',()=>{
              if(degreeUnit.textContent==='F'){
                degreeUnit.textContent='C';
                currentTemp.textContent=celsius;
              }else{
                degreeUnit.textContent="F";
                currentTemp.textContent=temp;
              }
            })
        })
})


    
    
})