<template>
  

   <div>
        <div class="col-md-2">

        </div>

     <div class="container-fluid col-md-8">
               
                <div class="row">
                    <div class="col-12">
  <div class="card">
                            <div class="card-body">
                                <h4 class="card-title">historic survey</h4>
                               
                                <div class="table-responsive m-t-40"  >
                                    
                                    <table id="example23" class="display nowrap table table-hover table-striped table-bordered" cellspacing="0" width="100%">
                                        
                                        <thead>
                                            <tr>
                                                <th>Name</th>
                                                <th>Description</th>
                                                <th>reward</th>
                                            
                                                <th>Start date</th>
                                                <th>End date</th>
                                            </tr>
                                        </thead>
                                      
                                        <tbody >
                                            <tr v-for="survey in Survey" :key="survey.id">
                                                <td>{{survey.name}}</td>
                                                <td>{{survey.description}}</td>
                                                <td>${{survey.reward}}</td>
                                                <td>{{survey.startDate|formatDate}}</td>
                                                <td>{{survey.endDate|formatDate}}</td>
                                            </tr>
                                           
                                   
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
            

        axios.get('http://localhost:3000/api/surveys/historicsurvey')
            .then((response) => {
                console.log(response.data);
                this.Survey = response.data;
             
              
            })
            .catch((error) => {
                console.log(error);
            });
    }

}
</script>
