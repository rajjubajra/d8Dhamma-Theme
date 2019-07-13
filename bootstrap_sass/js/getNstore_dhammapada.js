  /**
  * GET ANS STORE DHAMMAPADA IN TO LOCALSTORE
  * - REQUEST DHAMMAPAD QUOTE FROM D8 DATABASE
  * - STORE DHAMMAPADA ONE FOR A DAY IN TO LOCALSTOR
  *
  ****************************************/

 let dhmpd = localStorage.getItem('Dhammapada') 
 ? JSON.parse(localStorage.getItem('Dhammapada'))
 : null;

const dhmurl = `${rootUrl}/jsonapi/node/dhammapada_quotes`;

var dhmxhttp = new XMLHttpRequest();
dhmxhttp.onreadystatechange = function() {
if (this.readyState == 4 && this.status == 200) {
// Typical action to be performed when the document is ready:
//document.getElementById("demo").innerHTML = xhttp.responseText;
//console.log(' DHAMMAPADA ',JSON.parse(dhmxhttp.responseText));
const dhm_arr = JSON.parse(dhmxhttp.responseText).data;
const dhm_arr_length = dhm_arr.length;


const dhm_random = dhm_arr[Math.floor(Math.random() * dhm_arr_length)];

//console.log('body text', dhm_random.attributes.body.value)

/** today_date 
* today_date variable from 'getNstore_quotes.js' file */

if(dhmpd){   
    /** check today's date */   
    let dhmpdLength = dhmpd.length - 1;  
    let todayPosted = dhmpd[dhmpdLength].date === today_date ? true : false;
    if(!todayPosted){
      dhmpd.map((item)=>{
        if(item.id !== dhm_random.id){
          dhmpd.push({
            date: today_date,
            id: dhm_random.id,
            text: dhm_random.attributes.body.value
          })
        }
      })
      localStorage.setItem('Dhammapada', JSON.stringify(dhmpd));
    }   
}else{
/** 
* post First new Dhammapada into localstore */
          dhmpd = [];
          dhmpd.push({
            date: today_date,
            id: dhm_random.id,
            text: dhm_random.attributes.body.value
          })
          /**
          * store into localstorage */
          localStorage.setItem('Dhammapada', JSON.stringify(dhmpd)); 
          }
      }
};
dhmxhttp.open("GET", dhmurl, true);
dhmxhttp.send();
