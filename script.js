const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");
const dateInput = document.getElementById("date-input");
const timeInput = document.getElementById("time-input");

const liClasses = "relative pl-[45px] py-[8px] pr-[40px] before:content-[''] before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:h-[28px] before:w-[28px] before:rounded-full before:bg-cover before:bg-center before:bg-[url('../svgs/icons8-circle-50.png')] [&.checked]:text-[#555] [&.checked]:line-through [&.checked]:before:bg-[url('../svgs/correct.png')]";

const spanClasses = "absolute right-0 top-1/2 -translate-y-1/2 h-[40px] w-[40px] text-[22px] leading-[40px] text-center text-[#555] rounded-full hover:bg-[#E8E6DC]";

const addTask = () => {
    if (inputBox.value.trim() === '') {
        alert("You must write something!");
        return;
    }
    let li = document.createElement("li");
    li.innerHTML = inputBox.value;
    li.className = liClasses;
    listContainer.appendChild(li);

    const due = formatDue(dateInput.value, timeInput.value);
    if (due){
        const small = document.createElement("small");
        small.className = "block text-[13px] text-[#87867F] pointer-events-none";
        small.textContent = due;
        li.appendChild(small);
    }

    let span = document.createElement("span");
    span.innerHTML = "\u00d7";
    span.className = spanClasses;
    li.appendChild(span);

    inputBox.value = "";
    dateInput.value= "";
    timeInput.value= "";
    saveData();
};

listContainer.addEventListener("click", function(e){
    if(e.target.tagName === "LI"){
        e.target.classList.toggle("checked");
        saveData();
    }
    else if(e.target.tagName === "SPAN"){
        e.target.parentElement.remove();
        saveData();
    }
}, 
false); 

const saveData = () =>{
    localStorage.setItem("data", listContainer.innerHTML);
}

const showTask = () =>{
    listContainer.innerHTML = localStorage.getItem("data");
}

showTask();

const formatDue = (date, time) => {
    const parts = [];
    if(date){
        parts.push(new Date(date + "T00:00").toLocaleDateString(undefined, {day: "numeric", month : "short", year: "numeric"}));
    }
    if(time){
        parts.push(new Date("1970-01-01T" + time).toLocaleDateString(undefined, { hour: "numeric", minute: "2-digit"}));
    }
    return parts.join(" . ");
};