<template>
    <section>
        <div>
            background
            <span>
                <label for="switchColor" class="switch">
                    <input id="switchColor" type="checkbox"
                        :checked="switchColor" />
                    <span class="slider round" @click.self="toggle"></span>
                </label>
            </span>
            secondary color
        </div>

        <button id="randomBtn" class="btn" @click="randomColor">Random</button>
    </section>
    <hr />

    <section id="rangeColors">
        <!-- rgba color sliders -->
        <ContainerColorInput 
            :color="rgbaObj"
            :title="'RGBA values'"
            @complementary="rgbComplentaryColor"
            @newColor="(color: ColorObj) => inputChangeRGBA(color)" />

        <!-- space for the secondary color -->
        <section id="secondaryColor">
            <p>The quick brown fox jumps over the lazy dog</p>
            <p id="rgbSec">rgba(255, 255, 255, 1)&semi;</p>
            <p id="hslSec">hsla(0, 100%, 50%, 1)&semi;</p>
        </section>

        <!-- hsla color sliders -->
        <ContainerColorInput 
            :color="hslaObj"
            :title="'HSLA values'"
            @complementary="hslComplentaryColor"
            @newColor="(color: ColorObj) => inputChanceHSLA(color)" />
        <!-- <div>
            <h2>HSLA values</h2>
            <label for="hue">Hue: <span class="colorValue">{{ hue }}</span>
                <input id="hue" v-model="hue" class="range hsl" type="range" min="0" max="360" @input="inputChanceHSLA" />
            </label>
            <label for="saturation">Saturation: <span class="colorValue">{{ saturation }}</span>
                <input id="saturation" v-model="saturation" class="range hsl" type="range" min="0" max="100" @input="inputChanceHSLA" />
            </label>
            <label for="lightness">lightness: <span class="colorValue">{{ lightness }}</span>
                <input id="lightness" v-model="lightness" class="range hsl" type="range" min="0" max="100" @input="inputChanceHSLA" />
            </label>
            <label for="alphaHSL">Alpha: <span class="colorValue">{{ alphaHSLA }}</span>
                <input id="alphaHSL" v-model="alphaHSLA" class="range hsl" type="range" min="0" max="1" step="0.01" @input="inputChanceHSLA"/>
            </label>
            <button id="hslComplementaryBtn" class="btn"
                @click="hslComplentaryColor">Complementary</button>
        </div> -->
        <p id="rgbBack">rgba(255, 255, 255, 1)&semi;</p>
        <p id="hslBack">hsla(0, 100%, 50%, 1)&semi;</p>
    </section>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue';

import ContainerColorInput from './ContainerColorInput.vue';

const rgbaObj: ColorObj = reactive({
    names: ['red', 'green', 'blue', 'alpha'],
    firstColorValue: 255,
    secondColorValue: 255,
    thirdColorValue: 255,
    fourthColorValue: 1
})

const hslaObj: ColorObj = reactive({
    names: ['hue', 'saturation', 'lightness', 'alpha'],
    firstColorValue: 0,
    secondColorValue: 100,
    thirdColorValue: 50,
    fourthColorValue: 1
})

const switchColor = ref(false);

// Get rgba color sliders values
function inputChangeRGBA(colorObj: ColorObj) {
    let rgba = `rgba(${colorObj.firstColorValue}, ${colorObj.secondColorValue}, ${colorObj.thirdColorValue}, ${colorObj.fourthColorValue})`;    
    setColor(rgba, 'rgb');
}

// Get hsla color sliders values
function inputChanceHSLA(colorObj: ColorObj) {
    let hsla = `hsla(${colorObj.firstColorValue}, ${colorObj.secondColorValue}%, ${colorObj.thirdColorValue}%, ${colorObj.fourthColorValue})`;
    setColor(hsla, 'hsl');
}

function toggle() {
    switchColor.value = !switchColor.value;
}

// Set rgba / hsla color to background / secondary
function setColor(color: string, type: string) {
    if (switchColor.value) {
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

function setComplementaryColor(color: string, type: string) {
    if (!switchColor.value) {
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

    let rgba = `rgba(${r}, ${g}, ${b}, ${a})`;
    setColor(rgba, 'rgb');

    rgbaObj.firstColorValue = r;
    rgbaObj.secondColorValue = g;
    rgbaObj.thirdColorValue = b;
    rgbaObj.fourthColorValue = a;
}

// Convert rgba to hsla
function rgbaToHsla(rgba: string) {
    const color = <string[]> rgba.substring(5).split(')')[0].split(',');

    let r = parseInt(color[0]) / 255;
    let g = parseInt(color[1]) / 255;
    let b = parseInt(color[2]) / 255;
    let a = parseInt(color[3]);

    let cmax = Math.max(r, g, b);
    let cmin = Math.min(r, g, b);
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

    if (cmax == cmin) {
        s = 0;
    } else if (l <= 0.5) {
        s = (cmax - cmin) / (cmax + cmin);
    } else {
        s = (cmax - cmin) / (2.0 - cmax - cmin);
    }

    s = +(s * 100).toFixed(1);
    l = +(l * 100).toFixed(1);

    return `hsla(${h}, ${s}%, ${l}%, ${a})`;
}

// Convert hsla to rgba
function hslaToRgba(hsla: string) {
    const color = <string[]> hsla.substring(5).split(')')[0].split(',');

    let h = parseInt(color[0]);
    let s = parseInt(color[1].substring(0, color[1].length - 1)) / 100;
    let l = parseInt(color[2].substring(0, color[2].length - 1)) / 100;
    let a = parseInt(color[3]);

    let c = (1 - Math.abs(2 * l - 1)) * s;
    let x = c * (1 - Math.abs((h / 60) % 2 - 1));
    let m = l - c / 2;
    let r = 0;
    let g = 0;
    let b = 0;

    if (h >= 0 && h < 60) {
        r = c; g = x; b = 0;
    } else if (h >= 60 && h < 120) {
        r = x; g = c; b = 0;
    } else if (h >= 120 && h < 180) {
        r = 0; g = c; b = x;
    } else if (h >= 180 && h < 240) {
        r = 0; g = x; b = c;
    } else if (h >= 240 && h < 300) {
        r = x; g = 0; b = c;
    } else if (h >= 300 && h < 360) {
        r = c; g = 0; b = x;
    }

    r = Math.round((r + m) * 255);
    g = Math.round((g + m) * 255);
    b = Math.round((b + m) * 255);

    return `rgba(${r}, ${g}, ${b}, ${a})`;
}

function rgbComplentaryColor() {
    let tempRed = 255 - rgbaObj.firstColorValue;
    let tempGreen = 255 - rgbaObj.secondColorValue;
    let tempBlue = 255 - rgbaObj.thirdColorValue;

    let color = `rgba(${tempRed}, ${tempGreen}, ${tempBlue}, ${rgbaObj.fourthColorValue})`;

    setComplementaryColor(color, 'rgb');
}

function hslComplentaryColor() {
    let h = hslaObj.firstColorValue + 180;
    if (h > 360) {
        h -= 360;
    }

    let hsla = `hsla(${h}, ${hslaObj.secondColorValue}%, ${hslaObj.thirdColorValue}%, ${hslaObj.fourthColorValue})`;

    setComplementaryColor(hsla, 'hsl');
}

</script>

<style scoped></style>