import Navbar from "./Components/Navbar"
import Home from "./Components/Home"
import Form from "./Components/Form"
import Login from "./Auth/Login"
import CreateAcc from "./Auth/CreateAcc"
import Profile from "./Components/Profile"
import Settings from "./Components/Settings"
import ForgotPassword from "./Auth/ForgotPassword"
import Notifications from "./Components/Notifications"
import Error from "./Components/Error"

import { wrapperWidth } from "./styles"
import Manager from "./Components/Manager"
import { useState, createContext } from "react"
import { Routes, Route, Link, useNavigate, useLocation } from 'react-router-dom'

export const DarkContext = createContext(false);
export const UserContext = createContext(null)

function App() {

  const [darkMode, setDarkMode] = useState(true)
  const modeValue = { darkMode, setDarkMode };

  const [user, setUser] = useState(null)
  const userObj = { user, setUser }

  const navigate = useNavigate();
  const location = useLocation();

  const isExcludedRoute = ['/login', '/createacc', '/forgotpassword'].includes(location.pathname);

  const handleDarkMode = () => {
    setDarkMode(prev => !prev);

    if (darkMode) {
      document.body.style.backgroundColor = '#19191F'
    }

    else {
      document.body.style.backgroundColor = '#F8F8FF'
    }
  }

  // UserContext = user object
  // DarkContext = dark mode

  return (
    <UserContext.Provider value={userObj}>
      <DarkContext.Provider value={modeValue}>
        <div className="">
          {!isExcludedRoute && (
            <header>
              <Navbar />
            </header>
          )}

          <main>

            <Routes>
              <Route path="/" element={
                <section className={`${wrapperWidth}`}>
                  <Home />
                </section>}
              />

              <Route path="/form" element={
                <section className={`${wrapperWidth}`}>
                  <Form />
                </section>}
              />
              <Route path="/manager" element={
                <section className={`${wrapperWidth}`}>
                  <Manager />
                </section>}
              />

              <Route path="/profile" element={
                <section className={`${wrapperWidth}`}>
                  <Profile />
                </section>}
              />

              <Route path="/settings" element={
                <section className={`${wrapperWidth}`}>
                  <Settings setDarkMode={handleDarkMode} />
                </section>}
              />

              <Route path="/notifications" element={
                <section className={`${wrapperWidth}`}>
                  <Notifications />
                </section>}
              />

              <Route path="*" element={
                <section className={`${wrapperWidth}`}>
                  <Error />
                </section>}
              />

              <Route path="/login" element={
                <section className={`${wrapperWidth}`}>
                  <Login />
                </section>}
              />

              <Route path="/createacc" element={
                <section className={`${wrapperWidth}`}>
                  <CreateAcc />
                </section>}
              />

              <Route path="/forgotpassword" element={
                <section className={`${wrapperWidth}`}>
                  <ForgotPassword />
                </section>}
              />

            </Routes>
          </main>

        </div>
      </DarkContext.Provider>
    </UserContext.Provider>
  )
}

export default App
