import { buttonStyled, headerText, sectionWidth, showBorder, formStyled } from "../styles";
import { UserContext } from "../App";
import { DarkContext } from "../App";
import { useContext, useEffect, useState } from "react";
import { HiXMark } from "react-icons/hi2";

const Profile = () => {
    const { user, setUser } = useContext(UserContext);
    const { darkMode } = useContext(DarkContext);
    const [profileProjects, setProfileProjects] = useState([]);

    const [showDelete, setShowDelete] = useState(false)
    const [password, setPassword] = useState('')
    const [isMatch, setIsMatch] = useState(null)

    async function handleDeleteAccount() {
        try {
            if(password === user.password) {
                
                // Implementation (not working)
                const response = await fetch(`http://localhost:5000/api/students/${user.studentId}`, {
                    method: "DELETE"
                })
                
                // If deleted, automatic logout, check console
                if (response.ok) {
                    setUser(null)
                    console.log("Account deleted");
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
        fetchUserData();
    }, []);

    // Fetches the targetCourses array, and displays it in Class List
    const fetchUserData = async () => {
        try {
            const response = await fetch(`http://localhost:5000/api/students/${user.studentId}`);
            if (response.ok) {
                const data = await response.json();
                const projects = data.targetCourses.map((e, i) => (
                    <div className={`flex gap-4 ${darkMode ? "bg-gray" : "bg-bgGrayBtn text-fontDarkMode"} px-4 py-2 rounded`} key={i}>
                        <div>{e.code}</div>
                        <div>{e.section}</div>
                        <div>{e.number}</div>
                        <div>{e.professor}</div>
                    </div>
                ));
                setProfileProjects(projects);
            } else {
                console.error('Failed to fetch user data');
            }
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    };

    return (
        <section id="profile-section" className={`h-auto md:h-auto flex justify-center items-center ${sectionWidth}`}>
            <div id="profile-container" className="max-w-[800px] w-full flex gap-4 sm:flex-col">
                <div id="profile-left" className={`flex-1 p-8 flex flex-col gap-4 items-center rounded-[20px] ${darkMode ? "bg-light" : "bg-bgDarkSecondary text-fontDarkMode"}`}>
                    <div className={`w-[100px] h-[100px] rounded-full`}>
                        <img src="https://cdn-icons-png.flaticon.com/512/6084/6084667.png" className='w-full h-full' alt="" />
                    </div>
                    <div className="font-[500]">{user.firstName} {user.lastName}</div>
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
                                }}>{showDelete ? <HiXMark className="text-xl"/> : "Delete Account"}</button>
                                <button className={`px-4 py-2 rounded font-normal text-[.8rem] bg-dark text-light w-auto duration-300 hover:bg-bgDarkMode`}>Forgot Password</button>
                            </div>

                            <div className={`flex-col gap-4 mt-4 ${showDelete ? "flex" : "hidden"}`}>
                                <label htmlFor="" className="italic text-sm">Type <span className="font-bold">your password</span> to delete your account</label>
                                <input type="password" placeholder="Password here" className={`${formStyled} bg-gray`} value={password} onChange={e => setPassword(e.target.value)}/>
                                <div className="">
                                    <button className={`${buttonStyled} bg-[#ff0000] px-4 text-light duration-300 hover:rounded-[30px]`} onClick={handleDeleteAccount}>Submit</button>
                                </div>

                            </div>
                        </div>
                    </div>
                    <div id='bottom' className="bg-light p-8 rounded-[20px]">
                        <h2 className={`${headerText}`}>Class List {profileProjects.length === 0 ? "" : <span>({profileProjects.length})</span>}</h2>
                        <div id="projects" className="flex flex-col gap-2 mt-4">
                            {user.targetCourses.length === 0 ? <span className="text-sm mt-4">No classes added</span> : profileProjects}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Profile;
