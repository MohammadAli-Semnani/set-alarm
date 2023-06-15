//selectors
let selectItem = document.querySelectorAll("select");
let timeBox = document.querySelector(".time")
let button = document.querySelector("button");
let content = document.querySelector(".content");
const ring = new Audio('./music/ring.mp3')
let alarmState = "set";
let currentTime, alarmTime;
//codes
for (let m = 0; m <= 23; m++){
    m = m < 10 ? '0' + m : m;
    let option = `<option value="${m}" >${m}</option>`;
    selectItem[0].firstElementChild.insertAdjacentHTML('afterend', option)
}

for (let m = 0; m <= 59; m++) {
    m = m < 10 ? "0" + m : m;
    let option = `<option value="${m}" >${m}</option>`;
    selectItem[1].firstElementChild.insertAdjacentHTML("afterend", option);
}

setInterval(() => {
    let time = new Date();
    let hour = time.getHours();
    let minute = time.getMinutes();
    let second = time.getSeconds();
    hour = hour < 10 ? "0" + hour : hour;
    minute = minute < 10 ? "0" + minute : minute;
    second = second < 10 ? "0" + second : second;
    currentTime = `${hour}:${minute}:${second}`
    timeBox.innerHTML = currentTime
    if (alarmTime == `${hour}:${minute}`) {
        ring.play();
        ring.loop = true;
    }
}, 1000);

button.addEventListener("click", () => {
    alarmTime = `${selectItem[0].value}:${selectItem[1].value}`;
    if (
      selectItem[0].value === "hour" ||
      selectItem[1].value === "minute"
    ) {
        return alert("لطفا زمان هشدار را به درستی وارد کنید .")
    } 
    checkState(alarmState);
})

function checkState(state) {
    if (state == "set") {
        content.classList.add("disable");
        button.innerText = 'Clear Alarm';
        alarmState = "noset";
    } else {
        content.classList.remove("disable");
        ring.pause();
        alarmTime = ''
        button.innerText = "Set Alarm";
        alarmState = "set";
    }
}