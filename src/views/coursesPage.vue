<template>
    <section class="container my-5 d-flex flex-column gap-3">
        <div class="row justify-content-between g-3">
            <div class="col-12 col-lg-4">
                <select :disabled="spinner" class="form-select" id="majorName" @change="getCoursesByMajor">
                    <option :value="m" v-for="m in store.majors" :key="m">{{m}}</option>
                </select>
            </div>
            <div class="col-12 col-lg-2">
                <button class="w-100 btn btn-primary" :disabled="spinner" data-bs-toggle="modal" data-bs-target="#newCourseModal">Add new course</button>
            </div>
        </div>
        <div class="row">
            <div  v-if="!spinner" class="col-12">
                <section class="p-3 bg-light shadow-sm rounded">
                    <div class="table-responsive">
                        <table class="table table-hover">
                            <thead>
                                <tr class="">
                                    <th scope="col" class="text-secondary">- DEL</th>
                                    <th scope="col" class="text-secondary">+ MARK</th>
                                    <th scope="col">Domain</th>
                                    <th scope="col">Sem</th>
                                    <th scope="col">Code</th>
                                    <th scope="col">Title</th>
                                    <!-- <th scope="col">Description</th> -->
                                    <th scope="col">Link</th>
                                    <!-- <th scope="col">Instructor</th> -->
                                </tr>
                            </thead>
                            <tbody class="table-group-divider">
                                <tr v-for="c in store.coursesByMajor" :key="c">
                                    <th><i class="bi bi-trash text-danger" @click="removeCourse(c.id)"></i></th>
                                    <th><i class="bi bi-file-earmark-plus text-success" @click="addMarks(c.id)"></i></th>
                                    <td>{{c.domain}}</td>
                                    <td>{{c.semester}}</td>
                                    <td>{{c.code}}</td>
                                    <td>{{c.title}}</td>
                                    <!-- <td>{{c.description}}</td> -->
                                    <td>{{c.link}}</td>
                                    <!-- <td>{{c.instructor}}</td> -->
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </section>
            </div>
            <div v-else class="d-flex justify-content-center my-5 text-secondary"><span class="spinner-grow spinner-grow-sm"></span></div>
        </div>
    </section>
    <!-- Modal -->
    <div class="modal fade" id="newCourseModal" tabindex="-1" aria-labelledby="newCourseModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
            <div class="modal-header">
                <h1 class="modal-title fs-5" id="newCourseModalLabel">Add new course</h1>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body d-flex flex-column gap-2">
                <small class="text-primary ms-1">Select major</small>
                <select class="form-select required" v-model="selectMajor">
                    <option :value="m" v-for="m in store.majors" :key="m">{{m}}</option>
                </select>

                <small class="text-primary ms-1">Select semester</small>
                <select :disabled="spinner" class="form-select required" v-model="store.newCourse.semester">
                    <option value="Semester 1">Semester 1</option>
                    <option value="Semester 2">Semester 2</option>
                    <option value="Semester 3">Semester 3</option>
                    <option value="Semester 4">Semester 4</option>
                    <option value="Semester 5">Semester 5</option>
                    <option value="Semester 6">Semester 6</option>
                </select>

                <small class="text-primary ms-1">Select domain</small>
                <select :disabled="spinner" class="form-select required" v-model="store.newCourse.domain">
                    <option value="bayanint">bayanint</option>
                    <option value="ssplatform">ssplatform</option>
                </select>

                <hr>
                <small class="text-primary ms-1">Add course info</small>
                <input type="text" class="form-control required" placeholder="Course code" v-model="store.newCourse.code">
                <input type="text" class="form-control required" placeholder="Course title" v-model="store.newCourse.title">
                <!-- <textarea class="form-control required" placeholder="Course description" cols="30" rows="3" v-model="store.newCourse.description"></textarea> -->
                <input type="text" class="form-control required" placeholder="Course link" v-model="store.newCourse.link">
                <!-- <input type="text" class="form-control required" placeholder="Course instructor" v-model="store.newCourse.instructor"> -->
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button type="button" class="btn btn-primary" @click="addNewCourse" :disabled="spinner || isEmpty">Add</button>
            </div>
            </div>
        </div>
    </div>
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
            utilities,
            // majors:[
            //     "Bachelor of Business Administration (BBA)",
            //     "Bachelor of Business Administration in Accounting (BBA-Acc)",
            //     "Master of Business Administration (MBA)",
            //     "Master of Business Administration in Accounting (MBA-Acc)",
            //     "Master of Business Administration in Management Information Systems (MIS)",
            //     "Master of Business Administration in Business Analytics (MBA-BAn)",
            //     "Master of Business Administration in Agribusiness",
            //     "Master of Business Administration in Hospitality, Travel, & Tourism",
            //     "Master of Business Administration in Business Analytics",
            //     "Master of Business Administration in Healthcare Administration",
            //     "Master of Business Administration in Educational Administration",
            //     "Master of Business Administration in Marketing Management",
            //     "Master of Business Administration in Financial Management",
            //     "Master of Business Administration in Human Resources Management",
            //     "Master of Business Administration in Logistics Management",
            //     "Master of Business Administration in Luxury Brand Management",
            //     "Doctor of Business Administration (DBA)",
            //     "Doctor of Business Administration in Management Information Systems (DBA-MIS)",
            //     "Doctor of Business Administration in Business Analytics (DBA-BAn)",
            //     "Doctor of Business Administration in Agribusiness",
            //     "Doctor of Business Administration in Hospitality, Travel, & Tourism",
            //     "Doctor of Business Administration in Business Analytics",
            //     "Doctor of Business Administration in Healthcare Administration",
            //     "Doctor of Business Administration in Educational Administration",
            //     "Doctor of Business Administration in Marketing Management",
            //     "Doctor of Business Administration in Financial Management",
            //     "Doctor of Business Administration in Human Resources Management",
            //     "Doctor of Business Administration in Logistics Management",
            //     "Doctor of Business Administration in Luxury Brand Management",
            //     "Doctor of Management (DM)"
            // ],
            spinner:false,
            selectMajor:'',

        }
    },
    computed:{
        isEmpty(){
            return utilities.hasNullEmptyValue(this.selectMajor) || utilities.hasNullEmptyValue(this.store.newCourse.code) || utilities.hasNullEmptyValue(this.store.newCourse.domain) || utilities.hasNullEmptyValue(this.store.newCourse.link) || utilities.hasNullEmptyValue(this.store.newCourse.title) || utilities.hasNullEmptyValue(this.store.newCourse.semester)
        }
    },
    methods:{
        getCoursesByMajor(){
            this.spinner = true
            fetch(this.store.getApi() + '?&getCoursesByMajor=1',{
                method:"POST",
                headers:{
                    "Content-Type":"text/plain"
                },
                body:JSON.stringify({
                    
                    adminID: this.store.adminID,
                    adminPassword: this.store.adminPassword,
                    majorName:document.getElementById('majorName').value
                })
            })
            .then(res => res.json())
            .then(res => {
                // console.log(res);
                this.store.coursesByMajor = res
                this.spinner = false
            })
            .catch(err => {
                alert(err)
            })
            // console.log(document.getElementById('majorName').value);
        },
        addNewCourse(){
            if(confirm('Are you sure?')){
                
                this.spinner = true
                fetch(this.store.getApi() + '?&addCourseToDatabase=1',{
                    method:"POST",
                    headers:{
                        "Content-Type":"text/plain"
                    },
                    body:JSON.stringify({
                        
                        adminID: this.store.adminID,
                        adminPassword: this.store.adminPassword,
                        major:this.selectMajor,
                        course:{
                            columns:['id','domain','semester','code','title','description','link','instructor'],
                            values:this.store.newCourse
                        }
                    })
                })
                .then(res => {
                    // console.log(res);
                    alert('Course added successfuly')
                    this.spinner = false
                    this.getCoursesByMajor()
                })
                .catch(err => {
                    alert(err)
                    this.spinner = false
                })
                // console.log(this.store.newCourse);
            }
        },
        removeCourse(courseID){
            if(confirm('Are you sure?')){
                this.spinner = true
                fetch(this.store.getApi() + '?&removeCourse=1',{
                    method:"POST",
                    headers:{
                        "Content-Type":"text/plain"
                    },
                    body:JSON.stringify({
                        
                        adminID: this.store.adminID,
                        adminPassword: this.store.adminPassword,
                        majorName:document.getElementById('majorName').value,
                        courseID
                    })
                })
                .then(res => {
                    console.log(res);
                    this.spinner = false
                    
                    this.getCoursesByMajor()
                })
                .catch(err => {
                    console.log(err);
                    this.spinner = false
                })
            }
        },
        addMarks(code){
            if(confirm('Are you sure you want to add marks to '+code)){
                var sheetURL =  prompt('Enter sheet of marks url').trim()
                if(sheetURL){                
                    this.spinner = true
                    fetch(this.store.getApi() + "?addMarks=1",{
                        method:"POST",
                        headers:{
                            "Content-Type":"text/plain"
                        },
                        body:JSON.stringify({
                            
                            adminID: this.store.adminID,
                            adminPassword: this.store.adminPassword,
                            courseCode:code,
                            sheetURL
                        })
                    })
                    .then(res => {
                        this.spinner = false
                        alert('Meshe l7al')
                    })
                    .catch(err => {
                        
                        this.spinner = false
                        alert(err)
                        console.log(err);
                    })
                }
            }
        }
    },
    mounted(){
        this.getCoursesByMajor()
    }
}
</script>