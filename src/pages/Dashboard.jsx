import React, { useState, useEffect } from "react";
import StatCard from "../components/StatCard";
import EmailTable from "../components/EmailTable";
import { InteractiveHoverButton } from "../components/magicui/interactive-hover-button";

function Dashboard() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    return (
      <div className="p-6 flex-1">
        <h1 className="text-3xl font-bold">Bienvenido, {user ? user.usuario : "Usuario"}</h1>

        <div className="mt-4  flex space-x-2">
        <InteractiveHoverButton size="sm">Filtro 1</InteractiveHoverButton>
        <InteractiveHoverButton size="sm">Filtro 2</InteractiveHoverButton>
        <InteractiveHoverButton size="sm">Filtro 3</InteractiveHoverButton>
        <InteractiveHoverButton size="sm">Filtro 4</InteractiveHoverButton>
        </div>
  
        {/* Sección de estadísticas */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mt-4 w-full">
        <StatCard title="Facturas recibidas" value="789" percentage="100%" icon="📧" color="blue" />
          <StatCard title="Confirmadas" value="671" percentage="100%" icon="🔆" color="orange" />
          <StatCard title="Ingresadas" value="83" percentage="100%" icon="🛒" color="purple" />
        </div>
  
        {/* Tabla de últimos emails */}
        <div className="mt-6">
          <h2 className="text-xl font-semibold">Ultimos pedidos</h2>
          <EmailTable />
        </div>
      </div>
    );
  }

export default Dashboard;
