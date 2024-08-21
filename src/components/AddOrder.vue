<template>
    <div class="flex column new-order">
      <h3 class="text-center" style="margin-top: 0px; border-bottom: 5px solid #799693;">
      Get a new haircut?
      </h3>
      <q-form
      class="col"
      >
        <div class="q-gutter-sm">
          <OrderToCompany
            @select-company="selectCompany"
            @reset-order="resetOrder"
            :CompanySelect="companySelected"
          />
          <div v-show="companySelected.name" class="location-company q-mb-lg "><span style="font-size: 18px; font-weight: bolder;display: block;">Location </span>{{ companySelected.location || ''}}</div>
          <DateOrder
          @get-fulldatetime="setFullDatetime"
          :DateOrders="dateOrders"
          :Date="date"
          :Time="time" />
          <div >
            <HaircutOrder
            v-show="companySelected.name"
            @get-haircuts-company="setHaircutsCompany"
            :Haircuts="haircuts"
            :ChooseHaircut="selectHaircut"/>
          </div>
        </div>
        <div class="row justify-center q-mt-md q-gutter-sm">
              <q-btn
              class="col-md-3"
              type="reset"
              icon="clear"
              @click="resetOrder"
              color="red"
              />
              <q-btn
                class="col-md-4 q-ml-xl"
                icon="content_cut"
                @click="submitNewOrder"
                color="green"
              />
        </div>
      </q-form>
    </div>
</template>

<script>
import api from '../httpclient';
import OrderToCompany from './OrderToCompany.vue';
import DateOrder from './DateOrder.vue'
import HaircutOrder from './HaircutOrder.vue'
import {ref} from 'vue';
import { Notify } from 'quasar';



export default {
  name: 'NewHaircut',
  setup (_, {emit}) {
    const selectHaircut = ref('')
    const companySelected = ref({});
    const dateOrders = ref([]);
    const fullDate = ref('');
    const haircuts = ref([]);
    const date = ref('');
    const time = ref('');

    const setHaircutsCompany = (haircut) => {
      selectHaircut.value = haircut;
    }

    const setFullDatetime = (dateArg, timeArg) => {
      date.value = dateArg;
      time.value = timeArg;

      fullDate.value = date.value+"T"+time.value+":00";
    }

    const getHaircuts = (companyId) => {
      api.get(`haircut/customers/${companyId}`).then(resp => haircuts.value = resp.data);
    }

    const getDateOrders = async (companyId) => {
      const response = await api.get(`orders/date/${companyId}`);

      response.data.forEach(el => {
        dateOrders.value.push(el.haircutDate);
      });
    }

    const selectCompany = (company) => {
      companySelected.value = company;

      getHaircuts(company.id);
      getDateOrders(company.id);
    };

    const resetOrder = () => {
      companySelected.value = {};
      selectHaircut.value = '';
      fullDate.value = '';
      time.value = '';
      date.value = '';
    }

    const submitNewOrder = (e) => {
      e.preventDefault();
      emit('refresh-table-orders');

      if(selectHaircut.value === '' || companySelected.value === '' || fullDate.value === '') {
        Notify.create({
          message: 'Fill in the fields correctly',
          color: 'negative'
        });
        return;
      }

      api.post('orders/new', {
        companyID: companySelected.value.id,
        companyName: companySelected.value.name,
        companyPhone: companySelected.value.phone,
        companyLocation: companySelected.value.location,
        haircutID: selectHaircut.value.id,
        haircutName: selectHaircut.value.name,
        haircutCost: selectHaircut.value.cost,
        haircutDate: fullDate.value,
      }).then(_ => resetOrder());

    }

    return {
      setFullDatetime,
      setHaircutsCompany,
      selectCompany,
      submitNewOrder,
      resetOrder,
      dateOrders,
      haircuts,
      selectHaircut,
      companySelected,
      date,
      time
    }
  },
  components: {
    OrderToCompany,
    DateOrder,
    HaircutOrder,
  },
  emits: [
    'refresh-table-orders'
  ]
}
</script>

<style>

::-webkit-scrollbar {
  width: 0px;
}

.select-haircut {
  font-size: 18px;
  text-decoration: underline;
  text-decoration-color: green;
}

.selectedHour {
  background-color: #acacacaf;
  padding: 5px;
  border-radius: 3px;
}
.list-hours {
  width: 150px;
}

.list-hours, .list-companies {
  height: 200px;
  overflow-y: auto;
  border: 1px solid #acacacaf;
  border-radius: 4px;
}

.new-order {
  background-color: #ccc;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 10px;
  overflow-y: auto;
  box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.205);
  transition: auto 1s;
}

.location-company {
  padding: 5px;
  font-size: 16px;
  border-radius: 4px;
  text-align: start;
  background-color: #2a645e83;
}


</style>
