import React, { Fragment, useState, useContext } from "react";

import ProyectoContext from "../../context/proyectos/proyectoContext";

const NuevoProyecto = () => {
  //Obtener el State del Formulario

  const proyectosContext = useContext(ProyectoContext);
  const {
    formulario,
    errorformulario,
    mostrarFormulario,
    agregarProyecto,
    mostrarError,
  } = proyectosContext;

  //State para proyecto

  const [proyecto, guardarProyecto] = useState({
    nombre: "",
  });

  //lee los contenidos del input
  const onChangeProyecto = (e) => {
    guardarProyecto({
      ...proyecto,
      [e.target.name]: e.target.value,
    });
  };

  //Extaer nombre de proyecto
  const { nombre } = proyecto;

  //Cuando el Usuario envia un proyecto
  const onSubmitProyecto = (e) => {
    e.preventDefault();

    //validar proyecto
    if (nombre === "") {
      mostrarError();
      return;
    }

    //Agregar al State
    agregarProyecto(proyecto);

    //Reiniciar el form
    guardarProyecto({ nombre: "" });
  };

  return (
    <Fragment>
      <button
        type="button"
        className="btn btn-block btn-primario"
        onClick={() => mostrarFormulario()}
      >
        Nuevo Proyecto
      </button>
      {formulario ? (
        <form className="formulario-nuevo-proyecto" onSubmit={onSubmitProyecto}>
          <input
            type="text"
            className="input-text"
            placeholder="Nombre Proyecto"
            name="nombre"
            value={nombre}
            onChange={onChangeProyecto}
          />
          <input
            type="submit"
            className="btn btn-primario btn-block"
            value="Agregar proyecto"
          />
        </form>
      ) : null}

      {errorformulario ? (
        <p className="mensaje error">El nombre del Proyecto es obligatorio</p>
      ) : null}
    </Fragment>
  );
};

export default NuevoProyecto;
