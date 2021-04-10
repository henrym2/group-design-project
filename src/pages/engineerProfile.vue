<template>
    <v-container>
        <v-row>
            <v-card width="95rem" class="mt-3">
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
                        <v-tab v-if="userData.comments">
                            Your Reviews
                        </v-tab>
                    <v-tab-item>
                        <v-card flat>
                            <v-card-title>Details</v-card-title>
                            <v-card-text>
                                <!-- User details -->
                                <v-text-field label="Username" v-model="userData.name"></v-text-field>
                                <v-chip-group>
                                    <v-chip
                                        v-for="skill in userData.skills"
                                        :key="skill"
                                        close
                                        @click:close="removeItem('skills', skill)"
                                    >
                                        {{skill}}
                                    </v-chip>
                                </v-chip-group>
                                <v-text-field 
                                    label="New Skill"
                                    append-icon="mdi-plus"
                                    v-model="newData.skills"
                                    @click:append="addNew('skills')"
                                    @keydown.enter="addNew('skills')"
                                ></v-text-field>
                                <v-chip-group>
                                    <v-chip
                                        v-for="qualification in userData.qualifications"
                                        :key="qualification"
                                        close
                                        @click:close="removeItem('qualifications', qualification)"
                                    >
                                        {{qualification}}
                                    </v-chip>
                                </v-chip-group>
                                <v-text-field 
                                    label="New qualifications"
                                    append-icon="mdi-plus"
                                    v-model="newData.qualifications"
                                    @click:append="addNew('qualifications')"
                                    @keydown.enter="addNew('qualifications')"
                                ></v-text-field>
                                <v-chip-group>
                                    <v-chip
                                        v-for="experience in userData.experience"
                                        :key="experience"
                                        close
                                        @click:close="removeItem('experience', experience)"
                                    >
                                        {{experience}}
                                    </v-chip>
                                </v-chip-group>
                                <v-text-field 
                                    label="New experience"
                                    append-icon="mdi-plus"
                                    v-model="newData.experience"
                                    @click:append="addNew('experience')"
                                    @keydown.enter="addNew('experience')"
                                ></v-text-field>
                                <v-textarea label="About Me" clearable counter no-resize v-model="userData.about"></v-textarea>
                                
                            </v-card-text>
                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn color="success" @click="saveAll">Save</v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-tab-item>
                    <!-- User Comments/Reviews -->
                    <v-tab-item v-if="userData.comments" class="overflow-auto">
                        <v-card flat>
                            <v-card-title>User Reviews</v-card-title>
                            <v-card-text>
                                <v-card v-for="comment in userData.comments" :key="comment.id">
                                    <v-card-title>Review from {{comment.name}}</v-card-title>
                                    <v-card-text>
                                        {{comment.text}}
                                    </v-card-text>
                                    <v-card-actions>
                                        <v-spacer/>
                                        <v-btn color="red" @click="removeComment(comment.id)">Remove</v-btn>
                                    </v-card-actions>
                                </v-card>
                            </v-card-text>
                        </v-card>
                    </v-tab-item>
                    </v-tabs>
            </v-card>
        </v-row>
    </v-container>
</template>

<script>
import {db} from "../firebase/firebase.js"
export default {
    data () {
        return {
            tabbed: "",
            userData: JSON.parse(sessionStorage.getItem('user')),
            newData: {
                skills: "",
                experience: "",
                qualifications: "",
            }
        }
    },
    mounted: function() {
        this.getUser()
    },
    methods: {
        async getUser() {
            try {
                let user = await db.collection("users").doc(sessionStorage.getItem("userid")).get()
                this.userData = user.data()
                sessionStorage.setItem(JSON.stringify(this.userData))
            } catch (e) {
                console.log(e)
            }
        },
        async removeComment (id) {
            try {
                this.userData.comments = this.userData.comments.filter(e => e.id !== id)
                const userID = sessionStorage.getItem("userid")
                await db.collection("users").doc(userID).set(this.userData, {merge: true})
                sessionStorage.setItem("user", JSON.stringify(this.userData))
            } catch (e) {
                console.log(e)
            }
        },
        async addNew(param) {
            try {
                this.userData[param].push(this.newData[param])
                this.newData[param] = ""

            } catch (e) {
                console.log(e)
            }
        },
        async removeItem(param, item) {
            try {
                this.userData[param] = this.userData[param]?.filter(e => e !== item)
                this.newData[param] = ""

            } catch (e) {
                console.log(e)
            }
        },
        async saveAll() {
            try {
                await db.collection("users").doc(sessionStorage.getItem("userid")).set(this.userData, {merge: true})
                sessionStorage.setItem("user", JSON.stringify(this.userData))
            } catch (e) {
                console.log(e)
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