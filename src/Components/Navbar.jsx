import { useState, useContext } from "react";
import { Link, useNavigate } from 'react-router-dom'
import { DarkContext, UserContext, NotifsContext } from "../App";

import { IoSettingsOutline } from "react-icons/io5";
import { FiUser } from "react-icons/fi";
import { FaRegBell, FaBell } from "react-icons/fa";
import { HiOutlineXMark, HiMiniBars3BottomRight } from "react-icons/hi2";
import { MdOutlineLocalLibrary } from "react-icons/md";

const Navbar = () => {
    const [show, setShow] = useState(null);
    const { darkMode } = useContext(DarkContext)
    const { user, setUser } = useContext(UserContext)
    const { notifications, setNotifications } = useContext(NotifsContext)

    const navigate = useNavigate()

    return (
        <nav className={`flex justify-between px-8 sm:px-4 items-center py-4 bg-slate-50 ${darkMode ? "bg-light" : "bg-bgDarkFooter text-fontDarkMode"}`}>

            <Link to="/">
                <div id="logo" className="flex items-center gap-4" onClick={() => setShow(false)}>
                    <img src="https://www.njtransfer.org/images/logos/2615.png" alt="" width='75' className="rounded sm:w-[60px]" />
                    <div id='logo-name' className="text-[1.5rem] font-bold tracking-widest text-primary italic">SNIPER</div>
                </div>
            </Link>

            <div id="menus" className="flex gap-6 items-center sm:hidden">

                <span className="bg-bgDarkSecondary text-light px-4 py-2 rounded-[30px]">Hello <span className="font-bold">{user.firstName}</span>!</span>
                <Link to='/manager'>
                    <div id="menu-item" className="text-[1.5rem] transition hover:translate-y-[-3px]">
                        <MdOutlineLocalLibrary />
                    </div>
                </Link>

                <Link to='/settings'>
                    <div id="menu-item" className="text-[1.5rem] transition hover:translate-y-[-3px]">
                        <IoSettingsOutline className="hover:rotate-45" />
                    </div>
                </Link>

                <Link to='/notifications'>
                    <div id="menu-item" className=" relative text-[1.5rem] transition hover:translate-y-[-3px]">
                        <FaRegBell />
                        {notifications.length > 0 && <div className="w-[15px] h-[15px] rounded-full absolute top-[-5px] right-[-3px] bg-[#ff0000] text-xs text-[#fff] flex justify-center items-center">{notifications.length}</div>}
                    </div>
                </Link>

                <Link to='/profile'>
                    <div id="menu-item" className="text-[1.5rem] transition hover:translate-y-[-3px]">
                        <FiUser />
                    </div>
                </Link>

            </div>

            <div className="hidden sm:flex gap-6 items-center">

                <Link to='/notifications'>
                    <div id="menu-item" className=" relative text-[1.5rem] transition hover:translate-y-[-3px]">
                        <FaRegBell />
                        {notifications.length > 0 && <div className="w-[15px] h-[15px] rounded-full absolute top-[-5px] right-[-3px] bg-[#ff0000] text-xs text-[#fff] flex justify-center items-center">{notifications.length}</div>}
                    </div>
                </Link>
                <button className='text-[1.5rem]' onClick={() => setShow(true)}><HiMiniBars3BottomRight /></button>
            </div>


            <div id="menus" className={`${show ? 'slide-in' : 'slide-out'} hidden flex-col h-screen w-[300px] ${darkMode ? "bg-light [&>.link]:bg-gray" : "bg-bgDarkFooter text-fontDarkMode [&>.link]:bg-bgGrayBtn"} gap-4 sm:flex fixed top-0 p-8 `}>

                <div className="flex justify-between items-center">
                    <button onClick={() => setShow(false)} className="text-[2rem]"><HiOutlineXMark /></button>
                    <h2 className="text-[2rem] font-bold text-bgDarkSecondary">Options</h2>
                </div>

                <Link to='/profile' className="link rounded">
                    <div id="menu-item" className="flex gap-4 items-center py-2 px-4 rounded" onClick={() => setShow(false)}>
                        <FiUser />
                        <div>Profile</div>
                    </div>
                </Link>

                <Link to='/manager' className="link rounded">
                    <div id="menu-item" className="flex gap-4 items-center py-2 px-4 rounded" onClick={() => setShow(false)}>
                        <MdOutlineLocalLibrary />
                        <div>Your Snipes</div>
                    </div>
                </Link>

                <Link to='/settings' className="link rounded">
                    <div id="menu-item" className="flex gap-4 items-center py-2 px-4 rounded" onClick={() => setShow(false)}>
                        <IoSettingsOutline />
                        <div>Settings</div>
                    </div>
                </Link>

                {/* <Link>
                    <div id="menu-item" className="bg-green py-1 px-2 rounded text-center" onClick={() => setShow(false)}>                    
                        <button className="bg-green text-light px-4 py-2 rounded" onClick={handleLogout} disabled>Log Out</button>
                    </div>
                </Link> */}

            </div>

        </nav>
    )
}

export default Navbar