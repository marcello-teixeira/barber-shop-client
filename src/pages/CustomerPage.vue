<template>
  <q-page-container>
    <q-page padding class="row">
      <NewHaircut class="col-md-10"/>

      <OrdersView class="col-md-2"/>
    </q-page>
  </q-page-container>
</template>

<script>
import NewHaircut from '../components/AddOrder.vue'
import OrdersView from '../components/OrdersView.vue'

export default {
  name: 'CustomerPage',
  components: {
    NewHaircut,
    OrdersView
  }
}
</script>
