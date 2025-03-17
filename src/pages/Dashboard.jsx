import StatCard from "../components/StatCard";
import EmailTable from "../components/EmailTable";
import { InteractiveHoverButton } from "../components/magicui/interactive-hover-button";

function Dashboard() {
    return (
      <div className="p-6 flex-1">
        <h1 className="text-3xl font-bold">Bienvenido, Francisco</h1>

        <div className="mt-4 ml-55 flex space-x-4">
        <InteractiveHoverButton>Filtro 1</InteractiveHoverButton>
        <InteractiveHoverButton>Filtro 2</InteractiveHoverButton>
        <InteractiveHoverButton>Filtro 3</InteractiveHoverButton>
        <InteractiveHoverButton>Filtro 4</InteractiveHoverButton>
        </div>
  
        {/* Sección de estadísticas */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
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
