<template>
  <q-page-container>
    <q-page padding>
      <AddHaircut/>
    </q-page>
  </q-page-container>
</template>

<script>
import {ref} from 'vue';
import AddHaircut from '../components/AddHaircut.vue'


export default {
  name: 'CompanyPage',
  setup() {
    return {

    }
  },
  components: {
    AddHaircut
  }
}
</script>
