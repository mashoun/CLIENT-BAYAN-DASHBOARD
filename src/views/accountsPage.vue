<template>
    <section class="container my-5">
        <div class="row g-3 justify-content-center">
            <div class="col-12">
                <aside class="p-3 bg-light shadow-sm rounded">
                    <div class="d-flex gap-3 flex-column my-3">
                        <div class="input-group">
                            <input @keyup.enter="inspectAccount" v-model="userID" type="text" placeholder="UserID" class="form-control">
                            <button @click="inspectAccount" :disabled="spinner" title="Edit Profile" class=" input-group-text btn-sm">
                                <i v-if="!spinner" class="bi bi-search fs-6"></i>
                                <i v-else class="spinner-grow spinner-grow-sm"></i>
                            </button>
                        </div>
                        <div class="input-group">
                            <select class="form-select" v-model="userTab">
                                <option value="Profile">Profile</option>
                                <option value="Courses">Courses</option>
                            </select>
                            <button v-if="userTab == 'Profile'" @click="editMode = ! editMode" title="Edit Profile" :class="{'bg-primary text-light': editMode}" class="input-group-text btn-sm"><i class="bi bi-pencil-square fs-6"></i></button>
                            <button v-if="userTab == 'Profile'" :disabled="spinner  || utilities.hasNullEmptyValue(store.userAccount.profile.userID)"  :class="{'bg-primary text-light': !utilities.hasNullEmptyValue(store.userAccount.profile.userID) || !spinner}"  @click="updateProfile" title="Save Changes" class="input-group-text btn-sm"><i class="bi bi-cloud-arrow-up fs-6"></i></button>
                            
                            <button v-if="userTab == 'Courses'" data-bs-toggle="modal" data-bs-target="#userCourse" title="Add new course" class=" input-group-text btn-sm"><i class="bi bi-plus-lg fs-6"></i></button>
                            <!-- <button v-if="userTab == 'Courses'" :disabled="spinner || utilities.hasNullEmptyValue(userID)"  :class="{'bg-primary text-light': !utilities.hasNullEmptyValue(userID)}"  @click="saveNewCourse" title="Save Changes" class="input-group-text btn-sm"><i class="bi bi-cloud-arrow-up fs-6"></i></button> -->

                        </div>
                    </div>
                    <div v-if="userTab == 'Profile'" class="table-responsive">
                        <table class="table table-hover">
                            <thead>
                                <tr class="table-primary">
                                
                                    <th scope="col">KEY</th>
                                    <th scope="col">VALUE</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(value,key) in store.userAccount.profile" :key="key">
                                    <td v-if="key != 'index'" class="fw-bold text-uppercase">{{key}}</td>
                                    <td v-if="key != 'index'" :ref="key" class="font-monospace" :contenteditable="editMode" @keyup="trackEditMode(key)">{{value}}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div v-if="userTab == 'Courses'" class="table-responsive">
                        <table class="table table-hover">
                            <thead>
                                <tr class="table-success">
                                
                                    <th scope="col">DEL</th>
                                    <th scope="col">Semester</th>
                                    <th scope="col">Code</th>
                                    <th scope="col">Title</th>
                                    <th scope="col">Description</th>
                                    <th scope="col">link</th>
                                    <th scope="col">Instructor</th>
                                    <th scope="col">Marks</th>
                                </tr>
                            </thead>
                            <tbody>
                                
                                <tr v-for="c in store.userAccount.courses" :key="c"  class="font-monospace">
                                    <th scope="row" v-if="!utilities.hasNullEmptyValue(c.semester)" @click="removeUserCourse(c.code)"><i class="bi bi-trash text-danger"></i></th>
                                    <td>{{c.semester}}</td>
                                    <td>{{c.code}}</td>
                                    <td>{{c.title}}</td>
                                    <td>{{c.description}}</td>
                                    <td>{{c.link}}</td>
                                    <td>{{c.instructor}}</td>
                                    <td>{{c.mark}}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <!-- Modal -->
                    <div class="modal fade" id="userCourse" tabindex="-1" aria-labelledby="userCourseLabel" aria-hidden="true">
                        <div class="modal-dialog modal-lg modal-dialog-scrollable">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h1 class="modal-title fs-5" id="userCourseLabel">New user course</h1>
                                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div class="modal-body d-flex flex-column gap-2">

                                    <small class="text-primary ms-1">Select semester</small>
                                    <select :disabled="spinner" class="form-select" v-model="store.newCourse.semester">
                                        <option value="Semester 1">Semester 1</option>
                                        <option value="Semester 2">Semester 2</option>
                                        <option value="Semester 3">Semester 3</option>
                                        <option value="Semester 4">Semester 4</option>
                                        <option value="Semester 5">Semester 5</option>
                                        <option value="Semester 6">Semester 6</option>
                                    </select>

                                    <hr>
                                    <small class="text-primary ms-1">Add course info</small>
                                    <input type="text" class="form-control" placeholder="Course code" v-model="store.newCourse.code">
                                    <input type="text" class="form-control" placeholder="Course title" v-model="store.newCourse.title">
                                    <textarea class="form-control" placeholder="Course description" cols="30" rows="3" v-model="store.newCourse.description"></textarea>
                                    <input type="text" class="form-control" placeholder="Course link" v-model="store.newCourse.link">
                                    <input type="text" class="form-control" placeholder="Course instructor" v-model="store.newCourse.instructor">
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                    <button type="button" class="btn btn-primary" :disabled="spinner" @click="addUserCourse">Save changes</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                </aside>
            </div>
        </div>
    </section>
    

</template>
<script>

import { useStore } from "../stores/mainStore";
import utilities from '../utilities';
export default {
    setup() {
        const store = useStore();
        return { store };
    },
    data(){
        return{
            userID:"",
            userPassword:"",
            userTab:"Profile",
            spinner:false,
            editMode:false,
            utilities

        }
    },
    methods:{
        trackEditMode(key){
            if(key == 'userID'){
                alert('userID will not be changed')
            }else{

                this.store.userAccount.profile[key] = this.$refs[key][0].innerText
            }
        },
        inspectAccount(){
            this.spinner = true
            fetch(this.store.getApi() + '?&inspectAccount=1',{
                method:"POST",
                headers:{
                    "Content-Type":"text/plain"
                },
                body:JSON.stringify({
                    
                    adminID: this.store.adminID,
                    adminPassword: this.store.adminPassword,
                    userID:this.userID,
                })
            })
            .then(res => res.json())
            .then(res => {
                this.store.userAccount = res
                
                this.spinner = false
                // console.log(this.store.userAccount);
            })
            .catch(err => {

                this.spinner = false
                alert(err)
            })
        },
        updateProfile(){
            this.spinner = true
            this.editMode = false
            fetch(this.store.getApi() + '?&setUserProfile=1',{
                method:"POST",
                headers:{
                    "Content-Type":"text/plain"
                },
                body:JSON.stringify({
                    
                    adminID: this.store.adminID,
                    adminPassword: this.store.adminPassword,
                    userID:this.store.userAccount.profile.userID,
                    newProfile:this.store.userAccount.profile
                })
            })
            .then(res => {
                alert('Meshe l7al')
                this.spinner = false
                // console.log(this.store.userAccount);
            })
            .catch(err => {

                this.spinner = false
                alert(err)
            })

        },
        addUserCourse(){
            if(confirm('Are you sure?')){
                this.spinner = true
                this.store.newCourse.domain = this.store.userAccount.profile.domain
                console.log(this.store.newCourse.domain );
                fetch(this.store.getApi() + '?&addUserCourse=1',{
                    method:"POST",
                    headers:{
                        "Content-Type":"text/plain"
                    },
                    body:JSON.stringify({
                        
                        adminID: this.store.adminID,
                        adminPassword: this.store.adminPassword,
                        userID:this.store.userAccount.profile.userID,
                        newCourse:{
                            columns:['id','domain','semester','code','title','description','link','instructor'],
                            values:this.store.newCourse
                        }
                    })
                })
                .then(res => {
                    this.spinner = false
                    this.store.userAccount.courses.push(this.store.newCourse)
                    alert('Meshe l7al')
                })
            }
        },
        
        removeUserCourse(courseTitle){
            if(confirm('Are you sure?')){
                this.spinner = true
                fetch(this.store.getApi() + '?&removeUserCourse=1',{
                    method:"POST",
                    headers:{
                        "Content-Type":"text/plain"
                    },
                    body:JSON.stringify({
                        
                        adminID: this.store.adminID,
                        adminPassword: this.store.adminPassword,
                        
                        userID:this.store.userAccount.profile.userID,
                        courseTitle:courseTitle
                    })
                })
                .then(res => {
                    console.log(res);
                    this.spinner = false
                    this.store.userAccount.courses = this.store.userAccount.courses.filter(c => {
                        return c.code != courseTitle
                    })
                    alert('Meshe l7al')
                })
                .catch(err => {
                    alert(err)
                    this.spinner = false
                })
            }
        },
    }
}
</script>