<template>
    <v-row>
        <v-col class="overflow-auto" style="height:62vh">
        <v-card 
            v-for="project in projects" 
            :key="project.id"
            class="mt-3"
        >
            <v-card-title>{{project.title}}</v-card-title>
            <v-card-text>{{project.description}}</v-card-text>
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
            <div v-if="project.duration !== undefined">
                <div v-if="project.duration !== 0">
                    <v-card-text>Estimated project duration: {{project.duration}} Weeks</v-card-text>
                </div>
            </div>

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

            <v-card-actions>
                <v-spacer></v-spacer>
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
             *      id: number,
             *      name: String,
             *      description: String,
             *      tag: Array,
             *      duration: String,
             *      healthcareArea: String,
             *      otherHealthcareArea: String,
             *      purpose: String,
             *      otherPurpose: String
             *     }
             *  ]
             */
            projects: Array
        },
        methods: {
            deleteProject (project) {
                this.$emit("delete", project)
            }
        }
    }
</script>

<style scoped>

</style>
