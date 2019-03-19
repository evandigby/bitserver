"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var serialport_1 = __importDefault(require("serialport"));
var fs_1 = __importDefault(require("fs"));
var results = {
    tab: {},
    votesReceived: {},
};
var serialport = new serialport_1.default("COM6", {
    baudRate: 115200
}, function (err) {
    if (err) {
        console.log("error opening port: " + err);
        process.exit(1);
    }
});
function readLines(input, func) {
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
function func(data) {
    var record = JSON.parse(data);
    var vote = results.votesReceived[record.s];
    if (vote) {
        console.log('duplicate retrieve');
        return;
    }
    results.votesReceived[record.s] = true;
    var current = results.tab[record.v];
    if (!current) {
        current = 0;
    }
    current++;
    results.tab[record.v] = current;
    fs_1.default.writeFileSync("results.txt", JSON.stringify(results, null, "  "));
}
readLines(serialport, func);
