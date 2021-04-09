<template>
    <v-container>
        <v-row justify="center" class="mt-1">
            <v-spacer></v-spacer>
            <v-col class="ml-auto">
                <v-toolbar floating style="z-index:5" width="45rem">
                    <v-text-field class="mt-5 mr-16" prepend-icon="mdi-magnify" single-line label="Search" v-model="searchParameters.name"></v-text-field>
                    <v-btn class="ml-2" @click="findEngineer">Search</v-btn>
                </v-toolbar>
            </v-col>
            <v-spacer></v-spacer>
        </v-row>
        <v-row style="height:75vh; width:75vw">
            <v-spacer></v-spacer>
            <v-col
                cols="2"    
            >
                <v-card style="height:34rem">
                    <v-card-title>
                        Filter By:
                    </v-card-title>
                    <v-card-text>
                        <v-text-field label="Filter" ></v-text-field>
                        <v-select multiple label="Skill" :items="skills" v-model="searchParameters.skills"></v-select>
                        <v-select multiple label="Skill" :items="qualifications" v-model="searchParameters.qualifications"></v-select>
                        
                        <v-divider></v-divider>
                    </v-card-text>
                </v-card>

            </v-col>      
            <v-col
                cols="10"
                class="overflow-auto"
                style="height:80vh"
            >
                <v-card class="mb-5" v-for="engineer in displayedEngineers" :key="engineer.name">
                    <v-card-title>
                        <h4 class="text-h6"><a class="black--text">{{engineer.name}}</a></h4>
                    </v-card-title>
                    <v-card-text>
                        <v-row>
                            <v-col cols="3">
                                <v-avatar size="6.4em" color="blue" class="mb-3">
                                    <span class="white--text headline">{{engineer.name[0]}}</span>
                                </v-avatar>
                                <v-spacer></v-spacer>
                                <a>{{engineer.email}}</a>
                            </v-col>
                            <v-col cols="9">
                            <p>
                                {{engineer.about}}
                            </p>
                            
                            </v-col>
                            <v-spacer></v-spacer>
                        </v-row>
                        <v-spacer></v-spacer>
                        <v-row>
                            <v-spacer/>
                            <v-btn color="success" @click="selectedEngineer = engineer; commentDialog = true">Reviews</v-btn>
                        </v-row>
                        <v-row>
                            <v-expansion-panels accordion flat class="mt-2">
                                <v-expansion-panel>
                                    <v-expansion-panel-header>Details</v-expansion-panel-header>
                                    <v-expansion-panel-content>
                                        <p>Skills</p>
                                        <p>Past experience</p>
                                        <p>additional information</p>
                                    </v-expansion-panel-content>
                                </v-expansion-panel>
                            </v-expansion-panels>
                        </v-row>
                    </v-card-text>
                </v-card>
            </v-col>
            <v-spacer></v-spacer>
        </v-row>
        <v-dialog
            v-model="commentDialog"
        >
        <v-card>
            <v-card-title>{{selectedEngineer.name}} Reviews</v-card-title>
            <v-card-text>
                <v-row>
                    <v-text-field class="ml-3" v-model="comment"></v-text-field>
                    <v-btn color="success" @click="submitComment(selectedEngineer)" small class="mt-3 ml-3">Comment</v-btn>
                </v-row>

                <v-row v-for="comment in selectedEngineer.comments" :key="comment.id">
                    <v-col cols=10>
                        <p>{{comment.text}}</p>
                    </v-col>
                    <v-col cols=2>
                        <p>From:{{comment.name}}</p>
                    </v-col>
                </v-row>
            </v-card-text>
        </v-card>
            
        </v-dialog>
    </v-container>
</template>

<script>
import {db} from "../firebase/firebase.js"

export default {
    name: "findEngineer",
    data () {
        return {
            userData: JSON.parse(sessionStorage.getItem("user")),
            search: "",
            engineers: [],
            displayedEngineers: [],
            searchParameters: {
                name: "",
                skills: [],
                qualifications: [], 
                verified: false
            },
            comment: "",
            commentDialog: false,
            selectedEngineer: {}
        }
    },
    mounted () {
        this.getAll()
    },
    computed: {
        skills: function () {
            return [...this.engineers.reduce((acc, e) => {
                if (e.skills) e.skills.forEach(x => acc.add(x.toLowerCase()))
                return acc
            }, new Set())]
        },
        qualifications: function() {
            return [...this.engineers.reduce((acc, e) => {
                if (e.skills) e.qualifications.forEach(x => acc.add(x.toLowerCase()))
                return acc
            }, new Set())]
        }
    },
    watch: {
        searchParameters: {
            deep: true,
            handler: function() {
                if (this.applyFilters) {
                    const {skills, qualifications, verified } = this.searchParameters
                    let tmpEng = JSON.parse(JSON.stringify(this.engineers))
                    if (skills.length > 0) {
                        tmpEng = this.engineers.filter(e => e?.skills?.some(t => skills.includes(t.toLowerCase())))
                    }
                    if (qualifications.length > 0) {
                        tmpEng = tmpEng.filter(e => e?.qualifications?.some(t => qualifications.includes(t.toLowerCase())))
                    }
                    if (verified) {
                        tmpEng = tmpEng.filter(e => e?.verified)
                    }
                    this.displayedEngineers = tmpEng
                }
            }
        }
    },
    methods: {
        async getAll () {
            try {
                const userRef = db.collection("users")
                const eng = await userRef.where('role', '==', 'engineer').get()
                eng.forEach(e => {
                    this.engineers.push(e.data())
                })
                this.displayedEngineers = JSON.parse(JSON.stringify(this.engineers))
            } catch (e) {
                console.log(e)
            }
        },
        findEngineer() {
            this.displayedEngineers = this.engineers.filter(e => {
                return e.name.toLowerCase().includes(this.searchParameters.name.toLowerCase())
            })
        },
        async submitComment(engineer) {
            try {
                let found = this.engineers.find(e => e.uid === engineer.uid)
                if (engineer.comments === undefined) {
                    found.comments = []
                }
                found.comments.push({
                    id: found.comments.length,
                    name: this.userData.name,
                    text: this.comment
                })
                console.log(found)
                await db.collection("users").doc(engineer.uid).set(found, {merge: true})
                this.comment = ""
                this.selectedEngineer = found
                await this.getAll()
            } catch (e) {
                console.log(e)
            }
        }
    }
}
</script>

<style>

</style>