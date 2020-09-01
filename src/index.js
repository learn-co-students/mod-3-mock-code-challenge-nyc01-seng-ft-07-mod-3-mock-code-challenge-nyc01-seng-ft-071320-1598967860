document.addEventListener('DOMContentLoaded', () => {
    const dogUrl = "http://localhost:3000/dogs"

    const getDogs = () => {
        fetch(dogUrl)
        .then(response => response.json())
        .then(renderDogTable)
    }

    const dogTable = document.getElementById('#table-body')
    const renderDogTable = (dogs) => {
        for(const dog of dogs) {
            let newDogRow = dogTable.insertRow()
            let newDogCell = newDogRow.insertCell(0)
            // name, breed, sex
            newDogCell.innerText = dog.name
            newDogCell.innerText = dog.breed
            newDogCell.innerText = dog.sex
            newDogCell.dataset.num = dog.id
            dogTable.append(newDogCell)
        }
    }
    getDogs()
})