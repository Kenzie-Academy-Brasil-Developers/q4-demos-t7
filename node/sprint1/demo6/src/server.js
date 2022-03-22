import app from './app';
import expressListRoutes from 'express-list-routes';

expressListRoutes(app);

const PORT = process.env.RUN_PORT ? process.env.RUN_PORT : 3000;

app.listen(PORT, () => console.log(`App is runnining on port ${PORT}`));
