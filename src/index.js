document.addEventListener('DOMContentLoaded', () => {
  const baseUrl = "http://localhost:3000/dogs/"

  // click/Events
  const submitHandler = () => {

    document.addEventListener('submit', e => {
      e.preventDefault()
      const button = e.target
      button.dataset.id = document.querySelector("#dog-form > input[type=submit]:nth-child(4)").dataset.id
      const dogId = button.dataset.id
      console.dir(dogId)
      const dogName = document.querySelector("#dog-form > input[type=text]:nth-child(1)").value
      const dogBreed = document.querySelector("#dog-form > input[type=text]:nth-child(2)").value
      const dogSex = document.querySelector("#dog-form > input[type=text]:nth-child(3)").value

      const options = {
        method:'PATCH',
        headers:{
          'Content-Type': 'application/json',
          'accept': 'application/json'
        },
        body: JSON.stringify({name:dogName, breed:dogBreed, sex:dogSex})
      }

      fetch(baseUrl + dogId, options)
      .then(response => response.json())
      .then(dog => {
        renderDog(dog)
      })
    })
  }

  const clickHandler = () => {
    document.addEventListener('click', e => {
      const dogId = e.target.dataset.id
      if(e.target.textContent === 'Edit'){
        const clicked = e.target.closest('tr').children
        const dogName = clicked[0].innerText
        const dogBreed = clicked[1].innerText
        const dogSex = clicked[2].innerText

        const formName = document.querySelector("#dog-form > input[type=text]:nth-child(1)").value = dogName
        const formBreed = document.querySelector("#dog-form > input[type=text]:nth-child(2)").value = dogBreed
        const formSex = document.querySelector("#dog-form > input[type=text]:nth-child(3)").value = dogSex

        const dogRow = e.target.closest('tr')
        const subBttn = document.querySelector("#dog-form > input[type=submit]:nth-child(4)")
        subBttn.dataset.id = dogId
      }
    })
  }

  //rendering Dogs to DOM
  const parseDogs = (dogs) => {
    dogs.forEach(dog => renderDog(dog))
  }

  const renderDog = (dog) => {
    const tableBody = document.querySelector('#table-body')
    const tr = document.createElement('tr')
    tr.innerHTML = `
    <td>${dog.name}</td>
    <td>${dog.breed}</td>
    <td>${dog.sex}</td>
    <td><button data-id=${dog.id}>Edit</button></td>
    `
    tableBody.append(tr)
  }

  //fetch
  const getDogs = () => {
    fetch(baseUrl)
      .then(response => response.json())
      .then(dogs => parseDogs(dogs))
  }


  submitHandler()
  clickHandler()
  getDogs()
})





/*
- On page load, render a list of already registered dogs in the table. You can fetch these dogs from http://localhost:3000/dogs.
  - Make a fetch request for URL √
- The dog should be put on the table as a table row.
  - get dog objects√
  - append them to dom√
- Make a dog editable. Clicking on the edit button next to a dog should populate the top form with that dog's current information.
 -on click, attributes from the dog should populate in the form √
 - addEventListener√
 - On submit of the form, a PATCH request should be made to http://localhost:3000/dogs/:id to update the dog information
 (including name, breed and sex attributes).
  - get id of dog
  - send a patch request
  - update the dog


*/
