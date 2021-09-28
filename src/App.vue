<template>
  <div class="app">
    <Navbar></Navbar>
    <router-view />
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue';

export default {
  name: 'App',
  components: {
    Navbar,
  },
};
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Poppins&display=swap');

:root {
  --vs-primary: 102, 145, 164 !important;
  --vs-success: 23, 201, 100;
  --vs-danger: 242, 19, 93;
  --vs-warn: 254, 130, 0;
  --vs-dark: 52, 38, 65 !important;
}

body {
  background-color: #6691a4;
  color: #fff;
  margin: 0;
  font-family: 'Poppins', sans-serif;
}

html::-webkit-scrollbar {
  width: 10px;
}

html::-webkit-scrollbar-track {
  background-color: #18191c;
}

html::-webkit-scrollbar-thumb {
  background: #4e4e4e;
  border-radius: 5px;
}

.page {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
}

.container {
  width: 85vw;
  padding: 0 20px 0 20px;
  border-radius: 5px 20px 20px 20px;
  background-color: var(--vs-theme-layout);
}
</style>
