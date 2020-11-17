<template>
   <div>
        <div class="col-md-2">

        </div>

     <div class="container-fluid col-md-8">
                <!-- Start Page Content -->
                <div class="row justify-content-center">
                    <div class="col-lg-6">
                        <div class="card">
                            <div class="card-body">
                                <div class="form-validation">
                                    <form>
                                       <div  >
                                        <div>
                                           <div v-for="item,index in Survey.questions " > 
                                        <div class="form-group row">
                                               <label class="col-lg-4 col-form-label" for="val-username">Question {{index+1}})</label>
                                            <div class="col-lg-6">
     
                                 
 
 
                          

  <input type="hidden"
   v-bind:value="item._id" :value="item._id"   v-on:input="item._id = $event.target.value"  name="id">
                                
                                {{item.text}}
                              
                                <div v-for="choices in item.choice"  >
                                   <input type="checkbox"  name="action" v-model="checked"  :value="choices">    {{choices}}
                       </div  >
 </div  >
                                        
                   
                                              <div class="form-group row">
                                           
                                            <div class="col-lg-6">

           

    
                                            </div>
                                        </div>
                                              
                                            </div>
                                       
         </div>
                                           </div>

                                
                          
                                </div>
               

                                        <div class="form-group row">
                                            <div class="col-lg-8 ml-auto">
                                               <button type="submit" class="btn btn-primary" @click="addToAPI">Submit</button>
                                            </div>
                                        </div>
        
                                    </form>
                
  </div>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- End PAge Content -->
            </div>
   </div>
</template>

<script>
/* eslint-disable */
import axios from "axios";
export default {
  name: "getsurvey",
  data() {
    return {
      Survey: [],
      checked: [],
      answer: [],
      questions: [] ,
      id : ''
    };
  },
  mounted() {
    axios
      .get("http://localhost:3000/api/surveys/getby/" + this.$route.params.id)
      .then(response => {
        console.log(response.data);
        this.Survey = response.data;
      })
      .catch(error => {
        console.log(error);
      });
  },
  created: function() {
         if(this.$session.get('userId')==null) {
          this.$router.push('/');
      }
    
    
    },
  methods: {
    addToAPI() {
       
        
        for (let index = 0; index < this.checked.length; index++) {
            
            this.answer.push({
        _id: this.Survey.questions[index],
        value: this.checked[index]
      });
        }
      

      let newResponse = {
        survey: this.$route.params.id,
        respondBy: this.$session.get('userId'),
        answer: this.answer
      };

      // console.log(this.checked);

      console.log(this.questions);
      axios
        .post("http://localhost:3000/api/responses/add", newResponse)
        .then(response => {
          console.log(response);
          if (response.data == "deja voted") {
            console.log("alert");
            this.$swal("Heading", "already voted");
          } else {
            this.$swal("Heading", " voted");

           
          }
        })
        .catch(error => {
          console.log(error);
        });
         this.$router.push({ name: "historic" });
    }
  }
};
</script>

<style>

</style>