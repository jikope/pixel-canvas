const state = () => ({
    scale: 1,
    x: 1,
    y: 1,
    max_scale: 1,
    pixel_size: 10
});

const mutations = {
    setScale(state, scale) {
        state.scale = scale;
    },
    setPosition(state, position) {
        state.x = position.x;
        state.y = position.y;
    },
    setMaxScale(state, max) {
        state.max_scale = max;
    },
    setPixelSize(state, size) {
        state.pixel_size = size;
    }
};

const actions = {
    calcScale({ commit, state }, direction) {
        let scale = state.scale;
        var move = state.pixel_size * scale;

        if (direction === "up") {
            if (!(scale <= 0.2) && scale <= 1) {
                scale += -0.1;
            } else if (!(scale <= 0.2) && scale >= 1) {
                scale += scale * -0.3;
            }
            move = state.pixel_size * scale;
            commit("setPosition", { x: move, y: move });
        } else {
            if (!(scale >= state.max_scale)) {
                scale += scale * 0.3;
                move = state.pixel_size * scale;
                commit("setPosition", { x: move, y: move });
            }
        }

        commit("setScale", scale);
    }
};

export default {
    namespaced: true,
    state,
    mutations,
    actions
};
