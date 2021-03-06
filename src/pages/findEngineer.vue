<template>
    <v-container>
        <v-row justify="center" class="mt-1">
            <v-spacer></v-spacer>
            <v-col class="ml-auto">
                <v-toolbar floating style="z-index:1" width="45rem" class="d-flex">
                    <v-text-field 
                        class="mt-5" 
                        prepend-icon="mdi-magnify" 
                        single-line label="Search" 
                        style="width:40rem" 
                        v-model="searchParameters.name">
                    </v-text-field>
                    <!-- <v-btn class="ml-2 ml-auto" @click="findEngineer">Search</v-btn> -->
                </v-toolbar>
            </v-col>
            <v-spacer></v-spacer>
        </v-row>
        <v-row style="height:75vh">
            <v-spacer></v-spacer>
            <v-col
                cols="2"    
            >
                <v-card style="height:35rem">
                    <v-card-title>
                        Filter By:
                    </v-card-title>
                    <v-card-text>
                        <v-select multiple label="Skill" :items="skills" v-model="searchParameters.skills"></v-select>
                        <v-select multiple label="Qualifications" :items="qualifications" v-model="searchParameters.qualifications"></v-select>
                    </v-card-text>
                </v-card>
            </v-col>      
            <v-col
                cols="10"
            >
                <v-card>
                    <v-card-title style="background-color:#0C162B !important">
                        <h2 class="text-h3 white--text">Find an Engineer</h2>
                    </v-card-title>
                    <template v-for="(engineer, i) in displayedEngineers">
                        <v-hover v-slot="{ hover }" :key="i">
                            <v-card flat  class="project-card" tile :elevation="hover ? 4: 0">
                                <v-card-title>
                                    <h4 class="text-h4"><a class="black--text">{{engineer.name}}</a></h4>
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
                                                    <v-row class="text-center">
                                                        <h class="mt-2 ml-3 mr-2 text-subtitle-1">Skills:</h>  
                                                        <v-chip-group>
                                                            <v-chip
                                                                small
                                                                @click="searchParameters.skills.push(tag.toLowerCase())"
                                                                v-for="(skill, i) in engineer.skills"
                                                                :key="i"
                                                            >{{skill}}</v-chip>
                                                        </v-chip-group>
                                                    </v-row>
                                                    <v-row class="text-center">
                                                        <h class="mt-2 ml-3 mr-2 text-subtitle-1">Experience:</h>  
                                                        <v-chip-group>
                                                            <v-chip
                                                                small
                                                                @click="searchParameters.experience.push(tag.toLowerCase())"
                                                                v-for="(e, i) in engineer.experience"
                                                                :key="i"
                                                            >{{e}}</v-chip>
                                                        </v-chip-group>
                                                    </v-row>
                                                    <v-row class="text-center">
                                                        <h class="mt-2 ml-3 mr-2 text-subtitle-1">Qualifications:</h>  
                                                        <v-chip-group>
                                                            <v-chip
                                                                small
                                                                @click="searchParameters.experience.push(tag.toLowerCase())"
                                                                v-for="(e, i) in engineer.qualifications"
                                                                :key="i"
                                                            >{{e}}</v-chip>
                                                        </v-chip-group>
                                                    </v-row>
                                                </v-expansion-panel-content>
                                            </v-expansion-panel>
                                        </v-expansion-panels>
                                    </v-row>
                                </v-card-text>
                            </v-card>
                        </v-hover>
                    </template>
                </v-card>
            </v-col>
            <v-spacer></v-spacer>
        </v-row>
        <v-dialog
            v-model="commentDialog"
        >
        <v-card height="50vh">
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
            selectedEngineer: {},
            applyFilters: false
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
                    text: this.comment,
                    uid: sessionStorage.getItem("userid")
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