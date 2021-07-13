
const state = () => ({
    colors: {}
})

const mutations = {
    setColors(state, colors) {
        state.colors = colors
    },
}

export default {
    namespaced: true,
    state,
    mutations
}