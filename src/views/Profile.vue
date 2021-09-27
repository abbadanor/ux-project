<template>
  <div class="page profile">
    <div class="container">
      <vs-avatar circle size="100">
        <img :src="user.avatar" alt="" />
      </vs-avatar>

      <vs-input v-model="name" placeholder="Name">
        <template #message-danger> Required </template>
      </vs-input>

      <vs-input v-model="avatar" placeholder="Image URL">
        <template #message-danger> Required </template>
      </vs-input>

      <vs-input v-model="password" placeholder="Password">
        <template #message-warn> Insecure password </template>
      </vs-input>
      <vs-button block @click="changeProfile()">Change</vs-button>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import axios from 'axios';

export default {
  name: 'Profile',
  data() {
    return {
      name: this.user.name,
      avatar: this.user.avatar,
      password: this.user.password,
    };
  },
  computed: {
    ...mapGetters(['user']),
  },
  methods: {
    async changeProfile() {
      let patch = {
        name: this.name,
        avatar: this.avatar,
        password: this.password,
      };
      try {
        await axios.patch('http://localhost:3000/customers/3', patch);
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style lang="scss">
.profile {
  .container {
    padding: 20px;
    max-width: 750px;
  }
  .vs-input {
    width: 100% !important;
    margin: 10px 0 10px 0;
  }
}
</style>
