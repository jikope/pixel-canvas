<template>
    <div
        id="color-placeholder"
        :style="{
            'background-color': cursor.color_placeholder.picked_color.hexCode,
            transform:
                'translate(' +
                cursor.color_placeholder.x +
                'px, ' +
                cursor.color_placeholder.y +
                'px)'
        }"
    ></div>
</template>

<script>
import { mapState } from "vuex";

export default {
    name: "ColorPlaceholder",
    computed: {
        ...mapState({
            cursor: state => state.cursor
        })
    }
};
</script>

<style>
#color-placeholder {
    display: block;
    position: absolute;
    border: 2px solid #222;
    pointer-events: none;
    width: 15px;
    height: 15px;
}
</style>
