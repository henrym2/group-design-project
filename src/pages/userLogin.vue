<template>
    <v-row class="ml-2 mr-2" style="height:97vh" align="center">  
        
        <div class="rect">
            <h2 class="slogan">PLATFORM SLOGAN</h2>
            <p class="description">Connecting Clinicians and Design Engineers to bring ideas from paper to prototype</p>
        </div>

        <div class="login"> 
            <h1 class="welcome">Welcome Back!</h1>
            <input type="text" class="textboxA" placeholder="e-mail">
            <input type="text" class="textboxB" placeholder="password">
            <button class="login-btn"><router-link to="projects" class="nav-link">{{"LOGIN"}}</router-link></button>
        <div class="terms"> 

        <div class="text-center">
            
            <v-dialog
                v-model="dialog"
                transition="dialog-bottom-transition"
                width="500"
            >
            
            <template v-slot:activator="{ on, attrs }">
            
                <a
                dark
                v-bind="attrs"
                v-on="on"
                >
                    By signing in I agree to the Privacy Policy and Terms of Service
                </a>
      
            </template>

            <v-card>
                
                <v-card-title class="headline grey lighten-2">
                    Terms & Conditions
                </v-card-title>

                <v-card-text>
                    <br>
                    <p>
                        Terms and Conditions
                        Last updated: March 02, 2021
                        
                        Please read these terms and conditions carefully before using Our Service. <br><br>

                        <b>Interpretation and Definitions</b> <br>
                        
                        The words of which the initial letter is capitalized have meanings defined under the following conditions. The following definitions shall have the same meaning regardless of whether they appear in singular or in plural.

                        Definitions
                        For the purposes of these Terms and Conditions:

                        Affiliate means an entity that controls, is controlled by or is under common control with a party, where "control" means ownership of 50% or more of the shares, equity interest or other securities entitled to vote for election of directors or other managing authority.

                        Country refers to: Ireland

                        Company (referred to as either "the Company", "We", "Us" or "Our" in this Agreement) refers to Health Form, 1 Trinity College Dublin.

                        Device means any device that can access the Service such as a computer, a cellphone or a digital tablet.

                        Service refers to the Website.

                        Terms and Conditions (also referred as "Terms") mean these Terms and Conditions that form the entire agreement between You and the Company regarding the use of the Service. This Terms and Conditions agreement has been created with the help of the Terms and Conditions Generator.

                        Third-party Social Media Service means any services or content (including data, information, products or services) provided by a third-party that may be displayed, included or made available by the Service.

                        Website refers to Health Forms, accessible from www.healthforms.com

                        You means the individual accessing or using the Service, or the company, or other legal entity on behalf of which such individual is accessing or using the Service, as applicable.

                        <br><br><b>Acknowledgment</b> <br>
                        These are the Terms and Conditions governing the use of this Service and the agreement that operates between You and the Company. These Terms and Conditions set out the rights and obligations of all users regarding the use of the Service.

                        Your access to and use of the Service is conditioned on Your acceptance of and compliance with these Terms and Conditions. These Terms and Conditions apply to all visitors, users and others who access or use the Service.

                        By accessing or using the Service You agree to be bound by these Terms and Conditions. If You disagree with any part of these Terms and Conditions then You may not access the Service.

                        You represent that you are over the age of 18. The Company does not permit those under 18 to use the Service.

                        Your access to and use of the Service is also conditioned on Your acceptance of and compliance with the Privacy Policy of the Company. Our Privacy Policy describes Our policies and procedures on the collection, use and disclosure of Your personal information when You use the Application or the Website and tells You about Your privacy rights and how the law protects You. Please read Our Privacy Policy carefully before using Our Service.

                        <br><br><b>Links to Other Websites</b> <br>
                        Our Service may contain links to third-party web sites or services that are not owned or controlled by the Company.

                        The Company has no control over, and assumes no responsibility for, the content, privacy policies, or practices of any third party web sites or services. You further acknowledge and agree that the Company shall not be responsible or liable, directly or indirectly, for any damage or loss caused or alleged to be caused by or in connection with the use of or reliance on any such content, goods or services available on or through any such web sites or services.

                        We strongly advise You to read the terms and conditions and privacy policies of any third-party web sites or services that You visit.

                        Termination
                        We may terminate or suspend Your access immediately, without prior notice or liability, for any reason whatsoever, including without limitation if You breach these Terms and Conditions.

                        Upon termination, Your right to use the Service will cease immediately.

                        <br><br><b>Limitation of Liability</b> <br>
                        Notwithstanding any damages that You might incur, the entire liability of the Company and any of its suppliers under any provision of this Terms and Your exclusive remedy for all of the foregoing shall be limited to the amount actually paid by You through the Service or 100 USD if You haven't purchased anything through the Service.

                        To the maximum extent permitted by applicable law, in no event shall the Company or its suppliers be liable for any special, incidental, indirect, or consequential damages whatsoever (including, but not limited to, damages for loss of profits, loss of data or other information, for business interruption, for personal injury, loss of privacy arising out of or in any way related to the use of or inability to use the Service, third-party software and/or third-party hardware used with the Service, or otherwise in connection with any provision of this Terms), even if the Company or any supplier has been advised of the possibility of such damages and even if the remedy fails of its essential purpose.

                        Some states do not allow the exclusion of implied warranties or limitation of liability for incidental or consequential damages, which means that some of the above limitations may not apply. In these states, each party's liability will be limited to the greatest extent permitted by law.

                        "AS IS" and "AS AVAILABLE" Disclaimer
                        The Service is provided to You "AS IS" and "AS AVAILABLE" and with all faults and defects without warranty of any kind. To the maximum extent permitted under applicable law, the Company, on its own behalf and on behalf of its Affiliates and its and their respective licensors and service providers, expressly disclaims all warranties, whether express, implied, statutory or otherwise, with respect to the Service, including all implied warranties of merchantability, fitness for a particular purpose, title and non-infringement, and warranties that may arise out of course of dealing, course of performance, usage or trade practice. Without limitation to the foregoing, the Company provides no warranty or undertaking, and makes no representation of any kind that the Service will meet Your requirements, achieve any intended results, be compatible or work with any other software, applications, systems or services, operate without interruption, meet any performance or reliability standards or be error free or that any errors or defects can or will be corrected.

                        Without limiting the foregoing, neither the Company nor any of the company's provider makes any representation or warranty of any kind, express or implied: (i) as to the operation or availability of the Service, or the information, content, and materials or products included thereon; (ii) that the Service will be uninterrupted or error-free; (iii) as to the accuracy, reliability, or currency of any information or content provided through the Service; or (iv) that the Service, its servers, the content, or e-mails sent from or on behalf of the Company are free of viruses, scripts, trojan horses, worms, malware, timebombs or other harmful components.

                        Some jurisdictions do not allow the exclusion of certain types of warranties or limitations on applicable statutory rights of a consumer, so some or all of the above exclusions and limitations may not apply to You. But in such a case the exclusions and limitations set forth in this section shall be applied to the greatest extent enforceable under applicable law.

                        <br><br><b>Governing Law</b> <br>
                        The laws of the Country, excluding its conflicts of law rules, shall govern this Terms and Your use of the Service. Your use of the Application may also be subject to other local, state, national, or international laws.

                        <br><br><b>Disputes Resolution</b> <br>
                        If You have any concern or dispute about the Service, You agree to first try to resolve the dispute informally by contacting the Company.

                        <br><br><b>For European Union (EU) Users</b> <br>
                        If You are a European Union consumer, you will benefit from any mandatory provisions of the law of the country in which you are resident in.

                        <br><br><b>United States Legal Compliance</b> <br>
                        You represent and warrant that (i) You are not located in a country that is subject to the United States government embargo, or that has been designated by the United States government as a "terrorist supporting" country, and (ii) You are not listed on any United States government list of prohibited or restricted parties.

                        <br><br><b>Severability and Waiver</b> <br>
                        If any provision of these Terms is held to be unenforceable or invalid, such provision will be changed and interpreted to accomplish the objectives of such provision to the greatest extent possible under applicable law and the remaining provisions will continue in full force and effect.

                        <br><br><b>Waiver</b> <br>
                        Except as provided herein, the failure to exercise a right or to require performance of an obligation under this Terms shall not effect a party's ability to exercise such right or require such performance at any time thereafter nor shall be the waiver of a breach constitute a waiver of any subsequent breach.

                        <br><br><b>Translation Interpretation</b> <br>
                        These Terms and Conditions may have been translated if We have made them available to You on our Service. You agree that the original English text shall prevail in the case of a dispute.

                        <br><br><b>Changes to These Terms and Conditions</b> <br>
                        We reserve the right, at Our sole discretion, to modify or replace these Terms at any time. If a revision is material We will make reasonable efforts to provide at least 30 days' notice prior to any new terms taking effect. What constitutes a material change will be determined at Our sole discretion.

                        <br><br>By continuing to access or use Our Service after those revisions become effective, You agree to be bound by the revised terms. If You do not agree to the new terms, in whole or in part, please stop using the website and the Service.

                        <br><br>Contact Us<br>
                        If you have any questions about these Terms and Conditions, You can contact us:<br>

                        By email: office@mycompany.com</p>
                    </v-card-text>

                        <v-divider>
                            
                        </v-divider>

                    <v-card-actions>
                    <v-spacer></v-spacer>
                    
                        <v-btn
                            color="primary"
                            text
                            @click="dialog = false"
                        >
                            I accept
                        </v-btn>

                    </v-card-actions>
                </v-card>
            </v-dialog>
        </div>
        
        </div>

            <p class="create-link"> Don’t have an account?</p>                        
            <button class="create-link1">  <router-link to="clinicianSignup" class="nav-link">{{"Clinican Sign Up"}}</router-link> </button>                        
            <button class="create-link2">  <router-link to="engineerSignup" class="nav-link">{{"Engineer Sign Up"}}</router-link> </button>                        
        
        
        </div>  
    </v-row>
</template>


<script>
 import * as fb from "../firebase/firebase.js"

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

} 
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

        color: rgb(0, 0, 0) !important;

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