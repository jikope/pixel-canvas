const state = () => ({
    ref: null,
    x: 0,
    y: 0,
    color_placeholder: {
        x: 0,
        y: 0,
        picked_color: "#212121"
    }
});

const mutations = {
    setCursor(state, cursor) {
        state.ref = cursor;
    },
    setPosition(state, position) {
        state.x = position.x;
        state.y = position.y;
    },
    setColorPosition(state, position) {
        state.color_placeholder.x = position.x;
        state.color_placeholder.y = position.y;
    },
    setColor(state, color) {
        state.color_placeholder.picked_color = color;
    }
};

const actions = {};

export default {
    namespaced: true,
    state,
    mutations,
    actions
};
