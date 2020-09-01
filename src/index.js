document.addEventListener('DOMContentLoaded', () => {
  // HELPER METHODS
  const qs = (item) => document.querySelector(item)
  const ce = (tag) => document.createElement(tag)

  // GLOBAL VARIABLES
  const baseUrl = 'http://localhost:3000/dogs/'
  const tableBody = qs('#table-body')
  const form = qs('form')
  const name = form.querySelector('input')
  const breed = form.querySelector('input:nth-child(2)')
  const sex = form.querySelector('input:nth-child(3)')

  // FETCH DOGS
  const getDogs = () => {
    fetch(baseUrl)
      .then(res => res.json())
      .then(dogs => renderDogs(dogs))
  }

  //LOOP TO RENDER ALL DOGS
  const renderDogs = (dogs) => {
    for (const dog of dogs) {
      renderDog(dog)
    }
  }

  //RENDER INDIVIDUAL DOG
  const renderDog = (dog) => {
    const tr = ce('tr')
    tr.id = dog.id

    tr.innerHTML = `
    <td>${dog.name}</td> 
    <td>${dog.breed}</td> 
    <td>${dog.sex}</td> 
    <td><button data-dog-id="${dog.id}">Edit</button></td>
    `

    tableBody.append(tr)
  }

  //ADD FUNCTIONALITY TO EDIT BUTTON
  /* 
   √ 1. QS THE EDIT BUTTON
   √ 2. ADD EVENTLISTENER TO EDIT BUTTON
   √ 3. FIND THE FORM IN REGARDS TO EDIT BUTTON
   √ 4. POPULATE VALUES OF FORM WITH EDIT BUTTON
  */

  const clickHandler = () => {
    tableBody.addEventListener('click', e => {
      if (e.target.matches('button')) {
        // const editId = e.target.dataset.dogId
        const dogTr = e.target.parentElement.parentElement

        form.dataset.dogId = e.target.dataset.dogId
        name.value = dogTr.querySelector('td').innerText
        breed.value = dogTr.querySelector('td:nth-child(2)').innerText
        sex.value = dogTr.querySelector('td:nth-child(3)').innerText
      }
    })
    form.addEventListener('submit', e => {
      e.preventDefault()
      const dogId = e.target.dataset.dogId

      const options = {
        method: 'PATCH',
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          "name": `${name.value}`,
          "breed": `${breed.value}`,
          "sex": `${sex.value}`
        })
      }

      fetch(baseUrl + dogId, options)
        .then(response => response.json())

      clearForm()
      tableBody.innerHTML = ""

      getDogs()
    })
  }

  const clearForm = () => {
    name.value = '';
    breed.value = '';
    sex.value = '';
  }

  // PATCH A DOG
  /*
   √ 1. ADD EVENT LISTENER TO FORM SUBMIT
   √ 2. SEND A PATCH REQUEST
   √ 3. RENDER NEW DOG LIST
   √ 4. CLEAR FORM
      */


  clickHandler()
  getDogs()
})