const path = require('path')
const {app, BrowserWindow, ipcMain, Menu} = require ('electron')

const CLEANUP_CHANNEL = 'app:clean-data'
let mainWindow = null;

const createWindow = () => {
    mainWindow = new BrowserWindow({
        width: 920,
        height:800,
        webPreferences: {
            backgroundColor: '#2c3e50',
            nodeIntegration: false,
            preload: './preload.js',
            contextIsolation: true
        }
    })
    mainWindow.loadFile('src/renderer/index.html')
    mainWindow.webContents.openDevTools();
}

function sendCleanupMessageToRenderer() {
    if(mainWindow) {
        mainWindow.webContents.send(CLEANUP_CHANNEL, 'clean now')
        console.log('Main: Comando para limpeza enviado ao renderizador')
    }
}
ipcMain.on('openingDetails',(event,expenseId, expenseObject) =>{
    console.log('ID recebido no Main: ', expenseId);
    if(expenseObject) {
        console.log('Objeto enviado a segunda tela')
    }
    openElectronDetailWindow(expenseId, expenseObject)
})
function openElectronDetailWindow(expenseId, expenseObject) {
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

    editInputWindow.loadFile('src/renderer/editInputWindow.html')
    

    
}

const template = [
    {
        label: 'Arquivo',
        submenu: [
            {
                label: 'Limpar Todas as Despesas',
                click: () => {
                    sendCleanupMessageToRenderer()
                }
            },
            { type: 'separator'},
            { role: 'quit', label: 'Sair'}
        ]
    }
]

app.whenReady().then(() => {
    const menu = Menu.buildFromTemplate(template)
    //Menu.setApplicationMenu(menu)
    createWindow()
})