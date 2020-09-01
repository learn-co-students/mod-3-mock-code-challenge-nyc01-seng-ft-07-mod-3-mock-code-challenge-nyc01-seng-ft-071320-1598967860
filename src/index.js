document.addEventListener('DOMContentLoaded', () => {
  const baseURL = 'http://localhost:3000/dogs/'

  function loadDogs() {
    fetch(baseURL)
      .then(resp => resp.json())
      .then(dogs => dogs.forEach(dog => renderDog(dog)))
  }

  function renderDog(dog) {
    const tabelBody = document.querySelector('#table-body')
    tabelBody.insertAdjacentHTML('afterend', `
    <tr><td>${dog.name}</td> 
    <td>${dog.breed}</td> 
    <td>${dog.sex}</td> 
    <td><button data-dog-id=${dog.id}>Edit</button></td></tr>
    `)
  }

  function clickHandler() {
    document.addEventListener('click', e => {
      const button = e.target
      if (button.innerText === 'Edit') {
        const dogId = button.dataset.dogId
        loadDog(dogId)
        function loadDog(dogId) {
          fetch(baseURL + dogId)
            .then(resp => resp.json())
            .then(renderEditDogForm)
        }
      }
    })
  }

  function renderEditDogForm(dogObj) {
    const dogForm = document.querySelector('#dog-form')
    dogForm.name.value = dogObj.name
    dogForm.breed.value = dogObj.breed
    dogForm.sex.value = dogObj.sex
  }

  clickHandler()
  loadDogs()
})




/*

find button element
   get values from dog's row 
  pass to add to value of form 

on submit of form 
  send patch request to db with new values

form reflects changes added to db
  make a get request after patch request is sent

  */