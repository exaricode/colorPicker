const sliders = document.getElementById('sliders');
const rgbColors = document.querySelectorAll('.rgb');
const hslColors = document.querySelectorAll('.hsl');
const randomBtn = document.getElementById('randomBtn');
const rgbComplementaryBtn = document.getElementById('rgbComplementaryBtn');
const hslComplementaryBtn = document.getElementById('hslComplementaryBtn');
const switchColor = document.getElementById('switchColor');

// set the complementary color on background or secondary
rgbComplementaryBtn.addEventListener('click', () => {
    rgbComplentaryColor();
});

hslComplementaryBtn.addEventListener('click', () => {
    hslComplentaryColor();
});

// Random color
randomBtn.addEventListener('click', () => randomColor());

// Get rgba color sliders values
rgbColors.forEach(element => {
    element.addEventListener('input', () => {
        let red = document.getElementById('red');
        let blue = document.getElementById('blue');
        let green = document.getElementById('green');
        let alpha = document.getElementById('alpha'); 
        let rgba = `rgba(${red.value}, ${green.value}, ${blue.value}, ${alpha.value})`;
        
        element.parentNode.children[0].innerHTML = element.value;
        setColor(rgba, 'rgb');
    });
});

// Get hsla color sliders values
hslColors.forEach(element => {
    element.addEventListener('input', () => {
        let hue = document.getElementById('hue');
        let sat = document.getElementById('saturation');
        let light = document.getElementById('lightness');
        let alpha = document.getElementById('alphaHSL');
        let hsla = `hsla(${hue.value}, ${sat.value}%, ${light.value}%, ${alpha.value})`;
        
        element.parentNode.children[0].innerHTML = element.value;
        setColor(hsla, 'hsl');
    });
});

// Set rgba / hsla color to background / secondary
function setColor (color, type) {
    if (switchColor.checked) {
        document.getElementById('secondaryColor')
            .style.backgroundColor = color;
            if (type === 'rgb') {
                document.getElementById('rgbSec').innerHTML = `${color};`;
                let hsl = rgbaToHsla(color);
                document.getElementById('hslSec').innerHTML = `${hsl};`;
            } else {
                document.getElementById('hslSec').innerHTML = `${color};`;
                let rgb = hslaToRgba(color);
                document.getElementById('rgbSec').innerHTML = `${rgb};`;
            }           
    } else {
        document.body.style.backgroundColor = color;
        if (type === 'rgb') {
            document.getElementById('rgbBack').innerHTML = `${color};`;
            let hsl = rgbaToHsla(color);
            document.getElementById('hslBack').innerHTML = `${hsl};`;
        } else {
            document.getElementById('hslBack').innerHTML = `${color};`;
            let rgb = hslaToRgba(color);
            document.getElementById('rgbBack').innerHTML = `${rgb};`;
        }  
    }
}

function setComplementaryColor (color, type) {
    if (!switchColor.checked) {
        document.getElementById('secondaryColor')
            .style.backgroundColor = color;
            if (type === 'rgb') {
                document.getElementById('rgbSec').innerHTML = `${color};`;
                let hsl = rgbaToHsla(color);
                document.getElementById('hslSec').innerHTML = `${hsl};`;
            } else {
                document.getElementById('hslSec').innerHTML = `${color};`;
                let rgb = hslaToRgba(color);
                document.getElementById('rgbSec').innerHTML = `${rgb};`;
            }           
    } else {
        document.body.style.backgroundColor = color;
        if (type === 'rgb') {
            document.getElementById('rgbBack').innerHTML = `${color};`;
            let hsl = rgbaToHsla(color);
            document.getElementById('hslBack').innerHTML = `${hsl};`;
        } else {
            document.getElementById('hslBack').innerHTML = `${color};`;
            let rgb = hslaToRgba(color);
            document.getElementById('rgbBack').innerHTML = `${rgb};`;
        }  
    }
}

// create a random rgba body background-color 
function randomColor() {
    let r = Math.round(Math.random() * 256);
    let g = Math.round(Math.random() * 256);
    let b = Math.round(Math.random() * 256);
    let a = Math.round(Math.random() * 10) / 10;
    let red = document.getElementById('red');
    let blue = document.getElementById('blue');
    let green = document.getElementById('green');
    let alpha = document.getElementById('alpha'); 

    let rgba = `rgba(${r}, ${g}, ${b}, ${a})`;
    setColor(rgba, 'rgb');

    red.parentNode.children[0].innerHTML = r;
    green.parentNode.children[0].innerHTML = g;
    blue.parentNode.children[0].innerHTML = b;
    alpha.parentNode.children[0].innerHTML = a;
    red.value = r;
    blue.value = b;
    green.value = g;
    alpha.value = a;
}

// Convert rgba to hsla
function rgbaToHsla (color) {
    color = color.substr(5).split(')')[0].split(',');

    let r = color[0] / 255;
    let g = color[1] / 255;
    let b = color[2] / 255;
    let a = color[3];

    let cmax = Math.max(r,g,b);
    let cmin = Math.min(r,g,b);
    let delta = cmax - cmin;
    let h = 0, s = 0, l = 0;
    
    if (delta == 0) {
        h = 0;
    } else if (cmax == r) {
        h = ((g - b) / delta) % 6;
        
    } else if (cmax == g) {
        h = (b - r) / delta + 2;
    } else {
        h = (b - r) / delta + 4;
    }

    h = Math.round(h * 60);
    if (h < 0) {
        h += 360;
    }

    l = (cmax + cmin) / 2;
    
    if (cmax == cmin){
        s = 0;
    } else if (l <= 0.5) {
        s = (cmax - cmin)/(cmax + cmin);
    } else {
        s = (cmax - cmin)/(2.0 - cmax - cmin);
    }

    s = +(s * 100).toFixed(1);
    l = +(l * 100).toFixed(1);

    return `hsla(${h}, ${s}%, ${l}%, ${a})`;
}

// Convert hsla to rgba
function hslaToRgba(color) {
    color = color.substr(5).split(')')[0].split(',');

   let h = color[0];
   let s = color[1].substr(0, color[1].length - 1) / 100;
   let l = color[2].substr(0, color[2].length - 1) / 100;
   let a = color[3];

   let c = (1 - Math.abs(2 * l - 1)) * s;
   let x = c * (1 - Math.abs((h / 60) % 2 - 1));
   let m = l - c / 2;
   let r = 0;
   let g = 0;
   let b = 0;

   if (h >= 0 && h < 60){
       r = c; g = x; b = 0;
   } else if (h >= 60 && h < 120) {
       r = x; g = c; b = 0;
   } else if (h >= 120 && h < 180) {
       r = 0; g = c; b = x;
   } else if (h >= 180 && h < 240) {
       r = 0; g = x; b = c;
   } else if (h >= 240 && h < 300) {
       r = x; g = 0; b = c;
   } else if ( h >= 300 && h < 360) {
       r = c; g = 0; b = x;
   }

   r = Math.round((r + m) * 255);
   g = Math.round((g + m) * 255);
   b = Math.round((b + m) * 255);

   return  `rgba(${r}, ${g}, ${b}, ${a})`;
}

// complementary rgb color function
function rgbComplentaryColor() {
    let red = document.getElementById('red');
    let blue = document.getElementById('blue');
    let green = document.getElementById('green');
    let alpha = document.getElementById('alpha'); 

    // complementary =  255 - r/g/b value
    let tempRed = 255 - parseInt(red.value);
    let tempGreen = 255 - parseInt(green.value);
    let tempBlue = 255 - parseInt(blue.value);

    let color = `rgba(${tempRed}, ${tempGreen}, ${tempBlue}, ${alpha.value})`;
    
    setComplementaryColor(color,'rgb');
}

// Complementary hsl color function
function hslComplentaryColor() {
    let hue = document.getElementById('hue');
    let sat = document.getElementById('saturation');
    let light = document.getElementById('lightness');
    let alpha = document.getElementById('alphaHSL');

    // complementary = hue value + 180
    let h = parseInt(hue.value) + 180;
    if( h > 360){
        h -= 360;
    }

    let hsla = `hsla(${h}, ${sat.value}%, ${light.value}%, ${alpha.value})`;
    
    setComplementaryColor(hsla,'hsl');
}