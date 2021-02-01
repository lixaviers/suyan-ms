<template>
    <div class="suyan__home">
        <h1>JVM<el-button class="suyan__btn__print"  type="primary" plain @click="print">打印pdf</el-button></h1><el-divider></el-divider>
        <p>一、类加载器</p>
<p>1、启动类加载器(Bootstrap)：加载</p>
    </div>
</template>

<script>
import Util from '@/libs/util';
export default {
    methods: {
        print() {
            Util.print();
        }
    }
}
</script>