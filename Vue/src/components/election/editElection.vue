<template>
  <div class="page-wrapper">
   <div class="container-fluid">
               
                <div class="row">
                    <div class="col-lg-6">
                        <div class="card card-outline-primary">
                            <div class="card-header">
                                <h4 class="m-b-0 text-white"><b>  Edit an election </b>  </h4>
                            </div>
                            <div class="card-body">
                                <form>
                                    <div class="form-body">
                                        <h3 class="card-title m-t-15"><b>  Election:</b>  </h3>
                                        <hr>
                                        <div class="row p-t-20">
                                            <div class="col-md-12">
                                                <div class="form-group">
                                                 <label class="control-label"> <b>  Type </b>  </label>    
                                                    
                                                       <b>         <input type="text" class="form-control" placeholder=" Name"  name="type" v-bind:value="Election.type"
:value="Election.type" 
   v-on:input="Election.type = $event.target.value">  </b>    
                                                    
                                                    
                                                    
                                                     </div>
                                            </div>
                                            <!--/span-->
                                           
                                            <!--/span-->
                                        </div>
                                        <!--/row-->
                                        <div class="row">
                                            <div class="col-md-6">
                                          
                                            </div>
                                          
                                        </div>
                                        <!--/row-->
                                        <div class="row">
                                            <div class="col-md-6">
                                                <div class="form-group">
                                                    <label class="control-label"><b>  End date</b>  </label>
 <b>  <input type="text" class="form-control" placeholder=" Name"  name="enddate" v-bind:value="Election.enddate"
:value="Election.enddate|formatDate" 
   v-on:input="Election.enddate = $event.target.value">     </b>                                             </div>
                                            </div>
                                             <div class="col-md-6">
                                                <div class="form-group has-danger">
                                                    <label class="control-label"><b>  Start date </b>  </label>
                                                <b>       <input type="text" class="form-control" placeholder=" Name"  name="startdate" v-bind:value="Election.startdate"
:value="Election.startdate|formatDate" 
   v-on:input="Election.startdate = $event.target.value"></b>   </div>
                                            </div>
                                              <div class="row">
                                            <!--/span-->

                                            <div class="col-md-6" v-for="candidate in Election.candidate">
                                                <div class="form-group">
                                                 
                                                    <div class="form-check">
                                                     <label class="control-label"><b>  Candidate</b>  </label>
                                                    
                                          <b>     <input type="text" class="form-control" placeholder=" Name"  name="candidate" v-bind:value="candidate"
:value="candidate" 
   v-on:input="candidate = $event.target.value">  </b>  
                                   </div>

                                                    </div>
                                                </div>
                                            </div>
                                            <!--/span-->
                                        </div>
                                      
         
                                    </div>
                                    <div class="form-actions">
                                        <button type="submit" class="btn btn-success" @click="edit"> <i class="fa fa-check"></i> Save</button>
                                        <button type="button" class="btn btn-inverse">Cancel</button>
                                        
                                    </div>
                                </form>
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
            ListCandidat:[]
     
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
 
  
        edit() {
            this.ListCandidat.push(document.querySelector("input[name=candidate]").value);
              let editElection = {
        type: document.querySelector("input[name=type]").value,
        startdate:document.querySelector("input[name=startdate]").value,
        enddate:document.querySelector("input[name=enddate]").value,
       
      
      }
      console.log("test fatah "+editElection);
      
      axios.put('http://localhost:3000/api/election/'+this.$route.params.id,editElection)
        .then((response) => {
          console.log(response);
      
        })
        .catch((error) => {
          console.log(error);
        });
          this.$router.push('/election')
    }
 }
  
  }


</script>

<style>
  
</style>