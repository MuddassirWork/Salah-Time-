/* =========================
   Page Navigation
========================= */

const sections = [

    document.getElementById("home"),

    document.getElementById("prayer-times"),

    document.getElementById("calendar"),

    document.getElementById("tasbeeh"),

    document.getElementById("about")

];


const navLinks =
    document.querySelectorAll(
        ".nav-links a, .logo-container"
    );


const footer =
    document.querySelector("footer");


function showSection(sectionId) {

    /* Hide all sections */

    sections.forEach(
        function(section) {

            if (section) {

                section.style.display =
                    "none";

            }

        }
    );


    /* =========================
       Show Selected Section
    ========================= */

    const selectedSection =
        document.getElementById(
            sectionId
        );


    if (selectedSection) {

        if (sectionId === "home") {

            selectedSection.style.display =
                "flex";

        } else {

            selectedSection.style.display =
                "block";

        }

    }


    /* =========================
       Footer
       Only About Page
    ========================= */

    if (footer) {

        if (sectionId === "about") {

            footer.style.display =
                "block";

        } else {

            footer.style.display =
                "none";

        }

    }


    /* =========================
       Active Navbar Highlight
    ========================= */

    navLinks.forEach(
        function(link) {

            link.classList.remove(
                "active"
            );


            if (
                link.classList.contains(
                    "nav-link"
                ) &&
                link.getAttribute(
                    "href"
                ) === "#" + sectionId
            ) {

                link.classList.add(
                    "active"
                );

            }

        }
    );


    /* =========================
       Scroll To Top
    ========================= */

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}


/* =========================
   Navigation Click
========================= */

navLinks.forEach(
    function(link) {

        link.addEventListener(
            "click",
            function(event) {

                event.preventDefault();


                const href =
                    link.getAttribute(
                        "href"
                    );


                if (!href) {

                    return;

                }


                const sectionId =
                    href.substring(1);


                showSection(
                    sectionId
                );

            }
        );

    }
);


/* =========================
   Show Home On Startup
========================= */

showSection("home");



/* =========================
   City Prayer Times
========================= */

const cityPrayerTimes = {

    Pune: {

        Fajr: "05:10",
        Dhuhr: "12:35",
        Asr: "16:05",
        Maghrib: "18:45",
        Isha: "20:05"

    },


    Mumbai: {

        Fajr: "05:15",
        Dhuhr: "12:40",
        Asr: "16:10",
        Maghrib: "18:50",
        Isha: "20:10"

    },


    Delhi: {

        Fajr: "04:50",
        Dhuhr: "12:30",
        Asr: "16:00",
        Maghrib: "18:40",
        Isha: "20:00"

    },


    Bangalore: {

        Fajr: "05:05",
        Dhuhr: "12:25",
        Asr: "15:55",
        Maghrib: "18:35",
        Isha: "19:55"

    },


    Hyderabad: {

        Fajr: "05:00",
        Dhuhr: "12:30",
        Asr: "16:00",
        Maghrib: "18:40",
        Isha: "20:00"

    }

};



/* =========================
   Prayer Elements
========================= */

const prayerCards = {

    Fajr:
        document.getElementById("fajr-card"),

    Dhuhr:
        document.getElementById("dhuhr-card"),

    Asr:
        document.getElementById("asr-card"),

    Maghrib:
        document.getElementById("maghrib-card"),

    Isha:
        document.getElementById("isha-card")

};


const nextPrayerName =
    document.getElementById(
        "next-prayer-name"
    );


const nextPrayerTime =
    document.getElementById(
        "next-prayer-time"
    );


const countdown =
    document.getElementById(
        "countdown"
    );


const citySelect =
    document.getElementById(
        "city-select"
    );


const locationText =
    document.querySelector(
        ".location"
    );



/* =========================
   Convert 24 Hour Time
   To Display Time
========================= */

function formatPrayerTime(time) {

    const parts =
        time.split(":");


    let hour =
        parseInt(parts[0]);


    const minute =
        parts[1];


    let period = "AM";


    if (hour >= 12) {

        period = "PM";

    }


    if (hour > 12) {

        hour -= 12;

    }


    if (hour === 0) {

        hour = 12;

    }


    return (
        hour +
        ":" +
        minute +
        " " +
        period
    );

}



/* =========================
   Update Prayer Cards
========================= */

function updatePrayerTimes(city) {

    const times =
        cityPrayerTimes[city];


    if (!times) {

        return;

    }


    Object.keys(times).forEach(
        function(prayer) {

            const card =
                prayerCards[prayer];


            if (card) {

                const timeElement =
                    card.querySelector("p");


                if (timeElement) {

                    timeElement.textContent =
                        formatPrayerTime(
                            times[prayer]
                        );

                }

            }

        }
    );


    if (locationText) {

        locationText.textContent =
            city + ", India";

    }


    updatePrayerStatus(
        city
    );

}



/* =========================
   Prayer Status
========================= */

function updatePrayerStatus(city) {

    const times =
        cityPrayerTimes[city];


    const now =
        new Date();


    const currentMinutes =
        now.getHours() * 60 +
        now.getMinutes();


    const prayerOrder = [

        "Fajr",
        "Dhuhr",
        "Asr",
        "Maghrib",
        "Isha"

    ];


    let currentPrayer = null;

    let nextPrayer = null;


    /* Find current prayer */

    for (
        let i = 0;
        i < prayerOrder.length;
        i++
    ) {

        const prayer =
            prayerOrder[i];


        const [
            hours,
            minutes
        ] =
            times[prayer]
                .split(":")
                .map(Number);


        const prayerMinutes =
            hours * 60 +
            minutes;


        if (
            currentMinutes >=
            prayerMinutes
        ) {

            currentPrayer =
                prayer;

        }

    }


    /* Before Fajr */

    if (
        currentPrayer === null
    ) {

        currentPrayer =
            "Isha";

    }


    /* Find next prayer */

    for (
        let i = 0;
        i < prayerOrder.length;
        i++
    ) {

        const prayer =
            prayerOrder[i];


        const [
            hours,
            minutes
        ] =
            times[prayer]
                .split(":")
                .map(Number);


        const prayerMinutes =
            hours * 60 +
            minutes;


        if (
            prayerMinutes >
            currentMinutes
        ) {

            nextPrayer =
                prayer;

            break;

        }

    }


    /* After Isha */

    if (
        nextPrayer === null
    ) {

        nextPrayer =
            "Fajr";

    }


    /* Reset all cards */

    prayerOrder.forEach(
        function(prayer) {

            const card =
                prayerCards[prayer];


            if (!card) {

                return;

            }


            const status =
                card.querySelector(
                    ".prayer-status"
                );


            card.classList.remove(
                "active",
                "current-prayer"
            );


            status.textContent =
                "";


            status.classList.remove(
                "current",
                "upcoming",
                "completed"
            );

        }
    );


    /* Current prayer */

    const currentCard =
        prayerCards[currentPrayer];


    if (currentCard) {

        const currentStatus =
            currentCard.querySelector(
                ".prayer-status"
            );


        currentCard.classList.add(
            "current-prayer"
        );


        currentStatus.textContent =
            "Current";


        currentStatus.classList.add(
            "current"
        );

    }


    /* Next prayer */

    if (
        nextPrayer !==
        currentPrayer
    ) {

        const nextCard =
            prayerCards[nextPrayer];


        if (nextCard) {

            const nextStatus =
                nextCard.querySelector(
                    ".prayer-status"
                );


            nextStatus.textContent =
                "Upcoming";


            nextStatus.classList.add(
                "upcoming"
            );

        }

    }

}



/* =========================
   Find Next Prayer
========================= */

function getNextPrayer(city) {

    const times =
        cityPrayerTimes[city];


    const now =
        new Date();


    const currentMinutes =
        now.getHours() * 60 +
        now.getMinutes();


    const prayerOrder = [

        "Fajr",
        "Dhuhr",
        "Asr",
        "Maghrib",
        "Isha"

    ];


    for (
        let i = 0;
        i < prayerOrder.length;
        i++
    ) {

        const prayer =
            prayerOrder[i];


        const parts =
            times[prayer].split(":");


        const prayerMinutes =
            parseInt(parts[0]) * 60 +
            parseInt(parts[1]);


        if (
            prayerMinutes >
            currentMinutes
        ) {

            return {

                name: prayer,

                time: times[prayer]

            };

        }

    }


    return {

        name: "Fajr",

        time: times.Fajr,

        tomorrow: true

    };

}



/* =========================
   Update Next Prayer
========================= */

function updateNextPrayer(city) {

    const next =
        getNextPrayer(city);


    if (nextPrayerName) {

        nextPrayerName.textContent =
            next.name;

    }


    if (nextPrayerTime) {

        nextPrayerTime.textContent =
            formatPrayerTime(
                next.time
            );

    }

}



/* =========================
   Countdown
========================= */

function updateCountdown(city) {

    const next =
        getNextPrayer(city);


    const now =
        new Date();


    const parts =
        next.time.split(":");


    const target =
        new Date();


    target.setHours(
        parseInt(parts[0]),
        parseInt(parts[1]),
        0,
        0
    );


    if (next.tomorrow) {

        target.setDate(
            target.getDate() + 1
        );

    }


    let difference =
        target.getTime() -
        now.getTime();


    if (
        difference < 0
    ) {

        difference = 0;

    }


    const totalSeconds =
        Math.floor(
            difference / 1000
        );


    const hours =
        Math.floor(
            totalSeconds / 3600
        );


    const minutes =
        Math.floor(
            (totalSeconds % 3600) / 60
        );


    const seconds =
        totalSeconds % 60;


    if (countdown) {

        countdown.textContent =

            String(hours).padStart(
                2,
                "0"
            ) +

            ":" +

            String(minutes).padStart(
                2,
                "0"
            ) +

            ":" +

            String(seconds).padStart(
                2,
                "0"
            );

    }

}



/* =========================
   City Selection
========================= */

if (citySelect) {

    citySelect.addEventListener(
        "change",
        function() {

            const selectedCity =
                citySelect.value;


            updatePrayerTimes(
                selectedCity
            );


            updateNextPrayer(
                selectedCity
            );


            updateCountdown(
                selectedCity
            );

        }
    );

}



/* =========================
   Current Date & Time
========================= */

function updateDateTime() {

    const now =
        new Date();


    const dateElement =
        document.getElementById(
            "current-date"
        );


    const timeElement =
        document.getElementById(
            "current-time"
        );


    if (dateElement) {

        dateElement.textContent =
            now.toLocaleDateString(
                "en-IN",
                {
                    weekday: "long",
                    day: "numeric",
                    month: "long",
                    year: "numeric"
                }
            );

    }


    if (timeElement) {

        timeElement.textContent =
            now.toLocaleTimeString(
                "en-IN",
                {
                    hour: "numeric",
                    minute: "2-digit",
                    second: "2-digit",
                    hour12: true
                }
            );

    }

}



/* =========================
   Hijri Calendar
========================= */

let calendarDate =
    new Date();


function updateHijriCalendar() {

    const hijriMonth =
        document.getElementById(
            "hijri-month"
        );


    const calendarMonthYear =
        document.getElementById(
            "calendar-month-year"
        );


    const hijriTodayInfo =
        document.getElementById(
            "hijri-today-info"
        );


    const gregorianDate =
        document.getElementById(
            "gregorian-date"
        );


    if (!hijriMonth) {

        return;

    }


    const formatter =
        new Intl.DateTimeFormat(
            "en-TN-u-ca-islamic",
            {
                day: "numeric",
                month: "long",
                year: "numeric"
            }
        );


    const hijriDate =
        formatter.format(
            calendarDate
        );


    hijriMonth.textContent =
        hijriDate;


    calendarMonthYear.textContent =
        calendarDate.toLocaleDateString(
            "en-IN",
            {
                month: "long",
                year: "numeric"
            }
        );


    const today =
        new Date();


    if (hijriTodayInfo) {

        hijriTodayInfo.textContent =
            formatter.format(today);

    }


    if (gregorianDate) {

        gregorianDate.textContent =
            today.toLocaleDateString(
                "en-IN",
                {
                    day: "numeric",
                    month: "long",
                    year: "numeric"
                }
            );

    }


    generateCalendarDays();

}



/* =========================
   Generate Calendar Days
========================= */

function generateCalendarDays() {

    const calendarDays =
        document.getElementById(
            "calendar-days"
        );


    if (!calendarDays) {

        return;

    }


    calendarDays.innerHTML =
        "";


    const year =
        calendarDate.getFullYear();


    const month =
        calendarDate.getMonth();


    const firstDay =
        new Date(
            year,
            month,
            1
        ).getDay();


    const totalDays =
        new Date(
            year,
            month + 1,
            0
        ).getDate();


    /* Empty days */

    for (
        let i = 0;
        i < firstDay;
        i++
    ) {

        const emptyDay =
            document.createElement(
                "div"
            );


        emptyDay.classList.add(
            "calendar-empty"
        );


        calendarDays.appendChild(
            emptyDay
        );

    }


    /* Actual days */

    for (
        let day = 1;
        day <= totalDays;
        day++
    ) {

        const dayElement =
            document.createElement(
                "div"
            );


        dayElement.textContent =
            day;


        dayElement.classList.add(
            "calendar-day"
        );


        const today =
            new Date();


        if (
            day === today.getDate() &&
            month === today.getMonth() &&
            year === today.getFullYear()
        ) {

            dayElement.classList.add(
                "today"
            );

        }


        calendarDays.appendChild(
            dayElement
        );

    }

}



/* =========================
   Previous Month
========================= */

const previousMonth =
    document.getElementById(
        "previous-month"
    );


if (previousMonth) {

    previousMonth.addEventListener(
        "click",
        function() {

            calendarDate.setMonth(
                calendarDate.getMonth() - 1
            );


            updateHijriCalendar();

        }
    );

}



/* =========================
   Next Month
========================= */

const nextMonth =
    document.getElementById(
        "next-month"
    );


if (nextMonth) {

    nextMonth.addEventListener(
        "click",
        function() {

            calendarDate.setMonth(
                calendarDate.getMonth() + 1
            );


            updateHijriCalendar();

        }
    );

}



/* =========================
   Back To Top
========================= */

const backToTop =
    document.getElementById(
        "back-to-top"
    );


if (backToTop) {

    backToTop.addEventListener(
        "click",
        function() {

            showSection(
                "home"
            );

        }
    );

}



/* =========================
   Digital Tasbeeh
========================= */

let tasbeehCount = 0;

let currentZikr =
    "SubhanAllah";


const tasbeehCountDisplay =
    document.getElementById(
        "tasbeehCount"
    );


const zikrNameDisplay =
    document.getElementById(
        "zikrName"
    );


const tasbeehButton =
    document.getElementById(
        "tasbeehButton"
    );


const tasbeehReset =
    document.getElementById(
        "tasbeehReset"
    );


const zikrButtons =
    document.querySelectorAll(
        ".zikr-btn"
    );



/* =========================
   Increase Count
========================= */

if (tasbeehButton) {

    tasbeehButton.addEventListener(
        "click",
        function() {

            if (
                tasbeehCount < 33
            ) {

                tasbeehCount++;

                tasbeehCountDisplay.textContent =
                    tasbeehCount;

            }


            if (
                tasbeehCount === 33
            ) {

                alert(
                    "MashaAllah! You completed 33 " +
                    currentZikr +
                    "."
                );

            }

        }
    );

}



/* =========================
   Reset Count
========================= */

if (tasbeehReset) {

    tasbeehReset.addEventListener(
        "click",
        function() {

            tasbeehCount = 0;

            tasbeehCountDisplay.textContent =
                tasbeehCount;

        }
    );

}



/* =========================
   Change Zikr
========================= */

zikrButtons.forEach(
    function(button) {

        button.addEventListener(
            "click",
            function() {

                currentZikr =
                    this.dataset.zikr;


                zikrNameDisplay.textContent =
                    currentZikr;


                tasbeehCount = 0;


                tasbeehCountDisplay.textContent =
                    tasbeehCount;


                zikrButtons.forEach(
                    function(btn) {

                        btn.classList.remove(
                            "active"
                        );

                    }
                );


                this.classList.add(
                    "active"
                );

            }
        );

    }
);



/* =========================
   Initial Setup
========================= */

const defaultCity =
    citySelect
        ? citySelect.value
        : "Pune";


updatePrayerTimes(
    defaultCity
);


updateNextPrayer(
    defaultCity
);


updateDateTime();


updateHijriCalendar();



/* =========================
   Live Updates
========================= */

setInterval(
    function() {

        updateDateTime();


        const currentCity =
            citySelect
                ? citySelect.value
                : "Pune";


        updatePrayerStatus(
            currentCity
        );


        updateNextPrayer(
            currentCity
        );


        updateCountdown(
            currentCity
        );

    },
    1000
);