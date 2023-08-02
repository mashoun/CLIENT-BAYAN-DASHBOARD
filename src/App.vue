<template>
  <login-page v-if="!store.isLogedIn"></login-page>
  <header v-else class="position-fixed top-0 start-0 z-3 w-100 p-3 bg-dark shadow-sm d-flex justify-content-between">
    <section>
      <h5 class="text-light">Bayan Admin Dashboard</h5>
    </section>
    <nav class="d-none d-lg-flex gap-2 align-items-center">
      <router-link to="/websitePage" class="btn btn-outline-light btn-sm">Website</router-link>
      <router-link to="/registrationPage" class="btn btn-outline-light btn-sm">Registration</router-link>
      <router-link to="/accountsPage" class="btn btn-outline-light btn-sm">Accounts</router-link>
      <router-link to="/coursesPage" class="btn btn-outline-light btn-sm">Courses</router-link>
      <!-- <div class="input-group">
        <select class="form-select form-select-sm" v-model="store.domain">
          <option value="bayanint">bayanint</option>
          <option value="ssplatform">ssplatform</option>
        </select>
        <span class="input-group-text"><i class="bi bi-globe fs-smaller"></i></span>
      </div> -->
    </nav>
    <i class="bi bi-three-dots-vertical text-warning fs-4 d-block d-lg-none" data-bs-toggle="dropdown"></i>
    <ul class="dropdown-menu">
      <li class="dropdown-item"><router-link to="/websitePage" class="w-100 btn btn-outline-dark btn-sm">Website</router-link></li>
      <li class="dropdown-item"><router-link to="/registrationPage" class="w-100 btn btn-outline-dark btn-sm">Registration</router-link></li>
      <li class="dropdown-item"><router-link to="/accountsPage" class="w-100 btn btn-outline-dark btn-sm">Accounts</router-link></li>
      <li class="dropdown-item"><router-link to="/coursesPage" class="w-100 btn btn-outline-dark btn-sm">Courses</router-link></li>
    </ul>
  </header>
  <main  v-if="store.isLogedIn" style="margin-top:100px;">
    <router-view></router-view>
  </main>
</template>
<script>


import utilities from './utilities.js'
import { useStore } from "./stores/mainStore";
import loginPage from './components/loginPage.vue'
export default {
  components:{loginPage},
  setup() {
    const store = useStore();
    return { store };
  },
  
  data(){
    return{
      utilities
    }
  },
}
</script>