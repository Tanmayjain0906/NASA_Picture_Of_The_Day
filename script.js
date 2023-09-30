const apiKey = "bNFgeqM3JxeOmlddLhc6lgkM9auUaqrq5IUUeLh6";
let currentDate = new Date().toISOString().split("T")[0];


const form = document.getElementById("search-form");
const input = document.getElementById("search-input");
const container = document.getElementById("current-image-container");
const list = document.getElementById("previous-list");

if (localStorage.getItem("date")) {
    localStorage.removeItem("date");
}


async function getCurrentImageOfTheDay() {
    let url = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}&date=${currentDate}&thumbs=true`;

    fetch(url)
        .then(response => {
            if (!response.ok) {
                alert("invalid Api Key")
                document.body.innerHTML = `<img src="https://www.eff.org/files/2014/01/09/invalid_0.png">`
                return;
            }
            return response.json();
        })
        .then(data => {
           
            addDataToUI(data);
        })
        .catch(error => {
            
            console.error('Fetch error:', error);
        });

}



getCurrentImageOfTheDay();


function addDataToUI(data) {
    container.children[0].innerText = currentDate === new Date().toISOString().split("T")[0] ? "NASA Picture Of The Day" : `Picture On ${currentDate}`;
    container.children[1].src = data.hdurl ? data.hdurl : data.thumbnail_url;
    container.children[2].innerText = data.title;
    container.children[3].innerText = data.explanation;
}

let dateData = [];

form.addEventListener("submit", (e) => {
    e.preventDefault();
    getImageOfTheDay();
})


function getImageOfTheDay() {
    currentDate = input.value;
    let obj = {
        date: currentDate,
    }
    dateData.push(obj);
    localStorage.setItem("date", JSON.stringify(dateData));
    addSearchToHistory();
    getCurrentImageOfTheDay();
}


function saveSearch(event) {
    currentDate = event.target.innerText;
    getCurrentImageOfTheDay();
}

function addSearchToHistory() {
    list.innerHTML = "";
    let listArr = JSON.parse(localStorage.getItem("date"));

    listArr.forEach((obj) => {
        const li = document.createElement("li");
        li.innerText = obj.date;
        li.setAttribute("onclick", "saveSearch(event)")
        list.appendChild(li);
    })
}