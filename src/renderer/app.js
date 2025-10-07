//Pegar os elemento HTML
const inputValor = document.getElementById('expense-value')
const inputCategoryExpense = document.getElementById('expense-category')
const addExpenseBtn = document.getElementById('add-expense-btn')
const elementForm = document.getElementById('expense-form')
const expenseLog = document.getElementById('list-expense')

//funções
function addLog() {
    const dataSavedJSON = localStorage.getItem('DataUsers')

    if (!dataSavedJSON) {
        console.log("nenhum dado encontrado no localStorage")
        return
    }

    //Converter de volta a objeto
    const objectDataReconvert = JSON.parse(dataSavedJSON)

    // criando o elemento da lista
    const newLi = document.createElement('li');
    newLi.classList.add('li-expense')
    const newLink = document.createElement('a')
    newLink.classList.add('expense-link')
    const spanValue = document.createElement('span')
    spanValue.textContent = `R$ ${objectDataReconvert.value}`
    const spanType = document.createElement('span')
    spanType.textContent = objectDataReconvert.type
    
    //agora colocar em hierarquia
    expenseLog.appendChild(newLi)
    newLi.appendChild(newLink)
    newLink.appendChild(spanValue)
    newLink.appendChild(spanType)
}

//Evento de click
elementForm.addEventListener('submit',function(event) {
    event.preventDefault()
    
    const formElement = event.target;
    
    const objectData = {
        value: formElement.elements['expense-value'].value,
        type:  formElement.elements['expense-category'].value
    };
    
    //Converter o objeto em json
    
    const dataJSON = JSON.stringify(objectData);
    
    //Salvar no localStorage
    
    localStorage.setItem('DataUsers', dataJSON);
    
    console.log('Dados salvos')
    console.log(dataJSON)

    addLog();
})

