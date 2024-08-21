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
      <div class="col-4 items-center justify-center column">
        <IconBarb
        :Path="`/view/${pathRole}`"
        />
      </div>
      <div class="col-4 items-end column">
        <q-avatar
          circle
          class="avatar cursor-pointer"
        >
          <img :src="urlProfilePicture">
          <q-popup-proxy class="popup-profile">
            <q-btn
              class="block q-pa-md"
              label="Settings"
              icon="settings"
              flat
              @click="inPath('/view/settings')"
            />
            <q-btn
              class="q-pa-md q-pr-lg"
              label="Logoff"
              icon="logout"
              flat
              @click="inPath('/')"
            />
          </q-popup-proxy>
        </q-avatar>
      </div>
    </q-header>

    <q-drawer v-model="isLeftDrawerVisible" show-if-above class="bg-grey row">
      <q-list class="col-12">
        <q-item
        :to="pathRole"
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
            <q-popup-proxy
              cover
            >
              <q-date
                v-model="date"
              >
                <q-btn
                  v-close-popup
                  label="Close"
                  color="primary"
                />
              </q-date>
            </q-popup-proxy>
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
import { onMounted, ref } from 'vue';
import IconBarb from 'src/components/IconBarb.vue';
import {getProfilePicture} from '../httpclient.js';
import api from '../httpclient.js';

export default {
  name: 'LayoutName',

  setup () {
    const pathRole = ref('');
    const urlProfilePicture = ref('');
    const infoCustomer = ref([]);
    const isLeftDrawerVisible = ref(false);
    const date = ref('');

    const inPath = (path) => {
      window.location.hash = path;
    }

    const getImageProfile = async () => {
      urlProfilePicture.value = await getProfilePicture();
    }

    const getInfoCustomer = () => {
      const clientId = localStorage.getItem('id');
      api.get(`customer/${clientId}`).then(resp => infoCustomer.value = resp.data);
    }

    onMounted(() => {
      pathRole.value = localStorage.getItem('role');
      getImageProfile();
    })

    return {
      year: new Date().getFullYear(),
      isLeftDrawerVisible,
      urlProfilePicture,
      date,
      pathRole,
      inPath
    }
  },
  components: {
    IconBarb
  }
}
</script>

<style>
.avatar {
  margin: 10px;
}

.avatar img {
  border: 2px solid black;
}

.item-left-items {
  padding: 15px;
}

.label-left-items {
  margin-left: 30px;
  font-size: 20px;
}

.popup-profile {
  width: 7.3dvw;
}


</style>
