import { Link, useNavigate } from "react-router-dom"
import { sectionWidth, showBorder, buttonStyled, formStyled, headerText } from "../styles"
import FormField from "../Items/FormField"

import { DarkContext } from '../App'
import { useContext, useEffect, useState } from 'react'

const CreateAcc = () => {
  const { darkMode } = useContext(DarkContext)

  const [newFName, setNewFName] = useState('')
  const [newLName, setNewLName] = useState('')
  const [newEmail, setNewEmail] = useState('')
  const [newPassword, setNewPassword] = useState('')

  const [confirmPassword, setConfirmPassword] = useState('')
  const [isMatch, setIsMatch] = useState(true)

  const navigate = useNavigate()

  const handleCreateAccount = () => {
    fetch('../src/students.json', {
      method: "POST",
      headers: {
        "Content-Type": 'application/json'
      },
      body: JSON.stringify({
        firstName: newFName,
        lastName: newLName,
        email: newEmail,
        password: newPassword,
        targetCourses: []
      })
    }).then(response => {
      if (response.ok && newEmail && newPassword && newFName && newLName && isMatch) {
        // Handle successful account creation
        console.log('Account created successfully');
        // Redirect to login page
        navigate('/login');
      } else {
        console.log('Failed to create account ' + response.status);
      }
    })
    .catch(error => {
      console.error('Error creating account:', error);
    })
  }

  useEffect(() => {
    fetch("../src/students.json")
    .then(res => res.json())
    .then(json => {
      console.log(json);
      setIsMatch(newPassword === confirmPassword);
    })
  }, [newPassword, confirmPassword]);

  return (
    <section id="createAcc-section" className={`${sectionWidth} h-[100svh] flex justify-center items-center`}>

      <div id="createAcc-container" className={`max-w-[400px] w-full flex flex-col items-center gap-4 p-8 shadow-md rounded-[20px] ${darkMode ? "bg-light" : "bg-bgDarkSecondary [&>*]:text-fontDarkMode"}`}>


        <h2 className={`${headerText}`}>Create Account</h2>

        <div className="forms flex flex-col gap-4 w-full">

          <div className="flex gap-4 w-full">
            <FormField name='First Name' placeholder="@firstname" type='text' setInput={e => setNewFName(e.target.value)} />
            <FormField name='Last Name' placeholder="@lastname" type='text' setInput={e => setNewLName(e.target.value)} />
          </div>
          <FormField name='Email' placeholder="@email" type='email' setInput={e => setNewEmail(e.target.value)} />
          <FormField name='Password' placeholder="@password" type='password' setInput={e => {
            setNewPassword(e.target.value)
            setIsMatch(e.target.value === confirmPassword);
          }} />
          <FormField name='Confirm Password' placeholder="confirm password" type='password' setInput={e => setConfirmPassword(e.target.value)} />
          
          {isMatch ? "" : (
            <div className="text-[#ff0000] text-center">Passwords must match</div>
          )}

        </div>

        <div className="w-full"><button className={`${buttonStyled} text-[1rem] bg-primary text-light mt-2`} onClick={handleCreateAccount}>Create Account</button></div>

        <div className="underline"><Link to='/login'>Return to login page</Link></div>

      </div>

    </section>
  )
}

export default CreateAcc