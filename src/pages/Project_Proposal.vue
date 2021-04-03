<template>
    <v-row class="ml-2 mr-2" style="height:97vh" align="center">
        <div class="column is-two-thirds">
            <section class="section">
                <h1 class="title">Clinician Form Submission Form</h1>
                <p class="subtitle">
                    Please fill the form below as much as possible
                </p>
                <hr>
                <!-- form starts here -->
                <section class="form">
                    <form v-on:submit.prevent="$validator.validateAll(); console.log(form);">
                        <div class="field">
                            <label class="label">Name</label>
                            <div class="control">
                                <input name="name" v-model="form.name" v-validate="'required|min:3'" v-bind:class="{'is-danger': errors.has('name')}" class="input" type="text" placeholder="Full name">
                            </div>
                            <p class="help is-danger" v-show="errors.has('name')">
                                {{ errors.first('name') }}
                            </p>
                        </div>

                        <div class="field">
                            <label class="label">Email</label>
                            <div class="control">
                                <input name="email" v-model="form.email" v-validate="'required|min:3'" v-bind:class="{'is-danger': errors.has('email')}" class="input" type="text" placeholder="Email Address">
                            </div>
                            <p class="help is-danger" v-show="errors.has('email')">
                                {{ errors.first('email') }}
                            </p>
                        </div>

                        <div class="field">
                            <label class="label">What do you need to be built</label>
                            <div class="control">
                                <textarea name="message" class="textarea" v-validate="'required|min:5'" placeholder="Message" v-bind:class="{'is-danger': errors.has('message')}" v-model="form.message"></textarea>
                            </div>
                            <p class="help is-danger" v-show="errors.has('message')">
                                {{ errors.first('message') }}
                            </p>
                        </div>

                        <div class="field">
                            <label class="label">Area of Healthcare</label>
                            <div class="control">
                                <center>
                                <div class="select">
                                    <select v-model="form.healthcareArea">
                                        <option value="">Please Select</option>
                                        <option v-for="option in options.inquiry" v-bind:value="option.value" v-bind:key="option.key">
                                            {{ option.text }}
                                        </option>
                                    </select>
                                </div>
                                 </center>
                            </div>
                        </div>
                        <div class="field">
                            <div class="control">
                                <label class="checkbox">
                                    <input type="checkbox" v-model="form.terms">
                                    I agree to the<p class="terms"> <router-link to="T&C" class="nav-link">{{"Privacy Policy and Terms of Service"}}</router-link> </p>
                                </label>
                            </div>
                        </div>
                        <div class="field is-grouped">
                            <div class="control">
                                <input type="submit" value="Submitted" v-bind:disabled="errors.any()" class="button is-primary">
                            </div>
                        </div>

                    </form>
                </section>
            </section>
        </div>
        <div class="column">
            <section class="section" id="results">
                <div class="box">
                    <ul>
                        <li v-for="(item, k) in form" v-bind:key="k">
                            <strong>{{ k }}:</strong> {{ item }}</li>
                    </ul>

                </div>
            </section>
        </div>
    </v-row>
</template>

<script>
    import VeeValidate from 'vee-validate';
    VeeValidate.Validator.extend("polite", {
        getMessage: field => `You need enter at least 5 words in ${field} field`,
        validate: value => value.toLowerCase().indexOf("please") !== -1
    });
    export default {
        name: "VNTForm",
        data: () => ({
            form: {
                name: "",
                email: "",
                message: "",
                healthcareArea: "",
                terms: false,
                submitted: false,
            },
            options: {
                inquiry: [
                    { key: 1, value: "Allergy and immunology", text: "Allergy and immunology" },
                    { key: 2, value: "Anesthesiology", text: "Anesthesiology" },
                    { key: 3, value: "Dermatology", text: "Dermatology" },
                    { key: 4, value: "Dental", text: "Dental" },
                    { key: 5, value: "Diagnostic radiology", text: "Diagnostic radiology" },
                    { key: 6, value: "Emergency medicine", text: "Emergency medicine" },
                    { key: 8, value: "Internal Medicine", text: "Internal Medicine" },
                    { key: 9, value: "Neurology", text: "Neurology" },
                    { key: 10, value: "Nuclear medicine", text: "Nuclear medicine" },
                    { key: 11, value: "Obstetrics and gynecology", text: "Obstetrics and gynecology" },
                    { key: 12, value: "Ophthalmology", text: "Ophthalmology" },
                    { key: 13, value: "Pathology", text: "Pathology" },
                    { key: 14, value: "Pediatrics", text: "Pediatrics" },
                    { key: 15, value: "Psychiatry", text: "Psychiatry" },
                    { key: 16, value: "Radiation oncology", text: "Radiation oncology" },
                    { key: 17, value: "Surgery", text: "Surgery" },
                    { key: 18, value: "Urology", text: "Urology" }
                ]
            }
        })
    }
</script>

<style scoped>
    #results {
        position: fixed;
        right: 10%;
        top: 15%;
    }
</style>
