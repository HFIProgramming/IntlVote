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
  routes: [{
    path: '/',
    name: 'Index',
    component: Index,
    meta: {
      name: '说明页面'
    }
  },
  {
    path: '/vote/ticket/:ticket/vote/:vote_id/',
    name: 'VoteBasement',
    component: VoteBasement,
    props: true,
    meta: {
      name: '投票着陆页'
    }
  },
  {
    path: '/vote/ticket/:ticket/',
    name: 'Basement',
    component: Basement,
    props: true,
    meta: {
      name: 'TK着陆页'
    }
  },
  {
    path: 'vote/ticket/:ticket/vote/:vote_id/result',
    name: 'VoteResult',
    component: VoteResult,
    props: true,
    meta: {
      name: '结果页'
    }
  },
  {
    path: '*',
    component: NotFoundComponent
  }
  ]
})
