<template>
    <div id="color-picker" v-if="colors">
        <ul>
            <li v-for="color in colors.colors" :key="color.text">
                <button
                    class="color-block"
                    :style="{ 'background-color': color.hexCode }"
                    @click="onColorPickerClick($event, color)"
                ></button>
            </li>
        </ul>
    </div>
</template>

<script>
import { mapState } from "vuex";

export default {
    name: "ColorPicker",

    computed: {
        ...mapState({
            canvas: state => state.canvas
        }),
        ...mapState({
            cursor: state => state.cursor
        }),
        ...mapState({
            colors: state => state.color
        })
    },

    methods: {
        onColorPickerClick(e, code) {
            e.preventDefault();
            this.$store.commit("cursor/setColor", code);
            this.$store.commit("canvas/setColor", code.hexCode);
        }
    }
};
</script>

<style scoped>
#color-picker {
    display: block;
    position: absolute;
    top: 0;
    left: 0;
}

.color-block {
    border: 3px solid #222;
    width: 30px;
    height: 30px;
    margin-bottom: 3px;
}
.color-block:hover {
    cursor: pointer;
    opacity: 80%;
}
ul {
    list-style-type: none;
}
</style>
