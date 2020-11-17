<template>
    <div>
    
        <div class="container-fluid col-md-8">
            <!-- Start Page Content -->
            <div class="row">
                <div class="col-md-12"  >
                    <div class="card">
                        <div class="card-body">
                      

                            <div class="tab-content br-n pn">
                                <div id="navpills-1" class="tab-pane active show">
                                    <div class="row">
                                        <div class="col-md-4"> <img src="src/assets/images/hand.jpg" class="img-fluid thumbnail m-r-10"> </div>
                                        <div class="col-md-8">
                                              <h4 class="card-title" style="color:#e60000"><b>{{Election.type}}</b></h4><br>
                                            <h6><b>START : {{Election.startdate|formatDate}} </b> </h6>
                                          
                                                <br>  <h6><b>END: {{Election.startdate|formatDate}} </b> </h6>
                                                
                                                <br> 
                                                <div v-if="test==false">
 <div  v-for="(item,index ) in Election.candidate">

<label class="container">{{item}}
  <input type="radio" v-model="voteIndex" :value="index" name="radio">
  <span class="checkmark"></span>
</label>
  <br> 


</div>


 <button v-if="testvote==false" type="submit" class="btn btn-large btn-block btn-primary" style="background-color:darkblue" @click="affecterVote"> <i class="fa fa-star"></i> <i class="fa fa-star"></i> <i class="fa fa-star"></i>  Confirmer <i class="fa fa-star"></i> <i class="fa fa-star"></i> <i class="fa fa-star"></i> </button>
                                    </div>
<div  class="col-lg-12" id="chartContainer" style="height: 370px; width: 50%;"></div>
                                                </div>
                                        </div>
                                        
                                       
                                        <div class="button-list col-md-8 ">
                                            <div class="btn-group">
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
/* eslint-disable */
import axios from 'axios';

export default {
    
    data() {
        return {
            Election: [],
            voteIndex: 0 , 
            nbrVote : 0 , 
            z:0, 
            test: false , testvote : false ,
            vote : {voteIndex : 0 , voter :''}
            
        }
    },
     
   
        mounted() {
            if(this.$session.get('userId')==null) {
          this.$router.push('/');
      }
        axios.get('http://localhost:3000/api/election/'+ this.$route.params.id)
            .then((response) => {
               
                this.Election = response.data;
             
            })
             
            .catch((error) => {
                console.log(error);
            });
           
          
             this.afficherVote();
              },
              

 methods: {
         
        afficherVote(){
 let uri = 'http://localhost:3000/api/interact/findByIndex/1';
  this.axios.get(uri).then((response) => {
     this.z = response.data;
     console.log(this.z);

  });
        },
    
     affecterVote(){
            
         
            let nvvoteIndex = {
        voteIndex: this.voteIndex


      }
       let newVote = {
           voteIndex : this.voteIndex ,
           voter : this.$session.get('user') 
       }
          this.$swal({
          title: 'Are you sure?',
          text: 'You can\'t revert your action',
          type: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Yes confirm my vote!',
          cancelButtonText: 'No, Keep it!',
          showCloseButton: true,
          showLoaderOnConfirm: true
        }).then((result) => {
          if(result) {
         
          let uri = 'http://localhost:3000/api/interact';
              console.log(nvvoteIndex)
            this.axios.post(uri,newVote).then((response) => {
                
                this.$swal('Voted', 'You successfully voted to this election', 'success').then(res => {
                      this.afficherVote();
                    this.myFunction();
                 

                })
                this.test= true ;
               this.nbrVote = response.data ;
            var   y= Number(this.nbrVote)
                            
              
            }).catch((error)=> {

                   this.$swal('Voted', 'You Voted ', 'error').then(res => {
                   
                 

                })
            }) }
            
           
            
            
            });
        },
  
      myFunction() {
  
    
    var x =Number(this.nbrVote);  
    
    var k = Number(this.z);

var chart = new CanvasJS.Chart("chartContainer", {
     
	theme: "light1", // "light2", "dark1", "dark2"
	animationEnabled: false, // change to true		
	title:{
		text: "Basic Column Chart"
	},
	data: [
	{
		// Change type to "bar", "area", "spline", "pie",etc.
		type: "column",
		dataPoints: [
			{ label: "candidat1",  y: x  }
		]
	}
	]
});

chart.render();
}
        
 }
  
  }


</script>
<style>
/* The container */
.container {
    display: block;
    position: relative;
    padding-left: 35px;
    margin-bottom: 12px;
    cursor: pointer;
    font-size: 15px;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
}

/* Hide the browser's default radio button */
.container input {
    position: absolute;
    opacity: 0;
    cursor: pointer;
}

/* Create a custom radio button */
.checkmark {
    position: absolute;
    top: 0;
    left: 0;
    height: 25px;
    width: 25px;
    background-color: #eee;
    border-radius: 50%;
}

/* On mouse-over, add a grey background color */
.container:hover input ~ .checkmark {
    background-color: #ccc;
}

/* When the radio button is checked, add a blue background */
.container input:checked ~ .checkmark {
    background-color: black;
}

/* Create the indicator (the dot/circle - hidden when not checked) */
.checkmark:after {
    content: "";
    position: absolute;
    display: none;
}

/* Show the indicator (dot/circle) when checked */
.container input:checked ~ .checkmark:after {
    display: block;
}

/* Style the indicator (dot/circle) */
.container .checkmark:after {
 	top: 9px;
	left: 9px;
	width: 8px;
	height: 8px;
	border-radius: 50%;
	background: white;
}
</style>