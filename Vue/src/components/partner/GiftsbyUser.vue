<template>

  
                    
<div class="page-wrapper">
 <div class="container-fluid col-lg-12">
               
           
 <div class="card">
                            <div class="card-title">
                                <h4>My Gift</h4>
                            </div>
                            <div class="card-body">
                                <div class="table-responsive">
                                    <table class="table">
                                        <thead>
                                            <tr>
                                                <th></th>
                                                <th>Partner's Name</th>
                                                <th>Gift's Value DNT</th>
                                                <th>Purchase Date</th>
                                                <th>Download</th>
                                            </tr>
                                        </thead>
                                        <tbody>

                                            <tr v-for="purchase in userGifts " :key="purchase._id">
                                                <td>
                                                    <div class="round-img">
                                                        <i class="fa fa-gift"></i>
                                                    </div>
                                                </td>
                                                <td>{{purchase.gift.partner.name}}</td>
                                                <td ><span>{{purchase.gift.value}}</span></td>
                                                <td><span>{{purchase.receptionDate| formatDate}}</span></td>
                                                <td> <button type="button" class="btn-green" @click="DownLoad(purchase)" > Download </button></td>
                                            </tr>
                                           
                                          
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
</div>
</div>
</template>
<script>
    

    export default {
        data(){
            return{
               
             idconnectedUser:String,
                  
  userGifts: [],
   // paginate: ['userGiftspagination'],

            }
            name : 'GiftsbyUser'
            
        },

       created: function() {
         if(this.$session.get('userId')==null) {
          this.$router.push('/');
      }
        this.fetchItems();
    },

        methods: {
            fetchItems()
            {  this.connectedUser._id=this.$session.get("userId");
              let uri = 'http://localhost:3000/purchaseGifts/byIdUser/'+this.connectedUser._id;
              this.axios.get(uri).then((response) => {
                  this.userGifts = response.data;
console.log( this.userGifts);

            
              this.userGifts.forEach(purchase => {

                  let uri = 'http://localhost:3000/gifts/' + purchase.gift;
                this.axios.get(uri).then((response) => {
                  
              purchase.gift= response.data;
               console.log( purchase);
                let uri = 'http://localhost:3000/partners/' +  purchase.gift.partner;
                this.axios.get(uri).then((response) => {
                  
               purchase.gift.partner= response.data;
                                
                  

 let uri = 'http://localhost:3000/partners/getlogoPartner/' + response.data._id;
                this.axios.get(uri,{ responseType: 'arraybuffer' }).then((response) => {
             // console.log( response.type);
             // response.type
                if(response.status==200)
               {  
                purchase.gift.partner.image='data:image/jpeg;base64,' + btoa(
            new Uint8Array(response.data)
            .reduce((data, byte) => data + String.fromCharCode(byte), '')
        );
  
                    
                   }
                else  {
                    purchase.gift.partner.image="src/assets/partenaire.png";
                   
                      }
                });
            

               });  }); 
                  purchase.userReceiver=this.connectedUser;
               });
              });
           
            },
         

DownLoad(purchaseGift)

            { 
                  this.$router.push({ name: "giftTemplate", params: { purchaseGift: purchaseGift } });
               
            },
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
  color: #4aae9b;
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
