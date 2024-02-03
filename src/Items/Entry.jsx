import { DarkContext } from "../App";
import { useContext } from "react";

const Entry = ({ id, code, section, number, isSelected, onCheckboxChange }) => {
    const {darkMode} = useContext(DarkContext)
    return (
        <div
            key={id}
            id="grid-entry"
            className={`${darkMode ? "bg-light" : "bg-dark [&>div]:text-fontDarkMode" } flex items-center gap-2 text-center md:text-[.75rem] w-full rounded`}
        >
            <div className="py-2 text-light font-bold flex-[1] flex items-center justify-center">
                <input
                    type="checkbox"
                    name="remove"
                    id=""
                    className="w-[20px] sm:w[15px] h-[20px] sm:h-[15px] border-none outline-none"
                    checked={isSelected}
                    onChange={() => onCheckboxChange(id)}
                />
            </div>
            <div className="py-2 text-dark flex-[2]">{code}</div>
            <div className="py-2 text-dark flex-[2]">{section}</div>
            <div className="py-2 text-dark flex-[2]">{number}</div>
            <div className="py-2 text-dark flex-[4]">John Doe</div>
        </div>
    );
};

export default Entry;
