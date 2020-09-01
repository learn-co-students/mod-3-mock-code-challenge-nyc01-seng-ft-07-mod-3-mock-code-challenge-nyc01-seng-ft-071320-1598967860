document.addEventListener('DOMContentLoaded', () => {
  const baseURL = 'http://localhost:3000/dogs/'
  const tableBody = document.querySelector('#table-body')
  
  function loadDogs() {
    fetch(baseURL)
    .then(resp => resp.json())
    .then(dogs => dogs.forEach(dog => renderDog(dog)))
  }
  



  function renderDog(dog) {
    tableBody.insertAdjacentHTML('afterend', `
    <tr><td>${dog.name}</td> 
    <td>${dog.breed}</td> 
    <td>${dog.sex}</td> 
    <td><button data-dog-id=${dog.id}>Edit</button></td></tr>
    `)
    // debugger

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
    const submitBtn = dogForm.closest('submit')
    dogForm.name.value = dogObj.name
    dogForm.breed.value = dogObj.breed
    dogForm.sex.value = dogObj.sex
    dogForm.submit.dataset = dogObj.id
  }

  function submitHandler() {
    document.addEventListener('submit', e => {
      const button = e.target
      const dogId = button.submit.dataset
      e.preventDefault()

      const config = {
        method: 'PATCH',
        headers: {
          "Content-Type": "application/json",
          "Accpets": "application/json"
        },
        body: JSON.stringify({
          name: button.name.value,
          breed: button.breed.value,
          sex: button.sex.value
        }) 
      }
      
      fetch(baseURL + dogId, config)
        .then(resp => resp.json())
        .then(reloadDogs())

    })
  }

  function reloadDogs(dogs) {
    while (tableBody.nextElementSibling !== null) {
      tableBody.nextElementSibling.remove()
      debugger
    }
    loadDogs(dogs)
  }

  submitHandler()
  clickHandler()
  loadDogs()
})




/*

√find button element
 √  get values from dog's row 
√  pass to add to value of form 

√on submit of form 
 √ send patch request to db with new values

√form reflects changes added to db
  reset the form before get request
  make a get request after patch request is sent



  */