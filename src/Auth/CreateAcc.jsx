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

  // local data testing
  // fetch('../src/students.json') 

  const handleCreateAccount = async () => {
    try {
        // Makes sure all input fields are filled
        if (!newEmail || !newPassword || !newFName || !newLName || !isMatch) {
            console.log('Please fill in all fields correctly');
            return;
        }

        // Fetch to attempt post request of creating a new account
        const response = await fetch('http://localhost:5000/api/students', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                firstName: newFName,
                lastName: newLName,
                email: newEmail,
                password: newPassword,
                targetCourses: [],
            }),
        });

        if (response.ok) {
            console.log('Account created successfully');
            navigate('/login'); // Navigate to login page when account creation is successful
        } else {
            console.log('Failed to create account', response.status);
        }
    } catch (error) {
        console.error('Error creating account:', error);
    }
};

  // Makes sure if password and confirm password is a match
  useEffect(() => {
      setIsMatch(newPassword === confirmPassword);
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

        <div className="w-full"><button className={`${buttonStyled} text-[1rem] bg-primary text-light mt-2 duration-300 hover:bg-bgDarkPrimary hover:rounded-[20px]`} 
        onClick={handleCreateAccount}>Create Account</button></div>

        <div className="underline"><Link to='/login'>Return to login page</Link></div>

      </div>

    </section>
  )
}

export default CreateAcc