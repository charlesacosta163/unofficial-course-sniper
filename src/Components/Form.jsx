import { useContext, useState, useEffect } from "react";
import { Link } from 'react-router-dom'
import { ArrayContext } from "../App";
import { DarkContext } from "../App";

import Class from "../Items/Class";
import Entry from "../Items/Entry";

import { showBorder, formStyled, buttonStyled, sectionWidth, headerText } from "../styles"

import { FaArrowLeft } from "react-icons/fa6";

const Form = () => {
    const { darkMode } = useContext(DarkContext);
    const { classes, setClasses } = useContext(ArrayContext);

    const [selectedTerm, setSelectedTerm] = useState('fall');
    const [selectedDept, setSelectedDept] = useState('')
    const [filteredCourseData, setFilteredCourseData] = useState([]);

    const [searchTerm, setSearchTerm] = useState('')

    useEffect(() => {
        fetch(`../src/data.json`)
            .then(res => res.json())
            .then(data => {

                const filteredTerm = data.filter(course => course.term.toLowerCase().includes(selectedTerm.toLowerCase()));
                const filteredSection = filteredTerm.filter(course => course.title.toLowerCase().includes(selectedDept.toLowerCase()));
                const filteredBySearch = filteredSection.filter(course => {
                    return course.title.toLowerCase().includes(searchTerm.toLowerCase());
                });
                const mappedFilteredCourseData = filteredBySearch.map((course, index) => (
                    <Class
                        key={index}
                        id= {course.id}
                        sectionName={course.sectionName}
                        title={course.title}
                        startDate={course.startDate}
                        availableSeats={course.availableSeats}
                        term={course.term}
                        faculty={course.faculty}
                        handleAddEntry={handleAddEntry}
                    />
                ));

                setFilteredCourseData(mappedFilteredCourseData);
            })
            .catch(error => {
                console.error('Error fetching courses:', error);
            });
    }, [selectedTerm, selectedDept, searchTerm]);

    const handleAddEntry = (sectionName, professor, id, title, startDate, seats) => {
        const [ name, section, number ] = sectionName.split('-')
        console.log(classes)

        setClasses(prevClasses => [
            ...prevClasses, {
                id: id,
                code: name,
                section: section,
                number: number,
                professor: professor,
                courseName: title,
                startDate: startDate,
                availableSeats: seats
            }])
    }

    return (
        <section id="form-section" className={`${sectionWidth} h-auto flex flex-col items-center`}>

            <div id="form-container" className={`max-w-[738px] w-full p-8 z-[.2] rounded ${darkMode ? "bg-green" : "bg-primary"}`}>

                <Link to="/">
                    <div className="pb-4 sm:pb-2 text-[1.5rem] inline-block text-light"><FaArrowLeft /></div>
                </Link>
                <h1 className={`text-center ${headerText} mb-8 text-light`}>Snipe A Class</h1>

                <div id="forms" className={`flex flex-col gap-4 text-dark`}>
                    <div className="select flex justify-between">

                        <div className="text-dark">
                            <label htmlFor="term" className="block text-xs font-[500] mb-2 text-light">Term</label>
                            <select name="terms" value={selectedTerm} id="" onChange={e => setSelectedTerm(e.target.value)} className="rounded">
                                <option value="fall">Fall 2023</option>
                                <option value="spring">Spring 2024</option>
                            </select>
                        </div>

                        <div className={`text-dark`}>
                            <label htmlFor="term" className="block text-xs font-[500] mb-2 text-light">Department</label>
                            <select name="terms" value={selectedDept} id="" onChange={e => setSelectedDept(e.target.value)} className="rounded">
                                <option value="">All</option>
                                <option value="art">Art</option>
                                <option value="accounting">Accounting</option>
                                <option value="biology">Biology</option>
                                <option value="chemistry">Chemistry</option>
                                <option value="computer">Computer</option>
                                <option value="history">History</option>
                                <option value="math">Mathematics</option>
                                <option value="business">Business</option>
                                <option value="criminal">Criminal Justice</option>
                            </select>
                        </div>
                    </div>

                    <div className="w-full">
                        <label htmlFor="class-section" className="block text-xs font-[500] mb-2 text-light">Course Title</label>
                        <input type="text" value={searchTerm} placeholder="e.g accounting/math" className={`${formStyled} rounded outline-none`} onChange={e => setSearchTerm(e.target.value)} required />

                    </div>
                </div>

            </div>

            <div id="classes-container" className={`grid grid-cols-2 md:grid-cols-1 gap-4 max-w-[800px] w-full p-8 mt-4 sm:p-2 z-[.2] rounded ${darkMode ? "bg-[#F8F8FF]" : " text-fontDarkMode"}`}>
                {filteredCourseData.length === 0 ? <span className="text-center">No classes found, try again.</span> : filteredCourseData}
            </div>
        </section>
    )
}

export default Form;



