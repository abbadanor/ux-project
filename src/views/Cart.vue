<template>
  <div class="cart page">
    <div class="container">
      <h1>Shopping Cart</h1>
      <div v-if="cart.length > 0">
        <vs-card class="cake-card" type="3" v-for="item in cart" :key="item.id">
          <template #title>
            <h3>{{ item.title }}</h3>
          </template>
          <template #img>
            <img :src="item.image" alt="" />
          </template>
          <template #text>
            <p>{{ item.previewDescription }}</p>
            <h3>{{ item.price }}€ / styck</h3>
          </template>
          <template #interactions>
            <vs-button-group>
              <vs-button @click="decrementAmount(item)" danger class="interact-button">
                <i class="bx bx-minus"></i>
              </vs-button>
              <vs-button shadow disabled class="item-count"> {{ item.quantity }} </vs-button>
              <vs-button @click="incrementAmount(item)" :disabled="item.amount >= 10" success class="interact-button">
                <i class="bx bx-plus"></i>
              </vs-button>
            </vs-button-group>
          </template>
        </vs-card>
        <div class="details">
          <span>Total: {{ price }}€</span>
          <!-- Knappen är rektangel. Varför? jag vet inte. -->
          <vs-button success @click="addToCart()" circle size="xl" gradient icon primary>
            <i class="bx bx-cart"></i>
          </vs-button>
        </div>
      </div>
      <p v-else>You shopping cart is empty.</p>
    </div>
  </div>
</template>

<script>
import Axios from 'axios';
import { mapGetters, mapMutations } from 'vuex';

export default {
  name: 'Cart',
  computed: {
    ...mapGetters(['cart', 'user']),
    price: function () {
      let price = 0;
      this.cart.forEach((item) => {
        price += item.price * item.quantity;
      });
      return price.toFixed(2);
    },
  },
  methods: {
    ...mapMutations(['incrementAmount', 'decrementAmount']),
    addToCart: async function () {
      let post = {
        customerId: 9,
        cakes: [
          { cakeId: 4, quantity: 2 },
          { cakeId: 1, quantity: 7 },
        ],
        totalPrice: 4,
        timestamp: '2021-05-04T20:14:58.412Z',
      };
      await Axios.post('http://localhost:3000/orders', post);
    },
  },
};
</script>

<style lang="scss">
.cart {
  img {
    width: auto !important;
    height: 150px !important;
  }
  .vs-card {
    max-width: none !important;
  }
  .details {
    display: flex;
    justify-content: space-between;
  }
  .interact-button {
    height: 31px;
  }
  .item-count {
    opacity: 1 !important;
  }
  .cake-card {
    margin-bottom: 20px;
  }
}
</style>
