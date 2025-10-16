const oldValue = document.getElementById('oldValue')
const oldType = document.getElementById('oldType')
window.ecundaryApi.ReceivedFromMain((expenseObject) => {
    console.log('Informacao recebida')
    oldValue.textContent = expenseObject.value
    oldType.textContent = expenseObject.type
} )
