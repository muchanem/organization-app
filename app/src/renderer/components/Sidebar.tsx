import React from "react"
import {useState } from "react"
import inbox_icon from "../../../assets/icons/menu/inbox.svg"
import projects_icon from "../../../assets/icons/menu/projects.svg"
import tags_icon from "../../../assets/icons/menu/tags.svg"
import forecast_icon from "../../../assets/icons/menu/forecast.svg"
import now_icon from "../../../assets/icons/menu/now.svg"

const Sidebar = () => {
    const [page, setPage] = useState("")
    let inboxClass = page === "inbox" ?
        "h-16 flex flex-row justify-center border-l-4 border-inbox-indigo hover:backdrop-invert hover:backdrop-opacity-10 hover:bg-white/30" :
        "h-16 flex flex-row justify-center hover:backdrop-invert hover:backdrop-opacity-10 hover:bg-white/30";
    let projectClass = page === "projects" ?
        "h-16 flex flex-row justify-center border-l-4 border-projects-blue hover:backdrop-invert hover:backdrop-opacity-10 hover:bg-white/30" :
        "h-16 flex flex-row justify-center hover:backdrop-invert hover:backdrop-opacity-10 hover:bg-white/30";
    let tagClass = page === "tags" ?
        "h-16 flex flex-row justify-center border-l-4 border-tags-purple hover:backdrop-invert hover:backdrop-opacity-10 hover:bg-white/30" :
        "h-16 flex flex-row justify-center hover:backdrop-invert hover:backdrop-opacity-10 hover:bg-white/30";
    let forecastClass = page === "forecast" ?
        "h-16 flex flex-row justify-center border-l-4 border-forecast-red hover:backdrop-invert hover:backdrop-opacity-10 hover:bg-white/30" :
        "h-16 flex flex-row justify-center hover:backdrop-invert hover:backdrop-opacity-10 hover:bg-white/30";
    let nowClass = page === "now" ?
        "h-16 flex flex-row justify-center border-l-4 border-now-teal hover:backdrop-invert hover:backdrop-opacity-10 hover:bg-white/30" :
        "h-16 flex flex-row justify-center hover:backdrop-invert hover:backdrop-opacity-10 hover:bg-white/30";


    return (
    <div className="w-24 bg-neutral-800">
        <div className={inboxClass} onClick={() => setPage("inbox")}>

            <figure className="mt-2.5 mr-1">
                <img src={inbox_icon} width="45" className="select-none"></img>
                <figcaption className="text-white text-sm text-center select-none ">Inbox</figcaption>
            </figure>
        </div>
        <div className={projectClass} onClick={() => setPage("projects")}>

            <figure className="mt-2.5 mr-1">
                <img src={projects_icon} height="50" className="select-none mx-auto mb-0.5"></img>
                <figcaption className="text-white text-sm text-center select-none ml-1">Projects</figcaption>
            </figure>
        </div>
        <div className={tagClass} onClick={() => setPage("tags")}>

            <figure className="mt-2.5 mr-1">
                <img src={tags_icon} width="45" className="select-none"></img>
                <figcaption className="text-white text-sm text-center select-none ">Tags</figcaption>
            </figure>
        </div>
        <div className={forecastClass} onClick={() => setPage("forecast")}>

            <figure className="mt-2.5 mr-1">
                <img src={forecast_icon} height="50" className="select-none mx-auto"></img>
                <figcaption className="text-white text-sm text-center select-none ">Forecast</figcaption>
            </figure>
        </div>
        <div className={nowClass} onClick={() => setPage("now")}>

            <figure className="mt-2.5 mr-1">
                <img src={now_icon} height="50" className="select-none mx-auto"></img>
                <figcaption className="text-white text-sm text-center select-none ">Now</figcaption>
            </figure>
        </div>

    </div>
    )
}

export default Sidebar
