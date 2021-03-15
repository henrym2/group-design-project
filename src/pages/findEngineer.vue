<template>
  <v-container>
        <v-row justify="center" class="mt-1">
            <v-spacer></v-spacer>
            <v-col class="ml-auto">
                <v-toolbar floating style="z-index:5" width="45rem">
                    <v-text-field class="mt-5 mr-16" prepend-icon="mdi-magnify" single-line label="Search"></v-text-field>
                    <v-btn class="ml-2">Search</v-btn>
                </v-toolbar>
            </v-col>
            <v-spacer></v-spacer>
        </v-row>
        <v-row style="height:75vh">
            <v-spacer></v-spacer>
            <v-col
                cols="2"    
            >
                <v-card style="height:34rem">
                    <v-card-title>
                        Filter By:
                    </v-card-title>
                    <v-card-text>
                        <v-text-field label="Filter"></v-text-field>
                        <v-select multiple label="Multi filter"></v-select>
                        <v-checkbox label="Option 1"></v-checkbox>
                        <v-checkbox label="Option 2"></v-checkbox>
                        <v-divider></v-divider>
                    </v-card-text>
                </v-card>

            </v-col>      
            <v-col
                cols="8"
                class="overflow-auto"
                style="height:75vh"
            >
                <v-card class="mb-5" v-for="x in [1,2,3,4,5]" :key="x">
                    <v-card-title>
                        <h4 class="text-h6"><a class="black--text">Username</a></h4>
                    </v-card-title>
                    <v-card-text>
                        <v-row>
                            <v-col cols="3">
                                <v-avatar size="6.4em" color="blue" class="mb-3">
                                    <span class="white--text headline">TS</span>
                                </v-avatar>
                                <v-spacer></v-spacer>
                                <a>Contact@details.com</a>
                            </v-col>
                            <v-col cols="9">
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras finibus nisl elit, ut bibendum erat rutrum non. 
                            Cras tincidunt rhoncus quam, quis rhoncus sem bibendum quis. Phasellus at elit dui. Sed ac ex vel ex gravida pretium. 
                            Pellentesque quis sapien sed nisl elementum iaculis nec in turpis. Maecenas dictum cursus elit, et fringilla nibh condimentum vel. 
                            Nunc at nibh pretium, ultricies justo eu, convallis elit. Vestibulum vestibulum, lacus vitae suscipit blandit,
                            </p>
                            
                            </v-col>
                            <v-spacer></v-spacer>
                        </v-row>
                        <v-spacer></v-spacer>
                        <v-row>
                            <v-expansion-panels accordion flat class="mt-2">
                                <v-expansion-panel>
                                    <v-expansion-panel-header>Details</v-expansion-panel-header>
                                    <v-expansion-panel-content>
                                        <p>Skills</p>
                                        <p>Past experience</p>
                                        <p>additional information</p>
                                    </v-expansion-panel-content>
                                </v-expansion-panel>
                            </v-expansion-panels>
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
    name: "findEngineer",
    data () {
        return {
            search: "",
            engineers: []
        }
    },
    mounted () {
        this.getAll()
    },
    methods: {
        async getAll () {
            const userRef = db.collection("users")
            this.engineers = await userRef.where('role', '==', 'engineer').get()
        }
    }
}
</script>

<style>

</style>