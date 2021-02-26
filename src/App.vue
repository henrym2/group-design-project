<template>
  <div id="app">
    <v-app>
      <v-app-bar absolute>
        <v-app-bar-nav-icon></v-app-bar-nav-icon>
        <v-toolbar-title>
          App Name
        </v-toolbar-title>
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
            <v-list-item @click="() => {$router.push(page.path)}" v-for="page in pages" :key="page.id">
              <v-list-item-title>
                <router-link :to="page.path" class="nav-link">{{page.text}}</router-link>
              </v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-app-bar>
      <v-main>
        <router-view/>
      </v-main>
    </v-app>
  </div>
</template>

<script>
export default {
  data () {
    return {
      pages: [
        { 
          id: 0, 
          text: "Login", 
          path: "/login"
        },
        {
          id: 1,
          text: 'Home',
          path: "/"
        },
        {
          id: 2,
          text: "Projects",
          path: "/projects"
        },
        {
          id: 3,
          text: "Forms",
          path: "/form"
        }
      ]
    }
  },
}
</script>

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
