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
    //mainWindow.webContents.openDevTools();
}

app.whenReady().then(() => {
    createWindow()
})