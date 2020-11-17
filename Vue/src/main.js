import Vue from "vue";
import App from "./App.vue";
import VueAxios from "vue-axios";
import axios from "axios";
import VuePaginate from 'vue-paginate';
import VModal from 'vue-js-modal'

Vue.use(VueAxios, axios);

import VueRouter from "vue-router";
import listIdeas from "./components/forum/listIdeas.vue";
import comments from "./components/forum/comments.vue";
import addIdea from "./Components/forum/addIdea.vue";
import editIdea from "./components/forum/EdiIdea.vue"
import topRated from "./components/forum/TopRatedIdea.vue";
import chatbot from "./components/chatbot.vue";
import login from "./components/login.vue";
import Vuex from 'vuex'

import listSurveys from "./components/Survey/Survey.vue";
import addSurvey from "./components/Survey/addSurvey";
import detailSurvey from "./components/Survey/details.vue";
import surveyByEntreprise from "./components/Survey/getSurveyParEntreprise";
import addQuestions from "./components/Survey/addQuestions";
import Usersurvey from "./components/Survey/historic";
import SortedSurveys from "./components/Survey/Sortedsurvey";
import SortedByEntreprise from "./components/Survey/SortedByEntreprise";
import historicSurvey from './components/Survey/historicSurvey';
import stat from './components/Survey/stat';
import bar from './components/Survey/BarChart';
import barchart2 from './components/Survey/BarExemple';
import editSurvey from './components/Survey/editSurvey';
import addpartner from './components/partner/ajoutPartner.vue';
import listpartners from './components/partner/listPartner.vue';
import listPartnersAdmin from './components/partner/listPartnerAdmin.vue';
import listsGiftByPartner from './components/partner/listsGiftByPartner.vue';
import GiftsbyUser from './components/partner/GiftsbyUser.vue';
import giftTemplate from './components/partner/giftTemplate.vue';
import Bar from './components/Survey/BarChart.vue';
import Pie from './components/Survey/PieChart.vue';

import election from './components/election/election.vue' ; 
import addCandidate from './components/election/addCandidate.vue' ; 
import candidateElection from './components/election/candidateElection.vue' ; 
import electionDetails from './components/election/electionDetails.vue' ; 
import editElection from './components/election/editElection.vue' ;
import ListElections from './components/election/ListElections.vue' ; 
import electionsDetails from './components/election/electionsDetails.vue' ;
import vote from './components/election/vote.vue' ;
import stats from './components/election/stats.vue' ;

import moment from 'moment';


Vue.use(Vuex);
import VueLocalStorage from 'vue-localstorage'
 
Vue.use(VueLocalStorage)
var VueCookie = require('vue-cookie');
// Tell Vue to use the plugin 
Vue.use(VueCookie);

import VueSession from 'vue-session'
var options = {
    persist: false
}

Vue.use(VueSession, options)

Vue.use(VueRouter);
import VueSweetalert2 from 'vue-sweetalert2';

import vSelect from 'vue-select';
Vue.component('v-select', vSelect)

/* ff18bd814179438fe138eb7d4c561a4212638ca3*/
/* e0dc493f88b8ffe25e7b82895b5bec6a6584bbd2*/
Vue.use(VueRouter);
Vue.use(VueSweetalert2)
import VeeValidate from 'vee-validate';

Vue.use(VModal);
Vue.use(VuePaginate);
import VueCharts from 'vue-chartjs';
Vue.use(VueCharts);
import PieChart from 'vue-pie-chart';
Vue.component('pie-chart', PieChart)

import SocialSharing  from 'vue-social-sharing';
Vue.use(SocialSharing);




const routes = [
  { 
    path : "/" , 
    name : "login" , 
    component : login

  } ,

  {
    path: "/listIdeas",
    name: "ideas",
    component: listIdeas
  },
  {
    path: "/comment/:id",
    name: "comments",
    component: comments
  },
  {
    path: "/addIdea",
    name: "addIdea",
    component: addIdea
  },
  {
    name: "EditItem",
    path: "/edit/:id",
    component: editIdea
  },
  {
    name: "topRated",
    path: "/topRated",
    component: topRated
  } , 
  {
    name : "chatbot" , 
    path : "/chatbot" , 
    component : chatbot
  },
  {
    name: "listSurveys",
    path: "/listSurveys",
    component: listSurveys
  },
  {
    name: "SortedSurveys",
    path: "/SortedSurveys",
    component: SortedSurveys
  },
  {
    name: "SortedByEntreprise",
    path: "/SortedByEntreprise",
    component: SortedByEntreprise
  }
  ,{
    name: "addSurvey",
    path: "/addSurvey",
    component: addSurvey
  },
  {
    name: "editSurvey",
    path: "/editSurvey/:id",
    component: editSurvey
  },
   {
    name: "detailSurvey",
    path: "/detailSurvey/:id",
    component: detailSurvey
  },{
    name: "surveyByEntreprise",
    path: "/surveyByEntreprise",
    component: surveyByEntreprise
  },
  {
    name: "Usersurvey",
    path: "/Usersurvey",
    component: Usersurvey
  },
  {
    name: "addQuestions",
    path: "/addQuestions/:id",
    component: addQuestions
  },
  {
    name: "historicSurvey",
    path: "/historicSurvey",
    component: historicSurvey
  },
  {
    name: "stat",
    path: "/stat/:id",
    component: stat
  }
  ,{
    path: '/addPartner',
    name : 'addPartner' ,
    component:  addpartner
  },
  {
    path: '/listPartners',
    name : 'listPartners' ,
    component:  listpartners
  },
  {
    path: '/MyGifts',
    name : 'GiftsbyUser' ,
    component:  GiftsbyUser
  },
  {
    path: '/giftTemplate',
    name : 'giftTemplate' ,
    component:  giftTemplate
  },
  {
    path: '/listPartnersAdmin',
    name : 'listPartnersAdmin' ,
    component:  listPartnersAdmin
  },
  {
    path: '/bar/:id',
    name : 'bar' ,
    component:  bar
  },{
    path: '/barchart2/:id',
    name : 'barchart2' ,
    component:  barchart2
  },
  {
    path: '/listsGiftByPartner/:id',
    name : 'listsGiftByPartner' ,
    component:  listsGiftByPartner
  },
  {
    path: '/election',
    name : 'election' ,
    component: election
  },
    {
    path: '/addElection',
    name : 'addCandidate' ,
    component: addCandidate
  },
  {
    path: '/candidateElection',
    name : 'candidateElection' ,
    component: candidateElection
  },
     {
    path: '/electionDetails/:id',
    name : 'electionDetails' ,
    component: electionDetails
  },
   {
    path: '/editElection/:id',
    name : 'editElection' ,
    component: editElection

  },
   {
    path: '/ListElections',
    name : 'ListElections' ,
    component: ListElections
  },
     {
    path: '/electionsDetails/:id',
    name : 'electionsDetails' ,
    component: electionsDetails
  },
     {
    path: '/vote/:id',
    name : 'vote' ,
    component: vote
  },
       {
    path: '/stats',
    name : 'stats' ,
    component: stats

  }
];
const router = new VueRouter({ routes });
Vue.filter('formatDate', function(value) {
  if (value) {
    return moment(String(value)).format('MM/DD/YYYY')
  }
});
new Vue({
  el: "#app",
  router,
  render: h => h(App)
});
