const path = require('electron')
const {app, BrowserWindow} = require ('electron')
const createWindow = () => {
    const mainWindow = new BrowserWindow({
        width: 920,
        height:800,
        autoHideMenuBar: false,
        webPreferences: {
            backgroundColor: '#2c3e50',
            nodeIntegration: true,
            contextIsolation: true
        }
    })
    mainWindow.loadFile('src/renderer/index.html')
    editInputWindow.loadFile('src/renderer/editInputWindow.html')
    //mainWindow.webContents.openDevTools();
}

function openElectronDetailWindow(expenseId) {
    const editInputWindow = new BrowserWindow({
        width: 450,
        height: 450,
        autoHideMenuBar:false
    })


}
app.whenReady().then(() => {
    createWindow()
})