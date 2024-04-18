import React, { useState } from 'react';
import { sectionWidth, headerText } from '../styles';
import { HiOutlineXMark } from 'react-icons/hi2';

import { DarkContext, NotifsContext } from '../App';
import { useContext } from 'react';


const Notifications = () => {
    const { darkMode } = useContext(DarkContext);
    const { notifications, setNotifications } = useContext(NotifsContext)
  const handleDelete = (id) => {
    const updatedNotifs = notifications.filter((_, index) => index !== id);
    setNotifications(updatedNotifs);
  };

  const notifsData = notifications.map((message, id) => {
    return <Notif key={id} id={id} message={message} onDelete={() => handleDelete(id)} />;
  });

  return (
    <section id="notifs-section" className={`${sectionWidth} pt-16 sm:pt-8 h-auto flex flex-col justify-center items-left ${darkMode == false && "text-fontDarkMode"}`}>
      <h1 className={`${headerText} text-left pb-8`}>Your Feed</h1>
      <div id="notifs-container" className={`flex flex-col gap-4 w-full rounded`}>
        {notifications.length === 0 ? 'You have no notifications' : notifsData}
      </div>
    </section>
  );
};

export default Notifications;

export const Notif = ({ id, message, onDelete }) => {
    const { darkMode } = useContext(DarkContext);

  return (
    <div id="notif" className={`flex justify-between items-center py-2 px-4 rounded ${darkMode ? "bg-accent" : "bg-accent text-fontDarkMode"}`}>
      <div className='text-light'>{message}</div>
      <div className="text-[1.5rem] text-light" onClick={onDelete}>
        <HiOutlineXMark />
      </div>

    </div>
  );
};