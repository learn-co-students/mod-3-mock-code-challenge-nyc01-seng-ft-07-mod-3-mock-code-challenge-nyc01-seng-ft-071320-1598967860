document.addEventListener('DOMContentLoaded', () => {
  const DOG_URL = 'http://localhost:3000/dogs/'
  const ce = (tag) => document.createElement(tag)
  const qs = (selector) => document.querySelector(selector)
  const tBody = qs('#table-body')
  const dogForm = qs('#dog-form')

  //fetch dog data from API
  const getDogs = () => {
    fetch(DOG_URL)
    .then(res => res.json())
    .then(dogs => dogs.forEach(listDog))
  }

  //list up the dogs from fetched data
  const listDog = dog => {
    const dogTr = ce('tr')
    tBody.append(dogTr)
    dogTr.dataset.id = dog.id
    dogTr.innerHTML = `
        <td>${dog.name}</td>
        <td>${dog.breed}</td>
        <td>${dog.sex}</td>
        <td><button class="edit-btn">Edit Dog</button></td>
      `
  }  
  
  //set autofill on form when edit dog button clicked
  const clickHandler = () => {
    document.addEventListener('click', e => {
      if (e.target.matches('.edit-btn')) {
        const dogTr = e.target.parentElement.parentElement
        dogForm.name.value = dogTr.children[0].textContent
        dogForm.breed.value = dogTr.children[1].textContent
        dogForm.sex.value = dogTr.children[2].textContent

        //set id to form
        dogForm.dataset.dogId = dogTr.dataset.id
      }
    })
  }


  //set event on submit button
  const submitDog = () => {
    qs('#dog-form').addEventListener('submit', e => {
      e.preventDefault()
      updateDog(e.target)
      
      
    })
  }

  //update dog in API
  const updateDog = (target) => {
    const tr = qs(`[data-id="${target.dataset.dogId}"]`)
    
    const options = {
      method: 'PATCH', 
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        name: target.name.value,
        breed: target.breed.value,
        sex: target.sex.value
      })
    }

    fetch(`${DOG_URL}${target.dataset.dogId}`, options)
    .then(res => res.json())
    .then(dog => {
      tr.children[0].textContent = dog.name
      tr.children[1].textContent = dog.breed
      tr.children[2].textContent = dog.sex
    })
  }
  
  getDogs()
  submitDog()
  clickHandler()
})
