document.addEventListener('DOMContentLoaded', () => {
  const DOG_URL = 'http://localhost:3000/dogs/'
  const ce = (tag) => document.createElement(tag)
  const qs = (selector) => document.querySelector(selector)
  const tBody = qs('#table-body')

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
    dogTr.innerHTML = `
        <td>${dog.name}</td>
        <td>${dog.breed}</td>
        <td>${dog.sex}</td>
        <td><button>Edit Dog</button></td>
      `
  }  
  
  



  

  
  
  
  
  
  
  
  getDogs()
})
