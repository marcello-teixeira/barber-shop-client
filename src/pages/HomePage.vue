<template>
  <q-page-container>
    <q-page class="row">
      <div class="col-12">
        <div class="title-page" v-show="titlePageShow">
          <h1>BARBSHOP</h1>
          <p id="first-phase">
            The best page to manage your barbershop,
          </p>
          <p id="second-phase">
            or find your new style.
          </p>
        </div>
        <q-carousel
          animated
          v-model="slide"
          arrows
          navigation
          infinite
          class="carousel"
        >
          <q-carousel-slide :name="1" img-src="/img/carousel-one.jpg" />
          <q-carousel-slide :name="2" img-src="/img/carousel-two.jpg" />
          <q-carousel-slide :name="3" img-src="/img/carousel-three.jpg" />
          <q-carousel-slide :name="4" img-src="/img/carousel-four.jpg" />
        </q-carousel>
      </div>

      <div class="col-12" style="margin-bottom: 5%;">
        <h2 class="column items-center">
          Only For Companies
        </h2>
        <div class="container-center">
          <q-list class="row" style="position: relative;">
            <div>
            </div>
            <div class="plan-features">
              <p class="feature-item">Company Account</p>
              <p class="feature-item">Preference Support</p>
              <p class="feature-item">Larger Disk Space</p>
            </div>
            <q-item
            :style="{outline: `3px solid ${plan.features.bg_color}`}"
              v-for="(plan, index) in plans"
              :key="index"
              class="container-prices column"
            >
              <q-item-section :style="{backgroundColor: plan.features.bg_color}" class="plan-name">
                <q-item-label>{{ plan.name }}</q-item-label>
              </q-item-section>
              <q-item-section class="plan-price">
                <q-item-label
                :style="{color: plan.features.bg_color}">
                  {{ "$" + plan.price[0] + plan.price[1] }}
                  <q-item-label caption class="price-caption">
                    {{ plan.price[2] + plan.price[3] + plan.price[4] }}
                  </q-item-label>
                </q-item-label>
              </q-item-section>
              <q-item-section
              v-for="(feature, key) in plan.features"
              :key="key"

              >
              <q-item-label v-if="key !== 'bg_color'" class="plan-feature">
                <q-icon
                :name="feature ? 'check_circle' : 'cancel'"
                :color="feature ? 'green' : 'red'"
                size="lg"
                />
                <q-separator style="background-color:#000 ;"/>
                </q-item-label>
              </q-item-section>
              <q-item-section class="row items-center">
                <q-btn
                  label="BUY NOW"
                  color="green"
                  size="lg"
                  style="width: 130px;"
                />
              </q-item-section>
            </q-item>
          </q-list>
        </div>
      </div>
      <div class="col-12" style="box-shadow: 0px -5px 5px #00000068;">
        <div class="row">
          <q-img
          class="col-6"
          src="/img/banner-home.jpg"
          alt="Banner Barber Info"/>
          <div class="col-6 text-banner-home">
              <h2>
                About us
              </h2>
              <p>
                We work to provide best user experience in a barbershop  businness. You'll have a complete system for managing and centralizing customers.
              </p>
              <p>
                You a customer? Can now get find new barbers close you. Don't waste time, create an account <a href="#/login">now</a>.
              </p>
              <a href="#/login"><iconBarb /></a>
          </div>
        </div>
      </div>
    </q-page>

  </q-page-container>
</template>

<script>
import { onMounted, ref } from 'vue'
import IconBarb from 'src/components/IconBarb.vue'

const plans = [
  {
    name: 'START',
    price: '15,99',
    features: {
      companyAccount: true,
      preferenceSupport: false,
      largeDiskSpace: false,
      bg_color: '#65267e',
    },
  },
  {
    name: 'MEDIUM',
    price: '17,99',
    features: {
      companyAccount: true,
      preferenceSupport: true,
      largeDiskSpace: false,
      bg_color: 'grey',
    },
  },
  {
    name: 'PRO',
    price: '18,99',
    features: {
      companyAccount: true,
      preferenceSupport: true,
      largeDiskSpace: true,
      bg_color: 'orange',
    },
  },
]

export default {
  components: { IconBarb },
  name: 'HomePage',
  setup() {
    const slide = ref(1)
    const titlePageShow = ref(false)

    onMounted(() => {
      titlePageShow.value = true
    })
    return {
      slide,
      titlePageShow,
      plans,
    }
  },
}
</script>

<style scoped>



.text-banner-home {
  background: #2f3030;
  font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
  text-align: center;
}

.text-banner-home p{
  width: 500px;
  font-size: 30px;
  padding: 2%;
  color: #ffffff8a;
  margin: auto;
}

.text-banner-home a{
  text-decoration: none;
  color: #10a596;
}

.text-banner-home a:visited{
  color: #10a596;
}

.container-center {
  position: relative;
  left: 50%;
  transform: translateX(-30%);
}

.carousel {
  height: 94vh;
  position: relative;
  margin-bottom: 3%;
}

.plan-features {
  position: relative;
  align-self: flex-end;
  top: -108px;
  left: 2%;
}

.feature-item {
  padding: 5%;
  margin-bottom: 15.5%;
  background-color: #2A645E;
  color: #fff;
  width: 200px;
  font-size: 18px;
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
}

.container-prices {
  display: block;
  border-radius: 15px;
  width: 200px;
  height: 52dvh;
  margin: 15px;
  flex-basis: 200px;
  transition: 0.5s;
  font-size: 25px;
  background-color: #fff;
  padding: 0;
  overflow: hidden;
  font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
}

.container-prices:hover {
  flex-shrink: 2;
  flex-basis: 220px;
}

.plan-name,
.plan-price {
  position: relative;
  text-align: center;
  padding: 15% 0;
  margin: 0;
}

.plan-name {
  padding: 10%;
}

.plan-price {
  font-size: 45px;
}

.price-caption {
  position: absolute;
  top: 30%;
  left: 70%;
}

.plan-feature {
  text-align: center;
  padding-bottom: 19%;
  margin: 0 15px;
}

.title-page {
  position: absolute;
  color: #fff;
  z-index: 1;
  font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
  top: 5%;
  left: 13%;
  background: #000000b9;
  padding: 15px;
  overflow: hidden;
}

.title-page h1 {
  position: relative;
  margin-top: 0;
  color: transparent;
  animation: fadeIn 0.5s 0.8s forwards;
}

.title-page h1::before {
  content: '';
  position: absolute;
  width: 465px;
  height: 6px;
  background-color: transparent;
  top: 90%;
  left: 0;
  animation: fadeDecoration .5s 1.3s ease forwards;
}

.title-page h1::after {
  content: '';
  position: absolute;
  width: 500px;
  height: 100px;
  top: 5%;
  left: 0;
  background-color: transparent;
  animation: showText 1.5s cubic-bezier(0.85, 0, 0.15, 1) forwards;
}

.title-page p {
  width: 20vw;
  font-size: 23px;
  left: 15%;
}

#first-phase {
  color: transparent;
  animation: fadeIn 0.5s 1.3s forwards;
  width: 450px;
  text-decoration: underline;
  text-decoration-color: transparent;
  transition: all .3s ease;
}

#first-phase::after {
  content: '';
  position: absolute;
  width: 500px;
  height: 35px;
  top: 60%;
  left: 0;
  background-color: transparent;
  animation: showText 1.5s 0.5s cubic-bezier(0.85, 0, 0.15, 1) forwards;
}

#second-phase {
  color: transparent;
  animation: fadeIn 0.5s 1.7s forwards;
  text-decoration: underline;
  text-decoration-color: transparent;
  transition: all .3s ease;
}

#second-phase::after {
  content: '';
  position: absolute;
  width: 500px;
  height: 35px;
  top: 77%;
  left: 0;
  background-color: transparent;
  animation: showText 1.5s 0.9s cubic-bezier(0.85, 0, 0.15, 1) forwards;
}

.title-page:hover #first-phase, .title-page:hover #second-phase {
  text-decoration-color: red;
}

@keyframes fadeDecoration {
  to {
    background-color: red;
  }
}

@keyframes showText {
  from {
    transform: translateX(-100%);
    background-color: #d1d1d1;
  }
  to {
    transform: translateX(150%);
    background-color: #000;
  }
}

@keyframes fadeIn {
  to {
    color: #fff;
  }
}
</style>
