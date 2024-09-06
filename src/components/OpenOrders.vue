<template>
  <div>
    <div id="open-order" class="open-orders q-gutter-md bg-grey">
      <q-card v-for="col in rowsFiltered" :key="col.id" class="bg-white card-main">
        <q-card-section class="row">
          <div class="col q-pa-sm number-order" >
            {{ `N° ${col.id}` }}
          </div>
          <div class="col-3 column items-center border-left q-pt-sm date-bg haircut-date">
            {{ getDate(col.haircutDate) }}
          </div>
        </q-card-section>
        <q-card-section class="row">
          <div class="col q-pa-sm customer-name" >
            {{ col.customerName }}
          </div>
          <div class="col-3 column items-center justify-center border-left date-bg haircut-month-year">
            {{ getMonthYear(col.haircutDate)}}
          </div>
        </q-card-section>
        <q-card-section class="row">
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
          <div class="col-3 column items-center border-left date-bg haircut-dayweek">
            {{ getDayWeek(col.haircutDate) }}
          </div>
        </q-card-section>
      </q-card>
    </div>
  </div>
</template>

<script>
import api from 'src/httpclient'
import {computed, onMounted} from 'vue';

function loadCss() {
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = 'src/style/openorderstyle.css'

  document.head.appendChild(link);
}

export default {
  name: 'OpenOrders',
  setup (props, {emit}) {

    const getDate = (date) => {
      return String(new Date(date).getDate()).padStart(2, "0");
    }

    const getMonthYear = (date) => {
       const month = String(new Date(date).getMonth()+1).padStart(2,"0");
       const year = new Date(date).getFullYear();

       return `${month}/${year}`
    }

    const getDayWeek = (date) => {
      const numberDay = new Date(date).getDay();
      const week = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Sex', 'Sat']

      return week[numberDay];
    }

    // Delete a order and update the CompanyPage
    const deleteOrder = async (id) => {
      await api.delete(`orders/${id}`);
      emit('reset-orders');
    }

    // Modify if order is done and update the CompanyPage
    const patchOrder = async (id) => {
      await api.patch(`orders/${id}`);
      emit('reset-orders');
    }

    // Check if the haircut has already been done
    const rowsFiltered = computed(() => {
        const row = props.Orders.filter(entity => !entity.haircutDone);
        return row;
    });

    onMounted(() => {
      loadCss();
    });

    return {
      rowsFiltered,
      deleteOrder,
      patchOrder,
      getDayWeek,
      getDate,
      getMonthYear
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

.haircut-date {
  font-size: 38px;
}

.haircut-dayweek {
  font-size: 35px;
}

.haircut-month-year {
  font-size: 18px;
}

.customer-name {
  font-size: 20px;
}

.number-order {
  font-size: 30px;
}

.q-card__section--vert {
  padding: 0;
}

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

.border-left {
  border-left: 3px solid #c2c0c0;
}

.open-orders {
  width: auto;
  height: 77dvh;
  overflow-y: auto;
  border: 1px solid rgba(0, 0, 0, 0.199);
  border-radius: 5px;
  padding-right: 15px;
}



</style>
