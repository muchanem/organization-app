export const taskGet = async (filter?: string): Promise<string> => {
    if (typeof filter !== "undefined") {
        return window.electron.ipcRenderer.invoke("task:export", filter)
    }
    return window.electron.ipcRenderer.invoke("task:export", "")
}

const taskSend = async (update: string): Promise<string> => {
    return window.electron.ipcRenderer.invoke("task:import", update)
}


export const taskReducer = (state: any, action: any) => {
    switch (action.type) {
        case "init": {
            return action.tasks
        }
        case "flag": {
            return state.map((t: any) => {
                if (t.uuid === action.id) {
                    taskSend(`[${JSON.stringify(action.task)}]`)
                    return action.task
                } else {
                    return t
                }
            })
        }
    }
}
