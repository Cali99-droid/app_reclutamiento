import { PrismaClient } from '@prisma/client';
import cron from 'node-cron';



const prisma = new PrismaClient();
async function cleanupUnconfirmedUsers() {
  console.log('No unconfirmed users to clean up.');
  const threeDaysAgo = new Date();
  threeDaysAgo.setDate(threeDaysAgo.getDate() - 3);

  const unconfirmedUsers = await prisma.user.findMany({
    where: {
      confirmado: 0,
      create_time: {
        lt: threeDaysAgo,
      },
    },
  });

  if (unconfirmedUsers.length === 0) {
    console.log('No unconfirmed users to clean up.');
    return;
  }

  console.log(`Cleaning up ${unconfirmedUsers.length} unconfirmed users...`);

  const userIds = unconfirmedUsers.map((user) => user.id);
  const personIds = unconfirmedUsers.map((user) => user.persona_id);
  console.log(personIds)
  await prisma.persona.deleteMany({
    where: {
      id: {
        in: personIds,
      },
    },
  }).then(()=>
    console.log('Completed Unconfirmed users cleaned up.')
  ,(r)=>{
    console.log('error' + r)
  });

  console.log('Unconfirmed users cleaned up.');
}

// Ejecutar el script todos los días a la medianoche (00:00)
cron.schedule('0 0 * * *', async () => {
  console.log('Running cleanup script...');
  await cleanupUnconfirmedUsers();
});

// Iniciar la ejecución del script
console.log('Cleanup script started. gg');
// cleanupUnconfirmedUsers();
