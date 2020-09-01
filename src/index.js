document.addEventListener('DOMContentLoaded', () => {

//DONE render registered dogs in the table 
//DONE edit button shows form with dog info 
//3 submit sends a patch request 
//4 after submit, new GET request to update the rendered dogs 

let form = document.getElementById('dog-form')
let fName = form.name.value
console.log(fName)
form.addEventListener('click', function(e){
    e.preventDefault()
})





document.addEventListener('click', function(e){
    let click = e.target
    // console.dir(e.target)
    console.log(click)
    if (click.innerText === 'Edit'){
        console.log('edit button clicked')
        updateForm(click)

        let par = e.target.parentNode
        console.log(par)
        let dId = par.parentNode.id
        console.log(dId)

        let currentSex = par.previousElementSibling
        let currentBreed = currentSex.previousElementSibling
        let currentName = currentBreed.previousElementSibling
    } else if ( click.value === 'Submit'){
        console.log('submit click heard')
        let name = form.name.value
        let sex = form.sex.value
        let breed = form.breed.value


        console.log(form.name.value)
        console.log(form.sex.value)
        console.log(form.breed.value)

        updateDog(breed, name, sex)
    }
}) // end of click listener 

function updateDog(breed, name, sex){
    let dId = 

    let url = 'http://localhost:3000/dogs/:id'
    
    let data = {
        breed: `${form.breed.value}`,

        name: `${form.name.value}`,
        sex: `${form.sex.value}`
    }

    let configObj = {
        method: "POST",
        headers: {
            'content-type': 'application/json',
            'accept': 'application/json'
        },
        body: JSON.stringify(data)
    }

    fetch(`${url}`, configObj)
    .then(function (response){
        return response.json
    })
    .then (function (newData){
        console.log(object)
    })


    renderDogs()
}//end of updateDog 



function updateForm(click){
    // setting variable from current dog row
    let par = click.parentNode
    let currentSex = par.previousElementSibling
    let currentBreed = currentSex.previousElementSibling
    let currentName = currentBreed.previousElementSibling
    //updating form fields from current dog values
    form.name.value   =  currentName.innerText
    form.breed.value = currentBreed.innerText
    form.sex.value = currentSex.innerText

 }// end of updateForm

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
        console.log(data)
        iterateDogs(data)
    })
} // end of pullDogs (GET fetch)


pullDogs()
}) // end of DOMContentLoaded 