<template>
    <v-row  align="center">  
        
        <div class="rect">
            <h2 class="slogan">Clini-link</h2>
            <p class="description">Connecting Clinicians with Engineers to bring ideas from paper to prototype</p>
        </div>
        <div class="login"> 
            <h1 class="welcome">Welcome Back!</h1>
            
                <input type="text" v-model="loginDetails.email" class="textboxA" placeholder="e-mail">
                <input type="password" v-model="loginDetails.password" class="textboxB" placeholder="password">            
            
            <tand-c></tand-c>
            

            <p v-if="authFailed" style="color:red">Email or password not found</p> 

            <button class="login-btn" @click="login">Login</button>
            <p class="create-link"> Don’t have an account?</p>     

            <eng></eng>  
            <clinician></clinician>                   
            
        </div>  
    </v-row>
</template>


<script>
import * as fb from "../firebase/firebase.js"
import TandC from "../components/TandC.vue"
import eng from "../components/EngineerSignup.vue"
import clinician from "../components/ClinicianSignup.vue"


export default {
    name: "Login",
    data () {
        return {
            loginDetails: {
                email: "",
                password: ""
            },
            authFailed: false
        }
    },
    components: {
        TandC,
        clinician,
        eng
    },
    methods: {
        async login () {
            const { email, password } = this.loginDetails
            try {
                const { user } = await fb.auth.signInWithEmailAndPassword(email, password)
                const userProfile = await fb.users.doc(user.uid).get()
                if (userProfile.exists) {
                    console.log("login")
                    this.authFailed = false
                    sessionStorage.setItem('auth', 'true')
                    sessionStorage.setItem("user", JSON.stringify(userProfile.data()))
                    sessionStorage.setItem("userid", userProfile.id)
                    this.$router.push("/profile")
                } else {
                    this.authFailed = true
                }
            } catch (e) {
                console.log("Login fail")
                console.log(e)
                this.authFailed = true
            }
        }
    }

} 
</script>

<style scoped>
    .slogan{
        position: absolute;
        left: 10.77%;
        right: 70.32%;
        top: 46.38%;
        bottom: 50.31%;

        height: 16px;
        width: 50%;
        text-align: left;

        font-family: Rubik;
        font-style: normal;
        font-weight: 380;
        font-size: 30px;
        line-height: 45px;
        text-transform: uppercase;

        padding-bottom: 50px;

        color: #FFFFFF;
    }

    .description{
        position: absolute;
        left: 10.77%;
        right: 70.32%;
        top: 52.38%;
        bottom: 50.31%;

        height: 16px;
        width: 50%;
        text-align: left;

        font-family: Rubik;
        font-style: normal;
        font-weight: 50;
        font-size: 18px;

        color: #FFFFFF;
        padding-top: 50px;
    }

    .rect{
        position: absolute;
        left: 0%;
        right: 65.68%;
        top: 0%;
        bottom: 0%;

        background: #0C162B;
    }


    .login{
        position: absolute;
        left: 34.32%;
        right: 0%;
        top: 0%;
        bottom: 0%;

        margin: 0px; 
        padding: 0px;

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
        top: 70.01%;
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

        color: rgb(255, 255, 255) !important;

        font-family: Rubik;
 
    }

    .login-btn a {
        color: #FFFFFF !important;
    }

    

    .create-link{
        position: absolute;
        left: 45.71%;
        right: 20.39%;
        top: 82%;
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

    .create-link1{

        position: absolute;
        left: 40.06%;
        right: 15.87%;
        top: 87.01%;
        bottom: 32.3%;

        background: rgb(26, 140, 160);
        border-radius: 8px;
        
        height: 25px;
        width: 30%;

        font-family: Rubik;
        font-style: normal;
        font-weight: 300;
        font-size: 13.5px;
        line-height: 14px;
        align-items: center;
        text-align: center;
        letter-spacing: 3px;
        text-transform: capitalize;

        color: #FFFFFF !important;

        font-family: Rubik;
 
    }
    .create-link1 a {
        color: #FFFFFF !important;
    }
    .create-link2{
         position: absolute;
        left: 40.06%;
        right: 15.87%;
        top: 92.01%;
        bottom: 32.3%;

        background: rgb(26, 140, 160);
        border-radius: 8px;
        
        height: 25px;
        width: 30%;

        font-family: Rubik;
        font-style: normal;
        font-weight: 300;
        font-size: 13.5px;
        line-height: 14px;
        align-items: center;
        text-align: center;
        letter-spacing: 3px;
        text-transform: capitalize;

        color: #FFFFFF !important;

        font-family: Rubik;
    }
    .create-link2 a {
        color: #FFFFFF !important;
    }

</style>