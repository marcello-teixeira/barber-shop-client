<template>
  <q-page-container class="row justify-center">
    <q-page class="col-6">
        <Register />
    </q-page>
  </q-page-container>
</template>

<script>
import Login from 'src/components/ClientLoginComponent.vue';
import Register from 'src/components/ClientRegisterComponent.vue';


export default {
  name: 'IndexPage',
  components: {
    Register,

  },
  props: {
    OnRegister: Boolean
  }

};
</script>
