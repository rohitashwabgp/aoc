const fs = require('node:fs');


function convert() {
    let input = fs.readFileSync('./input_18.txt', 'utf8');
    let lines = input.split('\n');
    for (let y = 0; y < lines.length; y++) {
        lines[y] = lines[y].trim().split(" ")
        let code = lines[y][2].split("(").join("");
        code = code.split(")").join("");
        lines[y] = { direction: lines[y][0], depth: lines[y][1], code }

    }
    return lines
}

function matrix() {
    let lines = convert()
    let out = [[]];
    let left = 0;
    let up = 0;
    for (let i = 0; i < lines.length; i++) {
        let depth = +lines[i].depth;
        switch (lines[i].direction) {
            case 'R':

                break;
            case 'D':

                break;
            case 'L':
                left = left + depth
                break;
            case 'U':
                up = up + depth
                break;

        }
    }
    let pointer = { x: 25, y: 231 }

    for (let i = 0; i < lines.length; i++) {
        let depth = +lines[i].depth;

        switch (lines[i].direction) {
            case 'R':
                [...Array(depth)].forEach((data, index) => {
                    if ([null, undefined, "", "undefined"].includes(out[pointer.y])) {
                        out[pointer.y] = []
                    }
                    pointer.x = pointer.x + 1;
                    out[pointer.y][pointer.x] = 1;
                })
                break;
            case 'D':
                [...Array(depth)].forEach((data, index) => {
                    if ([null, undefined, "", "undefined"].includes(out[pointer.y + 1])) {
                        out[pointer.y + 1] = []
                    }
                    pointer.y = pointer.y + 1
                    out[pointer.y][pointer.x] = 1;
                })
                break;
            case 'L':
                [...Array(depth)].forEach((data, index) => {
                    if ([null, undefined, "", "undefined"].includes(out[pointer.y])) {
                        out[pointer.y] = []
                    }
                    pointer.x = pointer.x - 1;
                    out[pointer.y][pointer.x] = 1;
                })
                break;
            case 'U':
                [...Array(depth)].forEach((data, index) => {
                    if ([null, undefined, "", "undefined"].includes(out[pointer.y - 1])) {
                        out[pointer.y - 1] = []
                    }
                    pointer.y = pointer.y - 1
                    out[pointer.y][pointer.x] = 1;
                })
                break;
        }
        if (pointer.x <= 0) {
            console.log(i)
        }
    }
    return out;
}
let out = matrix()




// for (let i = 0; i < out.length; i++) {
//     for (let j = 0; j < out[i].length; j++) {
//         while ()
//             out[i][j] = out[i][j] || " "

//     }
// }

let sum = 0;
for (let i = 0; i < out.length; i++) {
    let nextIndex = out[i].indexOf(1);
    while (out[i].indexOf(1, nextIndex+1) > 0) {
        if(nextIndex%2 !==1){
            for(let k= nextIndex;k<out[i].indexOf(1, nextIndex);i++) {
                out[i][k] = 1
            }
        }
        
        nextIndex = out[i].indexOf(1, nextIndex+1);

    }
   
}

let dat = ""
for (let i = 0; i < out.length; i++) {
    dat = dat + out[i].toString()
    dat = dat + "\n"
}
fs.writeFileSync("output.txt", dat)
console.log(sum)
