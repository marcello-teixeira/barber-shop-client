<template>
  <q-page-container>
    <q-page padding>
      <NewHaircut/>
    </q-page>
  </q-page-container>
</template>

<script>
import NewHaircut from '../components/NewHaircut.vue'

export default {
  name: 'CustomerPage',
  components: {
    NewHaircut
  }
}
</script>
