document.addEventListener("DOMContentLoaded", () => {
  fetchDogs();
  clickListener();
  submitHandler();
});
const baseUrl = "http://localhost:3000/dogs/";
const fetchDogs = () => {
  fetch(baseUrl)
    .then((res) => res.json())
    .then((dogs) => {
      renderDog(dogs);
    });
};
function renderDog(dogs) {
  const dogTable = document.querySelector("table");
  dogTable.innerHTML = "";
  for (dog of dogs) {
    const tr = document.createElement("tr");
    tr.setAttribute("data-id", dog.id);

    tr.innerHTML = `
    <td class="dog-name" data-id=${dog.id}>${dog.name}</td>
    <td class="dog-breed" data-id=${dog.id}>${dog.breed}</td>
    <td class="dog-sex" data-id=${dog.id}>${dog.sex}</td>
    <td><button class="edit-button" data-id=${dog.id}>Edit</button></td>
    `;
    dogTable.append(tr);
  }
}

const clickListener = (e) => {
  const form = document.querySelector("form");
  document.addEventListener(`click`, function (e) {
    if (e.target.matches(".edit-button")) {
      const dataId = event.target.getAttribute("data-id");

      const dogName = document.querySelector(`td[data-id="${dataId}"].dog-name`)
        .textContent;

      const dogBreed = document.querySelector(
        `td[data-id="${dataId}"].dog-breed`
      ).textContent;

      const dogSex = document.querySelector(`td[data-id="${dataId}"].dog-sex`)
        .textContent;

      form.name.value = dogName;
      form.breed.value = dogBreed;
      form.sex.value = dogSex;
      form.submit.id = dogId;
    }
  });
};

const submitHandler = () =>
  document.addEventListener("submit", function (event) {
    event.preventDefault();

    const form = document.querySelector("form");

    const name = form.name.value;
    const breed = form.breed.value;
    const sex = form.sex.value;
    const id = form.submit.id;

    const dogObj = {
      name: name,
      breed: breed,
      sex: sex,
    };

    const options = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        accept: "application/json",
      },
      body: JSON.stringify(dogObj),
    };
    fetch(baseUrl + id, options)
      .then((res) => res.json())
      .then((dog) => {
        fetchDogs();
      })
      .catch((error) => {
        console.log("error");
      });
  });
