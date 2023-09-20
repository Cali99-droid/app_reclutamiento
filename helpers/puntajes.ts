export const devolverPuntajeEntrevista = (puntajes: any[]) => {

    let puntaje = 0;
    let puntos = 0;
    const resultado = puntajes.forEach(x => {
        //rol de admin
        if (x.test.categoria_id === 3) {
            puntaje += (x.total / x.maximo)
            puntos += x.total
        }
    });
    if (Math.round(puntaje * 100) === 0) {
        return {
            puntos,
            porcentaje: Math.round(puntaje * 100),
            pasa: true,
            noEval: true,
            mensaje: 'Sin datos'
        }
    }
    if (Math.round(puntaje * 100) >= 30) {


        return {
            puntos,
            porcentaje: Math.round(puntaje * 100),
            pasa: true,
            mensaje: Math.round(puntaje * 100) + '% ' + 'Puntaje entrevista'
        }
    } else {
        return {
            puntos,
            porcentaje: Math.round(puntaje * 100),
            pasa: false,
            mensaje: Math.round(puntaje * 100) + '%' + 'Puntaje entrevista'
        }
    }
    // return (puntos + '(' + Math.round(puntaje * 10) + '%)').toString();
}

export const devolverPuntajeJurado = (puntajes: any[]) => {

    let puntaje = 0;
    let jurados = 0;
    let puntos = 0;
    let maximo = 0;
    // if(puntajes.length === 0){
    //   return {
    //     puntos,
    //     porcentaje: isNaN(Math.round(puntaje * 10)) ? 0 : Math.round((puntaje / maximo) * 100),
    //     pasa: true,
    //     noEval: true,
    //     mensaje: 'Aún no evaluado'
    //   }
    // }
    const resultado = puntajes.forEach(x => {

        if (x.test.categoria_id === 1 || x.test.categoria_id === 2) {
            puntaje += (x.total);
            maximo += (x.maximo)

            jurados += 1
            puntos += x.total
        } else {
            return '';
        }
    });
    if (puntos === 0) {

        return {
            puntos,
            porcentaje: isNaN(Math.round((puntaje / jurados) * 10)) ? 0 : Math.round((puntaje / maximo) * 100),
            pasa: true,
            noEval: true,
            mensaje: 'Aún no evaluado'
        }
    }
    if (Math.round((puntaje / maximo) * 100) >= 30) {
        return {
            puntos,
            porcentaje: isNaN(Math.round((puntaje / jurados) * 10)) ? 0 : Math.round((puntaje / maximo) * 100),
            pasa: true,
            mensaje: Math.round((puntaje / jurados) * 10) + '% ' + 'Puntaje Evaluación'
        }
    } else {
        return {
            puntos,
            porcentaje: isNaN(Math.round((puntaje / jurados) * 10)) ? 0 : Math.round((puntaje / maximo) * 100),
            pasa: false,
            mensaje: Math.round((puntaje / jurados) * 10) + '% ' + 'Puntaje Evaluación'
        }
    }

}