# Westminster Kennel Club Dog Show

You are responsible for managing the website for the Westminster Kennel Club Dog Show. These dog owners are _very_ competitive. We need to make sure that they can view all the competition (the other dogs) and edit their dog's information.

### Getting Started

You will be using the [json-server](https://github.com/typicode/json-server) package to mock an external API. You can make the same RESTful requests to this server that you would to any API. If you haven't yet, install json-server.
```bash
npm install -g json-server
```

Then run the server with:
```bash
json-server --watch db.json
```

This will serve your code on http://localhost:3000.

### Deliverables

- On page load, render a list of already registered dogs in the table. You can fetch these dogs from http://localhost:3000/dogs.
- The dog should be put on the table as a table row. The HTML might look something like this `<tr><td>Dog *Name*</td> <td>*Dog Breed*</td> <td>*Dog Sex*</td> <td><button>Edit</button></td></tr>`
- Make a dog editable. Clicking on the edit button next to a dog should populate the top form with that dog's current information.
- On submit of the form, a PATCH request should be made to http://localhost:3000/dogs/:id to update the dog information (including name, breed and sex attributes).
- Once the form is submitted, the table should reflect the updated dog information. There are many ways to do this. You could search for the table fields you need to edit and update each of them in turn, but we suggest making a new get request for all dogs and rerendering all of them in the table. Make sure this GET happens after the PATCH so you can get the most up-to-date dog information.

### Example
The below gif demonstrates the working functionality of the app.

![app](assets/app.gif)

![dog](assets/dog-show.jpg)





```
/*
render list of dogs
    each dog is a new row underneath the following columns:
        <tr>
            <td>Dog *Name*</td> 
            <td>*Dog Breed*</td> 
            <td>*Dog Sex*</td> 
            <td><button>Edit</button></td>
        </tr>
        <tr>
            <td>td's for each dog attribute</td>
        </tr>

    make function getDogs that fetches dogs from the dogs url
        call render dogs in 2nd .then
    
    make function render dog that takes dog object as argument
        select table element
        create tr element
        set tr className to "dog-row"
        set the tr element's dataset.id to the dog's id attribute
        set innerHTML to td's, interpolating each attribute
            give the button element a class of 'edit-dog'
                give class='edit-dog' to button
        append tr to table

    make function for rendering dogs array that takes array as argument
        for each dog of dogs, call render dog and pass the dog as its argument

add click listener to the edit button of each dog tr
    if e.target matches '.edit-dog'
        e.preventDefault() actually don't need this for button element
        declare const to select form
        set form["name"].value equal to the appropriate child of the parent of the parent of e.target
            play with in console to check
            if works, do the same for form["breed"].value
            if works, do the same for form["sex"].value
        make a function called populateEditField that does all this and returns the dog's id from the dataset.id of the parent of the parent of e.target

        set form.dataset.dogId equal to the dog row's dataset.id
    if e.target matches the submit button of #dog-form
        e.preventDefault()
        set the values of the form fields to an object called editDogObj
        set a configObj with method of "PATCH", headers key, and body key with JSON.stringify of editDogObj
        call dogEdit function which takes configObj as argument
            dogEdit:
                sends post request to interpolated string of url with id argument
                in second .then:
                    call resetDogs
                    call getDogs function to rerender the dogs table entries

    make a function called resetDogs that removes each element with the class dog-row from the table element
        declare const table and select it
        declare const and select all ".dog-row" elements
        for each dogRow of dogRows, remove from table

*/
```