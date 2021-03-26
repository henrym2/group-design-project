<template>
    <v-container>
        <v-row>
            <v-card width="95rem" height="85vh" class="mt-3">
                <v-toolbar
                    class="toolbar-color"
                    dark
                    flat
                >
                    <v-toolbar-title>Your Profile</v-toolbar-title>
                    <v-spacer></v-spacer>
                </v-toolbar>
                <v-tabs
                    vertical
                    >
                        <v-tabs-slider color="yellow"></v-tabs-slider>
                        <v-tab>
                            User Details
                        </v-tab>
                        <v-tab>
                            Your Projects
                        </v-tab>
                    <v-tab-item>
                        <v-card flat>
                            <v-card-title>Details</v-card-title>
                            <v-card-text>
                                <v-text-field label="Email" v-model="userData.email"></v-text-field>
                                <v-text-field label="Username" v-model="userData.name"></v-text-field>
                                <v-textarea label="About Me" v-model="userData.about" clearable counter no-resize></v-textarea>
                                <v-spacer></v-spacer>
                                <v-btn color="success" @click="saveDetails">Save</v-btn>
                            </v-card-text>
                        </v-card>
                    </v-tab-item>
                    <v-tab-item class="overflow-auto">
                        <v-card flat>
                            <v-card-title>User Projects</v-card-title>
                            <v-card-text>
                                <Projects :projects="userData.projects" @delete="deleteProject"></Projects>
                            </v-card-text>
                            <v-card-actions>
                                <v-dialog  width="73vw" persistent v-model="dialog">
                                    <template v-slot:activator="{on, attrs}">
                                        <v-btn color="success" class="ml-auto" v-on="on" v-bind="attrs">Add</v-btn>
                                    </template>
                                    <v-card>
                                        <v-card-title class="headline">
                                            Add a new project
                                        </v-card-title>
                                        <v-divider></v-divider>
                                        <v-card-text>
                                            <v-text-field label="Title" v-model="newTitle"></v-text-field>
                                            <v-textarea label="Description" counter no-resize v-model="newDescription"></v-textarea>
                                            <v-chip-group v-if="newTags.length != 0">
                                                <v-chip v-for="tag in newTags" :key="tag" close @click:close="removeTag(tag)">{{tag}}</v-chip>
                                            </v-chip-group>
                                            <v-text-field label="Add a new Tag" append-icon="mdi-plus" @click:append="addTag" @keydown.enter="addTag" v-model="newTag"></v-text-field>
                                        </v-card-text>
                                        <v-card-actions>
                                            <v-spacer></v-spacer>
                                            <v-btn color="success" @click="saveNew">Save</v-btn>
                                            <v-btn color="error" @click="closeNew">Close</v-btn>
                                        </v-card-actions>
                                    </v-card>
                                </v-dialog>
                            </v-card-actions>
                        </v-card>
                    </v-tab-item>
                    </v-tabs>
            </v-card>
        </v-row>
    </v-container>
</template>

<script>
import Projects from "../components/clinicianProjects.vue"
import { db } from "../firebase/firebase.js"

export default {
    data () {
        return {
            tabs: [
                "Page 1",
                "Page 2"
            ],
            tabbed: "",
            clinProjects: [
                {
                    id: 0,
                    name: "test",
                    description: "Test",
                    tags: [ "test" ]
                },
                {
                    id: 0,
                    name: "test",
                    description: "Test",
                    tags: [ "test" ]
                },
                {
                    id: 0,
                    name: "test",
                    description: "Test",
                    tags: [ "test" ]
                },
                {
                    id: 0,
                    name: "test",
                    description: "Test",
                    tags: [ "test" ]
                },
                {
                    id: 0,
                    name: "test",
                    description: "Test",
                    tags: [ "test" ]
                }
            ],
            newTag: "",
            newTags: [],
            newTitle: "",
            newDescription: "",
            dialog: false,
            userData: JSON.parse(sessionStorage.getItem('user'))
        }
    },
    components: {
        Projects
    },
    computed: {
    },
    mounted: function(){
        this.getData()
    },
    methods: {
        async getData() {
            this.userData = (await db.collection('users').doc(sessionStorage.getItem('userid')).get()).data()
            sessionStorage.setItem("user", JSON.stringify(this.userData))
        },
        addTag() {
            this.newTags.push(this.newTag)
            this.newTag = ""
        },
        removeTag(tag) {
            console.log(tag)
            this.newTags = this.newTags.filter(e => e !== tag)
        },
        clearInput() {
            this.newTags = []
            this.newTag = ""
            this.newTitle = ""
            this.newDescription = ""
        },
        closeNew() {
            console.log("Test")
            this.clearInput()
            this.dialog = false
        },
        async saveNew() {
            ///Save Stuff
            try {
                const userID = sessionStorage.getItem("userid")
                const userRef = db.collection("users")
                const user = await userRef.doc(userID).get()
                const userProjects = user.data()['projects']
                const projects = db.collection('projects')

                const newProject = await projects.add({
                    userID,
                    email: this.userData.email,
                    username: this.userData.name,
                    title: this.newTitle,
                    description: this.newDescription,
                    tags: this.newTags
                })

                userProjects.push({
                    id: newProject.id,
                    title: this.newTitle,
                    description: this.newDescription,
                    tags: this.newTags
                })
                await userRef.doc(userID).set({projects: userProjects}, {merge: true})

                
                const userUpdated = await userRef.doc(userID).get()
                this.userData = userUpdated.data()
                sessionStorage.setItem('user', JSON.stringify(userUpdated.data()))
                this.clearInput()
                this.dialog = false
            } catch (err) {
                console.log(err)
            }

        },
        async deleteProject(project) {
            try {
                await db.collection('projects').doc(project.id).delete()
                this.userData.projects = this.userData.projects.filter(e => e.id !== project.id)
                await db.collection('users').doc(sessionStorage.getItem('userid')).set({projects: this.userData.projects}, {merge: true})
            } catch (err) {
                console.log(err)
            }
        },
        async saveDetails() {
            try {
                const userID = sessionStorage.getItem('userid')
                const userRef = db.collection("users")
                const user = await userRef.doc(userID).get(); 
                
                const newUser = Object.assign(user.data(), this.userData)
                await userRef.doc(userID).set({...newUser}, {merge: true})
            } catch (err) {
                console.log(err)
            }
        }
    }
}
</script>

<style scoped>
    .toolbar-color {
      background-color: #0C162B !important;
    }

    .card-grey {
        background-color: rgb(209, 209, 209);
    }

</style>