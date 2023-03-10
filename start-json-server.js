import { exec } from 'child_process';
import dotenv from 'dotenv';

dotenv.config();

// eslint-disable-next-line no-undef
exec('json-server --watch db.json -p ' + process.env.DB_PORT, (error, _stdout, stderr) => {
    if (error) {
        return console.log(`error: ${error.message}`);
    }

    if (stderr) {
        return console.log(`stderr: ${stderr}`);
    }
});
