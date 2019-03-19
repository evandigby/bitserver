import fs from 'fs';

let results: {[key: string]: number | undefined} = {};

function readLines(input: fs.ReadStream, func: (data: string) => void) {
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

        console.log(results);
    });
}


function func(data: string) {
    let current = results[data];
    if (!current) {
        current = 0;
    }
    current++;

    results[data] = current;
}

var input = fs.createReadStream('file.txt');

readLines(input, func);
