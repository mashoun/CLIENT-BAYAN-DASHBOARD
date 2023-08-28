import { defineStore } from "pinia";

export const useStore = defineStore('store', {
    state: () => ({

        adminID: '',
        adminPassword: '',
        domain:'bayanint',
        isLogedIn:false,

        recRegAccounts: [{

            countryOfBirth: "",
            fathersName: "",
            domain:"",
            addressDescription: "",
            index: "",
            major: "",
            street: "",
            nationality: "",
            bac2DegDoc: "",
            bachelorDegDoc: "",
            masterDegDoc: "",
            letterOfIntrestDoc: "",
            twoLetterOfRecoDoc: "",
            resumeDoc: "",
            email: "",
            dateOfBirth: "",
            passportNumber: "",
            phoneNumber: "",
            firstName: "",
            gender: "",
            district: "",
            facePictureDoc: "",
            city: "",
            passportDoc: "",
            timestamp: "",
            lastName: ""
        }],

        userAccount: {
            "profile": {
                "userID": "",
                "password": "",
                "domain":"",
                "email": "",
                "timestamp": "",
                "firstName": "",
                "lastName": "",
                "fathersName": "",
                "phoneNumber": "",
                "major": "",
                "bachelorDegDoc": "",
                "masterDegDoc": "",
                "letterOfIntrestDoc": "",
                "twoLetterOfRecoDoc": "",
                "dateOfBirth": "",
                "countryOfBirth": "",
                "district": "",
                "city": "",
                "street": "",
                "addressDescription": "",
                "nationality": "",
                "gender": "",
                "passportNumber": "",
                "passportDoc": "",
                "facePictureDoc": "",
                "resumeDoc": ""
            },
            "courses": [
                {
                    "semester": "",
                    "code": "",
                    "title": "",
                    "description": "",
                    "link": "",
                    "instructor": "",
                    "index": ""
                }
            ]
        },

        coursesByMajor: [{
            "id":"",
            "domain":"",
            "semester": "",
            "code": "",
            "title": "",
            "description": "",
            "link": "",
            "instructor": "",
            "index": ""
        }],

        newCourse:{
            
            "id":"1",
            "domain":"",
            "semester": "",
            "code": "",
            "title": "",
            "description": "",
            "link": "",
            "instructor": "",
        },
        majors:[
            "Bachelor of Business Administration (BBA)",
            "Bachelor of Business Administration in Accounting (BBA-Acc)",
            "Master of Business Administration (MBA)",
            "Master of Business Administration in Accounting (MBA-Acc)",
            "Master of Business Administration in Management Information Systems (MIS)",
            "Master of Business Administration in Business Analytics (MBA-BAn)",
            "Master of Business Administration in Agribusiness",
            "Master of Business Administration in Hospitality, Travel, & Tourism",
            "Master of Business Administration in Business Analytics",
            "Master of Business Administration in Healthcare Administration",
            "Master of Business Administration in Educational Administration",
            "Master of Business Administration in Marketing Management",
            "Master of Business Administration in Financial Management",
            "Master of Business Administration in Human Resources Management",
            "Master of Business Administration in Logistics Management",
            "Master of Business Administration in Luxury Brand Management",
            "Doctor of Business Administration (DBA)",
            "Doctor of Business Administration in Management Information Systems (DBA-MIS)",
            "Doctor of Business Administration in Business Analytics (DBA-BAn)",
            "Doctor of Business Administration in Agribusiness",
            "Doctor of Business Administration in Hospitality, Travel, & Tourism",
            "Doctor of Business Administration in Business Analytics",
            "Doctor of Business Administration in Healthcare Administration",
            "Doctor of Business Administration in Educational Administration",
            "Doctor of Business Administration in Marketing Management",
            "Doctor of Business Administration in Financial Management",
            "Doctor of Business Administration in Human Resources Management",
            "Doctor of Business Administration in Logistics Management",
            "Doctor of Business Administration in Luxury Brand Management",
            "Doctor of Management (DM)"
        ],

        website:{
            "contact": {
                "email": "",
                "number": "",
                "address": "",
                "facebook": "",
                "linkedIn": "",
                "terms":  "",
                "privacyPolicy":  "",
            },
            "links": [
                {
                    "text": "a",
                    "url":  "b",
                    "index":  "",
                },
            ],
            "slides": [
                {
                    "thumbnail": "https://picsum.photos/502",
                    "index":  "1",
                },
            ],
            "majors": [
                {
                    "thumbnail":  "",
                    "title":  "",
                    "description": "",
                    "index":  "",
                    "url":""
                },
            ],
            "partners": [
                {
                    "thumbnail":  "https://picsum.photos/502",
                    "index":  "1",
                },
            ],
            "faq": [
                {
                    "question": "",
                    "answer":  "",
                    "index":  "",
                },
            ]
        },

    }),
    actions: {

        getApi() {
            return 'https://script.google.com/macros/s/AKfycbx70AFuHZxnrqgpcPbgE2ap0BR2v0_EOY5ynp7SOV0WDRzZ6_V_ENT2V3y_FT0pzkde/exec'
        },
        login() {
            return `?userID=${encodeURIComponent(this.userID)}&password=${encodeURIComponent(this.password)}`
        },
        getProfile() {
            fetch(`${this.getApi()}?getContact=1`).then(res => res.json()).then(res => {
                this.profile = res
                console.log(res);
            }).catch(err => {
                console.log(err);
            })
        },

        isRequired(obj, name) {
            if (obj[name] != '') return true
            return false
        },

    }
})