import { sectionWidth, showBorder, buttonStyled, formStyled, headerText } from "../styles"
import { Link } from "react-router-dom"
import FormField from "../Items/FormField"

import { useContext } from "react"
import { DarkContext } from "../App"

const Login = () => {
  const {darkMode} = useContext(DarkContext)

  return (
    <section id="login-section" className={`${sectionWidth} h-[100svh] flex justify-center items-center overflow-y-hidden`}>

      <div className={`grid place-items-center md:flex justify-center grid-cols-2 md:grid-cols-1 max-w-[1000px] w-full shadow-md ${darkMode ? "bg-light" : "bg-bgDarkSecondary [&>*]:text-fontDarkMode"} p-8 md:p-0 rounded-[20px]`}>
        <div id="photo-container" className="md:hidden">
          <img src="https://42f2671d685f51e10fc6-b9fcecea3e50b3b59bdc28dead054ebc.ssl.cf5.rackcdn.com/illustrations/education_f8ru.svg" alt="" className="w-full h-full" />
        </div>

        <div id="login-container" className={`max-w-[400px] w-full flex flex-col items-center gap-4 p-8 rounded`}>

          <div id="logo" className="flex items-center gap-4" onClick={() => setShow(false)}>
            <img src="https://www.njtransfer.org/images/logos/2615.png" alt="" width='75' className="rounded" />
            <div id='logo-name' className="text-[1.5rem] font-bold tracking-widest text-primary italic">SNIPER</div>
          </div>

          <h2 className={`${headerText}`}>Login</h2>

          <div className="forms flex flex-col gap-4 w-full">

            <FormField name = 'Username' placeholder= "@username" type= 'text' />
            <FormField name = 'Password' placeholder= "password" type= 'password' />

          </div>

          <div>Don't have an account? <Link to="/createacc"><a href="#" className="underline font-[500]">Sign Up</a></Link></div>

          <div className="w-full"><Link to="/"><button className={`${buttonStyled} text-[1rem] bg-primary text-light`}>Login</button></Link></div>
          <div className="text-[#20A8FF]"><Link to='/forgotpassword'>Forgot Password</Link></div>

        </div>

      </div>

    </section>
  )
}

export default Login