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
                                    <img v-bind:src="'src/assets/images/'+items[0].idea.picture" alt="Allison Walker">
                                </div>
                            </header>

                            <h3>{{items[0].idea.name}}</h3>
                            <div class="desc">
                                {{items[0].idea.description}}

                            </div>
                            <div class="contacts">
                                <div class="desc">
                                    Posted At : {{items[0].idea.uploadeDate}}

                                </div>
                                <div class="clear"></div>
                    

                                  

                                 <button v-if="test==false" type="submit" class="btn btn-small btn-block btn-success full-width" @click="submitRate"><i class="fa fa-star"></i><i class="fa fa-star"></i><i class="fa fa-star"></i><i class="fa fa-star"></i></button>
                            </div>

                            <div class="alert alert-info"  v-if="test==true">
                                        The Given Mark Was Successfully Submited Thank you !!  Click  <router-link to="/listIdeas" class="alert-link">  Here</router-link> to discover More Ideas
                                    </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-lg-12">
                <div class="card">
                    <!-- Nav tabs -->

                    <!-- Tab panes -->
                    <div class="tab-content">
                        <div class="tab-pane active show" id="home" role="tabpanel">
                            <div class="card-body">
                                <div class="profiletimeline">
                                    <div class="sl-item" v-for="item in items">
                                        <div class="sl-left"> <img v-bind:src="'src/assets/images/'+user[0].picture" alt="user" class="img-circle"> </div>
                                        <div class="sl-right">
                                            <div>
                                                <a href="#" class="link">{{item.user.name}}</a>
                                                <span class="sl-date">{{item.postedAt}} </span>
                                                <blockquote class="m-t-10">
                                                    {{item.text}}
                                                </blockquote>

                                            </div>
                                        </div>
                                        <div class="like-comm m-t-20">

                                            <button v-if="connectedUser == item.user._id" class="btn btn-rounded m-b-10 m-l-5" v-on:click="deleteComment(item._id)">
                                                <i class="fa fa-eraser"></i>
                                            </button>
                                            <button v-if="connectedUser == item.user._id" class="btn btn-rounded m-b-10 m-l-5" v-on:click="change(item._id)">
                                                <i class="fa fa-edit"></i>
                                            </button>

                                        </div>

                                    </div>
                                    <hr>

                                </div>

                            </div>

                        </div>
                        <!--second tab-->

                    </div>

                </div>

            </div>
            <div class="nput-group input-group-rounded">
                <form v-if="test==true">
                    <input type="text" v-model="inputUpdate.text" class="form-control" :placeholder="inputUpdate.text">
                    <br>
                    <input type="submit" v-on:click="updateComment()" class="btn btn-success btn-rounded m-b-10 m-l-5" value="update Comment">
                </form>
            </div>

            <form>
                <div class="nput-group input-group-rounded">

                    <input type="text" class="form-control" v-model="input.text" placeholder="Your Comment" />
                </div>

                <br>

                <button type="submit" class="btn btn-small btn-block btn-success full-width" @click="addComment">Submit</button>
            </form>

        </div>

    </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            items: [],
            user: {
                solde: '',
                _id: '',
                email: '', password: '', name: '', role: '', picture: ''
            },
            input: {
                text: "",
                idea: "",
                user: this.$session.get('userId')
            },
            test: false,
            inputUpdate: {
                text: "",

            }
            , idToUpdate: ""  , 
            rate : {
                value : typeof(number), 
                user : "" , 
                idea : ""
            } , 
            name : this.$session.get('userName') , test:false , 
            connectedUser : this.$session.get('userId') 

        }

    },

    created: function() {
         if(this.$session.get('userId')==null) {
          this.$router.push('/');
      }
        this.fetchItems();
    },

    methods: {
        fetchItems() {
            this.axios.get('http://localhost:3000/api/users/5abf811d49b0f60d4caa8272').then((response) => {
                this.user = response.data;


            })

            let uri = 'http://localhost:3000/api/comments/idea/' + this.$route.params.id;
            this.axios.get(uri).then((response) => {
                this.items = response.data;

                console.log(this.test);
            });
            return;

        },
        addComment() {
            this.input.idea = this.$route.params.id;



            let uri = "http://localhost:3000/api/comments";
            this.axios.post(uri, this.input).then((response) => {
                this.fetchItems();
            })
            return;
        },
        deleteComment(id) {
            let uri = "http://localhost:3000/api/comments/" + id;
            this.axios.delete(uri).then(response => {
                this.fetchItems();
            })
        },
        change(id) {
            this.idToUpdate = id;
            this.test = true;
            console.log(this.idToUpdate)
            console.log(this.test)

        },
        updateComment() {
            let uri = "http://localhost:3000/api/comments/" + this.idToUpdate;
            this.axios.put(uri, this.inputUpdate).then((response) => {
                console.log(response.data)
                this.fetchItems();
                this.test = false;
            })
        } , 
        submitRate(){
            this.$swal({
           
    		 title: 'Give Us A Mark !! ',
          html:
            '<input type="Number" class="form-control" id="text"> ',
          inputPlaceholder: 'Enter your Comment here',
          showCloseButton: true,
        }).then(() => {
   
              this.rate.idea = this.$route.params.id ; 
             this.rate.user = "5abf811d49b0f60d4caa8272" ; 
             this.rate.value = parseInt(text.value) ; 
             console.log(typeof(parseInt(text.value)))
    
             let uri = "http://localhost:3000/api/rate";
             this.axios.post(uri,this.rate).then((response)=>{
                // this.fetchItems(); 
                this.test = true ; 
             })
        
          

        })
             
        }


    }
}
</script>