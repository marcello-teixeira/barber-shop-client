<template>

  <q-btn
    label="New Haircut"
    icon="content_cut"
    @click="isFormHairVisible = !isFormHairVisible"
  >
  </q-btn>
  <div v-show="isFormHairVisible">
    <q-form>
      <q-input
        label="Company or city"
        type="search"
        v-model="querySearch"
        :clearable="true"
      >
        <template v-slot:prepend>
          <q-icon
            name="search"
            class="cursor-pointer"
          >
          </q-icon>
        </template>

      </q-input>

      <q-list>
        <q-item v-for="company in filteredCompanies" :key="company.id" @click="selectCompany(company)" clickable>
          <q-item-section>
            {{ company.name }} {{ "," }} {{ company.location }}
          </q-item-section>
        </q-item>
      </q-list>

      <q-input
        v-model="date"
        filled
        label="Date"
        :rules="[val => new Date(val) >= new Date()]"
      >
        <template v-slot:prepend>
          <q-icon
          name="event"
          class="cursor-pointer"
          >
            <q-popup-proxy>
              <q-date
              v-model="date"
              mask="DD/MM/YYYY HH:mm"
              unmasked-value
              >
              </q-date>
            </q-popup-proxy>
          </q-icon>
        </template>

        <template v-slot:append>
          <q-icon
            name="access_time"
            class="cursor-pointer"
          >
            <q-popup-proxy>
              <q-time
                v-model="date"
                mask="DD/MM/YYYY HH:mm"
                unmasked-value
              >

              </q-time>
            </q-popup-proxy>
          </q-icon>
        </template>
      </q-input>

      <q-input
        label="Haircut"
      >

      </q-input>

    </q-form>

  </div>
</template>

<script>
import api from '../httpclient';
import {computed, onMounted, ref} from 'vue';

export default {
  name: 'NewHaircut',
  setup () {
    const isFormHairVisible = ref(false);
    const querySearch = ref('');
    const companies = ref([]);
    const companySelect = ref({});
    const date = ref('');

    const getCompanies = async () => {
      const response = await api.get('company/get');
      companies.value = response.data;
      console.log(response.data)

      return response.data;
    }

    const filteredCompanies = computed(() => {
      if(!querySearch.value) {
        return querySearch.value;
      }

      const completeCompany = companies.value.filter(company => {
        return company.name.toLowerCase().includes(querySearch.value.toLowerCase()) || company.location.toLowerCase().includes(querySearch.value.toLowerCase())
      });


      return completeCompany;
    });


    const selectCompany = (company) => {
      console.log(company)
      querySearch.value = company.name;
      companySelect.value = company
    }
    onMounted(() => {
      getCompanies();
    })

    return {
      selectCompany,
      filteredCompanies,
      isFormHairVisible,
      querySearch,
      companies,
      companySelect,
      date

    }
  }


}
</script>
