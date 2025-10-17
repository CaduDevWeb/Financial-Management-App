const {contextBridge, ipcRenderer, ipcMain } = require('electron')

contextBridge.exposeInIsolatedWorld('secundaryApi', {
    Received: (callback) => {
        ipcRenderer.on('ReceivedFromMain',(event,expenseObject)=> callback(expenseObject));
    }
})
console.log('preload-second.js carregado!');
