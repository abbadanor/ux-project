<template>
  <div class="page profile">
    <div class="container">
      <vs-avatar circle size="100">
        <img :src="user.avatar" alt="" />
      </vs-avatar>

      <vs-input v-model="name" placeholder="Name">
        <template v-if="!name" #message-danger> Required </template>
      </vs-input>

      <vs-input v-model="avatar" placeholder="Image URL">
        <template v-if="!avatar" #message-danger> Required </template>
      </vs-input>

      <vs-input v-model="password" type="password" placeholder="Password">
        <template v-if="password.length < 8" #message-warn> Insecure password </template>
      </vs-input>
      <vs-button dark block @click="changeProfile()">Change</vs-button>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';
import axios from 'axios';

export default {
  name: 'Profile',
  data() {
    return {
      name: '',
      avatar: '',
      password: '',
    };
  },
  computed: {
    ...mapGetters(['user']),
  },
  mounted() {
    this.name = this.user.name;
    this.avatar = this.user.avatar;
    this.password = this.user.password;
  },
  methods: {
    async changeProfile() {
      let put = this.user;
      put.name = this.name;
      put.avatar = this.avatar;
      put.password = this.password;

      try {
        await axios.put(`http://localhost:3000/customers/${this.user.id}`, put);
        this.setUser(put);
        this.notifyProfile();
      } catch (error) {
        console.log(error);
      }
    },
    notifyProfile() {
      this.$vs.notification({
        color: 'success',
        position: 'bottom-right',
        title: 'Profile changed',
        text: 'Your profile information was successfully changed',
      });
    },
    ...mapMutations(['setUser']),
  },
};
</script>

<style lang="scss">
.profile {
  .container {
    background-color: #fff;
    padding: 20px;
    max-width: 750px;
  }
  .vs-input {
    width: 100% !important;
    margin: 10px 0 10px 0;
  }
}
</style>
