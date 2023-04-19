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