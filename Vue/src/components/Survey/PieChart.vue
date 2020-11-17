
<script>
import { Pie } from 'vue-chartjs'
import axios from 'axios'

export default {
  extends: Pie,
  data: function () {
    return {
      male: 0,
      female: 0,
        user:0 
  
    }
  },
  created: function() {
         if(this.$session.get('userId')==null) {
          this.$router.push('/');
      }
    
    
    },
  methods: {
    Render(){
       axios.get('http://localhost:3000/api/responses/gender/'+this.$route.params.id)
      .then(response => { this.male = response.data.male;this.female = response.data.female;this.renderChart({labels: ['MALE', 'FEMALE'], datasets: [ {backgroundColor: ['#41B883', '#E46651'], data:[this.male, this.female]} ]}, { responsive: true, maintainAspectRatio: false }) }).catch(e => { this.errors.push(e) })
    }
   

  },
  created: function () {
    
    this.Render();
    setInterval(function () {
        this.Render();}.bind(this), 60000)

   
    },


}
</script>
