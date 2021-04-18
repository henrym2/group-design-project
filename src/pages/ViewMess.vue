<template>
  <section class="container">

    <h1>View Contact</h1>

    <div class="notification is-success" v-if="success">Contact successfully saved!</div>

    

    <div class="contact--section">
      <p class="__name">{{firstname}} {{lastname}}</p>

      <p>{{emailaddress}}</p>

      <p>{{message}}</p>

    </div>
  </section>
</template>

<script>
  import {db} from "../firebase/firebase.js"
  export default {
    name: 'view-contact',
    data () {
      return {
        firstname: null,
        lastname: null,
        emailaddress: null,
        message: null,
        success: (this.$route.params.success)
      }
    },
    beforeRouteEnter (to, from, next) {
      db.collection('posts').where('slug', '==', to.params.person).get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          next(vm => {
            vm.firstname = doc.data().firstname
            vm.lastname = doc.data().lastname
            vm.emailaddress = doc.data().emailaddress
            vm.message = doc.data().message
          })
        })
      })
    },
    watch: {
      '$route': 'fetchData'
    },
    methods: {
      fetchData () {
        db.collection('posts').where('slug', '==', this.$route.params.person).get().then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            console.log(doc.id, ' => ', doc.data())
            this.firstname = doc.data().firstname
            this.lastname = doc.data().lastname
            this.emailaddress = doc.data().emailaddress
            this.message = doc.data().message
            this.success = this.$route.params.success
          })
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  section {
    height: 100vh;
  }
  h1 {
    font-size: 30px;
    margin: 30px 0;
  }
  p {
    margin-bottom: 20px;
  }
  .contact--section {
    background-color: white;
    padding: 20px;
    box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.05);
    .__name {
      font-size: 30px;
    }
  }
</style>