const {contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electronAPI', {
    openDetailWindow: (expenseData) => ipcRenderer.send('o')
})

// Fazer um preload e toda a conexao para a segunda tela atraves do ipcRenderer