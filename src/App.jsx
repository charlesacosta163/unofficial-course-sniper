import Navbar from "./Components/Navbar"
import Home from "./Components/Home"
import Form from "./Components/Form"
import Login from "./Auth/Login"
import CreateAcc from "./Auth/CreateAcc"
import Profile from "./Components/Profile"
import Settings from "./Components/Settings"
import ForgotPassword from "./Auth/ForgotPassword"
import Notifications from "./Components/Notifications"

import { wrapperWidth } from "./styles"
import Manager from "./Components/Manager"
import { useState, createContext } from "react"
import { Routes, Route, Link, useNavigate, useLocation } from 'react-router-dom'

export const ArrayContext = createContext([])
export const DarkContext = createContext(false);

function App() {

  const [classes, setClasses] = useState([]);
  const contextValue = { classes, setClasses };

  const [darkMode, setDarkMode] = useState(true)
  const modeValue = { darkMode, setDarkMode };

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

  return (
    <ArrayContext.Provider value={contextValue}>
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
                <section className={`${wrapperWidth} flex flex-col justify-center py-8 items-center gap-8 ${darkMode == false && "text-light"}`}>
                  <div><img src="https://42f2671d685f51e10fc6-b9fcecea3e50b3b59bdc28dead054ebc.ssl.cf5.rackcdn.com/illustrations/undraw_undraw_undraw_undraw_undraw_undraw_undraw_search_engines_041x_-2-_cl95_o7o8_pigd_-1-_wbm3_t5p8_-1-_mt5l_(2)_dhxr.svg" alt="" className="w-[300px]" /></div>
                  <span>Page Not Found</span>
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
    </ArrayContext.Provider>
  )
}

export default App
