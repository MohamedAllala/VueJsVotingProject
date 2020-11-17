<template>
    <div>
        <div class="col-md-2">

        </div>

        <div class="container-fluid col-md-8">
            <div class="col-lg-12">
                <div class="card">
                    <div class="card-body">
                        <div class="card-two">
                            <header>
                                <div class="avatar">
                                    <img v-bind:src="'src/assets/images/'+items[0].picture" alt="Allison Walker">
                                </div>
                            </header>

                            <h3>{{items[0].name}}</h3>
                            <div class="desc">
                                {{items[0].description}}

                            </div>
                            <div class="contacts">
                                <div class="desc">
                                    Posted At : {{items[0].uploadeDate}}

                                </div>
                                <div class="clear"></div>
                                <div class="desc">
                                    Total Votes  : {{items[0].rate}}

                                </div>
                                
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="col-lg-12">
                <div class="card">
                    <div class="card-body">
                        <div class="card-two">
                            <header>
                                <div class="avatar">
                                    <img v-bind:src="'src/assets/images/'+items[1].picture" alt="Allison Walker">
                                </div>
                            </header>

                            <h3>{{items[1].name}}</h3>
                            <div class="desc">
                                {{items[1].description}}

                            </div>
                            <div class="contacts">
                                <div class="desc">
                                    Posted At : {{items[1].uploadeDate}}

                                </div>
                                <div class="clear"></div>
                                <div class="desc">
                                    Total Votes  : {{items[1].rate}}

                                </div>
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
export default {
    data() {
        return {
            items: [],
        }
    }
    ,created: function() {
         if(this.$session.get('userId')==null) {
          this.$router.push('/');
      }
        this.fetchItems();
    },
    methods: {
        fetchItems() {
        let uri = 'http://localhost:3000/api/rate';
        this.axios.get(uri).then((response) => {
            this.items = response.data;
           
            console.log(this.items)           
        });
        return;
    }
    }
    

}
</script>
  
