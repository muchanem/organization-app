import React, { useEffect, useState, useReducer } from "react"
import Sidebar from "../components/Sidebar"
import inbox_icon from "../../../assets/icons/menu/inbox.svg"
import {taskGet, taskReducer } from "../taskHelpers"
import { TaskMini } from "../components/TaskMini"
const Inbox = () => {
    const [state, dispatch] = useReducer(taskReducer, [])
    const [inboxLoaded, setInboxLoaded] = useState(false)
    useEffect(() => {
            setInboxLoaded(false);
            // IMPORTANT: add back "-PROJECT"
            taskGet("pparent:").then(x => dispatch({type: "init", tasks: JSON.parse(x)})).finally(() => setInboxLoaded(true))
      }, []);


    return (
    <div className="flex flex-row w-screen select-none">
        <Sidebar></Sidebar>
        { inboxLoaded ? (
            <div className="flex flex-grow h-screen flex-col">
                <div className="flex flex-row">
                    <div className="ml-5 mt-5">
                        <h1 className="text-inbox-indigo text-5xl font-extrabold mb-0">Inbox</h1>
                    </div>
                    <div className="absolute right-0 mt-5 mr-5">
                        <img src={inbox_icon}></img>
                    </div>
                </div>
                <div className="h-8 flex flex-row border-b border-neutral-500">
                    <span className="text-neutral-300 ml-6 italic">{state.length} inbox item{state.length > 1 ? "s" : ""}</span>
                </div>
                <div className="pl-8 border-b border-neutral-500 divide-y ml-2 mr-2 flex flex-col justify-start">
                    {
                        state.map((task: object) => <TaskMini task={task} dispatch={dispatch}/>)
                    }
                </div>
            </div>
            ) : (<span>Well, fuck</span>)
        }
    </div>
  )
}

export default Inbox
