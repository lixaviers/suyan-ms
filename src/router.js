import Vue from 'vue';
import Router from 'vue-router';
import ElementUI from 'element-ui';
import Util from './libs/util';

Vue.use(ElementUI, { size: 'small', zIndex: 3000 });

/**
 * 重写路由的push方法
 */
const routerPush = Router.prototype.push;
Router.prototype.push = function push(location) {
  return routerPush.call(this, location).catch(error=> error)
}
// 全局路由(无需嵌套上左右整体布局)
const globalRoutes = []
const menuRouters = [
    {
        path: '/', name: '', redirect: {name: 'home'}, component: (resolve) => require(['./views/main.vue'], resolve),
        meta: {
            title: '首页'
        },
        children: [
            {
                path: 'java', name: 'java', component: (resolve) => require(['./views/page/java.vue'], resolve),
                meta: { title: 'Java基础', },
            },
            {
                path: 'jvm', name: 'jvm', component: (resolve) => require(['./views/page/jvm.vue'], resolve),
                meta: { title: 'JVM汇总', },
            },
        ]
    }
];
const router = new Router({
    routes: globalRoutes.concat(menuRouters)
});

router.beforeEach((to, from, next) => {
    Util.title(to.meta.title);
    let menuList = [];
    menuRouters.forEach(item=>{
        item.children.forEach(child=>{
            menuList.push(child);
        })
    })
    sessionStorage.setItem('menuList', JSON.stringify(menuList || '[]'))
    next();
});

router.afterEach((to, from, next) => {
    window.scrollTo(0, 0);
});

export default router;