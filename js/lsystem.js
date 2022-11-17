/*
* SIMPLE SVG BASED L SYSTEM GENERATOR
* Alphabet based on the characters as defined
* by the L-System Manual
* http://paulbourke.net/fractals/lsys/
*
*
* */

//**********************************************************************************************************************
// Basic Drawing Globals

//Stroke Width
let strokeWidth = 3;

//Windows Dimensions
const window_dims = {
    // width: window.innerWidth,
    // height: window.innerHeight,
    // wincw: window.innerWidth / 2,
    // winch: window.innerHeight / 2
    width: 400,
    height: 225,
    wincw: 400 / 2,
    winch: 225 / 2
};

//https://calculateaspectratio.com/
//View Box Size
const vb_size = {
    width: 1280,
    height: 720
}

//Default Axioms and Replacement Rules
//Examples based off of the L-System Manual
const replacementRules = {
    dragon_curve: {
        axiom: 'F',
        angle: 90,
        length: [20,0],
        iterations: 15,
        rules: [
            {
                char: 'F',
                rule: 'F+G'
            },
            {
                char: 'G',
                rule: 'F-G'
            }
        ]
    },
    triangle: {
        axiom: 'F+F+F',
        angle: 120,
        length: [0,20],
        iterations: 8,
        rules: [
            {
                char: 'F',
                rule: 'F-F+F'
            }
        ]
    },
    simple_tree: {
        axiom: 'X',
        angle: 22.5,
        length: [0,12],
        iterations: 6,
        rules: [
            {
                char: 'F',
                rule: 'FF'
            },
            {
                char: 'X',
                rule: 'F-[[X]+X]+F[+FX]-X'
            }
        ]
    },
    smokey_snake_big: {
        axiom: 'f+F-f',
        angle: 45,
        length: 30,
        iterations: 13,
        rules: [
            {
                char: 'F',
                rule: 'F+f'
            },
            {
                char: 'f',
                rule: '-F+f+F'
            }
        ]
    },
    test_smoke_crash: {
        axiom: 'f+F-f',
        angle: 45,
        length: 30,
        iterations: 10,
        rules: [
            {
                char: 'F',
                rule: 'F-f'
            },
            {
                char: 'f',
                rule: '-F+f+F'
            }
        ]
    },
    saupe_tree: {
        axiom: 'VZFFF',
        angle: 20,
        length: [0,20],
        iterations: 12,
        rules: [
            {
                char: 'V',
                rule: '[+++W][---W]YV'
            },
            {
                char: 'W',
                rule: '+X[-W]Z'
            },
            {
                char: 'X',
                rule: '-W[+X]Z'
            },
            {
                char: 'Y',
                rule: 'YZ'
            },
            {
                char: 'Z',
                rule: '[-FFF][+FFF]F'
            }
        ]
    },
    alien_tree: {
        axiom: 'F',
        angle: 35,
        length: [0,15],
        iterations: 5,
        rules: [
            {
                char: 'F',
                rule: 'F[+FF][-FF]F[-F][+F]F'
            }
        ]
    },
    the_mother_ship: {
        axiom: 'F',
        angle: 240,
        length: [0,20],
        iterations: 5,
        rules: [
            {
                char: 'F',
                rule: 'F[+FF][-FF]F[-F][+F]F'
            }
        ]
    },
    snow_flake: {
        axiom: 'F++F++F++F++F',
        angle: 36,
        length: [0,30],
        iterations: 4,
        rules: [
            {
                char: 'F',
                rule: 'F++F++F+++++F-F++F'
            }
        ]
    },
    rings: {
        axiom: 'F++F++F++F++F',
        angle: 61,
        length: [0,20],
        iterations: 4,
        rules: [
            {
                char: 'F',
                rule: 'F++F++F+++++F-F++F'
            }
        ]
    },
    starish: {
        axiom: 'F++F++F++F++F',
        angle: 66, //65 looks like DNA???
        length: [0,20],
        iterations: 4,
        rules: [
            {
                char: 'F',
                rule: 'F++F++F+++++F-F++F'
            }
        ]
    },
    windmill: {
        axiom: 'F++F++F++F++F',
        angle: 36, //65 looks like DNA???
        length: [0,20],
        iterations: 5,
        rules: [
            {
                char: 'F',
                rule: 'F++B++F+++++F-F++F'
            },
            {
                char: 'B',
                rule: '[F+f'
            },
            {
                char: 'f',
                rule: '-]F'
            },
        ]
    },
    weed: {
        axiom: 'F',
        angle: 22.5,
        length: [0,20],
        iterations: 6,
        rules: [
            {
                char: 'F',
                rule: 'FF-[XY]+[XY]'
            },
            {
                char: 'X',
                rule: '+FY'
            },
            {
                char: 'Y',
                rule: '-FX'
            },
        ]
    },
    square_sierpinski: {
        axiom: 'F+XF+F+XF',
        angle:  90,
        length: [0,20],
        iterations: 6,
        rules: [
            {
                char: 'X',
                rule: 'XF-F+F-XF+F+XF-F+F-X'
            }
        ]
    },
    Quadratic_Koch_Island: {
        axiom: 'F+F+F+F',
        angle:  90,
        length: [0,10],
        iterations: 2,
        rules: [
            {
                char: 'F',
                rule: 'F+F-F-FFF+F+F-F'
            }
        ]
    },
    Board: {
        axiom: 'F+F+F+F',
        angle:  90, //90,271
        length: [0,15],
        iterations: 3,
        rules: [
            {
                char: 'F',
                rule: 'FF+F+F+F+FF'
            }
        ]
    },
    Koch: {
        axiom: 'F++F++F',
        angle:  60,
        length: [0,15],
        iterations:4,
        rules: [
            {
                char: 'F',
                rule: 'F-F++F-F'
            }
        ]
    },
    Classic_Sierpinski_Curve: {
        axiom: 'F--XF--F--XF',
        angle:  45,
        length: [0,15],
        iterations:5,
        rules: [
            {
                char: 'X',
                rule: 'XF+F+XF--F--XF+F+X'
            }
        ]
    },
    Classic_Sierpinski_Curve_dot: {
        axiom: '@--X@--@--X@',
        angle:  45,
        length: [0,15],
        iterations:5,
        rules: [
            {
                char: 'X',
                rule: 'X@+@+X@--@--X@+@+X'
            }
        ]
    },
    flying_fish_winds: {
        axiom: 'F++F++F++F++F',
        angle: 36,
        length: [0,30],
        iterations: 4,
        rules: [
            {
                char: 'F',
                rule: 'F++F++F+++++F-F++FG'
            },
            {
                char: 'G',
                rule: 'F-F'
            }
        ]
    },
    i_see_stars: {
        axiom: 'F+F+F+F+F',
        angle: 72,
        length: [0,30],
        iterations: 4,
        rules: [
            {
                char: 'F',
                rule: 'F++F++F+++++F-F++F'
            }
        ]
    }
}

const default_line_values = {
    x1: window_dims.wincw,
    y1: window_dims.winch,
    x2: window_dims.wincw,
    y2: window_dims.winch,
    angle: 0,
    rad: 0,
    counter: 0,
    toggle: 0
}

let line_values = {
    x1: default_line_values.x1,
    y1: default_line_values.y1,
    x2: default_line_values.x2,
    y2: default_line_values.y2,
    angle: default_line_values.angle,
    rad: default_line_values.rad,
    counter: default_line_values.counter,
    toggle: 0
}

//Stack used for push and pop rules
const stack = []

//Main fractal ruleset
let fractal = replacementRules.triangle;

//**********************************************************************************************************************
//Generate L-System
function LSystem(numIters, axiom) {
    let startString = axiom;
    let endString = "";
    for (let i = 0; i < numIters; i++) {
        endString = processString(startString)
        startString = endString
    }
    // console.log(endString.length)
    return endString;
}

function processString(oldStr) {
    let newstr = "";
    for (let i = 0; i < oldStr.length; i++) {
        newstr = newstr + rules(oldStr.charAt(i));
    }
    return newstr;
}

function rules(char) {
    for (let i = 0; i < fractal.rules.length; i++) {
        if (char === fractal.rules[i].char) {
            return fractal.rules[i].rule;
        }
    }
    return char;
}

//https://mokole.com/palette.html
//https://medialab.github.io/iwanthue/
const colorList = {
    c_red: ["#ff0000"],
    c_rgb: ["#ff0000", "#00ff00","#0100fa"],
    c_bigmix: ["#191970", "#006400", "#ff0000", "#ffd700", "#00ff00", "#00ffff", "#ff00ff", "#ffb6c1"],
    c_cb: ["#d3b324", "#836fe8", "#00824f", "#760013"],
    c_cb2: ["#0062c5", "#30eb96", "#d22a45", "#a58100"],
    c_cb3: ["#f5b1ff", "#e2ae28", "#92001e"],
    c_cb4: ["#660008", "#a45600", "#21aa45", "#ff957b", "#e9be35"],
    c_cb5: ["#00cfaa", "#f58cff", "#8f4a00",],
    c_cb6: ["#89a651", "#965ea7", "#bc5842"],
    c_cb7: ["#ff8eda", "#749f09", "#0271d8"],
    c_cb8: ["#171c86", "#853f00", "#ca1747"],
    c_greens: ["#cbd356", "#879b60", "#70cf54"],
    c_green: ["#70cf54"],
    c_yelLi:["#93814d", "#c1c376","#daaf3a"],
    c_reds:["#801100", "#B62203","#D73502","#FC6400","#FF7500","#FAC000"],
}
let colors = colorList.c_yelLi

function chooseColor() {
    let num = line_values.counter;
    line_values.counter = line_values.counter + 1;
    return colors[num % colors.length];
}

function changeAngle(angle) {
    line_values.angle = (line_values.angle + angle) % 360
    line_values.rad = (Math.PI / 180.0) * line_values.angle
}

function decrementAngle(angle) {
    line_values.angle = line_values.angle - angle
    line_values.rad = (Math.PI / 180.0) * line_values.angle
}


function incrementAngle(angle) {
    line_values.angle = line_values.angle + angle
    line_values.rad = (Math.PI / 180.0) * line_values.angle
}



function computeValues(distX, distY, angle) {
    //https://academo.org/demos/rotation-about-point/
    //https://stackoverflow.com/questions/2259476/rotating-a-point-about-another-point-2d
    //https://danceswithcode.net/engineeringnotes/rotations_in_2d/rotations_in_2d.html
    //copy points
    line_values.x1 = line_values.x2
    line_values.y1 = line_values.y2
    line_values.x2 = line_values.x1 + distX
    line_values.y2 = line_values.y2 + distY

    let cos = Math.cos(line_values.rad);
    let sin = Math.sin(line_values.rad);
    let cx = line_values.x1
    let cy = line_values.y1

    let x = ((line_values.x2 - cx) * cos) - ((line_values.y2 - cy) * sin) + cx;
    let y = ((line_values.x2 - cx) * sin) + ((line_values.y2 - cy) * cos) + cy;

    line_values.x2 = x
    line_values.y2 = y
}

function drawLine(c = 'black') {
    g.append('line')
        .style("stroke", `${c}`)
        .style("stroke-width", strokeWidth)
        .attr("x1", line_values.x1)
        .attr("y1", line_values.y1)
        .attr("x2", line_values.x2)
        .attr("y2", line_values.y2)
        .attr("stroke-linecap", "round")
}


function drawCircle(d,dy,c = 'black') {
    let cc = c;
    let dd = (d > 0) ? d : (dy > 0) ? dy : 5;
    g.append('circle')
        .style("stroke",`${cc}`)
        .style("fill", `${cc}`)
        .attr("cx", line_values.x2)
        .attr("cy", line_values.y2)
        .attr("r", dd*1/8)
}

function forward(d, dy, a, c = 'black') {
    computeValues(d, dy, a)
    drawLine(c);
}

function forwardDot(d, dy, a, c = 'black') {
    computeValues(d, dy, a)
    drawCircle(d,dy,c);
}

function move(d, dy, a, c = 'black') {
    computeValues(d, dy, a)
}

function backward(d, a, c = 'black') {
    computeValues(-d, 0, a)
    drawLine(c);
}
//(	         Decrement turning angle by turning angle increment
function decermentTurningAngle(d, a, c = 'black') {

}
//)	         Increment turning angle by turning angle increment


function stackPush(d, dy, a, c = 'black') {
    //[
    // push current drawing state onto stack
    let line_values_cp = {
        x1: line_values.x1,
        y1: line_values.y1,
        x2: line_values.x2,
        y2: line_values.y2,
        angle: line_values.angle,
        rad: line_values.rad,
        counter: line_values.counter,
        toggle: line_values.toggle
    }
    stack.push(line_values_cp)
}

function stackPop(d, dy, a, c = 'black') {
    //]
    // pop current drawing state onto stack
    line_values = stack.pop()
}


//Generate the L-SYSTEM, run, submit
function getData(form) {
    //https://stackoverflow.com/questions/3547035/getting-html-form-values
    let formData = new FormData(form);
    // iterate through entries...
    // for (let pair of formData.entries()) {
    //     console.log(pair[0] + ": " + pair[1]);
    // }
    // console.log(Object.fromEntries(formData));
    // = text.replace(/^\s+|\s+$/gm,'')
    // console.log(Object.fromEntries(formData));
    let user_lsys =  {
            axiom: '',
            angle: 0,
            length: [0,20],
            iterations:0,
            rules: [],
    }
    let rule = {
        char: "",
        rule: "",
    }
    let user_color = []
    const re1 = new RegExp('(rules)\\[\\d+\\]\\[char\\]');
    const re2 = new RegExp('(rules)\\[\\d+\\]\\[rule\\]');
    for (let pair of formData.entries()) {
        // console.log(pair[0] + ": " + pair[1]);
        pair[1]=pair[1].replace(/^\s+|\s+$/gm,'');
        let str = pair[0]

        if (re1.test(pair[0])) {
            rule.char = pair[1];
        } else if (re2.test(pair[0])) {
            rule.rule = pair[1];
            user_lsys.rules.push(Object.assign({}, rule));
        }
        else {
            switch (str) {
                case "axiom":
                    user_lsys.axiom = pair[1];
                    break;
                case "angle":
                    user_lsys.angle = parseFloat(pair[1]);
                    break;
                case "lengthX":
                    user_lsys.length[0] = parseInt(pair[1],10);
                    break;
                case "lengthY":
                    user_lsys.length[1] = parseInt(pair[1],10);
                    break;
                case "iterations":
                    user_lsys.iterations =  parseInt(pair[1],10);
                    break;
                case 'color':
                    user_color.push(pair[1]);
                    break;
                default:
                    //Should never happen!
                    // console.log(pair[0] + ": " + pair[1]);
                    // console.log("AHHHHHHHHHHH!");
            }
        }
    }
    // console.log(user_color)
    colors = user_color;
    fractal = user_lsys;
    Promise.all([LSystem(fractal.iterations, fractal.axiom)]).then(d => {
            clearCurrentSVG();
            drawLsystem(d[0], fractal.angle,...fractal.length);
        }
    )
}


function makeInputColor(value) {
    let newColorInput = document.createElement("input");
    newColorInput.type = "color";
    newColorInput.name = "color";
    newColorInput.value = `${value}`;
    return newColorInput;
}

function addColorsFromList(elem,colorListArray) {
    for (let i = 0; i < colorListArray.length;++i){
        elem.append(makeInputColor(colorListArray[i]));
    }
}

//ON LOAD GET THE FORM TAG!
let inputData = document.getElementById("input-form");
let presetSelection = document.getElementById("preset-select-options");
let colorSelection = document.getElementById("color-options");

document.addEventListener('DOMContentLoaded', function() {
    inputData = document.getElementById("input-form")
    inputData.addEventListener("submit", function (e) {
        e.preventDefault();
        getData(e.target);
    });


    //Color Preset Options
    colorSelection = document.getElementById("color-options");
    colorSelection.onchange = function () {
        let currentColors = document.getElementById("current-colors");
        let selectedIndex = colorSelection.selectedIndex;
        let choice = colorSelection.options[selectedIndex].value;
        let len = currentColors.children.length
        for (let i = 0; i < len; ++i) {
            currentColors.removeChild(currentColors.children[0]);
        }
        if ((typeof parseInt(choice,10)) === 'number') {
            for (let i = 0; i < parseInt(choice,10); i++) {
                currentColors.append(makeInputColor(colorList.c_red[0]));
            }
        }
        switch (choice) {
            case "default":
                addColorsFromList(currentColors,colorList.c_yelLi)
                break;
            case "c_rgb":
                addColorsFromList(currentColors,colorList.c_rgb)
                break;
            case "c_bigmix":
                addColorsFromList(currentColors,colorList.c_bigmix)
                break;
            case "c_greens":
                addColorsFromList(currentColors,colorList.c_greens)
                break;
            case "c_reds":
                addColorsFromList(currentColors,colorList.c_reds)
                break;
            case "c_bigmix":
                addColorsFromList(currentColors,colorList.c_bigmix)
                break;
            default:
                break;
        }

    };

    //Extra Presets Options
    presetSelection = document.getElementById("preset-select-options");
    presetSelection.onchange = function () {
      let selectedIndex = presetSelection.selectedIndex;
        // console.log(presetSelection.options[selectedIndex].value)
        // console.log(presetSelection.options[selectedIndex].text)
        switch (presetSelection.options[selectedIndex].value) {
            case "saupe_tree":
                clearCurrentSVG();
                clearFormData();
                fractal = replacementRules.saupe_tree;
                populateRuleset(fractal);
                break;
            case "alien_tree":
                clearCurrentSVG();
                clearFormData();
                fractal = replacementRules.test_tree;
                populateRuleset(fractal);
                break;
            case "the_mother_ship":
                clearCurrentSVG();
                clearFormData();
                fractal = replacementRules.the_mother_ship;
                populateRuleset(fractal);
                break;
            case "rings":
                clearCurrentSVG();
                clearFormData();
                fractal = replacementRules.rings;
                populateRuleset(fractal);
                break;
            case "starish":
                clearCurrentSVG();
                clearFormData();
                fractal = replacementRules.starish;
                populateRuleset(fractal);
                break;
            case "windmill":
                clearCurrentSVG();
                clearFormData();
                fractal = replacementRules.windmill;
                populateRuleset(fractal);
                break;
            case "weed":
                clearCurrentSVG();
                clearFormData();
                fractal = replacementRules.weed;
                populateRuleset(fractal);
                break;
            case "square_sierpinski":
                clearCurrentSVG();
                clearFormData();
                fractal = replacementRules.square_sierpinski;
                populateRuleset(fractal);
                break;
            case "Classic_Sierpinski_Curve_dot":
                clearCurrentSVG();
                clearFormData();
                fractal = replacementRules.Classic_Sierpinski_Curve_dot;
                populateRuleset(fractal);
                break;
            case "Quadratic_Koch_Island":
                clearCurrentSVG();
                clearFormData();
                fractal = replacementRules.Quadratic_Koch_Island;
                populateRuleset(fractal);
                break;
            case "Board":
                clearCurrentSVG();
                clearFormData();
                fractal = replacementRules.Board;
                populateRuleset(fractal);
                break;
            case "flying_fish_winds":
                clearCurrentSVG();
                clearFormData();
                fractal = replacementRules.flying_fish_winds;
                populateRuleset(fractal);
                break;
            case "i_see_stars":
                clearCurrentSVG();
                clearFormData();
                fractal = replacementRules.i_see_stars;
                populateRuleset(fractal);
                break;
            default:
                //do nothing
        }
    };

    //Add Rule Set Button
    document.getElementById('add-rule').onclick = addRule;
}, false);




let ruleIndex = 2;
function addRule () {
    let template = `
        <div class="labels">Rule Set ${ruleIndex}:</div>
        <div class="rules">
            <input type="text" id="char" name="rules[${ruleIndex}][char]" placeholder="Char">
            <input type="text" id="rule" name="rules[${ruleIndex}][rule]" placeholder="Rule">
        </div>
         <div class="tooltip"> ?
            <span class="tooltiptext">Identity (1 letter) -><br>Production rules (letters)</span>
        </div>
    `;

    let container = document.getElementById('ruleSet-container');
    // console.log(container)
    let div = document.createElement("div");
    div.classList.add("ruleSet-Style");
    // console.log(div)
    div.innerHTML = template;
    container.appendChild(div);
    ruleIndex++;
}

function dummy() {
    // console.log("hello")
}

function resetLine() {
    line_values.x1 = default_line_values.x1;
    line_values.y1 = default_line_values.y1;
    line_values.x2 = default_line_values.x2;
    line_values.y2 = default_line_values.y2;
    line_values.angle = default_line_values.angle;
    line_values.rad = default_line_values.rad;
    line_values.counter = default_line_values.counter;
    line_values.toggle = default_line_values.toggle;
}

function clearFormData(){
    let formGuts = document.getElementById("input-form");
    // console.log(formGuts)
    let divsOuter = formGuts.getElementsByClassName("line-attributes")[0];
    //Remove class stuff
    let divs = divsOuter.getElementsByClassName("ruleSet-containerClass");
    // console.log(divs)
    do {
        divsOuter.removeChild(divs[0])
        divs = divsOuter.getElementsByClassName("ruleSet-containerClass")
    } while (divs.length > 0);
    //Remove Rules
    document.getElementById("ruleSet-container").remove()
}


function makeFormItem(name,label,placeholder,dataValue) {
    let div = document.createElement("div");
    div.classList.add('ruleSet-containerClass');
    div.innerHTML = `
            <div class="ruleSet-Style">
                <div class="labels">${label}:</div>
                <div class="rules">
                    <input type="text" name="${name}" placeholder="${placeholder}" value="${dataValue}">
                </div>
            </div>
    `;
    return div
}


function makeFormItemNumericNatural(name,label,placeholder,dataValue) {
    let div = document.createElement("div");
    div.classList.add('ruleSet-containerClass');
    div.innerHTML = `
            <div class="ruleSet-Style">
                <div class="labels">${label}:</div>
                <div class="rules">
                    <input type="number" min="1" name="${name}" placeholder="${placeholder}" value="${dataValue}">
                </div>
            </div>
    `;
    return div
}

function makeFormItemNumeric(name,label,placeholder,dataValue) {
    let div = document.createElement("div");
    div.classList.add('ruleSet-containerClass');
    div.innerHTML = `
            <div class="ruleSet-Style">
                <div class="labels">${label}:</div>
                <div class="rules">
                    <input type="number" step="any" name="${name}" placeholder="${placeholder}" value="${dataValue}">
                </div>
            </div>
    `;
    return div
}

function makeFormItems(num,data) {
    let div = document.createElement("div");
    div.classList.add('ruleSet-Style');
    div.innerHTML = `
        <div class="labels">Rule Set ${num}:</div>
        <div class="rules">
            <input type="text" id="char" name="rules[${num}][char]" placeholder="Char" value="${data.char}">
            <input type="text" id="rule" name="rules[${num}][rule]" placeholder="Rule" value="${data.rule}">
        </div>
    `;
    return div
}

function makeFormLengths(data) {
    let div = document.createElement("div");
    div.classList.add('ruleSet-containerClass');
    div.innerHTML = `
        <div class="ruleSet-Style">
            <div class="labels">Length:</div>
            <div class="rules">
                <input type="number" step="any" name="lengthX" placeholder="X" value="${data.length[0]}">
                <input type="number" step="any" name="lengthY" placeholder="Y" value="${data.length[1]}">
            </div>
         </div>
    `;
    return div
}


function makeFormItemNested(data) {
    let div = document.createElement("div");
    div.setAttribute("id",'ruleSet-container');
    for (let i = 0; i < data.rules.length; i++) {
        div.append(makeFormItems(i+1,data.rules[i]))
    }
    return div;
}

function populateRuleset(data) {
    let formGuts = document.getElementById("input-form");
    let divsOuter = formGuts.getElementsByClassName("line-attributes")[0];
    let last = document.getElementById("add-rule");
    divsOuter.insertBefore(makeFormItemNumericNatural("iterations","Iterations","Iterations",data.iterations),last);
    divsOuter.insertBefore(makeFormLengths(data),last);
    divsOuter.insertBefore(makeFormItem("axiom","Axiom","Axiom",data.axiom),last);
    divsOuter.insertBefore(makeFormItemNested(data),last);
    divsOuter.insertBefore(makeFormItemNumeric("angle","Angle","Angle",data.angle),last);
}


function clearCurrentSVG() {
    //Reset Zoom
    center();
    //Reset line
    resetLine()
    //Clear the screen
    svg.selectAll("g").remove();
    g = svg.append('g');
    stack.length = 0;
    //reset the rule index
    ruleIndex=2
}

function loadPreset(preset) {
    switch (preset) {
        case 1:
            clearCurrentSVG();
            //Remove data in form
            clearFormData();
            //Load data which this corresponds with into form
            fractal = replacementRules.dragon_curve;
            //Populate Form with ruleset
            populateRuleset(fractal);
            break
        case 2:
            clearCurrentSVG();
            //Remove data in form
            clearFormData();
            //Load data which this corresponds with into form
            fractal = replacementRules.triangle;
            //Populate Form with ruleset
            populateRuleset(fractal);
            break;
        case 3:
            clearCurrentSVG();
            //Remove data in form
            clearFormData();
            //Load data which this corresponds with into form
            fractal = replacementRules.simple_tree;
            //Populate Form with ruleset
            populateRuleset(fractal);
            break;
        case 4:
            clearCurrentSVG();
            //Remove data in form
            clearFormData();
            //Load data which this corresponds with into form
            fractal = replacementRules.Koch;
            //Populate Form with ruleset
            populateRuleset(fractal);
            break;
        case 5:
            clearCurrentSVG();
            //Remove data in form
            clearFormData();
            //Load data which this corresponds with into form
            fractal = replacementRules.Classic_Sierpinski_Curve;
            //Populate Form with ruleset
            populateRuleset(fractal);
            break;
        case 6:
            clearCurrentSVG();
            clearFormData();
            //Load data which this corresponds with into form
            fractal = replacementRules.snow_flake;
            //Populate Form with ruleset
            populateRuleset(fractal);
            break;
        default:
        //should never happen!
    }
}

function debug() {
    forward(-20,-20,0,chooseColor());
    forward(-20,0,0,chooseColor());
    forward(-20,0,0,chooseColor());
    forward(20,0,0,chooseColor());
    forward(20,0,0,chooseColor());
    changeAngle(90)
    forward(20,0,0,chooseColor());
    forward(20,0,0,chooseColor());
    changeAngle(90)
    forward(20,0,0,chooseColor());
    changeAngle(90)
    forward(20,0,0,chooseColor());
    changeAngle(90)
    forward(20,0,0,chooseColor());
    forward(20,0,0,chooseColor());
    forward(20,0,0,chooseColor());
    forward(20,0,0,chooseColor());
    changeAngle(-90)
    forward(20,0,0,chooseColor());
    forwardDot(20,0,0,chooseColor())
    forwardDot(20,0,0,chooseColor())
    forwardDot(20,0,0,chooseColor())
    forwardDot(20,0,0,chooseColor())
}

function drawLsystem(instructions, angle, distanceX,distanceY) {
    // //Debug Tests
    // debug()
    // return
    let cmd;
    for (let i = 0; i < instructions.length; ++i) {
        cmd = instructions.charAt(i);
        switch (cmd) {
            case 'F':
                forward(distanceX, -distanceY, 0, chooseColor());
                break;
            case 'f':
                move(distanceX, -distanceY, 0, chooseColor());
                break;
            case 'G':
                forward(distanceX, -distanceY, 0, chooseColor());
                break;
            case '+':
                if (line_values.toggle==0) {
                    changeAngle(-angle);
                } else {
                    changeAngle(angle);
                }
                break;
            case '-':
                if (line_values.toggle==0) {
                    changeAngle(angle);
                } else {
                    changeAngle(-angle);
                }
                break;
            case '[':
                stackPush(0, 0, 0);
                break
            case ']':
                stackPop(0, 0, 0);
                break
            case '|':
                changeAngle(-180);
                break
            case '@':
                // Draw a dot with line width radius
                forwardDot(distanceX, -distanceY, angle, chooseColor())
                break
            case '(':
                decrementAngle(angle);
                break
            case ')':
                incrementAngle(angle);
                break
            case '&':
                //Swap the meaning of + and -
                line_values.toggle = (line_values.toggle==0) ? 1 : 0;
                break
            default:
            //do nothing
        }
    }
}

Promise.all([LSystem(fractal.iterations, fractal.axiom)]).then((lsys) => {
    drawLsystem(lsys[0], fractal.angle,...fractal.length);
});

// https://mathjs.org/docs/datatypes/matrices.html
//https://stackoverflow.com/questions/2259476/rotating-a-point-about-another-point-2d
//https://www.d3indepth.com/zoom-and-pan/
//https://calculateaspectratio.com/

// https://stackoverflow.com/questions/42907047/d3-v4-ajust-zoom-to-center
//TODO: should be a way to center the zoom

let zoom = d3.zoom()
    .scaleExtent([0, Infinity])
    .on('zoom', handleZoom);

let svg = d3.select("#container").append("svg")
    .attr("viewBox", `0 0 ${window_dims.width} ${window_dims.height}`)
    // .attr("width", `${vb_size.width + 500}`)
    // .attr("height", `${vb_size.height}`)
    .attr("id", "container-svg")
    .attr("preserveAspectRatio", "xMinYMin meet")
    .classed("svg-content", true);

let g = svg.append('g');

function initZoom() {
    svg.call(zoom);
}

function handleZoom(e) {
    svg.selectAll('g')
        .attr('transform', (m, d, j) => {
            return `${e.transform}`
        });
}

function zoomIn() {
    svg.selectAll('g')
        .transition()
        .call(zoom.scaleBy, 2);
}

function zoomOut() {
    svg.selectAll('g')
        .transition()
        .call(zoom.scaleBy, 0.5);
}

function resetZoom() {

    svg.selectAll('g')
        .transition()
        .call(zoom.scaleTo, 1);
}

function center() {
    zoom.transform(svg,d3.zoomIdentity);

     // svg.selectAll('g')
     //    .transition()
     //    .call(zoom.translateTo, 0.5 * window_dims.width, 0.5 * window_dims.height);
     //    // .call(zoom.translateTo, window_dims.wincw, window_dims.winch);
}

function panLeft() {
    svg.selectAll('g')
        .transition()
        .call(zoom.translateBy, -50, 0);
}

function panRight() {
    svg.selectAll('g')
        .transition()
        .call(zoom.translateBy, 50, 0);
}

initZoom();

function saveSVG() {
    //https://stackoverflow.com/questions/23218174/how-do-i-save-export-an-svg-file-after-creating-an-svg-with-d3-js-ie-safari-an
    let svgData = document.getElementById("container-svg").outerHTML;
    let svgBlob = new Blob([svgData], {type: "image/svg+xml;charset=utf-8"});
    let svgUrl = URL.createObjectURL(svgBlob);
    let downloadLink = document.createElement("a");
    downloadLink.href = svgUrl;
    downloadLink.download = "mySVG.svg";
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
}

