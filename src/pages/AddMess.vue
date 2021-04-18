<template>

  <section class="container">
    <h1>Post to Clinilink Message Board</h1>

    <form @submit.prevent="saveContact">

      <div class="field">
        <label class="label">First Name</label>
        <div class="control">
          <input class="input" type="text" placeholder="First Name" v-model="firstname" required>
        </div>
      </div>

      <div class="field">
        <label class="label">Last Name</label>
        <div class="control">
          <input class="input" type="text" placeholder="Last Name" v-model="lastname" required>
        </div>
      </div>

      <div class="field">
        <label class="label">Email Address</label>
        <div class="control">
          <input class="input" type="email" placeholder="Email Address" v-model="emailaddress" required>
        </div>
      </div>

      <div class="field">
        <label class="label">Message</label>
        <div class="control">
          <input class="input" type="text" placeholder="Message" v-model="message" required>
        </div>
      </div>

      <div class="field">
        <div class="control">
          <button type="submit" class="button is-link" onClick="dashboard.vue">Post</button>
          <button type="button" class="button" style="margin-left:15px"><a href="/dashboard">Dashboard</a></button>
        </div>
      </div>

    </form>
  </section>

</template>


<script>
    import {db} from "../firebase/firebase.js"
    export default {
      name: 'new-contact',
      data () {
        return {
          firstname: null,
          lastname: null,
          emailaddress: null,
          message: null
        }
      },
      methods: {
        saveContact () {
          db.collection('posts').add({
            firstname: this.firstname,
            lastname: this.lastname,
            emailaddress: this.emailaddress,
            message: this.message,
            slug: this.generateUUID()
          })
            .then(function (docRef) {
              console.log('Document written with ID: ', docRef.id)
            })
            .catch(function (error) {
              console.error('Error adding document: ', error)
            })
        },
        generateUUID () {
          let d = new Date().getTime()
          let uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            let r = (d + Math.random() * 16) % 16 | 0
            d = Math.floor(d / 16)
            return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16)
          })
          return uuid
        }
      }
    }
</script>

<style scoped>

  section {
    height: 100vh;
  }

  h1 {
    font-size: 30px;
    margin: 30px 0;
  }

  .input {
    height: 40px;
  }

</style>
