const inputValue = document.getElementById('expense-value')
const inputType = document.getElementById('expense-category')
const elementForm = document.getElementById('expense-form')
const removeButton = document.getElementById('remove-expense-btn')
elementForm.addEventListener('submit', function(event) {
    formElement = event.target;
    const newValue = formElement.elements['expense-value'].value
    const newType = formElement.elements['expense-category'].value

    window.windowSecundary.Sended(newType,newValue)
    window.windowSecundary.closeWindow()
})

removeButton.addEventListener('click', function (event) {
    window.windowSecundary.remove()
    window.windowSecundary.closeWindow()
})