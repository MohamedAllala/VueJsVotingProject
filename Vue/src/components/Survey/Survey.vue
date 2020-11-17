<template>
    <div>
        <div class="col-md-2">

        </div>

        <div class="container-fluid col-md-8">
            <select v-on:input="test($event.target.value)">
                <option value="">Choose</option>
                <option value="choice1">By reward</option>
                <option value="choice2">By entreprise </option>

            </select>
            <br/>
            <br/><br/>
            <div class="form-group">
                <div class="input-group input-group-default">
                    <span class="input-group-btn">
                        <button class="btn btn-primary" type="submit" @click="search">
                            <i class="ti-search"></i>
                        </button>
                    </span>
                    <input type="text" v-model="searchitem" placeholder="Search " name="Search" class="form-control">
                </div>
            </div>
            <div class="row">

                <div class="col-lg-6" v-for="survey in Survey" :key="survey.id">
                    <div class="card">
                        <div class="card-title">
                            <h4>{{survey.name}} </h4>

                        </div>
                        <div class="card-body">
                            <div class="table-responsive">
                                <table class="table">

                                    <tbody>

                                        <tr>

                                            <td>{{survey.description}}</td>
                                            <td class="color-danger">{{survey.reward}}$</td>
                                        </tr>

                                        <tr>
                                            <td>{{survey.createdBy.name}}</td>
                                            <td>{{survey.endDate|formatDate}}</td>
                                        </tr>

                                        <div class="button-list col-md-8 ">
                                            <div class="btn-group">
                                                <router-link :to="{ name: 'detailSurvey', params: { id: survey._id }}" class="btn btn-success">Details</router-link>
                                                <social-sharing url="https://vuejs.org/" title="The Progressive JavaScript Framework" description="Intuitive, Fast and Composable MVVM for building interactive interfaces." quote="Vue is a progressive framework for building user interfaces." hashtags="vuejs,javascript,framework" twitter-user="vuejs" inline-template>

                                                    <network network="facebook" class="btn btn-info btn-flat m-b-10 m-l-5 custombtn" style="margin-top: 5px !important;padding-bottom: 0px;height: 37px;bottom: 0;    margin-bottom: 1px !important;">
                                                        <i class="fa fa-facebook"></i> Facebook
                                                    </network>

                                                </social-sharing>
                                            </div>
                                        </div>

                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </div>
</template>

<script>
/* eslint-disable */
import axios from 'axios';
import moment from 'moment'
export default {
    name: 'getsurvey',
    data() {
        return {
            Survey: [],
            user: {
                solde: '',
                _id: '',
                email: '', password: '', name: '', role: '', picture: ''
            },
            searchitem: ''

        }
    },
    mounted() {

        if (this.$session.get('userId') == null) {
            this.$router.push('/');
        }
        axios.get('http://localhost:3000/api/surveys/survey')
            .then((response) => {
                console.log(response.data);
                this.Survey = response.data;

            })
            .catch((error) => {
                console.log(error);
            });
    },
    methods: {

        test: function(value) {
            if (value === "choice1") {
                this.$router.push({ name: 'SortedSurveys' });
            }
            if (value === "choice2") {
                this.$router.push({ name: 'SortedByEntreprise' });
            }
        },
        search() {


            axios.get('http://localhost:3000/api/surveys/search/' + this.searchitem)
                .then((response) => {
                    console.log(response.data);
                    this.Survey = response.data;

                })
                .catch((error) => {
                    console.log(error);
                });
        }

    }

}
</script>

<style>

</style>