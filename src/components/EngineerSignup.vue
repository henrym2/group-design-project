<template>
  <div>
    <b-button class="butt" v-b-modal.modal-center >Engineer Sign-Up</b-button>

    <b-modal
      id="modal-center"
      ref="modal"
      centered title="Sign-up as an Engineer"
      @show="resetModal"
      @hidden="resetModal"
      hide-footer
    >
      <form ref="form">
        <b-form-group
          label="Full Name"
          label-for="name-input"
          invalid-feedback="Name is required"  
        >
          <b-form-input
            id="name-input"
            v-model="signUpData.name"
            :state="nameState"
            required
          ></b-form-input>
        </b-form-group>

        <b-form-group
          label="E-mail Address"
          label-for="email-input"
          invalid-feedback="Email is required"
          :state="nameState" 
        >
          <b-form-input
            id="email-input"
            v-model="signUpData.email"
            :state="nameState"
            required
          ></b-form-input>
        </b-form-group>

        <b-form-group
          label="Password"
          label-for="password-input"
          invalid-feedback="Name is required"
        >
          <b-form-input
            id="password-input"
            v-model="signUpData.password"
           :state="nameState"
            required
          ></b-form-input>
        </b-form-group>

        <b-form-group
          label="Repeat Password"
          label-for="repeat-password-input"
          invalid-feedback="Name is required"
          :state="nameState" 
        >
          <b-form-input
            id="repeat-password-input"
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
                name: "",
                email: "",
                password: "",
                repeatPass: "",
                engineernumber: ""
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
                // const membership = await (await fetch(`https://www.engineersireland.ie/DesktopModules/Inventise.EIL.API/V1/API/Member/GetMemberByName?CountryID=0&CountyID=0&IsChartered=false&MemberName=${this.signUpData.name}&Results=5`)).json()
                // if (membership.length == 0) return;
                // console.log(membership)
                await fb.users.doc(user.uid).set(
                    {
                        uid: user.uid,
                        email, 
                        name, 
                        role: "engineer", 
                        about: "",
                        skills: [],
                        experience: [],
                        qualifications: [],
                        validated: true,
                        comments: []
                    }
                )
                const userProfile = await fb.users.doc(user.uid).get()
                sessionStorage.setItem('user', JSON.stringify(userProfile.data()))
                sessionStorage.setItem("auth", 'true')
                sessionStorage.setItem('userid', user.uid)
                await this.$router.push("profile")
            } catch (e) {
                console.log("Signup fail")
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
.butt{
        position: absolute;

        right: 30.39%;
        bottom: 8.12%;

        color: #1555D4 !important;
        background: #fff !important;
    }
</style>