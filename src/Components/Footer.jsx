import React from 'react'
import { sectionWidth, showBorder, buttonStyled, formStyled, headerText } from "../styles"
import { Link } from "react-router-dom"
import { DarkContext } from '../App'
import { useContext } from 'react'

import { RiDiscordLine } from "react-icons/ri";
import { FaInstagram, FaXTwitter, FaLinkedinIn } from "react-icons/fa6";
import { FaFacebookF } from "react-icons/fa";

const Footer = () => {
    const { darkMode } = useContext(DarkContext)
    return (
        <footer className={`${sectionWidth} rounded-[20px] px-[4rem] md:px-8 mt-8 ${darkMode == false ? "bg-bgDarkFooter text-fontDarkMode" : 'bg-gray'}`}>

            <div className="flex justify-between sm:flex-col sm:gap-8">
                <div id='logo-name' className="text-[2rem] font-bold tracking-widest text-primary italic">SNIPER</div>

                <div id="links" className='flex flex-col gap-4'>
                    <h1 className='font-[500] text-[1.25rem]'>About</h1>

                    <Link className='hover:underline' to='https://middlesexcollege.edu/'>Middlesex College</Link>
                    <Link className='hover:underline' to='https://middlesexcollege.edu/admissions/'>Join Us</Link>
                    <Link className='hover:underline' to='https://middlesexcollege.edu/student-life/clubs-and-organizations/'>Clubs</Link>

                </div>

                <div id="links" className='flex flex-col gap-4'>
                    <h1 className='font-[500] text-[1.25rem]'>Socials</h1>

                    <div className='flex gap-4 items-center'>
                        <Link className='hover:underline text-[1.5rem]' to='https://discord.com/channels/882703639775432717/882703639775432718'><RiDiscordLine /></Link>
                        <Link className='hover:underline text-[1.5rem]' to='https://www.instagram.com/middlesexcollegenj/?hl=en'><FaInstagram /></Link>
                        <Link className='hover:underline text-[1.5rem]' to='https://www.linkedin.com/school/middlesexcollege/'><FaLinkedinIn /></Link>
                        <Link className='hover:underline text-[1.5rem]' to='https://twitter.com/MiddlesexCollNJ?ref_src=twsrc%5Egoogle%7Ctwcamp%5Eserp%7Ctwgr%5Eauthor'><FaXTwitter /></Link>
                        <Link className='hover:underline text-[1.5rem]' to='https://www.facebook.com/middlesexcollegenj/'><FaFacebookF /></Link>

                    </div>

                </div>

            </div>

            <hr className={`my-8 text-[rgba(0,0,0,.25)]`} />

            <div>
                <h1 className='text-[.9rem]'>Created by the MCC Computer Science Club</h1>
                <div className={`${darkMode ? "text-[rgba(0,0,0,.5)]" : "text-[rgba(255,255,255,.5)]"} text-[.6rem]`}>
                    Copyright © 2024 All Rights Reserved
                </div>
            </div>
        </footer>
    )
}

export default Footer