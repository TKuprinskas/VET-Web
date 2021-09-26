const cancelBTN = document.getElementById("cancel-button");
cancelBTN.addEventListener("click", (e) => {
  e.preventDefault();
  window.location.href = "/index.html";
});

const url = "http://localhost:3000/v1/pets";
const output = document.getElementById("formContainer");

const form = document.getElementById("inputForm");
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const pet_name = e.target.elements.name.value.trim();
  const dob = e.target.elements.dob.value.trim();
  const client_email = e.target.elements.email.value.trim();

  fetch(url, {
    method: "POST",
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
        alert(`You have added the pet ${pet_name}`);
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
