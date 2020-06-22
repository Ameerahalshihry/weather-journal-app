/* Global Variables */
let baseURL = 'http://api.openweathermap.org/data/2.5/forecast?zip=';
let apiKey = '&appid=879646a825aae05b6d66bad17aaa6017';

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

//DOM selector 
document.querySelector('#generate').addEventListener('click', (e) => {
    const zipCode = document.querySelector('#zip').value
    const feelings = document.querySelector('#feelings').value
    retrieveData(baseURL, zipCode, apiKey)
        .then((data)=>{
            console.log(data);
            postData('/add', {temperature:data.list[0].main.temp,date:d,userFeelings:feelings})
            updateUI()
        })
})

//Async GET
const retrieveData = async (baseURL, zipCode, apiKey) => {
    const res = await fetch(baseURL+zipCode+apiKey)
    try{
        const data = await res.json();
        return data;
    }catch(error) {
        console.log('error'+ error);
    }
}

//Async POST
const postData = async (url='', data = {}) => {
    const res = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    try{
        const newData = await res.json()
        return newData 
    }catch(err){
        console.log('error',err);
    }
}

//UPDATE UI
const updateUI = async () => {
    const req = await fetch('/all')
    try{
        const allData = await req.json()
        console.log(allData);
        document.querySelector('#date').innerHTML = `Today's date : ${allData[0].date}`;
        document.querySelector('#temp').innerHTML = `Today's Temperature : ${allData[0].temperature}`;
        document.querySelector('#content').innerHTML =`Your feelings today : ${allData[0].content}` ;
    }catch(err){
        console.log('error', err);
    }
}