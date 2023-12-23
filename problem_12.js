const fs = require('node:fs');


function convert() {
    let input = fs.readFileSync('./input_12.txt', 'utf8');
    let lines = input.split('\n');
    for (let y = 0; y < lines.length; y++) {
        lines[y] = lines[y].trim().split(" ")
        lines[y][1] = lines[y][1].split(",")
        lines[y][1] = lines[y][1].map(data => +data)
        lines[y] = { line: lines[y][0], indexU: lines[y][1] }

    }
    return lines
}

let lines = convert()
let unknownLocations = []
console.log(lines)
for (let line of lines) {
    let temp = line.line.split(".");
    let it = { un_val: [], un_no: line.indexU }
    temp.forEach((item, index) => {
        if (item.indexOf("?") >= 0 || item.indexOf("#") >= 0) {
            it.un_val.push({ item, index })
        }
    })
    unknownLocations.push(it)

}
let val = 0;
for (let i = 0; i < unknownLocations.length; i++) {
    let perm_places = 1;
    let indexT = 0;
    for (let j = 0; j<unknownLocations[i].un_no.length; j++) {
        let count = unknownLocations[i].un_no[j];
        let temp = unknownLocations[i].un_val.filter(data => data.index === indexT)
        let temp_item = temp[0].item.split("");
        let countQuest = 0;
        let countHash = 0;
        temp_item.forEach((a) => {
            if (a === "#") {
                countHash = countHash + 1
            }
            if (a === "?") {
                countQuest = countQuest + 1
            }

        })
        while (count + unknownLocations[i].un_no[j + 1] < countQuest) {
            count = count + unknownLocations[i].un_no[j + 1];
            j = j + 1;
            indexT = indexT + 1;
        }
        if (countQuest === 0) {
            if (countHash === count) {
                perm_places = perm_places ;
            }
        } else {
            perm_places = perm_places * (countQuest - count);
        }
    }
    console.log(perm_places)

}
console.log(unknownLocations)