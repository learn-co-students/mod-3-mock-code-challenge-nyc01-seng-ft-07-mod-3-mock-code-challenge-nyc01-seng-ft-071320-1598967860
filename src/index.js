document.addEventListener('DOMContentLoaded', () => {
    const dogUrl = "http://localhost:3000/dogs/"
    const dogContainer = document.querySelector('.center')
    const submitForm = document.querySelector('#dog-form')
    const input = document.querySelectorAll('input')



    const fetchDogs = () => {
        fetch(dogUrl)
        .then(resp => resp.json())
        .then(dogs => dogs.forEach(dog => renderDog(dog)))
    }
    
    
    const renderDog = (dogObj) => {
        const dogTable = document.createElement('table')
        dogTable.id = dogObj.id
        dogContainer.append(dogTable)
        dogTable.innerHTML = 
        `<tr><td class="dog-name">${dogObj.name}</td> <td class="dog-breed">${dogObj.breed}</td> <td class="dog-sex">${dogObj.sex} </td> <td><button class="edit-dog-btn">Edit</button></td></tr>`
    }

    
    const clickHandler = () => {
        document.addEventListener('click', function(e){
            if (e.target.matches('.edit-dog-btn')) {
                const thisDog = e.target
                const dogName = thisDog.parentNode.parentNode.querySelector('.dog-name').innerText
                const dogBreed = thisDog.parentNode.parentNode.querySelector('.dog-breed').innerText
                const dogSex = thisDog.parentNode.parentNode.querySelector('.dog-sex').innerText

                input[0]['value'] = dogName
                input[1]['value'] = dogBreed
                input[2]['value'] = dogSex

                submitForm.addEventListener('submit', function(e){
                    e.preventDefault()

                    const options = {
                    method: 'PATCH',
                    headers: {
                      "Content-Type": "application/json"},
                    body: JSON.stringify({name: input[0]['value'], breed: input[1]['value'], sex: input[2]['value']})
                    }

                    fetch(dogUrl + thisDog.parentNode.parentNode.parentNode.parentNode.id, options)
                    .then(resp => resp.json())
                    .then(updatedDog => editDog(updatedDog))


                    const editDog = (updatedDog) => {
                        // find existing dog's table by id
                        console.log(updatedDog)
                        //existing dog's table.innerHTML = 
                        `<tr><td class="dog-name">${updatedDog.name}</td> <td class="dog-breed">${updatedDog.breed}</td> <td class="dog-sex">${updatedDog.sex} </td> <td><button class="edit-dog-btn">Edit</button></td></tr>`
                    }
                    
                })
            }

        })
    }




    
    // add click listener to edit button
    // grab submit input fields
    // on click, sends information to submit input fields & sets its value to dog's information
    // add submit listener to submit button & e.preventDev=fault
    // give it a patch request w/ options




clickHandler()
fetchDogs()
})