const urlPets = "http://localhost:3000/v1/pets/pets";
const url = "http://localhost:3000/v1/pets/update";
const output = document.getElementById("formContainer");
const queryString = window.location.search;
const params = queryString.split("=")[1];

const cancelBTN = document.getElementById("cancel-button");
cancelBTN.addEventListener("click", (e) => {
  e.preventDefault();
  window.location.href = "/index.html";
});

const form = document.getElementById("inputForm");
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const pet_name = e.target.elements.name.value.trim();
  const dob = e.target.elements.dob.value.trim();
  const client_email = e.target.elements.email.value.trim();

  fetch(`${url}/${params}`, {
    method: "PUT",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({
      pet_name,
      dob,
      client_email,
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      {
        alert(`You have edited the pet`);
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

function getData() {
  fetch(`${urlPets}/${params}`)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      if (data.length > 0) {
        return showPetsDetails(data);
      }
      output.textContent = `No items found. Please add some`;
    })
    .catch((e) => {
      output.textContent = `An error has occured. Please try again later.`;
    });
}

getData();

function showPetsDetails(data) {
  data.forEach((item) => {
    const name = document.getElementById("pet_name");
    name.textContent = `Current Name: ${item.pet_name}`;

    const dob = document.getElementById("pet_dob");
    dob.textContent = `Current DOB: ${item.dob.split("T")[0]}`;

    const client_email = document.getElementById("client_email");
    client_email.textContent = `Current Email: ${item.client_email}`;
  });
}
