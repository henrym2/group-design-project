<template>
  <v-container>
      <v-row class="ml-2 mr-2" style="height:97vh" align="center">
          <v-col >
              <v-card elevation="2" >
                  <v-card-title class="d-flex justify-center mt-4">
                      <h3>Welcome back</h3>
                  </v-card-title>
                  <v-card-text>
                      <div>
                          <v-text-field label="Username"></v-text-field>
                      </div>
                      <div>
                          <v-text-field label="Password"></v-text-field>
                      </div>
                      <div class="d-flex">
                        <v-btn color="primary">Login</v-btn>
                        <a class="mt-2 ml-auto">Forgot password</a>
                      </div>
                  </v-card-text>
              </v-card>
          </v-col>
          <v-col  style="height:78vh">
             <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                <path fill="#FF0066" d="M24.2,-40C35.7,-35.3,52.4,-37.6,57.5,-32.1C62.5,-26.6,56,-13.3,53.4,-1.5C50.8,10.3,52.1,20.6,47.3,26.4C42.4,32.2,31.3,33.5,22.3,35C13.4,36.4,6.7,37.9,-1.7,40.8C-10.1,43.7,-20.2,48.1,-34.1,49.6C-48.1,51.1,-65.9,49.7,-72.1,41C-78.3,32.2,-72.8,16.1,-72.1,0.4C-71.3,-15.3,-75.5,-30.6,-72.2,-44.5C-69,-58.3,-58.5,-70.7,-45.3,-74.4C-32,-78.2,-16,-73.2,-4.8,-64.8C6.4,-56.5,12.7,-44.7,24.2,-40Z" transform="translate(100 100)" />
            </svg>
          </v-col>
      </v-row>
  </v-container>
</template>

<script>
export default {

}
</script>

<style>

</style>