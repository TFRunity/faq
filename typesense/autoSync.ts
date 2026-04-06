// import sync from "@/typesense/typesenseSyncScript";
// import cron from 'node-cron';
//
// // Запуск каждые 10 минут
// // Запуск при старте приложения для проверки
// sync().then(() => console.log('Первичная синхронизация при запуске завершена.'));
//
// cron.schedule('*/10 * * * *', async () => {
//     const now = new Date().toLocaleString();
//     console.log(`[${now}] Запуск плановой синхронизации...`);
//
//     try {
//         await sync();
//         console.log(`[${now}] Синхронизация прошла успешно.`);
//     } catch (error) {
//         console.error(`[${now}] Ошибка в планировщике:`, error);
//     }
// });