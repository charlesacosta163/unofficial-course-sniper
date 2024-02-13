import React, { useEffect, useContext } from 'react'
import Questions from './Questions'
import Footer from './Footer'
import { DarkContext } from '../App'

import { showBorder, buttonStyled, sectionWidth, headerText, wrapperWidth } from '../styles'
import { Routes, Route, Link } from 'react-router-dom'

const Home = () => {
    const { darkMode } = useContext(DarkContext)

    return (
        <section id="home-section" className={`${sectionWidth} pt-16 sm:pt-8 h-auto flex flex-col justify-center items-center`}>


            <h1 className={`${headerText} mb-8 text-green text-center font-[300] sm:text-[1.5rem]`}>Welcome to                     
            <span id='logo-name' className="text-[2rem] sm:text-[1.5rem] font-bold tracking-widest text-primary italic ml-2">SNIPER</span>
            </h1>

            <div className="cards flex gap-[2rem] md:flex-col [&>#card]:duration-300">

                <div id='card' className={`${darkMode ? "bg-light" : "bg-bgDarkSecondary text-fontDarkMode"} w-[300px] rounded-b shadow-xl hover:translate-y-[-0.5rem]`}>

                    <img src="https://middlesexcollege.edu/wp-content/themes/middlesex-college/assets/images/jpg/winter-2024-classes.jpg" alt="" className={`rounded w-full h-[200px]`} />

                    <div id="description" className='p-4 flex flex-col gap-4'>
                        <p>For students who are in the process of registering for classes</p>

                        <Link to="/form">
                            <button className={`${buttonStyled} bg-primary text-light duration-300 hover:bg-bgDarkPrimary`}>New Snipe</button>
                        </Link>
                    </div>

                </div>

                <div id='card' className={`${darkMode ? "bg-light" : "bg-bgDarkSecondary text-fontDarkMode"} w-[300px] rounded-b shadow-xl hover:translate-y-[-.5rem]`}>

                    <img src="https://middlesexcollege.edu/wp-content/uploads/2022/04/community-college-month.jpg" alt="" className={`rounded w-full h-[200px]`} />

                    <div id="description" className={`p-4 flex flex-col gap-4`}>
                        <p>For students focusing on managing the status of classes</p>

                        <Link to="/manager">
                            <button className={`${buttonStyled} ${darkMode == false ? "bg-bgGrayBtn hover:bg-bgDarkMode" : "bg-gray hover:bg-grayHovered"} duration-300 `}>Manage Snipes</button>
                        </Link>
                    </div>

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