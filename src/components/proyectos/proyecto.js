import React, { useContext } from "react";

import ProyectoContext from "../../context/proyectos/proyectoContext";
import TareaContext from "../../context/tareas/tareaContext";

const Proyecto = ({ proyecto }) => {
  //Obtener State de proyectos
  const proyectosContext = useContext(ProyectoContext);
  const { proyectoActual } = proyectosContext;

  //Obtener la funcion de context Tareas
  const tareasContext = useContext(TareaContext);
  const { obtenerTareas } = tareasContext;

  //Funcion para agregar el proyecto Actual
  const seleccionarProyecto = (id) => {
    proyectoActual(id); //Fijar un proyecto Actual
    obtenerTareas(id);
  };

  return (
    <li>
      <button
        type="button"
        className="btn btn-blank"
        onClick={() => seleccionarProyecto(proyecto._id)}
      >
        {proyecto.nombre}
      </button>
    </li>
  );
};

export default Proyecto;
