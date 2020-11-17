   <template>
       <div class="page-wrapper">
   <div class="container-fluid">
                <!-- Start Page Content -->
                <div class="row">
                    <div class="col-12">
                        <div class="card">
                            <div class="card-body">
                               

          <button class="btn btn-green dropdown-toggle" type="button" data-toggle="dropdown"><i class="ti-plus"></i>Add Gift
										<span class="caret"></span></button>
                                    <ul class="dropdown-menu">
                                        <li><a @click="OpenimporrtCSV()" href="#">import cvs</a></li>
                                      
                                        <li><a @click="OpenModalAddGift()" href="#">Form</a></li>
                                        <li class="divider"></li>
                                     
                                    </ul>

                                <div class="table-responsive m-t-40">
 
                                    <table id="example23" class="display nowrap table table-hover table-striped table-bordered" cellspacing="0" width="100%">
                                        <thead>
                                            <tr>
                                                <th>Id</th>
                                                <th>Value</th>
                                                 <th>Number</th>
                                                <th>Minimum of Points</th>
                                                <th>Modify</th>
                                                <th>Delete</th>
                                               
                                            </tr>
                                        </thead>
                                        
                                        <tbody v-for="(gift,index) in gifts" :key="index">
                                            <tr>
                                                <td>{{gift._id}}</td>
                                                <td>{{gift.value}}</td>
                                                <td>{{gift.nbr}}</td>
                                                <td>{{gift.MinimumOfPoint}}</td>
                                                <td><button type="button" @click="openModal(gift)" class="btn btn-danger btn-flat btn-addon m-b-10 m-l-5"><i class="ti-settings"></i>Modify</button></td>
                                                <td><button type="button" class="btn btn-info btn-flat btn-addon m-b-10 m-l-5" @click="Supprimer(gift._id)"><i class="ti-close"></i> Delete</button></td>
                                            </tr>
                                          
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                     
                    </div>
                </div>
                <!-- End PAge Content -->
              <modal  name="ImportCSV" class="modal-backdrop">
      <div class="modal">
      <header class="modal-header">
        <slot name="header">
        Import csv
          <button type="button"  @click="CloseimporrtCSV()" class="btn-close" > x </button>
        </slot>
      </header>
      <section class="modal-body">
<form  class="form-valide" v-on:submit.prevent="importcsv()" >
                                         <div class="form-group row">
                                            <label class="col-lg-4 col-form-label" for="val-website">File <span class="text-danger">*</span></label>
                                            <div class="col-lg-6">
                                             <input type="file" @change="onFileChange">
                                            </div>
                                        </div>
                                        
                            
                                       
                                      
                                        <div class="form-group row">
                                            <div class="col-lg-8 ml-auto">
                                                <button type="submit" class="btn btn-green">Import</button>
                                            </div>
                                        </div>
                                    </form>
                                    </section>
       <footer class="modal-footer">
          <slot name="footer">
          

            <button
              type="button"
              class="btn-green"
              @click="CloseimporrtCSV()"
            >
              Close me!
          </button>
        </slot>
      </footer>
    </div>
</modal>
  <modal  name="Modif-gift" class="modal-backdrop">
      <div class="modal">
      <header class="modal-header">
        <slot name="header">
         Upadte a Gift
          <button type="button" @click="hide()" class="btn-close" > x </button>
        </slot>
      </header>
      <section class="modal-body">
<form  class="form-valide"  v-on:submit.prevent=updateGift>
                                         <div class="form-group row">
                                            <label class="col-lg-4 col-form-label" for="val-website">Numbers <span class="text-danger">*</span></label>
                                            <div class="col-lg-6">
                                                <input type="number"  v-model.number="data.nbr" class="form-control" id=item name="number-gift" >
                                            </div>
                                        </div>
                                        <div class="form-group row">
                                            <label class="col-lg-4 col-form-label" for="val-website">Points's Min <span class="text-danger">*</span></label>
                                            <div class="col-lg-6">
                                                <input type="number" v-model.number="data.MinimumOfPoint" class="form-control" id="val-website" name="val-website" >
                                            </div>
                                        </div>
                                        <div class="form-group row">
                                            <label class="col-lg-4 col-form-label" for="val-website">Value <span class="text-danger">*</span></label>
                                            <div class="col-lg-6">
                                                <input type="number" v-model.number="data.value" class="form-control"  id="val-website" name="'value'+item" >
                                            </div>
                                        </div>
                                     
                            
                                       
                                      
                                        <div class="form-group row">
                                            <div class="col-lg-8 ml-auto">
                                                <button type="submit" class="btn btn-green">Update</button>
                                            </div>
                                        </div>
                                    </form>
                                    </section>
       <footer class="modal-footer">
          <slot name="footer">
          

            <button
              type="button"
              class="btn-green"
              @click="hide()"
            >
              Close me!
          </button>
        </slot>
      </footer>
    </div>
</modal>
 <modal name="Add-Gift-Modal" class="modal-backdrop">
      <div class="modal">
      <header class="modal-header">
        <slot name="header">
         Add a Gift

          <button type="button" class="btn-close" @click="hideModalAddGift()"> x </button>
        </slot>
      </header>
      <section class="modal-body">
<form  class="form-valide"  v-on:submit.prevent=addGift>
                                         <div class="form-group row">
                                            <label class="col-lg-4 col-form-label" for="val-website">Numbers <span class="text-danger">*</span></label>
                                            <div class="col-lg-6">
                                                <input type="number"  v-model.number="newGift.nbr" class="form-control" id=item name="number-gift" >
                                            </div>
                                        </div>
                                        <div class="form-group row">
                                            <label class="col-lg-4 col-form-label" for="val-website">Points's Min <span class="text-danger">*</span></label>
                                            <div class="col-lg-6">
                                                <input type="number" v-model.number="newGift.MinimumOfPoint" class="form-control" id="val-website" name="val-website" >
                                            </div>
                                        </div>
                                        <div class="form-group row">
                                            <label class="col-lg-4 col-form-label" for="val-website">Value <span class="text-danger">*</span></label>
                                            <div class="col-lg-6">
                                                <input type="number" v-model.number="newGift.value" class="form-control"  id="val-website" name="'value'+item" >
                                            </div>
                                        </div>
                                     
                            
                                       
                                      
                                        <div class="form-group row">
                                            <div class="col-lg-8 ml-auto">
                                                <button type="submit" class="btn btn-green">ADD</button>
                                            </div>
                                        </div>
                                    </form>
                                     </section>
       <footer class="modal-footer">
          <slot name="footer">
          

            <button type="button" class="btn-green"  @click="hideModalAddGift()" >  Close me!  </button>
        </slot>
      </footer>
    </div>
</modal>
            </div>
</div>
           </template>
           
            <script>
export default {
  data() {
    return {
      gifts: [],
      newGift: {},
      data: {},
      jsonfields: {
        _id: "String",
        MinimumOfPoint: "Number",
        nbr: "Number",
        partner: "String",
        value: "Number"
      },
      json_data: [],
      json_meta: [
        [
          {
            key: "charset",
            value: "utf-8"
          }
        ]
      ],
      fileinput: "",
      partnerId: ""
    };
    name: "listsGiftByPartner";
  },

 created: function() {
         if(this.$session.get('userId')==null) {
          this.$router.push('/');
      }
        this.fetchItems();
    this.javascript();
    },mounted: function () {
  console.log(this);
},

  methods: {
    fetchItems() {
      this.partnerId = this.$route.params.id;
      let uri =
        "http://localhost:3000/gifts/byIdpartner/" + this.$route.params.id;
      this.axios.get(uri).then(response => {
        this.gifts = response.data;
      
        var xform = [];
        for (var i = 0, max = this.gifts.length; i < max; i++) {
          xform[xform.length] = JSON.stringify(this.gifts[i]);
        }

        this.json_data = xform;
        //this.json_data = JSON.parse(this.gifts);
        //  console.log(  this.json_data);
      });
      console.log(this.gifts);
    },
    addGift() {
      this.newGift.partner = this.$route.params.id;
      console.log(this.newGift);

      let uri = "http://localhost:3000/gifts/add";
      this.axios.post(uri, this.newGift).then(response => {

         if(response.status==200)
      {  this.$swal('ADDED', 'You successfully add a gift', 'success');
    
      
          this.hideModalAddGift();
        this.fetchItems();
      }
      else
      {
          this.$swal('Not Added', 'Erreur', 'error');
      
          this.hideModalAddGift();
     //   this.fetchItems();
      }
      });
    },
    updateGift() {
      console.log(this.data);

      let uri = "http://localhost:3000/gifts/update/" + this.data._id;
      this.axios.post(uri, this.data).then(response => {
        console.log(response);
        if (response.status == 200) {
           if(response.status==200)
      {  this.$swal('Updated', 'You successfully update this gift', 'success');
      this.hide();
        this.fetchItems();
      }
      else
      {
          this.$swal('Not Updated', 'Erreur', 'error');
      this.hide();
      }
        
          
        }
      });
    },

    Supprimer(idGift) {
      let uri = "http://localhost:3000/gifts/" + idGift;
      this.axios.delete(uri, this.item).then(response => {
       if(response.status==200)
      {  this.$swal('Delete', 'You successfully delete this gift', 'success');
    
        this.fetchItems();
      }
      else
      {
          this.$swal('Not Delete', 'Erreur', 'error');
      
      }
        
      });
      this.gifts.splice(idGift, 1);
    },
    openModal(Gift) {
      console.log(Gift);
      this.data = Gift;

      this.$modal.show("Modif-gift", { Gift: Gift });
      //  this.active = true;
    },
    hide() {
   
      this.$modal.hide("Modif-gift");
    },
    OpenModalAddGift() {
      this.$modal.show("Add-Gift-Modal");
    },
    hideModalAddGift() {
      this.$modal.hide("Add-Gift-Modal");
    },
      OpenimporrtCSV() {
      this.$modal.show("ImportCSV");
    },
CloseimporrtCSV()
{
   this.$modal.hide("ImportCSV");
},
   /* csvExport() {
      var csvContent = "data:text/csv;charset=utf-8,";
      csvContent += this.gifts
        .map(function(d) {
          console.log(d);
          return JSON.stringify(d);
        })
        .join("\n")
        .replace(/(^\{)|(\}$)/gm, "");
      window.open(encodeURI(csvContent));
    }*/

    onFileChange(e) {
      //const csv = require("../../../node_modules/csvtojson");
      var files = e.target.files || e.dataTransfer.files;
      var string = "";
      var file = files[0];

      var reader = new FileReader();

      var files = e.target.files || e.dataTransfer.files;
      if (!files.length) return;
      const csv = require("csvtojson");

      var reader = new FileReader();
      var vm = this;
      reader.onload = e => {
      this.fileinput=reader.result;
  vm.fileinput = reader.result;
      
      };
      reader.readAsText(file);
    },
importcsv()
{
var idPartner = this.$route.params.id;
    this.csvJSON(this.fileinput, idPartner);
      
},
    csvJSON(csv, idPartner) {
      var lines = csv.split("\n");
var axios =require('axios');

      var result = [];
      var headers = [];
 var obj = {};
       headers = lines[0].split(";");
    
      lines.splice(0, 1);
      lines.forEach(function(line) {
         obj = {};
     
        var currentline = line.split(";");
         obj["MinimumOfPoint"] = parseInt(currentline[0]);
            obj["nbr"] = parseInt(currentline[1]);
               obj["value"] = parseInt(currentline[2]);
                  obj["partner"] = idPartner;
      //    console.log("headers");
       //   console.log(headers);
       // headers.forEach(function(header, i) {
        /*   console.log(i);
            console.log(headers.length);
             console.log(header);
          if(i===headers.length -1)
           
            {    console.log("la");
          
              header= headers[i].toString();
               console.log( header.toString());
                obj[''+header.toString()] = parseInt(currentline[i]);
              console.log(  obj);
            }
      else{
          obj[header] = parseInt(currentline[i]);
         
         // console.log(obj);
         // console.log(currentline[i]);*/

   //     });
 
  console.log(obj);
  //var header2 = JSON.parse(obj);

      let uri = "http://localhost:3000/gifts/add";
         console.log("uri");
        
       
   axios.post(uri, obj).then(response => {
       console.log(response);
         if(response.status==200)
      {  this.$swal('ADDED', 'You successfully add a gift', 'success');
    
      
          this.hide();
        this.fetchItems();
      }
      else
      {
          this.$swal('Not Added', 'Erreur', 'error');
      
          this.hide();
     //   this.fetchItems();
      }
     });
       });
        result.push(obj);
      //  this.CloseimporrtCSV();
      //  this.fetchItems();
     
    }
  }
};
</script>
<style>
.btnAdd {
  margin-bottom: 10px;
  margin-left: 10px;
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
