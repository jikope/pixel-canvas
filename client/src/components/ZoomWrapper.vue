<template>
    <div>
        <div
            id="zoom-wrapper"
            :style="{
                transform: 'scale(' + camera.scale + ')'
            }"
            @wheel.prevent="zoom"
        >
            <div
                id="movement-wrapper"
                :style="{
                    transform:
                        'translate(' + camera.x + 'px, ' + camera.y + 'px)'
                }"
            >
                <PixelCanvas />
            </div>
        </div>

        <PixelPlaceholder />

        <ColorPlaceholder />

        <ColorPicker />
    </div>
</template>

<script>
import { mapState } from "vuex";
import PixelCanvas from "./PixelCanvas.vue";
import PixelPlaceholder from "./overlays/PixelPlaceholder.vue";
import ColorPlaceholder from "./overlays/ColorPlaceholder.vue";
import ColorPicker from "./overlays/ColorPicker.vue";

export default {
    name: "ZoomWrapper",
    components: {
        PixelCanvas,
        PixelPlaceholder,
        ColorPlaceholder,
        ColorPicker
    },

    data() {
        return {
            socket: null
        };
    },

    computed: {
        ...mapState({
            canvas: state => state.canvas
        }),
        ...mapState({
            camera: state => state.camera
        })
    },

    methods: {
        zoom: function(e) {
            if (e.deltaY >= 0) {
                // Wheel Up
                this.$store.dispatch("camera/calcScale", "up");
            } else {
                // Wheel Down
                this.$store.dispatch("camera/calcScale", "down");
            }
        }
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#zoom-wrapper {
    overflow: none;
    width: 100%;
    height: 100%;
    position: relative;
}

#movement-wrapper {
    position: relative;
}
</style>
