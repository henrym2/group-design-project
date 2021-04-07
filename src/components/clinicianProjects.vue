<template>
    <v-row>
        <v-col class="overflow-auto" style="height:62vh">
        <v-card 
            v-for="project in projects" 
            :key="project.id"
            class="mt-3"
        >
            <!-- Project Title -->
            <v-card-title>{{project.title}}</v-card-title>

            <!-- Project Description -->
            <v-card-text>{{project.description}}</v-card-text>

            <!-- Project Skills Required Tags -->
            <div v-if="project.tags.length > 0">
                <v-card-actions>
                    <v-chip-group>
                        <v-chip
                            pill
                            v-for="tag in project.tags"
                            :key="tag"
                        >{{tag}}</v-chip>
                    </v-chip-group>
                </v-card-actions>
            </div>

            <!-- Project Duration -->
            <div v-if="project.duration !== undefined">
                <div v-if="project.duration !== 0">
                    <v-card-text>Estimated project duration: {{project.duration}} Weeks</v-card-text>
                </div>
            </div>

            <!-- Healthcare Area -->
            <div v-if="project.healthcareArea !== undefined">
                <div v-if="project.healthcareArea !== ''">
                    <div v-if="project.healthcareArea !== 'Other'">
                        <v-card-text>Healthcare Area: {{project.healthcareArea}}</v-card-text>
                    </div>
                </div>
                <div v-if="project.otherHealthcareArea !== ''">
                    <v-card-text>Healthcare Area: {{project.otherHealthcareArea}}</v-card-text>
                </div>
            </div>

            <!-- Project Purpose -->
            <div v-if="project.purpose !== undefined">
                <div v-if="project.purpose !== ''">
                    <div v-if="project.purpose !== 'Other'">
                        <v-card-text>Project Purpose: {{project.purpose}}</v-card-text>
                    </div>
                </div>
                <div v-if="project.otherPurpose !== ''">
                    <v-card-text>Project Purpose: {{project.otherPurpose}}</v-card-text>
                </div>
            </div>

            <!-- Project Status (Open/Closed) -->
            <v-card-actions>
                <v-btn @click="toggleHideProject(project)" :color='project.hidden ? "green" : "orange"'>{{project.hidden ? "Show" : "Hide"}}</v-btn>
                <v-spacer></v-spacer>

                <!-- Delete a Project -->
                <v-btn color="red" @click="deleteProject(project)">Delete</v-btn>    
            </v-card-actions>
        </v-card>
        </v-col>
    </v-row>
</template>


<script>
    export default {
        name: "clinicianProjects",
        props: {
            /**
             * Project contains array of objects such that
             *  [    
             *     {
             *          description: String,
             *          duration: String,
             *          email: String,
             *          healthcareArea: String,
             *          hidden: Boolean
             *          otherHealthcareArea: String,
             *          otherPurpose: String
             *          purpose: String,
             *          tags: [
             *              {
             *                  String
             *              }
             *          ]
             *          title: String,
             *          userID: String,
             *          username: String,
             *     }
             *  ]
             */
            projects: Array
        },
        methods: {

            //delete a project from the clinician list of projects
            deleteProject (project) {
                this.$emit("delete", project)
            },

            //change the status of a project
            toggleHideProject (project) {
                if (project.hidden === false || project.hidden === undefined) {
                    this.$emit("toggle", project, true)
                } else {
                    this.$emit("toggle", project, false)
                }
            }
        }
    }
</script>

<style scoped>

</style>
