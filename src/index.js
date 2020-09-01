document.addEventListener('DOMContentLoaded', () => {

    const baseURL = 'http://localhost:3000/dogs/'
    const table = document.querySelector('#table-body')
    let dog;

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
        tr.id = dog.id
        tr.innerHTML = `<td>${dog.name}</td> <td>*${dog.breed}</td> 
        <td>${dog.sex}</td> <td><button>Edit Dog</button></td>`
        table.append(tr)
    }

    //create event listener for edit dog btn 
    table.addEventListener('click', function(e){
        if(e.target.matches('button')){
            getDogById(e.target.id)
        }
    })

    function getDogById(dogId){
        fetch(baseURL)
        .then(resp => resp.json())
        .then(dogs => {
            dog = dogs.find(function(el){
                el.id === dogId
                
            })
            console.log(dog)
        })
    }

    getDogs();


})