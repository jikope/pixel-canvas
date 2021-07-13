import Vue from "vue";
import Vuex from "vuex";

import canvas from "./modules/canvas";
import camera from "./modules/camera";
import cursor from "./modules/cursor";
import color from "./modules/color";

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== "production";

export default new Vuex.Store({
    modules: {
        canvas,
        camera,
        cursor,
        color
    },
    strict: debug
});
