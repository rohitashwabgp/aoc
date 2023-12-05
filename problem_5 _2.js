const fs = require('node:fs');


let seeds = [];
let seed_soil_map = [];
let soil_fertilizer_map = [];
let fertilizer_water_map = [];
let water_light_map = [];
let light_temperature_map = [];
let temperature_humidity_map = [];
let humidity_location_map = [];
function covertInput() {
    let input = "";
    input = fs.readFileSync('./input_5.txt', 'utf8');
    input = input.split("\n");
    let pushTo = "";
    for (let data of input) {
        if (data.trim().includes("seeds")) {
            data.trim().split(":")[1].trim().split(" ").forEach(item => seeds.push(+item))

        } else if (data.trim().includes("seed-to-soil")) {
            pushTo = "seed_soil"
        }
        else if (data.trim().includes("soil-to-fertilizer")) {
            pushTo = "soil_fert"
        }
        else if (data.trim().includes("fertilizer-to-water")) {
            pushTo = "fert_water"

        } else if (data.trim().includes("water-to-light")) {
            pushTo = "water_light"
        } else if (data.trim().includes("light-to-temperature")) {
            pushTo = "light_temp"
        } else if (data.trim().includes("temperature-to-humidity")) {
            pushTo = "temp_humidity"
        } else if (data.trim().includes("humidity-to-location")) {
            pushTo = "humidity_location"
        }
        let itemToPush = data.trim().split(" ");
        if (isNaN(itemToPush[0]) || itemToPush.length !== 3) {
            continue;
        } else {
            if (pushTo === "seed_soil") {
                seed_soil_map.push({ soil: +itemToPush[0], seed: +itemToPush[1], count: +itemToPush[2] })
            } else if (pushTo === "soil_fert") {
                soil_fertilizer_map.push({ fertilizer: +itemToPush[0], soil: +itemToPush[1], count: +itemToPush[2] })

            } else if (pushTo === "fert_water") {
                fertilizer_water_map.push({ water: +itemToPush[0], fertilizer: +itemToPush[1], count: +itemToPush[2] })

            } else if (pushTo === "water_light") {
                water_light_map.push({ light: +itemToPush[0], water: +itemToPush[1], count: +itemToPush[2] })

            } else if (pushTo === "light_temp") {
                light_temperature_map.push({ temperature: +itemToPush[0], light: +itemToPush[1], count: +itemToPush[2] })

            } else if (pushTo === "temp_humidity") {
                temperature_humidity_map.push({ humidity: +itemToPush[0], temperature: +itemToPush[1], count: +itemToPush[2] })

            } else if (pushTo === "humidity_location") {
                humidity_location_map.push({ location: +itemToPush[0], humidity: +itemToPush[1], count: +itemToPush[2] })
            }
        }

    }

    return {
        seeds, seed_soil_map, soil_fertilizer_map, fertilizer_water_map, water_light_map,
        light_temperature_map, temperature_humidity_map, humidity_location_map
    }
}

let input = covertInput();
let minimum = null;

let index = 1
for (let seed of input.seeds) {
    if (index % 2 === 0) {
        let index_temp = 1; {            
            seedTemp = seeds[index - 2] + 1 ; 
            while (index_temp < seed) {
                index_temp = index_temp + 1;  
                seedTemp = seedTemp + 1;            
                minimum = process(input, minimum, seedTemp);
            }
        }
    } else {
        minimum =  process(input, minimum,seed)
    }
    index++;
}
console.log(minimum)

function process(input, minimum, seed) {
    let soil_temp = null;
    let fertilizer_temp = null;
    let water_temp = null;
    let light_temp = null;
    let temperature_temp = null;
    let humidity_temp = null;
    let location_temp = null;
    for (let soil of input.seed_soil_map) {
        if (soil.seed <= seed && seed < soil.seed + soil.count) {
            let diff = seed - soil.seed;
            soil_temp = soil.soil + diff;
        }
    }
    if (soil_temp === null) soil_temp = seed
    for (let fert of input.soil_fertilizer_map) {
        if (fert.soil <= soil_temp && soil_temp < fert.soil + fert.count) {
            let diff = soil_temp - fert.soil;
            fertilizer_temp = fert.fertilizer + diff;
        }
    }
    if (fertilizer_temp === null) fertilizer_temp = soil_temp
    for (let water of input.fertilizer_water_map) {
        if (water.fertilizer <= fertilizer_temp && fertilizer_temp < water.fertilizer + water.count) {
            let diff = fertilizer_temp - water.fertilizer;
            water_temp = water.water + diff;
        }
    }
    if (water_temp === null) water_temp = fertilizer_temp
    for (let light of input.water_light_map) {
        if (light.water <= water_temp && water_temp < light.water + light.count) {
            let diff = water_temp - light.water;
            light_temp = light.light + diff;
        }
    }
    if (light_temp === null) light_temp = water_temp
    for (let temp of input.light_temperature_map) {
        if (temp.light <= light_temp && light_temp < temp.light + temp.count) {
            let diff = light_temp - temp.light;
            temperature_temp = temp.temperature + diff;
        }
    }
    if (temperature_temp === null) temperature_temp = light_temp
    for (let humidity of input.temperature_humidity_map) {
        if (humidity.temperature <= temperature_temp && temperature_temp < humidity.temperature + humidity.count) {
            let diff = temperature_temp - humidity.temperature;
            humidity_temp = humidity.humidity + diff;
        }
    }
    if (humidity_temp === null) humidity_temp = temperature_temp
    for (let location of input.humidity_location_map) {
        if (location.humidity <= humidity_temp && humidity_temp < location.humidity + location.count) {
            let diff = humidity_temp - location.humidity;
            location_temp = location.location + diff;
        }
    }
    if (location_temp === null) location_temp = humidity_temp

    if (minimum === null || minimum > location_temp)
        minimum = location_temp
    return minimum;
}
console.log(minimum)