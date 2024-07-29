<template>
  <q-page-container class="row justify-center">
    <q-page class="col-6">
        <Login />
    </q-page>
  </q-page-container>
</template>

<script>
import Login from 'components/LoginClient.vue'

export default {
  name: 'IndexPage',
  components: {
    Login,
  }
};
</script>
