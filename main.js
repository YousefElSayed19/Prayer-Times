let parent= document.querySelector(".parent");

let headEn =document.querySelector(".headEn");

let headAr =document.querySelector(".headAr");

let date1En =document.querySelector(".date1En");

let date1Data =document.querySelector(".date1Data");

let date1Ar =document.querySelector(".date1Ar");

let date2En =document.querySelector(".date2En");

let date2Data =document.querySelector(".date2Data");

let date2Ar =document.querySelector(".date2Ar");

let cards=document.querySelector(".cards");

let card=document.querySelectorAll(".card");

let title=document.querySelectorAll(".pTitle");

let time=document.querySelectorAll(".time");


let citys=[
    "Ad Daqahlīyah","Al Baḩr al Aḩmar","Al Buḩayrah","Al Fayyūm","Al Gharbīyah","Al Iskandarīyah","Al Ismā'īlīyah",
    "Al Jīzah","Al Minūfīyah","Al Minyā","Al Qāhirah","Al Qalyūbīyah","Al Uqşur","Al Wādī al Jadīd","As Suways",
    "Ash Sharqīyah","Aswān","Asyūţ","Banī Suwayf","Būr Sa‘īd","Dumyāţ","Janūb Sīnā'","Kafr ash Shaykh","Maţrūḩ","Qinā","Shamāl Sīnā'","Sūhāj",
]


let governorates = [
    "الدقهلية","البحر الأحمر","البحيرة","الفيوم","الغربية","الإسكندرية","الإسماعيلية",
    "الجيزة","المنوفية","المنيا","القاهرة","القليوبية","الأقصر","الوادي الجديد","السويس","الشرقية",
    "أسوان","أسيوط","بني سويف","بورسعيد","دمياط","جنوب سيناء","كفر الشيخ","مطروح","قنا","شمال سيناء","سوهاج"
];


let namesOfSlaha=["العشاء","المغرب", "العصر", "الظهر", "الفجر"]

// get req by axios
// function api(city){
//     axios.get(`http://api.aladhan.com/v1/timingsByCity/:date?country=EG&city=${city}`)
//     .then(rq=>{

//         if (rq.statusText==="OK"){

//             let dayEn = rq.data.data.date.gregorian.weekday.en

//             let date  = rq.data.data.date.gregorian.date 

//             let dayAr = rq.data.data.date.hijri.weekday.ar

//             dateGregorian(dayEn,dayAr,date)

//             dayEn = rq.data.data.date.hijri.month.en

//             date  = rq.data.data.date.hijri.date

//             dayAr = rq.data.data.date.hijri.month.ar

//             dateHijri(dayEn,dayAr,date)

//             let fajr=rq.data.data.timings.Fajr

//             let dhuhr=rq.data.data.timings.Dhuhr

//             let asr=rq.data.data.timings.Asr

//             let maghrib=rq.data.data.timings.Maghrib

//             let isha=rq.data.data.timings.Isha

//             let arr=[isha,maghrib,asr,dhuhr,fajr]

//             createCard(arr)
//         }
//     }).catch((error)=>{
//         alert(error);
//     })
// }



// get req by XML
function api(city){
    let req=new XMLHttpRequest()
    req.open("GET",`https://api.aladhan.com/v1/timingsByCity/:date?country=EG&city=${city}`)
    req.send()
    req.onload=()=>{
        if(req.status===200 && req.readyState ===4){
            console.log(req)
            let rq=JSON.parse(req.responseText)
            
            let dayEn = rq.data.date.gregorian.weekday.en

            let date  = rq.data.date.gregorian.date 

            let dayAr = rq.data.date.hijri.weekday.ar

            dateGregorian(dayEn,dayAr,date)

            dayEn = rq.data.date.hijri.month.en
        
            date  = rq.data.date.hijri.date
        
            dayAr = rq.data.date.hijri.month.ar
        
            dateHijri(dayEn,dayAr,date)
        
            let fajr=rq.data.timings.Fajr
        
            let dhuhr=rq.data.timings.Dhuhr
        
            let asr=rq.data.timings.Asr
        
            let maghrib=rq.data.timings.Maghrib
        
            let isha=rq.data.timings.Isha
        
            let arr=[isha,maghrib,asr,dhuhr,fajr]
        
            createCard(arr)
        }
    }
}

let select=document.createElement("select");
function options(){
    for(let city in citys){
        let option=document.createElement("option");
        option.value=citys[city];
        option.textContent=governorates[city];
        select.appendChild(option)
    }
    parent.appendChild(select);
}

window.onload=()=>{
    setTimeout(()=>{
        api(citys[4])
        console.log(citys[4])
    },2000)
}

options()

let value=select.onmouseleave=function(){
    card.length=0;
    let options=Array.from(select.children);
    options.forEach((el,ind)=>{
        if (el.value===select.value){
            head(select.value,governorates[ind])    
        }
    })
    api(select.value)
}


function head(nameAr,nameEn){
    headAr.textContent=nameEn   
    headEn.textContent=nameAr
}

function dateGregorian(dayEn,dayAr,date){
    date1En.textContent=dayEn;
    date1Data.textContent=date;
    date1Ar.textContent=dayAr;
}

function dateHijri(dayEn,dayAr,date){
    date2En.textContent=dayEn;
    date2Data.textContent=date;
    date2Ar.textContent=dayAr;
}

function createCard(arr){
    for (let name in namesOfSlaha){
        title[name].innerHTML=namesOfSlaha[name];
        time[name].innerHTML=arr[name];
    }
}
