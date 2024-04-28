import React, { useEffect, useContext } from 'react'
import Questions from './Questions'
import Footer from './Footer'
import { DarkContext } from '../App'

import { showBorder, buttonStyled, sectionWidth, headerText, wrapperWidth } from '../styles'
import { Routes, Route, Link } from 'react-router-dom'

import { FaMagnifyingGlass } from "react-icons/fa6";
import { IoLibraryOutline } from "react-icons/io5";


const Home = () => {
    const { darkMode } = useContext(DarkContext)

    return (
        <section id="home-section" className={`${sectionWidth} pt-16 sm:pt-8 h-auto flex flex-col justify-center items-center`}>


            <h1 className={`${headerText} mb-8 text-green text-center font-[300] sm:text-[1.5rem]`}>Welcome to
                <span id='logo-name' className="text-[2rem] sm:text-[1.5rem] font-bold tracking-widest text-primary italic ml-2">SNIPER</span>
            </h1>

            <div className="cards flex gap-[2rem] md:flex-col [&>#card]:duration-300">

                <div id='card' className={`${darkMode ? "bg-light" : "bg-bgDarkSecondary text-fontDarkMode"} w-[300px] rounded-[20px] rounded-b-[8px] shadow hover:shadow-2xl hover:translate-y-[-0.5rem] hover:rotate-[-1deg] group`}>

                    <img src="https://st2.depositphotos.com/1385248/5185/i/450/depositphotos_51859279-stock-photo-happy-college-students.jpg" alt="" className={`rounded-t-[20px] rounded-br-[150px] duration-200 group-hover:rounded-br-none w-full h-[200px] ${darkMode ? "border-b-8 border-dark": "border-b-8 border-light"}`} />

                    <div id="description" className='p-4 flex flex-col gap-4'>
                        <div className="flex items-center gap-4 self-center group-hover:underline">
                            <FaMagnifyingGlass className='text-[1.75rem]' />
                            <h1 className="text-[2rem] font-bold">Snipe</h1>
                        </div>
                        <p className='text-center'>For students who are in the process of registering for classes</p>

                        <Link to="/form">
                            <button className={`${buttonStyled} bg-primary text-light duration-300 hover:bg-bgDarkPrimary hover:rounded-[20px]`}>New Snipe</button>
                        </Link>
                    </div>
                    <div className="h-[3px] w-auto p-1 rounded-b-[20px] overflow-hidden bg-[#e6e6fa]"></div>

                </div>

                <div id='card' className={`${darkMode ? "bg-light" : "bg-bgDarkSecondary text-fontDarkMode"} w-[300px] rounded-[20px] rounded-b-[8px] shadow hover:shadow-2xl hover:translate-y-[-.5rem] hover:rotate-[1deg] group`}>

                    <img src="https://middlesexcollege.edu/wp-content/uploads/2022/04/community-college-month.jpg" alt="" className={`rounded-t-[20px] rounded-br-[150px] duration-200 group-hover:rounded-br-none w-full h-[200px] ${darkMode ? "border-b-8 border-dark": "border-b-8 border-light"}`} />

                    <div id="description" className={`p-4 flex flex-col gap-4`}>
                        <div className="flex items-center gap-4 self-center group-hover:underline">
                            <IoLibraryOutline className='text-[1.75rem]' />
                            <h1 className="text-[2rem] font-bold">Manage</h1>
                        </div>
                        <p className='text-center'>For students focusing on managing the status of classes</p>

                        <Link to="/manager">
                            <button className={`${buttonStyled} ${darkMode == false ? "bg-bgGrayBtn hover:bg-bgDarkMode" : "bg-gray hover:bg-grayHovered"} duration-300 hover:rounded-[20px] `}>Manage Snipes</button>
                        </Link>
                    </div>
                <div className="h-[3px] w-auto p-1 bg-[#e6e6fa] rounded-b-[20px] overflow-hidden"></div>
                </div>

            </div>

            {/* FAQ Section goes here */}

            <section className={`${wrapperWidth}`}>
                <Questions />
            </section>

            <section className={`${wrapperWidth}`}>
                <Footer />
            </section>


        </section>
    )
}

export default Home