<template>
    <v-row no-gutters >  
        <div class="rect">
            <h2 class="slogan">PLATFORM SLOGAN</h2>
            <p class="description">Connecting Clinicians and Design Engineers to bring ideas from paper to prototype</p>
        </div>

        <div class="login"> 
            <h1 class="welcome">Welcome Back!</h1>
            <input type="text" class="textboxA" placeholder="e-mail">
            <input type="text" class="textboxB" placeholder="password">
            <button class="login-btn"><router-link to="projects" class="nav-link">{{"LOGIN"}}</router-link></button>

            <p class="terms"> <router-link to="T&C" class="nav-link">{{"By signing in I agree to the Privacy Policy and Terms of Service"}}</router-link> </p>
            <p class="create-link"> Don’t have an account? <router-link to="signup" class="nav-link">{{"Sign Up"}}</router-link> </p>                        
        </div>  
      </v-row>
</template>

<script>
/* import * as fb from "../firebase/firebase.js"

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
    methods: {
        async login () {
            const { email, password } = this.loginDetails
            try {
                const { user } = await fb.auth.signInWithEmailAndPassword(email, password)
                console.log(user.toJSON())
                const userProfile = await fb.users.doc(user.uid).get()
                console.log(userProfile.exists)
                if (userProfile.exists) {
                    this.authFailed = false
                    sessionStorage.setItem('auth', 'true')
                    sessionStorage.setItem("user", JSON.stringify(userProfile.data()))
                    this.$router.push("projects")
                } else {
                    this.authFailed = true
                }
            } catch (e) {
                console.log("Login fail")
                this.authFailed = true
            }
        }
    }

} */
</script>

<style>
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
        height: 100vh;

        background: #0C162B;
    }

   

    .login{
        position: absolute;
        left: 34.32%;
        right: 0%;
        top: 0%;
        bottom: 0%;

        height: 100vh;
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

        color: #FFFFFF !important;

        font-family: Rubik;
 
    }

    .login-btn a {
        color: #FFFFFF !important;
    }

    .terms{
        position: absolute;
        left: 18.71%;
        right: 12.39%;
        top: 78.95%;
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
        top: 85.64%;
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