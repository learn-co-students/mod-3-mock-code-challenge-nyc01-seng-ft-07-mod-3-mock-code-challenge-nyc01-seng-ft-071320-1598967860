document.addEventListener('DOMContentLoaded', () => {

    fetchDogs()
    updateDogInfo()
})

function fetchDogs(){
    fetch('http://localhost:3000/dogs')
    .then(resp => resp.json())
    .then(loopThroughDogs)

}

function loopThroughDogs(dogs){
    for (dog of dogs){
        addDogToDOM(dog)
    }
}

function addDogToDOM(dog){

    const {name, breed, sex, id} = dog

    let tableBody = document.getElementById('table-body')
    let tableRow = document.createElement('tr')
    tableRow.innerHTML = `<tr><td class="name">${name}</td>
    <td class="breed">${breed}</td>
    <td class="sex">${sex}</td>
    <td><button class="edit-button">Edit</button></td></tr>`
    tableRow.dataset.id = id
    tableBody.appendChild(tableRow)

}

function updateDogInfo(){

    document.addEventListener('click',function(e){

        if (e.target.matches(".edit-button")){
            let dogEntry = e.target.parentElement.parentElement
            console.log(dogEntry)
            let dogID = dogEntry.dataset.id
            console.log(dogID)
            let dogName = dogEntry.querySelector('.name').innerText
            console.log(dogName)
            let dogBreed = dogEntry.querySelector('.breed').innerText
            console.log(dogBreed)
            let dogSex = dogEntry.querySelector('.sex').innerText
            console.log(dogSex)
            editDogData(dogName,dogBreed,dogSex)
            submitEdittedData(dogID)
            

        }

    })

}

function editDogData(dogName, dogBreed, dogSex){

    let dogForm = document.querySelector("#dog-form")
    let dogNameField = dogForm.firstElementChild
    dogNameField.value = dogName
    let dogBreedField = dogNameField.nextElementSibling
    dogBreedField.value = dogBreed
    let dogSexField = dogBreedField.nextElementSibling
    dogSexField.value = dogSex
}


function submitEdittedData(dogID){
    console.log(dogID)

    dogForm = document.querySelector("#dog-form")
    document.addEventListener('submit',function(e){
        e.preventDefault()
        let dogNameField = dogForm.firstElementChild
        newDogName = dogNameField.value
        let dogBreedField = dogNameField.nextElementSibling
        newDogBreed = dogBreedField.value
        let dogSexField = dogBreedField.nextElementSibling
        newDogSex = dogSexField.value
        patchRequest(newDogName,newDogBreed,newDogSex, dogID)
    })

}

function patchRequest(newDogName,newDogBreed,newDogSex, id){
    console.log({newDogName,newDogBreed,newDogSex,id})
    fetch('http://localhost:3000/dogs/'+id,{
        method: "PATCH",
        headers:{
            'content-type': 'application/json',
            'accept': 'application/json'
        },
        body: JSON.stringify({
            "name": newDogName,
            "breed": newDogBreed,
            "sex": newDogSex,
        })
    })
    .then(resp => resp.json())
    .then(newDog =>{
        let tableData = document.querySelector('#table-body');
        tableData.innerHTML ='';
        fetchDogs()
    })

}