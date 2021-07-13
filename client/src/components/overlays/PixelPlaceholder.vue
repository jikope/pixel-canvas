<template>
    <div
        id="pixel-placeholder"
        :style="{
            width: camera.pixel_size * camera.scale + 'px',
            height: camera.pixel_size * camera.scale + 'px',
            transform: 'translate(' + cursor.x + 'px, ' + cursor.y + 'px)'
        }"
    ></div>
</template>

<script>
import { mapState } from 'vuex'

export default {
    name: "PixelPlaceholder",
    
    computed: {
        ...mapState({
            cursor: state => state.cursor
        }),
        ...mapState({
            camera: state => state.camera
        })
    },

};
</script>

<style scoped>
#pixel-placeholder {
    display: block;
    position: absolute;
    border: 1px solid #222;
    border-color: rgb(140, 130, 115);
    z-index: 10;
    pointer-events: none;
}
</style>