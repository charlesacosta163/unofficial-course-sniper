import React from 'react'
import { formStyled } from '../styles'
import { DarkContext } from '../App'
import { useContext } from 'react'

const FormField = ({name, placeholder, type, setInput}) => {
    const {darkMode} = useContext(DarkContext)
    return (
    
    <div className="flex flex-col gap-2">
        <label htmlFor="" className='text-[.75rem] font-[500]'>{name}</label>
        <input type={type} className={`${formStyled} bg-gray ${darkMode == false && "text-dark"}`} placeholder={placeholder} onChange={setInput}/>
    </div>
    )
}

export default FormField