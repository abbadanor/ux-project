<template>
  <div class="cakes page">
    <div class="container" v-if="cakes">
      <cake-card
        v-for="cake in cakes.data"
        :key="cake.id"
        :cake="cake"
        :quantity="cake.quantity ? cake.quantity : 0"
        @incrementQuantity="incrementQuantity"
        @decrementQuantity="decrementQuantity"
        @addItemToCart="addItemToCart"
      ></cake-card>
    </div>
  </div>
</template>

<script>
import Axios from 'axios';
import CakeCard from '@/components/CakeCard.vue';
import Vue from 'vue';
import { mapMutations } from 'vuex';

export default {
  name: 'Cakes',
  data() {
    return {
      cakes: null,
    };
  },
  components: {
    CakeCard,
  },
  async mounted() {
    try {
      this.cakes = await Axios.get('http://localhost:3000/cakes/');
    } catch (error) {
      console.error(error);
    }
  },
  methods: {
    incrementQuantity(childCake) {
      this.cakes.data.forEach((cake) => {
        if (cake.id === childCake.id) {
          if (!cake.quantity) {
            Vue.set(cake, 'quantity', 0);
          }
          if (cake.quantity < 10) {
            cake.quantity++;
          }
        }
      });
    },
    decrementQuantity(childCake) {
      this.cakes.data.forEach((cake) => {
        if (cake.id === childCake.id) {
          if (!cake.quantity) {
            Vue.set(cake, 'quantity', 0);
          }
          if (cake.quantity > 0) {
            cake.quantity--;
          } else {
            Vue.delete(cake, 'quantity');
          }
        }
      });
    },
    addItemToCart(cake) {
      this.addItemToCart(cake);
    },
    ...mapMutations({
      addItemToCart: 'addToCart',
    }),
  },
};
</script>

<style lang="scss">
.cakes {
  .container {
    display: grid;
    padding: 20px;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 20px;
    max-width: 1200px;
  }
}
</style>
