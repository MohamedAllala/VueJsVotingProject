<template>
<div>


<div class="col-md-2">
        
    </div>
 <div class="container-fluid col-md-8">

   <div class="col-lg-12">
                        <div class="card">
                            <div class="card-body">
                                <h4 class="card-title">{{Election.type}}</h4>
                                <div class="card-content">
                                    <div class="todo-list">
                                        <div class="tdl-holder">
                                            <div class="tdl-content">
                                                <ul>
                                                    <li>
                                                        <label>
															<input type="checkbox"><i class="bg-primary"></i><span>This election starts {{Election.startdate|formatDate}}</span>
															<a href='#' class="ti-close"></a>
														</label>
                                                    </li>
                                                    <li>
                                                        <label>
															<input type="checkbox" ><i class="bg-success"></i><span>This election ends {{Election.enddate|formatDate}}</span>
														{{Election.deployed}}
                                                        
                                                        
                                                        	<a href='#' class="ti-close"></a>
														</label>
                                                    </li>
                                                    <li>

                                                        <label>
														
                                                            <div v-for="item , index in Election.candidate">
                                                            	<input type="checkbox" ><i class="bg-warning"></i><span>Candidate :
                                                             
                                                            </span> 
                                                        {{index}}    {{item}}
                                                            
                                                          
</div>
															<a href='#' class="ti-close"></a>
														</label>
                                                    </li>
                                                 

                                                </ul>
                                            </div>
                                            <button class="btn btn-danger btn-rounded m-b-30 l-l-5"  style ="background-color:#ef5350;border-color:#ef5350;width:100%;"@click="deployerContract"> 
                                                   Start <i class="fa fa-hourglass-start"></i>
                                                </button> 
                                        </div>
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
    
    data() {
        return {
            Election: [],
            
        }
    },
        mounted() {
             if(this.$session.get('userId')==null) {
          this.$router.push('/');
      }
        axios.get('http://localhost:3000/api/election/'+ this.$route.params.id)
            .then((response) => {
               
                this.Election = response.data;
             
            })
            .catch((error) => {
                console.log(error);
            });
    },
 methods: {
    
     deployerContract(){
           axios.get('http://localhost:3000/api/interact/'+ this.$route.params.id)
            .then((response)=>{
         this.$swal('GOOD', 'ELECTION STARTED! ', 'success').then(res => {
                   
                 this.$router.push('/election')

                })
            });
            
     }
 }
  
  }


</script>

<style>
  
</style>