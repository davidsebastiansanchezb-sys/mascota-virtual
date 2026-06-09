"use strict";

/* ==========================================================
   CONFIGURACIÓN GENERAL
   ========================================================== */

const CONFIGURACION = Object.freeze({
  cantidadArchivos: 3,

  // Las estadísticas se actualizan cada 12 segundos.
  tiempoActualizacion: 12000,

  // Bebé → joven después de 1 minuto.
  tiempoEtapaJoven: 60000,

  // Joven → adulta después de 2 minutos desde su creación.
  tiempoEtapaAdulta: 120000,

  valorInicial: 80,
  valorMinimo: 0,
  valorMaximo: 100,

  prefijoGuardado: "mascotaVirtual"
});

/* ==========================================================
   ETAPAS DE CRECIMIENTO
   ========================================================== */

const ETAPAS = Object.freeze({
  BEBE: "bebe",
  JOVEN: "joven",
  ADULTA: "adulta"
});

const ORDEN_ETAPAS = Object.freeze([
  ETAPAS.BEBE,
  ETAPAS.JOVEN,
  ETAPAS.ADULTA
]);

/* ==========================================================
   ESPECIES, IMÁGENES Y FONDOS

   Cada etapa tiene una imagen despierta y otra durmiendo.
   ========================================================== */

const ESPECIES = Object.freeze({
  agua: {
    nombre: "Agua",
    icono: "💧",

    imagenes: {
      bebe: {
        despierta: "img/mascota-agua.png",
        durmiendo: "img/dormir-agua-bebe.png"
      },

      joven: {
        despierta: "img/evolucion-agua.png",
        durmiendo: "img/dormir-agua-joven.png"
      },

      adulta: {
        despierta: "img/adulta-agua.png",
        durmiendo: "img/dormir-agua-adulta.png"
      }
    },

    fondoDia: "img/fondo-agua-dia.png",
    fondoNoche: "img/fondo-agua-noche.png"
  },

  desierto: {
    nombre: "Desierto",
    icono: "🏜️",

    imagenes: {
      bebe: {
        despierta: "img/mascota-desierto.png",
        durmiendo: "img/dormir-desierto-bebe.png"
      },

      joven: {
        despierta: "img/evolucion-desierto.png",
        durmiendo: "img/dormir-desierto-joven.png"
      },

      adulta: {
        despierta: "img/adulta-desierto.png",
        durmiendo: "img/dormir-desierto-adulta.png"
      }
    },

    fondoDia: "img/fondo-desierto-dia.png",
    fondoNoche: "img/fondo-desierto-noche.png"
  },

  volcan: {
    nombre: "Volcán",
    icono: "🌋",

    imagenes: {
      bebe: {
        despierta: "img/mascota-volcan.png",
        durmiendo: "img/dormir-volcan-bebe.png"
      },

      joven: {
        despierta: "img/evolucion-volcan.png",
        durmiendo: "img/dormir-volcan-joven.png"
      },

      adulta: {
        despierta: "img/adulta-volcan.png",
        durmiendo: "img/dormir-volcan-adulta.png"
      }
    },

    fondoDia: "img/fondo-volcan-dia.png",
    fondoNoche: "img/fondo-volcan-noche.png"
  }
});

/* ==========================================================
   MENSAJES
   ========================================================== */

const MENSAJES = Object.freeze({
  bienvenida: "¡Hola! Estoy feliz de conocerte.",

  comida: "¡Qué rico! Ahora tengo más comida.",
  dormir: "Estoy durmiendo... Zzz...",
  despertar: "¡Ya desperté! Tengo más energía.",
  jugar: "¡Qué divertido! Me encanta jugar.",

  feliz: "¡Estoy muy feliz!",
  normal: "Estoy bien. Gracias por cuidarme.",
  hambre: "Tengo hambre. Dame algo de comer.",
  cansancio: "Estoy muy cansado. Necesito dormir.",
  aburrimiento: "Estoy aburrido. Quiero jugar.",
  tristeza: "No me siento muy bien. Necesito cuidados.",

  noComerDurmiendo:
    "No puedo comer porque estoy durmiendo.",

  noJugarDurmiendo:
    "No puedo jugar porque estoy durmiendo.",

  primeroComer:
    "Primero necesito comer para poder jugar.",

  energiaInsuficiente:
    "No tengo suficiente energía para jugar.",

  evolucionJoven:
    "¡Tu mascota ha crecido! Ahora se encuentra en la etapa joven.",

  evolucionAdulta:
    "¡Tu mascota alcanzó la etapa adulta!",

  muerte:
    "La mascota se quedó sin cuidados. Debes borrar la partida y crear una nueva.",

  nombreVacio:
    "Escribe un nombre para tu mascota.",

  archivoVacio:
    "Este archivo de guardado está vacío.",

  confirmarBorrado:
    "¿Seguro que quieres borrar este archivo de guardado?",

  confirmarSobrescritura:
    "Este archivo ya contiene una mascota. ¿Quieres reemplazarla?"
});

/* ==========================================================
   ELEMENTOS DEL HTML
   ========================================================== */

const elementos = {
  pantallaInicio:
    document.getElementById("pantallaInicio"),

  pantallaJuego:
    document.getElementById("pantallaJuego"),

  nombreInput:
    document.getElementById("nombre"),

  tipoMascotaInput:
    document.getElementById("tipoMascota"),

  botonesTipo:
    document.querySelectorAll(".btn-tipo"),

  nombreMascota:
    document.getElementById("nombreMascota"),

  textoRanura:
    document.getElementById("textoRanura"),

  mensaje:
    document.getElementById("mensaje"),

  numComida:
    document.getElementById("numComida"),

  numEnergia:
    document.getElementById("numEnergia"),

  numDiversion:
    document.getElementById("numDiversion"),

  barComida:
    document.getElementById("barComida"),

  barEnergia:
    document.getElementById("barEnergia"),

  barDiversion:
    document.getElementById("barDiversion"),

  btnComer:
    document.getElementById("btnComer"),

  btnDormir:
    document.getElementById("btnDormir"),

  btnJugar:
    document.getElementById("btnJugar"),

  btnReiniciar:
    document.getElementById("btnReiniciar"),

  textoDormir:
    document.getElementById("textoDormir"),

  iconoDormir:
    document.getElementById("iconoDormir"),

  mascotaImagen:
    document.getElementById("mascota"),

  escenario:
    document.getElementById("escenario"),

  objeto:
    document.getElementById("objeto"),

  zzz:
    document.getElementById("zzz")
};

/* ==========================================================
   FUNCIONES AUXILIARES
   ========================================================== */

function limitar(valor) {
  return Math.max(
    CONFIGURACION.valorMinimo,
    Math.min(CONFIGURACION.valorMaximo, valor)
  );
}

function clonar(objeto) {
  if (typeof structuredClone === "function") {
    return structuredClone(objeto);
  }

  return JSON.parse(JSON.stringify(objeto));
}

function especieValida(tipo) {
  return Object.prototype.hasOwnProperty.call(
    ESPECIES,
    tipo
  );
}

function etapaValida(etapa) {
  return ORDEN_ETAPAS.includes(etapa);
}

function escaparHTML(texto) {
  return String(texto)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function obtenerNombreEtapa(etapa) {
  switch (etapa) {
    case ETAPAS.JOVEN:
      return "Joven";

    case ETAPAS.ADULTA:
      return "Adulta";

    case ETAPAS.BEBE:
    default:
      return "Bebé";
  }
}

/* ==========================================================
   PATRÓN MEMENTO

   Guarda una copia del estado de la mascota.
   ========================================================== */

class MascotaMemento {
  #estado;

  constructor(estado) {
    this.#estado = clonar(estado);
  }

  obtenerEstado() {
    return clonar(this.#estado);
  }
}

/* ==========================================================
   REPOSITORIO DE GUARDADO

   Administra tres archivos mediante localStorage.
   ========================================================== */

class RepositorioGuardado {
  #prefijo;
  #cantidadArchivos;

  constructor(prefijo, cantidadArchivos) {
    this.#prefijo = prefijo;
    this.#cantidadArchivos = cantidadArchivos;
  }

  #obtenerClave(numeroArchivo) {
    return `${this.#prefijo}_archivo_${numeroArchivo}`;
  }

  #archivoValido(numeroArchivo) {
    return (
      Number.isInteger(numeroArchivo) &&
      numeroArchivo >= 1 &&
      numeroArchivo <= this.#cantidadArchivos
    );
  }

  existe(numeroArchivo) {
    if (!this.#archivoValido(numeroArchivo)) {
      return false;
    }

    return (
      localStorage.getItem(
        this.#obtenerClave(numeroArchivo)
      ) !== null
    );
  }

  guardar(mascota) {
    const numeroArchivo = mascota.numeroArchivo;

    if (!this.#archivoValido(numeroArchivo)) {
      return;
    }

    const memento = mascota.crearMemento();

    localStorage.setItem(
      this.#obtenerClave(numeroArchivo),
      JSON.stringify(memento.obtenerEstado())
    );
  }

  cargar(numeroArchivo) {
    if (!this.#archivoValido(numeroArchivo)) {
      return null;
    }

    const datosGuardados = localStorage.getItem(
      this.#obtenerClave(numeroArchivo)
    );

    if (!datosGuardados) {
      return null;
    }

    try {
      return new MascotaMemento(
        JSON.parse(datosGuardados)
      );
    } catch (error) {
      console.error(
        "No se pudo cargar la partida:",
        error
      );

      return null;
    }
  }

  borrar(numeroArchivo) {
    if (!this.#archivoValido(numeroArchivo)) {
      return;
    }

    localStorage.removeItem(
      this.#obtenerClave(numeroArchivo)
    );
  }

  obtenerResumen(numeroArchivo) {
    const memento = this.cargar(numeroArchivo);

    return memento
      ? memento.obtenerEstado()
      : null;
  }
}

/* ==========================================================
   PATRÓN STRATEGY

   Agua:
   pierde energía más rápido.

   Desierto:
   pierde comida más rápido.

   Volcán:
   pierde diversión más rápido.
   ========================================================== */

class EstrategiaAgua {
  calcularCambios() {
    return {
      comida: -2,
      energia: -3.2,
      diversion: -2
    };
  }
}

class EstrategiaDesierto {
  calcularCambios() {
    return {
      comida: -3.5,
      energia: -1.5,
      diversion: -2
    };
  }
}

class EstrategiaVolcan {
  calcularCambios() {
    return {
      comida: -2,
      energia: -1.5,
      diversion: -3.5
    };
  }
}

class EstrategiaDormir {
  calcularCambios() {
    return {
      comida: -1,
      energia: 4,
      diversion: -0.5
    };
  }
}

class FabricaEstrategias {
  static crear(datosMascota) {
    if (datosMascota.durmiendo) {
      return new EstrategiaDormir();
    }

    switch (datosMascota.tipo) {
      case "agua":
        return new EstrategiaAgua();

      case "desierto":
        return new EstrategiaDesierto();

      case "volcan":
        return new EstrategiaVolcan();

      default:
        return new EstrategiaAgua();
    }
  }
}

/* ==========================================================
   PATRÓN STATE
   ========================================================== */

class EstadoBase {
  comer() {
    return {
      cambios: {
        comida: 25,
        energia: 5
      },

      mensaje: MENSAJES.comida,
      animacion: "comiendo",
      icono: "🍎"
    };
  }

  dormir() {
    return {
      durmiendo: true,
      mensaje: MENSAJES.dormir,
      animacion: "durmiendo"
    };
  }

  jugar(datosMascota) {
    if (datosMascota.energia < 15) {
      return {
        mensaje: MENSAJES.energiaInsuficiente
      };
    }

    return {
      cambios: {
        comida: -6,
        energia: -12,
        diversion: 25
      },

      mensaje: MENSAJES.jugar,
      animacion: "jugando",
      icono: "🎮"
    };
  }

  obtenerClaseCSS() {
    return "feliz";
  }

  obtenerMensaje() {
    return MENSAJES.normal;
  }
}

class EstadoFeliz extends EstadoBase {
  obtenerClaseCSS() {
    return "feliz";
  }

  obtenerMensaje() {
    return MENSAJES.feliz;
  }
}

class EstadoNormal extends EstadoBase {
  obtenerClaseCSS() {
    return "feliz";
  }

  obtenerMensaje() {
    return MENSAJES.normal;
  }
}

class EstadoHambriento extends EstadoBase {
  jugar() {
    return {
      mensaje: MENSAJES.primeroComer
    };
  }

  obtenerClaseCSS() {
    return "hambrienta";
  }

  obtenerMensaje() {
    return MENSAJES.hambre;
  }
}

class EstadoCansado extends EstadoBase {
  jugar() {
    return {
      mensaje: MENSAJES.cansancio
    };
  }

  obtenerClaseCSS() {
    return "cansada";
  }

  obtenerMensaje() {
    return MENSAJES.cansancio;
  }
}

class EstadoAburrido extends EstadoBase {
  jugar() {
    return {
      cambios: {
        comida: -5,
        energia: -10,
        diversion: 35
      },

      mensaje: MENSAJES.jugar,
      animacion: "jugando",
      icono: "🎮"
    };
  }

  obtenerClaseCSS() {
    return "aburrida";
  }

  obtenerMensaje() {
    return MENSAJES.aburrimiento;
  }
}

class EstadoTriste extends EstadoBase {
  obtenerClaseCSS() {
    return "triste";
  }

  obtenerMensaje() {
    return MENSAJES.tristeza;
  }
}

class EstadoDurmiendo {
  comer() {
    return {
      mensaje: MENSAJES.noComerDurmiendo
    };
  }

  jugar() {
    return {
      mensaje: MENSAJES.noJugarDurmiendo
    };
  }

  dormir() {
    return {
      durmiendo: false,

      cambios: {
        energia: 35
      },

      mensaje: MENSAJES.despertar,
      animacion: "feliz"
    };
  }

  obtenerClaseCSS() {
    return "durmiendo";
  }

  obtenerMensaje() {
    return MENSAJES.dormir;
  }
}

class EstadoMuerto {
  comer() {
    return {
      mensaje: MENSAJES.muerte
    };
  }

  jugar() {
    return {
      mensaje: MENSAJES.muerte
    };
  }

  dormir() {
    return {
      mensaje: MENSAJES.muerte
    };
  }

  obtenerClaseCSS() {
    return "muerta";
  }

  obtenerMensaje() {
    return MENSAJES.muerte;
  }
}

/* ==========================================================
   FÁBRICA DE ESTADOS

   Los límites son iguales para todas las especies.
   ========================================================== */

class FabricaEstados {
  static crear(datosMascota) {
    if (!datosMascota.viva) {
      return new EstadoMuerto();
    }

    if (datosMascota.durmiendo) {
      return new EstadoDurmiendo();
    }

    const limites =
      FabricaEstados.#obtenerLimites();

    const promedio =
      (
        datosMascota.comida +
        datosMascota.energia +
        datosMascota.diversion
      ) / 3;

    if (datosMascota.comida <= limites.hambre) {
      return new EstadoHambriento();
    }

    if (
      datosMascota.energia <= limites.cansancio
    ) {
      return new EstadoCansado();
    }

    if (
      datosMascota.diversion <=
      limites.aburrimiento
    ) {
      return new EstadoAburrido();
    }

    if (promedio < 45) {
      return new EstadoTriste();
    }

    if (promedio >= 80) {
      return new EstadoFeliz();
    }

    return new EstadoNormal();
  }

  static #obtenerLimites() {
    return {
      hambre: 25,
      cansancio: 20,
      aburrimiento: 25
    };
  }
}

/* ==========================================================
   MODELO PRINCIPAL

   Los datos están encapsulados mediante atributos privados.
   ========================================================== */

class MascotaVirtual {
  #nombre;
  #numeroArchivo;
  #tipo;

  #comida;
  #energia;
  #diversion;

  #durmiendo;
  #viva;

  #fechaCreacion;
  #etapa;

  #observadores;

  constructor() {
    this.#nombre = "";
    this.#numeroArchivo = null;
    this.#tipo = "agua";

    this.#comida = CONFIGURACION.valorInicial;
    this.#energia = CONFIGURACION.valorInicial;
    this.#diversion =
      CONFIGURACION.valorInicial;

    this.#durmiendo = false;
    this.#viva = true;

    this.#fechaCreacion = Date.now();
    this.#etapa = ETAPAS.BEBE;

    this.#observadores = [];
  }

  /* Getters de solo lectura */

  get nombre() {
    return this.#nombre;
  }

  get numeroArchivo() {
    return this.#numeroArchivo;
  }

  get tipo() {
    return this.#tipo;
  }

  get comida() {
    return this.#comida;
  }

  get energia() {
    return this.#energia;
  }

  get diversion() {
    return this.#diversion;
  }

  get durmiendo() {
    return this.#durmiendo;
  }

  get viva() {
    return this.#viva;
  }

  get etapa() {
    return this.#etapa;
  }

  tienePartidaActiva() {
    return (
      this.#numeroArchivo !== null &&
      this.#nombre !== ""
    );
  }

  /* ========================================================
     PATRÓN OBSERVER
     ======================================================== */

  agregarObservador(observador) {
    if (
      observador &&
      typeof observador.actualizar === "function" &&
      !this.#observadores.includes(observador)
    ) {
      this.#observadores.push(observador);
    }
  }

  eliminarObservador(observador) {
    this.#observadores =
      this.#observadores.filter(
        (elemento) => elemento !== observador
      );
  }

  #notificar(evento) {
    this.#observadores.forEach(
      (observador) => {
        observador.actualizar(this, evento);
      }
    );
  }

  obtenerDatos() {
    return {
      nombre: this.#nombre,
      numeroArchivo: this.#numeroArchivo,
      tipo: this.#tipo,

      comida: this.#comida,
      energia: this.#energia,
      diversion: this.#diversion,

      durmiendo: this.#durmiendo,
      viva: this.#viva,

      fechaCreacion: this.#fechaCreacion,
      etapa: this.#etapa
    };
  }

  crearNuevaPartida(
    nombre,
    numeroArchivo,
    tipo
  ) {
    this.#nombre = nombre;
    this.#numeroArchivo = numeroArchivo;

    this.#tipo = especieValida(tipo)
      ? tipo
      : "agua";

    this.#comida =
      CONFIGURACION.valorInicial;

    this.#energia =
      CONFIGURACION.valorInicial;

    this.#diversion =
      CONFIGURACION.valorInicial;

    this.#durmiendo = false;
    this.#viva = true;

    this.#fechaCreacion = Date.now();
    this.#etapa = ETAPAS.BEBE;

    this.#notificar("partidaCreada");
  }

  cerrarPartida() {
    this.#numeroArchivo = null;
    this.#nombre = "";
    this.#durmiendo = false;
  }

  /* ========================================================
     MEMENTO
     ======================================================== */

  crearMemento() {
    return new MascotaMemento({
      nombre: this.#nombre,

      numeroArchivo: this.#numeroArchivo,
      slotActual: this.#numeroArchivo,

      tipo: this.#tipo,

      comida: this.#comida,
      energia: this.#energia,
      diversion: this.#diversion,

      durmiendo: this.#durmiendo,
      viva: this.#viva,

      fechaCreacion: this.#fechaCreacion,
      etapa: this.#etapa,

      fechaGuardado: Date.now()
    });
  }

  restaurarDesdeMemento(
    memento,
    numeroArchivo
  ) {
    const estado = memento.obtenerEstado();

    this.#nombre =
      estado.nombre || "Mascota";

    this.#numeroArchivo =
      estado.numeroArchivo ||
      estado.slotActual ||
      numeroArchivo;

    this.#tipo = especieValida(estado.tipo)
      ? estado.tipo
      : "agua";

    this.#comida = limitar(
      Number.isFinite(estado.comida)
        ? estado.comida
        : CONFIGURACION.valorInicial
    );

    this.#energia = limitar(
      Number.isFinite(estado.energia)
        ? estado.energia
        : CONFIGURACION.valorInicial
    );

    this.#diversion = limitar(
      Number.isFinite(estado.diversion)
        ? estado.diversion
        : CONFIGURACION.valorInicial
    );

    this.#durmiendo =
      Boolean(estado.durmiendo);

    this.#fechaCreacion =
      Number.isFinite(estado.fechaCreacion)
        ? estado.fechaCreacion
        : Date.now();

    /*
      Compatibilidad con archivos guardados antiguos.
    */

    if (etapaValida(estado.etapa)) {
      this.#etapa = estado.etapa;
    } else if (estado.evoluciono === true) {
      this.#etapa = ETAPAS.JOVEN;
    } else {
      this.#etapa = ETAPAS.BEBE;
    }

    this.#viva =
      estado.viva !== false &&
      this.#comida > 0 &&
      this.#energia > 0 &&
      this.#diversion > 0;

    if (!this.#viva) {
      this.#durmiendo = false;
    }

    this.#notificar("partidaRestaurada");
  }

  /* ========================================================
     ACCIONES
     ======================================================== */

  realizarAccion(nombreAccion) {
    const estadoActual =
      FabricaEstados.crear(
        this.obtenerDatos()
      );

    if (
      typeof estadoActual[nombreAccion] !==
      "function"
    ) {
      return {
        mensaje: "Acción no disponible."
      };
    }

    const resultado =
      estadoActual[nombreAccion](
        this.obtenerDatos()
      );

    this.#aplicarResultado(resultado);
    this.#comprobarVida();

    this.#notificar(
      `accion:${nombreAccion}`
    );

    return resultado;
  }

  #aplicarResultado(resultado) {
    if (!resultado) {
      return;
    }

    if (resultado.cambios) {
      this.#aplicarCambios(
        resultado.cambios
      );
    }

    if (
      typeof resultado.durmiendo ===
      "boolean"
    ) {
      this.#durmiendo =
        resultado.durmiendo;
    }
  }

  #aplicarCambios(cambios) {
    if (!this.#viva) {
      return;
    }

    const comida =
      Number.isFinite(cambios.comida)
        ? cambios.comida
        : 0;

    const energia =
      Number.isFinite(cambios.energia)
        ? cambios.energia
        : 0;

    const diversion =
      Number.isFinite(cambios.diversion)
        ? cambios.diversion
        : 0;

    this.#comida = limitar(
      this.#comida + comida
    );

    this.#energia = limitar(
      this.#energia + energia
    );

    this.#diversion = limitar(
      this.#diversion + diversion
    );
  }

  aplicarPasoDeTiempo(estrategia) {
    if (!this.#viva) {
      return;
    }

    const cambios =
      estrategia.calcularCambios(
        this.obtenerDatos()
      );

    this.#aplicarCambios(cambios);
    this.#comprobarVida();

    this.#notificar("pasoTiempo");
  }

  /* La mascota muere si cualquier contador llega a cero. */

  #comprobarVida() {
    if (
      this.#comida <= 0 ||
      this.#energia <= 0 ||
      this.#diversion <= 0
    ) {
      this.#comida = limitar(
        this.#comida
      );

      this.#energia = limitar(
        this.#energia
      );

      this.#diversion = limitar(
        this.#diversion
      );

      this.#viva = false;
      this.#durmiendo = false;
    }
  }

  /* ========================================================
     CRECIMIENTO

     Las estadísticas no cambian al evolucionar.
     ======================================================== */

  actualizarEtapaPorTiempo() {
    if (!this.#viva) {
      return null;
    }

    const tiempoTranscurrido =
      Date.now() - this.#fechaCreacion;

    /*
      Bebé → joven.
      Este cambio solo puede ocurrir una vez.
    */

    if (
      this.#etapa === ETAPAS.BEBE &&
      tiempoTranscurrido >=
        CONFIGURACION.tiempoEtapaJoven
    ) {
      this.#etapa = ETAPAS.JOVEN;

      this.#notificar(
        "evolucion:joven"
      );

      return ETAPAS.JOVEN;
    }

    /*
      Joven → adulta.
      Este cambio solo puede ocurrir una vez.
    */

    if (
      this.#etapa === ETAPAS.JOVEN &&
      tiempoTranscurrido >=
        CONFIGURACION.tiempoEtapaAdulta
    ) {
      this.#etapa = ETAPAS.ADULTA;

      this.#notificar(
        "evolucion:adulta"
      );

      return ETAPAS.ADULTA;
    }

    return null;
  }

  /* ========================================================
     MÉTODOS DE PRUEBA
     ======================================================== */

  ponerContadorEnCero(contador) {
    if (!this.#viva) {
      return;
    }

    switch (contador) {
      case "comida":
        this.#comida = 0;
        break;

      case "energia":
        this.#energia = 0;
        break;

      case "diversion":
        this.#diversion = 0;
        break;

      case "todos":
        this.#comida = 0;
        this.#energia = 0;
        this.#diversion = 0;
        break;

      default:
        return;
    }

    this.#comprobarVida();

    this.#notificar(
      `prueba:${contador}`
    );
  }

  guardarAhora() {
    this.#notificar(
      "guardadoManual"
    );
  }

  obtenerEstadoActual() {
    return FabricaEstados.crear(
      this.obtenerDatos()
    );
  }
}

/* ==========================================================
   PATRÓN COMMAND
   ========================================================== */

class ComandoBase {
  #mascota;

  constructor(mascota) {
    this.#mascota = mascota;
  }

  obtenerMascota() {
    return this.#mascota;
  }
}

class ComandoComer extends ComandoBase {
  ejecutar() {
    return this.obtenerMascota()
      .realizarAccion("comer");
  }
}

class ComandoDormir extends ComandoBase {
  ejecutar() {
    return this.obtenerMascota()
      .realizarAccion("dormir");
  }
}

class ComandoJugar extends ComandoBase {
  ejecutar() {
    return this.obtenerMascota()
      .realizarAccion("jugar");
  }
}

/* ==========================================================
   VISTA

   Encapsula todos los cambios del HTML.
   ========================================================== */

class VistaMascota {
  #elementos;

  constructor(elementosHTML) {
    this.#elementos = elementosHTML;

    /*
      Cambia el icono del botón por una flecha atrás.
      No es necesario modificar el HTML.
    */

    this.#elementos.btnReiniciar.textContent =
      "←";

    this.#elementos.btnReiniciar.title =
      "Volver al menú";

    this.#elementos.btnReiniciar.setAttribute(
      "aria-label",
      "Volver al menú"
    );
  }

  mostrarJuego() {
    this.#elementos.pantallaInicio
      .classList.remove("activa");

    this.#elementos.pantallaJuego
      .classList.add("activa");
  }

  mostrarMenu() {
    this.#elementos.pantallaJuego
      .classList.remove("activa");

    this.#elementos.pantallaInicio
      .classList.add("activa");
  }

  mostrarMensaje(texto) {
    this.#elementos.mensaje.textContent =
      texto;
  }

  limpiarNombre() {
    this.#elementos.nombreInput.value =
      "";
  }

  obtenerNombreIngresado() {
    return this.#elementos.nombreInput
      .value
      .trim();
  }

  obtenerTipoSeleccionado() {
    const tipo =
      this.#elementos.tipoMascotaInput
        .value;

    return especieValida(tipo)
      ? tipo
      : "agua";
  }

  seleccionarTipo(tipo) {
    if (!especieValida(tipo)) {
      return;
    }

    this.#elementos.tipoMascotaInput.value =
      tipo;

    this.#elementos.botonesTipo.forEach(
      (boton) => {
        boton.classList.toggle(
          "activo",
          boton.dataset.tipo === tipo
        );
      }
    );
  }

  actualizarMascota(mascota) {
    const datos =
      mascota.obtenerDatos();

    const estado =
      mascota.obtenerEstadoActual();

    const especie =
      ESPECIES[datos.tipo];

    this.#elementos.nombreMascota.textContent =
      datos.nombre;

    this.#elementos.textoRanura.textContent =
      `Archivo ${datos.numeroArchivo} · ${obtenerNombreEtapa(datos.etapa)}`;

    this.#actualizarBarra(
      this.#elementos.barComida,
      this.#elementos.numComida,
      datos.comida
    );

    this.#actualizarBarra(
      this.#elementos.barEnergia,
      this.#elementos.numEnergia,
      datos.energia
    );

    this.#actualizarBarra(
      this.#elementos.barDiversion,
      this.#elementos.numDiversion,
      datos.diversion
    );

    this.#actualizarImagenMascota(
      datos,
      estado,
      especie
    );

    this.#actualizarFondo(
      datos,
      especie
    );

    this.#actualizarBotones(datos);
  }

  #actualizarBarra(
    barra,
    numero,
    valor
  ) {
    const valorSeguro = Math.round(
      limitar(valor)
    );

    barra.style.width =
      `${valorSeguro}%`;

    numero.textContent =
      `${valorSeguro}%`;

    barra.classList.toggle(
      "peligro",
      valorSeguro <= 20
    );
  }

  #actualizarImagenMascota(
    datos,
    estado,
    especie
  ) {
    const etapaActual =
      etapaValida(datos.etapa)
        ? datos.etapa
        : ETAPAS.BEBE;

    const estadoVisual =
      datos.durmiendo
        ? "durmiendo"
        : "despierta";

    this.#elementos.mascotaImagen.src =
      especie.imagenes[etapaActual][
        estadoVisual
      ];

    this.#elementos.mascotaImagen.alt =
      datos.durmiendo
        ? `Mascota de ${especie.nombre} durmiendo`
        : `Mascota de ${especie.nombre} en etapa ${obtenerNombreEtapa(etapaActual)}`;

    const clases = [
      "imagen-mascota",
      estado.obtenerClaseCSS(),
      `etapa-${etapaActual}`
    ];

    if (datos.durmiendo) {
      clases.push(
        "imagen-durmiendo"
      );
    }

    this.#elementos.mascotaImagen.className =
      clases.join(" ");
  }

  #actualizarFondo(datos, especie) {
    const fondo =
      datos.durmiendo
        ? especie.fondoNoche
        : especie.fondoDia;

    this.#elementos.escenario
      .style.backgroundImage =
      `url("${fondo}")`;

    this.#elementos.escenario
      .classList.toggle(
        "noche",
        datos.durmiendo
      );

    this.#elementos.zzz
      .classList.toggle(
        "mostrar",
        datos.durmiendo
      );
  }

  #actualizarBotones(datos) {
    const partidaTerminada =
      !datos.viva;

    this.#elementos.btnComer.disabled =
      partidaTerminada ||
      datos.durmiendo;

    this.#elementos.btnJugar.disabled =
      partidaTerminada ||
      datos.durmiendo;

    this.#elementos.btnDormir.disabled =
      partidaTerminada;

    if (datos.durmiendo) {
      this.#elementos.textoDormir
        .textContent = "Despertar";

      this.#elementos.iconoDormir
        .textContent = "☀️";
    } else {
      this.#elementos.textoDormir
        .textContent = "Dormir";

      this.#elementos.iconoDormir
        .textContent = "🌙";
    }
  }

  animarMascota(
    claseAnimacion,
    mascota
  ) {
    const datos =
      mascota.obtenerDatos();

    const especie =
      ESPECIES[datos.tipo];

    const etapaActual =
      etapaValida(datos.etapa)
        ? datos.etapa
        : ETAPAS.BEBE;

    const estadoVisual =
      datos.durmiendo
        ? "durmiendo"
        : "despierta";

    this.#elementos.mascotaImagen.src =
      especie.imagenes[etapaActual][
        estadoVisual
      ];

    const clases = [
      "imagen-mascota",
      claseAnimacion,
      `etapa-${etapaActual}`
    ];

    if (datos.durmiendo) {
      clases.push(
        "imagen-durmiendo"
      );
    }

    this.#elementos.mascotaImagen.className =
      clases.join(" ");
  }

  mostrarObjeto(icono) {
    this.#elementos.objeto.textContent =
      icono;

    this.#elementos.objeto
      .classList.remove("mostrar");

    void this.#elementos.objeto
      .offsetWidth;

    this.#elementos.objeto
      .classList.add("mostrar");

    setTimeout(() => {
      this.#elementos.objeto
        .classList.remove("mostrar");
    }, 900);
  }

  actualizarArchivos(repositorio) {
    for (
      let numero = 1;
      numero <=
        CONFIGURACION.cantidadArchivos;
      numero++
    ) {
      const ranura =
        document.getElementById(
          `ranura${numero}`
        );

      const estadoSlot =
        document.getElementById(
          `estadoSlot${numero}`
        );

      const botonCrear =
        document.querySelector(
          `.btn-crear[data-slot="${numero}"]`
        );

      const botonCargar =
        document.querySelector(
          `.btn-cargar[data-slot="${numero}"]`
        );

      const botonBorrar =
        document.querySelector(
          `.btn-borrar[data-slot="${numero}"]`
        );

      const resumen =
        repositorio.obtenerResumen(
          numero
        );

      if (resumen) {
        const tipo =
          especieValida(resumen.tipo)
            ? resumen.tipo
            : "agua";

        const especie =
          ESPECIES[tipo];

        let etapa = ETAPAS.BEBE;

        if (etapaValida(resumen.etapa)) {
          etapa = resumen.etapa;
        } else if (
          resumen.evoluciono === true
        ) {
          etapa = ETAPAS.JOVEN;
        }

        ranura.classList.add(
          "ocupada"
        );

        estadoSlot.innerHTML = `
          <strong>${escaparHTML(resumen.nombre)}</strong><br>
          ${especie.icono} ${especie.nombre}<br>
          ⭐ Etapa: ${obtenerNombreEtapa(etapa)}<br>
          🍎 ${Math.round(resumen.comida)}%
          ⚡ ${Math.round(resumen.energia)}%
          🎮 ${Math.round(resumen.diversion)}%
          ${
            resumen.viva === false
              ? "<br>Partida terminada"
              : ""
          }
        `;

        botonCrear.classList.add(
          "oculto"
        );

        botonCargar.classList.remove(
          "oculto"
        );

        botonBorrar.classList.remove(
          "oculto"
        );
      } else {
        ranura.classList.remove(
          "ocupada"
        );

        estadoSlot.textContent =
          "Vacío";

        botonCrear.classList.remove(
          "oculto"
        );

        botonCargar.classList.add(
          "oculto"
        );

        botonBorrar.classList.add(
          "oculto"
        );
      }
    }
  }
}

/* ==========================================================
   OBSERVADORES
   ========================================================== */

class ObservadorInterfaz {
  #vista;

  constructor(vista) {
    this.#vista = vista;
  }

  actualizar(mascota) {
    this.#vista.actualizarMascota(
      mascota
    );
  }
}

class ObservadorGuardado {
  #repositorio;

  constructor(repositorio) {
    this.#repositorio =
      repositorio;
  }

  actualizar(mascota) {
    if (
      mascota.tienePartidaActiva()
    ) {
      this.#repositorio.guardar(
        mascota
      );
    }
  }
}

/* ==========================================================
   CONTROLADOR PRINCIPAL
   ========================================================== */

class ControladorJuego {
  #mascota;
  #vista;
  #repositorio;

  #comandos;
  #intervalo;

  constructor(
    mascota,
    vista,
    repositorio
  ) {
    this.#mascota = mascota;
    this.#vista = vista;
    this.#repositorio =
      repositorio;

    this.#intervalo = null;

    this.#comandos = {
      comer:
        new ComandoComer(
          this.#mascota
        ),

      dormir:
        new ComandoDormir(
          this.#mascota
        ),

      jugar:
        new ComandoJugar(
          this.#mascota
        )
    };
  }

  iniciar() {
    this.#registrarEventos();

    this.#vista.actualizarArchivos(
      this.#repositorio
    );

    this.#vista.seleccionarTipo(
      "agua"
    );
  }

  crearPartida(numeroArchivo) {
    const nombre =
      this.#vista.obtenerNombreIngresado();

    const tipo =
      this.#vista.obtenerTipoSeleccionado();

    if (!nombre) {
      alert(MENSAJES.nombreVacio);
      return;
    }

    if (
      this.#repositorio.existe(
        numeroArchivo
      )
    ) {
      const confirmar = confirm(
        MENSAJES.confirmarSobrescritura
      );

      if (!confirmar) {
        return;
      }
    }

    this.#detenerTemporizador();

    this.#mascota.crearNuevaPartida(
      nombre,
      numeroArchivo,
      tipo
    );

    this.#vista.mostrarJuego();

    this.#vista.mostrarMensaje(
      MENSAJES.bienvenida
    );

    this.#iniciarTemporizador();
  }

  cargarPartida(numeroArchivo) {
    const memento =
      this.#repositorio.cargar(
        numeroArchivo
      );

    if (!memento) {
      alert(MENSAJES.archivoVacio);
      return;
    }

    this.#detenerTemporizador();

    this.#mascota
      .restaurarDesdeMemento(
        memento,
        numeroArchivo
      );

    this.#vista.mostrarJuego();

    if (!this.#mascota.viva) {
      this.#vista.mostrarMensaje(
        MENSAJES.muerte
      );

      return;
    }

    const nuevaEtapa =
      this.#mascota
        .actualizarEtapaPorTiempo();

    this.#mostrarMensajeEvolucionOEstado(
      nuevaEtapa
    );

    this.#iniciarTemporizador();
  }

  borrarPartida(numeroArchivo) {
    const confirmar = confirm(
      MENSAJES.confirmarBorrado
    );

    if (!confirmar) {
      return;
    }

    this.#repositorio.borrar(
      numeroArchivo
    );

    this.#vista.actualizarArchivos(
      this.#repositorio
    );
  }

  ejecutarComando(nombreComando) {
    const comando =
      this.#comandos[nombreComando];

    if (!comando) {
      return;
    }

    const resultado =
      comando.ejecutar();

    if (resultado.mensaje) {
      this.#vista.mostrarMensaje(
        resultado.mensaje
      );
    }

    if (resultado.icono) {
      this.#vista.mostrarObjeto(
        resultado.icono
      );
    }

    if (resultado.animacion) {
      this.#vista.animarMascota(
        resultado.animacion,
        this.#mascota
      );

      setTimeout(() => {
        this.#vista.actualizarMascota(
          this.#mascota
        );
      }, 1500);
    }

    if (!this.#mascota.viva) {
      this.#detenerTemporizador();

      this.#vista.mostrarMensaje(
        MENSAJES.muerte
      );
    }
  }

  volverAlMenu() {
    this.#mascota.guardarAhora();
    this.#detenerTemporizador();

    this.#mascota.cerrarPartida();

    this.#vista.mostrarMenu();

    this.#vista.actualizarArchivos(
      this.#repositorio
    );
  }

  #iniciarTemporizador() {
    this.#detenerTemporizador();

    if (!this.#mascota.viva) {
      return;
    }

    this.#intervalo = setInterval(
      () => {
        const datos =
          this.#mascota.obtenerDatos();

        const estrategia =
          FabricaEstrategias.crear(
            datos
          );

        this.#mascota
          .aplicarPasoDeTiempo(
            estrategia
          );

        if (!this.#mascota.viva) {
          this.#vista.mostrarMensaje(
            MENSAJES.muerte
          );

          this.#detenerTemporizador();
          return;
        }

        const nuevaEtapa =
          this.#mascota
            .actualizarEtapaPorTiempo();

        this.#mostrarMensajeEvolucionOEstado(
          nuevaEtapa
        );
      },
      CONFIGURACION.tiempoActualizacion
    );
  }

  #detenerTemporizador() {
    if (this.#intervalo !== null) {
      clearInterval(
        this.#intervalo
      );

      this.#intervalo = null;
    }
  }

  #mostrarMensajeEvolucionOEstado(
    nuevaEtapa
  ) {
    if (
      nuevaEtapa === ETAPAS.JOVEN
    ) {
      this.#vista.mostrarMensaje(
        MENSAJES.evolucionJoven
      );

      return;
    }

    if (
      nuevaEtapa === ETAPAS.ADULTA
    ) {
      this.#vista.mostrarMensaje(
        MENSAJES.evolucionAdulta
      );

      return;
    }

    this.#mostrarMensajeEstado();
  }

  #mostrarMensajeEstado() {
    const estado =
      this.#mascota.obtenerEstadoActual();

    this.#vista.mostrarMensaje(
      estado.obtenerMensaje()
    );
  }

  #probarContador(contador) {
    if (
      !this.#mascota
        .tienePartidaActiva()
    ) {
      return;
    }

    this.#mascota
      .ponerContadorEnCero(
        contador
      );

    if (!this.#mascota.viva) {
      this.#detenerTemporizador();

      this.#vista.mostrarMensaje(
        MENSAJES.muerte
      );
    }
  }

  #registrarEventos() {
    /* Selección del huevo */

    elementos.botonesTipo.forEach(
      (boton) => {
        boton.addEventListener(
          "click",
          () => {
            this.#vista.seleccionarTipo(
              boton.dataset.tipo
            );
          }
        );
      }
    );

    /* Crear partidas */

    document
      .querySelectorAll(".btn-crear")
      .forEach((boton) => {
        boton.addEventListener(
          "click",
          () => {
            const numeroArchivo =
              Number(
                boton.dataset.slot
              );

            this.crearPartida(
              numeroArchivo
            );
          }
        );
      });

    /* Cargar partidas */

    document
      .querySelectorAll(".btn-cargar")
      .forEach((boton) => {
        boton.addEventListener(
          "click",
          () => {
            const numeroArchivo =
              Number(
                boton.dataset.slot
              );

            this.cargarPartida(
              numeroArchivo
            );
          }
        );
      });

    /* Borrar partidas */

    document
      .querySelectorAll(".btn-borrar")
      .forEach((boton) => {
        boton.addEventListener(
          "click",
          () => {
            const numeroArchivo =
              Number(
                boton.dataset.slot
              );

            this.borrarPartida(
              numeroArchivo
            );
          }
        );
      });

    /* Acciones */

    elementos.btnComer.addEventListener(
      "click",
      () => {
        this.ejecutarComando(
          "comer"
        );
      }
    );

    elementos.btnDormir.addEventListener(
      "click",
      () => {
        this.ejecutarComando(
          "dormir"
        );
      }
    );

    elementos.btnJugar.addEventListener(
      "click",
      () => {
        this.ejecutarComando(
          "jugar"
        );
      }
    );

    /*
      El botón con flecha regresa al menú.
    */

    elementos.btnReiniciar.addEventListener(
      "click",
      () => {
        this.volverAlMenu();
      }
    );

    /* Guardar antes de cerrar */

    window.addEventListener(
      "beforeunload",
      () => {
        if (
          this.#mascota
            .tienePartidaActiva()
        ) {
          this.#repositorio.guardar(
            this.#mascota
          );
        }
      }
    );

    /* ======================================================
       ATAJOS DE PRUEBA

       Ctrl + Shift + C = comida a cero
       Ctrl + Shift + E = energía a cero
       Ctrl + Shift + D = diversión a cero
       Ctrl + Shift + M = todo a cero
       ====================================================== */

    document.addEventListener(
      "keydown",
      (evento) => {
        if (
          !evento.ctrlKey ||
          !evento.shiftKey
        ) {
          return;
        }

        const tecla =
          evento.key.toLowerCase();

        switch (tecla) {
          case "c":
            evento.preventDefault();

            this.#probarContador(
              "comida"
            );
            break;

          case "e":
            evento.preventDefault();

            this.#probarContador(
              "energia"
            );
            break;

          case "d":
            evento.preventDefault();

            this.#probarContador(
              "diversion"
            );
            break;

          case "m":
            evento.preventDefault();

            this.#probarContador(
              "todos"
            );
            break;
        }
      }
    );
  }
}

/* ==========================================================
   CREACIÓN DE OBJETOS
   ========================================================== */

const repositorio =
  new RepositorioGuardado(
    CONFIGURACION.prefijoGuardado,
    CONFIGURACION.cantidadArchivos
  );

const mascota =
  new MascotaVirtual();

const vista =
  new VistaMascota(elementos);

/* Registro de observadores */

mascota.agregarObservador(
  new ObservadorInterfaz(vista)
);

mascota.agregarObservador(
  new ObservadorGuardado(
    repositorio
  )
);

/* Controlador principal */

const juego =
  new ControladorJuego(
    mascota,
    vista,
    repositorio
  );

/* Iniciar aplicación */

juego.iniciar();