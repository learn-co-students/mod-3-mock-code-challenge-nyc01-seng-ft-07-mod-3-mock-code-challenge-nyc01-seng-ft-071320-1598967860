document.addEventListener('DOMContentLoaded', () => {
    baseUrl = "http://localhost:3000/dogs"
    const blue = document.querySelector(".blue")


    //Slap Dog on DOM
    const slapDogonDOM = dog => {

        const tr = document.createElement("tr")
        tr.dataset.num = dog.id
        id = dog.id
        tr.innerHTML = `
        <tr><td>${dog.name}</td> <td>${dog.breed}</td> <td>${dog.sex}</td> <td><button>Edit</button></td></tr>
        `
        blue.appendChild(tr)
    }
    
    const clickHandling = () => {
        document.addEventListener("click", e=> {
            if (e.target.tagName === "BUTTON") {
                id = parseInt(e.target.parentElement.parentElement.dataset.num)
                fetchSingleDog(id)

            }
        })
    }

    const postDogOnForm = dog => {
        const dogForm = document.querySelector("#dog-form")
        dogForm.dataset.num = dog.id
        dogForm.name.value = dog.name
        dogForm.breed.value = dog.breed
        dogForm.sex.value = dog.sex
    }

    
    const submitHandling = () => {
        document.addEventListener("submit", e => {
            e.preventDefault()

            const dogForm = document.querySelector("#dog-form")
            
            let dog = {
                "name":dogForm.name.value,
                "breed":dogForm.breed.value,
                "sex":dogForm.sex.value
            }
            
            dogForm.dataset.num = dog.id
            updateDog(dog.id)
            dogForm.reset()

        })
    }

     //fetch
    const fetchDog = () => {
        fetch(baseUrl)
            .then(resp => resp.json())
            .then(dogs => dogs.forEach(dog => slapDogonDOM(dog)))
    }

    const fetchSingleDog = id => {
        fetch(baseUrl + `/${id}`)
            .then(resp => resp.json())
            .then(dog => postDogOnForm(dog))
    }

    const updateDog = (id) => {
        const options = {
            method: "PATCH",
            header: {
                "Content-Type": "application/json",
                Accept: "application/json"
            },
            body: JSON.stringify({
                dog
            })
        }
        fetch(baseUrl + `/${id}`, options)
    }


    fetchDog()
    submitHandling()
    clickHandling()

})