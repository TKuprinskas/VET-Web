const cancelBTN = document.getElementById("cancel-button");
cancelBTN.addEventListener("click", (e) => {
  e.preventDefault();
  window.location.href = "/medications/medications.html";
});

const url = "http://localhost:3000/v1/medications";
const output = document.getElementById("formContainer");

const form = document.getElementById("inputForm");
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const medication_name = e.target.elements.name.value.trim();
  const description = e.target.elements.description.value.trim();

  fetch(url, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({
      medication_name,
      description,
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      {
        alert(`You have added the medication`);
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
