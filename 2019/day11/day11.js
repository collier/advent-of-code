"use strict";
exports.__esModule = true;
var fs_1 = require("fs");
var input = fs_1.readFileSync('./day11/day11-input.txt', 'utf-8');
var memory = input.split(',').map(function (n) { return parseInt(n); });
console.log(memory);
