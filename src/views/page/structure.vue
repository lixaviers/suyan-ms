<template>
    <div class="suyan__home">
        <h1>数据结构<el-button class="suyan__btn__print" type="primary" plain @click="print">打印pdf</el-button><el-button class="suyan__btn__close" plain @click="closeAside"style="margin-right: 20px;">关闭导航</el-button></h1><el-divider></el-divider>
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
<h4>2.3 查询复杂度</h4>
<p>观察二叉搜索树结构可知，查询每个节点需要的比较次数为节点深度加一。如深度为0，节点值为&rdquo;6&ldquo;的根节点，只需要一次比较即可；深度为1，节点值为&rdquo;3&ldquo;的节点，只需要两次比较。即二叉树节点个数确定的情况下，整棵树的高度越低，节点的查询复杂度越低。</p>
<h4>2.4 构造复杂度</h4>
<p>二叉搜索树的构造过程，也就是将节点不断插入到树中适当位置的过程。该操作过程，与查询节点元素的操作基本相同，不同之处在于：</p>
<ul>
<li>查询节点过程是：比较元素值是否相等，相等则返；，不相等则判断大小情况，迭代查询左、右子树，直到找到相等的元素；或子节点为空，返回节点不存在。</li>
<li>插入节点的过程是：比较元素值是否相等，相等则返回，表示已存在；不相等则判断大小情况，迭代查询左、右子树，直到找到相等的元素；或子节点为空，则将节点插入该空节点位置。</li>
</ul>
<p>由此可知，单个节点的构造复杂度和查询负责度相同，为O(log2n)~O(n)。</p>
<h4>2.5 删除复杂度</h4>
<p>二叉搜索树的节点删除包括两个过程，查找和删除。查询的过程和查询复杂度已知，这里说明一下删除节点的过程。节点的删除有以下三种情况：</p>
<ol>
<li>待删除节点度为零。该节点为叶子节点(无子树)，可以直接删除。</li>
<li>待删除节点度为一。该节点有一个左子树，删除节点后，为了维持二叉搜索树结构特性，需要将左子树&rdquo;上移&ldquo;到删除的节点位置上。即二叉搜索树中待删除的节点为一时，可以将待删除节点的左子树或右子树&rdquo;上移&ldquo;到删除节点位置上，以此来满足二叉搜索树的结构特性。</li>
<li>待删除节点度为二。该节点既有左子树，也有右子树，删除节点后，为了维持二叉搜索树的结构特性，需要从其左子树中选出一个最大值的节点，以此来满足二叉搜索树的结构特性。因为是左子树最大值的节点，所以节点的度一定是0或者1，所以删除节点的情况就这么转移。</li>
</ol>
<h4>2.6 性能分析</h4>
<p>由以上查询、构造和删除复杂度的分析可知，复杂度皆为O(log2n)~O(n)。下面分析线性结构的三种操作复杂度，以二分法为例：</p>
<ul>
<li>查询复杂度，时间复杂度为O(log2n)，优于二叉搜索树。</li>
<li>元素的插入操作包括两个步骤，查询和插入。查询的复杂度已知，插入后调整元素位置的复杂度为O(n)，即单个元素的构造复杂度为O(n)。</li>
<li>删除操作也包括两个步骤，查询和删除，查询的复杂度已知，删除后调整元素位置的复杂度为O(n)，即单个元素的删除复杂度为O(n)。</li>
</ul>
<p>由此可知，二叉搜索树相对于线性结构，在构造复杂度和删除复杂度方面占优；在查询复杂度方面，二叉搜索树可能类似于斜树，每层上只有一个节点的情况，该情况下查询复杂度不占优势。</p>
<h4>2.7 总结</h4>
<p>二叉搜索树的节点查询、构造和删除性能，与树的高度相关，如果二叉搜索树能够更&rdquo;平衡&ldquo;一些，避免了树结构向线性结构的倾斜，则能够显著降低时间复杂度。二叉搜索树的存储方面，相对于线性结构只需要保存元素值，树中节点需要额外的空间保存节点之间的父子关系，所以在存储消耗上要高于线性结构。</p>
<p><a href="https://www.jianshu.com/p/ff4b93b088eb" target="_blank" rel="noopener">参考文职</a></p>
<h3>三、二叉树遍历</h3>
<p>&nbsp;</p>
<h3>四、平衡二叉树(AVL树)</h3>
<h4>4.1 定义</h4>
<p>平衡二叉树也叫自平衡二叉搜索树(Self-Balancing Binary Search Tree)，所以其本质也是一颗二叉搜索树，不过为了限制左右子树的高度差，避免出现倾斜树等偏向于线性结构演化的情况，所以对二叉搜索树中每个节点的左右子树作了限制，左右子树的高度差称之为平衡因子，树中每个节点的平衡因子绝对值不大于1，此时二叉搜索树称之为平衡二叉树。</p>
<p>自平衡是指，在对平衡二叉树执行插入或删除节点操作后，可能会导致树中某个节点的平衡因子绝对值超过1，即平衡二叉树变得&rdquo;不平衡&ldquo;，为了恢复该节点左右子树的平衡，此时需要对节点执行旋转操作。</p>
<p><a href="https://www.jianshu.com/p/655d83f9ba7b" target="_blank" rel="noopener">参考文章</a></p>
<h3>五、哈夫曼树</h3>
<p>&nbsp;</p>
<h3>六、红黑树</h3>
<h4>6.1 定义</h4>
<p>红黑树是一种自平衡二叉查找树，与AVL树类似，提供O(logN)级别的查询、插入和删除节点复杂度。相对于AVL树单纯的对每个节点的平衡因子进行判断，红黑树给节点赋予了颜色属性，并通过对数中节点的颜色进行限制，来保持整棵树的平衡。红黑树相对于AVL树，对数的高度限制较为宽松，所以红黑树的查找复杂度要略逊于AVL树。也因为对数高度的限制较小，所以插入和删除节点时需要较少的旋转操作即可达到平衡状态。</p>
<h4>6.2 条件限制</h4>
<p>红黑树中的节点存在颜色属性，通过对节点颜色的限制来保持树的平衡性。平衡的红黑树要求如下：</p>
<ol>
<li>节点是红色或者黑色。</li>
<li>根节点黑色。</li>
<li>叶子节点是黑色。(在红黑树的使用过程中使用一个特殊的节点 Nil 来表示叶子节点，该节点代表中终结条件，在算法导论中称这种使用方式为哨兵模式。)</li>
<li>红色节点必须具有两个黑色子节点。(两个红色节点不能以父子关系相邻)</li>
<li>从任一节点到其后代的叶子节点路径中包含相同个数的黑色节点。</li>
</ol>
<h4>6.3 插入节点情况</h4>
<pre class="language-markup"><code>待插入新节点颜色初始为红色，因为红色节点的插入不一定影响红黑树的平衡性，而黑色节点的插入一定会引起红黑树的不平衡。</code></pre>
<p>新节点的插入有如下几种情形：</p>
<ol>
<li><strong>新节点为根节点</strong>：即当前红黑树为空树，插入新节点后，只需要变换节点颜色为黑色，即可满足红黑树的平衡限制条件。</li>
<li><strong>新节点的父节点为黑色</strong>：若新节点不为根节点，则具有父节点，父节点颜色无外乎黑、红两种。当父节点颜色为黑色时，此时插入新节点不影响红黑树的平衡性，所以不需要调整操作。</li>
<li><strong>新节点的父节点为红色</strong>，同时叔父节点的颜色也为红色：因为红色节点必须具有两个黑色子节点，插入新节点颜色为红色，违反了条件，此时只需要变换父节点和叔父节点的颜色为黑色，祖父节点的颜色为红色即可。变换颜色后，只需要考虑祖父节点颜色为红色，是否违反了条件限制，将祖父节点作为&rdquo;新节点&ldquo;，递归进行处理即可。</li>
<li><strong>新节点的父节点为红色，叔父节点的颜色不为红色。且新节点N是其父节点P的左子节点，同时父节点P是祖父节点G的左节点；或者新节点N是其父节点P的右子节点，同时父节点P是祖父节点G的右子节点：</strong>不妨假设新节点N是其父节点P的左子节点，同时父节点P是祖父节点G的左子节点。因为父节点P为红色，所以祖父节点G颜色为黑色。此时以P节点为轴心执行一次右旋操作，并对父节点P和祖父节点G进行颜色变化。</li>
</ol>
<p><img style="display: block; margin-left: auto; margin-right: auto;" src="https://raw.githubusercontent.com/lixaviers/suyan-ms/main/src/assets/20210226-152159.png" alt="" width="659" height="328" /></p>
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
        },
        closeAside() {
            Util.closeAside();
        }
    }
}
</script>