document.addEventListener('DOMContentLoaded', () => {
    const DOG_URL = 'http://localhost:3000/dogs'
    let DOG_ID = ''

    getDogs()

    function getDogs(){
        fetch(DOG_URL)
            .then(response => response.json())
            .then(dogs => renderDogs(dogs))
            .catch(err => console.log(err.message))
    }

    const renderDog = (dog) => {
        const table = document.querySelector('table')
        const tr = document.createElement('tr')
        tr.className = 'dog-row'
        tr.dataset.id = dog.id
        tr.innerHTML = `
            <td>${dog.name}</td>
            <td>${dog.breed}</td>
            <td>${dog.sex}</td>
            <td><button class='edit-dog'>Edit</button></td>
        `
        table.append(tr)
    }

    const renderDogs = (dogs) => {
        dogs.forEach(dog => {
            renderDog(dog)
        })
    }

    document.addEventListener("click", (e)=>{
        const button = e.target

        if(button.matches('.edit-dog')){
            
        }

    })

})



/*
render list of dogs
    each dog is a new row underneath the following columns:
        <tr>
            <td>Dog *Name*</td> 
            <td>*Dog Breed*</td> 
            <td>*Dog Sex*</td> 
            <td><button>Edit</button></td>
        </tr>
        <tr>
            <td>td's for each dog attribute</td>
        </tr>

    make function getDogs that fetches dogs from the dogs url
        call render dogs in 2nd .then
    
    make function render dog that takes dog object as argument
        create tr element
        set tr className to "dog-row"
        set the tr element's dataset.id to the dog's id attribute
        set innerHTML to td's, interpolating each attribute
            give the button element a class of 'edit-dog'

    make function for rendering dogs array that takes array as argument
        for each dog of dogs, call render dog and pass the dog as its argument

add click listener to the edit button of each dog tr
    if e.target matches '.edit-dog'
        e.preventDefault()
        set form["name"].value equal to the parent of the parent of e.target
            play with in console to check
            if works, do the same for form["breed"].value
            if works, do the same for form["sex"].value
        make a function called populateEditField that does all this and returns the dog's id from the dataset.id of the parent of the parent of e.target
        set a variable for dogId equal to the function
            make sure this variable is declared so that it's within scope to use for the dogEdit function
    if e.target matches the submit of #dog-form
        e.preventDefault()
        set the values of the form fields to an object called editDogObj
        set a configObj with method of "PATCH", headers key, and body key with JSON.stringify of editDogObj
        call dogEdit function which takes the above objects and the dog's id as arguments 
            dogEdit:
                sends post request to interpolated string of url with id argument
                in second .then:
                    call resetDogs
                    call getDogs function to rerender the dogs table entries

    make a function called resetDogs that removes each element with the class dog-row from the table element
        declare const table and select it
        declare const and select all ".dog-row" elements
        for each dogRow of dogRows, remove from table

*/