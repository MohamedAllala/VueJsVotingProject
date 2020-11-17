  <template>   
      <div class="page-wrapper">
   <div class="container-fluid">
               
                <div class="row">
                    <div class="col-lg-6">
                        <div class="card card-outline-primary">
                            <div class="card-header">
                                <h4 class="m-b-0 text-white">Add an election</h4>
                            </div>
                            <div class="card-body">
                                <form action="#">
                                    <div class="form-body">
                                        <h3 class="card-title m-t-15">Election:</h3>
                                        <hr>
                                        <div class="row p-t-20">
                                            <div class="col-md-6">
                                                <div class="form-group">
                                                    <label class="control-label">Type</label>
                                                    <input type="text"  class="form-control" placeholder="Enter.." v-model="election.type">
                                                    <small class="form-control-feedback"> This is inline help </small> </div>
                                            </div>
                                            <!--/span-->
                                            <div class="col-md-6">
                                                <div class="form-group has-danger">
                                                    <label class="control-label">Start date</label>
                                                    <input type="date"  class="form-control form-control-danger" placeholder="Enter.." v-model="election.startdate">
                                                    <small class="form-control-feedback"> This field has error. </small> </div>
                                            </div>
                                            <!--/span-->
                                        </div>
                                        <!--/row-->
                                        <div class="row">
                                            <div class="col-md-6">
                                          
                                            </div>
                                          
                                        </div>
                                        <!--/row-->
                                        <div class="row">
                                            <div class="col-md-6">
                                                <div class="form-group">
                                                    <label class="control-label">End date</label>
                                                    <input type="date"  class="form-control form-control-danger" placeholder="Enter.." v-model="election.enddate">
                                                </div>
                                            </div>
                                            <!--/span-->
                                            <div class="col-md-6">
                                                <div class="form-group">
                                                    <div class="form-check">
                                                    
                                                       
                                                      <button @click="myFunction" class="btn btn-success">Liste candidats</button> <br> <br> <br>

<div id="myDIV">
                                                              <input type="text" onkeyup="mySpan.innerHTML=this.value"  class="form-control form-control-danger" placeholder="Enter.." v-model="candidat">
                                                              <p><span id="mySpan"></span></p>
                                                              <button @click="addCandidat" style ="background-color:#5c4ac7;border-color:#5c4ac7;" ><i class="fa fa-plus"></i></button>
</div>
                                                    </div>
                                                </div>
                                            </div>
                                            <!--/span-->
                                        </div>
                                      
         
                                    </div>
                                    <div class="form-actions">
                                        <button type="submit" class="btn btn-success" @click="addToAPI"> <i class="fa fa-check"></i> Save</button>
                                        <button type="button" class="btn btn-inverse" style ="background-color:#ef5350;border-color:#ef5350">Cancel</button>
                                        
                                    </div>
                                </form>
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
      election: { type: '', startdate: '',enddate: '', candidate: []},
      candidat:'',
      ListCandidat:[]
       }
    
    } , 
    created : function(){
      console.log("Sessionn : "+ this.$session.get('user'))
      console.log("Sessionn : "+ this.$session.get('userId'))
      console.log("Sessionn : "+ this.$session.get('userName'))
      if(this.$session.get('userId')==null) {
          this.$router.push('/');
      }
    
    },
  
    methods: {
        addCandidat(){
            this.ListCandidat.push(this.candidat)
            console.log(this.ListCandidat)
            
        },
    addToAPI() {
      let newElection = {
        type: this.election.type,
        startdate: this.election.startdate,
        enddate:this.election.enddate,
        candidate:this.ListCandidat
       


      }
      console.log(newElection);
      let uri = "http://localhost:3000/api/election"; 
                  this.axios.post(uri, newElection).then((response) => {
                     this.$router.push('/election');
                })
    },

  
      myFunction() {
    var x = document.getElementById("myDIV");
    if (x.style.display === "none") {
        x.style.display = "block";
    } else {
        x.style.display = "none";
    }
}
  }



 }
    
</script>


