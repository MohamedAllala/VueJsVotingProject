 <template>
 <div>
   <div>
        <div class="col-md-2">

        </div>

     <div class="container-fluid col-md-8">
         <div class="row">
                    <div class="col-12">
  <div class="card">
                            <div class="card-body">
                                <h4 class="card-title"> Surveys</h4>
                               
                                <div class="table-responsive m-t-40"  >
                                    
                                    <table id="example23" class="display nowrap table table-hover table-striped table-bordered" cellspacing="0" width="100%">
                                        
                                        <thead>
                                            <tr>
                                            
                                                <th>Survey</th>
                                                <th>Reward</th>
                                                <th>Responded at  </th>
                                            </tr>
                                        </thead>
                                      
                                        <tbody >
                                            <tr v-for="survey in Survey" :key="survey._id">
                                                <td>{{survey.survey.name}}</td>
                                                <td>$ {{survey.survey.reward}} </td>
                                                <td>{{survey.respondedAt|formatDate}}</td>
                                               
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
 </div>
</template>
<script>
import axios from 'axios';
import moment from 'moment';

export default {
 
    data() {
        return {
            Survey: [],
            SurveyByid:[],
             data: [10,20,40,50],
        circleLength: 371.9451599121094,
        hasMounted: false
          
        }
    },
  created: function() {
         if(this.$session.get('userId')==null) {
          this.$router.push('/');
      }
    
    },

    

        mounted() {
               setTimeout(() => { this.hasMounted = true }, 0);
      setInterval(() => { this.shuffle(this.data) }, 1000);

        axios.get('http://localhost:3000/api/responses/historic/'+this.$session.get('userId'))
            .then((response) => {
                console.log(response.data);
                this.Survey = response.data;
               
                this.Survey.forEach(survey => {console.log(survey.survey._id)
                
              
                
                
                
                })
               
              
            })
            .catch((error) => {
                console.log(error);
            });
    },
     methods: {


  shuffle(data) {
        let dataCopy = data.slice();
        let temp;
        let index;
        let randomIndex;
        for (index = 0; index < dataCopy.length; index++) {
          randomIndex = Math.floor(Math.random() * index);
          temp = dataCopy[index];
          dataCopy[index] = dataCopy[randomIndex];
          dataCopy[randomIndex] = temp;
        }
        this.data = dataCopy;
      }
    },
    computed: {
        dataTotal() {
          return this.data.reduce((previous, current) => previous + current);
        },
        dataObjects() {
          let startingPoint = 0;
          return this.data.map(item => {
            let relativeSize = ((item / this.dataTotal) * this.circleLength);
            let dataObject =  { relativeSize: this.hasMounted? relativeSize: 0 , offset: -startingPoint };
            startingPoint += relativeSize;
            return dataObject;
          })
        }
    
  
  }
  

}
</script>
<style lang="scss">
.pie circle {
  fill: none;
  stroke-width: 32;
  transition: stroke-dasharray 0.3s ease-in-out,stroke-dashoffset 0.3s ease-in-out;
}
$colors: red, yellow, cyan, blue, green, black, white, gray, purple;
@for $i from 1 through length($colors) {
  .pie circle:nth-child(#{$i}) {
    stroke: nth($colors, $i);
  }
}
</style>