const {contextBridge, ipcRenderer, ipcMain } = require('electron')

contextBridge.exposeInMainWorld('windowDetails', {
    openDetails: (id, expenseObject) => {
        ipcRenderer.send('openingDetails', id, expenseObject);
    }
})

contextBridge.exposeInMainWorld('CleanupChannel', {
    // Exponha um método que o renderer pode chamar para configurar o callback
    onCleanup: (callback) => {
        // Usa `ipcRenderer.on` para escutar o evento do processo principal
        ipcRenderer.on('CleanupChannel', (event, args) => callback(args));
        console.log('O ouvinte do canal "CleanupChannel" foi configurado no preload.');
    }
});

// Resolver os erros da segunda tela(o erro estava no codigo em si do preload da segunda tela)
// fazer a segunda tela ja carregar com as informacoes da expense clicada