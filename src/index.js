document.addEventListener("DOMContentLoaded", () => {
  fetchDogs();
  clickListener();
  submitHandler();
});

const baseUrl = "http://localhost:3000/dogs/";

//render list of dogs w/ fetch

const fetchDogs = () => {
  fetch(baseUrl)
    .then((res) => res.json())
    .then((dogs) => {
      renderDog(dogs);
    });
};
function renderDog(dogs) {
  const dogTable = document.querySelector("table");
  for (dog of dogs) {
    const tr = document.createElement("tr");
    // tr.setAttribute("data-id", dog.id);

    tr.innerHTML = `<td class="dog-name">${dog.name}</td>
    <td>${dog.breed}</td>
    <td>${dog.sex}</td><td>
    <button class="edit-button" data-id=${dog.id}>Edit</button></td>`;

    dogTable.append(tr);
  }
}
//render a working edit button

const clickListener = (e) => {
  //   const eButton = document.querySelector(".edit-button");
  const form = document.querySelector("form");
  document.addEventListener(`click`, function (e) {
    if (e.target.matches(".edit-button")) {
      const currentRow = e.target.parentElement.parentElement;

      const inputTextDogName =
        //e.target.parentElement.parentElement.firstChild.textContent;
        currentRow.querySelector(".dog-name").textContent;
      const inputTextDogBreed =
        e.target.parentElement.parentElement.firstChild.nextElementSibling
          .textContent;
      const inputTextDogSex =
        e.target.parentElement.parentElement.firstChild.nextElementSibling
          .nextElementSibling.textContent;

      const dogId = parseInt(e.target.dataset.id);
      //specific id of that dog
      //string

      form.name.value = inputTextDogName;
      form.breed.value = inputTextDogBreed;
      form.sex.value = inputTextDogSex;
      form.submit.id = dogId;
      //form value was submit (was a reference)
    }
  });
};

//submit handler
//create button, use prevent default
const submitHandler = () =>
  document.addEventListener("submit", function (event) {
    // event.preventDefault();
    // const form = document.querySelector("form");
    const form = event.target;
    //give form id's
    // const button = event.target;

    // We don't need to use event.target in a SUBMIT event handler
    // because the event.target will always target the FORM
    const name = form.name.value;
    const breed = form.breed.value;
    const sex = form.sex.value;
    const id = form.submit.id;

    const dogObj = {
      name: name,
      breed: breed,
      sex: sex,
    };
    // form.reset;
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
      .catch((error) => {
        console.log("error");
      });
  });

// click handler
