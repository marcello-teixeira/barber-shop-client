<template>
   <q-input
        label="Company"
        type="search"
        v-model="companySelected"
        :rules="[val => val !== undefined]"
        outlined
        filled
        @focus="isListCompanyVisible = true"
        @update:model-value="resetOrder"
      >
        <template v-slot:prepend>
          <q-icon
            name="search"
            class="cursor-pointer"
          >
          </q-icon>
        </template>
        <template v-slot:append>
          <q-icon
            name="clear"
            class="cursor-pointer"
            @click="resetOrder"
          >
          </q-icon>
        </template>
      </q-input>

      <q-list v-show="isListCompanyVisible" @click="isListCompanyVisible = false" class="list-companies">
        <q-item v-for="company in filteredCompanies" :key="company.id" @click="selectCompany(company)" clickable>
          <q-item-section>
            {{ company.name + ", " + company.location }}
            <q-separator />
          </q-item-section>
        </q-item>
      </q-list>
</template>

<script>
import {computed, onMounted, ref, watch} from 'vue';
import api from '../httpclient';


export default {
  name: 'OrderToCompany',
  setup (props, {emit}) {
    const isListCompanyVisible = ref(false);
    const companies = ref([]);
    const companySelected = ref('');

    const filteredCompanies = computed(() => {
      if(!companySelected.value) {
        return companies.value;
      }

      const completeCompany = companies.value.filter(company => {
        return company.name.toLowerCase().includes(companySelected.value.toLowerCase()) || company.location.toLowerCase().includes(companySelected.value.toLowerCase())
      });

      return completeCompany;
    });

    const resetOrder = () => {
      companySelected.value = props.CompanySelect.name;
      emit('reset-order');
    }

    const selectCompany = (company) => {
      emit('select-company', company);
      companySelected.value = company.name;
    }

    const getCompanies = async () => {
      const response = await api.get('company');
      companies.value = response.data;

      return response.data;
    }

    onMounted(() => {
      getCompanies();
    })

    watch(() => props.CompanySelect,
      (newVal) => {
        companySelected.value = newVal.name;
      },
      { immediate: true }
    );

    return {
      isListCompanyVisible,
      companySelected,
      filteredCompanies,
      selectCompany,
      resetOrder
    }
  },
  props: {
    CompanySelect: {
      type: Object,
      required: true
    }
  },
  emits: ['select-company', 'reset-order']
}
</script>

<style>

.list-companies {
  background-color: #2a645e83;
}

</style>
