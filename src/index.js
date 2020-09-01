/*
- On page load, render a list of already registered dogs in the table. You can fetch these dogs from http://localhost:3000/dogs.

- The dog should be put on the table as a table row. The HTML might look something like this `<tr><td>Dog *Name*</td> <td>*Dog Breed*</td> <td>*Dog Sex*</td> <td><button>Edit</button></td></tr>`

- Make a dog editable. Clicking on the edit button next to a dog should populate the top form with that dog's current information.

- On submit of the form, a PATCH request should be made to http://localhost:3000/dogs/:id to update the dog information (including name, breed and sex attributes).

- Once the form is submitted, the table should reflect the updated dog information. There are many ways to do this. You could search for the table fields you need to edit and update each of them in turn, but we suggest making a new get request for all dogs and rerendering all of them in the table. Make sure this GET happens after the PATCH so you can get the most up-to-date dog information.
*/


document.addEventListener('DOMContentLoaded', () => {

// fetch get
// renderdog
//render dogs on table as table row html in README
// fetch patch to edit existing dog
    // grab dog's indiv info and pull in to the form with e.value =
//get it on the page

const dogUrl = "http://localhost:3000/dogs"
const editDogForm = document.querySelector('#dog-form')


    function getDog(url){
        fetch(url).then(response => response.json()).then(dogs => renderDogs(dogs))
    }
getDog(dogUrl)

    function renderDogs(dogs){
        for(dog of dogs){
        renderDog(dog)
        }
    }

    function renderDog(dog){
        dogName = dog.name
        dogBreed = dog.breed
        dogSex = dog.sex
        dogId = dog.id

        let dogInfo = `
        <tr>
        <td>${dogName}</td> 
        <td>${dogBreed}</td> 
        <td>${dogSex}</td> 
        <td><button>Edit</button></td>
        </tr> `;

        let putDogsHere = document.querySelector('#table-body')
        let tableRow = document.createElement('tr')
        let dogRow = putDogsHere.appendChild(tableRow)
        tableRow.innerHTML = dogInfo
    }

    const editBtn = document.getElementsByTagName('button')
    for(let i=0; i<editBtn.length; i++){
        editBtn.addEventListener('click', (event) =>{}
    )}
    
// when the edit button is clicked do a function that getDogData in to the input fields of dog-form 

        editDogForm.addEventListener('submit', (e) =>{
            e.preventDefault()
            
            fetch(`dogUrl/dogId`,{
                method: "PATCH",
                headers: {
                    "Content-Type": " application/json",
                    "Accepts": " application/json"
                },
                body: JSON.stringify({
                    dogName: e.input,
                    dogBreed: e.input,
                    dogSex: e.input
                })
                .then(response => response.json()).then(data => renderDog(data))
            })



        })
    





})






