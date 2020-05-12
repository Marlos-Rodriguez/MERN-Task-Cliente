import React, { useContext, useEffect } from "react";

import AuthContext from "../../context/autentificacion/authContext";

const Barra = () => {
  //Extraer la informacion de autentificion
  const authContext = useContext(AuthContext);
  const { usuario, usuarioAutenticado, cerrarSesion } = authContext;

  useEffect(() => {
    usuarioAutenticado();
    //eslint-disable-next-line
  }, []);
  return (
    <header className="app-header">
      {usuario ? (
        <p className="nombre-usuario">
          Hola <span>{usuario.nombre}</span>
        </p>
      ) : null}

      <header className="nav-principal">
        <button
          className="btn btn-blank cerrar-sesion"
          onClick={() => cerrarSesion()}
        >
          Cerrar Sesion
        </button>
      </header>
    </header>
  );
};

export default Barra;
