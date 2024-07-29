<template>
  <q-page-container class="row justify-center">
    <q-page class="col-6">
        <Register />
    </q-page>
  </q-page-container>
</template>

<script>
//import Login from 'components/LoginClient.vue'
import Register from 'components/RegisterClient.vue'


export default {
  name: 'IndexPage',
  components: {
    Register

  }
};
</script>
