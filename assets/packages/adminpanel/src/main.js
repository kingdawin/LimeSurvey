import Vue from 'vue';
import Vuex from 'vuex';
import VueLocalStorage from 'vue-localstorage';
import _ from 'lodash';
import Sidebar from './components/sidebar.vue';
import Topbar from './components/topbar.vue';
import LoadingBar from './components/loadingbar.vue';
import getAppState from './store/vuex-store.js';
import Pjax from 'pjax';

Vue.use(Vuex);
Vue.use(VueLocalStorage);

Vue.mixin({
  methods: {
    updatePjaxLinks: function(){this.$store.commit('updatePjax');}
  }
});
console.log('LS.globalUserId',LS.globalUserId);
const AppState = getAppState(LS.globalUserId);

if(document.getElementById('vue-app-main-container')){
  const sidemenu = new Vue(
  {  
    el: '#vue-app-main-container',
    store: AppState,
    components: {
      'sidebar' : Sidebar,
    },
    methods: {
      setIsLoading(){

      }
    },
    
    mounted(){
       this.$store.commit('updateSurveyId', $(this.$el).data('surveyid'));
       this.$store.commit('changeMaxHeight', ($('#in_survey_common').height()-35));
       this.updatePjaxLinks();
    }
  });
}


$(document).on('ready pjax:complete', ()=>{
  if($('#vue-app-main-container').length >0 ){

    const
        menuOffset = $('nav.navbar').outerHeight()+45,
        menuHeight = $('.menubar.surveymanagerbar').outerHeight(),
        footerHeight = $('footer').outerHeight()+65,
        documentHeight = screen.availHeight || screen.height,
        innerMenuHeight = $('#surveybarid').outerHeight();
    
    let vueAppContainerHeight = documentHeight-( menuOffset + menuHeight + footerHeight );
    let inSurveyCommonHeight = vueAppContainerHeight - (innerMenuHeight + 45);

    console.log({
      menuOffset : menuOffset,
      menuHeight : menuHeight,
      footerHeight : footerHeight,
      documentHeight : documentHeight,
      innerMenuHeight : innerMenuHeight,
      vueAppContainerHeight : vueAppContainerHeight,
      inSurveyCommonHeight : inSurveyCommonHeight
    });

     $('#vue-app-main-container').css('min-height', vueAppContainerHeight+'px');
  }
});
$(document).on('pjax:send', (evt)=>{
    $('#pjax-file-load-container').find('div').css({'width':'20%', 'display': 'block'});
});
$(document).on('pjax:complete', (evt)=>{
    $('#pjax-file-load-container').find('div').css('width','100%');
    setTimeout(function(){$('#pjax-file-load-container').find('div').css({'width':'0%', 'display': 'none'})},2200);
})
// const topmenu = new Vue(
//   {  
//     el: '#vue-top-menu-app',
//     components: {
//       'topbar' : Topbar,
//     } 
// });