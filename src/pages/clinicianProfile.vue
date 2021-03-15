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
                                <v-text-field label="Email"></v-text-field>
                                <v-text-field label="Username"></v-text-field>
                                <v-text-field label="Password"></v-text-field>
                                <v-textarea label="About Me" clearable counter no-resize></v-textarea>
                                <v-spacer></v-spacer>
                                <v-btn color="success" @click="saveDetails">Save</v-btn>
                            </v-card-text>
                        </v-card>
                    </v-tab-item>
                    <v-tab-item class="overflow-auto">
                        <v-card flat>
                            <v-card-title>User Projects</v-card-title>
                            <v-card-text>
                                <Projects :projects="clinProjects"></Projects>
                            </v-card-text>
                            <v-card-actions>
                                <v-btn color="success" class="ml-auto">Add</v-btn>
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
            ]
        }
    },
    components: {
        Projects
    },
    computed: {
        userData() {
            return JSON.parse(sessionStorage.getItem('user'))
        },
    },
    methods: {
        saveData () {
            return true
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