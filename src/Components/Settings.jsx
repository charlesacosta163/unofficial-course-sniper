import { sectionWidth, showBorder, headerText } from "../styles"
import { FaToggleOff, FaToggleOn } from "react-icons/fa6";

import { useContext } from "react";
import { DarkContext } from "../App";

const Settings = ({setDarkMode}) => {
    const {darkMode} = useContext(DarkContext)

  return (
    <section id="settings-section" className={`h-auto md:h-auto flex justify-center items-center ${sectionWidth}`}>
    
        <div id="settings" className={`max-w-[800px] w-full p-8 flex flex-col gap-4 ${darkMode ? "bg-light" : "bg-bgDarkSecondary text-fontDarkMode [&>#setting]:bg-bgDarkSecondary [&>#setting>div>p]:text-fontDarkMode"} rounded`}>

            <h1 className={`${headerText}`}>Settings</h1>

            <div id="setting" className="flex justify-between py-2 px-4 bg-light rounded items-center">
            <div className="flex flex-col gap-0">
                    <span>Dark Mode</span>
                <p className="text-xs text-[rgba(0,0,0,.4)]">Toggle to dark mode</p>
                </div>                
            <button onClick = {setDarkMode} className="text-[2rem]">{darkMode ? <FaToggleOff/> : <FaToggleOn/>}</button>
            </div>

            <div id="setting" className="flex justify-between py-2 px-4 bg-light rounded items-center">
                <div className="flex flex-col gap-0">
                    <span>Notifications</span>
                <p className="text-xs text-[rgba(0,0,0,.4)]">Turn off notifications</p>
                </div>
                <button className="text-[2rem]"><FaToggleOff/></button>
            </div>

        </div>
    </section>
  )
}

export default Settings