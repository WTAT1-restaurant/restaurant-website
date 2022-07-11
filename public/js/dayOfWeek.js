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
    let opening = new Date(currentYear, currentMonth, currentDate, openingHour, openingMinute, 00, 000);
    let closing = new Date(currentYear, currentMonth, currentDate, closingHour, closingMinute, 59, 999);
    if (opening <= now <= closing) {
        return true;
    } else {
        return false;
    }
}