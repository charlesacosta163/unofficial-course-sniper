import { useContext, useState } from "react";
import { Link } from 'react-router-dom'
import { ArrayContext } from "../App";
import { DarkContext } from "../App";

import { showBorder, formStyled, buttonStyled, sectionWidth, headerText } from "../styles"
import { codes, numbers, sections } from "../classkeywords";

import { FaArrowLeft } from "react-icons/fa6";

const Form = () => {
    const {darkMode} = useContext(DarkContext)

    const [classCode, setClassCode] = useState('')
    const [classSection, setClassSection] = useState('')
    const [classNumber, setClassNumber] = useState('')

    const { classes, setClasses } = useContext(ArrayContext)

    const handleSubmit = () => {

        if (classCode && classSection && classNumber) {
            setClasses((prevClasses) => [
                ...prevClasses,
                {
                    code: classCode,
                    section: classSection,
                    number: classNumber,
                },
            ])

            setClassCode('');
            setClassSection('');
            setClassNumber('');
        } else { return }
    }

    return (
        <section id="form-section" className={`${sectionWidth} h-[90svh] md:h-auto flex justify-center items-center`}>

            <div id="form-container" className={`max-w-[500px] w-full p-8 z-[.2] rounded ${darkMode ? "bg-[#F8F8FF]" : "bg-bgDarkSecondary text-fontDarkMode"}`}>

                <Link to="/">
                    <div className="pb-4 text-[1.5rem] inline-block "><FaArrowLeft /></div>
                </Link>
                <h1 className={`text-center ${headerText} mb-8`}>Snipe A Class</h1>

                <div id="forms" className={`flex flex-col gap-4 ${darkMode == false && "[&>div>input]:text-dark"}`}>
                    <div className="w-full">
                        <label htmlFor="class-code" className="block text-xs font-[500] mb-2">Class Code</label>
                        <input type="text" list='classcode' placeholder="e.g MAT/CSC" className={`${formStyled} rounded outline-none`} onChange={e => setClassCode(e.target.value)} required />

                        <datalist id='classcode'>
                            <option>MAT</option>
                            <option>CSC</option>
                            <option>BIO</option>
                        </datalist>

                    </div>

                    <div className="w-full">
                        <label htmlFor="class-section" className="block text-xs font-[500] mb-2">Class Section</label>
                        <input type="text" list = 'classsection' placeholder="e.g 132/131" className={`${formStyled} rounded outline-none`} onChange={e => setClassSection(e.target.value)} required />

                        <datalist id='classsection'>
                            <option>131</option>
                            <option>206</option>
                            <option>264</option>
                        </datalist>

                    </div>

                    <div className="w-full">
                        <label htmlFor="email" className="block text-xs font-[500] mb-2">Class Number</label>
                        <input type="text" list = 'classnumber' placeholder="eg. 01/07" className={`${formStyled} rounded outline-none`} onChange={e => setClassNumber(e.target.value)} required />

                        <datalist id='classnumber'>
                            <option>01</option>
                            <option>02</option>
                            <option>03</option>
                        </datalist>
                    </div>

                    {classCode && classSection && classNumber ? <Link to="/manager">
                        <button onClick={handleSubmit} className={`${buttonStyled} mt-4 bg-primary text-light`}>Add Class</button>
                    </Link> :
                        <button onClick={handleSubmit} className={`${buttonStyled} mt-4 bg-primary text-light`}>Add Class</button>
                    }
                </div>

            </div>
        </section>
    )
}

export default Form