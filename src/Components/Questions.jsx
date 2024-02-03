import React, { useState } from "react";
import { headerText, sectionWidth } from "../styles";
import { HiOutlineChevronDown,HiOutlineChevronUp } from "react-icons/hi";
import { DarkContext } from '../App'
import { useContext } from 'react'


const accordionArr = [
  {
    id: 1,
    details: "What is Snipe?",
    summary: "Snipe is a platform where you watch your classes.",
  },
  {
    id: 2,
    details: "How does it work?",
    summary: "It works by providing a platform to watch your classes online.",
  },
  {
    id: 3,
    details: "Is it free?",
    summary: "Yes, Snipe is a free platform for watching classes.",
  },
];

const Questions = () => {

  const {darkMode} = useContext(DarkContext)

  const [accordions, setAccordions] = useState(
    accordionArr.map((accordion) => ({
      ...accordion,
      isOpen: false,
    }))
  );

  const toggleAccordion = (accordionId) => {
    setAccordions((prevAccordions) =>
      prevAccordions.map((accordion) =>
        accordion.id === accordionId
          ? { ...accordion, isOpen: !accordion.isOpen }
          : accordion
      )
    );
  };

  return (
    <section
      id="questions-section"
      className={`${sectionWidth} h-[90svh] md:h-auto md:pt-12 flex flex-col justify-center items-center`}
    >

    <div className={`max-w-[1000px] w-full ${darkMode ? "" : "text-fontDarkMode"}`}>
      <h2 className={`${headerText} pb-4`}>FAQs</h2>

      <div id="accordion-container" className="w-full flex flex-col gap-4">
        {accordions.map((accordion) => (
          <div key={accordion.id} id="accordion" className={`overflow-y-hidden rounded-[20px] ${darkMode ? "bg-light" : "bg-bgDarkSecondary"}`}>
            <div id="details" className="flex justify-between items-center p-4 font-[500]">
              <div className=''>{accordion.details}</div>
              <div>
                <button className = 'text-2xl' onClick={() => toggleAccordion(accordion.id)}>
                  {accordion.isOpen ? <HiOutlineChevronUp/>: <HiOutlineChevronDown/>}
                </button>
              </div>
            </div>

            <p id="summary" className={`${accordion.isOpen ? "open" : "close"} ${darkMode == false ? "text-fontDarkMode" : "text-[rgba(0,0,0,.75)]"} p-4`}>
              {accordion.summary}
            </p>
          </div>
        ))}
      </div>
    </div>
    </section>
  );
};

export default Questions;