<template>
  <div class="cake-card">
    <vs-card>
      <template #title>
        <h3 @click="$router.push(`/cake/${cake.id}`)">{{ cake.title }}</h3>
      </template>
      <template #img>
        <img @click="$router.push(`/cake/${cake.id}`)" :src="cake.image" alt="" />
        <div class="price">
          <vs-button shadow circle>{{ cake.price.toFixed(2) }} €</vs-button>
        </div>
      </template>
      <template #text>
        <p @click="$router.push(`/cake/${cake.id}`)">{{ cake.previewDescription }}</p>
      </template>
      <template #interactions>
        <vs-button-group>
          <vs-button :disabled="quantity <= 0" @click="decrementQuantity()" danger>
            <i class="bx bx-minus"></i>
          </vs-button>
          <vs-button shadow disabled class="item-count"> {{ quantity }} </vs-button>
          <vs-button :disabled="quantity >= 10" @click="incrementQuantity()" success>
            <i class="bx bx-plus"></i>
          </vs-button>
        </vs-button-group>
        <vs-button @click="addItemToCart()" :disabled="!cake.quantity" icon circle>
          <i class="bx bx-cart"></i>
        </vs-button>
      </template>
    </vs-card>
  </div>
</template>

<script>
export default {
  name: 'CakeCard',
  props: {
    cake: Object,
    quantity: Number,
  },
  methods: {
    incrementQuantity() {
      this.$emit('incrementQuantity', this.cake);
    },
    decrementQuantity() {
      this.$emit('decrementQuantity', this.cake);
    },
    addItemToCart() {
      this.$emit('addItemToCart', this.cake);
    },
  },
};
</script>

<style lang="scss">
.cake-card {
  .vs-card {
    user-select: none;
    max-width: none;
    height: 100%;
  }
  .vs-card:hover {
    .vs-card__interactions {
      opacity: 1;
    }
  }
  .vs-card__interactions {
    opacity: 0;
    transition: opacity 200ms ease-in-out;
  }
  img {
    height: 300px;
  }
  .vs-button-group {
    .vs-button {
      height: 28px;
    }
    .item-count {
      opacity: 1;
    }
  }
  .price {
    position: absolute;
    bottom: 0px;
    padding: 5px 10px;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    right: 0px;
  }
}
</style>
