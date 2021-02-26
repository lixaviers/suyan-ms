<template>
    <div class="suyan__home">
        <h1>数据结构<el-button class="suyan__btn__print" type="primary" plain @click="print">打印pdf</el-button></h1><el-divider></el-divider>
        <h3>一、二叉树</h3>
<p>&nbsp;</p>
<h3>二、二叉搜索树</h3>
<p>&nbsp;</p>
<h3>三、二叉树遍历</h3>
<p>&nbsp;</p>
<h3>四、平衡二叉树</h3>
<p>&nbsp;</p>
<h3>五、哈夫曼树</h3>
<p>&nbsp;</p>
<h3>六、红黑树</h3>
<p>&nbsp;</p>
<p>&nbsp;</p>
<p>&nbsp;</p>
<p>&nbsp;</p>
<p>&nbsp;</p>
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