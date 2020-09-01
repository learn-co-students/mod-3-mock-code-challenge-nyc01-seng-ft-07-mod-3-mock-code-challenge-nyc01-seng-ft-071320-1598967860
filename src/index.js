document.addEventListener('DOMContentLoaded', () => {
    const BASEURL = "http://localhost:3000/dogs/"
    const table = document.getElementById("table-body");
    const form = document.getElementById("dog-form");
    const formName = form.children[0];
    const formBreed = form.children[1];
    const formSex = form.children[2];
    
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
        const hiddenId = document.createElement('p')
        dogTable.innerHTML = `
        <tr><td> ${dog.name }</td> 
        <td>${dog.breed}</td> 
        <td>${dog.sex}</td> 
        <td><button>Edit</button></td></tr>
        `
        hiddenId.innerText = `${dog.id}`
        table.append(dogTable)

        dogTable.addEventListener("click", (e) => {
            if (e.target.matches("button")) {
                const dogTr = e.target.parentElement.parentElement
                const dogName = dogTr.children[0].outerText;
                const dogBreed = dogTr.children[1].outerText;
                const dogSex = dogTr.children[2].outerText;
                const dogId = hiddenId.innerText
                const dogInfo = { dogName, dogBreed, dogSex, dogId };

                renderForm(dogInfo)
            }
        })
    }

    const renderForm = (dogInfo) => {
       formName.value = dogInfo.dogName;
       formBreed.value = dogInfo.dogBreed;
       formSex.value = dogInfo.dogSex;
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            form.reset();
            
            let configObj = {
                method: 'PATCH',
                headers: {
                 'Content-Type': 'application/json',
                 "accept": "application/json"
            },
            body: JSON.stringify({
                name: formName.value,
                breed: formBreed.value,
                sex: formSex.value
            })
              };

              fetch(BASEURL + dogInfo.dogId, configObj)
              .then(resp => resp.json())
              .then(data => console.log(data))
        })
    }

    const updateDog = (data) => {
        console.log(data)
    }



    getDogs();
})