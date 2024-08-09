<template>
  <q-layout view="hHh Lpr fFf">
    <q-header class="row" elevated>
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
          circle
          img=""
        />
      </div>
    </q-header>

    <q-drawer v-model="isLeftDrawerVisible" show-if-above class="bg-grey row">
      <q-list class="col-12">
        <q-item
        :to="'customer'"
        clickable
        class="item-left-items">
            <q-icon
            name="home"
            size="lg"
            />
          <q-item-section>
            <q-item-label class="label-left-items">
              Home
            </q-item-label>
          </q-item-section>
        </q-item>
        <q-separator/>
        <q-item
        :to="'settings'"
        clickable
        class="item-left-items">
            <q-icon
            name="settings"
            size="lg"
            />
          <q-item-section>
            <q-item-label class="label-left-items">
              Settings
             </q-item-label>
          </q-item-section>
        </q-item>
        <q-separator/>
        <q-item
        clickable
        class="item-left-items">
            <q-icon
            name="calendar_month"
            size="lg"
            />
          <q-item-section>
            <q-item-label class="label-left-items">
              Calendar
            </q-item-label>
          </q-item-section>
        </q-item>
        <q-separator/>
        <q-item
        :to="'support'"
        clickable
        class="item-left-items">
          <q-icon
          name="support_agent"
          size="lg"
          />
            <q-item-section>
              <q-item-label class="label-left-items">
                Support
              </q-item-label>
            </q-item-section>
          </q-item>
          <q-separator/>
        </q-list>
        <div class="col-12 column justify-end q-pa-md">
          © {{ year }} Barbshop. All Rights Reserved
        </div>
    </q-drawer>

    <router-view/>
  </q-layout>
</template>

<script>
import { ref } from 'vue'
import IconBarb from 'src/components/IconBarb.vue';

export default {
  name: 'LayoutName',

  setup () {
    return {
      isLeftDrawerVisible: ref(false),
      year: new Date().getFullYear()
    }
  },
  components: {
    IconBarb
  }
}
</script>

<style>

.item-left-items {
  padding: 15px;
}

.label-left-items {
  margin-left: 30px;
  font-size: 20px;
}


</style>
