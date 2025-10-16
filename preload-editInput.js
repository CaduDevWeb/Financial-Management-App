const {contextBridge, ipcRenderer, ipcMain } = require('electron')

contextBridge.exposeInIsolatedWorld('secundaryApi', {
    ReceivedFromMain: (callback) => {
        ipcRenderer.on('Received',(event,expenseObject)=> callback(expenseObject));
    }
})