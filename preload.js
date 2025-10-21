const {contextBridge, ipcRenderer, ipcMain } = require('electron')

contextBridge.exposeInMainWorld('windowDetails', {
    openDetails: () => {
        ipcRenderer.send('openingDetails');
        console.log('[Preload.js]: O canal "openDetails" foi configurado no preload.');
    }
})

contextBridge.exposeInMainWorld('CleanupChannel', {
    // Exponha um método que o renderer pode chamar para configurar o callback
    onCleanup: (callback) => {
        // Usa `ipcRenderer.on` para escutar o evento do processo principal
        ipcRenderer.on('CleanupChannel', (event, args) => callback(args));
        console.log('[Preload.js]: O ouvinte do canal "CleanupChannel" foi configurado no preload.');
    }
});

contextBridge.exposeInMainWorld('sendData', {
    onNewData: (callback) => {
        ipcRenderer.once('new-data', (event, newType, newValue) => {
            callback(newType,newValue)
            console.log('[Preload.js]: O canal "onNewData" foi configurado no preload.')
        })
    }
})

