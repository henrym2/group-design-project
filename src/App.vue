<template>
  <div id="app">
    <v-app>
      <v-app-bar absolute>
        <v-app-bar-nav-icon></v-app-bar-nav-icon>
        <v-toolbar-title>
          App Name
        </v-toolbar-title>
        <v-spacer></v-spacer>
          <router-link to="/login" class="mr-2 nav-link">Login</router-link>
          <router-link to="/" class="mr-2 nav-link">Home</router-link> 
          <router-link to="/about" class="mr-2 nav-link">About</router-link>
          <router-link to="/projects" class="nav-link">Projects</router-link>
      </v-app-bar>
      <v-main>
        <router-view/>
      </v-main>
    </v-app>
  </div>
</template>

<style lang="scss">
.nav-link {
  color: gray;
  text-decoration: none;
}


#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
