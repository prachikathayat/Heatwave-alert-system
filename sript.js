/* ==============================
   PASSWORD SHOW / HIDE
============================== */

const togglePassword =
    document.getElementById("togglePassword");

const password =
    document.getElementById("password");


togglePassword.addEventListener("click", function () {

    if (password.type === "password") {

        password.type = "text";

        togglePassword.textContent = "🙈";

    } else {

        password.type = "password";

        togglePassword.textContent = "👁";

    }

});


/* ==============================
   LOGIN
============================== */

const loginForm =
    document.getElementById("loginForm");


loginForm.addEventListener("submit", function(event) {

    event.preventDefault();


    const name =
        document.getElementById("name").value.trim();

    const userPassword =
        document.getElementById("password").value;


    const message =
        document.getElementById("loginMessage");


    if (name === "" || userPassword === "") {

        message.textContent =
            "Please enter your name and password.";

        message.style.color =
            "#ff5577";

        return;
    }


    message.textContent =
        "Opening HeatSync...";

    message.style.color =
        "#ffc857";


    /*
        DEMO LOGIN

        Any name + any password works.

        Later this section will be replaced
        with your friend's backend API.
    */

    const user = {

        name: name

    };


    localStorage.setItem(
        "heatSyncUser",
        JSON.stringify(user)
    );


    setTimeout(function() {

        window.location.href =
            "dashboard.html";

    }, 600);

});