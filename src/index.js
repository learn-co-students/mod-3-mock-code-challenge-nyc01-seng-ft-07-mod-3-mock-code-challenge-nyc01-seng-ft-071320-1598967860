//Step 1 COMPLETE
//On page load we need to render al ist of the dogs
//To do this we need to send a get request using fetch
//We then need to grab the dog table and add each dog to it
//td tages with dog name, brred and sex, and an edit button(with dog.id)

//Step 2
//We need to make a dog editable. DONE
//First wee need to add a click listener to check if they clicked on edit done DONE
//then we need to make a submit listener for the form doneDONE
//in the submit listener we need to send a patch request using fetch with the name, breed, and sex attributes retireved from the form input DONE
//After this we need to clear the table DONE
//And then make another get request to retrieve all the dogs again with the new db information. DONE


document.addEventListener('DOMContentLoaded', () => {

    const dogTable = document.querySelector('tbody#table-body')
    const dogForm = document.querySelector('form#dog-form')

    function getDogs(){
        fetch('http://localhost:3000/dogs')
        .then(response => response.json())
        .then(dogs => {
            renderDogs(dogs)
            window.dogs = dogs
        })
    }

    function renderDogs(dogs) {
        for (const dog of dogs) {
            dogTable.insertAdjacentHTML('beforeend', `<tr>
                <td>${dog.name}</td>
                <td>${dog.breed}</td>
                <td>${dog.sex}</td>
                <td><button id="${dog.id}" class="dog-edit-btn">Edit</button></td>    
            </tr>`)
        }
    }


    function clickHandler(){
        document.addEventListener('click', function(e) {
            if(e.target.matches('button.dog-edit-btn')) {
                let editButton = e.target

                //finds the dog

                let dog = dogs.find(dog => {
                    return dog.id == editButton.id
                })

                dogForm.addEventListener('submit', function (event) {
                    event.preventDefault();
                    let editedName = event.target[0].value
                    let editedBreed = event.target[1].value
                    let editedSex = event.target[2].value

                    //setting up the options

                    let options = {
                        method: 'PATCH',

                        headers: {
                            'Content-Type': 'application/json' ,
                            Accept: 'application/json'
                        },

                        body: JSON.stringify({
                            'name': editedName,
                            'breed': editedBreed,
                            'sex': editedSex
                        })
                    }

                    //Patch Request

                    fetch(`http://localhost:3000/dogs/${dog.id}`, options)
                    .then(response => response.json())
                    .then(dog => {
                        dogTable.innerHTML = ''
                        getDogs();
                    })
                    
                })
            }    
        })
    }






    getDogs();
    clickHandler();
})