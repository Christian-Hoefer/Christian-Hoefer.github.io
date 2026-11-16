// Event Listeners
loadStates();
document.querySelector("#zip").addEventListener("change", displayCity);
document.querySelector("#state").addEventListener("change", displayCounties);
document.querySelector("#username").addEventListener("change", checkUsername);
document.querySelector("#signupForm").addEventListener("submit", validateForm);
document.querySelector("#password").addEventListener("click", suggestPassword);


async function displayCity() {
    // alert(document.querySelector("#zip").value);

    let zipError = document.querySelector("#zipError");

    try {
        let zipCode = document.querySelector("#zip").value;
        let url = `https://csumb.space/api/geo/cityInfoAPI.php?zip=${zipCode}`;
        let response = await fetch(url);
        let data = await response.json();

        // the API returns false when the zip code is not found
        if (data === false) {
            zipError.textContent = "Zip code not found";
            zipError.style.color = "red";
            document.querySelector("#city").textContent = "";
            document.querySelector("#latitude").textContent = "";
            document.querySelector("#longitude").textContent = "";
            return;
        }

        zipError.textContent = "";
        document.querySelector("#city").textContent = data.city;
        document.querySelector("#latitude").textContent = data.latitude;
        document.querySelector("#longitude").textContent = data.longitude;

    } catch (error) {
        zipError.textContent = "Unable to retrieve city";
        zipError.style.color = "red";
        console.error(error);
    }

}

async function loadStates() {
    let stateMenu = document.querySelector("#state");

    stateMenu.textContent = "";

    let defaultOption = document.createElement("option");
    defaultOption.value = "";
    defaultOption.textContent = "Select One";
    stateMenu.appendChild(defaultOption);

    try {
        let url = "https://csumb.space/api/allStatesAPI.php";
        let response = await fetch(url);
        let data = await response.json();

        for (let item of data) {
            let option = document.createElement("option");
            option.value = item.usps;
            option.textContent = item.state;
            stateMenu.appendChild(option);
        }
    } catch (error) {
        console.error(error);

        stateMenu.textContent = "";

        let errorOption = document.createElement("option");
        errorOption.value = "";
        errorOption.textContent = "Unable to load states";
        stateMenu.appendChild(errorOption);
    }
}

async function checkUsername() {
    let username = document.querySelector("#username").value;
    let usernameError = document.querySelector("#usernameError");

    if (username.length === 0) {
        usernameError.textContent = "Username required";
        usernameError.style.color = "red";
        return false;
    }

    let url = `https://csumb.space/api/usernamesAPI.php?username=${username}`;
    let response = await fetch(url);
    let data = await response.json();

    if (data.available) {
        usernameError.textContent = "Username available!";
        usernameError.style.color = "#00FF00";
        return true;
    } else {
        usernameError.textContent = "Username taken";
        usernameError.style.color = "red";
        return false;
    }
}

async function validateForm(event) {
    event.preventDefault();

    let isValid = true;

    let username = document.querySelector("#username").value;
    let usernameError = document.querySelector("#usernameError");

    usernameError.textContent = "";

    if (username.length === 0) {
        usernameError.textContent = "Username required";
        usernameError.style.color = "red";
        isValid = false;
    } else {
        let usernameAvailable = await checkUsername();

        if (usernameAvailable === false) {
            isValid = false;
        }
    }

    let password = document.querySelector("#password").value;
    let passwordAgain = document.querySelector("#passwordAgain").value;
    let passwordError = document.querySelector("#passwordError");

    passwordError.textContent = "";
    passwordError.style.color = "red";

    if (password.length < 6) {
        passwordError.textContent = "Password must be at least 6 characters";
        isValid = false;
    } else if (password !== passwordAgain) {
        passwordError.textContent = "Passwords do not match";
        isValid = false;
    }

    if (isValid) {
        document.querySelector("#signupForm").submit();
    }
}

async function displayCounties() {
    let state = document.querySelector("#state").value;
    let countyMenu = document.querySelector("#county");

    countyMenu.textContent = "";

    if (state === "") {
        return;
    }

    try {
        let url = `https://csumb.space/api/geo/countyListAPI.php?state=${state}`;
        let response = await fetch(url);
        let data = await response.json();

        let defaultOption = document.createElement("option");
        defaultOption.value = "";
        defaultOption.textContent = "Select One";
        countyMenu.appendChild(defaultOption);

        for (let item of data) {
            let option = document.createElement("option");
            option.value = item.county;
            option.textContent = item.county;
            countyMenu.appendChild(option);
        }
    } catch (error) {
        console.error(error);

        let errorOption = document.createElement("option");
        errorOption.value = "";
        errorOption.textContent = "Unable to load counties";
        countyMenu.appendChild(errorOption);
    }
}

async function suggestPassword() {
    let suggestedPwd = document.querySelector("#suggestedPwd");

    try {
        let url = "https://csumb.space/api/suggestedPassword.php?length=8";
        let response = await fetch(url);
        let data = await response.json();

        suggestedPwd.textContent = "Suggested password: " + data.password;
        suggestedPwd.style.color = "gray";
    } catch (error) {
        suggestedPwd.textContent = "Unable to suggest a password";
        console.error(error);
    }
}