<template>
 <div class="page-wrapper">
     <div class="container-fluid"> <br>
                 <router-link :to="{name: 'addCandidate'}" class="btn btn-success btn-rounded m-b-10 m-l-5" style ="background-color:#ef5350;border-color:#ef5350">
                                                   Add <i class="fa fa-plus"></i>
                                                </router-link>
                <div class="row">
               
                    <div class="col-lg-6"  v-for="item in items">
                        <div class="card" >
                            <div class="card-title">
                                <h4><b>{{item.type}}</b> </h4>

                            </div>
                            <div class="card-body">
                                <div class="table-responsive">
                                    <table class="table">
                                        <thead>
                                            <tr>
                                       
                                                <th>Date Debut</th>
                                                <th>Date Fin</th>
                                               
                                            </tr>
                                        </thead>
                                        <tbody>
                                        
                                            <tr>
                                               
                                               
                                                <td class="color-danger" style="color:#004d99;"><b>{{item.startdate|formatDate}}</b></td>
                                                <td class="color-success" style="color:#e60000"><b>{{item.enddate|formatDate}}</b></td> <br><br>
                                                <tr>
                                                  <div class="form-actions">
                                       
                                       
                                  
                                           <router-link :to="{name: 'electionsDetails', params: { id: item._id }}" class="btn btn-success btn-rounded m-b-10 m-l-5" style ="background-color:#26dad2;border-color:#26dad2;">
                                                   Start <i class="fa fa-hourglass-start"></i>
                                                </router-link>   
    
                                   <router-link :to="{name: 'editElection', params: { id: item._id }}" class="btn btn-success btn-rounded m-b-10 m-l-5" style ="background-color:#ef5350;border-color:#ef5350">
                                                   Edit <i class="fa fa-edit"></i>
                                                </router-link>
                                                
                                                  <button class="btn btn-danger btn-rounded m-b-10 m-l-5"  style ="background-color:#5c4ac7;border-color:#5c4ac7;"@click="deleteElection(item._id)"> 
                                                   Delete <i class="fa fa-trash"></i>
                                                </button>    
                                    </div>

                                                 
                                                 </tr>
                                            </tr>
                                          
                                        </tbody>
                                    </table>
                                </div>
                            </div>
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
        deleteElection(id) {
            
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
            this.$swal('Deleted', 'You successfully deleted this election', 'success')
             this.axios.delete('http://localhost:3000/api/election/' + id)
                .then(result => {
                    console.log(id);
                });
            window.location.reload();
           
          } else {
            this.$swal('Cancelled', 'Your election is still intact', 'info')
            
          }
        })
            

        }

    

    }
}

</script>
