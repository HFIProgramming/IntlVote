import Vue from 'vue'
import Router from 'vue-router'
import Basement from '@/layouts/Basement'
import VoteBasement from '@/layouts/VoteBasement'
import VoteResult from '@/layouts/VoteResult'
import NotFoundComponent from '@/layouts/NotFoundComponent'
import Index from '@/layouts/Index'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index
    },
    {
      path: '/vote/ticket/:ticket/vote/:vote_id/',
      name: 'VoteBasement',
      component: VoteBasement,
      props: true
    },
    {
      path: '/vote/ticket/:ticket/',
      name: 'Basement',
      component: Basement,
      props: true
    },
    {
      path: 'vote/ticket/:ticket/vote/:vote_id/result',
      name: 'VoteResult',
      component: VoteResult,
      props: true
    },
    { path: '*', component: NotFoundComponent }
  ]
})
