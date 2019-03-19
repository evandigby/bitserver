"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = __importDefault(require("fs"));
var results = {};
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
        console.log(results);
    });
}
function func(data) {
    var current = results[data];
    if (!current) {
        current = 0;
    }
    current++;
    results[data] = current;
}
var input = fs_1.default.createReadStream('file.txt');
readLines(input, func);
