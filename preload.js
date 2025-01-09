const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electron", {
  getClipboardText: () => ipcRenderer.invoke("get-clipboard-text"),
});
