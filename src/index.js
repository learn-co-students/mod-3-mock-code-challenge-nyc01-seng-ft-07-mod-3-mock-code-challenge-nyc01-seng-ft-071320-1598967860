//Who let the dogs out? Was it Steven?
document.addEventListener('DOMContentLoaded', () => {
    console.log('Lock and loaded - James Check')
    get()
    button()
})

function get(){
    fetch('http://localhost:3000/dogs')
    .then(res=>res.json())
    .then(string=>string.forEach(dog=>render(dog)))
}

function render(dog){//console.log(dog) //works. we moved into this realm
    const table = document.querySelector('table')
    const tr = document.createElement('tr')
    table.appendChild(tr)
    tr.dataset.id=dog.id
    tr.innerHTML=`<td class='name'>${dog.name}</td><td class='breed'>${dog.breed}</td><td class='sex'>${dog.sex}</td><td><button class="edit">Edit</button></td>`
}//this is the end of render

function button(){
    const form = document.querySelector('form')
    form.lastElementChild.disabled = true
    document.addEventListener('click',(e)=>{//console.log("what what is two words") // console.log(e.target)
        if (e.target.matches('.edit')){//console.log("you are in the edit button")
            form.lastElementChild.disabled = false
            const bug= e.target.parentElement.parentElement
            const id = bug.dataset.id
            const nameBox = bug.firstElementChild
            const breedBox = nameBox.nextElementSibling
            const sexBox = breedBox.nextElementSibling
            form.name.value = nameBox.innerText
            form.breed.value= breedBox.innerText
            form.sex.value= sexBox.innerText
            form.addEventListener('submit',(e)=>{
                e.preventDefault()
                dog={
                    name: form.name.value,
                    breed: form.breed.value,
                    sex: form.sex.value
                }
                console.log(dog)
                fetch('http://localhost:3000/dogs/'+id, {
                    method: "PATCH",
                    headers: {
                    "Content-type": "application/json",
                    "accept": "application/json"
                    },
                    body: JSON.stringify(
                        dog
                    ) //This is the end of the body
                })//This is the end of the fetch
                form.reset
                const table = document.querySelector('table')
                table.innerHTML=""
                table.innerHTML=`<thead class='blue'>
                <tr class='padding'>
                  <th class='padding center'>Name</th>
                  <th class='padding center'>Breed</th>
                  <th class='padding center'>Sex</th>
                  <th class='padding center'>Edit Dog</th>
                </tr>
              </thead>
              <tbody id="table-body">
              </tbody>`
                get()
                form.lastElementChild.disabled = true
            })//This is the end of the submit editor
        }//this is the end of my if statement for edit function 
    })//this is the end of add event listener
}//this is the end of edit button