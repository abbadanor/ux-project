import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    cart: [],
  },
  getters: {
    cart: (state) => {
      return state.cart;
    },
  },
  mutations: {
    initialiseStore(state) {
      state.cart = []; // Reset shopping cart when reloading page
    },
    addToCart(state, cake) {
      let alreadyExists = false;
      state.cart.forEach((item) => {
        if (cake.id === item.id) {
          alreadyExists = true;
        }
      });
      if (!alreadyExists) {
        state.cart.push(cake);
      }
    },
  },
  actions: {},
  modules: {},
});
