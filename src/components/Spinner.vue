<template>
  <div class="spinner">

  </div>
</template>

<script>
export default {
  name: 'SpinnerComponent',
  setup () {
    return {}
  }
}
</script>

<style scoped>

.spinner {
  background-image: url('../../public/icons/icon-loading-barber.png');
  background-size: cover;
  width: 150px;
  height: 150px;
  animation: spin 1.3s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}



</style>
