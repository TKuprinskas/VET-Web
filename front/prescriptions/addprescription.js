const cancelBTN = document.getElementById("cancel-button");
cancelBTN.addEventListener("click", (e) => {
  e.preventDefault();
  window.location.href = "/index.html";
});

const url = "http://localhost:3000/v1/prescriptions";
const petsURL = "http://localhost:3000/v1/pets";
const medURL = "http://localhost:3000/v1/medications";
const output = document.getElementById("formContainer");

function showPets(data) {
  const select = document.getElementById("petid");
  data.forEach((item) => {
    const option = document.createElement("option");
    option.value = item.id;
    option.textContent = item.pet_name;
    select.append(option);
  });
}

function showMed(data) {
  const select = document.getElementById("medid");
  data.forEach((item) => {
    const option = document.createElement("option");
    option.value = item.id;
    option.textContent = item.medication_name;
    select.append(option);
  });
}

function getData() {
  fetch(petsURL)
    .then((res) => res.json())
    .then((data) => {
      if (data.length > 0) {
        return showPets(data);
      }
      output.textContent = `No items found. Please add some`;
    })
    .catch((e) => {
      output.textContent = `An error has occured. Please try again later.`;
    });
}

function getData2() {
  fetch(medURL)
    .then((res) => res.json())
    .then((data) => {
      if (data.length > 0) {
        return showMed(data);
      }
      output.textContent = `No items found. Please add some`;
    })
    .catch((e) => {
      output.textContent = `An error has occured. Please try again later.`;
    });
}

getData();
getData2();

const form = document.getElementById("inputForm");
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const pet_id = e.target.elements.petid.value.trim();
  const medication_id = e.target.elements.medid.value.trim();
  const comment = e.target.elements.comment.value.trim();

  fetch(url, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({
      medication_id,
      pet_id,
      comment,
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      {
        alert(`You have added the prescription`);
        form.reset();
        setTimeout(() => {
          window.location.href = "/index.html";
        }, 1000);
      }
    })
    .catch((err) => {
      alert(err);
    });
});
