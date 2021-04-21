<template>
  <div >
    <b-button  class="butt1" v-b-modal.my-modal >Clinican Sign-Up</b-button>

    <b-modal
      id="my-modal"
      ref="modal"
      centered title="Sign-up as a Clinician"
      @show="resetModal"
      @hidden="resetModal"
      hide-footer
    >
      <form ref="form">
        <b-form-group
          label="Full Name"
          label-for="name-input1"
          invalid-feedback="Name is required"  
        >
          <b-form-input
            id="name-input1"
            v-model="signUpData.name"
            :state="nameState"
            required
          ></b-form-input>
        </b-form-group>

        <b-form-group
          label="E-mail Address"
          label-for="email-input1"
          invalid-feedback="Email is required"
          :state="nameState" 
        >
          <b-form-input
            id="email-input1"
            v-model="signUpData.email"
            :state="nameState"
            required
          ></b-form-input>
        </b-form-group>

        <b-form-group
          label="Password"
          label-for="password-input1"
          invalid-feedback="Name is required"
        >
          <b-form-input
            id="password-input1"
            v-model="signUpData.password"
           :state="nameState"
            required
          ></b-form-input>
        </b-form-group>

        <b-form-group
          label="Repeat Password"
          label-for="repeat-password-input1"
          invalid-feedback="Name is required"
          :state="nameState" 
        >
          <b-form-input
            id="repeat-password-input1"
            v-model="signUpData.repeatPass"
            :state="nameState"
            required
          ></b-form-input>
        </b-form-group>
          <b-button style="background:#1555D4 !important" @click="signUp">Sign Up</b-button>
      </form>

    </b-modal>
  </div>
</template>

<script>
import * as fb from "../firebase/firebase.js"

  export default {
    name: "SignUp",
    data () {
        return {
            signUpData: {
                email: "",
                password: "",
                repeatPass: "",
                name: ""
            },
            snack: {
                state: false,
                text: "",
                color: ""
            }
        }
    },
    methods: {
        async signUp () {
            const { email, password, name } = this.signUpData
            //Fail early if fields are empty somehow
            if (!this.validateLogin(this.signUpData)) {
                return 
            }
            try {
                const { user } = await fb.auth.createUserWithEmailAndPassword(email, password)
                await fb.users.doc(user.uid).set({uid: user.uid, email, name, role: "clinician", projects: [], about: "", collaborators: []})
                const userProfile = await fb.users.doc(user.uid).get()
                sessionStorage.setItem('user', JSON.stringify(userProfile.data()))
                sessionStorage.setItem("auth", 'true')
                sessionStorage.setItem("userid", user.uid)
                this.snack = {
                    state: true,
                    text: "Signup success!",
                    color: "success"
                }
                await this.$router.push("profile")
            } catch (e) {
                console.log(e)
                console.log("Signup fail")
                this.snack = {
                    state: true,
                    text: "Signup failed, please try again",
                    color: "error"
                }
            }
        },
        validateLogin(signUpData) {
            const { email, password, repeatPass, name } = signUpData
            if (email === "" || password === "" || name === "" || repeatPass === "") {
                return false
            } else if (password !== repeatPass) {
                return false
            }
            return true

        },
      resetModal() {
        this.name = ''
        this.nameState = null
      }
    }
  }
</script>

<style>
.butt1{
        position: absolute;

        left: 36.71%;
        right: 12.39%;
        bottom: 8.12%;

        color: #1555D4 !important;
        background: #fff !important;
    }
</style>