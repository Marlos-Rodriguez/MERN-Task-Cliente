import React, { useContext, useState, useEffect } from "react";

import ProyectoContext from "../../context/proyectos/proyectoContext";
import TareaContext from "../../context/tareas/tareaContext";

const FormTarea = () => {
  //Extraer el State inicial
  const proyectosContext = useContext(ProyectoContext);
  const { proyecto } = proyectosContext;

  //Obtener la funcion de context Tareas
  const tareasContext = useContext(TareaContext);
  const {
    errortarea,
    tareaseleccionada,
    agregarTarea,
    validarTarea,
    obtenerTareas,
    actualizarTarea,
    limpiarTarea,
  } = tareasContext;

  //Effect para tarea seleccionada
  useEffect(() => {
    if (tareaseleccionada !== null) {
      guardarTarea(tareaseleccionada);
    } else {
      guardarTarea({
        nombre: "",
      });
    }
  }, [tareaseleccionada]);

  //State del formulario
  const [tarea, guardarTarea] = useState({
    nombre: "",
  });

  //extraer el nombre del proyecto
  const { nombre } = tarea;

  //Si no hay un proyecto seleccionado
  if (!proyecto) return null;

  //Array destructuring para extraer el proyecto Actual
  const [proyectoActual] = proyecto;

  //leer los valores del formulario
  const handleChange = (e) => {
    guardarTarea({
      ...tarea,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    //validar
    if (nombre.trim() === "") {
      validarTarea();
      return;
    }

    //Si es edicion o nueva tarea
    if (tareaseleccionada === null) {
      //agregar la nueva tarea al state de tareas
      tarea.proyecto = proyectoActual._id;
      agregarTarea(tarea);
    } else {
      //Actualizar tarea existente
      actualizarTarea(tarea);

      //Elimina tareaseleccionada del state
      limpiarTarea();
    }

    //Obtener y filtrar las tareas del proyecto actual
    obtenerTareas(proyectoActual.id);

    //reiniciar el formulario
    guardarTarea({
      nombre: "",
    });
  };

  return (
    <div className="formulario">
      <form onSubmit={onSubmit}>
        <div className="contenedor-input">
          <input
            type="text"
            className="input-text"
            placeholder="Nombre tarea"
            name="nombre"
            value={nombre}
            onChange={handleChange}
          />
        </div>
        <div className="contenedor-input">
          <input
            type="submit"
            className="btn btn-primario btn-submit btn-block"
            value={tareaseleccionada ? "Editar Tarea" : "Agregar Tarea"}
          />
        </div>
      </form>
      {errortarea ? (
        <p className="mensaje error">El nombre de la tarea es obligatorio</p>
      ) : null}
    </div>
  );
};

export default FormTarea;
