import { format } from 'date-fns';
import { v4 as uuid } from 'uuid';
import { mkdir, appendFile } from 'fs/promises';
import fs from 'fs';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

const logEvents = async (message, logName) => {
    const dateTime = `${format(new Date(), 'yyyyMMdd\tHH:mm:ss')}`;
    const logItem = `${dateTime}\t${uuid()}\t${message}\n`;

    try {
        if (!fs.existsSync(path.join(__dirname, '..', 'logs'))) {
            await mkdir(path.join(__dirname, '..', 'logs'));
        }

        await appendFile(path.join(__dirname, '..', 'logs', logName), logItem);
    } catch (err) {
        console.log(err);
    }
}

const logger = (req, res, next) => {
    logEvents(`${req.url}`, 'reqLog.txt');
    console.log(`${req.method} ${req.path}`);
    next();
}
export { logger, logEvents };