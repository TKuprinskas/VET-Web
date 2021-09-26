const url = "http://localhost:3000/v1/pets";
const output = document.getElementById("pets");

const addPetBTN = document.getElementById("addBTN");
addPetBTN.addEventListener("click", (e) => {
  e.preventDefault();
  window.location.href = "/pets/addpet.html";
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

    const petname = document.createElement("h2");
    petname.textContent = `${item.pet_name}`;
    petname.className = "petname";

    const petdob = document.createElement("p");
    petdob.textContent = `DOB: ${item.dob.split("T")[0]}`;
    petdob.className = "petdob";

    const client_email = document.createElement("p");
    client_email.textContent = `Client email: ${item.client_email}`;
    client_email.className = "clientemail";

    const btndiv = document.createElement("div");
    btndiv.className = "btndiv";

    const viewLog = document.createElement("button");
    viewLog.className = "viewlog";
    viewLog.textContent = "VIEW LOG";
    viewLog.addEventListener("click", (e) => {
      e.preventDefault();
      window.location.href = `/pets/health.html?pet_id=${item.id}`;
    });

    const editPet = document.createElement("button");
    editPet.className = "editBTN";
    editPet.textContent = "EDIT";
    editPet.addEventListener("click", (e) => {
      e.preventDefault();
      window.location.href = `/pets/editpet.html?pet_id=${item.id}`;
    });

    const delBTN = document.createElement("button");
    delBTN.className = "delBTN";
    delBTN.textContent = "DELETE";
    delBTN.addEventListener("click", () => {
      const delConfirm = confirm("Do you want to delete this item?");

      if (delConfirm) {
        fetch(`${url}/${item.id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            div.remove();
            alert("Pet has been removed from the list");
          });
      }
    });

    div.append(petname, petdob, client_email, btndiv);
    btndiv.append(viewLog, editPet, delBTN);
    output.append(div);
  });
}
