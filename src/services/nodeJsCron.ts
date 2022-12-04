import cron from 'node-cron';

const nodeJsCron = cron.schedule('* * * * *', () => {
  console.log('running a task every minute');
});

export default nodeJsCron;