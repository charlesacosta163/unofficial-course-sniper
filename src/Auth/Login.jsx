import { sectionWidth, buttonStyled, headerText } from "../styles";
import { Link, useNavigate } from "react-router-dom";
import FormField from "../Items/FormField";
import { useContext, useEffect, useState } from "react";

import { DarkContext, UserContext } from "../App";

const EXPRESS_URL = import.meta.env.VITE_EXPRESS_URL
const localURL = 'http://localhost:5000/'

const Login = () => {
  const { darkMode } = useContext(DarkContext);
  const { user, setUser } = useContext(UserContext)

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [status, setStatus] = useState(false)

  const navigate = useNavigate()

  async function handleLogin() {
    console.log("in function");
    setStatus(false)
    document.getElementById('auth-msg').textContent = 'Logging in...';
    try {
      const response = await fetch(`${localURL}api/students/login`, {
        method: "POST",
        credentials: 'include', // Don't forget to specify this if you need cookies
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email: email,
          password: password
        })
      })

      if (response.ok) {

        setTimeout(async () => {
          const data = await response.json()
          const user = data.user
          console.log(`${data.msg} ${user}`);
          setUser(user)
          navigate('/dashboard');
          document.getElementById('auth-msg').textContent = '';
        }, 1000)
      } else {
        setStatus(true)
        document.getElementById('auth-msg').textContent = 'Incorrect email or password';
      }

    } catch (err) {
      console.log(err);
    }

  }


  return (
    <section id="login-section" className={`${sectionWidth} h-[100svh] flex justify-center items-center overflow-y-hidden`}>
      <div className={`grid place-items-center md:flex justify-center grid-cols-2 md:grid-cols-1 max-w-[1000px] w-full shadow-md ${darkMode ? "bg-light" : "bg-bgDarkSecondary [&>*]:text-fontDarkMode"} p-8 md:p-0 rounded-[20px]`}>

        <div id="photo-container" className="md:hidden">
          <img src="https://42f2671d685f51e10fc6-b9fcecea3e50b3b59bdc28dead054ebc.ssl.cf5.rackcdn.com/illustrations/education_f8ru.svg" alt="" className="w-full h-full" />
        </div>

        <div id="login-container" className={`max-w-[400px] w-full flex flex-col items-center gap-4 p-8 rounded`}>
          <div id="logo" className="flex items-center gap-4">
            <img src="https://www.njtransfer.org/images/logos/2615.png" alt="" width='75' className="rounded" />
            <div id='logo-name' className="text-[1.5rem] font-bold tracking-widest text-primary italic">SNIPER</div>
          </div>
          <h2 className={`${headerText}`}>Login</h2>
          <div className="forms flex flex-col gap-4 w-full">
            <FormField name="Email" placeholder="@email" type="email" setInput={e => setEmail(e.target.value)} />
            <FormField name="Password" placeholder="password" type="password" setInput={e => setPassword(e.target.value)} />
          </div>
          <div>Don't have an account? <Link to="/createacc" className="underline font-[500]">Sign Up</Link></div>

          <div className="w-full"><button onClick={handleLogin} className={`${buttonStyled} text-[1rem] bg-primary text-light duration-300 hover:bg-bgDarkPrimary hover:rounded-[20px]`}>Login</button></div>
          <p id="auth-msg" className={`${status ? 'text-[#ff0000]' : 'text-[#000]'} font-bold`}></p>
          <div className="text-[#20A8FF]"><Link to='/forgotpassword'>Forgot Password</Link></div>
        </div>

      </div>
    </section>
  );
};

export default Login;
