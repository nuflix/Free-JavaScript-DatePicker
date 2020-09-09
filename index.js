let isItFirstMakeItDatePicker=false;

function makeItDatePicker(el, curDate){

    if(!isItFirstMakeItDatePicker){
        document.body.addEventListener("click", datePickerClick);
        isItFirstMakeItDatePicker=true;
    }

    let currentDate="";
    if(curDate){
        currentDate=curDate;
    }else{
        currentDate=new Date();
        currentDate=(currentDate.getMonth()+1) + "," + currentDate.getFullYear();
    }

    let currDay = new Date();
    currDay.setFullYear(currentDate.split(",")[1]);
    currDay.setMonth(currentDate.split(",")[0]-1);
    currDay.setDate(1);

    currDay=currDay.getDay();
    currDay=currDay-1;
    if(currDay==-1){
        currDay=6;
    }

    let dayCounter=0;
    let dayOpened=true;
    let helperHTML = '<div class="daysRow">';

    for (let i=0;i<currDay;i++){
        dayCounter++;
        helperHTML+='<div class="datePickerDay emptyDay"></div>';
    }

    for(let i=1; i<32; i++){
        dayCounter++;
        helperHTML += '<div class="datePickerDay">' + i + '</div>'
        if(dayCounter%7==0){
            helperHTML+="</div>";
            helperHTML+='<div class="daysRow">';
        }
    }
helperHTML+="</div>";

    helperHTML='<div class="datePickerDays">' + helperHTML + '</div>'
    el.innerHTML = '<div class="datePickerWhole"><div class="datePickerTitle"><div class="datePickerLeft">&lt;-</div><div class="datePickerMonth">' + currentDate + '</div><div class="datePickerRight">&gt;</div></div>' + helperHTML + '</div>';

    for(let i=0; i<3; i++){
        if(daysInMonth(currentDate.split(",")[0], currentDate.split(",")[1])+i<31){
            /* console.log(daysInMonth(currentDate.split(",")[0], currentDate.split(",")[1])); */
/*     document.getElementsByClassName("datePickerDay")[30+currDay-i].innerHTML=""; */
    document.getElementsByClassName("datePickerDay")[30+currDay-i].classList.add("emptyDay");
        }
    }

}

function daysInMonth (month, year) {
    return new Date(year, month, 0).getDate();
}

function datePickerClick(){
    let dateHelper="";
    let monthHelper=0;
    let yearHelper=0;
    if(event.target.classList.contains("datePickerLeft")){
        dateHelper=event.target.parentElement.getElementsByClassName("datePickerMonth")[0].innerHTML;
        monthHelper=dateHelper.split(",")[0];
        yearHelper=dateHelper.split(",")[1];
        if(monthHelper>1){
            monthHelper--;
        }else{
            monthHelper=12;
            yearHelper--;
        }
        makeItDatePicker(event.target.parentElement.parentElement.parentElement, (monthHelper + "," + yearHelper));
    }else if(event.target.classList.contains("datePickerRight")){
        dateHelper=event.target.parentElement.getElementsByClassName("datePickerMonth")[0].innerHTML;
        monthHelper=dateHelper.split(",")[0];
        yearHelper=dateHelper.split(",")[1];
        if(monthHelper<12){
            monthHelper++;
        }else{
            monthHelper=1;
            yearHelper++;
        }
        makeItDatePicker(event.target.parentElement.parentElement.parentElement, (monthHelper + "," + yearHelper));
    }
}