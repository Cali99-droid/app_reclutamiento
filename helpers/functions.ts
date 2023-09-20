export const calcularEdad = (fecha:string)=> {
    const nacimiento = new Date(fecha).toISOString().slice(0, 10)
    var hoy = new Date();
    var cumpleanos = new Date(nacimiento);
    var edad = hoy.getFullYear() - cumpleanos.getFullYear();
    var m = hoy.getMonth() - cumpleanos.getMonth();

    if (m < 0 || (m === 0 && hoy.getDate() < cumpleanos.getDate())) {
        edad--;
    }

    return edad;
}

  export const generarId = () => {
    return Date.now().toString(32) + Math.random().toString(32).substring(2);
  };


  export const getEstado = (estado: string, puntajeEntr: any, puntajeJur: any) => {

    switch (estado) {
      case 'Inscrito':
        return 'Inscrito'

      case 'Apto entrevista':
        if (puntajeEntr.porcentaje < 30 && !puntajeEntr.noEval) {
          return '% Insuficiente'
        }
        return 'Apto entrevista'
      case 'Apto evaluación':

        if (puntajeJur.porcentaje < 30 && !puntajeJur.noEval) {
          return '% Insuficiente'
        } else {
          if (puntajeJur.porcentaje >= 30) {
            return 'Apto a Contrato'
          } else {
            return 'Apto evaluación'
          }

        }

      default:
        return estado
        break;
    }
  }


  export const formatoNombre = (nombres: string, apellidoPat: string, apellidoMat: string) => {
    const str = apellidoPat + ' ' + apellidoMat + ' ' + nombres;
    return str.replace(/\w\S*/g, function (txt) {
      return txt.charAt(0).toUpperCase() + txt.substring(1).toLowerCase();
    });

  }

