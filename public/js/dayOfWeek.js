function getWeekday() {
    const weekdays = ["sunday","monday","tuesday","wednesday","thursday","friday","saturday"];
    let now = new Date();
    let currentWeekday = weekdays[now.getDay()];
    return currentWeekday;
}

function getHour() {
    let now = new Date();
    let currentHour = now.getHours();
    return currentHour;
}

function getMinute() {
    let now = new Date();
    let currentMinute = now.getMinutes();
    return currentMinute;
}

function isOpen(openingHour, openingMinute, closingHour, closingMinute) {
    let now = new Date();
    let currentYear = now.getFullYear();
    let currentMonth = now.getMonth();
    let currentDate = now.getDate();
    let openingTime = new Date(currentYear, currentMonth, currentDate, openingHour, openingMinute, 00, 000);
    let closingTime = new Date(currentYear, currentMonth, currentDate, closingHour, closingMinute, 59, 999);
    // console.log({openingTime, now, closingTime});

    return now > openingTime && now < closingTime;
}
// tests
// console.log("isOpen", isOpen(14, 30, 22, 00));
// console.log("isOpen", isOpen(12, 50, 23, 30));
// console.log("isOpen", isOpen(13, 00, 24, 00));
// console.log("isOpen", isOpen(12, 00, 14, 30));