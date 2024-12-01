const baseURL ="https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";
const btn = document.querySelector(".btn");
const fromcurr = document.querySelector(".from select");
const tocurr = document.querySelector(".to select");
const mgs = document.querySelector(".msg");

const dropdowns = document.querySelectorAll(".dropdown select");
for(let select of dropdowns) {
    for(currcode in countryList) {
        let newoption = document.createElement("option");
        newoption.innerText = currcode;
        newoption.value = currcode;
        if(select.name==="from" && currcode==="INR"){
            newoption.selected="selected";
        }
        else if(select.name==="to" && currcode==="USD"){
            newoption.selected="selected";
        }
        select.append(newoption);
    }
    select.addEventListener("change",(evt) => {
        updateFlag(evt.target);
    });
}
const updateFlag = (element) => {
    let currcode = element.value;
    let countrycode =countryList[currcode];
    let newsrc = `https://flagsapi.com/${countrycode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newsrc;
};

btn.addEventListener("click",async (evt) => {
    evt.preventDefault();
    let amount = document.querySelector(".amount input");
    let amtval = amount.value;
    if(amtval<0 || amtval ==="")
    {
        amtval = 1;
        amount.value="1";
    }
    const URL = `${baseURL}/${fromcurr.value.toLowerCase()}/${tocurr.value.toLowerCase()}.json`;

    const response = await fetch(URL);
    let data=await response.json();
    let rate = data[tocurr.value.toLowerCase()];
    let final_amount = rate * amtval;

    msg.innerText = `${amtval} ${fromcurr.value} = ${final_amount} ${tocurr.value}`;

})