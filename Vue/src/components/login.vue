<template>
  <div>
      
      <div class="preloader">
          
        <svg class="circular" viewBox="25 25 50 50">
			<circle class="path" cx="50" cy="50" r="20" fill="none" stroke-width="2" stroke-miterlimit="10" /> </svg>
    </div>
    <!-- Main wrapper  -->
    <div id="main-wrapper">
      
        <div class="unix-login">
            <div class="container-fluid">
                <div class="row justify-content-center">
                    <div class="col-lg-4">
                        <div class="login-content card">
                            <div class="login-form">
                                <h4>Login</h4>
                                <form>
                                    <div class="form-group">
                                        <label>Address</label>
                                        <input type="text" class="form-control" placeholder="Given Adress " v-model="login">
                                    </div>
                                    <div class="form-group">
                                        <label>Password</label>
                                        <input type="password" class="form-control" placeholder="Password" v-model="password">
                                    </div>
                                    <div class="checkbox">
                                        <label>
        										<input type="checkbox"> Remember Me
        									</label>
                                        <label class="pull-right">
        										<a href="#">Forgotten Password?</a>
        									</label>

                                    </div>
                                   
                                         <button type="submit" class="btn btn-primary btn-flat m-b-30 m-t-30" @click="doLogin">Sign in</button>
                                    
                                   
                                    <div class="register-link m-t-15 text-center">
                                        <p>Don't have account ? <a href="#"> Sign Up Here</a></p>
                                    </div>
                                </form>
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
        user: { email :"" , password:"",name: "",role :"",picture :"" ,address :"",privateKey:"" }, 
        login : "" , password : ""
       
    
       } 

    
    } , 
   


  created: function() {
   
  },
    methods : {
        doLogin() {
            /*let newCr = {
                address : "0x7C2016CDb433d65970FF6dA2F384939968ad946e" , 
                password : "123456"
            }*/
            let uri = "http://localhost:3000/api/users/login"; 
                  this.axios.post(uri, {address : this.login , password : this.password}).then((res) => {
                      
                      this.user = res.data ; 
                      console.log(this.user) ;

                      this.$session.start(); 
                      this.$session.set('user',this.user.address) ; 
                      this.$session.set('userId',this.user._id);
                      this.$session.set('userName',this.user.name) ;
                       this.$session.set('solde',this.user.solde) ;
                       this.$session.set('role',this.user.role) ;
                      //console.log("Sessionn : "+ this.$session.get('user'))
                                    
                })

                this.$router.push('chatbot') ;
        
     }
    }
     
 }
    
</script>