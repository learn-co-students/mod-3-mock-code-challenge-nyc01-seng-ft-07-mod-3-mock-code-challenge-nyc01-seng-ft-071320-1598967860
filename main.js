document.addEventListener('DOMContentLoaded', () => {
   let dogsURL = 'http://localhost:3000/dogs/'
   let dogTable = document.querySelectorAll('.margin')[3]
   let dogForm = document.getElementById('dog-form')
   let dogsFlex = dogTable.parentElement.childNodes[5]
   

   function getDogs() {
      fetch(dogsURL)
         .then(response => response.json())
         .then(dogsData => renderAllDogs(dogsData))
   }

   function dogInfo(dog) {
      let dogs = document.createElement('tr')
      dogs.dataset.dogId = dog.id

      dogs.innerHTML = 
      `<td> ${dog.name} </td>
      <td> ${dog.breed} </td>
      <td> ${dog.sex} </td>
      <td><button>Edit</button></td>`

      dogTable.append(dogs)
   }

   function renderAllDogs(allDogs) {
      allDogs.forEach(dogs => {
         dogInfo(dogs)
      })
   }

   function clickHandler() {
      

      dogsFlex.addEventListener('click', e => {
         if (e.target.matches('button')) {
            let dogId = e.target.parentNode.parentNode.dataset.dogId
            console.log(dogId)
            dogForm.addEventListener('submit', e => {
               e.preventDefault()
               const dogName = dogForm.name.value
               const dogBreed = dogForm.breed.value
               const dogSex = dogForm.sex.value
               
               fetch(dogsURL + dogId, {
                  method: "PATCH",
                  headers: {
                     "Content-Type": "application/json",
                     "Accept": "application/json"
                  },
                  body: JSON.stringify({
                     name: dogName,
                     breed: dogBreed,
                     sex: dogSex
                  })
                  
               })
               dogForm.reset()
            })
            // takes you to edit form on top
            
            // changes submit button to update
           
           
            // does a POST request
            

         }
      })


   }







   getDogs()
   clickHandler()
})






// - √ On page load, render a list of already registered dogs in the table. You can fetch these dogs from http://localhost:3000/dogs.

// - √ The dog should be put on the table as a table row. The HTML might look something like this 
// `<tr><td>Dog *Name*</td>
// <td>*Dog Breed*</td>
// <td>*Dog Sex*</td>
// <td><button>Edit</button>
// </td></tr>`

// - Make a dog editable. Clicking on the edit button next to a dog should populate the top form with that dog's current information.

// - On submit of the form, a PATCH request should be made to http://localhost:3000/dogs/:id to update the dog information (including name, breed and sex attributes).

// - Once the form is submitted, the table should reflect the updated dog information. There are many ways to do this. You could search for the table fields you need to edit and update each of them in turn, but we suggest making a new get request for all dogs and rerendering all of them in the table. Make sure this GET happens after the PATCH so you can get the most up-to-date dog information.

