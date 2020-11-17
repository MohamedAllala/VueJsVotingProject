<template>
 <div>
        <div class="col-md-2">

        </div>

     <div class="container-fluid col-md-8">
                <router-link :to="{ name: 'addSurvey'}" class="btn btn-info btn-flat m-b-10 m-l-5"><i class="ti-plus"> new Survey</i></router-link>   

                <div class="row">

                    <div class="col-lg-6"  v-for="survey in Survey" :key="survey.id">
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
                                                 <td class="color-danger">${{survey.reward}}</td>
                                           </tr>
                                                
                                                <tr>
                                                    <td >End date</td> 
                                                    <td >{{survey.endDate|formatDate}}</td> 
</tr>

                                           
                                                     <div class="button-list col-md-8 ">
                                            <div class="btn-group">
                                             

                                                <router-link :to="{name: 'addQuestions', params: { id: survey._id  }}" class="btn btn-warning btn-flat m-b-10 m-l-5">
                                                 <i class="ti-plus"></i>
                                                </router-link>

                                                <router-link :to="{name: 'editSurvey', params: { id: survey._id  }}" class="btn btn-success btn-rounded m-b-10 m-l-5">
                                                    <i class="fa fa-edit"></i>
                                                </router-link>
                                                <button class="btn btn-danger btn-rounded m-b-10 m-l-5" @click="deletesurvey(survey._id)">
                                                    <i class="fa fa-eraser"></i>
                                                </button>
                                                 <router-link :to="{ name: 'stat', params: { id: survey._id }}" class="btn btn-primary btn-flat m-b-10 m-l-5"><i class="fa fa-bar-chart"></i></router-link>   
                                                
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
           
        }
    },
    created: function() {
         if(this.$session.get('userId')==null) {
          this.$router.push('/');
      }
    
    },
        mounted() {
            
        axios.get('http://localhost:3000/api/surveys/getbyEntreprise/5ad9a2f446f7e219c48e6ec0')
            .then((response) => {
                console.log(response.data);
                this.Survey = response.data;
              
            })
            .catch((error) => {
                console.log(error);
            });
    },
     methods: {
 deletesurvey(id) {
            
            this.$swal({
          title: 'Are you sure?',
          text: 'You can\'t revert your action',
          type: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Yes Delete it!',
          cancelButtonText: 'No, Keep it!',
          showCloseButton: true,
          showLoaderOnConfirm: true
        }).then((result) => {
          if(result.value) {
            this.$swal('Deleted', 'You successfully deleted this survey', 'success')
             axios.delete('http://localhost:3000/api/surveys/' + id)
                .then(result => {
                    console.log(id);
                });
            window.location.reload();
           
          } else {
            this.$swal('Cancelled', 'Your survey is still intact', 'info')
            
          }
        })
            

        }


  
  }

}
</script>

<style>
  
</style>