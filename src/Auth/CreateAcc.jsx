import { Link } from "react-router-dom"
import { sectionWidth, showBorder, buttonStyled, formStyled, headerText } from "../styles"
import FormField from "../Items/FormField"

import { DarkContext } from '../App'
import { useContext } from 'react'

const CreateAcc = () => {
  const {darkMode} = useContext(DarkContext)
  return (
    <section id="createAcc-section" className={`${sectionWidth} h-[100svh] flex justify-center items-center`}>

      <div id="createAcc-container" className={`max-w-[400px] w-full flex flex-col items-center gap-4 p-8 shadow-md rounded-[20px] ${darkMode ? "bg-light" : "bg-bgDarkSecondary [&>*]:text-fontDarkMode"}`}>
    
        
        <h2 className={`${headerText}`}>Create Account</h2>

        <div className="forms flex flex-col gap-4 w-full">

          <FormField name = 'Username' placeholder= "@username" type= 'text' />
          <FormField name = 'Email' placeholder= "@email" type= 'email' />
          <FormField name = 'Password' placeholder= "@password" type= 'password' />
          <FormField name = 'Confirm Password' placeholder= "confirm password" type= 'password' />

        </div>

        <div className="w-full"><button className={`${buttonStyled} text-[1rem] bg-primary text-light mt-2`}>Create Account</button></div>

        <div className="underline"><Link to='/login'>Return to login page</Link></div>

      </div>

    </section>
  )
}

export default CreateAcc