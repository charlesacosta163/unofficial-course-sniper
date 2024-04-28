import { buttonStyled, headerText, sectionWidth, showBorder, formStyled } from "../styles";
import { UserContext, DarkContext, ArrayContext, NotifsContext } from "../App";
import { useContext, useEffect, useState } from "react";
import { HiXMark } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";
import { comparePassword } from "../Server/routes/helpers.js";

const EXPRESS_URL = import.meta.env.VITE_EXPRESS_URL
const localURL = 'http://localhost:5000/'

const Profile = () => {
    const { user, setUser } = useContext(UserContext);
    const { darkMode } = useContext(DarkContext);
    const { classes, setClasses } = useContext(ArrayContext)
    const { notifications, setNotifications } = useContext(NotifsContext) 
    const [profileProjects, setProfileProjects] = useState([]);

    const [showDelete, setShowDelete] = useState(false)
    const [password, setPassword] = useState('')
    const [isMatch, setIsMatch] = useState(null)

    const navigate = useNavigate()

    async function handleLogout() {
        try {
            const response = await fetch(`${localURL}api/students/logout`)
            const data = await response.json()

            if (response.ok) {
                console.log(data.message);
                setUser(null)
                setClasses([])
                setNotifications([])
                navigate("/")
            }
            else
                console.log("Logout failed");

        } catch (err) {
            console.log(err);
        }
    }

    async function handleDeleteAccount() {
        try {
            if (comparePassword(password, user.password)) {

                const response = await fetch(`${localURL}api/students/${user.studentId}`, {
                    method: "DELETE"
                })

                // If deleted, automatic logout, check console
                if (response.ok) {
                    setUser(null)
                    console.log("Account deleted");
                    window.location.href = '/'
                }

                else
                    console.log("Something went wrong");
            }
            else {
                console.log("Not matched")
                console.log(user.password); // Display PW in console for testing
            }
        } catch (err) {
            console.log(err.message);
        }
    }

    useEffect(() => {
        displayClasses();
    }, []);

    // Fetches the targetCourses array, and displays it in Class List
    function displayClasses() {
        const projects = classes.map((e, i) => (
            <div className={`flex gap-4 ${darkMode ? "bg-gray" : "bg-bgGrayBtn text-fontDarkMode"} px-4 py-2 rounded`} key={i}>
                <div>{e.code}</div>
                <div>{e.section}</div>
                <div>{e.number}</div>
                <div>{e.professor}</div>
            </div>
        ));
        setProfileProjects(projects);
    }

    return (
        <section id="profile-section" className={`h-auto md:h-auto flex justify-center items-center ${sectionWidth}`}>
            <div id="profile-container" className="max-w-[800px] w-full flex gap-4 sm:flex-col">
                <div id="profile-left" className={`flex-1 p-8 flex flex-col gap-4 items-center rounded-[20px] ${darkMode ? "bg-light" : "bg-bgDarkSecondary text-fontDarkMode"}`}>
                    <div className={`w-[100px] h-[100px] rounded-full`}>
                        <img src="https://cdn-icons-png.flaticon.com/512/6084/6084667.png" className='w-full h-full' alt="" />
                    </div>
                    <div className="font-[500] text-center">{user.firstName} {user.lastName}</div>
                    <button className={`${buttonStyled} bg-green text-[#fff] text-sm font-bold duration-300 hover:bg-[#ff0000] hover:rounded-[30px] text-center`} onClick={handleLogout}>Log Out</button>
                </div>
                <div id="profile-right" className={`flex-[4] flex flex-col gap-4 ${darkMode ? "[&>#top]:bg-light [&>#bottom]:bg-light" : "[&>#top]:bg-bgDarkSecondary [&>#bottom]:bg-bgDarkSecondary text-fontDarkMode"}`}>
                    <div id='top' className="bg-light flex flex-col gap-4 p-8 rounded-[20px]">
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
                                <button className={`px-4 py-2 rounded font-normal text-[.8rem] bg-dark text-light w-auto duration-300 hover:bg-bgDarkMode`} onClick={() => {
                                    setShowDelete(prev => !prev)
                                    setPassword('')
                                }}>{showDelete ? <HiXMark className="text-xl" /> : "Delete Account"}</button>
                                <button className={`px-4 py-2 rounded font-normal text-[.8rem] bg-dark text-light w-auto duration-300 hover:bg-bgDarkMode`}>Forgot Password</button>
                            </div>

                            <div className={`flex-col gap-4 mt-4 ${showDelete ? "flex" : "hidden"}`}>
                                <label htmlFor="" className="italic text-sm">Type <span className="font-bold">your password</span> to delete your account</label>
                                <input type="password" placeholder="Password here" className={`${formStyled} bg-gray`} value={password} onChange={e => setPassword(e.target.value)} />
                                <div className="">
                                    <button className={`${buttonStyled} bg-[#ff0000] hover:bg-[#772727] px-4 text-light duration-300 hover:rounded-[30px]`} onClick={handleDeleteAccount}>Submit</button>
                                </div>

                            </div>
                        </div>
                    </div>
                    <div id='bottom' className="bg-light p-8 rounded-[20px]">
                        <h2 className={`${headerText}`}>Class List {profileProjects.length === 0 ? "" : <span>({profileProjects.length})</span>}</h2>
                        <div id="projects" className="flex flex-col gap-2 mt-4">
                            {classes.length === 0 ? <span className="text-sm mt-4">No classes added</span> : profileProjects}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Profile;
