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
        <div class="container" @click="showPopup = !showPopup">
          <q-avatar
            circle
            class="avatar cursor-pointer"
          >
            <img :src="urlProfilePicture">
          </q-avatar>
          <div class="popup-profile column justify-center" v-show="showPopup">
            <q-btn
              class="q-pa-md settings-border .popup-items"
              icon="settings"
              flat
              @click="settings('/view/settings')"
            />
            <q-btn
              class="q-pa-md logout-border .popup-items"
              icon="logout"
              flat
              @click="Logoff('/')"
            />
          </div>
        </div>
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
import {getProfilePicture} from '../httpclient.js';
import IconBarb from 'src/components/IconBarb.vue';

export default {
  name: 'LayoutName',

  setup () {
    const pathRole = ref('');
    const urlProfilePicture = ref('');
    const isLeftDrawerVisible = ref(false);
    const date = ref('');
    const showPopup = ref(false);

    const settings = (path) => {
      window.location.hash = path;
    }

    const getImageProfile = async () => {
      urlProfilePicture.value = await getProfilePicture();
    }

    const Logoff = (path) => {
      localStorage.removeItem('token');
      localStorage.removeItem('role');
      window.location.hash = path;
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
      showPopup,
      Logoff,
      settings
    }
  },
  components: {
    IconBarb
  },
  created() {
    const client_role = localStorage.getItem('role');

    if(client_role == 'customer' || client_role == 'company') {
      return;
    }

    window.location.hash = '/:catchFailLogin(.*)*'
  }
}
</script>

<style>

.container {
  position: relative;
}

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
  position: absolute;
  top: 3.7rem;
  left: -.5rem;
  background-color: #9E9E9E;
  width: 100%;
  z-index: 1;
  border-radius: 10px;
}

.popup-items {
  background-color: #9E9E9E;
}

.popup-items:hover {
  background-color: #c9c9c9;
}

.settings-border {
  border-radius: 10px 10px 0 0;
}

.logout-border {
  border-radius: 0 0 10px 10px;
}

</style>
