<template>
    <div class="suyan__home">
        <h1>集合框架<el-button class="suyan__btn__print" type="primary" plain @click="print">打印pdf</el-button><el-button class="suyan__btn__close" plain @click="closeAside"style="margin-right: 20px;">关闭导航</el-button></h1><el-divider></el-divider>
        <h3>一、ArrayList</h3>
<p>ArrayList相当于一个对象数组，相对于数组来说，数组效率更高，因为数组是连续的存储数据，索引速度非常的快，数组的大小需要提前固定。ArrayList存储的是Object，相当于一个动态的Object []，在插入两种类型的数据时是不会报错的。但是在使用中，很可能会报类型不匹配的错误，所以ArrayList不是类型安全的，ArrayList因为存储的是Object，所以就涉及了装箱和拆箱的问题，在效率上相对数组来说变低了。jdk1.5之后加入了泛型的概念，让ArrayList在使用的时候更加安全了，同时ArrayList大小可以动态的增加，比数组使用起来更加灵活。</p>
<h4>1.1 ArrayList的动态扩容时如何自动增加的</h4>
<p>当在ArrayList中增加一个对象时Java会去检查ArrayList以确保已存在的数组中有足够的容量来存储这个新对象(默认为10，最大容量为int上限，减8是为了容错)，如果没有足够容量就新建一个长度更长的数组(原理的1.5倍)，旧的数组就会使用Arrays.copyOf方法被复制到新的数组中去，现有的数组引用指向了新的数组。</p>
<h4>1.2 为什么ArrayList的增加或删除操作相对来说效率比较低</h4>
<p>ArrayList在小于扩容容量的情况下其实增加效率是非常高的，在涉及扩容的情况下添加操作效率确实低，删除操作需要移位拷贝，效率是低点。因为ArrayList中增加(扩容)或者是删除元素要调用System.arrayCopy这种效率很低的方法进行处理，所以如果遇到了数据量略大且需要频繁插入或删除的操作效率就比较低了，遇到这种类型场景应该尽可能使用LinkedList进行替代，效率会高一些。</p>
<h3>二、LinkedList</h3>
<p>链接列表，相当于一个带链表的List，同时LinkedList不具有线程安全，想要让LinkedList具有线程安全，可用Collections.synchronizedList(new LinkedList())。它和ArrayList在本质上，ArrayList是基于数组的数据结构，而LinkedList是基于链表的数据结构。在源码中，LinkedList定义了一个双向的引用。每一个Node，都有一个前驱和后驱。包装了在开头和结尾进行get、remove、insert方法。</p>
<h4>2.1 LinkedList工作原理和实现</h4>
<p>LinkedList是以双向链表实现，链表无容量限制(但是双向链表本身需要消耗额外的链表指针空间来操作)，其内部主要为first和last两个Node节点，在每次修改列表时用来指引当前双向链表的首位部位，所以LinkedList不仅仅实现了List接口，还实现了Deque双端队列接口(该接口是Queue队列的子接口)，故LinkedList自动具备双端队列的特性，当我们使用下标方式调用列表的get(index)、set(index, e)方法时需要遍历链表将指针移到到位进行访问(会判断index是否大于链表长度的一半，决定是首部遍历还是尾部遍历，访问的复杂度为O(N/2))，无法像ArrayList那样进行随机访问。(如果i&gt;数组大小的一半，会从末尾移起)，只有在链表两头的操作(add()、addFirst()、removeLast()或用在iterator()上的remove()操作)才不需要进行遍历寻找定位。</p>
<h4>2.2 ArrayList和LinkedList比较</h4>
<ol>
<li>是否包装线程安全：ArrayList和LinkedList都是不同步的，也就是不保证线程安全。</li>
<li>底层数据结构：ArrayList底层使用的是Object数组，LinkedList底层使用的是双向链表数据结构(1.6之前为循环链表，1。7取消了循环)。</li>
<li>插入和删除：ArrayList采用数组存储，插入和删除元素的时间复杂度受元素影响。比如：执行add(E e)方法的时候，ArrayList会默认将指定的元素追加到此列表的末尾，这种情况时间复杂度就是O(1)。但是如果要在指定位置i点插入和删除元素的话(add(int index, E element))，时间复杂度就为O(n-1)。因为在进行上述操作的时候集合中第i和第i个元素之后的n-1个元素都要执行向后/向前移一位的操作。LinkedList采用链表存储，所以插入、删除元素复杂度不收元素位置影响，都是近似O(1)，而数组近似为O(n)。</li>
<li>是否支持快速随机访问：LinkedList不支持高效的随机访问，而ArrayList支持。快速随机访问就是通过元素的序号快速获取元素对象。</li>
<li>内存空间占用：ArrayList的空间浪费主要体现在list列表的结尾会预留一定的容量空间，而LinkedList的空间花费则体现在它的每一个元素都需要消耗比ArrayList更多的空间，因为要存放直接后继和直接前驱以及数据。<a href="https://www.cnblogs.com/ysyy/p/10891079.html" target="_blank" rel="noopener">参考文章</a></li>
</ol>
<h3>三、HashMap <a href="https://www.cnblogs.com/zengcongcong/p/11295349.html" target="_blank" rel="noopener">参考文章</a></h3>
<h4>3.1 HashMap的特性</h4>
<ul>
<li>HashMap存储键值对实现快速存取，允许为null。key值不可以重复，如果key值重复则覆盖。</li>
<li>非同步，线程不安全。</li>
<li>底层是hash表，不保证有序(比如插入的顺序)。</li>
</ul>
<h4>3.2 HashMap的底层原理</h4>
<p>基于hashing原理，jdk8后采用数组+链表+红黑树的结构数据，通过put和get存储和获取对象。当给put()方法传递键和值时，先对键做一个hashCode()的计算来得到它在bucket数组中的位置来存储Entry对象。当获取对象时，通过get获取到bucket的位置，再通过键对象的equals()方法找到正确的键值对，然后返回对象。</p>
<h4>3.3 传统hashMap的缺点(为什么引入红黑树)</h4>
<p>JDK1.8以前HashMap的实现是数组+链表，即使哈希函数取得再好，也很难达到元素百分百均匀分布。当HashMap中有大量的元素都存放到同一个桶中时，这个桶下有一条长长的链表，这个时候HashMap就相当于一个单链表。假如单链表有n个元素，遍历的时间复杂度就是O(n)，完全失去了它的优势。针对这种情况，JDK1.8引入了红黑树(查找时间复杂度为O(log^n))来优化这个问题。</p>
<p>O(n): 表示该算法是线性算法，时间复杂度为O(n)，就代表数据量增大几倍，耗时也增大几倍。要找到一个数组里面最大的一个数，你要把n个变量都扫描一遍，操作次数为n，那么算法复杂度是O(n)。</p>
<p>O(log^n)解析：当数据增大n倍时，耗时增大log n倍(这里的log是以2为底的，比如，当数据增大256倍时，耗时只增大8倍，是比线性还要低的时间复杂度)。二分查找就是O(log n)的算法，每找一次排除一半的可能，256个数据中查找只要找8次就可以找到目标。比如我要找到23号的房间钥匙，我从中间切开，找到50编号的位置，然后23在1~50里面，我再把从中间切开变成25，然后23在1~25之间，我再切开变成12.5，然后23在12.5~25之间，依次找下去，直到找到钥匙。这种查找钥匙的方法的复杂度就是O(log^n)。<a href="https://blog.csdn.net/lkp1603645756/article/details/85013126" target="_blank" rel="noopener">参考文章</a></p>
<p><a href="https://lixaviers.github.io/suyan-ms/#/structure" target="_blank" rel="noopener">红黑树相关请移步</a></p>
<h4>3.4 HashMap中get是如何实现的</h4>
<p>对key的hashCode进行hashing，与高16位做异或运算计算下标获取bucket位置。如果在桶的首位上就可以找到就直接返回，否则在树中或者链表中遍历找。如果有hash冲突，则利用equals()方法去遍历链表查找节点。</p>
<p>其它实现hash函数的方式：平方取中法、除留余数法、伪随机数法。</p>
<p>为什么不直接将key作为哈希值而是与高16位做异或运算？</p>
<p>因为数组位置的确定用的是与运算，仅仅最后四位有效，设计者将key的哈希值与高16位做异或运算使得在做&amp;运算确定数组的插入位置时，此时的低位实际是高位与低位的结合，增加了随机性，减少了哈希碰撞的次数。</p>
<h4>3.5 当两个对象的hashCode相等时会怎么样，如何取值</h4>
<p>会产生哈希碰撞，若key值相同则替换旧值，不然链接到链表后面，链表长度超过阙值8就转为红黑树存储。</p>
<p>hashCode相同，通过equals比较内容获取值对象。</p>
<h4>3.6 HashMap中put是如何实现的</h4>
<ol>
<li>计算关于key的hashCode值(与Key.hashCode的高16位做异或运算)。</li>
<li>如果散列表为空时，调用resize()初始化散列表。</li>
<li>如果没有发生碰撞，直接添加元素到散列表中去。</li>
<li>如果发生了碰撞(hashCode值相同)，进行三种判断。1）若key地址相同或者equals后内容相同，则替换旧值；2）如果是红黑树结构，就调用树的插入方法。3）链表结构，循环遍历直到链表中某个节点为空，尾插法进行插入，插入之后判断链表个数是否到达变成红黑树的阙值8，也可以遍历到有节点与插入元素的哈希值和内容相同，进行覆盖。</li>
<li>如果桶满了大于阙值，则resize进行扩容。</li>
</ol>
<h4>3.7 HashMap中什么时候需要进行扩容，扩容resize()又是如何实现的</h4>
<p>扩容场景：</p>
<ol>
<li>初始化数组table。</li>
<li>当数组table的size达到阙值时，即++size &gt; load factor * capacity时，也是在putVal函数中。</li>
</ol>
<p>实现过程：通过判断旧数组的容量是否大于0来判断数组是否初始化过。未初始化：进行初始化(判断是否调用无参构造器 是：使用默认的大小和阙值，否：使用构造函数中初始化的容量，当然这个容量是经过tableSizefor计算后的2的次幂数)，初始化过：进行扩容，扩容成两倍(小于最大值的情况下)，之后在进行将元素重新进行与运算复制到新的散列表中。概况的讲：扩容需要重新分配一个新数组，新数组是老数组的2倍长，然后遍历整个老结构，把所有的元素挨个重新hash分配到新机构中去。</p>
<h4>3.8 HashMap的默认初始化长度为什么是16？为什么必须是2的幂？如果输入值不是2的幂比如10会怎么样？</h4>
<ol>
<li>为了数据均匀分布，减少哈希碰撞。因为确定数组位置时用的位运算，若数据不是2的次幂则会增加哈希碰撞的次数和浪费数组空间。</li>
<li>输入数据若不是2的幂，HashMap通过一通 位移运算和或运算得到的肯定是2的幂次数，并且是离那个数最近的数字。</li>
</ol>
<h4>3.9 HashMap的参数loadFactor的作用是什么？</h4>
<p>loadFactor表示HashMap的拥挤程度，影响hash操作到同一个数组位置的概率。默认loadFactor等于0.75，当HashMap里面容纳的元素已经达到HashMap数组长度的75%时，表示HashMap太挤了，需要扩容。在HashMap的构造器中可以定制loadFactor。</p>
<h4>3.10 HashMap和HashTable的区别</h4>
<p>相同点：都是存储key-value键值对的。</p>
<p>不同点：</p>
<ul>
<li>HashMap允许key-value为null，HashTable不允许。</li>
<li>HashMap没有考虑同步，是线程不安全的。HashTable是线程安全的，给api套上了一层synchronized修饰。</li>
<li>HashMap继承于AbstractMap类，HashTable继承于Dictionary类。</li>
<li>容量的初始值和增加方式不一样：HashMap默认的容量大小是16，增加容量时，每次将容量变为原始容量*2。HashTable默认的容量大小是11，增加容量时，每次将容量变为原始容量*2+1。</li>
<li>添加key-value时的hash值算法不同：HashMap添加元素时，是使用自定义的哈希算法。HashTable没有自定义哈希算法，而直接采用的key的hashCode()。</li>
<li>迭代器：HashMap的迭代器(Iterator)是fail-fast迭代器，而HashTable的enumerator迭代器不是fail-fast的。所以当有其它线程改变了HashMap的结构(增加或者移除元素)，将会抛出ConcurrentModificationException。</li>
</ul>
<h4>3.11 HashMap和LinkedHashMap的区别</h4>
<p>HashMap可以允许一条为null的键值对，允许多条值为null的键值对，并发不安全，想要并发安全操作可以使用Collections.synchronizedMap()或ConcurrentHashMap来代替。LinkedHashMap是HashMap的一个子类，其特殊实现的仅仅是保存记录的插入顺序，所以在Iterator迭代器遍历LinkedHashMap时先得到的键值对是先插入的(也可以在构造时用参数构造方法来改变顺序来进行排序)，由于其存储沿用了HashMap结构外还多了一个双向顺序链表，所以在一般场景下遍历时会比HashMap慢，此外具备HashMap的所有特性和缺点。</p>
<h3>四、HashTable</h3>
<p>待完善</p>
<h3>五、ConcurrentHashMap</h3>
<h4>5.1 为何会出现ConcurrentHashMap</h4>
<ol>
<li>HashTable在高并发场景下性能低下。</li>
<li>HashMap不是线程安全的容器。</li>
<li>同步包装器虽然使用同步方法提示了部分性能，但还是不适合高并发场景下的性能需求。</li>
</ol>
<h4>5.2 ConcurrentHashMap如何保证线程安全</h4>
<ul>
<li>JDK7：使用的是分离锁(segment)，实际上是一种再入锁(RetrantLock)来保证线程安全。segment的数量是concurrentLevel决定，默认值是16。扩容的时候是针对单个segment扩容的，写操作也是，修改数据的时候锁定的部分，所以比较高效。</li>
<li>JDK8：segment依然存在，不过不起结构上的作用，只起到保证序列化的兼容性。内部使用volatile来保证数据存储的可见性。利用CAS操作，在特定场景下进行无锁并发操作，内部的锁实现用的是synchronized。在JDK8中，synchronized已经得到性能的优化，并且对比再入锁可以减少内存消耗。在put的过程中如果没有发生冲突，则采用CAS操作进行无锁化更新，只有发生了哈希冲突的时候才锁住，且仅影响发生冲突的那一个链表的更新操作。</li>
</ul>
<h3>六、Vector和Stack</h3>
<h4>6.1 Vector和Stack各有什么特点</h4>
<p>Vector是线程安全的动态数组，同ArrayList一样继承自AbstractList且实现了List、RandomAccess、Cloneable、Serializable接口，内部实现依然基于数组，Vector与ArrayList基本是一致的，唯一不同的是Vector是线程安全的，会在可能出现线程安全的方法前面加上synchronized关键字，其余ArrayList类似，随机访问速度快，插入和移除性能较差(数组原因)，支持null元素，有顺序，元素可以重复，线程安全。Stack是继承自Vector基于动态数组实现的线程安全栈，不过现在已经不推荐使用了，Stack是并发安全的后进先出，实现了一些栈基本操作的方法(其实并不是只能后进先出，因为继承自Vector，所以可以有很多操作，严格说不是一个栈)。其共同特点都是用了方法锁(即synchronized)来保证并发安全的。</p>
<h4>6.2 为什么现在都不提倡使用Vector</h4>
<p>Vector实现并发安全的原理是在每个操作方法上加锁，这些锁并不是必须要的，在实际开发中一般都是通过锁一系列的操作来实现线程安全，也就是说将需要同步的资源放一起加锁来保证线程安全，如果多个Thread并发执行一个已经加锁的方法，但是在该方法中又有Vector的存在，Vector本身实现中已经加锁了，双重锁会造成额外的开销，即Vector同ArrayList一样有fail-fast问题(即无法保证遍历安全)，所以在遍历Vector操作时又得额外加锁保证安全，还不如直接用ArrayList加锁性能好，所以在JDK1.5之后推荐使用java.util.concurrent包下的并发类。此外Vector是一个从JDK1.0就有的古老集合，那时候Java还没提供系统的集合框架，所以在Vector里提供了一些方法名很长的方法(如addElement(Object obj)，实际上这个方法和add(Object obj)没什么区别)，从JDK1.2之后Java提供了集合框架，将Vector改为实现List接口，从而导致Vector里有一些重复的方法。</p>
<p>&nbsp;</p>
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