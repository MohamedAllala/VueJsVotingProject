<template>
    <div>
        <div class="col-md-2">

        </div>

        <div class="container-fluid col-md-8">
            <br><br><br>
             <div class="form-group">
   <div class="input-group input-group-default">
  <span class="input-group-btn"><button class="btn btn-primary" type="submit"  @click="search"><i class="ti-search"></i></button></span>
                                                <input type="text" v-model="searchitem" placeholder="Search " name="Search" class="form-control">
                                            </div>
                                        </div>


            <div class="row">
                <div class="col-md-6" v-for="item in items">
                    <div class="card">
                        <div class="card-body">
                            <h4 class="card-title">{{item.name}}</h4>

                            <div class="tab-content br-n pn">
                                <div id="navpills-1" class="tab-pane active show">
                                    <div class="row">
                                        <div class="col-md-4"> <img v-bind:src="'src/assets/images/'+item.picture" class="img-fluid thumbnail m-r-15"> </div>
                                        <div class="col-md-8">
                                            <h6>Domain : {{item.domain}}  </h6>
                                            <p>
                                                <br> {{item.description}} .</p>
                                                <br> 
                                                <p> 
                                                    {{item.rate}} Reviews 
                                                </p>
                                        </div>
                                        
                                        
                                        <div class="button-list col-md-8 ">
                                            <div class="btn-group">
                                                <router-link :to="{ name: 'comments', params: { id: item._id }}" class="btn btn-info btn-rounded m-b-10 m-l-5">
                                                    <i class="fa fa-comments"></i>
                                                </router-link>

                                                <button class="btn btn-pink btn-rounded m-b-10 m-l-5" v-on:click="addComment(item._id)">
                                                    <i class="fa fa-comment"></i>
                                                </button>

                                                <router-link v-if="ConnectedUser==item.user._id" :to="{name: 'EditItem', params: { id: item._id }}" class="btn btn-success btn-rounded m-b-10 m-l-5">
                                                    <i class="fa fa-edit"></i>
                                                </router-link>
                                                <button v-if="ConnectedUser==item.user._id" class="btn btn-danger btn-rounded m-b-10 m-l-5" v-on:click="deleteIdea(item._id)">
                                                    <i class="fa fa-eraser"></i>
                                                </button>
                                                
                                                
                                            </div>
                                        </div>

                                        

                                    </div>
                                </div>

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

export default {
    data() {
        return {
            items: []
            , 
           Comment: {idea: '', text: '',user:''} ,
           ConnectedUser : this.$session.get('userId') ,
            
           searchitem:''
        }
        name: 'ideas'  
        
    },
    created: function() {
         if(this.$session.get('userId')==null) {
          this.$router.push('/');
      }
        this.fetchItems();
    },

    methods: {
        fetchItems() {
            let uri = 'http://localhost:3000/api/ideas';
            this.axios.get(uri).then((response) => {
                this.items = response.data;
            });
        },
        checkComments() {
            let uri = 'http://localhost:3000/api/comments/idea/' + this.$route.params.id;
            this.axios.post(uri, this.item).then((response) => {
                this.$router.push({ name: 'comments' });
            });
        },
        deleteIdea(id) {
            
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
            this.$swal('Deleted', 'You successfully deleted this Idea', 'success')
             this.axios.delete('http://localhost:3000/api/ideas/' + id)
                .then(result => {
                    console.log(id);
                });
            window.location.reload();
           
          } else {
            this.$swal('Cancelled', 'Your Idea is still intact', 'info')
            
          }
        })
            

        } , 
        addComment(id) {
          this.$swal({
           
    		 title: 'Submit A comment',
          html:
            '<textarea id="text"  cols="30" rows="10"></textarea>',
          inputPlaceholder: 'Enter your Comment here',
          showCloseButton: true,
        }).then(() => {

              this.Comment.text = text.value ; 
              this.Comment.idea = id ; 
              this.Comment.user = this.$session.get('userId');
              console.log(this.Comment)
              this.axios.post('http://localhost:3000/api/comments' ,this.Comment)
                .then(result => {
                   
                });
        
          

        })


        }, 
        search(){
           
            this.axios.get('http://localhost:3000/api/ideas/search/'+this.searchitem)
            .then((response) => {
                console.log(response.data);
                this.items= response.data;
              
            })
            .catch((error) => {
                console.log(error);
            });

        }
        
         
        

    }
}

</script>