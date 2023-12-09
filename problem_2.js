const fs = require('node:fs');

function covertInput() {
    let input = "";
    let output = [];
    try {
        input = fs.readFileSync('C:/Users/Acer/Downloads/input.txt', 'utf8');
        input = input.split("\n");
        input.forEach(data => {
            let game_data_array = data.split(":");
            let gateInputColor = game_data_array[1].split(";");
            let color_data = [];
            gateInputColor.forEach(color => {
                let red = 0;
                let blue = 0;
                let green = 0;
                let color_set_list = color.trim().split(",");
                color_set_list.forEach(_set => {
                    let color_list = _set.trim().split(" ")
                    if (color_list[1] === 'red')
                        red = +color_list[0];
                    if (color_list[1] === 'green')
                        green = +color_list[0];
                    if (color_list[1] === 'blue')
                        blue = +color_list[0];
                })
                color_data.push({ red, blue, green });
            })
            output.push({ id: +`${game_data_array[0].substring(5)}`, data: color_data })
        })
    } catch (err) {
        console.error(err);
    }

    return output;
}
function process() {
    const input = covertInput();
    let power = 0;
    for (let items of input) {
        let minimum = { red: 0, green: 0, blue: 0 };
        for (let item of items['data']) {
            Object.keys(item).forEach(key => {
                if (minimum[key] < item[key]) {
                    minimum[key] = item[key];
                }
            })
        }
        console.log(minimum["red"] * minimum["blue"] * minimum["green"])
        power = power + (minimum["red"] * minimum["blue"] * minimum["green"])
    }
    return power;
}
console.log(process())