<template>
    <div>
        <canvas
            id="canvas"
            :width="canvas.width"
            :height="canvas.height"
            @mousedown.prevent="onDown"
            @mousemove.prevent="onMove"
            @mouseup.prevent="onUp"
            @mouseleave.prevent="onLeave"
        ></canvas>
    </div>
</template>

<script>
import { mapState } from "vuex";

export default {
    name: "PixelCanvas",
    data() {
        return {
            clicking: false,
            moved: true
        };
    },

    computed: {
        ...mapState({
            canvas: state => state.canvas
        }),
        ...mapState({
            camera: state => state.camera
        }),
        ...mapState({
            cursor: state => state.cursor
        })
    },

    mounted() {
        fetch("http://localhost:3000/canvas/main")
            .then(response => response.json())
            .then(data => {
                var ref = document.getElementById("canvas");
                this.$store.commit("canvas/setCanvas", ref);
                this.$store.commit("canvas/setContext", ref.getContext("2d"));

                this.$store.commit("canvas/setDimension", {
                    width: data.canvas.width,
                    height: data.canvas.height
                });
                this.canvas.ref.style.width = data.canvas.width * 10 + "px";
                this.canvas.ref.style.height = data.canvas.height * 10 + "px";
                var max = data.canvas.width / this.camera.pixel_size;

                this.$store.commit("canvas/setDrawing", data.canvas.drawing);
                this.$store.commit("color/setColors", data.colors);
                this.$store.commit("cursor/setColor", data.colors.black);
                this.$store.commit("camera/setMaxScale", max);

                console.log(this.canvas.context);
                this.canvas.context.fillStyle =
                    data.canvas.drawing[0][0].hexCode;
                console.log(this.canvas.context);
                this.canvas.context.fillRect(0, 0, 1, 1);
            });
    },

    methods: {
        onDown: function() {
            this.moved = false;
            this.clicking = true;
        },
        onUp: function() {
            if (this.moved) {
                console.log("End drag");
            } else {
                window.socket.emit("draw", "main", {
                    x: this.canvas.x,
                    y: this.canvas.y,
                    color: this.cursor.color_placeholder.picked_color
                });
            }
            this.clicking = false;
        },
        onMove: function(e) {
            if (this.clicking) {
                this.moved = true;
                let x = this.camera.x;
                let y = this.camera.y;
                x += e.movementX / this.camera.scale;
                y += e.movementY / this.camera.scale;
                this.$store.commit("camera/setPosition", { x, y });
            } else {
                var ref = document.getElementById("pixel-placeholder");
                var pixel_width = parseInt(ref.style.width);
                var center = pixel_width / 2;

                var rect = this.canvas.ref.getBoundingClientRect();
                let pixel_size = this.camera.pixel_size;
                let scale = this.camera.scale;

                var color_x = e.x + pixel_size;
                var color_y = e.y + pixel_size;
                this.$store.commit("cursor/setColorPosition", {
                    x: color_x,
                    y: color_y
                });

                var x = Math.round(
                    Math.round(e.clientX - rect.left - center) /
                        pixel_size /
                        scale
                );

                var y = Math.round(
                    Math.round(e.clientY - rect.top - center) /
                        pixel_size /
                        scale
                );

                if (x != this.canvas.x || y != this.canvas.y) {
                    this.$store.commit("canvas/setPosition", { x, y });

                    var cursor_x =
                        Math.round(rect.left) + pixel_size * x * scale;
                    var cursor_y =
                        Math.round(rect.top) + pixel_size * y * scale;

                    this.$store.commit("cursor/setPosition", {
                        x: cursor_x,
                        y: cursor_y
                    });
                }
            }
        },
        onLeave: function() {
            this.clicking = false;
        }
    }
};
</script>

<style scoped>
#canvas {
    display: block;
    background-color: #f0f0f0;
    z-index: 1;
    position: absolute;
    top: 50%;
    left: 30%;
    cursor: crosshair;
    image-rendering: -moz-crisp-edges;
    image-rendering: -webkit-crisp-edges;
    image-rendering: pixelated;
    image-rendering: crisp-edges;
    width: 100%;
    height: 100%;
}
</style>
