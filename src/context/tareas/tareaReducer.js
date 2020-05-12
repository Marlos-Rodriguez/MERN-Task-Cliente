import {
  TAREAS_PROYECTO,
  AGREGAR_TAREA,
  VALIDAR_TAREA,
  ELIMINAR_TAREA,
  TAREA_ACTUAL,
  ACTUALIZAR_TAREA,
  LIMPIAR_TAREA,
} from "../../types/index";

export default (state, action) => {
  switch (action.type) {
    case TAREAS_PROYECTO:
      return {
        ...state,
        tareasProyecto: action.payload,
      };
    case AGREGAR_TAREA:
      return {
        ...state,
        tareasProyecto: [action.payload, ...state.tareasProyecto],
        errortarea: false,
      };
    case VALIDAR_TAREA:
      return {
        ...state,
        errortarea: true,
      };
    case ELIMINAR_TAREA:
      return {
        ...state,
        tareasProyecto: state.tareasProyecto.filter(
          (tarea) => tarea._id !== action.payload
        ),
      };
    case ACTUALIZAR_TAREA:
      return {
        ...state,
        tareasProyecto: state.tareasProyecto.map((tarea) =>
          tarea._id === action.payload._id ? action.payload : tarea
        ),
        //eslint-disable-next-line
      };
    case TAREA_ACTUAL:
      return {
        ...state,
        tareaseleccionada: action.payload,
      };
    case LIMPIAR_TAREA:
      return {
        ...state,
        tareaseleccionada: null,
      };
    default:
      return state;
  }
};
