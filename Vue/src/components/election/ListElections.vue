<template>
    <div>
        <div class="col-md-2">

        </div>

        <div class="container-fluid col-md-8">
            <!-- Start Page Content -->
            <div class="row">
                <div class="col-md-6"  v-for="item in items" v-if="item.deployed==true">
                    <div class="card">
                        <div class="card-body">
                            <h4 class="card-title" style="color:#e60000"><b>{{item.type}}</b></h4>

                            <div class="tab-content br-n pn">
                                <div id="navpills-1" class="tab-pane active show">
                                    <div class="row">
                                        <div class="col-md-4"> <img src="src/assets/images/hand.jpg" class="img-fluid thumbnail m-r-10"> </div>
                                        <div class="col-md-8">
                                            <h6><b>START : {{item.startdate|formatDate}} </b> </h6>
                                          
                                                <br>  <h6><b>END: {{item.startdate|formatDate}} </b> </h6>
                                                <br> 
                                                <p> 
                                                  
                                                </p>
                                        </div>
                                        
                                        
                                        <div class="button-list col-md-8 ">
                                            <div class="btn-group">
  </div>
   </div>
 <router-link :to="{name: 'vote', params: { id: item._id }}" class="btn btn-info" style="background-color:#004d99;"> 
                                                    Vote <i class="fa fa-star"></i>
                                                </router-link>
                                             
                                       
                                                
                                                
                                          
                                       

                                        

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
            let uri = 'http://localhost:3000/api/election';
            this.axios.get(uri).then((response) => {
                this.items = response.data;
                  console.log("test test : " + this.items)
            });
        },
      

    

    }
}

</script>
