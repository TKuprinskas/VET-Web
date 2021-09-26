const url = "http://localhost:3000/v1/medications";
const output = document.getElementById("pets");
const addPetBTN = document.getElementById("addBTN");
addPetBTN.addEventListener("click", (e) => {
  e.preventDefault();
  window.location.href = "/medications/addmedication.html";
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
    medicationName.textContent = `${item.medication_name}`;
    medicationName.className = "petname";

    const description = document.createElement("p");
    description.textContent = `Description: ${item.description}`;
    description.className = "clientemail";

    div.append(medicationName, description);
    output.append(div);
  });
}
