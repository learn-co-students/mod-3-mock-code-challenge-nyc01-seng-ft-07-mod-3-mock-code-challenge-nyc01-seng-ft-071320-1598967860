document.addEventListener('DOMContentLoaded', () => {
    const dogUrl = "http://localhost:3000/dogs"

    const getDogs = () => {
        fetch(dogUrl)
        .then(response => response.json())
        .then(renderDogTable)
    }

    // const renderDogTable = (dogs) => {
    //     const dogTable = document.getElementById('table-body')
    //     for(let dog of dogs) {
    //         let newDogRow = dogTable.insertRow()
    //         for (key in dog) {
    //             let newDogCell = newDogRow.insertCell()
    //             // name, breed, sex
    //             newDogCell.dataset.num = dog.id
    //             newDogCell.innerText = dog.name
    //             // newDogCell.innerText = dog.breed
    //             // newDogCell.innerText = dog.sex
    //             dogTable.appendChild(newDogCell)
    //         }
    //     }
    // }

    // let dogTable = document.getElementById('table-body')
    // function renderDogTable(dogs) {
    //     for (let dog of dogs) {
    //         let newDogRow = dogTable.insertRow()
    //         for (key in dog) {
    //             let newDogCell = newDogRow.insertCell()
    //             let newDogText = document.createTextNode(dog[key])
    //             newDogCell.appendChild(newDogText)
    //         }
    //     }
    // }

    const renderDogTable = (dogs) => {
        const dogTable = document.querySelector('#table-body')
        for(dog of dogs) {
            const tr = document.createElement('tr')
            const td = document.createElement('td')
            td.innerHTML = `
            <td>${dog.name}</td>
            <td>${dog.breed}</td>
            <td>${dog.sex}</td>
            <td><button class="edit-button" data-id=${dog.id}>Edit</button></td>
            `
            tr.append(td)
            dogTable.append(tr)
        }
    }
    
    const submitHandler = () => {
        const form = document.getElementById('dog-form')
        form.addEventListener('submit', e => {
            e.preventDefault()

            const name = form.name.value
            const breed = form.breed.value
            const sex = form.sex.value

            const newDog = {
                "name": name,
                "breed": breed,
                "sex": sex
            }

            const options = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify(newDog)
            }
            fetch(dogUrl, options)
        })
    }

    const clickHandler = () => {
        document.addEventListener('click', e => {
            if (e.target.matches('edit-button')) {
                const edit = e.target
                

            }
        })
    }



    submitHandler()
    getDogs()
})