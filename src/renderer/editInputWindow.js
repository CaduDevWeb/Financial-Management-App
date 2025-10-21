const oldValue = document.getElementById('oldValue')
const oldType = document.getElementById('oldType')
const inputValue = document.getElementById('expense-value')
const inputType = document.getElementById('expense-category')
const elementForm = document.getElementById('expense-form')

elementForm.addEventListener('submit', function(event) {
    formElement = event.target;
    const newValue = formElement.elements['expense-value'].value
    const newType = formElement.elements['expense-category'].value

    window.windowSecundary.Sended(newType,newValue)
    window.windowSecundary.closeWindow()
})