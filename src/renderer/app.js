//Pegar os elemento HTML
const inputValor = document.getElementById('expense-value')
const inputCategoryExpense = document.getElementById('expense-category')
const addExpenseBtn = document.getElementById('add-expense-btn')
const elementForm = document.getElementById('expense-form')
const expenseLog = document.getElementById('list-expense')
// Chave do localStorage
const STORAGE_KEY = 'allExpenses'

//funções

function getExpenses() {
    const dataSavedJSON = localStorage.getItem(STORAGE_KEY)
    return dataSavedJSON ? JSON.parse(dataSavedJSON) : [];
}

function saveExpenses(expenseArray) {
    const dataJSON = JSON.stringify(expenseArray);
    localStorage.setItem(STORAGE_KEY, dataJSON);
}

function addLog(expense) {
    // criando o elemento da lista
    const newLi = document.createElement('li');
    newLi.classList.add('li-expense')
    const newLink = document.createElement('a')
    newLink.classList.add('expense-link')
    newLink.href = `#details/${expense.id}`
    const spanValue = document.createElement('span')
    spanValue.textContent = `R$ ${expense.value}`
    const spanType = document.createElement('span')
    spanType.textContent = expense.type

    newLink.addEventListener('click', handleExpenseClick)
    
    //agora colocar em hierarquia
    expenseLog.appendChild(newLi)
    newLi.appendChild(newLink)
    newLink.appendChild(spanValue)
    newLink.appendChild(spanType)
}

function handleExpenseClick(event) {
    event.preventDefault();

    const expenseId = event.currentTarget.getAttribute('href').replace('#details/','')

    if (expenseId) {
        window.windowDetails.openDetails(expenseId)
    }

}
//Evento de click
elementForm.addEventListener('submit',function(event) {
    event.preventDefault()
    
    const formElement = event.target;
    
    const newId = Date.now().toString() + Math.floor(Math.random() * 1000)

    const newExpense = {
        id: newId,
        value: formElement.elements['expense-value'].value,
        type: formElement.elements['expense-category'].value
    };
    console.log(`registrado objeto: ${this.id}`)
    const currentExpenses = getExpenses()
    currentExpenses.push(newExpense);

    saveExpenses(currentExpenses);

    addLog(newExpense);
    formElement.reset();
})

