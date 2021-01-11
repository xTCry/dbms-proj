import { Application } from 'express';
import Fs from 'fs-extra';
import morgan from 'morgan';
import { createStream } from 'rotating-file-stream';

const nameGen = (name: String) => (time: Date, index: Number) => {
    if (!time) return name + '.log';

    let year = time.getFullYear();
    let month = (time.getMonth() + 1).toString().padStart(2, '0');
    let day = time.getDate().toString().padStart(2, '0');
    let hour = time.getHours().toString().padStart(2, '0');
    let minute = time.getMinutes().toString().padStart(2, '0');

    return `${name}-${year}${month}${day}-${hour}${minute}-${index}.log`;
};

export const appLogger = (
    app: Application,
    name = 'access',
    opts = {
        size: '2M',
        interval: '1d',
    },
    logPath = './logs/'
) => {
    Fs.existsSync(logPath) || Fs.mkdirSync(logPath);

    const logStream = createStream(nameGen(name) as any, {
        path: logPath,
        ...opts,
    });

    app.use(
        morgan('combined', {
            stream: logStream,
        })
    );
};
