const url = "http://localhost:3000/v1/logs";
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

function getData() {
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      if (data.length > 0) {
        return createPETS(data);
      }
      output.textContent = `No items found. Please add some`;
    })
    .catch((e) => {
      output.textContent = `An error has occured. Please try again later.`;
    });
}

getData();

function createPETS(data) {
  data.forEach((item) => {
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
