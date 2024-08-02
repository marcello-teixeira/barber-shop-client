<template>
  <q-layout view="hHh Lpr fFf">
    <q-header class="row">
      <q-toolbar class="col-4">
        <q-btn
          icon="menu"
          flat
          round
          @click="isLeftDrawerVisible = !isLeftDrawerVisible"
        />
      </q-toolbar>
      <div class="col-4 items-center column">
        <IconBarb/>
      </div>
      <div class="col-4 items-end column">
        <q-avatar
          icon="person"
        />
      </div>
    </q-header>

    <q-drawer v-model="isLeftDrawerVisible" show-if-above class="bg-grey">
        <q-list>
          <q-item>
            New haircut
          </q-item>
          <q-item>
            Agenda
          </q-item>
          <q-item>
            support
          </q-item>
        </q-list>
    </q-drawer>

    <router-view/>

    <q-footer>
        &copy;
    </q-footer>
  </q-layout>
</template>

<script>
import { ref } from 'vue'
import IconBarb from 'src/components/IconBarb.vue';

export default {
  name: 'LayoutName',

  setup () {
    return {
      isLeftDrawerVisible: ref(false)
    }
  },
  components: {
    IconBarb
  }
}
</script>
