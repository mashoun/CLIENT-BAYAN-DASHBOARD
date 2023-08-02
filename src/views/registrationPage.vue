<template>
  <section class="container my-5">

    <div class="row">
      <div class="col-12">
        <section class="p-3 bg-light rounded shadow-sm d-flex align-items-center justify-content-between flex-wrap gap-3">
          <h6>Recent Registrations</h6>
          <div class="input-group" style="width: 500px !important;">
            <input type="text" class="form-control form-control" v-model="searchValue" placeholder="Search by domain, name or major">
            <i class="bi bi-search input-group-text point" title="search"></i>
            
            <div class="input-group-text">
              <i v-if="!spinner" @click="getRecRegAccounts" class="bi bi-arrow-repeat point" title="refresh"></i>
              <i v-else class="spinner-grow spinner-grow-sm text-scondary"></i>
            </div>
          </div>

        </section>
      </div>
    </div>
    <div v-if="isRecRegAcc" class="row g-3 my-3" >
      <div class="col-12 col-lg-6"  v-for="rac in filteredAccounts" :key="rac">
        <registered-account :data="rac">
          <button class="btn btn-outline-secondary" data-bs-dismiss="modal" >Close</button>
          <button :disabled="spinner" type="button" class="btn btn-outline-danger" data-bs-toggle="dropdown" >Reject</button>
          <ul class="dropdown-menu point">
              <li class="dropdown-item" data-bs-dismiss="modal" @click="rejectAccount(rac.domain,rac.index,rac.email,'Account is under study',`<h1>Account is under study</h1><p>Hello ${rac.firstName} ${rac.lastName}, We have received your application, and it is currently under review. The approval process may take up to 48 hours.</p>`)">Account under study</li>
              <li class="dropdown-item" data-bs-dismiss="modal" @click="rejectAccount(rac.domain,rac.index,rac.email,'Account missing some info',`<h1>Account missing some info</h1><p>Hello ${rac.firstName} ${rac.lastName},</p><p>Thank you for submitting your application. Upon review, we have noticed that some information or documents are missing or incorrect. As a result, your account processing is currently on hold. Once you provide the necessary missing information, we will be able to proceed with the acceptance of your account.</p><p>Please kindly send the required documents and information via email to <a href='mailto:info@bayanint.com'>info@bayanint.com</a>. We appreciate your cooperation, and we will promptly process your application once we receive the complete and accurate details.</p><br><h6>Here's what is missing.</h6><br>${utilities.missingInfoToList()}`)">Account missing some documents</li>
              <li class="dropdown-item" data-bs-dismiss="modal" @click="rejectAccount(rac.domain,rac.index,rac.email,'Account rejection notice',`<h1>Account Rejection Notice</h1><p>Dear ${rac.firstName} ${rac.lastName},</p><p>We regret to inform you that your account application has been rejected. Upon careful review, we found that the provided information did not meet our criteria or compliance standards.</p><p>If you have any questions or would like to inquire about the specific reasons for the rejection, please feel free to contact our support team at <a href='mailto:info@bayanint.com'>info@bayanint.com</a>. We are more than willing to assist you in any way possible.</p>`)">Account rejected</li>
          </ul>
          <button :disabled="spinner" type="button" data-bs-dismiss="modal" class="btn btn-primary" @click="acceptRegAcc(rac)">
            <span v-if="!spinner">Accept</span>
            <span v-else class="spinner-grow spinner-grow-sm"></span>
          </button>
        </registered-account>
      </div>
    </div>
    <div v-else class="row my-5">
      <div class="col-12 text-center">No recent registrations</div>
    </div>
    
  </section>
  
</template>

<script>
import registeredAccount from "../components/registered-account.vue";

import { useStore } from "../stores/mainStore";
import utilities from '../utilities';
export default {
  components: { registeredAccount },
  setup() {
    const store = useStore();
    return { store };
  },
  data(){
    return{
      searchValue : "",
      spinner : false,
      utilities
    }
  },
  computed:{
    filteredAccounts(){
      return this.store.recRegAccounts.filter(acc => {
        return acc.domain.includes(this.searchValue)  || acc.major.toLowerCase().includes(this.searchValue) || acc.firstName.toLowerCase().includes(this.searchValue) || acc.lastName.toLowerCase().includes(this.searchValue)
      })
    },
    isRecRegAcc(){
      return this.store.recRegAccounts.length >= 1 ? true : false
    }
  },
  mounted() {
    this.getRecRegAccounts()
  },
  methods:{
    acceptRegAcc(form){
      if(confirm('Are you sure?')){
        this.spinner = true
        
        fetch(this.store.getApi() + "?&acceptRegAcc=1",{
          method:"POST",
          headers:{
            "Content-Type":"text/plain"
          },
          body:JSON.stringify({
            
            adminID: this.store.adminID,
            adminPassword: this.store.adminPassword,
            form:form
          })
        })
        .then(res => {
          this.spinner = false
          // utilities.closeAllModals()
          // this.store.recRegAccounts = this.store.recRegAccounts.filter(acc => {
          //   return acc.email != form.email
          // })
          this.getRecRegAccounts()
          alert('Meshe l7al')
        })
        .catch(err => {
          this.spinner = false
          // utilities.closeAllModals()
          alert(err)
        })
      }
    },
    getRecRegAccounts(){
      this.spinner = true
      fetch(this.store.getApi() + "?getRecRegAcc=1", {
      method: "POST",
      headers: {
        "Content-Type": "text/plain",
      },
      body: JSON.stringify({
        adminID: this.store.adminID,
        adminPassword: this.store.adminPassword,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        this.store.recRegAccounts = res
        this.spinner = false
      })
      .catch(err => {
          alert(err)
          this.spinner = false
      })
    },
    rejectAccount(domain,index,email,subject,message){
      console.log(message);
      if(confirm('Are you sure')){
        this.spinner = true
        fetch(this.store.getApi() +"?rejectAccount=1",{
          method:"POST",
          headers:{
            "Content-Type":"text/plain"
          },
          body:JSON.stringify({
            
            adminID: this.store.adminID,
            adminPassword: this.store.adminPassword,
            message:{
              to:email,
              subject:subject,
              htmlBody:message
            },
            domain,
            index
          })
        })
        .then(res => {
          this.spinner = false
          alert('Meshe l7al')
          this.getRecRegAccounts()
        })
        .catch(err => {
          this.spinner = false
          alert(err)
        })

      }
    }
  }
};
</script>