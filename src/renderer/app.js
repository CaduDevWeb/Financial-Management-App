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
    spanValue.textContent = `R$ ${expense.value.replace('.',',')}`
    const spanType = document.createElement('span')
    spanType.textContent = expense.type

    newLink.addEventListener('click', handleExpenseClick)
    
    //agora colocar em hierarquia
    expenseLog.appendChild(newLi)
    newLi.appendChild(newLink)
    newLink.appendChild(spanValue)
    newLink.appendChild(spanType)
    return
}
//Funcao para que vai receber os dados modificados e atualizar a expense
function handleExpenseClick(event) {
    event.preventDefault();
    window.windowDetails.openDetails()
    const arrayExpense = getExpenses()

    const expenseId = event.currentTarget.getAttribute('href').replace('#details/','')
    const expenseObject = arrayExpense.find(item => item.id === expenseId)
    console.log(expenseObject)

    if (expenseObject) {
        console.log('objeto encontrado')
        window.sendData.onNewData((newRecivedType, newRecivedValue) => {
            expenseObject.value = newRecivedValue
            expenseObject.type = newRecivedType
            console.log(`Objeto alterado para: ${expenseObject.value} == ${newRecivedValue} /// ${expenseObject.type} === ${newRecivedType}`)
            //console.log(arrayExpense)
            saveExpenses(arrayExpense)
            updateLogExpense(arrayExpense)
        })
    }
}
//Funcao de Limpar O Storage
function clearAllExpenses() {
    const STORAGE_KEY = 'allExpenses'
    localStorage.removeItem(STORAGE_KEY)
    return
}

//Funcao para dar update no log de gastos
function updateLogExpense(arrayExpense) {
    expenseLog.innerHTML= ''
    console.log('limpeza do Log de gastos concluida')
    arrayExpense.forEach(expense => {
        addLog(expense)
    });
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
// Escuta a chamada do main para limpar o localstorage
window.CleanupChannel.onCleanup((message) => {
    clearAllExpenses()
    console.log(message)
})