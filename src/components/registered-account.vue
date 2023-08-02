<template>
    <section>
        <section class="d-flex justify-content-between align-items-center p-3 shadow-sm bg-light rounded">
            <div class="d-flex gap-3 align-items-center" >
                <i class="bi bi-person-circle fs-2 text-secondary"></i>
                <div class="">
                    <h6 class="text-primary m-0">{{data.firstName}} {{data.lastName}} </h6>
                    <p class="text-secondary fs-smaller m-0"> {{data.major}} </p>
                </div>
            </div>
            <aside>
                <i class="bi bi-chevron-expand text-secondary fs-5"  data-bs-toggle="modal" :data-bs-target="'#RA'+data.index"></i>
                <!-- Modal -->
                <div class="modal fade" :id="'RA'+data.index" tabindex="-1">
                <div class="modal-dialog modal-xl modal-dialog-scrollable">
                    <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5">{{data.domain}} application</h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <div class="accordion" id="accordionExample">
                            <div class="accordion-item">
                                <h2 class="accordion-header">
                                <button class="accordion-button d-flex gap-2 align-items-center" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne">
                                    <span class="material-symbols-outlined">account_circle</span> <b>Personal Information</b>
                                </button>
                                </h2>
                                <div id="collapseOne" class="accordion-collapse collapse show" data-bs-parent="#accordionExample">
                                    <div class="accordion-body">
                                        <table class="table table-bordered table-striped table-sm">
                                            <tbody>
                                                <tr>
                                                    <td>First name</td>
                                                    <td>{{data.firstName}}</td>
                                                </tr>
                                                <tr>
                                                    <td>Last name</td>
                                                    <td>{{data.lastName}}</td>
                                                </tr>
                                                <tr>
                                                    <td>Father's name</td>
                                                    <td>{{data.fathersName}}</td>
                                                </tr>
                                                <tr>
                                                    <td>Email</td>
                                                    <td>{{data.email}}</td>
                                                </tr>
                                                <tr>
                                                    <td>Phone number</td>
                                                    <td>{{data.phoneNumber}}</td>
                                                </tr>
                                                
                                                <tr>
                                                    <td> Date of birth </td>
                                                    <td> {{data.dateOfBirth}} </td>
                                                </tr>
                                                <tr>
                                                    <td> Country of birth </td>
                                                    <td> {{data.countryOfBirth}} </td>
                                                </tr>
                                                <tr>
                                                    <td> District </td>
                                                    <td> {{data.district}} </td>
                                                </tr>
                                                <tr>
                                                    <td> City </td>
                                                    <td> {{data.city}} </td>
                                                </tr>
                                                <tr>
                                                    <td> Street </td>
                                                    <td> {{data.street}} </td>
                                                </tr>
                                                <tr>
                                                    <td> Address description </td>
                                                    <td> {{data.addressDescription}} </td>
                                                </tr>
                                                <tr>
                                                    <td> Nationality </td>
                                                    <td> {{data.nationality}} </td>
                                                </tr>
                                                
                                                <tr>
                                                    <td> Genter </td>
                                                    <td> {{data.gender}} </td>
                                                </tr>
                                                <tr>
                                                    <td> Passport or ID number </td>
                                                    <td> {{data.passportNumber}} </td>
                                                </tr>
                                                <tr>
                                                    <td> Passport od ID Documents link </td>
                                                    <td> {{data.passportDoc}} </td>
                                                </tr>                                                
                                                <tr>
                                                    <td> Face picture Document </td>
                                                    <td> {{data.facePictureDoc}} </td>
                                                </tr>
                                                <tr>
                                                    <td> Resume Document </td>
                                                    <td> {{data.resumeDoc}} </td>
                                                </tr>

                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                            
                            <div class="accordion-item">
                                <h2 class="accordion-header">
                                <button class="accordion-button d-flex gap-2 align-items-center" type="button" data-bs-toggle="collapse" data-bs-target="#collapse3">
                                    
                                    <span class="material-symbols-outlined">school</span> <b>Academic Information</b>
                                </button>
                                </h2>
                                <div id="collapse3" class="accordion-collapse collapse" data-bs-parent="#accordionExample">
                                    <div class="accordion-body">
                                        <table class="table table-bordered table-striped table-s">
                                            <tbody>
                                                <!-- <tr>
                                                    <td>  </td>
                                                    <td>  </td>
                                                </tr> -->
                                                <tr>
                                                    <td> Major </td>
                                                    <td> {{data.major}} </td>
                                                </tr>
                                                <tr v-if="utilities.majorType(data.major) == 'bachelor'">
                                                    <td> Baccalaureate certification documents </td>
                                                    <td> {{data.bac2DegDoc}} </td>
                                                </tr>
                                                <tr v-if="utilities.majorType(data.major) == 'master'">
                                                    <td> Bachelor certification document </td>
                                                    <td> {{data.bachelorDegDoc}} </td>
                                                </tr>
                                                <tr v-if="utilities.majorType(data.major) == 'doctor'">
                                                    <td> Master certification document </td>
                                                    <td> {{data.masterDegDoc}} </td>
                                                </tr>
                                                <tr  v-if="utilities.majorType(data.major) == 'doctor'">
                                                    <td> Letter of intrest </td>
                                                    <td> {{data.letterOfIntrestDoc}} </td>
                                                </tr>
                                                <tr  v-if="utilities.majorType(data.major) == 'doctor'">
                                                    <td> Two letter of recomendation </td>
                                                    <td> {{data.twoLetterOfRecoDoc}} </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <slot></slot>
                    </div>
                    </div>
                </div>
                </div>
            </aside>
        </section>
    </section>
</template>
<script>
import utilities from '../utilities.js'
export default {
    props:['data'],
    data(){
        return{
            utilities
        }
    }
}
</script>
<style scoped>
    table{
        font-family: 'Courier New', Courier, monospace;
    }
    tr > td:first-child{
        font-weight: bold;
    }
</style>