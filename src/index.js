document.addEventListener('DOMContentLoaded', () => {

    const table = document.querySelector("table")
    const form = document.querySelector("form")

    function getDogs(){
        const baseUrl = "http://localhost:3000/dogs/"
        fetch(baseUrl)
        .then(res => res.json())
        .then(data => iterateDogs(data))
    }

    function iterateDogs(data){
        for(let dogObj of data){
            renderDog(dogObj)
        }
    }

    function renderDog(dogObj){
        let tr = document.createElement("tr")
        tr.innerHTML = `
        <td>${dogObj.name}</td>
        <td>${dogObj.breed}</td>
        <td>${dogObj.sex}</td>
        <td>    <button class="edit-btn" data-id=${dogObj.id}>Edit Dog</button>   </td>
        `
        table.append(tr)
    }

    function clickHandler(){
        document.addEventListener("click", (e) => {
            const button = e.target
            if(button.matches(".edit-btn")){
                console.log(e)
                let name = button.parentElement.parentElement.firstElementChild.innerText
                let breed = button.parentElement.parentElement.firstElementChild.nextElementSibling.innerText
                let sex = button.parentElement.previousElementSibling.innerText
                let idStr = button.dataset.id
                let id = parseInt(idStr)
                form.name.value = name
                form.breed.value = breed
                form.sex.value = sex
                form.submit.id = id
                submitHandler()
            }
        })
    }

    function submitHandler(){
        document.addEventListener("submit", (e) => {
            name = form.name.value
            breed = form.breed.value
            sex = form.sex.value
            dogId = form.submit.id
            const dogObj = {
                name: name,
                breed: breed,
                sex: sex
            }
            
            const options = {
                method: "PATCH", 
                headers: {
                    "content-type": "application/json",
                    "accept" : "application/json"
                },
                body: JSON.stringify( dogObj )
            }
            fetch("http://localhost:3000/dogs/" + dogId, options)
            .then(res => res.json())
            .then(Success => console.log("Yay"))
        })
    }
    getDogs()
    clickHandler()
})




/**
 * <tr>
 *  <td>Dog *Name*</td> 
 *  <td>*Dog Breed*</td> 
 *  <td>*Dog Sex*</td> 
 *  <td><button>Edit</button></td>
 * </tr>*/