//DON UI VARIABLES
const time = document.getElementById('time');
const greetings = document.getElementById('greetings');
const min05 = document.getElementById("5min");
const min10 = document.getElementById("10min");
const min15 = document.getElementById("15min");
const min20 = document.getElementById("20min");
const min30 = document.getElementById("30min");
const min60 = document.getElementById("60min");
const dhammapada = document.getElementById('dhammapada');

//SHOW TIME
/*************************************************/
function showTime(){
  let d = new Date();
  let hour   = d.getHours(); 
  let minute = d.getMinutes(); 
  let second = d.getSeconds();  

  time.innerHTML = `<li>${addZero(hour)}</li>:<li>${addZero(minute)}</li>:<li>${addZero(second)}</li>`;
  //set time out every 1 second
  setTimeout(showTime, 1000);
}

//add Zero to the Hour/Minute/Second  while it is less than 10
function addZero(n){
  return  n < 10 ? "0" + n : n;
}

//run time
showTime();




//BACKGROUND IMAGE
/**********************************************/
const winLocation = window.location.href;

const bgImage = []

//set background image

// fetch(`${window.location}/node/?_format=json`)
// .then(res => res.json())
// .then(data =>
    
//      data.map((f_img) => {
//           f_img.field_image.map((img)=>{
//             bgImage.push(img.url);
//           })            
//      })
// );

console.log(bgImage);



//GREETING : CHANGE GREETING
/***********************************************/
function setGreetings(){
      let hour = new Date().getHours();     
      
      if( hour > 0 && hour < 12){
        greetings.innerHTML = "Good Morning !";
      }else if(hour >= 12 && hour < 19){
        greetings.innerHTML = "Good Afternoon !";
      }else if(hour >= 19 && hour < 20){
        greetings.innerHTML = "Good Evening !";
      }else if(hour >= 20 && hour < 24){
        greetings.innerHTML = "Good Night !";
      }          

      console.log(hour);
}
//geeeting for 10 Seconds
setGreetings();

//after 10 seconds run random quotation "Quotation for the day".
let quote_for_the_day = JSON.parse(localStorage.getItem('Suttas'));
let quote_for_the_day_length = quote_for_the_day.length - 1;
//console.log('QUOTE FOR THE DAY ', quote_for_the_day[quote_for_the_day_length].quote);
setTimeout(
  function(){ greetings.innerHTML = quote_for_the_day[quote_for_the_day_length].quote }
  , 4000);



/*** dhmpd = 'from file getNstore_dhammapada.js' */  
console.log('localstorage dhammapada  - front page', dhmpd);

let dhmpd_length = dhmpd.length - 1;
let Dhammapada_for_the_day = dhmpd[dhmpd_length].text;

/** 
*  display Dhammapada for the day */
dhammapada.innerHTML = Dhammapada_for_the_day;

