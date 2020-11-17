
<template>
<div>


<div class="col-md-2">
        
    </div>
 <div class="container-fluid col-md-8">

    <div class="col-lg-12">
                        <div class="card card-outline-primary">
                         
                            <div class="card-body">
                              <form>
      <div class="well">
      <center>  <h4> Add Question</h4></center>
      <br><br>

       
        <div class="form-group">
          <label class="pull-left"> Question </label>
          <input type="text" class="form-control" placeholder="Question... " v-model="Survey.text">
        </div>
 
 <div class="form-group" >
          <label class="pull-left"> Choice </label>
          <input type="text"  class="form-control" placeholder="choices... " v-model="choices">
        
        </div>
          <div class="form-group" >
           <button class="btn btn-dark btn-outline m-b-10 m-l-5" @click="addChoice"><i class="ti-plus"></i></button>
        </div>
      <!--  <div class="form-group" >
          <label class="pull-left"> Choice </label>
          <input type="text" class="form-control" placeholder="choice " v-model="Survey.choice">
        </div>
          <div class="form-group"  >
          <label class="pull-left"> choice1 </label>
          <input type="text" class="form-control" placeholder="choice " v-model="Survey.choice1">
        </div>-->
   
                                <!--<div id="welcomeDiv" style="display:none;" class="answer_list">
                                     <input type="text" class="form-control" placeholder="choice " v-model="Survey.choice1">
                                     
                                     </div>

<input type="button" name="answer" value="Show Div" @click="showDiv" />
<div class="input_fields_wrap">
    <button class="add_field_button">Add More Fields</button>
    <div><input type="text" name="mytext[]" v-model="choice3"></div>
</div> -->
      </div>
           <!--   <div v-for="(user, index) in choice">
    <input v-model="user[index]"  v-on:input="changed">
    <button @click="deleteUser(index)">
      delete
    </button>
  </div>
  
  <button @click="addUser">
    New User
  </button>
   <pre>{{ $data }}</pre>-->
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
 
      Survey: {  text: '',choice: []  }, 
          ListChoice:[],
       choices:''
    }
  }, 
  created: function() {
         if(this.$session.get('userId')==null) {
          this.$router.push('/');
      }
  
    },

  methods: {
  changed: function() {
      console.log('choice'+this.choice);
    },
    addUser: function () {
      
      this.choice.push({ 0: '' });
    },
    deleteUser: function (index) {
      console.log(index);
      console.log(this.finds);
      this.choice.splice(index, 1);
      if(index===0)
      this.addUser()
    },
     
               showDiv() {
                 
                       
                       
                       document.getElementById('welcomeDiv').style.display = "block";
                      
                    

},
addChoice(){
            this.ListChoice.push(this.choices);
   
          console.log(this.ListChoice)
          // this.$swal('Info', 'choice added');
        },
    

    addToAPI() {
    
      let newSurvey = {
      
        text:this.Survey.text,choice:this.ListChoice
      
      }
     console.log(this.choice);

      console.log(newSurvey);
  axios.post('http://localhost:3000/api/surveys/'+this.$route.params.id+'/questions', newSurvey)
        .then((response) => {
          console.log(response);
        })
        
        .catch((error) => {
          console.log(error);
        });
      //  this.$router.push({ name: 'surveyByEntreprise' });
    }
  }
}
$(document).ready(function() {
    var max_fields      = 10; //maximum input boxes allowed
    var wrapper         = $(".input_fields_wrap"); //Fields wrapper
    var add_button      = $(".add_field_button"); //Add button ID
    
    var x = 1; //initlal text box count
    $(add_button).click(function(e){ //on add input button click
        e.preventDefault();
        if(x < max_fields){ //max input box allowed
            x++; //text box increment
            $(wrapper).append('<div><input type="text" name="mytext[]"/><a href="#" class="remove_field">Remove</a></div>'); //add input box
        }
    });
    
    $(wrapper).on("click",".remove_field", function(e){ //user click on remove text
        e.preventDefault(); $(this).parent('div').remove(); x--;
    })
});
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