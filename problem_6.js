const fs = require('node:fs');


function covertInput() {
    let input = "";
    let distanceList = [];
    let timeList = [];
    input = fs.readFileSync('./input_6.txt', 'utf8');
    input = input.split("\n");
    input.forEach((data, index) => {
        data = data.trim().split(":")
        if (data[0].includes("Time")) {
            data[1].trim().split(" ").forEach(item => {
                if (!['', "", null, undefined].includes(item) && !isNaN(item))
                    timeList.push(+item)
            })
        }
        if (data[0].includes("Distance")) {
            data[1].trim().split(" ").forEach(item => {
                if (!['', "", null, undefined].includes(item) && !isNaN(item))
                    distanceList.push(+item)
            })
        }
    })

    return { distanceList, timeList };
}


let { distanceList, timeList } = covertInput();
let index = 0;
let product = 1;
for (let time of timeList) {
    let recordWin = 0;
    for (let i = 0; i <= time; i++) {
        if (i * (time - i) > distanceList[index]) {
            recordWin = recordWin + 1;
        }
    }
    index++;
    product= product * recordWin;
}
console.log(product)
