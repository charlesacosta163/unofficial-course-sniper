import React from 'react'
import { buttonStyled } from '../styles'
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { DarkContext } from '../App';

const Class = ({ id, sectionName, title, startDate, availableSeats, term, faculty, handleAddEntry }) => {
    const {darkMode} = useContext(DarkContext)
    const handleClick = () => {
        handleAddEntry(
            sectionName,
            faculty, 
            id,
            title,
            startDate,
            availableSeats
        );
    };

    return (
        <div className={`class flex justify-between ${darkMode ? "bg-gray" : "bg-bgGrayBtn text-light"} p-4 rounded`} >
            <div className="left flex flex-col justify-between">
                <div>{sectionName}</div>
                <div>{title}</div>
                <div>Seats Available: {availableSeats}</div>
                <div></div>
            </div>

            <div className="right flex flex-col justify-end items-end">
                <div>{term}</div>
                <div>{faculty}</div>
                <div>
                    <Link to='/manager'>
                        <button
                            className={`${buttonStyled} bg-primary px-4 text-light text-[1rem] mt-4`}
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