<template>
  <section class="container my-5 d-flex flex-column gap-3">
    <div class="row justify-content-between g-3">
      <div class="col-12 col-lg-4">
        <div class="input-group">
          <select class="form-select" v-model="tab" :disabled="spinner">
            <option value="Contact">Contact</option>
            <option value="Links">Links</option>
            <option value="Slides">Slides</option>
            <option value="Majors">Majors</option>
            <option value="Partners">Partners</option>
            <option value="FAQ">FAQ</option>
          </select>
          <span class="input-group-text">
            <span v-if="spinner" class="spinner-grow spinner-grow-sm"></span>
            <i v-else @click="refresh" class="bi bi-arrow-clockwise"></i>
          </span>
        </div>
      </div>
    </div>

    <div class="row justify-content-between g-3">

      <div v-show="tab == 'Contact'" class="col-12">
        <section class="p-3 bg-light rounded shadow-sm">
          <div class="table-responsive">
            <table class="table">
              <thead>
                <tr>
                  <th scope="col">KEY</th>
                  <th scope="col">VALUE</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(value,key) in store.website.contact" :key="key">
                  <td>{{key}}</td>
                  <td :ref="key" contenteditable @keyup="trackEdit(key)" >{{value}}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <button class="btn btn-sm btn-primary mt-3" @click="setContact" :disabled="spinner">Save changes</button>
        </section>
      </div>

      <div v-show="tab == 'Links'"  class="col-12">
        <section class="p-3 bg-light rounded shadow-sm">
          <div class="table-responsive">
            <table class="table">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">LINK TEXT</th>
                  <th scope="col">LINK URL</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="link in store.website.links" :key="link">
                  <th scope="row"><i @click="removeWebsiteRecord('LINKS',link.id)"  class="bi bi-trash text-danger"></i></th>
                  <td>{{ link.text }}</td>
                  <td>{{ link.url }}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <button :disabled="spinner" class="btn btn-sm btn-primary mt-3" @click="addWebsiteRecord('LINKS')">Add link</button>
        </section>
      </div>

      
      <div v-show="tab == 'Slides'"  class="col-12">
        <section class="p-3 bg-light rounded shadow-sm">
          <div class="table-responsive">
            <table class="table">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Slide thumbnail</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="slide in store.website.slides" :key="slide">
                  <th scope="row"><i @click="removeWebsiteRecord('SLIDES',slide.id)"  class="bi bi-trash text-danger"></i></th>
                  <td>
                    <img :src="slide.thumbnail" :alt="slide.index" width="50" class="img-fluid rounded">
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <button class="btn btn-sm btn-primary mt-3" :disabled="spinner" @click="addWebsiteRecord('SLIDES')">Add slide image</button>
        </section>
      </div>

            
      <div v-show="tab == 'Partners'"  class="col-12">
        <section class="p-3 bg-light rounded shadow-sm">
          <div class="table-responsive">
            <table class="table">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Partner thumbnail</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="partner in store.website.partners" :key="partner">
                  <th scope="row"><i @click="removeWebsiteRecord('PARTNERS',partner.id)"  class="bi bi-trash text-danger"></i></th>
                  <td>
                    <img :src="partner.thumbnail" :alt="partner.index" width="50" class="img-fluid rounded">
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <button class="btn btn-sm btn-primary mt-3" :disabled="spinner" @click="addWebsiteRecord('PARTNERS')">Add partner image</button>
        </section>
      </div>


      <div v-show="tab == 'FAQ'"  class="col-12">
        <section class="p-3 bg-light rounded shadow-sm">
          <div class="table-responsive">
            <table class="table">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">QUESTION</th>
                  <th scope="col">ANSWER</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="faq in store.website.faq" :key="faq">
                  <th scope="row"><i @click="removeWebsiteRecord('FAQ',faq.id)"  class="bi bi-trash text-danger"></i></th>
                  <td>{{ faq.question }}</td>
                  <td>{{ faq.answer }}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <button class="btn btn-sm btn-primary mt-3" :disabled="spinner" @click="addWebsiteRecord('FAQ')">Add faq</button>
        </section>
      </div>


    <div v-show="tab == 'Majors'"  class="col-12">
        <section class="p-3 bg-light rounded shadow-sm">
          <div class="table-responsive">
            <table class="table">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">THUMBNAIL</th>
                  <th scope="col">TITLE</th>
                  <th scope="col">DESCRIPTION</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="major in store.website.majors" :key="major">
                  <th scope="row"><i @click="removeWebsiteRecord('MAJORS',major.id)" class="bi bi-trash text-danger"></i></th>
                  <td>
                    <img :src="major.thumbnail" :alt="major.index" width="50" class="img-fluid rounded">
                  </td>
                  <td>{{ major.title }}</td>
                  <td>{{ major.description }}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <button class="btn btn-sm btn-primary mt-3" @click="addWebsiteRecord('MAJORS')" :disabled="spinner" >Add new major</button>
        </section>
    </div>

    <!-- <div v-if="spinner" class="col-12 text-center">
      <div class="spinner-grow spinner-grow-sm"></div>
    </div> -->

    </div>
  </section>
</template>
<script>
import { useStore } from "../stores/mainStore";
import utilities from "../utilities";
export default {
  setup() {
    const store = useStore();
    return { store };
  },
  data() {
    return {
      utilities,
      spinner: false,
      tab:'Contact'
    };
  },
  methods:{
    trackEdit(key){
      this.store.website.contact[key] = this.$refs[key][0].innerText
    },

    setContact(){
      if(confirm('Are you sure?')){
        this.spinner = true
        fetch(this.store.getApi() + "?setWebsiteContact=1",{
          method:"POST",
          headers:{
            "Content-Type":"text/plain"
          },
          body:JSON.stringify({
            
            adminID: this.store.adminID,
            adminPassword: this.store.adminPassword,
            contact:this.store.website.contact
          })
        }).then(res => {
          this.spinner = false
          alert('Meshe l7al')
        }).catch(err => {
          alert(err)
        })

        this.refresh()
      }
    },

    async addWebsiteRecord(sheetName){

      if(sheetName == 'LINKS'){
        if(confirm('Are you sure?')){
          var text = prompt('Enter Link Text')
          var url = prompt('Enter Link URL')

          if(text && url){
            this.spinner = true
            fetch(this.store.getApi() + "?addWebsiteRecord=1",{
              method:"POST",
              headers:{
                "COntent-Type":"text/plain"
              },
              body:JSON.stringify({
                
                adminID: this.store.adminID,
                adminPassword: this.store.adminPassword,
                sheetName,
                record:{
                  columns:['id','text','url'],
                  values:{
                    text,
                    url
                  }
                  
                }
              })
            })
            .then(res => {
              this.spinner = false
              alert('Meshe l7al')
            })
            .catch(err => {
              this.spinner = false
              alert('Meshe l7al')
            })
          
          }
        }
      }

      if(sheetName == 'SLIDES'){
        if(confirm('Are you sure?')){
          // get the image then host then save
          this.spinner = true
          var files = await utilities.openFiles()
          if(files){
            // some image was selected
            var files64 = [];// turn to b64
            for(let i = 0 ; i < files.length ; i++){
                files64.push({
                    alt:`Bayan-Slide-${utilities.getCurrentDate()}`,
                    // src64: await utilities.file64(files[i])
                    src64: await utilities.optimizeImageQuality(await utilities.file64(files[i]),0.7)
                })
            }
           

            // save to drive 
            var res = await fetch(this.store.getApi() + "?saveImages=1",{
              method:"POST",
              headers:{
                "Content-Type":"text/plain"
              },
              body:JSON.stringify({
                
                adminID: this.store.adminID,
                adminPassword: this.store.adminPassword,
                folderID:"1FTt-5dkI4JY56pTS9MrwO36OZ1pJ7_N_",
                images:files64
              })
            })
            res = await res.json()
            console.log(res);
            
            

            // save to database

            fetch(this.store.getApi() + "?addWebsiteRecord=1",{
              method:"POST",
              headers:{
                "COntent-Type":"text/plain"
              },
              body:JSON.stringify({
                
                adminID: this.store.adminID,
                adminPassword: this.store.adminPassword,
                sheetName,
                record:{
                  columns:['id','thumbnail'],
                  values:{
                    thumbnail:res[0].src,
                  }
                  
                }
              })
            })
            .then(res => {
              this.spinner = false
              alert('Meshe l7al')
            })
            .catch(err => {
              this.spinner = false
              alert('Meshe l7al')
            })

            // refresh
            this.refresh()

          }


        }
      }

      
      if(sheetName == 'MAJORS'){
        if(confirm('Are you sure?')){
          // get the image then host then save
          
          var files = await utilities.openFiles()
          var title = prompt('Enter title')
          var description = prompt('Enter description')

          if(files && title && description){
            
            this.spinner = true
            // some image was selected
            var files64 = [];// turn to b64
            for(let i = 0 ; i < files.length ; i++){
                files64.push({
                    alt:`Bayan-Major-Image-${utilities.getCurrentDate()}`,
                    // src64: await utilities.file64(files[i])
                    src64: await utilities.optimizeImageQuality(await utilities.file64(files[i]),0.7)
                })
            }
          

            // save to drive 
            var res = await fetch(this.store.getApi() + "?saveImages=1",{
              method:"POST",
              headers:{
                "Content-Type":"text/plain"
              },
              body:JSON.stringify({
                
                adminID: this.store.adminID,
                adminPassword: this.store.adminPassword,
                folderID:"1FTt-5dkI4JY56pTS9MrwO36OZ1pJ7_N_",
                images:files64
              })
            })
            res = await res.json()
            // console.log(res);
            
            

            // save to database

            fetch(this.store.getApi() + "?addWebsiteRecord=1",{
              method:"POST",
              headers:{
                "COntent-Type":"text/plain"
              },
              body:JSON.stringify({
                
                adminID: this.store.adminID,
                adminPassword: this.store.adminPassword,
                sheetName,
                record:{
                  columns:['id','thumbnail','title','description'],
                  values:{
                    thumbnail:res[0].src,
                    title,
                    description
                  }
                  
                }
              })
            })
            .then(res => {
              this.spinner = false
              alert('Meshe l7al')
            })
            .catch(err => {
              this.spinner = false
              alert('Meshe l7al')
            })

            // refresh
            this.refresh()

          }
          


        }
      }

      
      if(sheetName == 'PARTNERS'){
        if(confirm('Are you sure?')){
          // get the image then host then save
          this.spinner = true
          var files = await utilities.openFiles()
          if(files){
            // some image was selected
            var files64 = [];// turn to b64
            for(let i = 0 ; i < files.length ; i++){
                files64.push({
                    alt:`Bayan-Partner-${utilities.getCurrentDate()}`,
                    // src64: await utilities.file64(files[i])
                    src64: await utilities.optimizeImageQuality(await utilities.file64(files[i]),0.7)
                })
            }
           

            // save to drive 
            var res = await fetch(this.store.getApi() + "?saveImages=1",{
              method:"POST",
              headers:{
                "Content-Type":"text/plain"
              },
              body:JSON.stringify({
                
                adminID: this.store.adminID,
                adminPassword: this.store.adminPassword,
                folderID:"1FTt-5dkI4JY56pTS9MrwO36OZ1pJ7_N_",
                images:files64
              })
            })
            res = await res.json()
            console.log(res);
            
            

            // save to database

            fetch(this.store.getApi() + "?addWebsiteRecord=1",{
              method:"POST",
              headers:{
                "COntent-Type":"text/plain"
              },
              body:JSON.stringify({
                
                adminID: this.store.adminID,
                adminPassword: this.store.adminPassword,
                sheetName,
                record:{
                  columns:['id','thumbnail'],
                  values:{
                    thumbnail:res[0].src,
                  }
                  
                }
              })
            })
            .then(res => {
              this.spinner = false
              alert('Meshe l7al')
            })
            .catch(err => {
              this.spinner = false
              alert('Meshe l7al')
            })

            // refresh
            this.refresh()

          }


        }
      }

      
      if(sheetName == 'FAQ'){
        if(confirm('Are you sure?')){
          var question = prompt('Enter Question')
          var answer = prompt('Enter Answer')

          if(question && answer){
            this.spinner = true
            fetch(this.store.getApi() + "?addWebsiteRecord=1",{
              method:"POST",
              headers:{
                "COntent-Type":"text/plain"
              },
              body:JSON.stringify({
                
                adminID: this.store.adminID,
                adminPassword: this.store.adminPassword,
                sheetName,
                record:{
                  columns:['id','question','answer'],
                  values:{
                    question,
                    answer
                  }
                  
                }
              })
            })
            .then(res => {
              this.spinner = false
              alert('Meshe l7al')
            })
            .catch(err => {
              this.spinner = false
              alert('Meshe l7al')
            })

            this.refresh()
          
          }
        }
      }

    },

    refresh(){
      this.spinner = true
      fetch(this.store.getApi() + "?getProfile=1").then(res => res.json()).then(res => {
        console.log(res);
        this.store.website = res
        this.spinner = false
      })
      .catch(err => {
        alert('Weak network')
        this.spinner = false
      })
    },

    removeWebsiteRecord(sheetName,id){
      if(confirm('Are you sure ?')){
        this.spinner = true
        fetch(this.store.getApi() + "?removeWebsiteRecord=1",{
          method:"POST",
          headers:{
            "Content-Type":"text/plain"
          },
          body:JSON.stringify({
            
            adminID: this.store.adminID,
            adminPassword: this.store.adminPassword,
            sheetName,
            id
          })
        })
        .then(res => {
          this.spinner = false
          
          this.refresh()
          alert('Meshe l7al')
        })
        .catch(err => {
          
          this.spinner = false
          alert(err)
        })
        this.refresh()
      }

    }
  },
  mounted(){
    this.refresh()
  }
};
</script>