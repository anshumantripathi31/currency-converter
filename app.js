const Base_url="https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";

 const dropdown=document.querySelectorAll(".dropdown select");
 const btn=document.querySelector("form button");
 const fromCurr=document.querySelector(".from select");
 const toCurr=document.querySelector(".to select")
 const msg=document.querySelector(".msg");
 const icon=document.querySelector("i");
 document.addEventListener(".load",()=>{
   updateExchangeRate(); 
 });
 

 for(let select of dropdown){
    for(currcode in countryList){
        let newOption=document.createElement("option");
         newOption.innerText=currcode;
         newOption.value=currcode;  
         if(select.name ==="from" && currcode==="USD"){
            newOption.selected="selected";
         }
         if(select.name ==="to" && currcode==="INR"){
            newOption.selected="selected";
         }
         select.append(newOption);
 }
  
 select.addEventListener("change",(evt)=>{
  updateFlag(evt.target);
//  evt.target give where change occur

 });
}
const updateFlag= (element)=>{
    let currcode=element.value;
   //  console.log(currcode);

    let countrycode= countryList[currcode];
    //console.log(countrycode);
let newSrc=`https://flagsapi.com/${countrycode}/flat/64.png`
let img=element.parentElement.querySelector("img");
img.src=newSrc;
};
 const updateExchangeRate= async()=>{
    let amount=document.querySelector(".amount input");
    let amtVal=amount.value;
    if(amtVal===""||amtVal<1){
        amtVal=1;
        amount.value="1";
    }
        const URL=`${Base_url}/${fromCurr.value.toLowerCase()}.json`;
        let response=await axios.get(URL);
        
        let rate = response.data[fromCurr.value.toLowerCase()][toCurr.value.toLowerCase()];
        
        let finalAmount=amtVal*rate;
        msg.innerText=`${amtVal} ${fromCurr.value}=${finalAmount.toFixed(4)} ${toCurr.value}`
 }
 
 btn.addEventListener("click",(evt)=>{
    evt.preventDefault();
    // to prevent form by doing default action means it will now only perform what we want
    updateExchangeRate()
 });
 window.addEventListener("load",()=>{
    updateExchangeRate();
 })

 icon.addEventListener("click",handleSelectChange)
 function handleSelectChange(event) {  
  if(fromCurr.name==="from" && toCurr.name==="to"){  
   [toCurr.value,fromCurr.value]=[fromCurr.value,toCurr.value];
   let fromImg=countryList[fromCurr.value];
   let newSrc=`https://flagsapi.com/${fromImg}/flat/64.png`;
   let img1=fromCurr.parentElement.querySelector("img");
   img1.src=newSrc;
   let toImg=countryList[toCurr.value];
   let newSrc2=`https://flagsapi.com/${toImg}/flat/64.png`;
   let img2=toCurr.parentElement.querySelector("img");
   img2.src=newSrc2;
  } 
 
   
  }
 
   
 