<template>
    <v-container>
        <v-row justify="center" class="mt-1">
            <v-spacer></v-spacer>
            <v-col class="ml-auto">
                <v-toolbar floating style="z-index:5" width="45rem">
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
                        <v-select multiple chips :items="tags" v-model="searchParameters.tags" label="Tags"></v-select>
                        <v-switch v-model="applyFilters" label="Apply Filters"></v-switch>
                    </v-card-text>
                </v-card>

            </v-col>      
            <v-col
                cols="10"
                class="overflow-auto"
                style="height:75vh"
            >
                <v-card style="height:20rem" class="mb-5" v-for="project in displayProjects" :key="project.id">
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
                        <v-spacer>  </v-spacer>
                        <v-row>
                            <v-col>
                            </v-col>
                        </v-row>
                    </v-card-text>
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
                if (e.tags) acc.add(e.tags.forEach(t => t.toLowerCase()))
                return acc
            }, new Set())]
        }
    },
    watch: {
        searchParameters: {
            deep: true,
            handler: function() {
                if( this.applyFilters) {
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

</style>