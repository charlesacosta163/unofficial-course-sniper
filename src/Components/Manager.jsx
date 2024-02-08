import { sectionWidth, showBorder, buttonStyled } from "../styles";
import Entry from "../Items/Entry";
import { ArrayContext } from "../App";
import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { HiOutlineTrash } from "react-icons/hi";
import { FaQuestion } from "react-icons/fa";

const Manager = () => {
  const { classes, setClasses } = useContext(ArrayContext);
  const [selectedEntries, setSelectedEntries] = useState([]);

  const handleCheckboxChange = (id) => {
    if (selectedEntries.includes(id)) {
      setSelectedEntries((prev) => prev.filter((entryId) => entryId !== id));
    } else {
      setSelectedEntries((prev) => [...prev, id]);
    }
  };

  const handleRemoveSelected = () => {
    setClasses((prevClasses) =>
      prevClasses.filter((_, index) => !selectedEntries.includes(index))
    );
    setSelectedEntries([]);
  };

  const allClassData = classes.map((e, i) => {
    return (
      <Entry
        key={i}
        id={i}
        code={e.code}
        section={e.section}
        number={e.number}
        professor={e.professor}
        courseName={e.courseName}
        startDate={e.startDate}
        seats={e.availableSeats}
        isSelected={selectedEntries.includes(i)}
        onCheckboxChange={handleCheckboxChange}
      />
    );
  });

  return (
    <section
      id="manager-section"
      className={`h-auto md:h-auto flex justify-center items-center ${sectionWidth}`}
    >
      <div id="manager-container" className={`w-full flex flex-col items-center`}>
        <div
          id="grid-title"
          className="flex gap-2 items-center text-center md:text-[.7rem] mb-4 bg-green rounded w-full"
        >
          <div className="flex justify-center items-center py-2 uppercase text-light font-bold flex-[1]">
            {allClassData.length === 0 ? (
              <span className="invisible">.</span>
            ) : (
              <button
                onClick={handleRemoveSelected}
                className="text-[1.25rem] sm:text-[1rem]"
              >
                <HiOutlineTrash />
              </button>
            )}
          </div>
          <div className="py-2 uppercase text-light font-bold flex-[2]">Class</div>
          <div className="py-2 uppercase text-light font-bold flex-[2]">Section</div>
          <div className="py-2 uppercase text-light font-bold flex-[2]">Number</div>
          <div className="py-2 uppercase text-light font-bold flex-[4]">Professor</div>
        </div>

        <div
          id="grid-classes"
          className="flex gap-2 flex-col text-center md:text-[.75rem] w-full"
        >
          {allClassData}
        </div>

        {classes.length == 0 ? (
          <div className="py-8 flex flex-col items-center">
            <img
              src="https://evie.undraw.co/images/undraw_creation.svg"
              alt=""
              width="150"
            />
            <div className="font-[500] text-green mt-2">
              Consider Adding Classes?
            </div>
          </div>
        ) : (
          ""
        )}

        <div className="max-w-[500px] w-full text-center mt-4">
          <Link to="/form">
            <button className={`${buttonStyled} bg-primary text-light`}>
              Add More Classes
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Manager;
