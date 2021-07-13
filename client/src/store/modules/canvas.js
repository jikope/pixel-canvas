const state = () => ({
    ref: null,
    context: null,
    drawing: null,
    width: 0,
    height: 0,
    x: 0,
    y: 0
});

const mutations = {
    setCanvas(state, canvas) {
        state.ref = canvas;
    },
    setContext(state, context) {
        state.context = context;
    },
    setDrawing(state, drawing) {
        state.drawing = drawing;
    },
    setDimension(state, payload) {
        state.width = payload.width;
        state.height = payload.height;
    },
    setPosition(state, payload) {
        state.x = payload.x;
        state.y = payload.y;
    },
    setColor(state, colorCode) {
        state.context.fillStyle = colorCode;
    }
};

export default {
    namespaced: true,
    state,
    mutations
};
