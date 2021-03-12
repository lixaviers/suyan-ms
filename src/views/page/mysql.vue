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
<li>InnoDB不支持FULLTEXT类型的索引。</li>
<li>InnoDB中不保存表的行数，如select count(1)需要扫描整表，MylSAM只要简单的读出保存好的行数即可，当count语句包含where也需要扫描整个表。</li>
<li>清空整个表时，InnoDB是一行一行的删除，效率非常慢。MylSAM则会重建表。</li>
</ul>
<p>如何选择：</p>
<ul>
<li>是否要支持事物，需要选InnoDB。</li>
<li>如果表中绝大多数都只是读查询，可以考虑MylSAM。如果既有读写也挺频繁，请使用InnoDB。</li>
<li>系统奔溃后，MylSAM恢复起来更困难，能否接受。</li>
<li>MySQL5.5版本开始InnoDB已经成为MySQL的默认引擎(之前是MylSAM)。</li>
</ul>
<h3>四、索引优缺点及使用注意事项</h3>
<p>1、优点</p>
<ul>
<li>大大加速数据的查询速度。</li>
<li>使用分组和排序进行数据查询时，可以显著减少查询时分组和排序时间。</li>
<li>唯一索引能够保证数据库表中每一行数据的唯一性。</li>
<li>在实现数据的参考完整性方面，可以减速表和表之间的连接。</li>
</ul>
<p>2、缺点</p>
<ul>
<li>创建索引和维护索引需要消耗时间，并且随着数据量的增加，时间也会增加。</li>
<li>索引需要占用磁盘空间。</li>
<li>对数据表中的数据进行增加、修改、删除时，索引也要动态的维护，降低了维护的速度。</li>
</ul>
<p>3、使用注意事项</p>
<ul>
<li>更新频繁的列不应设置索引。</li>
<li>数据量小的表不要使用索引。</li>
<li>重复数据多的字段不应设为索引(重复的数据超过15%就不该建索引)。</li>
<li>在where和join中出现的列建立索引。</li>
<li>不要在where条件语句=的左边进行函数、运算符或表达式的计算。</li>
<li>不要使用&lt;&gt;，!=，not in，索引不生效。</li>
<li>避免对字段进行null判断，索引不生效。</li>
<li>like '%xxx'，索引不生效。</li>
<li>数据类型隐形转换，索引不生效。</li>
<li>避免使用or，可以用union替代。</li>
<li>使用exist代替in(表中数据越多，exist的效率就比in越大)。</li>
<li>不用使用select *。</li>
</ul>
<h3>五、聚集索引与非聚集索引</h3>
<p>聚集索引：来源于生活尝试。这种索引可以说是按照数据的物理存储进行划分的。对于一堆记录来说，使用聚集索引就是对这堆记录堆划分。即主要描述的是物理上的存储。</p>
<p>非聚集索引：也可以从生活中找到映射。强调的是逻辑分类。可以说是定义了一套存储规则，而需要有一块控件来维护这个规则，这个被称之为索引表。</p>
<p>区别：</p>
<ul>
<li>聚集索引可以帮助把很大的范围迅速减小范围。但是查找改记录，就要从这个小范围中扫描了。</li>
<li>非聚集索引把一个很大的范围转换成一个小的地图。你需要在这个小地图中找你要寻找的信息位置。然后通过这个位置，再去找你所需要的记录。</li>
</ul>
<p>场景：</p>
<table style="border-collapse: collapse; width: auto;" border="1">
<tbody>
<tr>
<td style="width: 140px;">动作描述</td>
<td style="width: 100px; text-align: center;">使用聚集索引</td>
<td style="width: 115px; text-align: center;">使用非聚集索引</td>
</tr>
<tr>
<td style="width: 140px;">列经常分组排序</td>
<td style="width: 100px; text-align: center;">✔️</td>
<td style="width: 115px; text-align: center;">✔️</td>
</tr>
<tr>
<td style="width: 140px;">返回某范围内的数据</td>
<td style="width: 100px; text-align: center;">✔️</td>
<td style="width: 115px; text-align: center;">&times;</td>
</tr>
<tr>
<td style="width: 140px;">很小的不同值</td>
<td style="width: 100px; text-align: center;">&times;</td>
<td style="width: 115px; text-align: center;">&times;</td>
</tr>
<tr>
<td style="width: 140px;">小数目不同值</td>
<td style="width: 100px; text-align: center;">✔️</td>
<td style="width: 115px; text-align: center;">&times;</td>
</tr>
<tr>
<td style="width: 140px;">大数据不同值</td>
<td style="width: 100px; text-align: center;">&times;</td>
<td style="width: 115px; text-align: center;">✔️</td>
</tr>
<tr>
<td style="width: 140px;">频繁更新的列</td>
<td style="width: 100px; text-align: center;">&times;</td>
<td style="width: 115px; text-align: center;">✔️</td>
</tr>
<tr>
<td style="width: 140px;">外键列</td>
<td style="width: 100px; text-align: center;">✔️</td>
<td style="width: 115px; text-align: center;">&times;</td>
</tr>
<tr>
<td style="width: 140px;">主键列</td>
<td style="width: 100px; text-align: center;">✔️</td>
<td style="width: 115px; text-align: center;">✔️</td>
</tr>
<tr>
<td style="width: 140px;">频繁修改索引列</td>
<td style="width: 100px; text-align: center;">&times;</td>
<td style="width: 115px; text-align: center;">✔️</td>
</tr>
</tbody>
</table>
<h3>六、DELETE 和 TRUNCATE区别</h3>
<ul>
<li>灵活性：delete可以条件删除数据，而truncate只能删除表的所有数据。</li>
<li>效率：delete &lt; truncate，delete是一行一行的删除，truncate会重建表结构。</li>
<li>事务：truncate是DDL语句，需要drop权限，因此会隐式提交，不能回滚；delete是DML语句，可以回滚。</li>
<li>触发器：truncate不能触发任何delete触发器；delete可以触发delete触发器。</li>
</ul>
<h3>七、事务</h3>
<p>事务是一个操作序列，要么同时执行，要么同时不执行，是一个不可分割的工作单位。</p>
<h4>7.1 四大特性</h4>
<ul>
<li>原子性：事务元素的执行，要么全部成功，要么全部失败。</li>
<li>一致性：事务处理前后的数据总体保持一致。</li>
<li>持久性：事务一旦提交，对数据库的修改就是永远的。</li>
<li>隔离性：不同的事务具有隔离性。</li>
</ul>
<h4>7.2 隔离级别</h4>
<ul>
<li>Serializable(串行化)：可避免脏读、不可重复读、幻读的发生。</li>
<li>Repeatable red(可重复读)：可避免脏读、不可重复读的发生。</li>
<li>Read committed(读已提交)：可避免脏读的发生。</li>
<li>Read uncommitted(读未提交)：最低级别，任何情况都无法保证。</li>
</ul>
<p>脏读：是一个事物在修改某个数据但未提交，这时另一个事物也来访问该数据，这时就会造成两个事务得到的数据不一致。</p>
<p>不可重复读：指事务1在读取某一数据，而事务2立马修改了这个数据并提交事务给数据库，当事务1再次读取该数据就会得到不同的结果。</p>
<p>幻读：事务非独立执行时发生的一种现象。比如：事务1对一个表中的所有行的某个数据项进行修改操作，如从1修改成2，这时事务2又对这个表中插入一行数据，并且在这个数据项的数据为1时就提交给数据库。如果事务1的操作用户查询刚刚修改的数据，会发现还有一个没有修改，其实这一行是事务2添加的，这就是幻读。</p>
<p>隔离级别越高，越能保证数据的完整性和一致性，但是对并发性能的影响也越大。大多是数据库默认的隔离级别为Read-Committed，比如SqlServer、Oracle。少数数据库默认隔离级别为：Repeatable-Read，比如MySQL InnoDB。</p>
<h3>八、分库分表</h3>
<p>垂直切分：即将表按照功能模块、关系密切程度划分出来，部署到不同的库上。列如：商品库、用户库、订单库等。</p>
<p>水平切分：当一个表中的数据量过大时，我们可以把该表的数据按照某种规则，例如userId散列进行划分，然后存储到多个结构相同的表和不同的库上。</p>
<p>需要解决的问题：</p>
<ul>
<li>事务问题</li>
<li>跨节点Join问题</li>
<li>跨节点的count、order by、group by、limit以及聚合函数问题</li>
<li>数据迁移、容量规划、扩容等问题</li>
<li>ID问题</li>
<li>分库策略、数量</li>
</ul>
<h3>九、分表-每张表存放多少数据？为什么？</h3>
<p>曾经在互联网技术圈广为流传着这么一个说法：MySQL单表数据量大于2000万行，性能会明显下降。事实上，这个传闻据说最早起源于百度。当你的DBA测试MySQL性能时发现，当单表的量在2000万行量级的时候，SQL操作的性能急剧下降，结论由此而来。又据说百度的工程师流动到业界的其他公司，也带去了这个信息，所以业界流传开这么一个说法。</p>
<p>再后来，阿里巴巴《Java开发手册》提出单表行数超过500万行或单表容量超过2GB，才推荐进行分库分表。对此，有阿里的黄金铁律支撑，很多人设计大数据存储时，多会以此为标准，进行分表操作。</p>
<p>事实上，这个数值和实际记录的条数无关，而与MySQL的配置以及机器的硬件有关。因为MySQL为了提高性能，会将表的索引装载到内存中。InnoDB buffer size足够的情况下，其能完成全加载进内存，查询不会有问题。但是，当单表数据库到达某个量级的上限时，导致内存无法存储其索引，使得之后的SQL查询会产生磁盘IO，从而导致性能下降。当然，这个还有具体的表结构设计有关，最终导致的问题都是内存限制。增加硬件配置，可能会带来立竿见影的性能提升。</p>
<p>需要结合实际需求，不宜过度设计，在项目一开始不采用分库与分表，而是随着业务的增长，在无法继续优化的情况下，在考虑分库与分表提高系统的性能。阿里巴巴《Java开发手册》补充道：如果预计三年后的数据量根本达不到这个级别，请不要在创建表时就分库分表。那么这个数值多少才合适呢？要根据自身的机器情况综合评估，如果心里没有标准，那么暂时以500万行作为一个统一的标准，相对而言算是一个比较折中的数值。</p>
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