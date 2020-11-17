<template>
<div>
        <div class="col-md-2">

        </div>

     <div class="container-fluid col-md-8">
  
        <select  v-on:input="test($event.target.value)" >
  <option  value="">Choose</option>
  <option value="choice1">By reward</option>
  <option value="choice2">By entreprise </option>
 
</select>
<br/>
<br/><br/>
     <div class="row">

                    <div class="col-lg-6" v-for="survey in Survey" :key="survey.id">
                        <div class="card" >
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
                                                    <td >{{survey.createdBy.name}}</td> 
                                                    <td >{{survey.endDate|formatDate}}</td> 
</tr>

                                           
                                                     <div class="button-list col-md-8 ">
                                            <div class="btn-group">
                         <router-link :to="{ name: 'detailSurvey', params: { id: survey._id }}" class="btn btn-success">Details</router-link>               
 
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
export default {
    name:'getsurvey',
    data() {
        return {
            Survey: [],
            user: {
                solde: '',
                _id: '',
                email: '', password: '', name: '', role: '', picture: ''
            }

        }
    },
    created: function() {
         if(this.$session.get('userId')==null) {
          this.$router.push('/');
      }
    
    },

    

        mounted() {
            

        axios.get('http://localhost:3000/api/surveys/sort')
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
        }


  
  }

}
</script>

<style>
  
</style>