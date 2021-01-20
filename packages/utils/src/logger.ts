import ololog from 'ololog';
import { Signale } from 'signale';

export const olog = ololog.configure({
    time: true,
    tag: true,
});

export const slog = new Signale({
    disabled: false,
    interactive: false,
    types: {
        db: {
            badge: '🕮',
            color: 'yellow',
            label: 'DB',
            logLevel: 'info',
        },
    },
});
slog.config({
    displayFilename: true,
    displayTimestamp: true,
    displayDate: false,
});

process.on('uncaughtException', (e) => {
    olog.bright.red.error.noLocate(e);
});
process.on('unhandledRejection', (e) => {
    olog.bright.red.error.noLocate(e);
});
