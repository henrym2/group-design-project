<template>
    <v-row>
        <v-col class="overflow-auto" style="height:62vh">
        <v-card 
            v-for="project in projects" 
            :key="project.id"
            class="mt-3"
        >
            <v-card-title>{{project.name}}</v-card-title>
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
             *      tag: Array
             *     }
             *  ]
             */
            projects: Array
        }
    }
</script>

<style scoped>

</style>
