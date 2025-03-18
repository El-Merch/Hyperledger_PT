import React from "react";

const Timeline = ({ timeline }) => {
  return (
    <div className="relative">
      {/* Línea vertical en el centro */}
      <div className="space-y-6">
        {timeline.map((event, index) => (
          <div key={index} className="flex items-center justify-start space-x-4">
            {/* Números a la izquierda */}
            <div className="flex items-center justify-center w-8 h-8 text-white bg-gray-700 rounded-full">
              {index + 1}
            </div>

            {/* Contenido de la Línea de Tiempo */}
            <div className="flex-1">
              <div className="text-sm font-semibold">{event.label}</div>
              <div className="text-xs text-gray-500">{event.date}</div>
            </div>

            {/* Punto de la Línea de Tiempo */}
            <div className={`w-6 h-6 rounded-full border-4 ${
              event.status === "completed" ? "bg-green-500 border-green-500" : 
              event.status === "in-progress" ? "bg-yellow-500 border-yellow-500" : 
              "bg-red-500 border-red-500"
            }`}>
              <div className="w-4 h-4 bg-white rounded-full animate-ping"></div> {/* Efecto de ping */}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Timeline;
