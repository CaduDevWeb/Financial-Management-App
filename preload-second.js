const {contextBridge, ipcRenderer, ipcMain } = require('electron')

contextBridge.exposeInMainWorld('windowSecundary', {
    Sended: (newType,newValue) => {
        ipcRenderer.send('sendInfoChange', newType,newValue);
    },

    closeWindow: () => {
        ipcRenderer.send('closeSecundaryWindow')
    }
})