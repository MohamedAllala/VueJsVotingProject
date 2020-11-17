<template>
  <div class="left-sidebar">
            <!-- Sidebar scroll-->
            <div class="scroll-sidebar">
                <!-- Sidebar navigation-->
                <nav class="sidebar-nav">
                    <ul id="sidebarnav">
                        <li class="nav-devider"></li>
                        <li class="nav-label">Home</li>
                        <li> <a class="has-arrow  " href="#" aria-expanded="false"><i class="fa fa-tachometer"></i><span class="hide-menu">Dashboard <span class="label label-rouded label-primary pull-right">2</span></span></a>
                            <ul aria-expanded="false" class="collapse">
                                <li><a href="index.html">Ecommerce </a></li>
                                <li><a href="index1.html">Analytics </a></li>
                            </ul>
                        </li>
                        <li class="nav-label">Apps</li>
                        <li v-if="this.$session.get('role')=='admin'"> <a class="has-arrow  " href="#" aria-expanded="false"><i class="fa fa-thumbs-up"></i><span class="hide-menu">Election</span></a>
                            <ul aria-expanded="false">
                                <li> <router-link to="/addElection"> Add New Election </router-link></li>
                                <li> <router-link to="/election"> Election's List </router-link> </li>
                                
                            </ul>
                        </li>
                         <li v-if="this.$session.get('role')=='user'"> <a class="has-arrow  " href="#" aria-expanded="false"><i class="fa fa-thumbs-up"></i><span class="hide-menu">Election</span></a>
                            <ul aria-expanded="false">
                                <li> <router-link to="/ListElections"> Election's List </router-link></li>
                                
                              
                            </ul>
                        </li>
                        <li v-if="this.$session.get('role')=='user'" > <a class="has-arrow  " href="#" aria-expanded="false"><i class="fa fa-wpforms"></i><span class="hide-menu">Surveys</span></a>
                            <ul aria-expanded="false" class="collapse">
                                <li><a href="email-compose.html">Compose</a></li>
                                <li><a href="email-read.html">Read</a></li>
                                <li><a href="email-inbox.html">Inbox</a></li>
                            </ul>
                        </li>
                        <li v-if="this.$session.get('role')=='user'" > <a class="has-arrow  " href="#" aria-expanded="false"><i class="fa fa-book"></i><span class="hide-menu">Ideas</span></a>
                            <ul aria-expanded="false">
                                <li> <router-link to="/addIdea"> Add New Idea </router-link></li>
                                <li> <router-link to="/listIdeas"> List Ideas </router-link> </li>
                                <li> <router-link to="/topRated"> Top Rated Ideas </router-link> </li>
                                
                            </ul>
                        </li>
                        <li v-if="this.$session.get('role')=='admin'"> <a class="has-arrow  " href="#" aria-expanded="false"><i class="fa fa-gift"></i><span class="hide-menu">Admin Partner Gifts</span></a>
                            <ul aria-expanded="false" >
                                <li><router-link to="addPartner">Add Partner Admin</router-link></li>
                                 <li><router-link to="listPartnersAdmin">List Partner Admin</router-link></li>
                            </ul>
                        </li>
                       
                        <li v-if="this.$session.get('role')=='user'"> <a class="has-arrow  " href="#" aria-expanded="false"><i class="fa fa-gift"></i><span class="hide-menu"> Gifts</span></a>
                            <ul aria-expanded="false" >
                                <li><router-link to="listPartners">List Partners</router-link></li>
                                 <li><router-link to="MyGifts">My Gifts</router-link></li>
                            </ul>
                        </li>
                        
                       
                        
                    </ul>
                </nav>
                <!-- End Sidebar navigation -->
            </div>
            <!-- End Sidebar scroll-->
        </div>

</template>

<script>
    export default {
        name: "left-sidebar"
    }
</script>

<style scoped>

</style>
