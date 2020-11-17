<template>
<div>


<div class="col-md-2">
        
    </div>
 <div class="container-fluid col-md-8">

    <div class="col-lg-12">
                        <div class="card card-outline-primary">
                            <div class="card-header">
                                <h4 class="m-b-0 text-white">Add An Idea</h4>
                            </div>
                            <div class="card-body">
                                <form action="#">
                                    <div class="form-body">
                                        <h3 class="card-title m-t-15">Add A New Idea</h3>
                                        <hr>
                                        <div class="row">
                                            <div class="col-md-6">
                                                <div class="form-group">
                                                    <label>Idea Name : </label>
                                                    <input type="text" class="form-control" v-model="idea.name">
                                                </div>
                                            </div>
                                            <!--/span-->
                                            
                                            <!--/span-->
                                        </div>
                                         <div class="row">
                                            <div class="col-md-6">
                                                <div class="form-group">
                                                    <label>Idea Description : </label> <br>
                                                    <textarea v-model="idea.description"  cols="50" rows="10"></textarea>
                                                    
                                                </div>
                                            </div>
                                            <!--/span-->
                                            
                                            <!--/span-->
                                        </div>
                                         <div class="row">
                                            <div class="col-md-6">
                                                <div class="form-group">
                                                    <label>Idea Domain : </label>
                                                    <input type="text" class="form-control" v-model="idea.domain">
                                                </div>
                                            </div>
                                            <!--/span-->
                                            
                                            <!--/span-->
                                        </div>
                                        
                                        <div class="row">
                                            <div class="col-md-6">
                                                <div class="form-group">
                                                    <label>Avatar : </label>
                                                     <input type="file" class="form-control" @change="onFileChanged">
                                                </div>
                                            </div>
                                            
                                        </div>
                                       
                                         


                                        
                                    </div>
                                    <div class="form-actions">
                                        <router-link to="/listIdeas">

                                            <button type="submit" class="btn btn-large btn-block btn-primary full-width" @click="addToAPI">Submit</button>
                                        </router-link>
                                        
                                      
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
 </div>


</div>



  
</template>
<script>
 export default {
     data() {
    return {
      idea: { name: '', description: '', domain: '' ,user:'',picture:''},
       }
    
    } ,
    selectedFile: null,
    created: function() {
         if(this.$session.get('userId')==null) {
          this.$router.push('/');
      }
       
    },
    methods: {
    addToAPI() {
      let newIdea = {
        name: this.idea.name,
        description: this.idea.description,
        domain:this.idea.domain,
        user : this.$session.get('userId'),
        picture : this.idea.picture


      }
      console.log(newIdea);
      let uri = "http://localhost:3000/api/ideas"; 
                  this.axios.post(uri, newIdea).then((response) => {
                     
                })

                
    },

    onFileChanged (event) {
      this.selectedFile = event.target.files[0]; 
       this.idea.picture = this.selectedFile.name ;
     },
     
  }



 }
    
</script>
