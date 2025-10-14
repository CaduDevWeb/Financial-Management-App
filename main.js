const path = require('path')
const {app, BrowserWindow, ipcMain} = require ('electron')
const createWindow = () => {
    const mainWindow = new BrowserWindow({
        width: 920,
        height:800,
        autoHideMenuBar: false,
        webPreferences: {
            backgroundColor: '#2c3e50',
            nodeIntegration: true,
            preload: path.join(__dirname, 'preload.js'),
            contextIsolation: true
        }
    })
    mainWindow.loadFile('src/renderer/index.html')
    //mainWindow.webContents.openDevTools();
}
ipcMain.on('openingDetails',(event, expenseId) =>{
    console.log('ID recebido no Main: ', expenseId);
    openElectronDetailWindow(expenseId)
})
function openElectronDetailWindow(expenseId) {
    const editInputWindow = new BrowserWindow({
        width: 450,
        height: 450,
        title: `Detalhes do Objeto: ${expenseId}`,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'), 
            contextIsolation: true,
            nodeIntegration: false
        },
    })


}
app.whenReady().then(() => {
    createWindow()
})