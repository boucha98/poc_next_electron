declare global {
    interface Window {
        deltasDbAccess? : any,
        ipcRenderer?: any
    }
}

export interface DeltaFront {
    id: number,
    text: string
}

export const getAllDeltas = async (window?: Window): Promise<DeltaFront[]> => {
    let res = []
    try {
        const allRaw =  await window?.deltasDbAccess?.getAll();
        res = allRaw?.map(elem => ({id: elem._id, text: elem.Text}));
    } catch (e) {
        console.error(e)
    }
        
    return res;
}

export const insertOneDelta = async (window?: Window, text?: string): Promise<void> => {
    if (typeof text !== 'string') return

    try {
        await window?.deltasDbAccess?.insertOne(text);
    } catch (e) {
        console.error(e)
    }
}
 