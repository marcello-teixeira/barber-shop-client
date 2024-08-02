<template>
  <q-page-container>
    <q-page padding class="row">
      <div class="col-md-9">
        <q-table
        title="All Orders"
        :rows="rows"
        :columns="columns"
        row-key="index"
        >
        </q-table>
      </div>
      <div class="col-md-3">
        <q-list>
          <q-item>
            Marcello Teixeira
            <q-btn
              label="Excluir"
            >

            </q-btn>
          </q-item>
          <q-separator></q-separator>
          <q-item>
            Marcello Teixeira
            <q-btn
              label="Excluir"
            >

            </q-btn>
          </q-item>
          <q-separator></q-separator>
        </q-list>
      </div>
    </q-page>
  </q-page-container>
</template>

<script>
import {ref} from 'vue';

const columns = [
  {
    name: 'index',
    label: '#',
    field: 'index'
  },
  {
    name: 'name',
    label: 'Name',
    field: 'name'
  }
]

const rows = [
  {
    index: '1',
    name: 'Marcello',
  }
]


export default {
  name: 'CompanyPage',
  setup() {
    return {
      columns,
      rows
    }
  },
  components: {

  }
}
</script>
