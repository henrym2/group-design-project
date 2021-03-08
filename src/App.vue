<!-- src/components/AppNav.vue -->
<template>
  <div id="app">

    <v-app>
      <v-app-bar absolute class="bar">

        <v-title>
          <router-link to="/" class="nav-link">Log Out</router-link>
        </v-title>

        <v-spacer></v-spacer>

        <router-link to="/projects" class="nav-link">Home</router-link>
        <router-link to="/clinician_profile" class="nav-link">My Profile</router-link>
        <router-link to="/" class="nav-link">Messages</router-link>
        <router-link to="/" class="nav-link">Projects</router-link>
        

        
      </v-app-bar>
      
      <v-main>
        <router-view/>
      </v-main>
    </v-app>
    
  </div>
</template>

<script>
export default {}
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
</style>