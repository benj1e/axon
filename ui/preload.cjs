const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('axon', {
  hide: () => ipcRenderer.send('hide-window'),
  resize: (height) => ipcRenderer.send('resize-panel', height),
})