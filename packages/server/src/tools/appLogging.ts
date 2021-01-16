import Fs from 'fs-extra';
import morgan from 'morgan';
import { createStream, Generator } from 'rotating-file-stream';

const nameGen = (name: String): Generator => (date: number | Date, index?: Number) => {
    if (!date) return name + '.log';
    if (!(date instanceof Date)) {
        date = new Date(date);
    }
    let year = date.getFullYear();
    let month = (date.getMonth() + 1).toString().padStart(2, '0');
    let day = date.getDate().toString().padStart(2, '0');
    let hour = date.getHours().toString().padStart(2, '0');
    let minute = date.getMinutes().toString().padStart(2, '0');

    return `${name}-${year}${month}${day}-${hour}${minute}-${index}.log`;
};

export const appLogging = (
    name = 'access',
    opts = {
        size: '2M',
        interval: '1d',
    },
    logPath = './logs/'
) => {
    Fs.ensureDirSync(logPath);

    const stream = createStream(nameGen(name), {
        path: logPath,
        ...opts,
    });

    return morgan('combined', { stream });
};
