const path = require('path')
const { app, BrowserWindow, ipcMain, Menu, MenuItem, webContents } = require('electron');
const { WebContentsView } = require('electron/main');
const { url } = require('inspector');
const { dirname } = require('path/posix');

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

ipcMain.on('openingDetails', (event, expenseObject) => {
    //console.log('ID recebido no Main: ', expenseId);
    if (expenseObject != undefined) {
        console.log(`objeto: ${expenseObject} enviado a segunda tela`)
        openElectronDetailWindow(expenseObject)
    }else {
        console.log('objeto indefinido')
    }
})
function openElectronDetailWindow(expenseObject) {
    const editInputWindow = new BrowserWindow({
        width: 450,
        height: 450,
        //title: `Detalhes do Objeto: ${expenseId}`,
        webPreferences: {
            //preload: path.join(__dirname, 'preload.js'),
            preload: path.join(__dirname, 'preload-second.js'),
            contextIsolation: true,
            nodeIntegration: false
        },
    })

    editInputWindow.loadFile('src/renderer/editInputWindow.html')

    ipcMain.on('SendToSecondView', (event,expenseObject)=> {
        editInputWindow.webContents.send('ReceivedFromMain', expenseObject)
    })
}

function sendCleanupMessageToRenderer() {
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