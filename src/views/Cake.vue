<template>
  <div class="cake page" v-if="cake">
    <div class="container">
      <div class="title">
        <h1>{{ cake.title }}</h1>
        <vs-button icon circle shadow to="/cakes">
          <i class="bx bx-arrow-back"></i>
        </vs-button>
      </div>
      <img :src="cake.image" alt="ja den är god" />
      <p>{{ cake.detailDescription }}</p>
    </div>
  </div>
</template>

<script>
import Axios from 'axios';

export default {
  name: 'Cake',
  data() {
    return {
      cake: null,
    };
  },
  mounted() {
    Axios.get('http://localhost:3000/cakes?id=' + this.$route.params.id)
      .then((response) => (this.cake = response.data[0]))
      .catch((error) => console.log(error));
  },
};
</script>

<style lang="scss">
.cake {
  .container {
    max-width: 1200px;
  }
  img {
    border-radius: 20px;
  }
  .title {
    display: flex;
    align-items: center;
    justify-content: space-between;
    .vs-button {
      height: 40px;
      width: 40px;
    }
  }
}
</style>
