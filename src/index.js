document.addEventListener('DOMContentLoaded', () => {
    let ce = (element) => document.createElement(element)
    let qs = (selector) => document. querySelector(selector)
    let gid = (id) => document.getElementById(id)
    let dogTable = gid('table-body')
    let dogURL = 'http://localhost:3000/dogs/'
    let dogForm = gid('dog-form')

    function getDogs() {
        fetch(dogURL)
        .then(resp => resp.json())
        .then(displayDogs)
    }

    function displayDogs(dogs) {
        for (const dog of dogs) {
            displayDog(dog)
        }
    }
    
    function displayDog(dog) {
        let dogRow = ce('tr')
        dogRow.dataset.dogId = dog.id
        dogRow.innerHTML = `<td>${dog.name}</td> 
        <td>${dog.breed}</td> 
        <td>${dog.sex}</td> 
        <td><button>Edit Dog</button></td>`
        
        dogTable.append(dogRow)
    }

    dogTable.addEventListener('click', e => {
        if (e.target.matches('button')) {
            let row = e.target.parentElement.parentElement
            let name = row.children[0].innerText
            let breed = row.children[1].innerText
            let sex = row.children[2].innerText
            console.dir(name)
            
            dogForm.dataset.dogId = row.dataset.dogId
            dogForm.name.value = name
            dogForm.breed.value = breed
            dogForm.sex.value = sex
        }
    })

    function removeAllDogs() {
        let tbl = document.querySelector('#table-body')
        let all = tbl.querySelectorAll('*')
        for (element of all) {
            element.remove()
        }
    }

    dogForm.addEventListener('submit', e => {
        e.preventDefault()
        let dogId = dogForm.dataset.dogId
        if (dogId) {
            let config = {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify({
                    name: dogForm.name.value,
                    breed: dogForm.breed.value, 
                    sex: dogForm.sex.value
                })
            }   
            
            fetch(dogURL + dogId, config)
            removeAllDogs()
            getDogs()

            dogForm.removeAttribute('data-dog-id')
            dogForm.name.value = ""
            dogForm.breed.value = ""
            dogForm.sex.value = ""
        }
    })
    getDogs()
})