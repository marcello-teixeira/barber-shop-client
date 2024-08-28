<template>
  <div>
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
            {{ props.row.haircutCost }}
          </q-td>
        </template>
        </q-table>
  </div>
</template>

<script>
import {watch, ref} from 'vue';

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
  name: 'OrdersViewCompany',
  setup (props) {

    const alterDateTime = (dateTime) => {
      const date = new Date(dateTime);
      const day = String(date.getDate()).padStart(2, "0");
      const month = String(date.getMonth()+1).padStart(2, "0");

      const fullDate = `${day}/${month}/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`;

      return fullDate;
    }

    watch(()=> props.Orders,
        (newVal) => {
          rows.value = newVal
        },
        {
          immediate: true
        })

    return {
      alterDateTime,
      columns,
      rows
    }
  },
  props: {
    Orders: {
      type: Array,
      required: true
    }
  }
}
</script>

<style>
::-webkit-scrollbar {
  width: 5px;
}

::-webkit-scrollbar-track {
  background: #8F8F8F;
}

::-webkit-scrollbar-thumb {
  background: #fff;
  border-radius: 5px;
  z-index: 1;
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

.table-icon {
  font-size: 40px;
  position: relative;
  left: 35%;
  transform: translateX(-50%);
}

.order-table {
  width: auto;
  height: 85dvh;
}

.q-table__title {
  position: absolute;
  left: 50%;
  transform: translateX(-25%);
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

</style>
