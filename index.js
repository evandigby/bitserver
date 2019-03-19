"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var serialport_1 = __importDefault(require("serialport"));
var fs_1 = __importDefault(require("fs"));
var serialport = new serialport_1.default("COM4", {
    baudRate: 115200
}, function (err) {
    if (err) {
        console.log("error opening port: " + err);
        process.exit(1);
    }
});
serialport.on('data', function (data) {
    fs_1.default.appendFileSync("file.txt", data + "\n");
});
