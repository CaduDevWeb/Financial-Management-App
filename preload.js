const {contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('windowDetails', {
    openDetails: (id) => {
        ipcRenderer.send('openingDetails', id);
    }
})

// COntinuar fazer a conexao, arrumar o erro que a segunda pagina nao esta pegando o html e bolar um jeito de carregegar as informacoes na segunda tela