import { olog } from '@dbms-proj/utils';
import { createApp } from './app';
import { config } from './config';
import { Database } from './database';

async function main() {
    const port = config.get('port');

    await Database.instance().init();

    const app = await createApp();
    app.listen(port, () => {
        console.log(`API url is http://127.0.0.1:${port}/api`);
    });
}

main().catch((e) => olog.error(e));