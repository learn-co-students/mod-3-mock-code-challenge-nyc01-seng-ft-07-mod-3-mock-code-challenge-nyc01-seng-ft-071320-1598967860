document.addEventListener('DOMContentLoaded', () => {

//DONE render registered dogs in the table 
//2 edit button shows form with dog info 
//3 submit sends a patch request 
//4 after submit, new GET request to update the rendered dogs 

let form = document.getElementById('dog-form')
let fNameP =  form.name.placeholder
let fBreedP = form.breed.placeholder
let fSexP = form.sex.placeholder

let fNameV = form.name.value 
let fBreedV = form.breed.value
let fSexV = form.sex.value

function updateForm(click){
    console.log('entered updateForm')
    let par = click.parentNode
    let currentSex = par.previousElementSibling
    let currentBreed = currentSex.previousElementSibling
    let currentName = currentBreed.previousElementSibling

    console.log(fNameP)
   

    fNameP = currentName


    console.log(par.previousElementSibling.innerText)
    console.log(currentSex.previousElementSibling)
    console.log(currentBreed.previousElementSibling)

 }// end of updateForm



document.addEventListener('click', function(e){
    let click = e.target
    // console.dir(e.target)
    console.log(click)
    if (click.innerText === 'Edit'){
        console.log('edit button clicked')
        updateForm(click)
        let par = e.target.parentNode
        let currentSex = par.previousElementSibling
        let currentBreed = currentSex.previousElementSibling
        let currentName = currentBreed.previousElementSibling
    }



}) // end of click listener 

function renderDogs(id, name, breed, sex){
    let table = document.getElementById('table-body')
    let row = document.createElement('tr')
    row.setAttribute('id', id)
    row.innerHTML=`<td>${name}</td> <td>${breed}</td> <td>${sex}</td> <td><button>Edit</button></td>`
    table.append(row)
} // end of renderDogs

function iterateDogs(data){
    for (const dog of data){
        let dId = dog.id
        let dName = dog.name
        let dBreed = dog.breed
        let dSex= dog.sex
        renderDogs(dId, dName, dBreed, dSex)
    }
} // end of iterateDogs

function pullDogs(){
    fetch('http://localhost:3000/dogs')
    .then(function(response){
        return response.json()
    })
    .then(function (data){
        iterateDogs(data)
    })
} // end of pullDogs (GET fetch)












pullDogs()
}) // end of DOMContentLoaded 