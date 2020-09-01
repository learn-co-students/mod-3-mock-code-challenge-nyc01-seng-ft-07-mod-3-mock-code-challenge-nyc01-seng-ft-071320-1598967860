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
    <td><button>Edit</button></td></tr>
    `)
  }

  loadDogs()
})




/*

