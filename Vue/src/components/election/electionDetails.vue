<template>
 <div class="page-wrapper">
     <div class="container-fluid">
                <form>
                <div class="row">
                  
                    <div class="col-lg-6"  v-for="item in items">
                        <div class="card" >
                            <div class="card-title">
                                <h4>candidates list </h4>

                            </div>
                            <div class="card-body">
                                <div class="table-responsive">
                                    <table class="table">
                                        <thead>
                                            <tr>
                                              <th>#</th>
                                                <th>Name</th>
                                                <th>Last name</th>
                                               
                                            </tr>
                                        </thead>
                                        <tbody>
                                        
                                            <tr>
                                               
                                                 <td> <input type="checkbox" v-model="checked" :value="item._id" ></td>
                                                <td class="color-danger">{{item.name}}</td>
                                                <td class="color-success">{{item.lastname}}</td> 
                                                 
                                                <tr>
                                              
                                                 
                                                 </tr>
                                            </tr>
                                          
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                     </div>
 
                       <button type="submit" class="btn btn-large btn-block btn-primary full-width" @click="affecterCandidat">Submit</button>
                   </form>
               
              
            </div>
</div>
</template>
<script>


export default {
    data() {
        return {
            items: [],
            idCandidat: [],
        checked: [],
        candidates:[],
        election :{},
        }
    
        name: 'ideas'
    },


    created: function() {
        this.fetchItems();
         if(this.$session.get('userId')==null) {
          this.$router.push('/');
      }
    },

    methods: {
        fetchItems() {
            let uri = 'http://localhost:3000/api/candidate';
            this.axios.get(uri).then((response) => {
                this.items = response.data;
            });
        },
        affecterCandidat(){
            
         let   newCandidate={_id:[this.checked]}
         
                   
          let uri = 'http://localhost:3000/api/election/candidate/'+this.$route.params.id;
            
            this.axios.post(uri,newCandidate).then((response) => {
               console.log(response)
              
            });
        }
    

    }
}

</script>
