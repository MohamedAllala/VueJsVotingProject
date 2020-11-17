
<template>
<div>


<div class="col-md-2">
        
    </div>
 <div class="container-fluid col-md-8">

    <div class="col-lg-12">
                        <div class="card card-outline-primary">
                         
                            <div class="card-body">
                              <form id="surveyForm"  @submit.prevent="validateBeforeSubmit">
      <div class="well">
        <center> <h4> Add Survey</h4> </center>
        <br>
        <div class="form-group" :class="{'has-error': errors.has('name') }" >
          <label class="pull-left" >  Name </label>
          <input type="text" name="name" class="form-control"  placeholder=" Name..." v-model="Survey.name" v-validate="'required|alpha'"  >
 <i v-show="errors.has('name')" class="fa fa-warning"></i>
            <span v-show="errors.has('name')" class="help is-danger">{{ errors.first('name') }}</span>
        </div>
        <div class="form-group">
          <label class="pull-left"> Description </label>
          <input type="text" class="form-control" placeholder="description... " v-model="Survey.description">
        </div>
        <div class="form-group">
          <label class="pull-left"> Reward </label>
          <input type="text" class="form-control" placeholder="reward... " v-model="Survey.reward">
        </div>
            <div class="form-group" >
          <label class="pull-left"> Question </label>
          <input type="text" class="form-control" placeholder="question... " v-model="Survey.text">
        </div>
      
            <div class="form-group" >
          <label class="pull-left"> Choice </label>
          <input type="text"  class="form-control" placeholder="choice... " v-model="choices">
            
        </div>
       
          <div class="form-group" >
       <button class="btn btn-dark btn-outline m-b-10 m-l-5" @click="addChoice"><i class="ti-plus"></i></button>
        </div>
          <div class="form-group">
          <label class="pull-left"> End date </label>
          <input type="date" class="form-control" placeholder="date" name="endDate" v-model="Survey.endDate">
        </div>
      </div>
     <router-link to="/surveyByEntreprise" >
      <button type="submit" class="btn btn-large btn-block btn-primary full-width" @click="addToAPI">Submit</button>
     </router-link>
  
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
  name: 'hello',
  data() {
    return {
      msg: 'Welcome to Your Vue.js App',
 
      Survey: { name: '', description: '', reward: '' ,endDate: '', text: '', choice: []},
      test:false,
       ListChoice:[],
       choices:''
    }
    

  },
  created: function() {
         if(this.$session.get('userId')==null) {
          this.$router.push('/');
      }
       
    
    }, methods: {
       validateBeforeSubmit(e) {
        this.$validator.validateAll();
        if (!this.errors.any()) {
            this.addToAPI()
        }
      },

 
addChoice(){
            this.ListChoice.push(this.choices);
   
          console.log(this.ListChoice)
        },
    addToAPI() {
      let newSurvey = {
        name: this.Survey.name,
        description: this.Survey.description,
        endDate:this.Survey.endDate,
        createdBy:'5ad9a2f446f7e219c48e6ec0',
        reward: this.Survey.reward,
        questions:[{text:this.Survey.text,choice:this.ListChoice}]
      
      }
      this.test=true;
      console.log(newSurvey);
      axios.post('http://localhost:3000/api/surveys', newSurvey)
        .then((response) => {
          console.log(response);
         
        })
        .catch((error) => {
          console.log(error);
        });
       
    }
  }
}
/*$(document).ready(function() {
       var today = new Date().toISOString().split('T')[0];
document.getElementsByName("endDate")[0].setAttribute('min', today);
})*/
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1,
h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>