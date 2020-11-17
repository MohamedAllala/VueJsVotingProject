   <template>
    <div class="page-wrapper">
   <div class="container-fluid">
                <!-- Start Page Content -->
                <div class="row">
                    <div class="col-12">
                        <div class="card">
                            <div class="card-body">
                                <h4 class="card-title">Partner's List</h4>
                                <h6 class="card-subtitle"></h6>
                                <div class="table-responsive m-t-40">
                                    <table id="example23" class="display nowrap table table-hover table-striped table-bordered" cellspacing="0" width="100%">
                                        <thead>
                                            <tr>
                                                <th>Name</th>
                                                <th>Description</th>
                                                 <th>Adheration Date</th>
                                                <th>Gifts</th>
                                                <th>Modify</th>
                                                <th>Delete</th>
                                               
                                            </tr>
                                        </thead>
                                        <tbody > 
                                       
                                        <tr v-for="partner in partners " :key="partner._id">
                                       
                                          
                                               
                                                <td>{{partner.name}}</td>
                                                <td>{{partner.description}}</td>
                                                <td>{{partner.adherDate| formatDate}}</td>
                                                <td><button type="button" id="show-modal" @click="checkGifts(partner._id)" class="btn btn-primary btn-flat btn-addon m-b-10 m-l-5"><i class="ti-plus"></i>Check</button></td>
                                                <td><button type="button" @click="openModal(partner)" class="btn btn-danger btn-flat btn-addon m-b-10 m-l-5"><i class="ti-settings"></i>Modify</button></td>
                                                <td><button type="button" class="btn btn-info btn-flat btn-addon m-b-10 m-l-5" @click="Supprimer(partner._id)"><i class="ti-close"></i> Delete</button></td>
                                               </tr>
                                            
                                          
                                          
                                       
                                          
                                               
                                          
                                           
                                      
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                     
                    </div>
                </div>
                <!-- End PAge Content -->
                <modal name="ModifyPartner" class="modal-backdrop">
                     <div class="modal">
      <header class="modal-header">
        <slot name="header">
         Modify a Partner
          <button type="button"     @click="hide()" class="btn-close" > x </button>
        </slot>
      </header>
      <section class="modal-body">
<form  class="form-valide"  v-on:submit.prevent=updatePartner>
                                        <div class="form-group row">
                                            <label class="col-lg-4 col-form-label" for="val-username">Partner's Name <span class="text-danger">*</span></label>
                                            <div class="col-lg-6">
                                                <input type="text"  v-model="data.name" class="form-control" id="val-username" name="val-username" placeholder="Enter a name..">
                                            </div>
                                        </div>
                                        <div class="form-group row">
                                            <label class="col-lg-4 col-form-label" for="val-email">Partner's Description <span class="text-danger">*</span></label>
                                            <div class="col-lg-6">
                                                <textarea   v-model="data.description" class="form-control" id="val-suggestions" name="val-suggestions" rows="20" placeholder="Add a Description"></textarea>
                                            </div>
                                        </div>
                                     
                            
                                       
                                      
                                        <div class="form-group row">
                                            <div class="col-lg-8 ml-auto">
                                                <button type="submit" class="btn btn-primary">Update</button>
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
            </div>
       </div>


           </template>
           
            <script>
export default {
  data() {
    return {
      partners: [],
      str: "#",

      gifts: [],
      paginate: ["partnerspagination"],
      active: true,
      data: {}
    };
    name: "listPartnersAdmin";
  },mounted: function () {
  console.log(this);
},

  created: function() {
         if(this.$session.get('userId')==null) {
          this.$router.push('/');
      }
        this.fetchItems();
    this.javascript();
    },

  methods: {
    fetchItems() {
      let uri = "http://localhost:3000/partners";
      this.axios.get(uri).then(response => {
        this.partners = response.data;
        console.log(this.partners);
      });
    },
    updatePartner() {
      console.log(this.data);

      let uri = "http://localhost:3000/partners/update/" + this.data._id;
      this.axios.post(uri, this.data).then(response => {
           console.log(response.status);
      if(response.status==200)
      {  this.$swal('Updated', 'You successfully update this partner', 'success');
      this.hide();
      }
      else
      {
          this.$swal('Not Updated', 'Erreur', 'error');
      this.hide();
      }
      });
    },
    checkGifts(idPartner) {
      this.$router.push({ name: "listsGiftByPartner", params: { id: idPartner } });
    },

    Supprimer(idPartner) {
      let uri = "http://localhost:3000/partners/delete/" + idPartner;
      this.axios.get(uri, this.item).then(response => {
        if(response.status==200)
      {  this.$swal('Deleted', 'You successfully Deleted this partner', 'success');
      this.hide();
           window.location.reload();
      }
      else
      {
          this.$swal('Not Deleted', 'Erreur', 'error');
      this.hide();
      }
      });
      this.partners.splice(idPartner, 1);
    },
    openModal(Partner) {
      console.log(Partner);
      this.data = Partner;

      this.$modal.show("ModifyPartner", { partner: Partner });
      this.active = true;
    },
    hide() {
      this.$modal.hide("ModifyPartner");
    },
    javascript()
    {
        $(document).ready(function() {
        $('#myTable').DataTable();
        $(document).ready(function() {
            var table = $('#example').DataTable({
                "columnDefs": [{
                    "visible": false,
                    "targets": 2
                }],
                "order": [
                    [2, 'asc']
                ],
                "displayLength": 25,
                "drawCallback": function(settings) {
                    var api = this.api();
                    var rows = api.rows({
                        page: 'current'
                    }).nodes();
                    var last = null;
                    api.column(2, {
                        page: 'current'
                    }).data().each(function(group, i) {
                        if (last !== group) {
                            $(rows).eq(i).before('<tr class="group"><td colspan="5">' + group + '</td></tr>');
                            last = group;
                        }
                    });
                }
            });
            // Order by the grouping
            $('#example tbody').on('click', 'tr.group', function() {
                var currentOrder = table.order()[0];
                if (currentOrder[0] === 2 && currentOrder[1] === 'asc') {
                    table.order([2, 'desc']).draw();
                } else {
                    table.order([2, 'asc']).draw();
                }
            });
        });
           $('#example23').DataTable({
        dom: 'Bfrtip',
        buttons: [
            'copy', 'csv', 'excel', 'pdf', 'print'
        ]
    });

    });
 
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
