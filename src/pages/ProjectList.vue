<template>
    <v-container>
        <v-row justify="center" class="mt-1">
            <v-spacer></v-spacer>
            <v-col class="ml-auto">
                <v-toolbar floating style="z-index:5" width="45rem">
                    <v-text-field class="mt-5 mr-16" prepend-icon="mdi-magnify" single-line label="Search"></v-text-field>
                    <v-select class="mt-3 ml-16" multiple chips :items="tags" v-model="selectedTags" label="Tags"></v-select>
                    <v-btn class="ml-2">Search</v-btn>
                </v-toolbar>
            </v-col>
            <v-spacer></v-spacer>
        </v-row>
        <v-row class="overflow-auto" style="height:82vh">
            <v-spacer></v-spacer>
            <v-col
                cols="2"    
            >
                <v-card style="height:35rem">
                    <v-card-title>
                        Filter By:
                    </v-card-title>
                    <v-card-text>
                        <v-text-field label="Filter"></v-text-field>
                        <v-select multiple label="Multi filter"></v-select>
                        <v-checkbox label="Option 1"></v-checkbox>
                        <v-checkbox label="Option 2"></v-checkbox>
                        <v-divider></v-divider>
                        <v-menu
                            ref="menu"
                            v-model="menu"
                            :close-on-content-click="false"
                            transition="scale-transition"
                            offset-y
                            min-width="auto">
                            <template v-slot:activator="{on, attrs}">
                                <v-text-field
                                    v-model="date"
                                    label="Start Date"
                                    prepend-icon="mdi-calendar"
                                    readonly
                                    v-bind="attrs"
                                    v-on="on"
                                >
                                </v-text-field>
                            </template>
                            <v-date-picker
                                v-model="date"
                                no-title
                                scrollable
                            >
                            </v-date-picker>
                        </v-menu>
                        <v-menu
                            ref="menu"
                            v-model="menu"
                            :close-on-content-click="false"
                            transition="scale-transition"
                            offset-y
                            min-width="auto">
                            <template v-slot:activator="{on, attrs}">
                                <v-text-field
                                    v-model="date"
                                    label="End Date"
                                    prepend-icon="mdi-calendar"
                                    readonly
                                    v-bind="attrs"
                                    v-on="on"
                                >
                                </v-text-field>
                            </template>
                            <v-date-picker
                                v-model="date"
                                no-title
                                scrollable
                            >
                            </v-date-picker>
                        </v-menu>
                    </v-card-text>
                </v-card>

            </v-col>      
            <v-col
                cols="8"
            >
                <v-card style="height:20rem" class="mb-5" v-for="x in [1,2,3,4,5]" :key="x">
                    <v-card-title>
                        Lorem Ipsum
                    </v-card-title>
                    <v-card-text>
                        <v-row>
                            <v-col cols="9">
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras finibus nisl elit, ut bibendum erat rutrum non. 
                            Cras tincidunt rhoncus quam, quis rhoncus sem bibendum quis. Phasellus at elit dui. Sed ac ex vel ex gravida pretium. 
                            Pellentesque quis sapien sed nisl elementum iaculis nec in turpis. Maecenas dictum cursus elit, et fringilla nibh condimentum vel. 
                            Nunc at nibh pretium, ultricies justo eu, convallis elit. Vestibulum vestibulum, lacus vitae suscipit blandit,
                            </p>
                            </v-col>
                            <v-spacer></v-spacer>
                            <v-col cols="3">
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras finibus nisl elit, ut bibendum erat rutrum non. 
                                Cras</p>
                                <v-spacer></v-spacer>
                                <p>Username</p>
                                <a>Contact@details.com</a>
                            </v-col>
                            <v-spacer></v-spacer>
                        </v-row>
                        <v-spacer>  </v-spacer>
                        <v-row>
                            <v-col>
                                {{new Date()}}
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
export default {
    name: "ProjectList",
    data () {
        return {
            tags: [
                "test1",
                "test2",
                "test3"
            ],
            selectedTags: []
        }
    },
    methods: {

    }
}
</script>

<style>

</style>