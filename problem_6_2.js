const fs = require('node:fs');


function covertInput() {
    let input = "";
    let distance = "";
    let time= "";
    input = fs.readFileSync('./input_6.txt', 'utf8');
    input = input.split("\n");
    input.forEach((data, index) => {
        data = data.trim().split(":")
        if (data[0].includes("Time")) {
            data[1].trim().split(" ").forEach(item => {
                if (!['', "", null, undefined].includes(item) && !isNaN(item))
                time = time + item
            })
        }
        if (data[0].includes("Distance")) {
            data[1].trim().split(" ").forEach(item => {
                if (!['', "", null, undefined].includes(item) && !isNaN(item))
                distance = distance + item
            })
        }
    })

    return { distance: +distance, time: +time };
}


let { distance, time } = covertInput();
let product = 1;
let recordWin = 0;
    for (let i = 0; i <= time; i++) {
        if (i * (time - i) > distance) {
            recordWin = recordWin + 1;
        }
}
console.log(recordWin)
