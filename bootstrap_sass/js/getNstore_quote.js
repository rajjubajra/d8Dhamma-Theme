//Sutta for the day
/**********************************************
idea - display random Motivation Sutta from 
D8 JSONAPI [ url = 'http://localhost:8888/Drupal/d8lite-meditation-app/web/jsonapi/node/motivation_suttas';]

Method:
 - check today's date exist on the sutta table of localstorage
 - if date exist do nothing
 - else if
 - select random Motivation Sutta from the database 
 - check id exist on the localstorage
 - store new Sutta in to the localstorage
 - display latest sutta from the local storage for the day

**********************************************/



/** 
* today's data  */
let d = new Date();
let today_date = `${d.getFullYear()}.${d.getMonth()}.${d.getDay()}`;

/**
* get data from localstorage */
let db_suttas = localStorage.getItem('Suttas') 
                ? JSON.parse(localStorage.getItem('Suttas')) 
                : null;



/** 
* REQUEST DAILY MOTIVATION SUTTAS FROM THE D8 DATABASE */
const rootUrl = window.location.href;
const suturl = `${rootUrl}/jsonapi/node/motivation_suttas`;



 var xhttp = new XMLHttpRequest();
 xhttp.onreadystatechange = function() {
     if (this.readyState == 4 && this.status == 200) {
      
      // Typical action to be performed when the document is ready:
      // document.getElementById("demo").innerHTML = xhttp.responseText;
      let response = JSON.parse(xhttp.responseText);
      
      // console.log(' response text ', xhttp.responseText);
      // console.log('response parse', response.data);
      // console.log('LENGTH',response.data.length);
       
       let db_arr = response.data;       
       let length = db_arr.length;

       /** 
       * get new post */
       let rand = db_arr[Math.floor(Math.random() * length)];
       //console.log('RANDOM', rand);
       //console.log({ todaid: today_date,  id: rand.id, quote: rand.attributes.field_motivation_sutta});

       //console.log('db_suttas',db_suttas);

       /**
       * check quote and post in to localstorage  */
        if(db_suttas === null ){
          db_suttas = [];
          /** new quote [first quote on localstorage]  */
          db_suttas.push({
            date: today_date,
            id: rand.id,
            quote: rand.attributes.field_motivation_sutta
          })
          /** Store into localstorage */
          localStorage.setItem('Suttas', JSON.stringify(db_suttas));
        }else{

          /**
          * check today's quote */
          let  quote_posted_today = '';
          db_suttas.map((item)=>{
               quote_posted_today =  item.date === today_date ? true : false;
          });

          //console.log('todays quote avail: ', quote_posted_today);            
          /**
          * Post Quote for the day */
           if(!quote_posted_today){
             //console.log('RANDOM ID:',rand.id);
             db_suttas.map((item)=>{
               if(item.id !== rand.id){
                 db_suttas.push({
                   date: today_date,
                   id: rand.id,
                   quote: rand.attributes.field_motivation_sutta
                 })
               }
             })
            /** Store in to localstorage */ 
            localStorage.setItem('Suttas', JSON.stringify(db_suttas)); 
           }     
        }
 };
}
 xhttp.open("GET", suturl, true);
 xhttp.send();

//console.log('suttas:', db_suttas); 