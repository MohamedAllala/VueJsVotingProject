  


<template>
    <div class="page-wrapper">
   <div class="container-fluid">
               
                <div class="row">
                    <div class="col-lg-6">

<button @click="myFunction">ok </button>

<div id="chartContainer" style="height: 370px; width: 100%;"></div>
</div>
</div>
</div>
</div>
</template>


   <script>
   
 export default {
     data() {
    return {
                Election: []
       }
    
    }  , 
    created : function(){
      console.log("Sessionn : "+ this.$session.get('user'))
      console.log("Sessionn : "+ this.$session.get('userId'))
      console.log("Sessionn : "+ this.$session.get('userName'))
      if(this.$session.get('userId')==null) {
          this.$router.push('/');
      }
    
    },
  
    methods: {
    
 
      myFunction() {
 
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
			{ label: "apple",  y: 45  },
			{ label: "orange", y: 15  },
			{ label: "banana", y: 25  },
			{ label: "mango",  y: 30  },
			{ label: "grape",  y: 28  }
		]
	}
	]
});
chart.render();
}
  }



 }
    
</script>






