<template>
    <div>

        <div class="col-md-2">

        </div>
        <div class="container-fluid col-md-8">

            <div class="col-lg-12">
                <div class="card card-outline-primary">
                    <div class="card-header">
                        <h4 class="m-b-0 text-white">Update An Idea</h4>
                    </div>
                    <div class="card-body">
                        <form action="#">
                            <div class="form-body">
                                <h3 class="card-title m-t-15">Update This Idea : {{itemToUpdate.name}} </h3>
                                <hr>
                                <div class="row">
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <label>Idea Name : </label>
                                            <input type="text" class="form-control" v-model="item.name" :placeholder="itemToUpdate.name">
                                        </div>
                                    </div>
                                    <!--/span-->

                                    <!--/span-->
                                </div>
                              
                                <div class="row">
                                            <div class="col-md-6">
                                                <div class="form-group">
                                                    <label>Idea Description : </label> <br>
                                                    <textarea v-model="item.description"  cols="50" rows="10" :placeholder="itemToUpdate.description"></textarea>
                                                    
                                                </div>
                                            </div>
                                            <!--/span-->
                                            
                                            <!--/span-->
                                        </div>
                                <div class="row">
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <label>Idea Domain : </label>
                                            <input type="text" class="form-control"  v-model="item.domain" :placeholder="itemToUpdate.description">
                                        </div>
                                    </div>
                                    <!--/span-->

                                    <!--/span-->
                                </div>

                               

                            </div>
                            <div class="form-actions">
                                <router-link to="/listIdeas">
                                 <button type="submit" class="btn btn-large btn-block btn-primary full-width" @click="updateItem">Update</button>
                                
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
            item: {
                name: '', domain: '', description: '', picture: ''
            } , 
            itemToUpdate : {
                name: '', domain: '', description: '', picture: ''
            }
        }
    },
     selectedFile: null, 
    created: function() {
        this.getItem();
    },
    created: function() {
         if(this.$session.get('userId')==null) {
          this.$router.push('/');
      }
       
    },
  
    methods: {
        getItem() {
            
            let uri = 'http://localhost:3000/api/ideas/details/' + this.$route.params.id;
            this.axios.get(uri).then((response) => {
                
                this.itemToUpdate = response.data[0] ; 
                console.log( this.itemToUpdate)
            });
        },

        updateItem() {
            let uri = 'http://localhost:3000/api/ideas/' + this.$route.params.id;
            this.axios.put(uri, this.item).then((response) => {
             

            });
            
        },
        onFileChanged(event) {
            this.selectedFile = event.target.files[0];
            this.item.picture = this.selectedFile.name;
        }
    }
}

</script>