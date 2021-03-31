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
            <v-card-actions>
                <v-chip-group>
                    <v-chip
                        pill
                        v-for="tag in project.tags"
                        :key="tag"
                    >{{tag}}</v-chip>
                </v-chip-group>
            </v-card-actions>
            <v-card-actions>
                <v-btn @click="toggleHideProject(project)" :color='project.hidden ? "green" : "orange"'>{{project.hidden ? "Show" : "Hide"}}</v-btn>
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
             *      hidden: Boolean
             *     }
             *  ]
             */
            projects: Array
        },
        methods: {
            deleteProject (project) {
                this.$emit("delete", project)
            },
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
