import React from "react";

const Timeline = ({ timeline }) => {
  return (
    <div className="space-y-4">
      {timeline.map((event, index) => (
        <div key={index} className="flex items-center">
          <div
            className={`w-6 h-6 rounded-full ${
              event.status === "completed" ? "bg-green-500" : event.status === "in-progress" ? "bg-yellow-500" : "bg-red-500"
            }`}
          ></div>
          <div className="ml-4">
            <p className="font-semibold">{event.label}</p>
            <p>{event.date}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Timeline;
