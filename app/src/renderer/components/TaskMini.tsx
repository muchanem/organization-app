import React,{useEffect, useState} from "react"
import colors from "tailwindcss/colors"
import dayjs from "dayjs"
import AdvancedFormat from "dayjs/plugin/advancedFormat"
import Timezone from "dayjs/plugin/timezone"
import CustomParseFormat from "dayjs/plugin/customParseFormat"
import IsToday from "dayjs/plugin/isToday"
import IsSameOrBefore from "dayjs/plugin/isSameOrBefore"
import UTC from "dayjs/plugin/utc"

dayjs.extend(Timezone)
dayjs.extend(AdvancedFormat)
dayjs.extend(CustomParseFormat)
dayjs.extend(IsToday)
dayjs.extend(IsSameOrBefore)
dayjs.extend(UTC)
dayjs.tz.setDefault(dayjs.tz.guess())

export const TaskMini = ({task, dispatch}: any) => {
    let [hover, setHover] = useState(false)
    let [description, showDescription] = useState(false)
    let [dueStatus, setDueStatus] = useState("normal")

    // TODO: set type to fixed length array
    const createDispatch = (update: Array<string>) => {
        switch (update[0]) {
            case "flagged":
                dispatch({
                    type: "flag",
                    id: task.uuid,
                    task: {
                        ...task,
                        flagged: update[1]
                    }
                })
        }
    }
    return(

        <div
            className="max-h-16 border-neutral-500 flex flex-row"
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}>
            <MainButton flagged={task.flagged} dueState={dueStatus}/>
            <div className="flex-grow flex flex-col ml-3 mt-0.5">
                <div className="h-5 flex flex-row">
                    <div className="flex-grow flex flex-row justify-start">
                        <span className="text-neutral-100">{task.description}</span>
                    </div>
                    <div className="flex-grow flex flex-row justify-center">
                        {
                            task.project ?
                                <span className="text-neutral-300 text-sm">{task.project}</span> :
                                <span className={`text-neutral-300 hover:text-neutral-200 text-sm ${hover ? "" : "invisible"}`}>Project</span>
                        }
                    </div>
                    <div className="flex-grow flex flex-row justify-center">
                        {
                            task.tags ?
                                <TagPills tags={task.tags} hover={hover}/> :
                                <span className={`text-neutral-300 hover:text-neutral-200 text-sm ${hover ? "" : "invisible"}`}>Tags</span>
                        }
                    </div>
                    <div className="flex-grow flex flex-row justify-end">
                        <div>
                            {
                                task.due ?
                                    <DuePill dueDate={task.due} dueStatus={dueStatus} setDueStatus={setDueStatus}/> :
                                    <span className={`text-neutral-300 hover:text-neutral-200 text-sm ${hover ? "" : "invisible"}`}>Due</span>
                            }
                        </div>
                        <div className="ml-1.5 my-auto">
                            <Description annotations={task.annotation} onClick={() => showDescription(true)}/>
                        </div>
                        <div className="ml-1.5 my-auto">
                            <Flag flagged={task.flagged} flag={createDispatch}/>
                        </div>
                    </div>

                </div>
                <div className="flex-grow"></div>
            </div>
        </div>
    )
}

const TagPills = ({tags, hover}: any) => {
    return(
        <>
        {
            tags.map((tag: string) =>
                {if (tag.split(":")[0] === "context") {
                    {return <button className="rounded-full bg-slate-600 text-neutral-100 px-2 mx-1 my-auto text-sm mt-0.5">{tag.split(":").slice(1).join()}</button>}
                } else {
                    {return <button className="rounded-full bg-neutral-600 text-neutral-100 px-2 mx-1 my-auto text-sm mt-0.5">{tag}</button>}
                }}

            )
        }

        <button
            className={`rounded-full border-2 border-neutral-400 hover:border-neutral-300 hover:text-neutral-300 text-neutral-400 px-2 mx-1 my-auto text-sm ${hover ? "" : "invisible"}`}>
        +</button>


        </>
    )

}

import flagged_icon from "../../../assets/icons/flagged.svg"
import flagged_hover from "../../../assets/icons/flagged_hover.svg"
import unflagged from "../../../assets/icons/unflagged.svg"
import unflagged_hover from "../../../assets/icons/unflagged_hover.svg"
import { contextIsolated } from "process"

const Flag = ({flagged, flag}: any) => {

    let [hover, setHover] = useState(false)
    return(
        flagged ?
            <div onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)} onClick={() => flag(["flagged", ""])}>
                <img src={hover ? flagged_hover : flagged_icon} width="12"></img>
            </div> :
            <div onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)} onClick={() => flag(["flagged", "true"])}>
                <img src={hover ? unflagged_hover : unflagged} width="12"></img>
            </div>

    )

}

const Description = ({annotations}: any) => {
    let [color, setColor] = useState(annotations ? "#737373":"#d4d4d4")
    return(
        annotations ?
            <svg viewBox="367 305 20 20" width="12" height="12"
                onMouseEnter={() => setColor("#d4d4d4")}
                onMouseLeave={() => setColor("#737373")}
            >
            <g id="Note-On" fill-opacity="1" stroke="none" stroke-dasharray="none" fill="none" stroke-opacity="1">
                <title>Note-On</title>
                <g id="Note-On: Layer 1">
                    <title>Layer 1</title>
                    <g id="Graphic_3">
                        <path d="M 367 305 L 367 325 L 387 325 L 387 305 Z M 371 309 L 383 309 L 383 311 L 371 311 Z M 371 313 L 383 313 L 383 315 L 371 315 Z M 371 317 L 383 317 L 383 319 L 371 319 Z" fill={color}/>
                    </g>
                </g>
            </g>
            </svg> :
            <svg viewBox="367 305 20 20" width="15" height="15"
                onMouseEnter={() => setColor("#f5f5f5")}
                onMouseLeave={() => setColor("#d4d4d4")}
            >
                <defs>
                    <clipPath id="inner_stroke_clip_path">
                        <path d="M 367 305 L 387 305 L 387 325 L 367 325 Z"/>
                    </clipPath>
                </defs>
                <g id="Note-Off" fill-opacity="1" stroke="none" stroke-dasharray="none" fill="none" stroke-opacity="1">
                    <title>Note-Off</title>
                    <g id="Note-Off: Layer 1">
                        <title>Layer 1</title>
                        <g id="Graphic_7">
                            <rect x="367" y="305" width="20" height="20" stroke={color} stroke-linecap="round" stroke-linejoin="miter" stroke-width="4" clip-path="url(#inner_stroke_clip_path)"/>
                        </g>
                        <g id="Graphic_6">
                            <rect x="371" y="309" width="12" height="2" fill={color}/>
                        </g>
                        <g id="Graphic_5">
                            <rect x="371" y="313" width="12" height="2" fill={color}/>
                        </g>
                        <g id="Graphic_4">
                            <rect x="371" y="317" width="12" height="2" fill={color}/>
                        </g>
                    </g>
                </g>
            </svg>

    )
}

import bt_default from "../../../assets/button/bt_default.svg"
import bt_today from "../../../assets/button/bt_today.svg"
import bt_overdue from "../../../assets/button/bt_overdue.svg"
import bt_flagged_today from "../../../assets/button/bt_flagged_today.svg"
import bt_flagged_overdue from "../../../assets/button/bt_flagged_overdue.svg"
import bt_flagged from "../../../assets/button/bt_flagged.svg"

const MainButton = ({flagged, dueState}: any) => {
    switch ([flagged, dueState].join("")) {

        case "trueyear":
        case "truenormal":
            return(
            <div className="w-10 h-8 flex justify-end content-start hover:brightness-75">
                <img src={bt_flagged} className="ml-3.5 my-auto" width="25"></img>
            </div>)
       case "trueoverdue":
            return(
            <div className="w-10 h-8 flex justify-end content-start hover:brightness-75">
                <img src={bt_flagged_overdue} className="ml-3.5 my-auto" width="25"></img>
            </div>)
       case "truetoday":
            return(
            <div className="w-10 h-8 flex justify-end content-start hover:brightness-75">
                <img src={bt_flagged_today} className="ml-3.5 my-auto" width="25"></img>
            </div>)
        case "overdue":
            return(
            <div className="w-10 h-8 flex justify-end content-start hover:brightness-75">
                <img src={bt_overdue} className="ml-3.5 my-auto" width="25"></img>
            </div>)

        case "today":
            return(
            <div className="w-10 h-8 flex justify-end content-start hover:brightness-75">
                <img src={bt_today} className="ml-3.5 my-auto" width="25"></img>
            </div>)
        default:
            return(
            <div className="w-10 h-8 flex justify-end content-start hover:brightness-75">
                <img src={bt_default} className="ml-3.5 my-auto" width="25"></img>
            </div>)

    }

}

const DuePill = ({dueDate, dueStatus, setDueStatus}: any) => {
    const format = "YYYYMMDDTHHmmss"
    let [focused, setFocus] = useState(false)

    let dueDDate = dayjs.tz(dueDate,format,"UTC").tz(dayjs.tz.guess())
    if (dueDDate.isSameOrBefore(dayjs())) {
        setDueStatus("overdue")
    } else {
        if (dueDDate.isToday()) {
            setDueStatus("today")
        } else {
            if (dayjs().isSame(dueDDate, "year")) {
                setDueStatus("year")
            } else {
                setDueStatus("normal")
            }
        }
    }

    switch (dueStatus) {
        case "overdue":
            return (
                <button className="w-20 rounded-lg bg-neutral-600 text-forecast-red pr-1 text-sm font-bold text-right">{dueDDate.format("MM/DD/YY")}</button>
            )
        case "today":
            return (
                <button className="w-20 rounded-lg bg-neutral-600 text-today-yellow pr-1 text-sm font-bold text-right">{dueDDate.format("hh:mm A")}</button>
            )
        case "year":
            return (
                <button className="w-20 rounded-lg text-neutral-400 pr-1 text-sm font-bold text-right">{dueDDate.format("MM/DD")}</button>
            )
        default:
            return (
                <button className="w-20 rounded-lg text-neutral-400 pr-1 text-sm font-bold text-right">{dueDDate.format("MM/DD/YY")}</button>
            )

    }
}
