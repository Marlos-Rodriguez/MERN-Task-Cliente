import React, { useContext, useEffect } from "react";
import Proyecto from "./proyecto";
import ProyectoContext from "../../context/proyectos/proyectoContext";
import AlertaContext from "../../context/alertas/alertaContext";
import { TransitionGroup, CSSTransition } from "react-transition-group";

const ListadoProyectos = () => {
  //Extraer proyectos de state inicial
  const proyectosContext = useContext(ProyectoContext);
  const { proyectos, mensaje, obtenerProyectos } = proyectosContext;

  const alertaContext = useContext(AlertaContext);
  const { alerta, mostrarAlerta } = alertaContext;

  //Obtener proyectos al inicio del componente
  useEffect(() => {
    //Si hay un error
    if (mensaje) {
      mostrarAlerta(mensaje.msg, mensaje.categoria);
    }
    obtenerProyectos();
    // eslint-disable-next-line
  }, [mensaje]);

  //Si Hay proyectos
  if (proyectos.lenght === 0) return <p>No hay Proyectos</p>;

  return (
    <ul className="listado-proyectos">
      {alerta ? (
        <div className={`alerta ${alerta.categoria}`}>{alerta.msg}</div>
      ) : null}
      <TransitionGroup>
        {proyectos.map((proyecto) => (
          <CSSTransition key={proyecto._id} timeout={200} classNames="proyecto">
            <Proyecto proyecto={proyecto} />
          </CSSTransition>
        ))}
      </TransitionGroup>
    </ul>
  );
};

export default ListadoProyectos;
