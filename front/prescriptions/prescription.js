const url = "http://localhost:3000/v1/prescriptions";
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

    const medicationName = document.createElement("h2");
    medicationName.textContent = `${item.name}`;
    medicationName.className = "medname";

    const comment = document.createElement("p");
    comment.textContent = item.comment;
    comment.className = "comment";

    const tstamp = document.createElement("p");
    tstamp.textContent = item.tstamp.split("T")[0];
    tstamp.className = "tstamp";

    div.append(medicationName, comment, tstamp);
    output.append(div);
  });
}
