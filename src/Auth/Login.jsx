import { sectionWidth, buttonStyled, headerText } from "../styles";
import { Link, useNavigate } from "react-router-dom";
import FormField from "../Items/FormField";
import { useContext, useEffect, useState } from "react";

import { DarkContext, UserContext } from "../App";

const Login = () => {
  const { darkMode } = useContext(DarkContext);
  const { user, setUser } = useContext(UserContext)

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate()

  // Inside your component
  useEffect(() => {
    // From a local file, fetch("../src/students.json")
    fetch("http://localhost:5000/api/students")
      .then(res => res.json())
      .then(json => {
        const foundUser = json.find(user => user.email === email && user.password === password);
        setUser(foundUser); 
      })
      .catch(error => {
        console.error('Error fetching user data:', error);
      });
  }, [email, password]); 

  const handleLogin = () => {
    if (user) {
      console.log("Verified");
      console.log(user);
      navigate('/');
    } else {
      console.log("What the hell");
      document.getElementById('auth-msg').textContent = 'Incorrect email or password';
    }
  };
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
          <p id="auth-msg" className="text-[#ff0000] font-bold"></p>
          <div className="text-[#20A8FF]"><Link to='/forgotpassword'>Forgot Password</Link></div>
        </div>

      </div>
    </section>
  );
};

export default Login;
