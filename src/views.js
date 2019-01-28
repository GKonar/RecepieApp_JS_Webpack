import { getRecepies, removeIngredient } from './recepies'
import { getFilters } from './filters'

// Generate recepie DOM
const generateRecepieDOM = recepie => {
    
    // Create recepie DOM structure
    const recepieEl = document.createElement('p')
    const recepieTextEl = document.createElement('a')
    const recepieIngredientsEl = document.createElement('p')
    
    // Setup the recepie title
    if (recepie.name.length > 0) {
        recepieTextEl.textContent = recepie.name
    } else {
        recepieTextEl.textContent = 'Add new recepie'
    }
    
    recepieEl.appendChild(recepieTextEl)

    //Setup the link to recepie edit page
    recepieTextEl.href = `./edit.html#${recepie.id}`

    //Generate status message

    const unavailableIngredients = recepie.ingredients.filter(ingredient => !ingredient.isAvailable)
    recepieIngredientsEl.textContent = `You need ${unavailableIngredients.length} more ingredient for that dish`
    recepieEl.appendChild(recepieIngredientsEl)

    return recepieEl
} 

// Render recepies to the page
const renderRecepies = () => {
    const recepiesEl = document.querySelector('#recepies')
    const filters = getFilters()
    const recepies = getRecepies()
    const filteredRecepies = recepies.filter(recepie => recepie.name.toLowerCase().includes(filters.searchText.toLowerCase()))
    
    recepiesEl.innerHTML = '' // on every keystroke cleans html
    
    filteredRecepies.forEach(recepie => {
        const recepieElement = generateRecepieDOM(recepie)
        recepiesEl.appendChild(recepieElement)
    })
}

// ********** INGREDIENTS VIEWS ********** //

// Render list of ingredients
const renderIngredients = (recepie) => {
    const IngredientsContainer = document.querySelector('#ingredients-container')
    
    IngredientsContainer.innerHTML = ''

    recepie.ingredients.forEach(ingredient => {
        IngredientsContainer.appendChild(generateIngredientDOM(ingredient))
    })
}

// Generate Ingredient Todo
const generateIngredientDOM = (ingredient) => {  // not defined
    // Creating DOM elements

    const ingredientEl = document.createElement('label')
    const containerEl = document.createElement('div')
    const ingredientTextEl = document.createElement('span')
    const ingredientCheckbox = document.createElement('input')
    const ingredientButton = document.createElement('button')

    ingredientCheckbox.setAttribute('type', 'checkbox')
    ingredientCheckbox.checked = ingredient.isAvailable
    containerEl.appendChild(ingredientCheckbox)
    
    ingredientCheckbox.addEventListener('change', (e) => {
        ingredient.isAvailable = e.target.checked
        const recepies = getRecepies()
        localStorage.setItem('recepies', JSON.stringify(recepies)) 
    })

    // Setup ingredientTextEl
    ingredientTextEl.textContent = ingredient.name
    containerEl.appendChild(ingredientTextEl)

    //Setup Containet
    ingredientEl.appendChild(containerEl)

    //Setup Button
    ingredientButton.textContent='remove'
    containerEl.appendChild(ingredientButton)
    ingredientButton.addEventListener('click', (e) => {
        const recepies = getRecepies()
        const id = location.hash.substring(1) 
        const recepie = recepies.find(recepie => recepie.id === id) 
        removeIngredient(recepie.id, ingredient.id)
        renderIngredients(recepie)
    })

    return ingredientEl
}

export { generateRecepieDOM, generateIngredientDOM, renderIngredients, renderRecepies }