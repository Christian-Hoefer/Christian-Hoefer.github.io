//Event Listeners
document.querySelector("#fakerForm").addEventListener("submit", validateForm);

function validateForm(event) {
    event.preventDefault();

    let isValid = true;

    let quantity = Number(document.querySelector("#quantity").value);
    let quantityError = document.querySelector("#quantityError");

    quantityError.textContent = "";
    quantityError.style.color = "red";

    if (!Number.isInteger(quantity) || quantity < 1 || quantity > 10) {
        quantityError.textContent = "Quantity is an invalid amount.";
        isValid = false;
    }

    if (isValid) {
        getFakeData();
    }
}

async function getFakeData() {

    try {
        let resource = document.querySelector("#resource").value;
        let quantity = document.querySelector("#quantity").value;
        let locale = document.querySelector("#locale").value;
        let gender = document.querySelector("input[name='gender']:checked").value;

        let url = `https://fakerapi.it/api/v2/${resource}?_quantity=${quantity}&_locale=${locale}`;
        if (resource === "persons" && gender !== "") {
            url += `&_gender=${gender}`;
        }

        let response = await fetch(url);
        let data = await response.json();
        console.log(data);
        displayResults(data.data, resource);

    } catch (error) {
        console.error(error);
        document.querySelector("#results").textContent = "Unable to load data. Try again.";
    }
}

function displayResults(items, resource) {
    let results = document.querySelector("#results");
    results.textContent = "";

    for (let item of items) {
        let card = document.createElement("div");
        card.className = "card";

        let title = document.createElement("h3");

        if (resource === "persons") {
            title.textContent = "Name: " + item.firstname + " " + item.lastname;
            card.appendChild(title);
            addLine(card, "Email: " + item.email);
            addLine(card, "Birthday: " + item.birthday);
            addLine(card, "Address: " +  item.address.city + ", " + item.address.country);
        } else if (resource ===  "companies") {
            title.textContent = "Name: " + item.name;
            card.appendChild(title);
            addLine(card, "Email: " + item.email);
            addLine(card, "Website: " + item.website);
        } else if ( resource === "addresses") {
            title.textContent = "City: " + item.city;
            card.appendChild(title);
            addLine(card, "Street: " + item.street);
            addLine(card, "Country: " + item.country);
        }

        results.appendChild(card);
    }
}

function addLine(card, text) {
    let p = document.createElement("p");
    p.textContent = text;
    card.appendChild(p);
}