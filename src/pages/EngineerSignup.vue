<template>
      <v-row class="ml-2 mr-2" align="center">
          
        <div class="rect">
            <h2 class="slogan">Clini-link</h2>
            <p class="description">Connecting Clinicians and Design Engineers to bring ideas from paper to prototype</p>
        </div>

        <div class="login"> 
            <div class="content">
                <h1 class="welcome">Engineer Sign up!</h1>
                <input type="text" class="textboxD" placeholder="Full Name" v-model="signUpData.name">
                <input type="text" class="textboxA" placeholder="E-mail Address" v-model="signUpData.email">
                <input type="text" class="textboxB" placeholder="Password" v-model="signUpData.password">
                <input type="text" class="textboxC" placeholder="Repeat Password" v-model="signUpData.repeatPass">
                <input type="text" class="textboxE" placeholder="Engineer Ireland Number" v-model="signUpData.engineernumber">
                <button class="login-btn" @click="signUp">Sign Up</button>


                <p class="terms"> <router-link to="T&C" class="nav-link">{{"By signing in I agree to the Privacy Policy and Terms of Service"}}</router-link> </p>

            </div>
        </div>
      </v-row>
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
                await fb.users.doc(user.uid).set({email, name, role: "engineer", about: ""})
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

        }
    }
}
</script>


<style>
    .slogan{
        position: absolute;
        left: 20.77%;
        right: 70.32%;
        top: 46.38%;
        bottom: 50.31%;

        height: 16px;
        width: 50%;
        text-align: center;

        font-family: Rubik;
        font-style: normal;
        font-weight: 380;
        font-size: 30px;
        line-height: 45px;
        text-transform: uppercase;

        padding: 15px;

        color: #FFFFFF;
    }

    .description{
        position: absolute;
        left: 20.77%;
        right: 70.32%;
        top: 52.38%;
        bottom: 50.31%;

        height: 16px;
        width: 50%;
        text-align: center;

        font-family: Rubik;
        font-style: normal;
        font-weight: 50;
        font-size: 18px;
        line-height: 45px;

        color: #FFFFFF;
        padding: 20px;
    }

    .rect{
        position: absolute;
        left: 0%;
        right: 65.68%;
        top: 0%;
        bottom: 0%;

        background: #0C162B;
    }

    .content{
        height: 329px;
        width: 264px;
        left: 382px;
        top: 88px;
    }

    .login{
        position: absolute;
        left: 34.32%;
        right: 0%;
        top: 0%;
        bottom: 0%;

        background: #FFFFFF;
    }

    .welcome{
        position: absolute;
        left: 22%;
        right: 15.1%;
        top: 30.22%;
        bottom: 76.19%;

        font-family: Rubik;
        font-style: normal;
        font-weight: 500;
        font-size: 48px;
        line-height: 36px;
        text-align: center;
        text-transform: uppercase;

        color: #0C162B;
    }

    .textboxA{
        height: 55px;
        width: 50%;
       
        border-radius: 8px;

        position: absolute;
        left: 28.06%;
        right: 15.87%;
        top: 45.37%;
        bottom: 56.94%;

        background: #EEF1F5;

        padding: 10px;
    }

    .textboxB{
        height: 55px;
        width: 50%;
       
        border-radius: 8px;

        position: absolute;
        left: 28.06%;
        right: 15.87%;
        top: 55.37%;
        bottom: 56.94%;

        background: #EEF1F5;

        padding: 10px;
    }
    .textboxC{
        height: 55px;
        width: 50%;
       
        border-radius: 8px;

        position: absolute;
        left: 28.06%;
        right: 15.87%;
        top: 65.37%;
        bottom: 56.94%;

        background: #EEF1F5;

        padding: 10px;
    }
        .textboxD{
        height: 55px;
        width: 50%;
       
        border-radius: 8px;

        position: absolute;
        left: 28.06%;
        right: 15.87%;
        top: 35.37%;
        bottom: 56.94%;

        background: #EEF1F5;

        padding: 10px;
    }

    .textboxE{
        height: 55px;
        width: 50%;
       
        border-radius: 8px;

        position: absolute;
        left: 28.06%;
        right: 15.87%;
        top: 75.37%;
        bottom: 56.94%;

        background: #EEF1F5;

        padding: 10px;
    }

    ::placeholder{
        font-family: Rubik;
        font-style: normal;
        font-weight: normal;
        font-size: 12px;
        line-height: 13px;
        display: flex;
        align-items: center;
        text-transform: capitalize;

        padding-left: 8px;

        color: rgba(82, 84, 88, 0.78);
    }

    .login-btn{
        position: absolute;
        left: 28.06%;
        right: 15.87%;
        top: 85.01%;
        bottom: 32.3%;

        background: #1555D4;
        border-radius: 8px;
        
        height: 55px;
        width: 50%;

        font-family: Rubik;
        font-style: normal;
        font-weight: 300;
        font-size: 13.5px;
        line-height: 14px;
        align-items: center;
        text-align: center;
        letter-spacing: 3px;
        text-transform: capitalize;

        color: #FFFFFF;

        font-family: Rubik;
 
    }

    .terms{
        position: absolute;
        left: 18.71%;
        right: 12.39%;
        top: 92.95%;
        bottom: 21.12%;

        font-family: Rubik;
        font-style: normal;
        font-weight: normal;
        font-size: 12px;
        line-height: 14px;
        /* or 156% */

        align-items: center;
        text-align: center;
        text-decoration-line: underline;

        color: rgba(82, 84, 88, 0.58) !important;
    }

    .create-link{
        position: absolute;
        left: 45.71%;
        right: 20.39%;
        top: 83.64%;
        bottom: 12.42%;
        width: 193px;

        font-family: Rubik;
        font-style: normal;
        font-weight: 500;
        font-size: 12px;
        line-height: 14px;
        /* or 156% */

       
        text-align: center;

        color: #525458;
    }

</style>