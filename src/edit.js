import { getRecepies, addIngredient, updateRecepie, removeRecepie } from './recepies' 
import { renderIngredients } from './views' 

const recepieName = document.querySelector('#recepie-name')
const recepieBody = document.querySelector('#recepie-body')
const removeRecepieButton = document.querySelector('#remove-recepie')
const submitIngredient = document.querySelector('#submit-ingredient')

const recepieId = location.hash.substring(1) 

let recepies = getRecepies()
console.log(recepies)

let recepie = recepies.find((recepie) => {
    return recepie.id === recepieId
})

// Render ingredients on the page load
renderIngredients(recepie)

if (!recepie) {
    location.assign('./index.html')
}

recepieName.value = recepie.name
recepieBody.value = recepie.body

recepieName.addEventListener('input', e => {
    updateRecepie(recepie.id ,{
        name: e.target.value
    })
})

recepieBody.addEventListener('input', e => {
    updateRecepie(recepie.id ,{
        body: e.target.value
    })
})

// Ingredients Array Events

removeRecepieButton.addEventListener('click', () => {
    removeRecepie(recepie.id)
    location.assign('./index.html')
})

submitIngredient.addEventListener('submit', e => {
    e.preventDefault()
    let ingredient = e.target.elements.newIngredient.value.trim()
    addIngredient(recepie.id, ingredient)
    e.target.elements.newIngredient.value = ''
    renderIngredients(recepie)
})

