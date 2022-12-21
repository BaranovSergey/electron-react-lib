const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electronAPI', {
    parseFile: () => ipcRenderer.invoke('parseFile'),
    openFile: () => ipcRenderer.invoke('openFile'),
    loadCover: (src) => ipcRenderer.invoke('loadCover', src)
})
window.addEventListener('DOMContentLoaded', () => {
    const replaceText = (selector, text) => {
        const element = document.getElementById(selector)
        if (element) element.innerText = text
    }

    for (const dependency of ['chrome', 'node', 'electron']) {
        replaceText(`${dependency}-version`, process.versions[dependency])
    }
})
