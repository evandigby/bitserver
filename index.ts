import SerialPort from 'serialport';
import fs from 'fs';

let results: {
    tab: {
        [key: string]: number | undefined
    }
    votesReceived: {
        [key: number]: boolean
    }
} = {
    tab: {},
    votesReceived: {},
};

const serialport = new SerialPort("COM6", {
    baudRate: 115200
},
    (err) => {
        if (err) {
            console.log(`error opening port: ${err}`);
            process.exit(1);
        }
    }
);

function readLines(input: SerialPort, func: (data: string) => void) {
    var remaining = '';

    input.on('data', function (data) {
        remaining += data;
        var index = remaining.indexOf('\n');
        while (index > -1) {
            var line = remaining.substring(0, index);
            remaining = remaining.substring(index + 1);
            func(line);
            index = remaining.indexOf('\n');
        }
    });

    input.on('end', function () {
        if (remaining.length > 0) {
            func(remaining);
        }
    });
}

function func(data: string) {
    let record: { t: number, s: number, v: any, n?: string } = JSON.parse(data);

    let vote = results.votesReceived[record.s];
    if (vote) {
        return
    }

    results.votesReceived[record.s] = true;

    let current = results.tab[record.v];
    if (!current) {
        current = 0;
    }
    current++;

    results.tab[record.v] = current;

    fs.writeFileSync("results.txt", JSON.stringify(results, null, "  "));
}

readLines(serialport, func);