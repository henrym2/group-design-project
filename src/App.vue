<!-- src/components/AppNav.vue -->
<template>
    <v-app id="app">
      <navigation>
<v-app-bar class="bar" app>

        
<v-toolbar-title>
          <a style="color:white;" @click="logout">Log Out</a>
        </v-toolbar-title>

        <v-spacer></v-spacer>
          <v-toolbar-items>
          <!-- <router-link to="/projects" class="nav-link">Home</router-link> -->
          <!-- <router-link to="/form" class="nav-link">Submit Project</router-link> -->
          <router-link to="/profile" class="nav-link">My Profile</router-link>
          <router-link to="/recommendations" class="nav-link">Recommendations</router-link>
          <!-- <router-link to="/" class="nav-link">Messages</router-link> -->
          <router-link to="/projects" class="nav-link">Projects</router-link>
          <router-link to="/findEngineer" class="nav-link">Find an Engineer</router-link> 
          <router-link to="/dashboard" class="nav-link">Message Board</router-link>    
        </v-toolbar-items>
      </v-app-bar>
      </navigation>
      
      <v-main class="white-smoke">
        <router-view/>
      </v-main>
     

    </v-app>
</template>

<script>
export default {
  methods: {
    logout () {
      sessionStorage.clear()
      this.$router.push("/")
    }
  }
}
</script>

<style scoped>
.bar{
  background-color: #0C162B !important;
}

.text-right {
  float: left !important;
}

.nav-link{
  color: white !important;
  margin: 20px;
}

.white-smoke {
  background-color: whitesmoke;
  background-repeat: repeat;
  overflow-y: auto;
}
</style>