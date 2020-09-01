// create table to fill with dogs
// make fetch request to get dogs
// append dogs table to page

const baseURL = 'http://localhost:3000/dogs/'
const dogForm = document.getElementById('dog-form')
const table = document.getElementById('table-body')

function createDogRow(dogObj){
  const newTr = document.createElement('tr')
  newTr.dataset.dogId = dogObj.id
  newTr.innerHTML = `
    <td>${dogObj.name}</td> <td>${dogObj.breed}</td> <td>${dogObj.sex}</td> <td><button data-dog-id="${dogObj.id}">Edit Dog</button></td>
  `
  table.append(newTr)
}
function getDogs(){
  fetch(baseURL)
  .then(resp=>resp.json())
  .then(results => {
    for (const dog of results){
      createDogRow(dog)
    }
  })
}
getDogs()

//add event listner for buttons (event delegation)
//populate form with dog info 
//create listner for submit button
//create fetch PATCH request for form 

table.addEventListener('click', e => {
  if (e.target.matches('button')){
    const foundDog = getSingleDog(e.target.dataset.dogId)
    fillFormWithDogInfo(foundDog)
  }
})

function getSingleDog(dogId){
  return fetch(baseURL+dogId)
  .then(resp=>resp.json())
}

function fillFormWithDogInfo(dogPromise){
  dogPromise.then(dog=>{
    dogForm.dataset.dogId = dog.id
    dogForm.name.value = dog.name
    dogForm.breed.value = dog.breed 
    dogForm.sex.value = dog.sex 
  })
}

dogForm.addEventListener('submit', e=>{
  e.preventDefault()
  let editDog = {name: dogForm.name.value, breed: dogForm.breed.value, sex: dogForm.sex.value}
  const updatedDog = editDogData(editDog, dogForm.dataset.dogId)
  updateTableRow(updatedDog, dogForm.dataset.dogId)
  dogForm.reset() 
})

function editDogData(dogObj, dogId){
  const configObj = {
    method: "PATCH", 
    headers: {"Content-Type": "application/json", "Accepts": "application/json"}, 
    body: JSON.stringify({
      name: dogObj.name, 
      breed: dogObj.breed,
      sex: dogObj.sex
    })
  }
  return fetch(baseURL+dogId, configObj)
  .then(resp=>resp.json())
}

function updateTableRow(dogPromise, dogId){
  const foundRow = document.querySelectorAll(`[data-dog-id="${dogId}"]`)[1]
  dogPromise.then(dog=>{
    foundRow.innerHTML = `
    <td>${dog.name}</td> <td>${dog.breed}</td> <td>${dog.sex}</td> <td><button data-dog-id="${dog.id}">Edit Dog</button></td>
    `
  })
}