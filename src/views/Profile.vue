<template>
  <div class="page profile">
    <div class="container">
      <vs-avatar circle size="100">
        <img :src="user.avatar" alt="" />
      </vs-avatar>

      <vs-input :value="user.name" placeholder="Name">
        <template #message-danger> Required </template>
      </vs-input>

      <vs-input :value="user.avatar" placeholder="Image URL">
        <template #message-danger> Required </template>
      </vs-input>

      <vs-input type="password" placeholder="Password">
        <template #message-warn> Insecure password </template>
      </vs-input>
      <vs-button block @click="changeProfile()">Change</vs-button>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'Profile',
  computed: {
    ...mapGetters(['user']),
  },
  methods: {
    async changeProfile() {
      // lägg till sen någon gång.
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
