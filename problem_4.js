const fs = require('node:fs');

function covertInput() {
    let input = "";
    let input_list = [];
    input = fs.readFileSync('./input_4.txt', 'utf8');
    input = input.split("\n");
    input.forEach((data, index) => {
        input_list.push(data.trim());
    })

    return input_list;
}

function parse() {
    let card_details = [];
    for (let item of covertInput()) {
        let master = item.split("|");
        let data = master[1].trim().split(" ");
        data = data.filter(it => !['', "", " ", undefined, null].includes(it))
        let masterData = master[0].trim().split(":");
        let card_no = Number(masterData[0].substring(5)); 
        card_details.push({ master: masterData[1].trim().split(" ").filter(it => !['', "", " ", undefined, null].includes(it)), card_no, data })
    }
    return card_details;
}

function process() {
    let card_details = parse();
    let output = 0;
    for (let item of card_details) {
        let line_out = 0;
        for (let data of item.data) {
            if (item.master.includes(data)) {
                if (line_out === 0) {
                    line_out = line_out + 1;
                } else {
                    line_out = line_out * 2;
                }
            }
        }
        output = output + line_out;
    }
    return output;
}
process();