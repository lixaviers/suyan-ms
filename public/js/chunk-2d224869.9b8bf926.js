(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d224869"],{e107:function(a,e,s){"use strict";s.r(e);var t=function(){var a=this,e=a.$createElement,s=a._self._c||e;return s("div",{staticClass:"suyan__home"},[s("h1",[a._v("集合框架"),s("el-button",{staticClass:"suyan__btn__print",attrs:{type:"primary",plain:""},on:{click:a.print}},[a._v("打印pdf")])],1),s("el-divider"),s("h3",[a._v("一、ArrayList")]),s("p"),s("h3",[a._v("二、HashMap")]),s("h4",[a._v("2.1 HashMap的特性")]),a._m(0),s("h4",[a._v("2.2 HashMap的底层原理")]),s("p",[a._v("基于hashing原理，jdk8后采用数组+链表+红黑树的结构数据，通过put和get存储和获取对象。当给put()方法传递键和值时，先对键做一个hashCode()的计算来得到它在bucket数组中的位置来存储Entry对象。当获取对象时，通过get获取到bucket的位置，再通过键对象的equals()方法找到正确的键值对，然后返回对象。")]),s("h4",[a._v("2.3 传统hashMap的缺点(为什么引入红黑树)")]),s("p",[a._v("JDK1.8以前HashMap的实现是数组+链表，即使哈希函数取得再好，也很难达到元素百分百均匀分布。当HashMap中有大量的元素都存放到同一个桶中时，这个桶下有一条长长的链表，这个时候HashMap就相当于一个单链表。假如单链表有n个元素，遍历的时间复杂度就是O(n)，完全失去了它的优势。针对这种情况，JDK1.8引入了红黑树(查找时间复杂度为O(log^n))来优化这个问题。")]),s("p",[a._v("O(n): 表示该算法是线性算法，时间复杂度为O(n)，就代表数据量增大几倍，耗时也增大几倍。要找到一个数组里面最大的一个数，你要把n个变量都扫描一遍，操作次数为n，那么算法复杂度是O(n)。")]),a._m(1),s("h4",[a._v("2.4 HashMap中get是如何实现的")]),s("p",[a._v("对key的hashCode进行hashing，与高16位做异或运算计算下标获取bucket位置。如果在桶的首位上就可以找到就直接返回，否则在树中或者链表中遍历找。如果有hash冲突，则利用equals()方法去遍历链表查找节点。")]),s("p",[a._v("其它实现hash函数的方式：平方取中法、除留余数法、伪随机数法。")]),s("p",[a._v("为什么不直接将key作为哈希值而是与高16位做异或运算？")]),s("p",[a._v("因为数组位置的确定用的是与运算，仅仅最后四位有效，设计者将key的哈希值与高16位做异或运算使得在做&运算确定数组的插入位置时，此时的低位实际是高位与低位的结合，增加了随机性，减少了哈希碰撞的次数。")]),s("h4",[a._v("2.5 当两个对象的hashCode相等时会怎么样，如何取值")]),s("p",[a._v("会产生哈希碰撞，若key值相同则替换旧值，不然链接到链表后面，链表长度超过阙值8就转为红黑树存储。")]),s("p",[a._v("hashCode相同，通过equals比较内容获取值对象。")]),s("h4",[a._v("2.6 HashMap中put是如何实现的")]),a._m(2),s("h4",[a._v("2.7 HashMap中什么时候需要进行扩容，扩容resize()又是如何实现的")]),s("p",[a._v("扩容场景：")]),a._m(3),s("p",[a._v("实现过程：通过判断旧数组的容量是否大于0来判断数组是否初始化过。未初始化：进行初始化(判断是否调用无参构造器 是：使用默认的大小和阙值，否：使用构造函数中初始化的容量，当然这个容量是经过tableSizefor计算后的2的次幂数)，初始化过：进行扩容，扩容成两倍(小于最大值的情况下)，之后在进行将元素重新进行与运算复制到新的散列表中。概况的讲：扩容需要重新分配一个新数组，新数组是老数组的2倍长，然后遍历整个老结构，把所有的元素挨个重新hash分配到新机构中去。")]),s("h4",[a._v("2.8 HashMap的默认初始化长度为什么是16？为什么必须是2的幂？如果输入值不是2的幂比如10会怎么样？")]),a._m(4),s("h4",[a._v("2.9 HashMap的参数loadFactor的作用是什么？")]),s("p",[a._v("loadFactor表示HashMap的拥挤程度，影响hash操作到同一个数组位置的概率。默认loadFactor等于0.75，当HashMap里面容纳的元素已经达到HashMap数组长度的75%时，表示HashMap太挤了，需要扩容。在HashMap的构造器中可以定制loadFactor。")]),s("h4",[a._v("2.10 HashMap和HashTable的区别")]),s("p",[a._v("相同点：都是存储key-value键值对的。")]),s("p",[a._v("不同点：")]),a._m(5),s("p"),s("p"),s("p"),s("p")],1)},h=[function(){var a=this,e=a.$createElement,s=a._self._c||e;return s("ul",[s("li",[a._v("HashMap存储键值对实现快速存取，允许为null。key值不可以重复，如果key值重复则覆盖。")]),s("li",[a._v("非同步，线程不安全。")]),s("li",[a._v("底层是hash表，不保证有序(比如插入的顺序)。")])])},function(){var a=this,e=a.$createElement,s=a._self._c||e;return s("p",[a._v("O(log^n)解析：当数据增大n倍时，耗时增大log n倍(这里的log是以2为底的，比如，当数据增大256倍时，耗时只增大8倍，是比线性还要低的时间复杂度)。二分查找就是O(log n)的算法，每找一次排除一半的可能，256个数据中查找只要找8次就可以找到目标。比如我要找到23号的房间钥匙，我从中间切开，找到50编号的位置，然后23在1~50里面，我再把从中间切开变成25，然后23在1~25之间，我再切开变成12.5，然后23在12.5~25之间，依次找下去，直到找到钥匙。这种查找钥匙的方法的复杂度就是O(log^n)。"),s("a",{attrs:{href:"https://blog.csdn.net/lkp1603645756/article/details/85013126",target:"_blank",rel:"noopener"}},[a._v("参考文章")])])},function(){var a=this,e=a.$createElement,s=a._self._c||e;return s("ol",[s("li",[a._v("计算关于key的hashCode值(与Key.hashCode的高16位做异或运算)。")]),s("li",[a._v("如果散列表为空时，调用resize()初始化散列表。")]),s("li",[a._v("如果没有发生碰撞，直接添加元素到散列表中去。")]),s("li",[a._v("如果发生了碰撞(hashCode值相同)，进行三种判断。1）若key地址相同或者equals后内容相同，则替换旧值；2）如果是红黑树结构，就调用数的插入方法。3）链表结构，循环遍历直到链表中某个节点为空，尾插法进行插入，插入之后判断链表个数是否到达变成红黑树的阙值8，也可以遍历到有节点与插入元素的哈希值和内容相同，进行覆盖。")]),s("li",[a._v("如果桶满了大于阙值，则resize进行扩容。")])])},function(){var a=this,e=a.$createElement,s=a._self._c||e;return s("ol",[s("li",[a._v("初始化数组table。")]),s("li",[a._v("当数组table的size达到阙值时，即++size > load factor * capacity时，也是在putVal函数中。")])])},function(){var a=this,e=a.$createElement,s=a._self._c||e;return s("ol",[s("li",[a._v("为了数据均匀分布，减少哈希碰撞。因为确定数组位置时用的位运算，若数据不是2的次幂则会增加哈希碰撞的次数和浪费数组空间。")]),s("li",[a._v("输入数据若不是2的幂，HashMap通过一通 位移运算和或运算得到的肯定是2的幂次数，并且是离哪个数最近的数字。")])])},function(){var a=this,e=a.$createElement,s=a._self._c||e;return s("ul",[s("li",[a._v("HashMap运行key-value为null，HashTable不允许。")]),s("li",[a._v("HashMap没有考虑同步，是线程不安全的。HashTable是线程安全的，给api套上了一层synchronized修饰。")]),s("li",[a._v("HashMap继承于AbstractMap类，HashTable继承于Dictionary类。")]),s("li",[a._v("容量的初始值和增加方式不一样：HashMap默认的容量大小是16，增加容量时，每次将容量变为原始容量*2。HashTable默认的容量大小是11，增加容量时，每次将容量变为原始容量*2+1。")]),s("li",[a._v("添加key-value时的hash值算法不同：HashMap添加元素时，是使用自定义的哈希算法。HashTable没有自定义哈希算法，而直接采用的key的hashCode()。")]),s("li",[a._v("迭代器：HashMap的迭代器(Iterator)是fail-fast迭代器，而HashTable的enumerator迭代器不是fail-fast的。所以当有其它线程改变了HashMap的结构(增加或者移除元素)，将会抛出ConcurrentModificationException。")])])}],l=s("c276"),n={methods:{print:function(){l["a"].print()}}},_=n,p=s("5d22"),i=Object(p["a"])(_,t,h,!1,null,null,null);e["default"]=i.exports}}]);
//# sourceMappingURL=chunk-2d224869.9b8bf926.js.map