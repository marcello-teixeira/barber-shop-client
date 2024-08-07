<template>
  <div class="row">
    <q-form
    class="col-4"
    >
      <h3 class="text-center" style="margin-top: 0px;">
        Get a new haircut?
      </h3>

      <div class="inputs-border q-gutter-sm">
        <OrderToCompany
          @select-company="selectCompany"
          @reset-order="resetOrder"
          :CompanySelect="companySelected"
        />

        <div v-show="companySelected.name" class="location-company "><span style="font-size: 18px; font-weight: bolder;display: block;">Location </span>{{ companySelected.location || ''}}</div>

        <DateOrder
        @get-fulldatetime="setFullDatetime"
        :DateOrders="dateOrders"
        :Date="date"
        :Time="time" />

        <HaircutOrder
        v-show="companySelected.name"
        @get-haircuts-company="setHaircutsCompany"
        :Haircuts="haircuts" />

        <div class="row justify-center q-gutter-sm">
          <q-btn
          class="col-md-3"
          type="reset"
          icon="clear"
          @click="resetOrder"
          color="red"
          />
          <q-btn
            class="col-md-4 q-ml-xl"
            type="submit"
            icon="content_cut"
            @click="submitNewOrder"
            color="green"
          />
        </div>


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



export default {
  name: 'NewHaircut',
  setup () {
    const selecthaircut = ref({})
    const companySelected = ref({});
    const dateOrders = ref([]);
    const fullDate = ref('');
    const haircuts = ref([]);
    const date = ref('');
    const time = ref('');

    const setHaircutsCompany = (haircut) => {
      selecthaircut.value = haircut;
    }

    const setFullDatetime = (dateArg, timeArg) => {
      date.value = dateArg;
      time.value = timeArg;
      fullDate.value = date.value+"T"+time.value+":00"
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
    }

    const resetOrder = () => {
      companySelected.value = {};
      selecthaircut.value = '';
      fullDate.value = null;
      time.value = '';
      date.value = '';
    }

    const submitNewOrder = (e) => {
      e.preventDefault();

      api.post('orders/new', {
        CompanyID: companySelected.value.id,
        CompanyName: companySelected.value.name,
        CompanyPhone: companySelected.value.phone,
        CompanyLocation: companySelected.value.location,
        HaircutID: selecthaircut.value.id,
        HaircutName: selecthaircut.value.name,
        HaircutCost: selecthaircut.value.cost,
        HaircutDate: fullDate.value,
      });

    }


    return {
      setFullDatetime,
      setHaircutsCompany,
      selectCompany,
      submitNewOrder,
      resetOrder,
      dateOrders,
      haircuts,
      selecthaircut,
      companySelected,
      date,
      time
    }
  },
  components: {
    OrderToCompany,
    DateOrder,
    HaircutOrder
  }
}
</script>

<style>

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

.inputs-border {
  background-color: #ccc;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 10px;
  height: 740px;
}

.location-company {
  padding: 5px;
  font-size: 16px;
  border-radius: 4px;
  text-align: start;
  background-color: #2a645e83;
}

</style>
