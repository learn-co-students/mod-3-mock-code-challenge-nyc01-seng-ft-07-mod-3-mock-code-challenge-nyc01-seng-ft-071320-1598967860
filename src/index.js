document.addEventListener('DOMContentLoaded', () => {
  // HELPER METHODS
  const qs = (item) => document.querySelector(item)
  const ce = (tag) => document.createElement(tag)

  // GLOBAL VARIABLES
  const baseUrl = 'http://localhost:3000/dogs'
  const tableBody = qs('#table-body')


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
    <td><button>Edit</button></td>
    `

    tableBody.append(tr)
  }


  getDogs()
})