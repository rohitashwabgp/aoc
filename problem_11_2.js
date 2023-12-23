const fs = require('node:fs');

let times = 1000000;
function convert() {
    let input = fs.readFileSync('./input_11.txt', 'utf8');
    let lines = input.split('\n');
    let line_duplicate = [];

    let indexY = -1;
    for (let y = 0; y < lines.length; y++) {
        lines[y] = lines[y].trim().split("")
        if (!lines[y].includes("#")) {
            indexY = indexY + times
            lines[y].forEach((data, index) => {
                line_duplicate.push({ val: data, indexY, indexX: index })
            })
        } else {

            indexY = indexY + 1
            lines[y].forEach((data, index) => {
                line_duplicate.push({ val: data, indexY, indexX: index })
            })

        }
    }
    let yCount = line_duplicate.length;
    let xCount = lines[0].length;
    //   let k =lin;

    for (let k = 0; k < yCount / xCount; k++) {

        let isDouble = true;
        for (let y = k; y < yCount; y = y + (yCount / xCount)) {
            if (line_duplicate[y].val === "#") {
                isDouble = false;
                break;
            }
        }
        if (isDouble) {
            let mult =1;
            for (let y = k; y < yCount; y = y + (yCount / xCount)) {
                for (let j = y; j < (mult) * (yCount / xCount); j++) {
                    line_duplicate[j].indexX = line_duplicate[j].indexX + times - 1
                }
                mult++;
            }
        }
    }

    return line_duplicate
}
let lines = convert();
let indexedLines = [];
for (let y = 0; y < lines.length; y++) {
    if (lines[y].val === "#") {
        indexedLines.push({ item: String(lines[y].indexX) + "_" + String(lines[y].indexY), indexX: lines[y].indexX, indexY: lines[y].indexY })
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