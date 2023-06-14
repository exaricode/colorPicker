<template>
    <div v-if="color != undefined">
        <h2>{{ title }}</h2>
        <label for="red">{{ color.names[0]}} <span class="colorValue">{{ color.firstColorValue }}</span>
            <input id="red" v-model="color.firstColorValue" class="range rgb" type="range" min="0" :max="color.maxFirstValue" @input="newColor"/>
        </label>
        <label for="green">{{ color.names[1] }} <span class="colorValue">{{ color.secondColorValue }}</span>
            <input id="green" v-model="color.secondColorValue" class="range rgb" type="range" min="0" :max="color.maxSecondValue" @input="newColor"/>
        </label>
        <label for="blue">{{ color.names[2]}} <span class="colorValue">{{ color.thirdColorValue }}</span>
            <input id="blue" v-model="color.thirdColorValue" class="range rgb" type="range" min="0" :max="color.maxSecondValue" @input="newColor" />
        </label>
        <label for="alpha">{{ color.names[3] }} <span class="colorValue">{{ color.fourthColorValue }}</span>
            <input id="alpha" v-model="color.fourthColorValue" class="range rgb" type="range" min="0" max="1" step="0.01" @input="newColor" />
        </label>
        <button class="btn" @click="complementaryColor">Complementary</button>
    </div>
</template>

<script setup lang="ts">
import {type PropType } from 'vue';
const props = defineProps({
    color: {
        type: Object as PropType<ColorObj>
     } ,
    title: String
});

const emits = defineEmits(['newColor', 'complementary']);

function newColor() {
    emits('newColor', props.color);
}

function complementaryColor() {
    emits('complementary');
}
</script>

<style scoped>

</style>