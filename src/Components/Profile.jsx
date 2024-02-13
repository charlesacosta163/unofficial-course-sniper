import { buttonStyled, headerText, sectionWidth, showBorder } from "../styles"
import { UserContext } from "../App"
import { DarkContext } from "../App"
import { useContext } from "react"

const Profile = () => {
    const { user, setUser } = useContext(UserContext)
    const {darkMode} = useContext(DarkContext)

    const profileProjects = user.targetCourses.map((e, i) => {
        return (
            <div className={`flex gap-4 ${darkMode ? "bg-gray" : "bg-bgGrayBtn text-fontDarkMode"} px-4 py-2 rounded`} key={i}>
                <div>{e.code}</div>
                <div>{e.section}</div>
                <div>{e.number}</div>
                <div>{e.professor}</div>
            </div>
        )
    })
  return (
    <section id="profile-section" className={`h-auto md:h-auto flex justify-center items-center ${sectionWidth}`}>

        <div id="profile-container" className="max-w-[800px] w-full flex gap-4 sm:flex-col">

            <div id="profile-left" className={`flex-1 p-8 flex flex-col gap-4 items-center rounded ${darkMode ? "bg-light" : "bg-bgDarkSecondary text-fontDarkMode" }`}>
                <div className={`w-[100px] h-[100px] rounded-full`}>
                    <img src="https://cdn-icons-png.flaticon.com/512/6084/6084667.png" className='w-full h-full' alt="" />
                </div>
                <div className="font-[500]">{user.firstName} {user.lastName}</div>
            </div>

            <div id="profile-right" className={`flex-[4] flex flex-col gap-4 ${darkMode ? "[&>#top]:bg-light [&>#bottom]:bg-light" : "[&>#top]:bg-bgDarkSecondary [&>#bottom]:bg-bgDarkSecondary text-fontDarkMode"}`}>

                <div id = 'top' className="bg-light flex flex-col gap-4 p-8 rounded">
                    <h2 className={`${headerText}`}>About</h2>  

                    <div id="fields" className="flex flex-col gap-2">
                        
                        <div className={`flex gap-4`}> 
                            <div>Name: </div>
                            <div>{user.firstName} {user.lastName}</div>
                        </div>

                        <div className={`flex gap-4`}> 
                            <div>Email: </div>
                            <div>{user.email}</div>
                        </div>
                        
                        <div className={`flex gap-4 mt-4`}>
                            <button className={`px-4 py-2 rounded font-normal text-[.8rem] bg-dark text-light w-auto duration-300 hover:bg-bgDarkMode`}>Change Email</button>
                            <button className={`px-4 py-2 rounded font-normal text-[.8rem] bg-dark text-light w-auto duration-300 hover:bg-bgDarkMode`}>Forgot Password</button>
                        </div>
                        
                    </div> 
                </div>

                <div id="bottom" className="bg-light p-8 rounded">
                    
                <h2 className={`${headerText}`}>Class List {profileProjects.length == 0 ? "" : <span>({profileProjects.length})</span>}</h2>  

                    <div id="projects" className="flex flex-col gap-2 mt-4">
                        {user.targetCourses.length == 0 ? <span className="text-sm mt-4">No classes added</span> : profileProjects}
                    </div>
                </div>

            </div>

        </div>
    </section>

  )
}

export default Profile