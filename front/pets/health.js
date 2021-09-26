const queryString = window.location.search;
const params = queryString.split("=")[1];
const urlPresc = "http://localhost:3000/v1/prescriptions";
const urlLogs = "http://localhost:3000/v1/logs";
const urlPets = "http://localhost:3000/v1/pets/pets";

const output = document.getElementById("pets");

const addPrescBTN = document.getElementById("addpresc");
addPrescBTN.addEventListener("click", (e) => {
  e.preventDefault();
  window.location.href = "/prescriptions/addprescription.html";
});

const addLogBTN = document.getElementById("addlog");
addLogBTN.addEventListener("click", (e) => {
  e.preventDefault();
  window.location.href = "/logs/addlog.html";
});

function getPresc() {
  fetch(`${urlPresc}/${params}`)
    .then((res) => res.json())
    .then((data) => {
      if (data.length > 0) {
        return showPresc(data);
      }
      output.textContent = `No prescriptions found. Please add some`;
    })
    .catch((e) => {
      output.textContent = `An error has occured. Please try again later.`;
    });
}

function getLogs() {
  fetch(`${urlLogs}/${params}`)
    .then((res) => res.json())
    .then((data) => {
      if (data.length > 0) {
        return showLogs(data);
      }
      output.textContent = `No logs found. Please add some`;
    })
    .catch((e) => {
      output.textContent = `An error has occured. Please try again later.`;
    });
}

function getPetsName() {
  fetch(`${urlPets}/${params}`)
    .then((res) => res.json())
    .then((data) => {
      const petNameDisplay = document.getElementById("petNameDisplay");
      petNameDisplay.textContent = `${data[0].pet_name}: `;
      showLogs(data);
    });
}

let logs = true;
let prescriptions = true;

function getData(logs, prescriptions) {
  output.innerHTML = "";
  logs && getLogs();
  prescriptions && getPresc();
  getPetsName();
}

getData(logs, prescriptions);

function showPresc(data) {
  data.forEach((item) => {
    const div = document.createElement("div");
    div.className = "pets";

    const medicationName = document.createElement("h2");
    medicationName.textContent = `${item.medication_name}`;
    medicationName.className = "medname";

    const tstamp = document.createElement("p");
    tstamp.textContent = `Date of prescription: ${item.tstamp.split("T")[0]}`;
    tstamp.className = "tstamp";

    const comment = document.createElement("p");
    comment.textContent = `Comment: ${item.comment}`;
    comment.className = "comment";

    div.append(medicationName, tstamp, comment);
    output.append(div);
  });
}

function showLogs(data) {
  data.forEach((item) => {
    if (
      !item.pet_name ||
      !item.dob ||
      !item.client_email ||
      !item.status ||
      !item.description
    ) {
      return;
    }
    const div = document.createElement("div");
    div.className = "pets";

    const petName = document.createElement("h2");
    petName.textContent = `${item.pet_name}`;
    petName.className = "petName";

    const petDOB = document.createElement("p");
    petDOB.textContent = `DOB: ${item.dob.split("T")[0]}`;
    petDOB.className = "petDOB";

    const client_email = document.createElement("p");
    client_email.textContent = `Client email: ${item.client_email}`;
    client_email.className = "client_email";

    const petStatus = document.createElement("p");
    petStatus.textContent = `Status: ${item.status}`;
    petStatus.className = "petStatus";

    const petDecsription = document.createElement("p");
    petDecsription.textContent = `Comment: ${item.description}`;
    petDecsription.className = "petDecsription";

    div.append(petName, petDOB, client_email, petStatus, petDecsription);
    output.append(div);
  });
}

document.getElementById("btnLogs").addEventListener("click", (e) => {
  logs = !logs;
  getData(logs, prescriptions);
  e.target.classList.toggle("filterON");
});

document.getElementById("btnPresc").addEventListener("click", (e) => {
  prescriptions = !prescriptions;
  getData(logs, prescriptions);
  e.target.classList.toggle("filterON");
});
