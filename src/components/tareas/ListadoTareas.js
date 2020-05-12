import React, { Fragment, useContext } from "react";

import ProyectoContext from "../../context/proyectos/proyectoContext";

import TareaContext from "../../context/tareas/tareaContext";

import Tarea from "./Tarea";

import { CSSTransition, TransitionGroup } from "react-transition-group";

const ListadoTareas = () => {
  //Extraer el State inicial
  const proyectosContext = useContext(ProyectoContext);
  const { proyecto, eliminarProyecto } = proyectosContext;

  //Obtener las tareas de context Tareas
  const tareasContext = useContext(TareaContext);
  const { tareasProyecto } = tareasContext;

  //Si no hay proyecto seleccionado
  if (!proyecto) return <h2>Selecciona un Proyecto </h2>;

  //Array Destructuring para extraer el proyecto actual
  const [proyectoActual] = proyecto;

  //Eliminar un proyecto
  const onClickEliminar = () => {
    eliminarProyecto(proyectoActual._id);
  };

  return (
    <Fragment>
      <h2>Proyecto: {proyectoActual.nombre}</h2>
      <ul className="listado-tareas">
        {tareasProyecto.length === 0 ? (
          <li className="tarea">
            <p>No Hay Tareas</p>
          </li>
        ) : (
          <TransitionGroup>
            {tareasProyecto.map((tarea) => (
              <CSSTransition key={tarea._id} timeout={200} classNames="tarea">
                <Tarea tarea={tarea} />
              </CSSTransition>
            ))}
          </TransitionGroup>
        )}
      </ul>
      <button
        type="button"
        className="btn btn-eliminar"
        onClick={onClickEliminar}
      >
        Eliminar Proyecto &times;
      </button>
    </Fragment>
  );
};

export default ListadoTareas;
