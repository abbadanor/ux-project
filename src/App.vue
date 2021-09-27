<template>
  <div class="app">
    <Jude></Jude>
    <router-view />
  </div>
</template>

<script>
import Jude from '@/components/Jude.vue';

export default {
  name: 'App',
  components: {
    Jude,
  },
};
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Poppins&display=swap');

[vs-theme='dark'] {
  --vs-theme-bg: #18191c;
  --vs-theme-color: #fff;
  --vs-theme-layout: #1e2023;
  --vs-theme-bg2: #141417;
  --vs-theme-code: #141417;
  --vs-theme-code2: #161619;
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
