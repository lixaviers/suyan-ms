(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d0cf4c2"],{"62b2":function(t,e,l){"use strict";l.r(e);var i=function(){var t=this,e=t.$createElement,l=t._self._c||e;return l("div",{staticClass:"suyan__home"},[l("h1",[t._v("MySQL"),l("el-button",{staticClass:"suyan__btn__print",attrs:{type:"primary",plain:""},on:{click:t.print}},[t._v("打印pdf")])],1),l("el-divider"),l("h3",[t._v("一、常见的查询算法")]),l("p",[t._v("1、顺序查找(Linear search)：最基本的查询算法当然是顺序查找，也就是对比每个元素的方法，不过这种算法在数据量很大时效率是极低的。")]),l("p",[t._v("2、二分查找(binary search)：比顺序查找更快的查询方法应该就是二分查找了，二分查找的原理是查找过程从数据的中间元素开始，如果中间元素正好是要查找的元素，则搜索过程结束；如果某一特定元素大于或者小于中间元素，则在数据大于或小于中间元素的那一半中查找，而且跟开始一样从中间开始比较。如果在某一步骤数据为空，则代表找不到。")]),l("p",[t._v("3、二叉排序树查找：特点是：")]),t._m(0),l("p",[t._v("搜索的原理：")]),t._m(1),l("p",[t._v("4、哈希散列法(哈希表)：首先根据key值和哈希函数创建一个哈希表(散列表)，然后根据键值，通过散列函数，定位数据元素位置。")]),l("p",[t._v("5、分块查找(索引顺序查找)：它是顺序查找的一种改进方法。其算法思想是将n个数据元素”按块有序“划分为m块(m ≤ n)。每一个块中的节点不必有序，但块与块之间必须”按块有序“；即第1块中任意元素的关键字都必须小于第二块中任意元素的关键字；而第2块中任意元素又都必须小于第3块中的任意元素，以此类推。算法流程：")]),t._m(2),l("p",[t._v("6、B Tree(B-Tree)：它是一种平衡多路查找树。为了描述B-Tree，首先定义一条数据记录为一个二元组[key, data]，key为记录的键值，对于不同数据记录，key是互不相同的；data为数据记录除key外的数据。那么B-Tree是满足下列条件的数据结构：")]),t._m(3),l("p",[t._v("由于B-Tree的特性，在B-Tree中按key检索的算法非常直观：首先从根节点进行二分查找，如果找到则返回对应节点的data，否则对相应区间的指针指向的节点递归进行查找，直到找到节点或找到null指针，前者查找返回成功，后者返回查找失败。关于B-Tree有一系列有趣的性质，列如一个度为d的B-Tree，设其索引N个key，则其高度h的上限为logd((n+1)/2)，检索一个key，其查找节点个数的渐进复杂度为0(logdN)。从这点可以看出，B-Tree是一个非常有效率的索引数据结构。另外，由于插入删除新的数据记录会破坏B-Tree的性质，因此在插入删除时，需要对数进行一个分裂、合并、转移等操作以保持B-Tree性质。")]),l("p",[t._v("7、B+Tree：MySQL普遍使用B+Tree实现其索引结构。与B-Tree相比，B+Tree有以下不同点：")]),t._m(4),l("p",[t._v("由于并不是所有节点都具有相同的域，因此B+Tree中叶节点和内节点一般大小不同。这点与B-Tree不同，虽然B-Tree中不同节点存放的key和指针可能数量不一致，但是每个节点的域和上限是一致的，所以在实现B-Tree往往对每个节点申请同等大小的空间。一般来说，B+Tree比B-Tree更适合实现存储索引结构。因为：")]),t._m(5),l("p",[t._v("8、带有顺序访问指针的B+Tree：一般在数据库系统或文件系统使用的B+Tree结构都在经典B+Tree的基础上进行了优化，增加了顺序访问指针。在B+Tree的每个叶子节点增加一个指向相邻叶子节点的指针，就形成了带有顺序访问指针的B+Tree。做这个优化的目的是为了提高区间访问的性能，只需顺着节点和指针顺序遍历就可以一次性访问到所有数据节点，极大提高了区间查询效率。")]),l("h3",[t._v("二、索引的实现")]),l("p",[t._v("1、MylSAM索引实现")]),l("p",[t._v("MylSAM引擎使用B+Tree作为索引结构，叶节点的data域存放的是数据记录的地址，索引文件仅仅保存数据记录的地址。在MylSAM中，主索引和辅助索引(Secondary key)在结构上没有任何区别，只是主索引要求key是唯一的，而辅助索引的key可以重复。同样也是一颗B+Tree，data域保存数据记录的地址。因此，MylSAM中索引检索的算法为首先按照B+Tree搜索算法搜索索引，如果指定的key存在，则取出其data域的值，然后以data域的值为地址，读取响应数据记录。MylSAM的索引方式也叫做”非聚集“的，之所以这么称呼是为了与InnoDB的聚集索引区分。")]),l("p",[t._v("2、InnoDB索引实现")]),l("p",[t._v("虽然InnoDB也是用B+Tree作为索引结构，但具体实现方式却与MylSAM截然不同。第一个重大区别是InnoDB的数据文件本身就是索引文件。MylSAM索引文件和数据文件是分离的，索引文件仅保存数据记录的地址。而在InnoDB中，表数据文件本身就是按B+Tree组织的一个索引结构，这棵树的叶节点data域保存了完整的数据记录。这个索引的key是数据表的主键，因此InnoDB表数据文件本身就是主索引。这种索引也叫聚集索引。因为InnoDB的数据文件本身要按主键聚集，所以InnoDB要求表必须有主键(MylSAM可以没有)，如果没有显式指定，则MySQL系统会自动选择一个可以唯一标识数据记录的列作为主键。如果不存在这种列，则MySQL自动为InnoDB表生成一个隐含字段作为主键，这个字段长度为6个字节，类型为长整型。第二个与MylSAM索引不同的是InnoDB的辅助索引data域存储相应记录主键的值而不是地址。换句话说，InnoDB的所有辅助索引都引用主键作为data域。聚集索引这种实现方式使得按主键的搜索十分高效，但是辅助索引搜索需要检索两遍索引：首先检索辅助索引获得主键，然后用主键到主索引中检索获得记录。")]),t._m(6),l("h3",[t._v("三、MylSAM与InnoDB的区别及适用场景")]),l("p",[t._v("区别：")]),t._m(7),l("p",[t._v("如何选择：")]),t._m(8),l("h3",[t._v("四、索引优缺点及使用注意事项")]),l("p",[t._v("1、优点")]),t._m(9),l("p",[t._v("2、缺点")]),t._m(10),l("p",[t._v("3、使用注意事项")]),t._m(11),l("h3",[t._v("五、聚集索引与非聚集索引")]),l("p",[t._v("聚集索引：来源于生活尝试。这种索引可以说是按照数据的物理存储进行划分的。对于一堆记录来说，使用聚集索引就是对这堆记录堆划分。即主要描述的是物理上的存储。")]),l("p",[t._v("非聚集索引：也可以从生活中找到映射。强调的是逻辑分类。可以说是定义了一套存储规则，而需要有一块控件来维护这个规则，这个被称之为索引表。")]),l("p",[t._v("区别：")]),t._m(12),l("p",[t._v("场景：")]),t._m(13),l("h3",[t._v("六、DELETE 和 TRUNCATE区别")]),t._m(14),l("h3",[t._v("七、事务")]),l("p",[t._v("事务是一个操作序列，要么同时执行，要么同时不执行，是一个不可分割的工作单位。")]),l("h4",[t._v("7.1 四大特性")]),t._m(15),l("h4",[t._v("7.2 隔离级别")]),t._m(16),l("p",[t._v("脏读：是一个事物在修改某个数据但未提交，这时另一个事物也来访问该数据，这时就会造成两个事务得到的数据不一致。")]),l("p",[t._v("不可重复读：指事务1在读取某一数据，而事务2立马修改了这个数据并提交事务给数据库，当事务1再次读取该数据就会得到不同的结果。")]),l("p",[t._v("幻读：事务非独立执行时发生的一种现象。比如：事务1对一个表中的所有行的某个数据项进行修改操作，如从1修改成2，这时事务2又对这个表中插入一行数据，并且在这个数据项的数据为1时就提交给数据库。如果事务1的操作用户查询刚刚修改的数据，会发现还有一个没有修改，其实这一行是事务2添加的，这就是幻读。")]),l("p",[t._v("隔离级别越高，越能保证数据的完整性和一致性，但是对并发性能的影响也越大。大多是数据库默认的隔离级别为Read-Committed，比如SqlServer、Oracle。少数数据库默认隔离级别为：Repeatable-Read，比如MySQL InnoDB。")]),l("h3",[t._v("八、分库分表")]),l("p",[t._v("垂直切分：即将表按照功能模块、关系密切程度划分出来，部署到不同的库上。列如：商品库、用户库、订单库等。")]),l("p",[t._v("水平切分：当一个表中的数据量过大时，我们可以把该表的数据按照某种规则，例如userId散列进行划分，然后存储到多个结构相同的表和不同的库上。")]),l("p",[t._v("需要解决的问题：")]),t._m(17),l("p"),l("p"),l("p"),l("p"),l("p")],1)},n=[function(){var t=this,e=t.$createElement,l=t._self._c||e;return l("ul",[l("li",[t._v("若它的左子树不空，则左子树上所有结点的值均小于它的根节点的值；")]),l("li",[t._v("若它的右子树不空，则右子树上所有结点的值均大于它的根节点的值；")]),l("li",[t._v("它的左、右子树也分别为二叉排序树(递归实现)；")])])},function(){var t=this,e=t.$createElement,l=t._self._c||e;return l("ul",[l("li",[t._v("查找操作从根节点开始，一个一个节点递归查找。")]),l("li",[t._v("若该节点的值与要找的值吻合，那么找到退出。")]),l("li",[t._v("若要找的值大于该节点的值，查找它的右子树节点。")]),l("li",[t._v("若要找的值小于该节点的值，查找它的左子树节点。")]),l("li",[t._v("若该节点是NULL，那么说明已经查找完了整个树，还没有找到。")])])},function(){var t=this,e=t.$createElement,l=t._self._c||e;return l("ul",[l("li",[t._v("先选取各块中的最大关键字构成一个索引表。")]),l("li",[t._v("查找分为两个部分：先对索引表进行二分查找或者顺序查找，以确定待查记录在哪一块中。然后在已确定的块中用顺序法进行查找。")])])},function(){var t=this,e=t.$createElement,l=t._self._c||e;return l("ul",[l("li",[t._v("d为大于1的一个正整数，称为B-Tree的度。")]),l("li",[t._v("h为一个正整数，称为B-Tree的高度。")]),l("li",[t._v("每个非叶子节点由n-1个key和n个指针组成，其中d <= n <= 2d。")]),l("li",[t._v("每个叶子节点最少包含一个key和两个指针，最多包含2d-1个key和2d个指针，叶节点的指针均为null。")]),l("li",[t._v("所有叶节点具有相同的深度，等于树高h。")]),l("li",[t._v("key和指针互相间隔，节点两端是指针。")]),l("li",[t._v("一个节点中的key从左到右非递减排列。")]),l("li",[t._v("所有节点组成树结构。")]),l("li",[t._v("每个指针要么为null，要么指向另外一个节点。")]),l("li",[t._v("如果某个指针在节点node最左边且不为null，则其指向节点的所有key小于v("),l("span",{staticClass:"mi",attrs:{id:"MathJax-Span-16"}},[t._v("k")]),l("span",{staticClass:"mi",attrs:{id:"MathJax-Span-17"}},[t._v("e")]),l("span",{staticClass:"msubsup",attrs:{id:"MathJax-Span-18"}},[l("span",{staticClass:"mi",attrs:{id:"MathJax-Span-19"}},[t._v("y ")]),l("span",{staticClass:"mn",attrs:{id:"MathJax-Span-20"}},[t._v("1")])]),t._v(")，其中v(key 1)为node的第一个key的值。")]),l("li",[t._v("如果某个指针在节点node最右边且不为null，则其指向节点的所有key大于v(key m)，其中v(key m)为node的最后一个key的值。")]),l("li",[t._v("如果某个指针在节点node的左右相邻key分别是key i和key i+1且不为null，则其指向节点的所有key小于v(key i+1)且大于v(key i)。")])])},function(){var t=this,e=t.$createElement,l=t._self._c||e;return l("ul",[l("li",[t._v("每个节点的指针上线为2d，不是2d+1。")]),l("li",[t._v("内节点不存储data，只存储key。")]),l("li",[t._v("叶子节点不存储指针。")])])},function(){var t=this,e=t.$createElement,l=t._self._c||e;return l("ul",[l("li",[t._v("B+Tree的磁盘读写代价更低：B+Tree的内部节点并没有指向关键字具体信息的指针，因此其内部节点相对B Tree更小。如果把所有同一内部节点的关键字存放在同一盘块中，那么盘块所能容纳的关键字数量也越多。一次性读入内存中需要查找的关键字也就越多。相对来说IO读写次数也就降低了。")]),l("li",[t._v("B+Tree的查询效率更贱稳定：由于非终节点并不是最终指向文件内容的节点，而只是叶子节点中关键字的索引。所以任何关键字的查找必须走一条从根节点到叶子节点的路。所有关键字查询的路径长度相同，导致每一个数据的查询效率相当。")])])},function(){var t=this,e=t.$createElement,l=t._self._c||e;return l("p",[l("a",{attrs:{href:"http://blog.codinglabs.org/articles/theory-of-mysql-index.html",target:"_blank",rel:"noopener"}},[t._v("参考文章")])])},function(){var t=this,e=t.$createElement,l=t._self._c||e;return l("ul",[l("li",[t._v("InnoDB支持事物，MylSAM不支持。")]),l("li",[t._v("InnoDB支持行级锁，MylSAM不支持。")]),l("li",[t._v("InnoDB支持MVCC，MylSAM不支持。MVCC(Multi-Version Concurrency Control)：多版本的并发控制协议")]),l("li",[t._v("InnoDB支持外键，MylSAM不支持。")]),l("li",[t._v("InnoDB不支持全文检索，MylSAM支持。")]),l("li",[t._v("InnoDB不支持FULLTEXT类型的索引。")]),l("li",[t._v("InnoDB中不保存表的行数，如select count(1)需要扫描整表，MylSAM只要简单的读出保存好的行数即可，当count语句包含where也需要扫描整个表。")]),l("li",[t._v("清空整个表时，InnoDB是一行一行的删除，效率非常慢。MylSAM则会重建表。")])])},function(){var t=this,e=t.$createElement,l=t._self._c||e;return l("ul",[l("li",[t._v("是否要支持事物，需要选InnoDB。")]),l("li",[t._v("如果表中绝大多数都只是读查询，可以考虑MylSAM。如果既有读写也挺频繁，请使用InnoDB。")]),l("li",[t._v("系统奔溃后，MylSAM恢复起来更困难，能否接受。")]),l("li",[t._v("MySQL5.5版本开始InnoDB已经成为MySQL的默认引擎(之前是MylSAM)。")])])},function(){var t=this,e=t.$createElement,l=t._self._c||e;return l("ul",[l("li",[t._v("大大加速数据的查询速度。")]),l("li",[t._v("使用分组和排序进行数据查询时，可以显著减少查询时分组和排序时间。")]),l("li",[t._v("唯一索引能够保证数据库表中每一行数据的唯一性。")]),l("li",[t._v("在实现数据的参考完整性方面，可以减速表和表之间的连接。")])])},function(){var t=this,e=t.$createElement,l=t._self._c||e;return l("ul",[l("li",[t._v("创建索引和维护索引需要消耗时间，并且随着数据量的增加，时间也会增加。")]),l("li",[t._v("索引需要占用磁盘空间。")]),l("li",[t._v("对数据表中的数据进行增加、修改、删除时，索引也要动态的维护，降低了维护的速度。")])])},function(){var t=this,e=t.$createElement,l=t._self._c||e;return l("ul",[l("li",[t._v("更新频繁的列不应设置索引。")]),l("li",[t._v("数据量小的表不要使用索引。")]),l("li",[t._v("重复数据多的字段不应设为索引(重复的数据超过15%就不该建索引)。")]),l("li",[t._v("在where和join中出现的列建立索引。")]),l("li",[t._v("不要在where条件语句=的左边进行函数、运算符或表达式的计算。")]),l("li",[t._v("不要使用<>，!=，not in，索引不生效。")]),l("li",[t._v("避免对字段进行null判断，索引不生效。")]),l("li",[t._v("like '%xxx'，索引不生效。")]),l("li",[t._v("数据类型隐形转换，索引不生效。")]),l("li",[t._v("避免使用or，可以用union替代。")]),l("li",[t._v("使用exist代替in(表中数据越多，exist的效率就比in越大)。")]),l("li",[t._v("不用使用select *。")])])},function(){var t=this,e=t.$createElement,l=t._self._c||e;return l("ul",[l("li",[t._v("聚集索引可以帮助把很大的范围迅速减小范围。但是查找改记录，就要从这个小范围中扫描了。")]),l("li",[t._v("非聚集索引把一个很大的范围转换成一个小的地图。你需要在这个小地图中找你要寻找的信息位置。然后通过这个位置，再去找你所需要的记录。")])])},function(){var t=this,e=t.$createElement,l=t._self._c||e;return l("table",{staticStyle:{"border-collapse":"collapse",width:"auto"},attrs:{border:"1"}},[l("tbody",[l("tr",[l("td",{staticStyle:{width:"140px"}},[t._v("动作描述")]),l("td",{staticStyle:{width:"100px","text-align":"center"}},[t._v("使用聚集索引")]),l("td",{staticStyle:{width:"115px","text-align":"center"}},[t._v("使用非聚集索引")])]),l("tr",[l("td",{staticStyle:{width:"140px"}},[t._v("列经常分组排序")]),l("td",{staticStyle:{width:"100px","text-align":"center"}},[t._v("✔️")]),l("td",{staticStyle:{width:"115px","text-align":"center"}},[t._v("✔️")])]),l("tr",[l("td",{staticStyle:{width:"140px"}},[t._v("返回某范围内的数据")]),l("td",{staticStyle:{width:"100px","text-align":"center"}},[t._v("✔️")]),l("td",{staticStyle:{width:"115px","text-align":"center"}},[t._v("×")])]),l("tr",[l("td",{staticStyle:{width:"140px"}},[t._v("很小的不同值")]),l("td",{staticStyle:{width:"100px","text-align":"center"}},[t._v("×")]),l("td",{staticStyle:{width:"115px","text-align":"center"}},[t._v("×")])]),l("tr",[l("td",{staticStyle:{width:"140px"}},[t._v("小数目不同值")]),l("td",{staticStyle:{width:"100px","text-align":"center"}},[t._v("✔️")]),l("td",{staticStyle:{width:"115px","text-align":"center"}},[t._v("×")])]),l("tr",[l("td",{staticStyle:{width:"140px"}},[t._v("大数据不同值")]),l("td",{staticStyle:{width:"100px","text-align":"center"}},[t._v("×")]),l("td",{staticStyle:{width:"115px","text-align":"center"}},[t._v("✔️")])]),l("tr",[l("td",{staticStyle:{width:"140px"}},[t._v("频繁更新的列")]),l("td",{staticStyle:{width:"100px","text-align":"center"}},[t._v("×")]),l("td",{staticStyle:{width:"115px","text-align":"center"}},[t._v("✔️")])]),l("tr",[l("td",{staticStyle:{width:"140px"}},[t._v("外键列")]),l("td",{staticStyle:{width:"100px","text-align":"center"}},[t._v("✔️")]),l("td",{staticStyle:{width:"115px","text-align":"center"}},[t._v("×")])]),l("tr",[l("td",{staticStyle:{width:"140px"}},[t._v("主键列")]),l("td",{staticStyle:{width:"100px","text-align":"center"}},[t._v("✔️")]),l("td",{staticStyle:{width:"115px","text-align":"center"}},[t._v("✔️")])]),l("tr",[l("td",{staticStyle:{width:"140px"}},[t._v("频繁修改索引列")]),l("td",{staticStyle:{width:"100px","text-align":"center"}},[t._v("×")]),l("td",{staticStyle:{width:"115px","text-align":"center"}},[t._v("✔️")])])])])},function(){var t=this,e=t.$createElement,l=t._self._c||e;return l("ul",[l("li",[t._v("灵活性：delete可以条件删除数据，而truncate只能删除表的所有数据。")]),l("li",[t._v("效率：delete < truncate，delete是一行一行的删除，truncate会重建表结构。")]),l("li",[t._v("事务：truncate是DDL语句，需要drop权限，因此会隐式提交，不能回滚；delete是DML语句，可以回滚。")]),l("li",[t._v("触发器：truncate不能触发任何delete触发器；delete可以触发delete触发器。")])])},function(){var t=this,e=t.$createElement,l=t._self._c||e;return l("ul",[l("li",[t._v("原子性：事务元素的执行，要么全部成功，要么全部失败。")]),l("li",[t._v("一致性：事务处理前后的数据总体保持一致。")]),l("li",[t._v("持久性：事务一旦提交，对数据库的修改就是永远的。")]),l("li",[t._v("隔离性：不同的事务具有隔离性。")])])},function(){var t=this,e=t.$createElement,l=t._self._c||e;return l("ul",[l("li",[t._v("Serializable(串行化)：可避免脏读、不可重复读、幻读的发生。")]),l("li",[t._v("Repeatable red(可重复读)：可避免脏读、不可重复读的发生。")]),l("li",[t._v("Read committed(读已提交)：可避免脏读的发生。")]),l("li",[t._v("Read uncommitted(读未提交)：最低级别，任何情况都无法保证。")])])},function(){var t=this,e=t.$createElement,l=t._self._c||e;return l("ul",[l("li",[t._v("事务问题")]),l("li",[t._v("跨节点Join问题")]),l("li",[t._v("跨节点的count、order by、group by、limit以及聚合函数问题")]),l("li",[t._v("数据迁移、容量规划、扩容等问题")]),l("li",[t._v("ID问题")]),l("li",[t._v("分库策略、数量")])])}],_=l("c276"),r={methods:{print:function(){_["a"].print()}}},a=r,v=l("5d22"),c=Object(v["a"])(a,i,n,!1,null,null,null);e["default"]=c.exports}}]);
//# sourceMappingURL=chunk-2d0cf4c2.99da2375.js.map