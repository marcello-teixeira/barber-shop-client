<template>
  <router-view />
</template>

<script>
export default {
  name: 'App',
  watch: {
    '$route.meta.title'(newTitle) {
      document.title = `BarberShop ${newTitle || ''}`
    }
  }
};
</script>

<style>

body {
  background-color: #fff;
}

body::-webkit-scrollbar {
  width: 8px;
  height: 0;
}

body::-webkit-scrollbar-track {
  background: #999999;
}

body::-webkit-scrollbar-thumb {
  background-color: #444444;
  border-radius: 6px;
  border: 3px solid #444444;
}

body::-webkit-scrollbar-thumb:hover {
  background-color: #555;
}


</style>
