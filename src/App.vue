<template>
  <v-app>
    <v-main>
      <v-toolbar dark src="https://images.pexels.com/photos/3481163/pexels-photo-3481163.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260">
        <v-app-bar-nav-icon></v-app-bar-nav-icon>
        <v-toolbar-title>Title</v-toolbar-title>
      </v-toolbar>
      <ProjectList></ProjectList>
      <Login v-if="false"></Login>
    </v-main>
  </v-app>
</template>

<script>
import Login from "./pages/Login.vue"
import ProjectList from "./pages/ProjectList.vue"
export default {
  name: 'App',

  components: {
    Login,
    ProjectList
  },

  data: () => ({
    //
  }),
};
</script>

<style>
  @import "https://unpkg.com/pattern.css";
</style>
