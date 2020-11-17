<template>
<div class="page-wrapper">

        <div class="container-fluid">
            <paginate name="partnerspagination"  ref="paginator" class="paginate-list" :list="this.partners" :per="4">

            <!-- Start Page Content -->
            <div class="row">
             
     <div class="col-md-6" v-for="(item,index) in paginated('partnerspagination')"  :key="index">

                    <div class="card">
                        <div class="card-body">
                            <h4 class="card-title">{{item.name}}</h4>

                            <div class="tab-content br-n pn">
                                <div id="navpills-1" class="tab-pane active show">
                                    <div class="row">
                                        <div class="col-md-4"> <img v-bind:src="item.image" class="img-fluid thumbnail m-r-15"> </div>
                                        <div class="col-md-8">
                                            
                                            <p>
                                                <br> {{item.description}} .
                                              </p>
                                             
                                        </div>
                                       
                                        <div class="button-list col-md-8 ">
                                            <div class="btn-group">
                                         
                                                 
                                              
                                                
                                                  
                                                
                                            </div>
                                        </div>

                                         <button class="btn btn-danger btn-rounded m-b-10 m-l-5" @click="openModal(item._id)">
                                                    <i class="fa fa-check">Check Gifts</i>
                                                </button>
                                               

                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>

            </div>
                </paginate>
 <paginate-links  for="partnerspagination"  :show-step-links="true"></paginate-links>

            <!-- End PAge Content -->
        </div>
   <modal name="listGift" class="modal-backdrop">
                     <div class="modal">
      <header class="modal-header">
        <slot name="header">
       Gift's List 
          <button type="button"    @click="hideModal()" class="btn-close" > x </button>
        </slot>
      </header>
      <section class="modal-body">
           
                              
                                    <table class="table">
                                        <thead>
                                            <tr>
                                                <th></th>
                                               
                                                <th>Minimum of point</th>
                                                 <th>Value(DT)</th>
                                                <th>Buy</th>
                                              
                                            </tr>
                                        </thead>
                                        <tbody> 

                                            <tr  v-for="(gift,index) in gifts" v-if="gift.nbr>0" :key="index">
                                                <td>
                                                    <div class="round-img">
                                                        <i class="fa fa-gift"></i>
                                                    </div>
                                                </td>
                                               
                                                <td><span>{{gift.MinimumOfPoint}}</span></td>
                                                <td><span>{{gift.value}}</span></td>
                                                <td> <span> <button type="button"   @click="Buy(gift)" class="btn-green" > Buy </button></span></td>
                                            </tr>
                                           
                                           
                                        </tbody>
                                    </table>
                              
                           
                         </section>
       <footer class="modal-footer">
          <slot name="footer">
          

            <button
              type="button"
              class="btn-green"
              @click="hideModal()"
            >
              Close me!
          </button>
        </slot>
      </footer>
    </div>
</modal>
    </div>
</template>
<script>
    

    export default {
        data(){
            return{
                partners: [],
                str:"#",
                  
  gifts: [],
    paginate: ['partnerspagination'],

            }
            name : 'listPartners'
            
        },

       created: function() {
         if(this.$session.get('userId')==null) {
          this.$router.push('/');
      }
        this.fetchItems();
    },  mounted: function () {
  console.log(this);
},

        methods: {
            fetchItems()
            { 
            var partners=[];
              let uri = 'http://localhost:3000/partners';
              this.axios.get(uri).then((response) => {
                 this.partners = response.data;
                  this.partners.forEach(partner => {
                  

 let uri = 'http://localhost:3000/partners/getlogoPartner/' + partner._id;
                this.axios.get(uri,{ responseType: 'arraybuffer' }).then((response) => {
             // console.log( response.type);
             // response.type
                if(response.status==200)
               {  // console.log("200");
             //     var image = new Image();
                     // console.log(response);
                     //   console.log(image);
                     
         //var  tt=   new Buffer(response.data, 'binary').toString('base64');
                partner.image='data:image/jpeg;base64,' + btoa(
            new Uint8Array(response.data)
            .reduce((data, byte) => data + String.fromCharCode(byte), '')
        );
    //  var reader = new FileReader();
    //  var vm = this;

     //   reader.read(response.data); 
      //  reader.onload = function() {

          //    vm.image = reader.result;
        // partner.image=image;

     //   }
                    
                   }
                else  {
                    partner.image="src/assets/partenaire.png";
                   
                      }
                });
              //  this.partners.push(partner);
});
           
              });
           //   console.log(this.partners)
            },
            checkGifts(idPartner)
            {     console.log("rfff");
              let uri = 'http://localhost:3000/gifts/byIdpartner/' + idPartner;
                this.axios.get(uri, this.item).then((response) => {
               this.gifts = response.data;
                
                });
                
               
            },
 /*redirect(hu) {
     
     var c=this.str.concat(hu);
       console.log("rfff");
   var link = document.getElementsByName(hu);
     console.log(hu);
 console.log(this.str.concat(hu));

link[0].setAttribute('href',c);
//link.innerHTML=link.href.replace(this.str.concat(hu));
this.checkGifts(hu);
  
},

 redirect2(hu) {
   
     var c=this.str.concat(hu);
       console.log("rfff");
   var link = document.getElementsByName(hu);
     console.log(hu);
 console.log(this.str.concat(hu));

link[0].setAttribute('href',c);
//link.innerHTML=link.href.replace(this.str.concat(hu));

  
},*/
openModal(idPartner) {
      console.log(idPartner);
    this.checkGifts(idPartner);

      this.$modal.show("listGift");
      //  this.active = true;
    },
    hideModal() {
      this.$modal.hide("listGift");
      this.gifts=[];
    },
    Buy(gift)
    {
            var purchase={};
  var user={};
        user._id=this.$session.get("userId");
          user.solde=this.$session.get("solde");        purchase.gift=gift;
          purchase.user=user;
             console.log(purchase);
       let uri = 'http://localhost:3000/purchaseGifts/add';
             this.axios.post(uri, purchase).then(response => {
       console.log(response.status);
       if(response.status==200) { this.hideModal();
         this.$swal('purchase effectued with success','success');}
     //  console.log(purchase);
         else    // Use sweetalret2
            this.$swal('Not having enougth points','error');
    
      });
        }
    }}

</script>
<style >


paginate-links {
    display: inline-block;
}

.paginate-links  a {
    color: black;
    float: left;
    padding: 8px 16px;
    text-decoration: none;
    border: 1px solid #ddd;
}

.paginate-links  li.active a {
    background-color: #ef5350;
    color: white;
    border: 1px solid #ef5350;
}

.paginate-links li a:hover:not(.active) {background-color: #ddd;}

.paginate-links li a:first-child {
    border-top-left-radius: 5px;
    border-bottom-left-radius: 5px;
}


.pagination2 a:last-child {
    border-top-right-radius: 5px;
    border-bottom-right-radius: 5px;
}
.flex-container {
  display: flex;
  flex-wrap: wrap;
}



.modal-backdrop {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal {
  background: #ffffff;
  box-shadow: 2px 2px 20px 1px;
  overflow-x: auto;
  display: flex;
  flex-direction: column;
}

.modal-header,
.modal-footer {
  padding: 15px;
  display: flex;
}

.modal-header {
  border-bottom: 1px solid #eeeeee;
  color: #ef5350;
  justify-content: space-between;
}

.modal-footer {
  border-top: 1px solid #eeeeee;
  justify-content: flex-end;
}

.modal-body {
  position: relative;
  padding: 20px 10px;
}

.btn-close {
  border: none;
  font-size: 20px;
  padding: 20px;
  cursor: pointer;
  font-weight: bold;
  color: #ef5350;
  background: transparent;
}

.btn-green {
  color: white;
  background: #ef5350;
  border: 1px solid #ef5350;
  border-radius: 2px;
}
</style>
