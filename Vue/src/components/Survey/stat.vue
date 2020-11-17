<template>
<div>
        <div class="col-md-2">

        </div>

    
<div  id="capture2" class="container-fluid col-md-8">
       <div class="col-lg-6">
                     <select class="form-control"  v-on:input="test($event.target.value)" >
                                                    <option value="">Please select</option>
                                                    <option value="gender">gender</option>
                                                    <option value="question1">question 1</option>
                                                    <option value="question2">question 2</option>
                                                    
                                                </select>
                                                 </div>
       <div class="col-md-3">
                        <div class="card p-30">
                            <div class="media">
                                <div class="media-left meida media-middle">
                                    <span><i class="fa fa-user f-s-40 color-danger"></i></span>
                                </div>
                                <div class="media-body media-text-right">
                                    <h2>{{user}}</h2>
                                    <p class="m-b-0">Customer</p>
                                </div>
                            </div>
                        </div>
                       
                    </div>
                    <div class="row justify-content-center">
                    <div class="col-lg-6">
           <div class="card">
                               <pie-chart/>
                            </div> 
                            </div>
                            </div>
         <button class="btn btn-info btn-flat m-b-10 m-l-5" @click="print">Print </button>              



</div>
</div>
  
</template>

<script>
import axios from 'axios';
 import html2pdf  from 'html2pdf.js';
import PieChart from './PieChart';
import BarChart from './BarChart';
import BarExemple from './BarExemple';
export default {
  
    components: {
      
      PieChart,
      BarChart,
      BarExemple

    },
    data() {
        return {

             user:0 

        }
    },
  
    

      created: function () {
     if(this.$session.get('userId')==null) {
          this.$router.push('/');
      }
    this.count();
    setInterval(function () {
        this.count();}.bind(this), 60000)
    },


     methods: {
           print () {
        var doc = document.getElementById('capture2')
        html2pdf(doc);
      },
 count() {
            
           axios.get('http://localhost:3000/api/responses/countUser/'+this.$route.params.id)
            .then((response) => {
               
              this.user=response.data;
             
              
            })
            .catch((error) => {
                console.log(error);
            });
    
    
            
    },
    test: function(value) {
        const id = this.$route.params.id
			if (value === "question1") {
	 this.$router.push({ name: 'bar', params: { id }})

            }
                   	if (value === "question2") {
				 this.$router.push({ name: 'barchart2', params: { id }})
            }
                      	if (value === "gender") {
				 this.$router.push({ name: 'stat', params: { id }})
			}
        }
}

}
</script>