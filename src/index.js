document.addEventListener('DOMContentLoaded', () => {
const baseUrl = "http://localhost:3000/dogs"

   const getDogs = () => {
       fetch(baseUrl)
       .then(response => response.json())
       .then(dogs => renderDogs(dogs))
   }

   const renderDogs = (dogs) => {
       for(const dog of dogs) {
           renderDog(dog)
       }
   }

   const renderDog = (dog) => {
       const dogContainer = document.querySelector('#table-body')
       const dogDiv = document.createElement('div')
       
       dogDiv.innerHTML = `
        <tr><td>${dog.name}</td> <td>*${dog.breed}*</td>
        <td>*${dog.sex}*</td>
        <td><button data-id=${dog.id} class="edit-button">Edit</button></td></tr>
       `
        dogContainer.append(dogDiv)
   }

   const clickHandler = () => {
       document.addEventListener('click', e => {
        if (e.target.matches('.edit-button'))
            e.preventDefault()
            const button = e.target
            const id = button.dataset.id
            const dogForm = document.querySelector('#dog-form')
       })
   }

clickHandler()
getDogs()
})