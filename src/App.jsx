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
import Manager from "./Components/Manager"

import PrivateRoute from "./PrivateRoute"

import { wrapperWidth } from "./styles"
import { useState, createContext, Fragment } from "react"
import { Routes, Route, Link, useNavigate, useLocation } from 'react-router-dom'

export const DarkContext = createContext(false);
export const UserContext = createContext(null)
export const ArrayContext = createContext(null)
export const NotifsContext = createContext(null)

function App() {

  const [darkMode, setDarkMode] = useState(true)
  const modeValue = { darkMode, setDarkMode };

  // User Set As the first student in the Actual DB

  /*
  {
    studentId: 4,
    firstName: 'Charles',
    lastName: 'Fake',
    email: 'fakecharles163@gmail.com',
    password: '$2a$10$iZ/vo72rUiNW4RAFZFNlduZ3jVtAVZLMOPqY0Krz5.15nenMsNBMG',
    targetCourses: []
  }
  */

  const [user, setUser] = useState(null)
  const userObj = { user, setUser }

  const [classes, setClasses] = useState([])
  const arrayObj = { classes, setClasses }

  const [notifications, setNotifications] = useState([])
  const allNotifs = { notifications, setNotifications }

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
  // ArrayContext = user's sniped classes

  return (
    <UserContext.Provider value={userObj}>
      <ArrayContext.Provider value={arrayObj}>
        <NotifsContext.Provider value={allNotifs}>
          <DarkContext.Provider value={modeValue}>
            <Fragment>
              <div className="">
                {!isExcludedRoute && (
                  <header>
                    <Navbar />
                  </header>
                )}

                <main>

                  <Routes>

                    {/* Public Routes */}
                    <Route path="/login" element={<section className={`${wrapperWidth}`}><Login /></section>} />
                    <Route path="/createacc" element={<section className={`${wrapperWidth}`}><CreateAcc /></section>} />
                    <Route path="/forgotpassword" element={<section className={`${wrapperWidth}`}><ForgotPassword /></section>} />
                    <Route path="*" element={<section className={`${wrapperWidth}`}><Error /></section>} />

                    {/* Private Routes */}

                    <Route path='/' element={<PrivateRoute><section className={`${wrapperWidth}`}><Home /></section></PrivateRoute>} />
                    <Route path='/form' element={<PrivateRoute><section className={`${wrapperWidth}`}><Form /></section></PrivateRoute>} />
                    <Route path='/manager' element={<PrivateRoute><section className={`${wrapperWidth}`}><Manager /></section></PrivateRoute>} />
                    <Route path='/profile' element={<PrivateRoute><section className={`${wrapperWidth}`}><Profile /></section></PrivateRoute>} />
                    <Route path='/settings' element={<PrivateRoute><section className={`${wrapperWidth}`}><Settings setDarkMode={handleDarkMode} /></section></PrivateRoute>} />
                    <Route path='/notifications' element={<PrivateRoute><section className={`${wrapperWidth}`}><Notifications /></section></PrivateRoute>} />

                  </Routes>

                </main>

              </div>
            </Fragment>
          </DarkContext.Provider>
        </NotifsContext.Provider>
      </ArrayContext.Provider>
    </UserContext.Provider >
  )
}

export default App
