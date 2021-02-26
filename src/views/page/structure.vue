<template>
    <div class="suyan__home">
        <h1>数据结构<el-button class="suyan__btn__print" type="primary" plain @click="print">打印pdf</el-button></h1><el-divider></el-divider>
        <h3>一、二叉树(Binary Tree)</h3>
<h4>1.1 定义</h4>
<p>二叉树(binary tree)是有限节点集合构成的结构，其结构的递归定义为：</p>
<ul>
<li>三个不相交的节点集合构成，一个作为根节点，一个节点集构成的二叉树作为根节点的左子树，另一个节点集构成的二叉树作为根节点的右子树。</li>
<li>当节点数为零时，表示二叉树为空。</li>
</ul>
<p>所以节点个数为零的空树也是二叉树，二叉树根节点的左、右子树也是二叉树，其结构同样符合以上定义，当左子树为空树时，表示根节点没有左子节点。</p>
<h4>1.2 结构特性</h4>
<p>首先说明下几个概念：</p>
<ul>
<li>根节点：没有父节点的节点。</li>
<li>叶子节点：没有子节点的节点。</li>
<li>节点的度：节点的分支个数，二叉树每个节点的分支个数为0~2.</li>
<li>路径：连接节点和后代子节点之间的不重复边。</li>
<li>节点的深度：从根节点到该节点的路径长。</li>
<li>节点的高度：从该节点到叶子节点的最大路径长。</li>
<li>节点的层数：父节点的层数加一。</li>
<li>数的高度：根节点高度。</li>
<li>数的深度：叶子节点深度的最大值。</li>
</ul>
<p><a href="https://www.jianshu.com/p/d8103efe0b79" target="_blank" rel="noopener">参考文章</a></p>
<h3>二、二叉搜索树(Binary Search Tree)</h3>
<h4>2.1 引子</h4>
<p>二分法的查找过程是：在一个有序的序列中，每次都会选择有效范围中间位置的元素作判断，即每次判断后，都可以排除近一半的元素，直到查找到目标元素或返回不存在，所以n个有序元素构成的序列，查找的时间复杂度为O(log2n)。既然线性结构能够做到查询复杂度为O(log2n)级别，那二叉搜索树产生又有何必要呢？毕竟二叉搜索树的查询复杂度只是介于O(log2n)~O(n)之间，并不存在查询优势。</p>
<h4>2.2 定义</h4>
<p>二叉搜索树是一种节点值之间具有一定数量级次序的二叉树，对于树中每个节点：</p>
<ul>
<li>若其左子树存在，则其左子树中每个节点的值都不大于该节点值。</li>
<li>若其右子树存在，则其右子树中每个节点的值都不小于该节点值。</li>
</ul>
<p>示例：</p>
<p><img style="display: block; margin-left: auto; margin-right: auto;" src="https://raw.githubusercontent.com/lixaviers/suyan-ms/main/src/assets/20210226-110712.png" alt="" width="365" height="371" /></p>
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