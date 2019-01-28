import { createRecepie } from './recepies'
import { setFilters } from './filters'
import { renderRecepies } from './views'

renderRecepies()

// Input Event Listener to filter recepies
document.querySelector('#search-recepies').addEventListener('input' , (e) => {
    setFilters({
        searchText: e.target.value
    })
    renderRecepies()
})

// Create Recepie Event Listener 
document.querySelector('#add-recepie').addEventListener('click', (e) => {
    const id = createRecepie()
    location.assign(`./edit.html#${id}`)
})

// Storage event 
window.addEventListener('storage', e => {
    if(e.key === 'recepies') {
        renderRecepies()
    }
})


