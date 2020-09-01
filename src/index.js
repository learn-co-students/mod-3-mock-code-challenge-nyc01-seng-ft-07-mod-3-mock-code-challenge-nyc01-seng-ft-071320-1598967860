document.addEventListener('DOMContentLoaded', () => {
    const dogsUrl = "http://localhost:3000/dogs"
    const dogsTable = document.querySelector("#table-body")
    const dogForm = document.getElementById("dog-form")
    let nameInput = dogForm.children[0]
    let breedInput = dogForm.children[1]
    let sexInput = dogForm.children[2]
    
    fetchDogs = (url) => {
        fetch(url)
        .then(resp => resp.json())
        .then(dogsData => showAllDogs(dogsData))
    }
    fetchDogs(dogsUrl)

    showDog = (dog) => {
        let newRow = document.createElement("tr")
        newRow.dataset.id = dog.id
        newRow.innerHTML = 
        `
        <td>${dog.name}</td> 
        <td>${dog.breed}</td> 
        <td>${dog.sex}</td> 
        <td><button class=dogbutton>Edit</button></td>
        `
        dogsTable.append(newRow)
    }

    showAllDogs = (dogsObject) => {
        dogsObject.forEach(dog => showDog(dog))
    }

    dogsTable.addEventListener("click", function(e){
        if (e.target.className === "dogbutton"){
            let parentRow = e.target.parentElement.parentElement
            let rowId = parentRow.dataset.id
            nameInput.value= parentRow.children[0].textContent
            breedInput.value = parentRow.children[1].textContent
            sexInput.value = parentRow.children[2].textContent

            dogForm.addEventListener("submit", function(e){
                e.preventDefault()
                fetch(`${dogsUrl}/${rowId}`, {
                    method: "PATCH", 
                    headers: {
                        "Content-Type": "application/json",
                        "Accepts": "application/json"
                    }, body: JSON.stringify({
                        "name": nameInput.value,
                        "breed": breedInput.value,
                        "sex": sexInput.value
                    })
                })
                .then(resp => resp.json())
                .then(dogs => showAllDogs(dogs))
                dogForm.reset()
            })
        }
    })

  

})

/*
DONE √ - On page load, render a list of already 
registered dogs in the table. You can fetch these 
dogs from http://localhost:3000/dogs.
DONE √ - The dog should be put on the table as a table row.
 The HTML might look something like this 
 `<tr><td>Dog *Name*</td> <td>*Dog Breed*</td>
  <td>*Dog Sex*</td> <td><button>Edit</button></td></tr>`
DONE √ - Make a dog editable. Clicking on the edit button
 next to a dog should populate the top form with
  that dog's current information.
DONE √ - On submit of the form, a PATCH request should be made 
to http://localhost:3000/dogs/:id to update the dog
information (including name, breed and sex attributes).
DONE √ - Once the form is submitted, the table should reflect the 
updated dog information. There are many ways to do this. 
You could search for the table fields you need to edit and 
update each of them in turn, but we suggest making a new get 
request for all dogs and rerendering all of them in the table. 
Make sure this GET happens after the PATCH so you can get the 
most up-to-date dog information.

*/