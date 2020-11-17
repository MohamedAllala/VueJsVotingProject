
<script>
import { Bar } from 'vue-chartjs'
import axios from 'axios'

export default {
  extends: Bar,
  data: function () {
    return {
      q1choice1: 0,
      q1choice2: 0,
      q2choice1:0,
      q2choice1:0
  
    }
  },
  methods: {
    Render(){
       axios.get('http://localhost:3000/api/responses/statistic/'+this.$route.params.id)
      .then(response => { this.q1choice1 = response.data.q1choice1;this.q1choice2 = response.data.q1choice2;this.renderChart({labels: ['choice1', 'choice2'], datasets: [ {backgroundColor: ['#00D8FF', '#ddc725'], data:[this.q1choice1, this.q1choice2]} ]}, { responsive: true, maintainAspectRatio: false }) }).catch(e => { this.errors.push(e) })
    }
 
   

  },
   
  created: function () {
     if(this.$session.get('userId')==null) {
          this.$router.push('/');
      }
      
    this.Render();
  
    setInterval(function () {
        this.Render();}.bind(this), 60000)
    

    }
}
</script>
