const cancelBTN = document.getElementById("cancel-button");
cancelBTN.addEventListener("click", (e) => {
  e.preventDefault();
  window.location.href = "/index.html";
});

const url = "http://localhost:3000/v1/logs";
const petsURL = "http://localhost:3000/v1/pets";
const output = document.getElementById("formContainer");

function showOptions(data) {
  const select = document.getElementById("petid");
  data.forEach((item) => {
    const option = document.createElement("option");
    option.value = item.id;
    option.textContent = item.pet_name;
    select.append(option);
  });
}

function getData() {
  fetch(petsURL)
    .then((res) => res.json())
    .then((data) => {
      if (data.length > 0) {
        return showOptions(data);
      }
      output.textContent = `No items found. Please add some`;
    })
    .catch((e) => {
      output.textContent = `An error has occured. Please try again later.`;
    });
}

getData();

const form = document.getElementById("inputForm");
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const pet_id = e.target.elements.petid.value.trim();
  const description = e.target.elements.description.value.trim();
  const status = e.target.elements.status.value.trim();

  fetch(url, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({
      pet_id,
      description,
      status,
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      {
        alert(`You have added the log`);
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
