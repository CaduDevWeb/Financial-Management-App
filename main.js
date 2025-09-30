const {app, BrowserWindow} = require ('electron')
const createWindow = () => {
    const mainWindow = new BrowserWindow({
        width: 1200,
        height:800,
        autoHideMenuBar: false,
        webPreferences: {
            backgroundColor: '#2c3e50',
            nodeIntegration: false,
            contextIsolation: true
        }
    })
    mainWindow.loadFile('src/renderer/index.html')
    mainWindow.webContents.openDevTools();
}

app.whenReady().then(() => {
    createWindow()
})