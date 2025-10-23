const path = require('path')
const { app, BrowserWindow, ipcMain, Menu, MenuItem, webContents } = require('electron');

const CLEANUP_CHANNEL = 'app:clean-data'
let mainWindow = null;

const createWindow = () => {
    mainWindow = new BrowserWindow({
        width: 920,
        height: 800,
        webPreferences: {
            backgroundColor: '#2c3e50',
            nodeIntegration: false,
            preload: path.join(__dirname, 'preload.js'),
            contextIsolation: true
        }
    })
    mainWindow.loadFile('src/renderer/index.html')
    mainWindow.webContents.openDevTools();
}

ipcMain.on('removeElement', (event) => {
    mainWindow.webContents.send('RemoveChannel', 'pedido de remocao')
    console.log('comando chegou ao main')
})

ipcMain.on('closeSecundaryWindow', (event) => {
    const webContents =event.sender
    const secondWindow = BrowserWindow.fromWebContents(webContents)

    if (secondWindow) {
        secondWindow.close();
    }
})

ipcMain.on('sendInfoChange', (event, newType, newValue) => {
    mainWindow.webContents.send('new-data', newType, newValue)
    console.log(`[Main] Enviando dados: ${newType} e ${newValue}`)
})

ipcMain.on('openingDetails', () => {
    //console.log('ID recebido no Main: ', expenseId);
        openElectronDetailWindow()
})
function openElectronDetailWindow() {
    const editInputWindow = new BrowserWindow({
        width: 480,
        height: 480,
        //title: `Detalhes do Objeto: ${expenseId}`,
        webPreferences: {
            //preload: path.join(__dirname, 'preload.js'),
            preload: path.join(__dirname, 'preload-second.js'),
            contextIsolation: true,
            nodeIntegration: false
        },
    })

    editInputWindow.loadFile('src/renderer/editInputWindow.html')

}

const template = [
    {
        label: 'Arquivo',
        submenu: [
            {
                label: 'Limpar Todas as Despesas',
                click: () => {
                    //sendCleanupMessageToRenderer()
                    mainWindow.webContents.send('CleanupChannel', 'Limpeza Concluida')
                    mainWindow.webContents.reload()
                    console.log('Pedindo limpeza')
                }
            },
            { type: 'separator' },
            { role: 'quit', label: 'Sair' }
        ],
    },
    {
        label: 'Tela',
        submenu: [
            {
                role: 'reload', label: 'Recarregar'},
            {  role: 'toggleDevTools', label: 'DevTools'}
        ]
    }
]

app.whenReady().then(() => {
    const menu = Menu.buildFromTemplate(template)
    Menu.setApplicationMenu(menu)
    createWindow()
})