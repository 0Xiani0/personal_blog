import express from 'express';
import cors from 'cors';

import router from './routers/index.js';

const PORT = 8081;

const app = express();

app.use(express.json(), cors());

app.use('/api', router);

function start() {
    try {
        app.listen(PORT, () => console.log(`Server start on port ${PORT}`));
    } catch (error) {
        console.log(error);
    }
}

start();