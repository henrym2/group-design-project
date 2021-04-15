<template>
    <v-container>
        <v-row justify="center" class="mt-1">
            <v-spacer></v-spacer>
            <v-col class="ml-auto">
                <v-toolbar floating style="z-index:1" width="45rem">
                    <v-text-field class="mt-5" prepend-icon="mdi-magnify" single-line label="Search" v-model="searchParameters.title"></v-text-field>
                    <v-btn class="ml-auto">Search</v-btn>
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
                        <v-select multiple label="Purpose" :items="purposes" v-model="searchParameters.purpose"></v-select>
                        <v-select multiple label="Healthcare Area" :items="healthcareAreas" v-model="searchParameters.healthcareArea"></v-select>
                        <v-text-field mutliple label="Author Email" v-model="searchParameters.email"></v-text-field>
                        <v-select multiple :items="tags" v-model="searchParameters.tags" label="Tags"></v-select>
                        <!-- <v-switch v-model="applyFilters" label="Apply Filters"></v-switch> -->
                    </v-card-text>
                </v-card>

            </v-col>      
            <v-col
                cols="10"
                class="p-2"
            >
                <v-card>
                    <v-card-title style="background-color:#0C162B !important">
                        <h2 class="text-h3 white--text">Find a Project</h2>
                    </v-card-title>
                    <template flat v-for="(project, i) in displayProjects">
                        <v-hover v-slot="{ hover }" :key="i">
                            <v-card style="height:20rem" class="project-card" tile :elevation="hover ? 4: 0">
                                <v-card-title>
                                    {{project.title}}
                                </v-card-title>
                                <v-card-text>
                                    <v-row>
                                        <v-col cols="9">
                                        <p>{{project.description}}</p>
                                        </v-col>
                                        <v-spacer></v-spacer>
                                        <v-col cols="3">
                                            <p v-if="project.duration">Duration: {{project.duration}} weeks</p>
                                            <v-spacer></v-spacer>
                                            <p>{{project.username}}</p>
                                            <a :href="`mailto:${project.email}`">{{project.email}}</a>
                                        </v-col>
                                        <v-spacer></v-spacer>
                                    </v-row>
                                    <v-spacer> </v-spacer>
                                    
                                </v-card-text>
                                <v-card-actions>
                                    <v-row>
                                        <v-col>
                                            <v-chip-group>
                                                <v-chip
                                                    @click="searchParameters.tags.push(tag.toLowerCase())"
                                                    v-for="(tag, i) in project.tags"
                                                    :key="i"
                                                >{{tag}}</v-chip>
                                            </v-chip-group>
                                        </v-col>
                                    </v-row>
                                </v-card-actions>

                                <v-card-text>
                                    <v-row>
                                        <v-col>
                                            <!-- Healthcare Area -->
                                            <div v-if="project.healthcareArea !== undefined">
                                                <div v-if="project.healthcareArea !== ''">
                                                    <p v-if="project.healthcareArea !== 'Other'">Healthcare Area: {{project.healthcareArea}}</p>
                                                </div>
                                                <div v-if="project.otherHealthcareArea">
                                                    <p v-if="project.otherHealthcareArea !== ''">Healthcare Area: {{project.otherHealthcareArea}}</p>
                                                </div>
                                            </div>

                                            <!-- Project Purpose -->
                                            <div v-if="project.purpose">
                                                <div v-if="project.purpose !== ''">
                                                    <p v-if="project.purpose !== 'Other'">
                                                        Project Purpose: {{project.purpose}}
                                                    </p>
                                                </div>
                                                <p v-if="project.otherPurpose !== ''">
                                                    Project Purpose: {{project.otherPurpose}}
                                                </p>
                                            </div>
                                        </v-col>
                                    </v-row>
                                </v-card-text>
                            </v-card>
                        </v-hover>
                    </template>
                </v-card>
            </v-col>
            <v-spacer></v-spacer>
        </v-row>
    </v-container>
</template>

<script>
import {db} from "../firebase/firebase.js"

export default {
    name: "ProjectList",
    data () {
        return {
            selectedTags: [],
            projects: [],
            searchParameters: {
                title: "",
                email: "",
                healthcareArea: [],
                purpose: [],
                tags: []
            },
            applyFilters: false,
            displayProjects: []
        }
    },
    mounted: function() {
        this.getProjects()
    },
    computed: {
        healthcareAreas() {
            return [...this.projects.reduce((acc, e) => {
                if (e.healthcareArea) acc.add(e.healthcareArea.toLowerCase())
                return acc
            }, new Set())]
        },
        purposes() {
            return [...this.projects.reduce((acc, e) => {
                if (e.purpose) acc.add(e.purpose.toLowerCase())
                return acc
            }, new Set())]
        },
        tags() {
            return [...this.projects.reduce((acc, e) => {
                if (e.tags) e.tags.forEach(t => acc.add(t.toLowerCase()))
                return acc
            }, new Set())]
        }
    },
    watch: {
        searchParameters: {
            deep: true,
            handler: function() {
                const { email, healthcareArea, purpose, tags } = this.searchParameters
                let tmpProjects = JSON.parse(JSON.stringify(this.projects))
                if (email != "") {
                    tmpProjects = tmpProjects.filter(e => e?.email?.toLowerCase().includes(email.toLowerCase()))
                }
                if (healthcareArea.length > 0) {
                    tmpProjects = tmpProjects.filter(e => healthcareArea.includes(e?.healthcareArea?.toLowerCase()))
                }
                if (purpose.length > 0) {
                    tmpProjects = tmpProjects.filter(e => purpose.includes(e?.purpose?.toLowerCase()))
                }
                if (tags.length > 0) {
                    tmpProjects = tmpProjects.filter(e => e?.tags?.some(t => tags.includes(t.toLowerCase())))
                }
                this.displayProjects = tmpProjects
            }
        }
    },
    methods: {
        async getProjects() {
            try {
                const proj = db.collection('projects')
                const allProj = await proj.limit(30).get()
                allProj.forEach(e => {
                    this.projects.push(e.data())
                })
                this.displayProjects = JSON.parse(JSON.stringify(this.projects))
                this.displayProjects = this.displayProjects.filter(e => !e.hidden)
            } catch (err) {
                console.log(err)
            }
            
        }
    }
}
</script>

<style>
.project-card {
    border-bottom-style: solid !important;
    border-bottom-color: lightgrey !important;
}

.project-card:hover {
    background-color: #fafafa ;
}

</style>