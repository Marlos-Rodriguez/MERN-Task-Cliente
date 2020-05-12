import React, { useReducer } from "react";
import AuthContext from "./authContext";
import AuthReducer from "./authReducer";

import clienteAxios from "../../config/axios";
import tokenAuth from "../../config/tokenAuth";

import {
  REGISTRO_EXISTOSO,
  REGISTRO_ERROR,
  OBTENER_USUARIO,
  LOGIN_EXISTOSO,
  LOGIN_ERROR,
  CERRAR_SESION,
} from "../../types/index";

const AuthState = (props) => {
  const initialState = {
    token: localStorage.getItem("token"),
    autenticado: null,
    usuario: null,
    mensaje: null,
    cargando: true,
  };
  const [state, dispatch] = useReducer(AuthReducer, initialState);

  //Las Funciones
  const registrarUsuario = async (datos) => {
    try {
      const respuesta = await clienteAxios.post("/api/usuarios", datos);
      console.log(respuesta);

      dispatch({
        type: REGISTRO_EXISTOSO,
        payload: respuesta.data,
      });

      //Obtener el usuario
      usuarioAutenticado();
    } catch (error) {
      //console.log(error.response.data.msg);
      const alerta = {
        msg: error.response.data.msg,
        categoria: "alerta-error",
      };
      dispatch({
        type: REGISTRO_ERROR,
        payload: alerta,
      });
    }
  };

  //Retorna el usuario autentificado
  const usuarioAutenticado = async () => {
    const token = localStorage.getItem("token");
    if (token) {
      //TODO: Funcion para enviar el token para headers
      tokenAuth(token);
    }
    try {
      const respuesta = await clienteAxios.get("/api/auth");

      dispatch({
        type: OBTENER_USUARIO,
        payload: respuesta.data.usuario,
      });
    } catch (error) {
      console.log(error.response);
      dispatch({
        type: LOGIN_ERROR,
      });
    }
  };

  //Cuando el usuario Inicia Sesion
  const initciarSesion = async (datos) => {
    try {
      const respuesta = await clienteAxios.post("api/auth", datos);

      dispatch({
        type: LOGIN_EXISTOSO,
        payload: respuesta.data,
      });

      //Obtener usuario
      usuarioAutenticado();
    } catch (error) {
      console.log(error.response.data.msg);
      const alerta = {
        msg: error.response.data.msg,
        categoria: "alerta-error",
      };
      dispatch({
        type: LOGIN_ERROR,
        payload: alerta,
      });
    }
  };

  //Cierra la sesion dle usuario
  const cerrarSesion = () => {
    dispatch({
      type: CERRAR_SESION,
    });
  };

  return (
    <AuthContext.Provider
      value={{
        token: state.token,
        autenticado: state.autenticado,
        usuario: state.usuario,
        mensaje: state.mensaje,
        cargando: state.cargando,
        registrarUsuario,
        initciarSesion,
        usuarioAutenticado,
        cerrarSesion,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
