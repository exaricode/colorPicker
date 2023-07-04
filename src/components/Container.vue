<template>
    <section>
        <div>
            <CheckBoxSwitchColor
                v-model="switchColor"
                @primarySecondary="toggle"
             />
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
        <section id="secondaryColor" :style="secondaryColor">
            <p :style="bgColor">The quick brown fox jumps over the lazy dog</p>
            <p id="rgbSec" :style="bgColor">{{ rgbaSecondaryAsString }}</p>
            <p id="hslSec" :style="bgColor">{{ hslaSecondaryAsString }}</p>
        </section>

        <!-- hsla color sliders -->
        <ContainerColorInput 
            :color="hslaObj"
            :title="'HSLA values'"
            @complementary="hslComplentaryColor"
            @newColor="(color: ColorObj) => inputChanceHSLA(color)" />
       
        <p id="rgbBack"><span :style="secondaryColor">{{ rgbaPrimaryAsString }}</span></p>
        <p id="hslBack"><span :style="secondaryColor">{{ hslaPrimaryAsString }}</span></p>
    </section>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue';

import ContainerColorInput from './ContainerColorInput.vue';
import CheckBoxSwitchColor from './CheckboxSwitchColor.vue';
import {rgbaToHsla, hslaToRgba} from '../scripts/convertColors.js';

const rgbaObj: ColorObj = reactive({
    names: ['red', 'green', 'blue', 'alpha'],
    maxFirstValue: 255,
    maxSecondValue: 255,
    firstColorValue: 255,
    secondColorValue: 255,
    thirdColorValue: 255,
    fourthColorValue: 1
})

const hslaObj: ColorObj = reactive({
    names: ['hue', 'saturation', 'lightness', 'alpha'],
    maxFirstValue: 360,
    maxSecondValue: 100,
    firstColorValue: 0,
    secondColorValue: 100,
    thirdColorValue: 50,
    fourthColorValue: 1
})

const switchColor = ref(false);

const rgbaPrimaryAsString = ref("rgba(255, 255, 255, 1);");
const rgbaSecondaryAsString = ref("rgba(255, 255, 255, 1);");
const hslaPrimaryAsString = ref("hsla(0, 100%, 50%, 1);");
const hslaSecondaryAsString = ref("hsla(0, 100%, 50%, 1);");

const secondaryColor = reactive({
    backgroundColor: "rgba(255, 255, 255, 1)"
});

const bgColor = reactive({
    backgroundColor: "rgba(255, 255, 255, 1)"
})

onMounted(() => {
    switchColor.value = false;
})


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
        secondaryColor.backgroundColor = color;
        if (type === 'rgb') {
            rgbaSecondaryAsString.value = `${color};`;
            let hsl = rgbaToHsla(color);
            hslaSecondaryAsString.value = `${hsl};`;
        } else {
            hslaSecondaryAsString.value = `${color};`;
            let rgb = hslaToRgba(color);
            rgbaSecondaryAsString.value = `${rgb};`;
        }
    } else {
        document.body.style.backgroundColor = color;
        bgColor.backgroundColor = color;
        if (type === 'rgb') {
            rgbaPrimaryAsString.value = `${color};`;
            let hsl = rgbaToHsla(color);
            hslaPrimaryAsString.value = `${hsl};`;
        } else {
            hslaPrimaryAsString.value = `${color};`;
            let rgb = hslaToRgba(color);
            rgbaPrimaryAsString.value = `${rgb};`;
        }
    }
}

function setComplementaryColor(color: string, type: string) {
    if (!switchColor.value) {
        secondaryColor.backgroundColor = color;
        if (type === 'rgb') {
            rgbaSecondaryAsString.value = `${color};`;
            let hsl = rgbaToHsla(color);
            hslaSecondaryAsString.value = `${hsl};`;
        } else {
            hslaSecondaryAsString.value = `${color};`;
            let rgb = hslaToRgba(color);
            rgbaSecondaryAsString.value = `${rgb};`;
        }
    } else {
        document.body.style.backgroundColor = color;
        bgColor.backgroundColor = color;
        if (type === 'rgb') {
            rgbaPrimaryAsString.value = `${color};`;
            let hsl = rgbaToHsla(color);
            hslaPrimaryAsString.value = `${hsl};`;
        } else {
            hslaPrimaryAsString.value = `${color};`;
            let rgb = hslaToRgba(color);
            rgbaPrimaryAsString.value = `${rgb};`;
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
    let hsla = rgbaToHsla(rgba);

    setInputValues(rgbaObj, rgba);
    setInputValues(hslaObj, hsla);
}

function setInputValues(obj: ColorObj, colorType: String) {
    let color;
    if (colorType.startsWith("rgba")) {
        color = <string[]> colorType.substring(5).split(')')[0].split(',');
    } else {
        color = <string[]> colorType.substring(5).split(')')[0].split(',');
        color[1] = color[1].substring(0, color[1].length - 1);
        color[2] = color[2].substring(0, color[2].length - 1);
    }

    obj.firstColorValue = parseInt(color[0]);
    obj.secondColorValue = parseInt(color[1]);
    obj.thirdColorValue = parseInt(color[2]);
    obj.fourthColorValue = parseFloat(color[3]);
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