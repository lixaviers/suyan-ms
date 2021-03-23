(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d224869"],{e107:function(e,a,t){"use strict";t.r(a);var s=function(){var e=this,a=e.$createElement,t=e._self._c||a;return t("div",{staticClass:"suyan__home"},[t("h1",[e._v("集合框架"),t("el-button",{staticClass:"suyan__btn__print",attrs:{type:"primary",plain:""},on:{click:e.print}},[e._v("打印pdf")]),t("el-button",{staticClass:"suyan__btn__close",staticStyle:{"margin-right":"20px"},attrs:{plain:""},on:{click:e.closeAside}},[e._v("关闭导航")])],1),t("el-divider"),t("h3",[e._v("一、ArrayList")]),t("p",[e._v("ArrayList相当于一个对象数组，相对于数组来说，数组效率更高，因为数组是连续的存储数据，索引速度非常的快，数组的大小需要提前固定。ArrayList存储的是Object，相当于一个动态的Object []，在插入两种类型的数据时是不会报错的。但是在使用中，很可能会报类型不匹配的错误，所以ArrayList不是类型安全的，ArrayList因为存储的是Object，所以就涉及了装箱和拆箱的问题，在效率上相对数组来说变低了。jdk1.5之后加入了泛型的概念，让ArrayList在使用的时候更加安全了，同时ArrayList大小可以动态的增加，比数组使用起来更加灵活。")]),t("h3",[e._v("二、LinkedList")]),t("p",[e._v("链接列表，相当于一个带链表的List，同时LinkedList不具有线程安全，想要让LinkedList具有线程安全，可用Collections.synchronizedList(new LinkedList())。它和ArrayList在本质上，ArrayList是基于数组的数据结构，而LinkedList是基于链表的数据结构。在源码中，LinkedList定义了一个双向的引用。每一个Node，都有一个前驱和后驱。包装了在开头和结尾进行get、remove、insert方法。")]),t("p",[e._v("ArrayList和LinkedList比较：")]),e._m(0),e._m(1),t("h4",[e._v("3.1 HashMap的特性")]),e._m(2),t("h4",[e._v("3.2 HashMap的底层原理")]),t("p",[e._v("基于hashing原理，jdk8后采用数组+链表+红黑树的结构数据，通过put和get存储和获取对象。当给put()方法传递键和值时，先对键做一个hashCode()的计算来得到它在bucket数组中的位置来存储Entry对象。当获取对象时，通过get获取到bucket的位置，再通过键对象的equals()方法找到正确的键值对，然后返回对象。")]),t("h4",[e._v("2.3 传统hashMap的缺点(为什么引入红黑树)")]),t("p",[e._v("JDK1.8以前HashMap的实现是数组+链表，即使哈希函数取得再好，也很难达到元素百分百均匀分布。当HashMap中有大量的元素都存放到同一个桶中时，这个桶下有一条长长的链表，这个时候HashMap就相当于一个单链表。假如单链表有n个元素，遍历的时间复杂度就是O(n)，完全失去了它的优势。针对这种情况，JDK1.8引入了红黑树(查找时间复杂度为O(log^n))来优化这个问题。")]),t("p",[e._v("O(n): 表示该算法是线性算法，时间复杂度为O(n)，就代表数据量增大几倍，耗时也增大几倍。要找到一个数组里面最大的一个数，你要把n个变量都扫描一遍，操作次数为n，那么算法复杂度是O(n)。")]),e._m(3),e._m(4),t("h4",[e._v("3.4 HashMap中get是如何实现的")]),t("p",[e._v("对key的hashCode进行hashing，与高16位做异或运算计算下标获取bucket位置。如果在桶的首位上就可以找到就直接返回，否则在树中或者链表中遍历找。如果有hash冲突，则利用equals()方法去遍历链表查找节点。")]),t("p",[e._v("其它实现hash函数的方式：平方取中法、除留余数法、伪随机数法。")]),t("p",[e._v("为什么不直接将key作为哈希值而是与高16位做异或运算？")]),t("p",[e._v("因为数组位置的确定用的是与运算，仅仅最后四位有效，设计者将key的哈希值与高16位做异或运算使得在做&运算确定数组的插入位置时，此时的低位实际是高位与低位的结合，增加了随机性，减少了哈希碰撞的次数。")]),t("h4",[e._v("3.5 当两个对象的hashCode相等时会怎么样，如何取值")]),t("p",[e._v("会产生哈希碰撞，若key值相同则替换旧值，不然链接到链表后面，链表长度超过阙值8就转为红黑树存储。")]),t("p",[e._v("hashCode相同，通过equals比较内容获取值对象。")]),t("h4",[e._v("3.6 HashMap中put是如何实现的")]),e._m(5),t("h4",[e._v("3.7 HashMap中什么时候需要进行扩容，扩容resize()又是如何实现的")]),t("p",[e._v("扩容场景：")]),e._m(6),t("p",[e._v("实现过程：通过判断旧数组的容量是否大于0来判断数组是否初始化过。未初始化：进行初始化(判断是否调用无参构造器 是：使用默认的大小和阙值，否：使用构造函数中初始化的容量，当然这个容量是经过tableSizefor计算后的2的次幂数)，初始化过：进行扩容，扩容成两倍(小于最大值的情况下)，之后在进行将元素重新进行与运算复制到新的散列表中。概况的讲：扩容需要重新分配一个新数组，新数组是老数组的2倍长，然后遍历整个老结构，把所有的元素挨个重新hash分配到新机构中去。")]),t("h4",[e._v("3.8 HashMap的默认初始化长度为什么是16？为什么必须是2的幂？如果输入值不是2的幂比如10会怎么样？")]),e._m(7),t("h4",[e._v("3.9 HashMap的参数loadFactor的作用是什么？")]),t("p",[e._v("loadFactor表示HashMap的拥挤程度，影响hash操作到同一个数组位置的概率。默认loadFactor等于0.75，当HashMap里面容纳的元素已经达到HashMap数组长度的75%时，表示HashMap太挤了，需要扩容。在HashMap的构造器中可以定制loadFactor。")]),t("h4",[e._v("2.10 HashMap和HashTable的区别")]),t("p",[e._v("相同点：都是存储key-value键值对的。")]),t("p",[e._v("不同点：")]),e._m(8),t("h3",[e._v("四、HashTable")]),t("p",[e._v("待完善")]),t("h3",[e._v("五、ConcurrentHashMap")]),t("h4",[e._v("5.1 为何会出现ConcurrentHashMap")]),e._m(9),t("h4",[e._v("5.2 ConcurrentHashMap如何保证线程安全")]),e._m(10),t("p"),t("p"),t("p"),t("p")],1)},n=[function(){var e=this,a=e.$createElement,t=e._self._c||a;return t("ol",[t("li",[e._v("是否包装线程安全：ArrayList和LinkedList都是不同步的，也就是不保证线程安全。")]),t("li",[e._v("底层数据结构：ArrayList底层使用的是Object数组，LinkedList底层使用的是双向链表数据结构(1.6之前为循环链表，1。7取消了循环)。")]),t("li",[e._v("插入和删除：ArrayList采用数组存储，插入和删除元素的时间复杂度受元素影响。比如：执行add(E e)方法的时候，ArrayList会默认将指定的元素追加到此列表的末尾，这种情况时间复杂度就是O(1)。但是如果要在指定位置i点插入和删除元素的话(add(int index, E element))，时间复杂度就为O(n-1)。因为在进行上述操作的时候集合中第i和第i个元素之后的n-1个元素都要执行向后/向前移一位的操作。LinkedList采用链表存储，所以插入、删除元素复杂度不收元素位置影响，都是近似O(1)，而数组近似为O(n)。")]),t("li",[e._v("是否支持快速随机访问：LinkedList不支持高效的随机访问，而ArrayList支持。快速随机访问就是通过元素的序号快速获取元素对象。")]),t("li",[e._v("内存空间占用：ArrayList的空间浪费主要体现在list列表的结尾会预留一定的容量空间，而LinkedList的空间花费则体现在它的每一个元素都需要消耗比ArrayList更多的空间，因为要存放直接后继和直接前驱以及数据。"),t("a",{attrs:{href:"https://www.cnblogs.com/ysyy/p/10891079.html",target:"_blank",rel:"noopener"}},[e._v("参考文章")])])])},function(){var e=this,a=e.$createElement,t=e._self._c||a;return t("h3",[e._v("三、HashMap "),t("a",{attrs:{href:"https://www.cnblogs.com/zengcongcong/p/11295349.html",target:"_blank",rel:"noopener"}},[e._v("参考文章")])])},function(){var e=this,a=e.$createElement,t=e._self._c||a;return t("ul",[t("li",[e._v("HashMap存储键值对实现快速存取，允许为null。key值不可以重复，如果key值重复则覆盖。")]),t("li",[e._v("非同步，线程不安全。")]),t("li",[e._v("底层是hash表，不保证有序(比如插入的顺序)。")])])},function(){var e=this,a=e.$createElement,t=e._self._c||a;return t("p",[e._v("O(log^n)解析：当数据增大n倍时，耗时增大log n倍(这里的log是以2为底的，比如，当数据增大256倍时，耗时只增大8倍，是比线性还要低的时间复杂度)。二分查找就是O(log n)的算法，每找一次排除一半的可能，256个数据中查找只要找8次就可以找到目标。比如我要找到23号的房间钥匙，我从中间切开，找到50编号的位置，然后23在1~50里面，我再把从中间切开变成25，然后23在1~25之间，我再切开变成12.5，然后23在12.5~25之间，依次找下去，直到找到钥匙。这种查找钥匙的方法的复杂度就是O(log^n)。"),t("a",{attrs:{href:"https://blog.csdn.net/lkp1603645756/article/details/85013126",target:"_blank",rel:"noopener"}},[e._v("参考文章")])])},function(){var e=this,a=e.$createElement,t=e._self._c||a;return t("p",[t("a",{attrs:{href:"https://lixaviers.github.io/suyan-ms/#/structure",target:"_blank",rel:"noopener"}},[e._v("红黑树相关请移步")])])},function(){var e=this,a=e.$createElement,t=e._self._c||a;return t("ol",[t("li",[e._v("计算关于key的hashCode值(与Key.hashCode的高16位做异或运算)。")]),t("li",[e._v("如果散列表为空时，调用resize()初始化散列表。")]),t("li",[e._v("如果没有发生碰撞，直接添加元素到散列表中去。")]),t("li",[e._v("如果发生了碰撞(hashCode值相同)，进行三种判断。1）若key地址相同或者equals后内容相同，则替换旧值；2）如果是红黑树结构，就调用数的插入方法。3）链表结构，循环遍历直到链表中某个节点为空，尾插法进行插入，插入之后判断链表个数是否到达变成红黑树的阙值8，也可以遍历到有节点与插入元素的哈希值和内容相同，进行覆盖。")]),t("li",[e._v("如果桶满了大于阙值，则resize进行扩容。")])])},function(){var e=this,a=e.$createElement,t=e._self._c||a;return t("ol",[t("li",[e._v("初始化数组table。")]),t("li",[e._v("当数组table的size达到阙值时，即++size > load factor * capacity时，也是在putVal函数中。")])])},function(){var e=this,a=e.$createElement,t=e._self._c||a;return t("ol",[t("li",[e._v("为了数据均匀分布，减少哈希碰撞。因为确定数组位置时用的位运算，若数据不是2的次幂则会增加哈希碰撞的次数和浪费数组空间。")]),t("li",[e._v("输入数据若不是2的幂，HashMap通过一通 位移运算和或运算得到的肯定是2的幂次数，并且是离那个数最近的数字。")])])},function(){var e=this,a=e.$createElement,t=e._self._c||a;return t("ul",[t("li",[e._v("HashMap允许key-value为null，HashTable不允许。")]),t("li",[e._v("HashMap没有考虑同步，是线程不安全的。HashTable是线程安全的，给api套上了一层synchronized修饰。")]),t("li",[e._v("HashMap继承于AbstractMap类，HashTable继承于Dictionary类。")]),t("li",[e._v("容量的初始值和增加方式不一样：HashMap默认的容量大小是16，增加容量时，每次将容量变为原始容量*2。HashTable默认的容量大小是11，增加容量时，每次将容量变为原始容量*2+1。")]),t("li",[e._v("添加key-value时的hash值算法不同：HashMap添加元素时，是使用自定义的哈希算法。HashTable没有自定义哈希算法，而直接采用的key的hashCode()。")]),t("li",[e._v("迭代器：HashMap的迭代器(Iterator)是fail-fast迭代器，而HashTable的enumerator迭代器不是fail-fast的。所以当有其它线程改变了HashMap的结构(增加或者移除元素)，将会抛出ConcurrentModificationException。")])])},function(){var e=this,a=e.$createElement,t=e._self._c||a;return t("ol",[t("li",[e._v("HashTable在高并发场景下性能低下。")]),t("li",[e._v("HashMap不是线程安全的容器。")]),t("li",[e._v("同步包装器虽然使用同步方法提示了部分性能，但还是不适合高并发场景下的性能需求。")])])},function(){var e=this,a=e.$createElement,t=e._self._c||a;return t("ul",[t("li",[e._v("JDK7：使用的是分离锁(segment)，实际上是一种再入锁(RetrantLock)来保证线程安全。segment的数量是concurrentLevel决定，默认值是16。扩容的时候是针对单个segment扩容的，写操作也是，修改数据的时候锁定的部分，所以比较高效。")]),t("li",[e._v("JDK8：segment依然存在，不过不起结构上的作用，只起到保证序列化的兼容性。内部使用volatile来保证数据存储的可见性。利用CAS操作，在特定场景下进行无锁并发操作，内部的锁实现用的是synchronized。在JDK8中，synchronized已经得到性能的优化，并且对比再入锁可以减少内存消耗。在put的过程中如果没有发生冲突，则采用CAS操作进行无锁化更新，只有发生了哈希冲突的时候才锁住，且仅影响发生冲突的那一个链表的更新操作。")])])}],i=t("c276"),r={methods:{print:function(){i["a"].print()},closeAside:function(){i["a"].closeAside()}}},l=r,h=t("5d22"),_=Object(h["a"])(l,s,n,!1,null,null,null);a["default"]=_.exports}}]);
//# sourceMappingURL=chunk-2d224869.bef3951a.js.map