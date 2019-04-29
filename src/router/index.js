import Vue from 'vue'
import Router from 'vue-router'

import Home from '../views/Home/Index'

import Layout from '../views/Layout/Layout.vue'

import OrderList from '../views/Order/OrderList'
import OrderDetail from '../views/Order/OrderDetail'


import Login from '../views/Login'
import Nopage from '../views/404'



import ProductEdit from '../views/Product/ProductEdit'
import ProductList from '../views/Product/ProductList'
import ProductCreate from '../views/Product/Create'
import ProductDetail from '../views/Product/ProductDetail'


import Create from '../views/Manger/Create'
import Company from '../views/Manger/Company'

Vue.use(Router)

export default new Router({
  routes: [
  	{
			path: '/',
			redirect: '/Home/Index',//设置默认指向的路径
			name: '首页'
		}, 
    {
      path: '/404', 
      component: Nopage,
      name: 'NoPage',
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/Login',
      name: 'Login',
      component: Login,
      meta: {
        requireAuth: false
      }
    },
    {
      path: '/Home/Index',
      name: '首页',
      component: Home,
      meta: {
        requireAuth: true
      }
    }, 
    {
    	path: '/',
      name: '产品首页',
      component:Layout,
      children: [
      	{
		    	path: '/Manger/Create',
		      name: '新建企业',
		      component: Create,
		      meta: {
		        requireAuth: true
		      }
		    },
		    {
		    	path: '/Manger/Company',
		      name: '企业列表',
		      component: Company,
		      meta: {
		        requireAuth: true
		      }
		    }
      ]
    },
    {
      path: '/',
      name: '产品首页',
      component:Layout,
      children: [
        {
          path: '/Product/ProductList',
          component: ProductList,
          name: '产品列表',
          meta: {
            requireAuth: true
          }
        },
        {
          path: '/Product/ProductEdit',
          component: ProductEdit,
          name: '产品编辑',
          meta: {
            requireAuth: true
          }
        },
        {
          path: '/Product/Create',
          component: ProductCreate,
          name: '上传产品',
          meta: {
            requireAuth: true
          }
        },
        {
        	path: '/Product/ProductDetail',
        	component: ProductDetail,
          name: '产品详情',
          meta: {
            requireAuth: true
          }
        }
      ]
    },
    {
      path: '/',
      name: '订单首页',
      component: Layout,
      children: [
        {
          path: '/Order',
          component: OrderList,
          name: '订单列表',
          meta: {
            requireAuth: true
          }
        },
        {
          path: '/Order/Edit',
          component: OrderDetail,
          name: '订单编辑',
          meta: {
            requireAuth: true
          }
        }
      ]
    },
    {
      path: '*',
      hidden: true,
      redirect: { path: '/404' }
    }
  ]
})
