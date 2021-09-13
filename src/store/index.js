import axios from 'axios';
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: {},
    cart: [],
  },
  getters: {
    user: (state) => {
      return state.user;
    },
    cart: (state) => {
      return state.cart;
    },
  },
  mutations: {
    initialiseStore(state) {
      if (localStorage.getItem('user')) {
        state.user = JSON.parse(localStorage.getItem('user'));
      }
      state.cart = []; // Reset shopping cart when reloading page
    },
    setUser(state, user) {
      state.user = user;
      localStorage.setItem('user', JSON.stringify(user));
    },
    forgetUser(state) {
      state.user = {};
      localStorage.removeItem('user');
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
    incrementAmount(state, cake) {
      for (let item in state.cart) {
        if (state.cart[item].id === cake.id) {
          state.cart[item].quantity++;
        }
      }
    },
    decrementAmount(state, cake) {
      for (let item in state.cart) {
        if (state.cart[item].id === cake.id) {
          state.cart[item].quantity--;
          if (state.cart[item].quantity <= 0) {
            state.cart.pop(state.cart[item]);
          }
        }
      }
    },
  },
  actions: {
    async setUser({ commit }, { email, password }) {
      let user = {};
      try {
        user = await axios.get(`http://localhost:3000/customers?email=${email}`);
      } catch (e) {
        console.error(e);
      }
      if (user.data[0].password === password) {
        commit('setUser', user.data[0]);
      }
    },
  },
  modules: {},
});
