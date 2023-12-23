const fs = require('node:fs');


function convert() {
    let input = fs.readFileSync('./input_17.txt', 'utf8');
    let lines = input.split('\n');
    for (let y = 0; y < lines.length; y++) {
        lines[y] = lines[y].trim().split("")
        lines[y] = lines[y].map(data => +data)
    }
    return lines
}

let lines = convert()



console.log(lines)