<template>
  <div>
    <h3 class="text-center" style="margin-top: 0px;">
      YOUR ORDERS
    </h3>
    <q-table
    class="order-table"
    flat
    :columns="columns"
    :rows="rows"
    :rows-per-page-options="[0]"
    hide-pagination
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
    <template v-slot:body-cell-actions>
      <q-td>
        <q-icon
          name="archive"
          class="table-icon cursor-pointer"
        />
      </q-td>
    </template>
    </q-table>
  </div>
</template>

<script>
import api from '../httpclient';
import {ref, watch, computed} from 'vue';

const columns = [
  {name: 'id',label: 'N°',field: 'id',sortable: true,align: 'left'},
  {name: 'companyName',label: 'Name',field: 'companyName',sortable: true,align: 'left'},
  {name: 'companyPhone',label: 'Phone',field: 'companyPhone',align: 'left' },
  {name: 'haircutName',label: 'Haircut',field: 'haircutName',align: 'left'},
  {name: 'haircutCost',label: 'Cost',field: 'haircutCost',align: 'left'},
  {name: 'haircutDate',label: 'Date',field: 'haircutDate',sortable: true,align: 'left'},
  {name: 'haircutDone',label: 'Finished',field: 'haircutDone',sortable: true,align: 'left'},
  {name: 'actions',label: 'Actions',field: 'actions',sortable: true,align: 'left'}
]


export default {
  name: 'OrdersView',
  setup (props) {

    const rows = ref(props.Rows)

    watch(()=> props.Rows,
      (newVal) => {
        rows.value = newVal;
        console.log(newVal)
      },
      {immediate: true}
    )

    return {
      columns,
      rows
    }
  },
  props: {
    Rows: {
      type: Array,
      required: true
    }
  }
}
</script>

<style>

.table-icon {
  font-size: 40px;
  position: relative;
  left: 21%;
  transform: translateX(-50%);
}

.order-table {
  height: 76vh;
  overflow-y: auto;
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
