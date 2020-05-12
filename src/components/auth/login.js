import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import AlertaContext from "../../context/alertas/alertaContext";
import AuthContext from "../../context/autentificacion/authContext";

const Login = (props) => {
  //Extraer los valores del context de alerta
  const alertaContext = useContext(AlertaContext);
  const { alerta, mostrarAlerta } = alertaContext;

  //Extraer los valores del context de autentificacion
  const authContext = useContext(AuthContext);
  const { mensaje, autenticado, initciarSesion } = authContext;

  //En caso de que el password o usuario no exista
  useEffect(() => {
    if (autenticado) {
      props.history.push("/proyectos");
    }
    if (mensaje) {
      mostrarAlerta(mensaje.msg, mensaje.categoria);
    }
    // eslint-disable-next-line
  }, [mensaje, autenticado, props.history]);

  //State de Iniciar Sesion
  const [usuario, guardarUsuario] = useState({
    email: "",
    password: "",
  });

  //extraer de usuario
  const { email, password } = usuario;

  const onChage = (e) => {
    guardarUsuario({
      ...usuario,
      [e.target.name]: e.target.value,
    });
  };

  //cuando el usuario quiere iniciar sesion
  const onSubmit = (e) => {
    e.preventDefault();

    //Validar que no haya campos vacios
    if (email.trim() === "" || password.trim() === "") {
      mostrarAlerta("Todos los campos son obligatorios", "alerta-error");
      return;
    }

    //Pasarlo al action
    initciarSesion({ email, password });
  };

  return (
    <div className="form-usuario">
      {alerta ? (
        <div className={`alerta ${alerta.categoria}`}>{alerta.msg}</div>
      ) : null}
      <div className="contenedor-form sombra-dark">
        <h1>iniciar Sesion</h1>
        <form onSubmit={onSubmit}>
          <div className="campo-form">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Tu Email"
              value={email}
              onChange={onChage}
            />
          </div>
          <div className="campo-form">
            <label htmlFor="email">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Tu Password"
              value={password}
              onChange={onChage}
            />
          </div>

          <div className="campo-form">
            <input
              type="submit"
              className="btn btn-primario btn-block"
              value="Iniciar Sesion"
            />
          </div>
        </form>
        <Link to={"/nueva-cuenta"} className="enlace-cuenta">
          Obtener Cuenta
        </Link>
      </div>
    </div>
  );
};

export default Login;
