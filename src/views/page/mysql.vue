<template>
    <div class="suyan__home">
        <h1>MySQL<el-button class="suyan__btn__print" type="primary" plain @click="print">打印pdf</el-button></h1><el-divider></el-divider>
        <h3>一、常见的查询算法</h3>
<p>1、顺序查找(Linear search)：最基本的查询算法当然是顺序查找，也就是对比每个元素的方法，不过这种算法在数据量很大时效率是极低的。</p>
<p>2、二分查找(binary search)：比顺序查找更快的查询方法应该就是二分查找了，二分查找的原理是查找过程从数据的中间元素开始，如果中间元素正好是要查找的元素，则搜索过程结束；如果某一特定元素大于或者小于中间元素，则在数据大于或小于中间元素的那一半中查找，而且跟开始一样从中间开始比较。如果在某一步骤数据为空，则代表找不到。</p>
<p>3、二叉排序树查找：特点是：</p>
<ul>
<li>若它的左子树不空，则左子树上所有结点的值均小于它的根节点的值；</li>
<li>若它的右子树不空，则右子树上所有结点的值均大于它的根节点的值；</li>
<li>它的左、右子树也分别为二叉排序树(递归实现)；</li>
</ul>
<p>搜索的原理：</p>
<ul>
<li>查找操作从根节点开始，一个一个节点递归查找。</li>
<li>若该节点的值与要找的值吻合，那么找到退出。</li>
<li>若要找的值大于该节点的值，查找它的右子树节点。</li>
<li>若要找的值小于该节点的值，查找它的左子树节点。</li>
<li>若该节点是NULL，那么说明已经查找完了整个树，还没有找到。</li>
</ul>
<p>4、哈希散列法(哈希表)：首先根据key值和哈希函数创建一个哈希表(散列表)，然后根据键值，通过散列函数，定位数据元素位置。</p>
<p>5、分块查找(索引顺序查找)：它是顺序查找的一种改进方法。其算法思想是将n个数据元素&rdquo;按块有序&ldquo;划分为m块(m &le; n)。每一个块中的节点不必有序，但块与块之间必须&rdquo;按块有序&ldquo;；即第1块中任意元素的关键字都必须小于第二块中任意元素的关键字；而第2块中任意元素又都必须小于第3块中的任意元素，以此类推。算法流程：</p>
<ul>
<li>先选取各块中的最大关键字构成一个索引表。</li>
<li>查找分为两个部分：先对索引表进行二分查找或者顺序查找，以确定待查记录在哪一块中。然后在已确定的块中用顺序法进行查找。</li>
</ul>
<p>6、B Tree(B-Tree)：它是一种平衡多路查找树。为了描述B-Tree，首先定义一条数据记录为一个二元组[key, data]，key为记录的键值，对于不同数据记录，key是互不相同的；data为数据记录除key外的数据。那么B-Tree是满足下列条件的数据结构：</p>
<ul>
<li>d为大于1的一个正整数，称为B-Tree的度。</li>
<li>h为一个正整数，称为B-Tree的高度。</li>
<li>每个非叶子节点由n-1个key和n个指针组成，其中d &lt;= n &lt;= 2d。</li>
<li>每个叶子节点最少包含一个key和两个指针，最多包含2d-1个key和2d个指针，叶节点的指针均为null。</li>
<li>所有叶节点具有相同的深度，等于树高h。</li>
<li>key和指针互相间隔，节点两端是指针。</li>
<li>一个节点中的key从左到右非递减排列。</li>
<li>所有节点组成树结构。</li>
<li>每个指针要么为null，要么指向另外一个节点。</li>
<li>如果某个指针在节点node最左边且不为null，则其指向节点的所有key小于v(<span id="MathJax-Span-16" class="mi">k</span><span id="MathJax-Span-17" class="mi">e</span><span id="MathJax-Span-18" class="msubsup"><span id="MathJax-Span-19" class="mi">y </span><span id="MathJax-Span-20" class="mn">1</span></span>)，其中v(key 1)为node的第一个key的值。</li>
<li>如果某个指针在节点node最右边且不为null，则其指向节点的所有key大于v(key m)，其中v(key m)为node的最后一个key的值。</li>
<li>如果某个指针在节点node的左右相邻key分别是key i和key i+1且不为null，则其指向节点的所有key小于v(key i+1)且大于v(key i)。</li>
</ul>
<p>由于B-Tree的特性，在B-Tree中按key检索的算法非常直观：首先从根节点进行二分查找，如果找到则返回对应节点的data，否则对相应区间的指针指向的节点递归进行查找，直到找到节点或找到null指针，前者查找返回成功，后者返回查找失败。关于B-Tree有一系列有趣的性质，列如一个度为d的B-Tree，设其索引N个key，则其高度h的上限为logd((n+1)/2)，检索一个key，其查找节点个数的渐进复杂度为0(logdN)。从这点可以看出，B-Tree是一个非常有效率的索引数据结构。另外，由于插入删除新的数据记录会破坏B-Tree的性质，因此在插入删除时，需要对数进行一个分裂、合并、转移等操作以保持B-Tree性质。</p>
<p>7、B+Tree：MySQL普遍使用B+Tree实现其索引结构。与B-Tree相比，B+Tree有以下不同点：</p>
<ul>
<li>每个节点的指针上线为2d，不是2d+1。</li>
<li>内节点不存储data，只存储key。</li>
<li>叶子节点不存储指针。</li>
</ul>
<p>由于并不是所有节点都具有相同的域，因此B+Tree中叶节点和内节点一般大小不同。这点与B-Tree不同，虽然B-Tree中不同节点存放的key和指针可能数量不一致，但是每个节点的域和上限是一致的，所以在实现B-Tree往往对每个节点申请同等大小的空间。一般来说，B+Tree比B-Tree更适合实现存储索引结构。因为：</p>
<ul>
<li>B+Tree的磁盘读写代价更低：B+Tree的内部节点并没有指向关键字具体信息的指针，因此其内部节点相对B Tree更小。如果把所有同一内部节点的关键字存放在同一盘块中，那么盘块所能容纳的关键字数量也越多。一次性读入内存中需要查找的关键字也就越多。相对来说IO读写次数也就降低了。</li>
<li>B+Tree的查询效率更贱稳定：由于非终节点并不是最终指向文件内容的节点，而只是叶子节点中关键字的索引。所以任何关键字的查找必须走一条从根节点到叶子节点的路。所有关键字查询的路径长度相同，导致每一个数据的查询效率相当。</li>
</ul>
<p>8、带有顺序访问指针的B+Tree：一般在数据库系统或文件系统使用的B+Tree结构都在经典B+Tree的基础上进行了优化，增加了顺序访问指针。在B+Tree的每个叶子节点增加一个指向相邻叶子节点的指针，就形成了带有顺序访问指针的B+Tree。做这个优化的目的是为了提高区间访问的性能，只需顺着节点和指针顺序遍历就可以一次性访问到所有数据节点，极大提高了区间查询效率。</p>
<h3>二、索引的实现</h3>
<p>1、MylSAM索引实现</p>
<p>MylSAM引擎使用B+Tree作为索引结构，叶节点的data域存放的是数据记录的地址，索引文件仅仅保存数据记录的地址。在MylSAM中，主索引和辅助索引(Secondary key)在结构上没有任何区别，只是主索引要求key是唯一的，而辅助索引的key可以重复。同样也是一颗B+Tree，data域保存数据记录的地址。因此，MylSAM中索引检索的算法为首先按照B+Tree搜索算法搜索索引，如果指定的key存在，则取出其data域的值，然后以data域的值为地址，读取响应数据记录。MylSAM的索引方式也叫做&rdquo;非聚集&ldquo;的，之所以这么称呼是为了与InnoDB的聚集索引区分。</p>
<p>2、InnoDB索引实现</p>
<p>虽然InnoDB也是用B+Tree作为索引结构，但具体实现方式却与MylSAM截然不同。第一个重大区别是InnoDB的数据文件本身就是索引文件。MylSAM索引文件和数据文件是分离的，索引文件仅保存数据记录的地址。而在InnoDB中，表数据文件本身就是按B+Tree组织的一个索引结构，这棵树的叶节点data域保存了完整的数据记录。这个索引的key是数据表的主键，因此InnoDB表数据文件本身就是主索引。这种索引也叫聚集索引。因为InnoDB的数据文件本身要按主键聚集，所以InnoDB要求表必须有主键(MylSAM可以没有)，如果没有显式指定，则MySQL系统会自动选择一个可以唯一标识数据记录的列作为主键。如果不存在这种列，则MySQL自动为InnoDB表生成一个隐含字段作为主键，这个字段长度为6个字节，类型为长整型。第二个与MylSAM索引不同的是InnoDB的辅助索引data域存储相应记录主键的值而不是地址。换句话说，InnoDB的所有辅助索引都引用主键作为data域。聚集索引这种实现方式使得按主键的搜索十分高效，但是辅助索引搜索需要检索两遍索引：首先检索辅助索引获得主键，然后用主键到主索引中检索获得记录。</p>
<p><a href="http://blog.codinglabs.org/articles/theory-of-mysql-index.html" target="_blank" rel="noopener">参考文章</a></p>
<h3>三、MylSAM与InnoDB的区别及适用场景</h3>
<p>区别：</p>
<ul>
<li>InnoDB支持事物，MylSAM不支持。</li>
<li>InnoDB支持行级锁，MylSAM不支持。</li>
<li>InnoDB支持MVCC，MylSAM不支持。MVCC(Multi-Version Concurrency Control)：多版本的并发控制协议</li>
<li>InnoDB支持外键，MylSAM不支持。</li>
<li>InnoDB不支持全文检索，MylSAM支持。</li>
</ul>
<p>如何选择：</p>
<ul>
<li>是否要支持事物，需要选InnoDB。</li>
<li>如果表中绝大多数都只是读查询，可以考虑MylSAM。如果既有读写也挺频繁，请使用InnoDB。</li>
<li>系统奔溃后，MylSAM恢复起来更困难，能否接受。</li>
<li>MySQL5.5版本开始InnoDB已经成为MySQL的默认引擎(之前是MylSAM)。</li>
</ul>
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