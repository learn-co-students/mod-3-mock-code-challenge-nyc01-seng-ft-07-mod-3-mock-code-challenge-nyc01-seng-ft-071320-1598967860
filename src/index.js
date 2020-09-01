document.addEventListener('DOMContentLoaded', () => {
    const BASEURL = "http://localhost:3000/dogs/"
    const table = document.getElementById("table-body");
    const form = document.getElementById("dog-form");
    
    const getDogs = () => {
        fetch(BASEURL)
        .then(resp => resp.json())
        .then(dogs => renderDogs(dogs))
    }

    const renderDogs = (dogs) => {
        for (let dog of dogs) {
            renderDog(dog)
        }
    }


    const renderDog = (dog) => {
        const dogTable = document.createElement('table')
        dogTable.innerHTML = `
        <tr><td> ${dog.name }</td> 
        <td>${dog.breed}</td> 
        <td>${dog.sex}</td> 
        <td><button>Edit</button></td></tr>
        `
        table.append(dogTable)

        dogTable.addEventListener("click", (e) => {
            if (e.target.matches("button")) {
                const dogTr = e.target.parentElement.parentElement
                const dogName = dogTr.children[0].outerText;
                const dogBreed = dogTr.children[1].outerText;
                const dogSex = dogTr.children[2].outerText;
                const dogInfo = { dogName, dogBreed, dogSex }
                renderForm(dogInfo)
            }
        })
    }

    const renderForm = (dogInfo) => {
        
    }



    getDogs();
})