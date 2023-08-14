<template>
    <section class="w-100 h-100 position-fixed z-3 bg-light d-flex justify-content-center align-items-center">
        <div class="container">
            <div class="row justify-content-center">
                <div class="col-12 col-lg-6">
                    <aside class="bg-light shadow rounded d-flex flex-column align-items-center gap-3 p-3">
                        <img src="https://drive.google.com/uc?id=1xtGz7iKGyoXdj4ywuJOWAyn-lWVUCMjC" alt="logo" class="img-fluid rounded-circle" width="100">
                        <h5 class="text-primary fs-5">Bayan International Group</h5>
                        <!-- <blockquote class="fs-6 text-secondary">
                            <span class="">"{{randomQuote}}"</span>
                        </blockquote> -->
                        <input v-model="store.adminID" type="text" placeholder="ADMIN ID" class="form-control">
                        <input @keyup.enter="login" v-model="store.adminPassword" type="password" placeholder="ADMIN PASSWORD" class="form-control">
                        <button @click="login" class="w-100 btn btn-primary">
                            <span v-if="!spinner">Login</span>
                            <span v-else class="spinner-grow spinner-grow-sm"></span>
                        </button>
                        <small class="fs-x-small">Developed by <a href="https://libancode.com">Libancode</a> - version 1.2.3</small>
                    </aside>
                </div>
            </div>
        </div>
    </section>
</template>
<script>

import utilities from '../utilities.js'

import { useStore } from "../stores/mainStore";
export default {
    setup() {
        const store = useStore();
        return { store };
    },
    data(){
        return{
            utilities,
            spinner:false
        }
    },
    methods:{
        login(){
            this.spinner = true
            fetch(this.store.getApi(),{
                method:"POST",
                headers:{
                    "Content-Type":"text/plain"
                },
                body:JSON.stringify({
                    adminID: this.store.adminID,
                    adminPassword: this.store.adminPassword,
                })
            })
            .then(res => res.json())
            .then(res => {
                if(res == '200'){
                    this.store.isLogedIn = true
                    this.spinner = false
                }else{
                    alert('Wrong username or password')
                    this.spinner = false
                }
            })
            .catch(err => {
                alert("Network error")
                this.spinner = false
            })

        }
    }

}
</script>
