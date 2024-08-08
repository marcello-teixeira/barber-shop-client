<template>
  <q-page-container>
    <q-page padding class="row q-page-main" >
      <div class="col-md-9 q-pa-md">
        <q-table
        class="order-table"
        title="ORDERS"
        flat
        hide-pagination
        :rows-per-page-options="[0]"
        :rows="rows"
        :columns="columns"
        no-data-label="We didn't find anything orders for you"
        row-key="id"
        >

        <template v-slot:body-cell-haircutDone="props">
          <q-td :props="props">
            <q-icon
              class="table-icon"
              v-if="props.row.haircutDone === false"
              name="cancel"
              color="red"
            ></q-icon>
            <q-icon
              v-else
              class="table-icon"
              name="check_circle"
              color="green"
            ></q-icon>
          </q-td>
        </template>

        <template v-slot:body-cell-haircutDate="props">
          <q-td :props="props">
            {{alterDateTime(props.row.haircutDate)}}
          </q-td>
        </template>

        <template v-slot:body-cell-haircutCost="props">
          <q-td :props="props">
            {{ `$ ${props.row.haircutCost}` }}
          </q-td>
        </template>

        </q-table>
      </div>

      <div class="col-md-3 q-gutter-md justify-start column">

        <q-btn
          label="New haircut"
          color="grey-8"
          @click="visibleHaircut()"
        >
        </q-btn>
        <AddHaircut v-show="isVisibleHaircut"/>

        <h6 style="margin: 10px 0px 0px 20px;">
          OPEN ORDERS
        </h6>
        <div id="open-order" class="open-orders q-gutter-md bg-grey">
          <q-card v-for="col in rowsFiltered" :key="col.id" class="bg-white card-main">
            <q-card-selection class="row">
              <div class="col q-pa-sm" style="font-size: 30px;">
                {{ `N° ${col.id}` }}
              </div>
              <div class="col-3 column items-center border-left q-pt-sm date-bg" style="font-size: 38px;">
                {{ new Date(col.haircutDate).getDate() }}
              </div>
            </q-card-selection>
            <q-card-selection class="row">
              <div class="col q-pa-sm" style="font-size: 20px;">
                {{ col.customerName }}
              </div>
              <div class="col-3 column items-center border-left date-bg"
              style="font-size: 18px;">
                {{ new Date(col.haircutDate).getMonth()+1 + "/" + new Date(col.haircutDate).getFullYear()}}
              </div>
            </q-card-selection>
            <q-card-selection class="row">
              <div class="col q-pa-sm q-btn-card">
                <div class="row">
                  <q-btn
                  icon="check"
                  color="green"
                  size="sm"
                  class="col"
                  @click="patchOrder(col.id)"
                  >
                  </q-btn>
                  <q-btn
                   icon="delete"
                   color="red"
                   size="sm"
                   class="col q-ml-sm"
                   @click="deleteOrder(col.id)">
                  </q-btn>
                </div>
              </div>
              <div class="col-3 column items-center border-left date-bg" style="font-size: 35px;">
                {{ getDayWeek(new Date(col.haircutDate).getDay()) }}
              </div>
            </q-card-selection>
          </q-card>
        </div>
      </div>
    </q-page>
  </q-page-container>
</template>

<script>
import {computed, onMounted, ref} from 'vue';
import AddHaircut from '../components/AddHaircut.vue'
import api from '../httpclient';

const columns = [
  {name: 'id',label: 'N°',field: 'id',sortable: true,align: 'left'},
  {name: 'customerName',label: 'Name',field: 'customerName',sortable: true,align: 'left'},
  {name: 'customerPhone',label: 'Phone',field: 'customerPhone',align: 'left' },
  {name: 'haircutName',label: 'Haircut',field: 'haircutName',align: 'left'},
  {name: 'haircutCost',label: 'Cost',field: 'haircutCost',align: 'left'},
  {name: 'haircutDate',label: 'Date',field: 'haircutDate',sortable: true,align: 'left'},
  {name: 'haircutDone',label: 'Finished',field: 'haircutDone',sortable: true,align: 'left'}
]

const rows = ref([]);

export default {
  name: 'CompanyPage',
  setup() {
    const isVisibleHaircut = ref(false);

    const alterDateTime = (dateTime) => {
      let date = new Date(dateTime);

      let fullDate = `${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`;

      return fullDate;
    }

    const getDayWeek = (day) => {
      let week = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Sex', 'Sat']

      return week[day];
    }

    const visibleHaircut = () => {
      isVisibleHaircut.value = !isVisibleHaircut.value;

      if (isVisibleHaircut.value) {
        document.querySelector('#open-order').style.height = '480px';
        return;
      }

      document.querySelector('#open-order').style.height = '690px';
    }

    const getOrders = () => {
      api.get('orders').then(response => rows.value = response.data);
    }

    const deleteOrder = async (id) => {
      await api.delete(`orders/${id}`);
      getOrders()

    }

    const patchOrder = async (id) => {
      await api.patch(`orders/${id}`);
      getOrders();
    }

    const rowsFiltered = computed(() => {
        let row = rows.value.filter(entity => !entity.haircutDone);
        return row;
    });

    onMounted(() => {
      getOrders();
    });

    return {
      isVisibleHaircut,
      columns,
      rows,
      rowsFiltered,
      visibleHaircut,
      alterDateTime,
      getDayWeek,
      deleteOrder,
      patchOrder
    }
  },
  components: {
    AddHaircut
  },
  created() {
    const client_id = localStorage.getItem('id');
    const client_role = localStorage.getItem('role');

    if(client_role != 'company') {
      window.location.hash = '/:catchFailLogin(.*)*'
    }
  }
}
</script>

<style>

.date-bg {
   background-color: rgb(58, 75, 58);
   color: #ffffffc2;
}

.card-main {
  overflow: hidden;
}

.q-btn-card {
  outline: 3px solid #c2c0c0;
}

.q-page-main {
  max-height: 884px;
  overflow: hidden;
}

.bg-gradient-green {
  font-size: 20px;
}

.border-left {
  border-left: 3px solid #c2c0c0;
}

.open-orders {
  height: 690px;
  overflow-y: auto;
  border: 1px solid rgba(0, 0, 0, 0.199);
  border-radius: 5px;
  padding-right: 15px;
}

.open-orders::-webkit-scrollbar {
  width: 0px;
}

.noDateTable {
  width: 400px;
  height: 100px;
}

.table-icon {
  font-size: 40px;
  position: relative;
  left: 21%;
  transform: translateX(-50%);
}

.order-table {
  height: 80vh;
}

.q-table__title {
  position: absolute;
  left: 50%;
  font-weight: bold;
}

.q-table__middle {
  border: 2px solid #8f8f8f;
  border-radius: 5px;
}

.q-table__middle::-webkit-scrollbar {
  width: 0px;
}

.q-table__top {
  background-color: transparent;
  border: none;
  margin: 15px;
}


.order-table thead tr th{
  position: sticky;
  top: 0;
  z-index: 1;
  background-color: #8f8f8f;
  border-bottom: 1px solid black;
  font-size: 1.5rem;

}

.order-table tbody tr:nth-child(odd) {
  background-color: #8f8f8f49;
}

.order-table tbody tr td {
  font-size: 1rem;

}

</style>
