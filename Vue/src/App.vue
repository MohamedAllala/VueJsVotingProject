<template>
  <div>
    <div id="wrapper">
      <left-sidebar v-if="$route.name != 'login' "/>
      <div id="page-wrapper" class="gray-bg">
        <navbar v-if="$route.name != 'login'"/>
        
        <router-view :key="$route.fullPath">
          
        </router-view>
        
      </div>
      
    </div>
    <footer-tts/>
  </div>
</template>

<script>
  import Navbar from './components/Navbar'
  import LeftSidebar from './components/LeftSidebar'
  import Breadcrumb from './components/Breadcrumb'
  import ideas from './components/forum/listIdeas.vue'
  import FooterTts from './components/Footer'
    import election from './components/election/election.vue'
  import addCandidate from './components/election/addCandidate.vue'
import editElection from './components/election/editElection.vue'
import ListElections from './components/election/editElection.vue'
  
  export default {
  name: 'app',
  components:{
    
   
    LeftSidebar,
    Navbar,
    FooterTts,
    Breadcrumb , 
    ideas,
	   election,
    addCandidate,
    editElection, 
    ListElections
  },
  data () {
    return {
      msg: 'Welcome to Your Vue.js App' , 
      test : false 
    }
  }
}
</script>

<style>
</style>
