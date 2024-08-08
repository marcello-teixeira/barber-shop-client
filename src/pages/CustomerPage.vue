<template>
  <q-page-container>
    <q-page padding class="row q-gutter-lg justify-center">
      <AddOrder
      class="col-md-3"
      @refresh-table-orders="refreshTableOrders"
      />

      <OrdersView
      class="col-md-8"
      :Rows="rows"
      />
    </q-page>
  </q-page-container>
</template>

<script>
import { onMounted, ref } from 'vue';
import AddOrder from '../components/AddOrder.vue'
import OrdersView from '../components/OrdersView.vue'
import api from 'src/httpclient';


// Adiciona um interceptador na requisição
api.interceptors.request.use((config) => {
  config.metadata = { startTime: new Date() };
  return config;
}, (error) => {
  return Promise.reject(error);
});

// Adiciona um interceptador na resposta
api.interceptors.response.use((response) => {
  const endTime = new Date();
  response.config.metadata.endTime = endTime;
  response.duration = endTime - response.config.metadata.startTime;
  console.log(`Request to ${response.config.url} took ${response.duration} ms`);
  return response;
}, (error) => {
  return Promise.reject(error);
});

export default {
  name: 'CustomerPage',
  setup() {
    const rows = ref([]);

    const getOrders = () => {
      api.get('orders').then(resp => rows.value = resp.data);
    }

    const refreshTableOrders = () => {
      setTimeout(()=> {
        api.get('orders').then(resp => rows.value = resp.data);
      }, 1500);
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
  }
}
</script>
