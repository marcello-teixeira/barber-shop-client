<template>
  <q-layout view="hHh Lpr fFf">
  <q-header class="row layout-color" elevated>
        <q-list class="row" >
          <q-item v-ripple clickable :to="'home'" :active-class="'color-item'">
            <q-item-section class="column items-center">
              <q-icon
                name="home"
                size="sm"
              />
              Home
            </q-item-section>
          </q-item>
          <q-item v-ripple clickable :to="'login'" :active-class="'color-item'" >
            <q-item-section class="column items-center">
              <q-icon
                name="login"
                size="sm"
              />
              Login
            </q-item-section>
          </q-item>
          <q-item v-ripple clickable :active-class="'color-item'">
            <q-item-section class="column items-center">
              <q-icon
                name="support_agent"
                size="sm"
              />
              Support
            </q-item-section>
          </q-item>
        </q-list>
    <div class="col-9 column items-center" >
          <IconBarb />
    </div>
  </q-header>

    <router-view/>

  </q-layout>
</template>

<script>
import IconBarb from '../components/IconBarb.vue'

export default {
  name: 'MainLayout',
  components: {
    IconBarb
  }
}
</script>

<style scoped>

.layout-color {
  background-color: #2A645E;
}

.color-item {
  color: #21BA45;
}



</style>
