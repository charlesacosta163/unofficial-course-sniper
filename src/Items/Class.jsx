import React from 'react'
import { buttonStyled } from '../styles'
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { DarkContext } from '../App';

const Class = ({ id, sectionName, title, startDate, availableSeats, term, faculty, handleAddEntry, status }) => {
    const {darkMode} = useContext(DarkContext)
    const handleClick = () => {
        handleAddEntry(
            sectionName,
            faculty, 
            id,
            title,
            startDate,
            availableSeats,
            status,
            term
        );
    };

    return (
        <div className={`class flex justify-between gap-2 ${darkMode ? `${availableSeats < 1 ? "bg-[#ffaea8]" : "bg-gray"}` : availableSeats < 1 ? "bg-[#ff5d52] text-light" : "bg-bgGrayBtn text-light"} p-4 rounded-[20px] hover:shadow-md duration-300`} >
            <div className="left flex flex-col justify-between">
                <div className='font-[500]'>{sectionName}</div>
                <div>{title}</div>
                <div>Seats Available: {availableSeats}</div>
                <div>Status: <span className={`${status.toLowerCase() === 'closed' ? darkMode == false ? "text-bgDarkMode" : "text-[#ff0000]" : "text-green"} font-bold`}>{status}</span></div>
            </div>

            <div className="right flex flex-col justify-between items-end text-right">
                <div>
                    <div>{term}</div>
                    <div>{faculty.trim() === "" ? "TBA" : faculty}</div>
                </div>
                <div>
                    <Link to='/manager'>

                        <button
                            className={`${buttonStyled} bg-primary px-4 text-light text-[1rem] mt-4 duration-300 hover:bg-bgDarkPrimary hover:rounded-[20px]`}
                            onClick={handleClick}
                        >
                            Snipe
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Class