document.addEventListener('DOMContentLoaded', () => {

    const baseUrl = "http://localhost:3000/dogs/"
    function dataHandler(){
        fetch(baseUrl)
            .then(res => res.json())
            .then(renderDogs)

    }

    function renderDogs(dogs){
        for (dog of dogs){
            renderDog(dog)
        }
    }

    function renderDog(dog){
        const table = document.querySelector("#table-body")
        const row = table.insertRow(0)
        const name = row.insertCell(0)
        const breed = row.insertCell(1)
        const sex = row.insertCell(2)
        const edit = row.insertCell(3)
        name.innerText = `${dog.name}`
        breed.innerText = `${dog.breed}`
        sex.innerText = `${dog.sex}`
        edit.innerHTML = `
        <button data-id=${dog.id}>Edit</button>
        `



    }

    function clickHandler(){
        document.addEventListener('click', e =>{
            if (e.target.innerText === "Edit") {
            button = e.target
            const editCell = e.target.closest('td')
            const sex = editCell.previousElementSibling.innerText
            // const sexCell = sex.closest('td')
            const breed = editCell.previousElementSibling.previousElementSibling.innerText
            // const breedCell = breed.closest('td')
            const name = editCell.previousElementSibling.previousElementSibling.previousElementSibling.innerText
            form = document.querySelector("#dog-form")
            form.name.value = name
            form.breed.value = breed
            form.sex.value = sex
            form.dataset.id = button.dataset.id
            }



        })

        document.addEventListener("submit", e =>{
            e.preventDefault()
            button = e.target
            form = button.closest('form')
            id = form.dataset.id
            name = form.name.value
            breed = form.breed.value
            sex = form.sex.value
            data = {
                name: name,
                breed: breed,
                sex: sex
            }

            options = {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            }
            fetch(baseUrl + id, options)
            .then(dataHandler)


        })


    }

    dataHandler()
    clickHandler()

})