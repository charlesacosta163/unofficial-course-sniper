import { Link } from "react-router-dom"
import { sectionWidth, showBorder, buttonStyled, formStyled, headerText } from "../styles"
import FormField from "../Items/FormField"

import { DarkContext } from '../App'
import { useContext } from 'react'

const ForgotPassword = () => {
  const { darkMode } = useContext(DarkContext)
  return (
    <section id="forgot-password-section" className={`${sectionWidth} h-[100svh] flex justify-center items-center`}>

      <div id="forgot-password-container" className={`max-w-[400px] w-full flex flex-col items-center gap-4 p-8 shadow-md rounded-[20px] ${darkMode ? "bg-light" : "bg-bgDarkSecondary [&>*]:text-fontDarkMode"}`}>


        <h2 className={`${headerText}`}>Forgot Password</h2>
        <p className="text-xs text-[rgba(0,0,0,.5)] leading-relaxed text-center"> If you've forgotten your password, don't worry! Enter your email address below, and we'll send you a link to reset your password.</p>

        <div className="forms flex flex-col gap-4 w-full">

          <FormField name='Recovery Email' placeholder="@email" type='email' />

        </div>

        <div className="w-full"><button className={`${buttonStyled} text-[1rem] bg-primary text-light mt-2`}>Recover</button></div>

        <div className="underline"><Link to='/login'>Return to login page</Link></div>

      </div>

    </section>
  )
}

export default ForgotPassword