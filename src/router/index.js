import Vue from 'vue';
import Router from 'vue-router';
import HelloWorld from '@/components/HelloWorld';
import FlowView from '@/components/FlowView';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/flow/:flow?',
      name: 'Flow',
      component: FlowView
    }
  ]
});
