import SerialPort from 'serialport';
import fs from 'fs';

const serialport = new SerialPort("COM4", {
    baudRate: 115200
},
    (err) => {
        if (err) {
            console.log(`error opening port: ${err}`);
            process.exit(1);
        }
    }
);

serialport.on('data', (data) => {
    fs.appendFileSync("file.txt", `${data}\n`);
});