<template>
    <div id="app">
        <ZoomWrapper />
    </div>
</template>

<script>
import ZoomWrapper from "./components/ZoomWrapper.vue";
import { mapState } from "vuex";

export default {
    name: "App",
    components: {
        ZoomWrapper
    },

    computed: {
        ...mapState({
            canvas: state => state.canvas
        }),
        ...mapState({
            camera: state => state.camera
        }),
        ...mapState({
            colors: state => state.color
        })
    },

    mounted() {
        let socket = window.socket;

        socket.on("init", data => {
            //this.canvas.context.fillStyle = data.colors.red.hexCode;

            if (this.canvas.context) {
                for (var i = 0; i < data.canvas.width; i++) {
                    for (var j = 0; j < data.canvas.height; j++) {
                        //drawing[i][j] = colors.grey;
                        // console.log(data.canvas.drawing[0][0]);
                        // this.canvas.context.fillStyle =
                        //     data.canvas.drawing[i][j].hexCode;
                        // this.canvas.context.fillRect(i, j, 1, 1);
                    }
                }
            }

            socket.on("update_drawing", draw => {
                console.log(draw);
                // this.$store.commit("canvas/setDrawing", data.canvas.drawing);
                this.canvas.context.fillStyle = draw.color.hexCode;
                this.canvas.context.fillRect(draw.x, draw.y, 1, 1);
            });
        });
    }
};
</script>

<style>
body {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
    background-color: #222222;
    overflow: hidden;
    margin: 0;
    padding: 0;
}
</style>
