<template>
  <v-app>
    <v-main>
    <div>
      <v-app-bar
        dense
        dark
      >
        <v-app-bar-nav-icon></v-app-bar-nav-icon>
        <v-toolbar-title>Page title</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-menu
          left
          bottom
        >
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              icon
              v-bind="attrs"
              v-on="on"
            >
              <v-icon>mdi-dots-vertical</v-icon>
            </v-btn>
          </template>
  
          <v-list>
            <v-list-item @click="() => {}">
              <v-list-item-title>Log out</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-app-bar>
    </div>
      
      <project-list></project-list>
      <Login></Login>
     
      
      
    </v-main>
  </v-app>
</template>

<script>
//import Form from "./pages/Form.vue"
import Login from "./pages/Login.vue"
import ProjectList from "./pages/ProjectList.vue"

export default {
  name: 'App',

  components: {
    Login,
    ProjectList,
    //Form,
  },

  data: () => ({
    //
  }),
};
</script>

<style>
  @import "https://unpkg.com/pattern.css";
</style>
