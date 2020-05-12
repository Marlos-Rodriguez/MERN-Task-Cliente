import React, { useReducer } from "react";

import proyectoContext from "./proyectoContext";
import proyectoReducer from "./proyectoReducer";

import clienteAxios from "../../config/axios";

import {
  FORMULARIO_PROYECTO,
  OBTENER_PROYECTOS,
  AGREGAR_PROYECTO,
  VALIDAR_FORMULARIO,
  PROYECTO_ACTUAL,
  ELIMINAR_PROYECTO,
  ERROR_PROYECTO,
} from "../../types/index";

const ProyectoState = (props) => {
  const initialState = {
    proyectos: [],
    formulario: false,
    errorformulario: false,
    proyecto: null,
    mensaje: null,
  };
  //Dispatch para ejecutar las acciones
  const [state, dispatch] = useReducer(proyectoReducer, initialState);

  //Serie de Funciones para el CRUD
  const mostrarFormulario = () => {
    dispatch({
      type: FORMULARIO_PROYECTO,
    });
  };

  //Obtener los proyectos
  const obtenerProyectos = async () => {
    try {
      const resultado = await clienteAxios.get("/api/proyectos");

      dispatch({ type: OBTENER_PROYECTOS, payload: resultado.data.proyectos });
    } catch (error) {
      const alerta = {
        msg: "Hubo un Error",
        categoria: "alerta-error",
      };
      dispatch({
        type: ERROR_PROYECTO,
        payload: alerta,
      });
    }
  };

  //Agregar nuevo Proyecto
  const agregarProyecto = async (proyecto) => {
    try {
      const resultado = await clienteAxios.post("/api/proyectos", proyecto);
      console.log(resultado.data);

      //Insertar el proyecto en el State
      dispatch({
        type: AGREGAR_PROYECTO,
        payload: resultado.data,
      });
    } catch (error) {
      const alerta = {
        msg: "Hubo un Error",
        categoria: "alerta-error",
      };
      dispatch({
        type: ERROR_PROYECTO,
        payload: alerta,
      });
    }
  };

  //validar Formulario por errores
  const mostrarError = () => {
    dispatch({ type: VALIDAR_FORMULARIO });
  };

  //selecciona el proyecto que el usuario dio clikc
  const proyectoActual = (proyectoId) => {
    dispatch({
      type: PROYECTO_ACTUAL,
      payload: proyectoId,
    });
  };

  //Elimina Un proyecto
  const eliminarProyecto = async (proyectoId) => {
    try {
      await clienteAxios.delete(`/api/proyectos/${proyectoId}`);
      dispatch({
        type: ELIMINAR_PROYECTO,
        payload: proyectoId,
      });
    } catch (error) {
      const alerta = {
        msg: "Hubo un Error",
        categoria: "alerta-error",
      };
      dispatch({
        type: ERROR_PROYECTO,
        payload: alerta,
      });
    }
  };
  return (
    <proyectoContext.Provider
      value={{
        proyectos: state.proyectos,
        formulario: state.formulario,
        errorformulario: state.errorformulario,
        proyecto: state.proyecto,
        mensaje: state.mensaje,
        mostrarFormulario,
        obtenerProyectos,
        agregarProyecto,
        mostrarError,
        proyectoActual,
        eliminarProyecto,
      }}
    >
      {props.children}
    </proyectoContext.Provider>
  );
};

export default ProyectoState;
