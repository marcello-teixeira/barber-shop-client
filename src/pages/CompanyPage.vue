<template>
  <q-page-container>
    <q-page padding class="flex align q-gutter-md" >
        <div class="col-8 q-pa-md">
          <OrdersViewCompany
            :Orders="rows"
          />
        </div>
        <div class="col q-gutter-md">
          <div class="column items-center">
            <q-btn
              label="New haircut"
              color="grey-8"
              @click="visibleHaircut()"
            />
          </div>

          <AddHaircut v-show="isVisibleHaircut"/>
          <h6 style="margin: 10px 0px 0px 20px;">
            OPEN ORDERS
          </h6>

          <OpenOrders
            @reset-orders="getOrders()"
            :Orders="rows"
          />
        </div>
    </q-page>
  </q-page-container>
</template>

<script>
import {onMounted, ref} from 'vue';
import AddHaircut from '../components/AddHaircut.vue'
import OrdersViewCompany from 'src/components/OrdersViewCompany.vue'
import OpenOrders from 'src/components/OpenOrders.vue'
import api from '../httpclient';


const rows = ref([]);

export default {
  name: 'CompanyPage',
  setup() {
    const isVisibleHaircut = ref(false);

    // Show/hide component to add a haircut
    const visibleHaircut = () => {
      isVisibleHaircut.value = !isVisibleHaircut.value;

      if (isVisibleHaircut.value) {
        document.querySelector('#open-order').style.height = '56dvh';
        return;
      }

      document.querySelector('#open-order').style.height = '77dvh';
    }

    const getOrders = () => {
      api.get('orders').then(response => rows.value = response.data);
    }

    onMounted(() => {
      getOrders();
    });

    return {
      isVisibleHaircut,
      rows,
      getOrders,
      visibleHaircut
    }
  },
  components: {
    AddHaircut,
    OrdersViewCompany,
    OpenOrders
  },
  created() {
    const client_role = localStorage.getItem('role');

    if(client_role != 'company') {
      window.location.hash = '/:catchFailLogin(.*)*'
    }
  }
}
</script>

<style>

@media  screen and (max-width: 1350px) {
  .align {
    display: flex;
    flex-direction: column;
  }
}
</style>

