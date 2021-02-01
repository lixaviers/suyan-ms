<template>
    <div>
        <aside class="suyan__aside">
            <div>
                <h1 class="navbar__brand"><a href="/#/home">素焉面试题目汇总</a></h1>
            </div>
            <el-menu :default-active="menuActiveName || 'home'" @select="gotoRouteHandle">
                <el-menu-item style="padding: 0 10px 10px 15px;" v-for="item in menuList" :key="item.id" :index="item.name">
                    <i v-if="item.iconClass" :class="item.iconClass"></i>
                    <span slot="title">{{item.meta.title}}</span>
                </el-menu-item>
            </el-menu>
        </aside>
    </div>
  
</template>


<style>
</style>

<script>
import Util from '../libs/util';
export default {
    computed: {
    },
    watch: {
      $route: 'routeHandle'
    },
    data () {
        return {
            nickName: '',
            shopName: '',
            menuList: [],
            subMenuList: [],
            menuActiveName: '',
            subMenuActiveName: '',
            subTitleName: '',
        }
    },
    created () {
        let menuList = JSON.parse(sessionStorage.getItem('menuList') || '[]');
        this.menuList = menuList;
        this.routeHandle(this.$route);
    },
    methods: {
        // 路由操作
        routeHandle (route) {
            let menuActiveName = this.menuActiveName;
            let subMenuActiveName;
            if(route.meta.parentName) {
                this.menuActiveName = this.$route.meta.parentName;
                if(!route.meta.isMenu) {
                    // 如果当前路由不是菜单，选中的子菜单取[activeName]
                    subMenuActiveName = this.$route.meta.activeName;
                } else {
                    subMenuActiveName = this.$route.name;
                }
            } else {
                this.menuActiveName = this.$route.name;
            }
            this.subMenuActiveName = subMenuActiveName;
            if(this.menuActiveName != menuActiveName) {
                this.subMenuList = [];
                return;
                // 获取列表
                var tab = this.menuList.filter(item => item.name === this.menuActiveName)[0];
                if(tab.children) {
                    this.subMenuList = tab.children.filter(item => item.meta.isMenu);
                    this.subTitleName = tab.meta.subTitle;
                    let t= this;
                    this.$nextTick(()=>{
                        this.$refs.menus.activeIndex = subMenuActiveName;
                    })
                } else {
                    this.subMenuList = [];
                }
            }
        },
        // 通过menuId与动态(菜单)路由进行匹配跳转至指定路由
        gotoRouteHandle (name) {
            this.$router.push({ name: name })
        },
    },
}
</script>
