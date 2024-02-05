const BASE_URL = "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";

const dropdowns = document.querySelectorAll(".dropdown select"); //2 selects we have.

const btn = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");


// for (code in countryList){
//     console.log(code,countryList[code]);//first is currency code and next is country code.
// }


//we convert whole country list into individual options and in the select add one by one that options...
for (let select of dropdowns){
    for (currCode in countryList){
        let newOption = document.createElement("option");
        newOption.innerText = currCode;
        newOption.value = currCode;
        if(select.name ==="from" && currCode==="USD"){
            newOption.selected = "selected";
        }
        else if(select.name ==="to" && currCode === "INR"){
            newOption.selected = "selected";
        }
        select.append(newOption);
    }

    select.addEventListener("change",(evt)=>{
        updateFlag(evt.target);
    })//eventlistener on select ele and that ele pass to the update flag...
}


const updateFlag = (element)=>{
    // console.log(element);//element here we get then we can use that to get whatever we want...
    let currCode = element.value;//based on currency code we want new flag image.
    // console.log(currCode);
    let countryCode = countryList[currCode];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newSrc;
}


btn.addEventListener("click",(evt)=>{
    evt.preventDefault();//by default whatever occurs i don't want that all...
    updateExchange();
})

const updateExchange = async ()=>{
    let amt = document.querySelector(".amount input");
    let amtVal = amt.value;
    // console.log(amtVal);
    //IF amount value is null or <1 then will make it equal to 1.
    if(amtVal===""||amtVal<1){
        amtVal=1;
        amt.value = "1";
    }
    
    // console.log(fromCurr.value, toCurr.value);//from to simply gives full ele we want it's value.
    const URL = `${BASE_URL}/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`;
    //fetch api will use on above url...
    
    let response = await fetch(URL);
    let data = await response.json();
    let rate = data[toCurr.value.toLowerCase()]//ispe hamra rate available hai. Exchange rate aajyege and usse hame amount se multiply karna hoga...
    let finalAmt = amtVal * rate;
    // msg.innerText = `1USD = 80INR`;
    msg.innerText = `${amtVal} ${fromCurr.value} = ${finalAmt} ${toCurr.value}`;
}

window.addEventListener("load",()=>{
    updateExchange();
})//first time when document gets loaded we want that first conversion gets shown.