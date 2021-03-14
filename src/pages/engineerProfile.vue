<template>
    <v-container>
        <v-row>
            Engineer profile page stub
        
        </v-row>
    </v-container>
</template>

<script>
export default {
    computed: {
        userData() {
            return JSON.parse(sessionStorage.getItem('user'))
        }
    }
}
</script>

<style>
    

</style>