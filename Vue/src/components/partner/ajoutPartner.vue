<template>
<div class="page-wrapper">
    
<div class="container-fluid">
                 <!-- Start Page Content -->
                <div class="row justify-content-center">
                    <div class="col-12">
                        <div class="card">
                            <div class="card-body">
                                <div class="form-validation">
                                    <form  class="form-valide" v-on:submit.prevent=addPartner >
                                        <div class="form-group row" >
                                            <label class="col-lg-4 col-form-label" for="val-username">Partner's Name <span class="text-danger">*</span></label>
                                            <div class="col-lg-6">
                                                <input type="text"  v-model="partner.name" class="form-control"  name="val-username" placeholder="Enter a name..">
                                        
                                            </div>
                                        </div>
                                        <div class="form-group row"  >
                                            <label class="col-lg-4 col-form-label" for="val-email">Partner's Description <span class="text-danger">*</span></label>
                                            <div class="col-lg-6">
                                                <textarea   v-model="partner.description" class="form-control" id="val-suggestions" name="val-suggestions" rows="20" placeholder="Add a Description"></textarea>
                
                                            </div>
                                        </div>
                                     <div v-if="!image">
                                           <div class="form-group row">
                                            <label class="col-lg-4 col-form-label" for="val-email">Select an image <span class="text-danger"></span></label>
                                            <div class="col-lg-6">
    <input type="file" name="image" @change="onFileChange">
                                            </div>
                                        </div>
   
  </div>
  <div v-else>
    <div class="form-group row">
                                            <label class="col-lg-4 col-form-label" for="val-email">Remove image <span class="text-danger"></span></label>
                                            <div class="col-lg-6">
   <img :src="image" />
   <button @click="removeImage()">Remove image</button>
                                            </div>

  </div>                          
      </div>                  
                                   
                                        <div class="form-group row">
                                            <div class="col-lg-8 ml-auto">
                                                <button type="submit" class="btn btn-primary">Add</button>
                                            </div>
                                        </div>
                                    </form>
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
    

    export default {
        data(){
            return{
                 gifts:[{value:'',nbr:'',MinimumOfPoint:''},],
                 partner: 
                {name: '', description: '',gifts:[]},
      nbrGifts:0,
        image: '',
          logo: ''
            }
            name : 'addpartner'
           
        },

       mounted: function () {
    
         if(this.$session.get('userId')==null) {
          this.$router.push('/');
      
        
         }
},

        
    methods: {
          validateBeforeSubmit(e) {
        this.$validator.validateAll();
     
            this.addPartner()
        
      },
      addPartner(){
             console.log(this.gifts)
         
      this.partner.gifts=this.gifts;
       
           console.log(this.partner)
         // console.log(this.gifts)
 let uri = 'http://localhost:3000/partners/add';

        this.axios.post(uri, this.partner).then((response) => {
             console.log("response")
             console.log(response.data)
            const image = new FormData()
           
       /*       Object.defineProperty(this.logo , 'name', {
                configurable:true,
                writable: true,
                value: response.data._id
});*/
          image.append('id', response.data._id);
  image.append('image', this.logo,response.data._id);
       //   console.log(response)
       console.log(image);
       var id=response.data._id;
      //    this.openModal();
    this.axios.post('http://localhost:3000/partners/uploadLogo', image,{headers: {
       'Content-Type': 'multipart/form-data'
    }}).then((response) => {
       console.log(response)
       
//   this.$router.push({ name: "listPartnersAdmin"});

})
   })
     
      }, 
 
      
      onFileChange(e) {
      var files = e.target.files || e.dataTransfer.files;
      if (!files.length)
        return;
      this.createImage(files[0]);
      this.logo=files[0];
    },
    
    createImage(file) {
      //   const webpack = require('webpack')
      var image = new Image();
      var reader = new FileReader();
      var vm = this;

      reader.onload = (e) => {

        vm.image = e.target.result;
      
       
       // this.image.mv('../../assets/images/PartnersLogo/'+this.image.name);
      };
      reader.readAsDataURL(file);
    },
    removeImage: function (e) {
      this.image = '';
    }
        }
    }

</script>
<style>
img {
  width: 30%;
  margin: auto;
  display: block;
  margin-bottom: 10px;
}
  .dropbox {
    outline: 2px dashed grey; /* the dash box */
    outline-offset: -10px;
    background: lightcyan;
    color: dimgray;
    padding: 10px 10px;
    min-height: 200px; /* minimum height */
    position: relative;
    cursor: pointer;
  }

  .input-file {
    opacity: 0; /* invisible but it's there! */
    width: 100%;
    height: 200px;
    position: absolute;
    cursor: pointer;
  }



body {
  font-family: Helvetica, sans-serif;
}
.container {
  width: 500px;
}
h1 {
  text-align: center
}
img {
  text-align: center
}
.submitted {
  color: #4fc08d;
}

</style>
