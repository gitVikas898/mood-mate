import React from "react";

const Popup = () => {
  return (
    <div  className="fixed bottom-6 right-6 bg-green-500 text-white px-6 py-3 rounded-md shadow-lg 
    transition-all duration-500 transform opacity-100 translate-y-0">
      Mood saved successfully! 🎉
    </div>
  );
};

export default Popup;
