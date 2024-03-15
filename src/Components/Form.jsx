import { useContext, useState, useEffect } from "react";
import { Link } from 'react-router-dom'
import { UserContext, DarkContext } from "../App";
import Class from "../Items/Class";
import { FaArrowLeft } from "react-icons/fa6";
import { sectionWidth, headerText, formStyled, buttonStyled } from "../styles";

const Form = () => {
    const { darkMode } = useContext(DarkContext);
    const { user, setUser } = useContext(UserContext);

    const [selectedTerm, setSelectedTerm] = useState('fall');
    const [filteredCourseData, setFilteredCourseData] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(false);

    const [displayMore, setDisplayMore] = useState(6)

    // Define handleAddEntry function
    const handleAddEntry = async (sectionName, professor, id, title, startDate, seats) => {
        const [name, section, number] = sectionName.split('-');
        console.log(user.studentId);

        // Each Course Object as newEntry
        const newEntry = {
            id: id,
            code: name,
            section: section,
            number: number,
            professor: professor,
            courseName: title,
            startDate: startDate,
            availableSeats: seats
        };

        // Attempt a PUT request to update targetCourses when handleAddEntry function is called
        try {
            // Get current user targetCourses array and update with the newEntry object

            let url = `http://localhost:5000/api/students/${user.studentId}`
            const updatedTargetCourses = [...user.targetCourses, newEntry];

            // updated JSON object to be parsed
            let payload = {
                studentId: user.studentId,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                password: user.password,
                targetCourses: updatedTargetCourses
            }

            let options = {
                method: 'PUT',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(payload)
            }

            // PUT Request to update targetCourses in the database
            await fetch(url, options)

            // Set the current user information with the targetCourses array updated locally
            // setUser(prevUser => ({ ...prevUser, targetCourses: updatedTargetCourses }));

            console.log("Target courses updated successfully");

        } catch (error) {
            console.log("Error", error);
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            if (searchTerm.length < 3) {
                return;
            }

            setLoading(true);

            // Fetch the courses via substring search of the search term
            try {
                const response = await fetch(`http://localhost:5000/api/courses/search?title=${searchTerm}`);
                const data = await response.json();

                const filteredTerm = data.filter(course => course.term.toLowerCase().includes(selectedTerm.toLowerCase()));
                const filteredBySearch = filteredTerm.filter(course => course.title.toLowerCase().includes(searchTerm.toLowerCase()));

                // Course Objects Mapping
                const mappedFilteredCourseData = filteredBySearch.map((course, index) => (
                    <Class
                        key={index}
                        id={course.id}
                        sectionName={course.sectionName}
                        title={course.title}
                        startDate={course.startDate}
                        availableSeats={course.availableSeats}
                        term={course.term}
                        faculty={course.faculty}
                        handleAddEntry={handleAddEntry}
                    />
                ));

                // All Courses Displayed from search term
                setFilteredCourseData(mappedFilteredCourseData);
                setLoading(false); // Set loading state to false when data fetching is done
                setDisplayMore(6)

            } catch (error) {
                console.error('Error fetching courses:', error);
                setLoading(false); // Set loading state to false if there's an error
            }
        };

        fetchData(); // Call the async function immediately
    }, [selectedTerm, searchTerm, user.studentId]);

    const displayedCourses = filteredCourseData.slice(0, displayMore);

    return (
        <section id="form-section" className={`${sectionWidth} h-auto flex flex-col items-center`}>

            <div id="form-container" className={`max-w-[738px] w-full p-8 z-[.2] rounded-[20px] ${darkMode ? "bg-green" : "bg-primary"}`}>

                <div className="flex justify-between items-center pb-4">
                    <Link to="/">
                        <div className="text-[1.5rem] inline-block text-light"><FaArrowLeft /></div>
                    </Link>
                    <h1 className={`text-center ${headerText} sm:text-[1.5rem] text-light`}>Snipe A Class</h1>
                </div>

                <div className="select flex flex-col gap-4">

                    <div className="text-dark">
                        <label htmlFor="term" className="block text-xs font-[500] mb-2 text-light">Term</label>
                        <select name="terms" value={selectedTerm} id="" onChange={e => setSelectedTerm(e.target.value)} className="rounded">
                            <option value="fall">Fall 2023</option>
                            <option value="spring">Spring 2024</option>
                        </select>
                    </div>

                    <div className="w-full">
                        <label htmlFor="class-section" className="block text-xs font-[500] mb-2 text-light">Course Title</label>
                        <input type="text" value={searchTerm} placeholder="e.g accounting/math" className={`${formStyled} rounded outline-none`} onChange={e => setSearchTerm(e.target.value)} required />
                    </div>
                </div>

            </div>

            <div id="classes-container" className={`grid ${loading ? 'grid-cols-1' : 'grid-cols-2'} md:grid-cols-1 gap-4 max-w-[800px] w-full p-8 mt-4 sm:p-2 z-[.2] rounded ${darkMode ? "bg-[#F8F8FF]" : " text-fontDarkMode"}`}>
                {loading ? (
                    // Render loading spinner if loading is true
                    <div className="w-full flex justify-center items-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-bgGrayBtn"></div>
                    </div>
                ) : (
                    searchTerm.length < 3 ? (
                        <div className="w-full"><span className="text-center">Minimum of 3 characters required</span></div>
                    ) : filteredCourseData.length < 1 ? (
                        "No courses found"
                    ) : (
                        displayedCourses // Render only the courses up to the display count
                    )
                )}
            </div>

            {loading === false && searchTerm.length >= 3 && filteredCourseData.length > displayMore && (
                <div className="text-center mt-4">
                    <button className={`${buttonStyled} px-4 bg-primary text-light`} onClick={() => setDisplayMore(prev => prev += 6)}>
                        Load More
                    </button>
                </div>
            )}
        </section>
    )
}

export default Form;
