<template>
  <q-page-container>
    <q-page padding class="row">
      <div class="col-md-9 q-pa-md">
        <q-table
        class="order-table"
        title="ORDERS"
        flat
        bordered
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
             class="done-icon"
              v-if="props.row.haircutDone === false"
              name="cancel"
              color="red"
            ></q-icon>
            <q-icon
              v-else
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
          color="green"
          @click="isVisibleHaircut = !isVisibleHaircut"
        >
        </q-btn>
        <AddHaircut v-show="isVisibleHaircut"/>

        <h6 style="margin: 10px 0px 0px 20px;">
          OPEN ORDERS
        </h6>
        <div class="open-orders q-gutter-md">
          <q-card v-for="col in rows" :key="col.id" class="bg-gradient-green">
            <q-card-selection class="row ">
              <div class="col q-pa-sm" >
                {{ `N° ${col.id}` }}
              </div>
              <div class="col-3 column items-center border-left q-pt-sm">
                {{ new Date(col.haircutDate).getDate() }}
              </div>
            </q-card-selection>
            <q-card-selection class="row">
              <div class="col q-pa-sm">
                {{ col.customerName }}
              </div>
              <div class="col-3 column items-center border-left">
                {{ new Date(col.haircutDate).getMonth()+1 + "/" + new Date(col.haircutDate).getFullYear()}}
              </div>
            </q-card-selection>
            <q-card-selection class="row">
              <div class="col q-gutter-md q-pa-sm">
                <q-btn
                icon="check"
                color="green"
                size="sm">
                </q-btn>
                <q-btn
                 icon="delete"
                 color="red"
                 size="sm">
                </q-btn>
              </div>
              <div class="col-3 column items-center border-left">
                {{ "Mon" }}
              </div>
            </q-card-selection>
          </q-card>
        </div>
      </div>
    </q-page>
  </q-page-container>
</template>

<script>
import {onMounted, ref} from 'vue';
import AddHaircut from '../components/AddHaircut.vue'
import api from '../httpclient';

const columns = [
  {name: 'id',label: 'N°',field: 'id',sortable: true,align: 'left'},
  {name: 'customerName',label: 'Name',field: 'customerName',sortable: true,align: 'left'},
  {name: 'customerPhone',label: 'Phone',field: 'customerPhone',align: 'left' },
  {name: 'haircutName',label: 'Haircut',field: 'haircutName',align: 'left'},
  {name: 'haircutCost',label: 'Cost',field: 'haircutCost',align: 'left'},
  {name: 'haircutDate',label: 'Date',field: 'haircutDate',sortable: true,align: 'left'},
  {name: 'haircutDone',label: 'Done',field: 'haircutDone',sortable: true,align: 'left'}
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

    return {
      isVisibleHaircut,
      columns,
      rows,
      alterDateTime
    }
  },
  components: {
    AddHaircut
  },
  mounted() {
    api.get('orders').then(response => this.rows = response.data);
  }
}
</script>

<style>

.bg-gradient-green {
  background-image: linear-gradient(270deg, #85FAB1, #5E7A69 );
  /* background-size: 300% 300%; */
  font-size: 20px;
}

.border-left {
  border-left: 1px solid black;
}

.open-orders {
  height: 690px;
  overflow-y: auto;
  border: 1px solid rgba(0, 0, 0, 0.199);
  border-radius: 5px;
}

.noDateTable {
  width: 400px;
  height: 100px;
}

.done-icon {
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
