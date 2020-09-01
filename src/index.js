document.addEventListener('DOMContentLoaded', () => {

    //global variables
    const dogsUrl = "http://localhost:3000/dogs/"
    const dogsTable = document.querySelector("#table-body")
    const form = document.querySelector("#dog-form")
    const nameInput = document.querySelector("[name=name]")
    const breedInput = document.querySelector("[name=breed]") 
    const sexInput = document.querySelector("[name=sex]") 

    //functions
    const getDogs = () => {
        fetch(dogsUrl)
        .then(resp => resp.json())
        .then(dogs => dogs.forEach(dog => renderDog(dog)))
    }

    const renderDog = (dog) => {
        const dogTr = document.createElement("tr")
        dogTr.innerHTML = `<td class="name">${dog.name}</td> 
        <td class="breed">${dog.breed}</td> 
        <td class="sex">${dog.sex}</td> 
        <td>
            <button class="edit" data-id=${dog.id}>Edit</button>
        </td>`
        dogsTable.append(dogTr)
    }

    //event listeners
    document.addEventListener("click", e => {

        let nameText = e.target.parentNode.parentNode.querySelector(".name")
        let breedText = e.target.parentNode.parentNode.querySelector(".breed")
        let sexText = e.target.parentNode.parentNode.querySelector(".sex")
        if (e.target.className === ("edit")){ 
            nameInput.value = nameText.innerText
            breedInput.value = breedText.innerText
            sexInput.value = sexText.innerText
            dogId = e.target.dataset.id
            form.dataset.id = dogId
            // debugger
        }
    })

    document.addEventListener("submit", e => {
        e.preventDefault()
        if (e.target.id === ("dog-form")){

            const dogObj = {
                name: nameInput.value,
                breed: breedInput.value,
                sex: sexInput.value
            }
            const configObj = {
               method: "PATCH",
               headers: {
                 "content-type": "application/json",
                 "accept": "application/json"
               },
               body: JSON.stringify(dogObj)
               } 
            
            fetch((dogsUrl + form.dataset.id), configObj)
            .then(resp => resp.json())
            .then(patchedDog => {
                dogsTable.innerHTML = ""
                getDogs()
            })
            form.reset()
        }
    })
    //invoke functions
    getDogs()
})


/*
1) √fetch dogs

2) √render each dog, create a tr and insert innerHTML:
    <><td>Dog *Name*</td> <td>*Dog Breed*</td> <td>*Dog Sex*</td> <td><button>Edit</button></td>

3) √populate the form with dog's attributes when edit button is clicked

4) √when form is submitted, update backend and frontend w/o refresh

*/