const apiKey = "bNFgeqM3JxeOmlddLhc6lgkM9auUaqrq5IUUeLh6";
let currentDate = new Date().toISOString().split("T")[0];


const form = document.getElementById("search-form");
const input = document.getElementById("search-input");
const container = document.getElementById("current-image-container");
const list = document.getElementById("previous-list");

if(localStorage.getItem("date"))
{
    localStorage.removeItem("date");
}
async function fetchData()
{
    let url = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}&date=${currentDate}`;

    let response = await fetch(url);
    let data = await response.json();

    
    addDataToUI(data);
}

fetchData();


function addDataToUI(data)
{
   container.children[0].innerText = currentDate === new Date().toISOString().split("T")[0]?"NASA Picture Of The Day":`Picture On ${currentDate}`;
   container.children[1].src = data.url;
   container.children[2].innerText = data.title;
   container.children[3].innerText = data.explanation;
}

let dateData = [];

form.addEventListener("submit", (e) => {
    e.preventDefault();
    currentDate = input.value;
    let obj = {
        date: currentDate,
    }
    localStorage.setItem("date",JSON.stringify(obj));
    const li = document.createElement("li");
    li.innerText = currentDate;
    li.setAttribute("onclick", "previousSearch(event)")
    list.appendChild(li);
    fetchData();
})


function previousSearch(event)
{
    currentDate = event.target.innerText;
    fetchData();
}