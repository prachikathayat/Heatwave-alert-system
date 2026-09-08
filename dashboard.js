/* =====================================
   HEATSYNC DASHBOARD
===================================== */


/* =====================================
   USER INFORMATION
===================================== */

const savedUser =
    JSON.parse(
        localStorage.getItem("heatSyncUser")
    );


if (savedUser) {

    const name =
        savedUser.name || "HeatSync User";


    document.getElementById("userName")
        .textContent = name;


    document.getElementById("sidebarName")
        .textContent = name;


    document.getElementById("profileName")
        .textContent = name;


    document.getElementById("userInitial")
        .textContent =
        name.charAt(0).toUpperCase();


    document.getElementById("profileInitial")
        .textContent =
        name.charAt(0).toUpperCase();

}


/* =====================================
   LOCATION
===================================== */

function detectLocation() {

    const locationElements = [
        document.getElementById("location"),
        document.getElementById("sidebarLocation"),
        document.getElementById("weatherLocation"),
        document.getElementById("profileLocation")
    ];


    /*
        We can get the device location,
        but we DON'T request weather here.

        Weather will come from backend later.
    */

    if (!navigator.geolocation) {

        setLocationText("Location unavailable");

        return;

    }


    navigator.geolocation.getCurrentPosition(

        function(position) {

            /*
                We intentionally don't convert
                coordinates into weather.

                Backend will use the user's
                area/location later.
            */

            setLocationText(
                "Your area"
            );

        },

        function() {

            setLocationText(
                "Location not shared"
            );

        }

    );

}


function setLocationText(text) {

    const elements = [
        document.getElementById("location"),
        document.getElementById("sidebarLocation"),
        document.getElementById("weatherLocation"),
        document.getElementById("profileLocation")
    ];


    elements.forEach(function(element) {

        if (element) {

            if (
                element.id === "weatherLocation"
            ) {

                element.textContent =
                    "Weather for " +
                    text +
                    " will appear here.";

            }

            else {

                element.textContent = text;

            }

        }

    });

}


detectLocation();


/* =====================================
   SIDEBAR NAVIGATION
===================================== */

const navLinks =
    document.querySelectorAll(".nav-link");


const sections =
    document.querySelectorAll(".dashboard-section");


navLinks.forEach(function(link) {

    link.addEventListener("click", function() {

        const target =
            link.dataset.section;


        /*
            Remove active from every button.
        */

        navLinks.forEach(function(item) {

            item.classList.remove("active");

        });


        /*
            Add active to clicked button.
        */

        link.classList.add("active");


        /*
            Hide every section.
        */

        sections.forEach(function(section) {

            section.classList.remove(
                "active-section"
            );

        });


        /*
            Show selected section.
        */

        const selectedSection =
            document.getElementById(target);


        if (selectedSection) {

            selectedSection.classList.add(
                "active-section"
            );

        }


        /*
            Change page subtitle.
        */

        const subtitle =
            document.getElementById("pageSubtitle");


        const subtitles = {

            home:
                "Here's your thermal picture for today.",

            weather:
                "Weather conditions for your area.",

            thermal:
                "Understand your Human Thermal Stress Index.",

            risk:
                "Explore heat vulnerability by age.",

            alerts:
                "Check important heatwave warnings.",

            profile:
                "Manage your HeatSync profile.",

            settings:
                "Application and backend settings."

        };


        subtitle.textContent =
            subtitles[target] || "";

    });

});


/* =====================================
   AGE PROFILES
===================================== */

const ageCards =
    document.querySelectorAll(".age-card");


const ageResponse =
    document.getElementById("ageResponse");


const ageInformation = {

    child: {

        title:
            "Children selected",

        text:
            "Children can be more vulnerable to extreme heat. Personalized risk level, suggestions and precautions will be provided by the backend."

    },


    adult: {

        title:
            "Adults selected",

        text:
            "Adult heat vulnerability will depend on environmental conditions and personal factors. Final risk information will come from the backend."

    },


    senior: {

        title:
            "Older adults selected",

        text:
            "Older adults may require additional heat-safety attention. The backend will provide the personalized risk level and recommendations."

    },


    elderly: {

        title:
            "Elderly 75+ selected",

        text:
            "The 75+ age group may require enhanced heat monitoring. Personalized recommendations will be supplied after backend integration."

    }

};


ageCards.forEach(function(card) {

    card.addEventListener("click", function() {

        const selectedAge =
            card.dataset.age;


        ageCards.forEach(function(item) {

            item.classList.remove("selected");

        });


        card.classList.add("selected");


        const information =
            ageInformation[selectedAge];


        ageResponse.classList.add("show");


        ageResponse.innerHTML = `

            <strong>
                ${information.title}
            </strong>

            <p>
                ${information.text}
            </p>

        `;

    });

});


/* =====================================
   RISK PAGE AGE BUTTONS
===================================== */

const riskProfiles =
    document.querySelectorAll(".risk-profile");


const riskResponse =
    document.getElementById("riskResponse");


riskProfiles.forEach(function(profile) {

    profile.addEventListener("click", function() {

        const age =
            profile.dataset.age;


        const names = {

            child: "Children — 0–17 years",

            adult: "Adults — 18–59 years",

            senior: "Older Adults — 60–74 years",

            elderly: "Elderly — 75+ years"

        };


        riskResponse.innerHTML = `

            <div>
                🧍
            </div>

            <h3>
                ${names[age]}
            </h3>

            <p>
                This profile has been selected.
                Personalized vulnerability score,
                suggestions and precautions will appear
                after the backend is connected.
            </p>

            <span>
                WAITING FOR BACKEND DATA
            </span>

        `;

    });

});


/* =====================================
   BACKEND MESSAGE
===================================== */

function showBackendMessage() {

    alert(
        "Backend data is not connected yet. Your friend's API can be connected here later."
    );

}


/* =====================================
   LOGOUT
===================================== */

const logoutBtn =
    document.getElementById("logoutBtn");


logoutBtn.addEventListener("click", function() {

    localStorage.removeItem(
        "heatSyncUser"
    );


    localStorage.removeItem(
        "heatSyncToken"
    );


    window.location.href =
        "index.html";

});