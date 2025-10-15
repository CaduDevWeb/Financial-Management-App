const {contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('windowDetails', {
    openDetails: (id, expenseObject) => {
        ipcRenderer.send('openingDetails', id, expenseObject);
    }
})

contextBridge.executeInMainWorld('ipc', {
    onCleanupRequest: (callback) =>  ipcRenderer.on('app:clean-data', (event, args) => callback(args))
})

