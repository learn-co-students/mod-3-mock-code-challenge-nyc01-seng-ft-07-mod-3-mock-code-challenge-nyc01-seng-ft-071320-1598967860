document.addEventListener('DOMContentLoaded', () => {

    const baseURL = 'http://localhost:3000/dogs/'
    const table = document.querySelector('#table-body')
    const dogForm = document.querySelector('#dog-form')
    let foundDog;

    function getDogs(){
    fetch(baseURL)
    .then(resp => resp.json())
    .then(renderDogs)
    }

    //create function to iterate through array of dogs
    function renderDogs(dogs){
        for(let dog of dogs){
            renderDog(dog)
        }
    }

    //load each dog on page
    function renderDog(dog){
        const tr = document.createElement('tr')
        tr.innerHTML = `<td>${dog.name}</td> <td>*${dog.breed}</td> 
        <td>${dog.sex}</td> <td><button class="${dog.id}">Edit Dog</button></td>`
        table.append(tr)
    }

    //create event listener for edit dog btn 
    table.addEventListener('click', function(e){
        if(e.target.matches('button')){
            getDogById(e.target.className)
        }
    })

    function getDogById(dogId){
        fetch(baseURL)
        .then(resp => resp.json())
        .then(dogsArray => {
                for(let thisDog of dogsArray){
                    if(thisDog.id == dogId){
                        foundDog = thisDog
                    }
                }
                editDog(foundDog)
            })
        }

    function editDog(dog){
        dogForm.dataset.id = dog.id 
        dogForm.children[0].value = dog.name
        dogForm.children[1].value = dog.breed
        dogForm.children[2].value = dog.sex     
    }

    dogForm.addEventListener('submit', function(e){
        e.preventDefault();
       let dogName =  dogForm.children[0].value
       let dogBreed = dogForm.children[1].value
       let dogSex = dogForm.children[2].value
       let dogId = dogForm.dataset.id
       updateDog(dogName, dogBreed, dogSex, dogId)
       dogForm.reset();
       dogForm.dataset.id = null

    })

    function updateDog(name, breed, sex, dogId){
        config = {
            method: 'PATCH',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                name: name,
                breed: breed,
                sex: sex
            })
        }
        fetch(baseURL + dogId, config)
        .then(resp => {
            if(resp.status === 200){
                table.innerHTML = ""
                getDogs();
            }
        })
    
        getDogs();
    }
    

    getDogs();


})