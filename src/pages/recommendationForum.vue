<template>
    <v-container>
        <v-row justify="center" class="mt-1">
            <v-spacer></v-spacer>
            <v-col class="ml-auto">
                <v-toolbar floating style="z-index:1" width="45rem">
                    <v-text-field class="mt-5" 
                        prepend-icon="mdi-magnify" 
                        single-line label="Search" 
                        style="width:40rem"  v-model="searchParameters.title"></v-text-field>
                    <!-- <v-btn class="ml-auto">Search</v-btn> -->
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
                        <!-- <v-text-field mutliple label="Author Email" v-model="searchParameters.email"></v-text-field> -->
                        <v-select multiple :items="tags" v-model="searchParameters.tags" label="Tags"></v-select>
                        <v-select multiple :items="engineers" v-model="searchParameters.engineers" label="Engineer"></v-select>
                        <v-select multiple :items="projects" v-model="searchParameters.projects" label="Project"></v-select>
                        <v-select multiple :items="Reviewers" v-model="searchParameters.reviewers" label="Reviewer"></v-select>
                    </v-card-text>
                </v-card>
            </v-col>      
            <v-col
                cols="10"
                class="p-2"
            >
                <v-card>
                    <v-card-title style="background-color:#0C162B !important">
                        <h2 class="text-h3 white--text">Engineer Recomendations</h2>
                    </v-card-title>
                    <template flat v-for="(post, i) in posts">
                        <v-hover v-slot="{ hover }" :key="i">
                            <v-card style="height:20rem" class="project-card" tile :elevation="hover ? 4: 0">
                            <v-card-title>{{post.engineer.name}}</v-card-title>
                                <v-card-text>
                                    <v-row>
                                        <v-col cols="9" class="d-flex flex-column">
                                            <p>{{post.text}}</p>
                                            <v-chip-group class="mt-auto">
                                                <v-chip
                                                    @click="searchParameters.tags.push(tag.toLowerCase())"
                                                    v-for="(tag, i) in post.project.tags"
                                                    :key="i"
                                                >{{tag}}</v-chip>
                                            </v-chip-group>
                                        </v-col>
                                        <v-spacer></v-spacer>
                                        <v-col cols="3">
                                            <p>Reviewer: <a :href="`mailto:${post.email}`">{{post.email}}</a></p>
                                            <p>Engineer: <a :href="`mailto:${post.engineer.email}`">{{post.engineer.email}}</a></p>
                                            <v-divider></v-divider>
                                            <p>Project Title: {{post.project.title}}</p>
                                            <p>Area: {{post.project.healthcareArea}}</p>
                                            <p>Purpose: {{post.project.purpose}}</p>
                                        </v-col>
                                        <v-spacer></v-spacer>
                                    </v-row>
                                    <v-spacer> </v-spacer>
                                </v-card-text>
                            </v-card>
                        </v-hover>
                    </template>
                </v-card>
            </v-col>
            <v-spacer></v-spacer>
        </v-row>
        <v-speed-dial 
            bottom 
            right
            fab
            fixed
        >
            <template v-slot:activator>
                <v-btn
                    color="green"
                    fab
                    @click="newPostDialog = true"
                    ><v-icon>mdi-plus</v-icon></v-btn>
            </template>
        </v-speed-dial>
        <v-dialog
            v-model="newPostDialog"
        >
            <v-card>
                <v-card-title>Post Review</v-card-title>
                <v-card-text>
                    <v-form ref="newPost">
                        <v-textarea 
                            v-model="newPost.text" 
                            outlined
                            label="Review"
                        ></v-textarea>
                        <v-select
                            label="Project"
                            :items="userData.projects" 
                            :disabled="userData.projects.length == 0"
                            item-text="title"
                            return-object
                            v-model="newPost.project"
                        ></v-select>
                        <v-select 
                            label="Engineer"
                            :items="userData.collaborators"
                            item-text="name"
                            return-object 
                            :disabled="userData.collaborators.length == 0"
                            v-model="newPost.engineer"
                        ></v-select>
                        <v-select
                            label="Review Score"
                            :items="[-2, -1, 0, 1, 2]"
                            v-model="newPost.score"
                        ></v-select>
                    </v-form>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="error" @click="clearPost(); newPostDialog = false">Cancel</v-btn>
                    <v-btn color="success" @click="saveNewPost(); newPostDialog = false">Save</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-container>
</template>

<script>
import { db } from "../firebase/firebase.js"
export default {
    name: "recommendationForum",
    data () {
        return {
            userData: JSON.parse(sessionStorage.getItem("user")),
            posts: [],
            displayedPosts: [],
            searchParameters: {
                title: "",
                tags: [],
                healthcareArea: [],
                purpose: [],
                projectTitle: "",
                engineers: [],
                projects: [],
                reviewers: [],
                score: 0
            },
            newPostDialog: false,
            newPost: {
                user: "",
                uid: sessionStorage.getItem("userid"),
                email: "", 
                text: "",
                engineer: {},
                project: {},
                score: 0
            },
            selectableEngineers: []
        }
    },
    mounted () {
        this.getPosts()
        console.log(this.userData)
    },
    computed: {
        healthcareAreas() {
            return [...this.posts.reduce((acc, e) => {
                if (e?.project.healthcareArea) acc.add(e?.project.healthcareArea.toLowerCase())
                return acc
            }, new Set())]
        },
        purposes() {
            return [...this.posts.reduce((acc, e) => {
                if (e?.project.purpose) acc.add(e?.project.purpose.toLowerCase())
                return acc
            }, new Set())]
        },
        tags() {
            return [...this.posts.reduce((acc, e) => {
                if (e?.project.tags) e?.project.tags.forEach(t => acc.add(t.toLowerCase()))
                return acc
            }, new Set())]
        },
        engineers() {
            return [...this.posts.reduce((acc, e) => {
                if (e?.engineer.name) acc.add(e?.engineer.name.toLowerCase())
                return acc
            }, new Set())]
        },
        projects() {
            return [...this.posts.reduce((acc, e) => {
                if (e?.project) acc.add(e.project?.title.toLowerCase())
                return acc
            }, new Set())]
        },
        Reviewers() {
            return [...this.posts.reduce((acc, e) => {
                acc.add(e.user)
                return acc
            }, new Set())]
        }
    },
    watch: {
        searchParameters: {
            deep: true,
            handler: function() {
                const { email, healthcareArea, purpose, tags, engineers, projects, reviewers } = this.searchParameters
                let tmpPosts = JSON.parse(JSON.stringify(this.posts))
                if (email != "") {
                    tmpPosts = tmpPosts.filter(e => e?.email?.toLowerCase().includes(email.toLowerCase()))
                }
                if (healthcareArea.length > 0) {
                    tmpPosts = tmpPosts.filter(e => healthcareArea.includes(e?.project?.healthcareArea?.toLowerCase()))
                }
                if (purpose.length > 0) {
                    tmpPosts = tmpPosts.filter(e => purpose.includes(e?.project?.purpose?.toLowerCase()))
                }
                if (tags.length > 0) {
                    tmpPosts = tmpPosts.filter(e => e?.project?.tags?.some(t => tags.includes(t.toLowerCase())))
                }
                if (engineers.length > 0) {
                    tmpPosts = tmpPosts.filter(e => engineers.includes(e?.engineer?.name.toLowerCase()))
                }
                if (projects.length > 0) {
                    tmpPosts = tmpPosts.filter(e => projects.includes(e?.project?.title.toLowerCase()))
                }
                if (reviewers.length > 0) {
                    tmpPosts = tmpPosts.filter(e => reviewers.includes(e?.user.toLowerCase()))
                }
                
                this.displayedPosts = tmpPosts
            }
        }
    },
    methods: {
        async getPosts () {
            try {
                let newPosts = await db.collection("reviews").limit(30).get()
                newPosts.forEach(e => {
                    this.posts.push(e.data())
                })
                this.displayedPosts = JSON.parse(JSON.stringify(this.posts))
            } catch (e) {
                console.log(e)
            }
        },
        async getEngineers() {
            let eng = await db.collection("users").where("role", "==", "engineer").limit(30).get()
            eng.forEach(e => {
                this.selectableEngineers.push(e)
            })
        },
        async saveNewPost() {
            try {
                const userRef = db.collection("users")
                const reviewRef = db.collection("reviews")
                const user = (await userRef.doc(sessionStorage.getItem("userid")).get()).data()
                if (user.reviews === undefined) {
                    user.reviews = []
                }
                const newPost = await reviewRef.add(this.newPost)
                user.reviews.push({
                    id: newPost.id, 
                    ...this.newPost, 
                    user: user.name, 
                    email: user.email, 
                    uid: user.id
                })
                await userRef.doc(sessionStorage.getItem("userid")).set(user, {merge: true})
                const updated = await userRef.doc(sessionStorage.getItem("userid")).get()
                this.userData = updated.data()
                sessionStorage.setItem("user", JSON.stringify(updated.data()))
                this.clearPost()
                await this.getPosts()

            } catch (e) {
                console.log(e)
            }
        },
        clearPost() {
            this.newPost = {
                user: this.userData.name,
                uid: sessionStorage.getItem("userid"),
                email: this.userData.email, 
                text: "",
                engineer: {},
                tags: [],
                project: {},
                healthcareArea: "",
                purpose: ""
            }
            this.newPostDialog = false
        }
    }
}
</script>

<style>

</style>