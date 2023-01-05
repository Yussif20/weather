/* Global Variables */
const baseURL = "https://api.openweathermap.org/data/2.5/weather?zip=";
const apiKey = "&appid=7a790157fdc0f0770cb4dfd11af5f843";
const server = "http://127.0.0.1:4000";
// const apiKey = "b4a42ee5c694e319a8c906e229f7e8f2";

const zipCodeEl = document.querySelector("#zip");
const dateEl = document.querySelector("#date");
const tempEl = document.querySelector("#temp");
const feelingsEl = document.querySelector("#feelings");
const contentEl = document.querySelector("#content");
const generateButton = document.querySelector("#generate");

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.toDateString();

// function Decelerations

// generating data
function generate() {
  const zipCode = zipCodeEl.value;
  const feelings = feelingsEl.value;

  getInfo(zipCode).then((data) => {
    if (data) {
      const {
        main: { temp },
      } = data;

      const info = {
        newDate,
        temp,
        feelings,
      };
      postData(server + "/add", info);

      updateUI();
      document.getElementById("entryHolder").style.opacity = 1;
    }
  });

  // get information by the zip code from api
  async function getInfo(zip) {
    try {
      const response = await fetch(baseURL + zip + apiKey);
      const data = await response.json();
      return data;
    } catch (err) {
      console.log("error", err);
    }
  }

  // post data to the server
  const postData = async (url = "", info = {}) => {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(info),
    });

    try {
      const newData = await res.json();
      console.log(newData);
      return newData;
    } catch (err) {
      console.log("error", err);
    }
  };
}

// updating the UI
async function updateUI() {
  let res = await fetch(server + `/all`);
  try {
    const savedData = await res.json();
    dateEl.innerHTML = `The Date is ${savedData.newData}`;
    tempEl.innerHTML = `The Temperature is ${savedData.temp}`;
    contentEl.innerHTML = `Mood is ${savedData.content}`;
  } catch (err) {
    console.log("error", err);
  }
}

/// Adding the generate button functionality
generateButton.addEventListener(`click`, generate);
