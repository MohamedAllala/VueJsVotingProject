<template>
<div>


<div class="col-md-2">
        
    </div>
 <div class="container-fluid col-md-8">

    <div class="col-lg-12">
                        <div class="card card-outline-primary">
                         
                            <div class="card-body">
                              <form > 
      <div class="well">
        <h4> Edit survey</h4>
        <div class="form-group">
          <label class="pull-left">  Name </label>
          <input type="text" class="form-control"  name="nom" v-bind:value="
          Survey.name"
:value="Survey.name" 
   v-on:input="Survey.name = $event.target.value">
        </div>
        <div class="form-group">
          <label class="pull-left"> Description </label>
          <input type="text" class="form-control"  name="description"
   v-bind:value="Survey.description"
  
   :value="Survey.description" 
   v-on:input="Survey.description = $event.target.value"
   @input="Survey.description = $event.target.value" >
        </div>
        <div class="form-group">
          <label class="pull-left"> Reward </label>
          <input type="text" class="form-control"  name="reward"
   v-bind:value="Survey.reward"
  
   :value="Survey.reward" 
   v-on:input="Survey.reward = $event.target.value"
   @input="Survey.reward = $event.target.value">
        </div>
<!--<div  v-for="s in Survey.questions">
               <div class="form-group">
          <label class="pull-left"> text </label>
          <input type="text" class="form-control"  name="text" 
   v-bind:value="s.text"
  
   :value="s.text" 
   v-on:input="s.text = $event.target.value"
   @input="s.text = $event.target.value">
        </div>
        <div  v-for="item in s.choice">

           <div class="form-group">
          <label class="pull-left"> choice </label>
          <input type="text" class="form-control"  name="item" 
   v-bind:value="item"
  
   :value="item" 
   v-on:input="item = $event.target.value"
   @input="item = $event.target.value">
        </div>
            </div>
         </div>-->
              <div class="form-group">
          <label class="pull-left"> End date </label>
          <input type="text" class="form-control"  name="endDate" 
   v-bind:value="Survey.endDate"
  
   :value="Survey.endDate|formatDate" 
   v-on:input="Survey.endDate = $event.target.value"
   @input="Survey.endDate = $event.target.value">
        </div>

      </div>
   
      <button type="submit" class="btn btn-large btn-block btn-primary full-width" @click="edit">Submit</button>
     
  
    </form>

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
choices:[]
        }
    },
        mounted() {
        axios.get('http://localhost:3000/api/surveys/getby/'+ this.$route.params.id)
            .then((response) => {
                console.log(response.data);
                this.Survey = response.data;
             
            })
            .catch((error) => {
                console.log(error);
            });
    },
    created: function() {
         if(this.$session.get('userId')==null) {
          this.$router.push('/');
      }
       
    
    },
 methods: {
    
        edit() {
         
              let editSurvey = {
        name: document.querySelector("input[name=nom]").value,
        description:document.querySelector("input[name=description]").value,
        reward:document.querySelector("input[name=reward]").value,
        endDate:document.querySelector("input[name=endDate]").value,
        //questions:[{text:document.querySelector("input[name=text]").value, choice:[document.querySelector("input[name=choice]").value]}]
     
      
      }
      console.log(editSurvey);
      
      axios.put('http://localhost:3000/api/surveys/'+this.$route.params.id,editSurvey)
        .then((response) => {
          console.log(response);
        this.$swal("Info", "succefully updated");
        })
        .catch((error) => {
          console.log(error);
        });
        this.$router.push({ name: 'surveyByEntreprise' });
    }
 }
  
  }


</script>

<style>
  
</style>