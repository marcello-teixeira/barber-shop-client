<template>
  <q-page-container>
    <q-page padding class="row q-gutter-lg justify-center">
      <div class="col-3 column justify-center order">
        <AddOrder
        @refresh-table-orders="refreshTableOrders"
        />
      </div>

      <OrdersView
      class="col-8 order"
      :Rows="rows"
      />
    </q-page>
  </q-page-container>
</template>

<script>
import { onMounted, ref } from 'vue';
import AddOrder from '../components/AddOrder.vue'
import OrdersView from '../components/OrdersViewCustomer.vue'
import api from 'src/httpclient';


export default {
  name: 'CustomerPage',
  setup() {
    const rows = ref([]);

    const getOrders = () => {
      api.get('orders').then(resp => rows.value = resp.data);
    }

    // Load again all orders to update table
    const refreshTableOrders = () => {
      setTimeout(()=> {
        api.get('orders').then(resp => rows.value = resp.data);
      }, 300);
    }

    onMounted(() => {
      getOrders();
    })

    return {
      rows,
      refreshTableOrders
    }
  },
  components: {
    AddOrder,
    OrdersView
  },
  created() {
    const client_role = localStorage.getItem('role');

    if(client_role != 'customer') {
      window.location.hash = '/:catchFailLogin(.*)*'
    }
  }
}
</script>

<style scoped>

@media (orientation: portrait) and (max-width: 640px) {
  .order {
    width: 90%;
  }
}

</style>
