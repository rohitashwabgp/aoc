const fs = require('node:fs');


function convert() {
    let input = fs.readFileSync('./input_11.txt', 'utf8');
    let lines = input.split('\n');
    let line_duplicate = [];
    for (let y = 0; y < lines.length; y++) {
        lines[y] = lines[y].trim().split("")
        line_duplicate.push([...lines[y]]);
        if (!lines[y].includes("#")) {
            line_duplicate.push([...lines[y]])
        }
    }
    let yCount = line_duplicate.length;
    let xCount = line_duplicate[0].length;
    for (let x = 0; x < xCount; x++) {
        let isDouble = true;
        for (let y = 0; y < yCount; y++) {
            if (line_duplicate[y][x] === "#") {
                isDouble = false;
                break;
            }
        }
        if (isDouble) {
            for (let j = 0; j < yCount; j++) {
                line_duplicate[j].splice(x, 0, ".")
            }
            x = x + 1
            xCount = xCount + 1;
        }
    }

    return line_duplicate
}
let lines = convert();
let indexedLines = [];
for (let y = 0; y < lines.length; y++) {
    for (let x = 0; x < lines[y].length; x++) {
        if (lines[y][x] === "#") {
            indexedLines.push({ item: String(x) + "_" + String(y), indexX: x, indexY: y })
        }
    }
}
console.log(indexedLines)
let ind = 0;
for (let i = 0; i < indexedLines.length - 1; i++) {
    for (let j = i + 1; j < indexedLines.length; j++) {
        let countX = indexedLines[j].indexX - indexedLines[i].indexX;
        if (countX < 0) countX = (0 - countX)
        let countY = indexedLines[j].indexY - indexedLines[i].indexY;
        if (countY < 0) countY = (0 - countY)
        ind = ind + countX + countY
    }
}
console.log(ind)