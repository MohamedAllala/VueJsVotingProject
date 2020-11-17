
<script>
import { Bar } from 'vue-chartjs'
import axios from 'axios'

export default {
  extends: Bar,
  data: function () {
    return {
     
      q2choice1:0,
      q2choice1:0
  
    }
  },
  methods: {
    
    Render(){
       axios.get('http://localhost:3000/api/responses/statistic/'+this.$route.params.id)
      .then(response => { this.q2choice1 = response.data.q2choice1;this.q2choice2 = response.data.q2choice2;this.renderChart({labels: ['choice 1', 'choice 2'], datasets: [ {backgroundColor: ['#36dd32', '#FFB6C1'], data:[this.q2choice1, this.q2choice2]} ]}, { responsive: true, maintainAspectRatio: false }) }).catch(e => { this.errors.push(e) })
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
