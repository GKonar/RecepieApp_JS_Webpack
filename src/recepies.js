import uuidv4 from 'uuid/v4'

let recepies = []

//  Get recepies from local storage
const loadRecepies = () => {
    const recepiesJSON = localStorage.getItem('recepies')

    try {
        return recepiesJSON ? JSON.parse(recepiesJSON) : []
    } catch (e) {
        return []
    }
}

//  Save recepies on local storage
const saveRecepies = () => {
    localStorage.setItem('recepies', JSON.stringify(recepies))
}

//  Expose recepies from module
const getRecepies = () => recepies 

//  Create Recepie
const createRecepie = () => {
    let id = uuidv4()
    
    recepies.push({
        id: id,
        name: '',
        body: '',
        ingredients: []
    })
    saveRecepies()

    return id
}

//  Remove recepie
const removeRecepie = (id) => {
    const recepieIndex = recepies.findIndex(recepie => recepie.id === id)

    if (recepieIndex > -1) { 
        recepies.splice(recepieIndex, 1)
        saveRecepies()
    }
}

const updateRecepie = (id, updates) => {
    const recepie = recepies.find(recepie => recepie.id === id)

    if (!recepie) {
        return 
    }
    
    if (typeof updates.name === 'string') {
        recepie.name = updates.name
    }

    if (typeof updates.body === 'string') {
        recepie.body = updates.body
    }

    saveRecepies()
}

// ************* INGREDIENTS ARRAY *************

//  Add new ingredient 
const addIngredient = (id ,ingredient) => { // id of recepie
    const newIngredient = {
        id: uuidv4(),
        name: ingredient,
        isAvailable: false
    }
    
    if(newIngredient.length === 0) {
        return
    } else {
        const recepie = recepies.find(recepie => recepie.id === id)
        recepie.ingredients.push(newIngredient) // error ??
        saveRecepies(recepies)
    }

    return id
}

//  Remove ingredient 
const removeIngredient = (id, ingredientId) => { 
    const recepie = recepies.find(recepie => recepie.id === id) // id of recepie 
    const ingredients = recepie.ingredients
    const ingredientIndex = ingredients.findIndex(ingredient =>  ingredient.id === ingredientId)


    if (ingredientIndex > -1) {
        ingredients.splice(ingredientIndex, 1)
        saveRecepies(recepies)
    } 
}

recepies = loadRecepies()

export { getRecepies, createRecepie, removeRecepie, updateRecepie, addIngredient, removeIngredient }