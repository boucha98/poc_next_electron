/* eslint-disable @typescript-eslint/no-namespace */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { ipcRenderer, IpcRenderer, contextBridge } from 'electron'

import deltasDbAccess from "./sqlite-db/tables/deltas";

declare global {
  namespace NodeJS {
    interface Global {
      ipcRenderer: IpcRenderer
    }
  }
}

// Since we disabled nodeIntegration we can reintroduce
// needed node functionality here
process.once('loaded', () => {
  global.ipcRenderer = ipcRenderer
})

contextBridge.exposeInMainWorld('deltasDbAccess', {
  ...deltasDbAccess
})

contextBridge.exposeInMainWorld('ipcRenderer', {
  ...ipcRenderer,
  addListener: (event: string | symbol, listener: (...args: any[]) => void) => ipcRenderer.addListener(event, listener)
})
