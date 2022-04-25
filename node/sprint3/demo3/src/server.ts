import { createConnection } from 'typeorm';
import app from './app';

createConnection().then(() => {
  app.listen(3000, () => {
    console.log('App running on http://localhost:3000');
  });
}).catch(err => console.log(err))
