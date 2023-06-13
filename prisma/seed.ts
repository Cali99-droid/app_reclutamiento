import { prisma } from '../server/db/client';


async function main() {
  
  const estados = await prisma.estado.createMany({
    data: [
      { nombre: 'abierta' },
      { nombre: 'en evaluacion' },
      { nombre: 'cerrada' },
      
    ],
   
  })

  const categorias = await prisma.categoria.createMany({
    data: [
      { nombre: 'administrativo' },
      { nombre: 'docente' },
      
    ],
   
  })

  const estadoPostulante = await prisma.estado_postulante.createMany({
    data: [
      {nombre:'Inscrito'},
      { nombre: 'Apto entrevista' },
      { nombre: 'Apto evaluación' },
      { nombre: 'No interesa' },
      { nombre: 'Interesa' },
      { nombre: 'Seleccionado' },
      { nombre: 'Contratado' },
      
    ],
   
  })

  const grados = await prisma.grado.createMany({
    data: [
      { nombre: 'Estudiante' },
      { nombre: 'Practicante' },
      { nombre: 'Bachiller' },
      { nombre: 'Titulado' },
      { nombre: 'Todos' },
      
    ],
   
  })

  
  const roles = await prisma.rol.createMany({
    data: [
      { name: 'postulante' },
      { name: 'admin' },
      { name: 'jurado1' },
      { name: 'jurado2' },

      
    ],
   
  })

  const tipo = await prisma.tipo_documento.createMany({
    data: [
      { nombre: 'dni' },
      { nombre: 'carnet' },
      { nombre: 'otro' },

      
    ],
   
  })

  const evaluaciones = await prisma.evaluacion.createMany({
    data: [
      { nombre: 'entrevista' },
      { nombre: 'jurado' },
      
    ],
   
  })
  // console.log( {createMany} )
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })