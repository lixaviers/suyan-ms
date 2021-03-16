(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d0b59ba"],{"1a2f":function(e,i,_){"use strict";_.r(i);var t=function(){var e=this,i=e.$createElement,_=e._self._c||i;return _("div",{staticClass:"suyan__home"},[_("h1",[e._v("Redis"),_("el-button",{staticClass:"suyan__btn__print",attrs:{type:"primary",plain:""},on:{click:e.print}},[e._v("打印pdf")])],1),_("el-divider"),_("h3",[e._v("一、Redis支持数据类型")]),_("p",[e._v("Redis支持五种数据类型：string(字符串)、hash(哈希)、list(列表)、set(集合)、zset(sorted set：有序集合)。")]),e._m(0),_("h3",[e._v("二、Redis是多线程还是单线程的")]),_("h4",[e._v("2.1 Redis6.0之前版本")]),_("p",[e._v("官方表示，因为redis是基于内存的操作，CPU不是瓶颈，瓶颈最有可能是机器内存的大小或者带宽。既然单线程实现容易，而且CPU不会成为瓶颈，那就顺理成章地采用单线程的方案。")]),_("h4",[e._v("2.2 Redis6.0版本")]),_("p",[e._v("6.0之前使用了单线程，可维护性高。多线程模型虽然在某些方面表现优异，但是它却引入了程序执行顺序的不确定性，带来了并发读写的一系列问题，增加了系统复杂度，同时可能存在线程切换，甚至加锁解锁、死锁造成的性能损耗。redis通过AE事件模型以及IO多路复用等技术，处理性能非常高，因此没有必要使用多线程。Redis的瓶颈不在CPU，而在内存和网络。内存不够的话，可以加内存或者做数据结构优化和其它优化等，但网络的性能优化才是大头，网络IO的读写在Redis整个执行期间占用了大部分的CPU时间，如果把网络处理这部分做成多线程处理方式，那对整个Redis的性能会有很大的提升。优化方向：")]),e._m(1),_("p",[e._v("总结起来，Redis支持多线程主要就是两个原因：")]),e._m(2),_("p",[e._v("redis并没有默认开启多多线程，在conf文件进行配置，io-threads-do-reads yes，io-threads 线程数，官方建议：4核的集群建议设置为2或3个线程，8核的建议设置为6个线程，线程数一定要小于机器核数，尽量不超过8个。开启多线程后，不会出现线程并发安全问题，redis的多线程部分只是用来处理网络数据的读写和协议解析，执行命令仍然是单线程顺序执行。")]),e._m(3),_("h3",[e._v("三、Redis操作怎么保证原子性")]),_("p",[e._v("对于Redis而已，命令的原子性指的是：一个操作的不可再分，操作要么执行，要么不执行。之所以是原子性，因为是单线程操作。Redis本身提供的所有API都是原子操作，redis中的事务其实是保证批量操作的原子性，多个命令在并发中不一定是原子性。")]),_("h3",[e._v("四、Redis事务")]),_("p",[e._v("Redis事务功能是通过MULTI、EXEC、DISCARD和WATCH四个原语实现的。Redis会将一个事务中的所有命令序列化，然后顺序执行。")]),e._m(4),e._m(5),_("h3",[e._v("五、什么是Redis持久化？Redis有几种持久化方式？优缺点是什么？")]),_("p",[e._v("持久化就是把内存的数据写到磁盘中去，防止服务器宕机内存数据丢失。Redis提供了两种持久化方式：RDB(默认)、AOF。")]),e._m(6),_("p",[e._v("比较：")]),e._m(7),_("h4",[e._v("5.1 解释下什么是RESP？有什么特点？")]),_("p",[e._v("RESP，REmote Dictionary Server(远程字段服务)，而Redis的协议规范是Redis Serialization Protocol(Redis序列化协议)，该协议是用于与Redis服务器通信的，用的较多的是Redis-cli通过pipe与Redis服务器联系。协议：客户端以规定格式的形式发送命令给服务器，服务器在执行最后一条命令后，返回结果。")]),_("p",[e._v("RESP是redis客户端和服务端之间使用的一种通讯协议。特点：实现简单、快速解析、可读性好。")]),_("h3",[e._v("六、Redis有哪些架构模式？讲讲各自的特点")]),_("h4",[e._v("6.1 单机版")]),_("p",[e._v("特点：简单。")]),_("p",[e._v("问题：1、内存容量有限。2、处理能力有限。3、无法高可用")]),_("h4",[e._v("6.2 主从复制")]),_("p",[e._v("Redis的复制(replication)功能允许用户根据一个Redis服务器来创建任意多个该服务器的复制品，其中被复制的服务器为主服务器(master)，而通过复制创建出来的服务器复制品则为从服务器(slave)。只要主从服务器之间的网络连接正常，主从数据库两者会具有相同的数据，主服务器就会一直将自己身上的数据更新同步给从服务器，从而一直保证主从服务器的数据相同。")]),_("p",[e._v("特点：")]),e._m(8),_("p",[e._v("问题：")]),e._m(9),_("h4",[e._v("6.3 哨兵")]),_("p",[e._v("Redis sentinel是一个分布式系统监控redis主从服务器，并在主服务器下线时自动进行故障转移。其中三个特效：")]),e._m(10),_("p",[e._v("特点：")]),e._m(11),_("p",[e._v("缺点：主从模式，切换需要时间丢数据，没有解决master写的压力。")]),_("h4",[e._v("6.4 集群(proxy型)")]),_("p",[e._v("Twemproxy是一个Twitter开源的一个redis和memcache快速/轻量级代理服务器，Twemproxy是一个快速的单线程代理程序，支持Memcached ASCII协议和redis协议。")]),_("p",[e._v("特点：")]),e._m(12),_("p",[e._v("缺点：增加了新的proxy，需要维护其高可用。failover逻辑需要自己实现，其本身不能支持故障的自动转移可扩展性差，进行扩缩容都需要手动干预。")]),_("h4",[e._v("6.5 集群(直连型)")]),_("p",[e._v("从redis3.0之后版本支持redis-cluster集群，redis-cluster采用无中心结构，每个节点保存数据和整个集群状态，每个节点都和其它所有节点连接。")]),_("p",[e._v("特点：")]),e._m(13),_("p",[e._v("缺点：")]),e._m(14),e._m(15),_("p",[e._v("添加节点：")]),_("p",[e._v("集群创建成功后可以向集群中添加节点，如添加7007节点，执行命令：./redis-trib.rb add-node 127.0.01:7007 ")]),_("p",[e._v("查看")]),_("h3",[e._v("七、Redis大key问题")]),_("h4",[e._v("7.1 什么是Redis大key")]),e._m(16),_("h4",[e._v("7.2 可能存在Redis大key的业务场景")]),e._m(17),_("h4",[e._v("7.3 Redis大key的危害")]),_("p",[e._v("OPS低也会导致内存占用多、流量大。比如一次取走100K的数据，当OPS为1000时，就会产生100M/s的流量。如果为list、hash等数据结构，大量的elements需要多次遍历，多次系统调用拷贝数据消耗时间。主动删除、被动过期删除、数据迁移等，由于处理这一个key时间长，导致服务器发送阻塞。")]),_("h4",[e._v("7.4 如何找出Redis大key")]),_("p",[e._v("redis可使用redis-cli的“--bigkeys”选项查找大key。")]),_("p",[e._v("jimdb管理端，拓扑Tab页，点击实例可以使用Redis大key扫描功能，该功能底层使用scan扫描所有key，会影响实例性能，选择在业务低峰进行。")]),_("h4",[e._v("7.5 如何解决Redis大key问题")]),_("p",[e._v("对于需要整取value的大key，可以尝试将对象分拆成几个key-value，使用multiGet获取值，这样分拆的意义在于分拆单次操作的压力，将操作压力平铺到多个实例中，降低对单个实例的IO影响。")]),_("p",[e._v("对于每次需要取部分value的大key，同样可以拆成几个key-value，也可以将这些存储在一个hash中，每个field代表具体属性，使用hget、hmget来获取部分value，使用hset、hmset来更新部分属性。")]),_("p",[e._v("对于value中存储过多元素的key，同样可以将这部分元素拆分。")]),_("p",[e._v("示例：可以固定一个桶数量，比如1W，每次存取的时候，先在本地计算field的hash值，对1W取模，确定field落在哪个key上。")]),e._m(18),e._m(19),_("h3",[e._v("八、布隆过滤器处理缓存穿透问题")]),_("h4",[e._v("8.1 原理")]),_("p",[e._v("布隆过滤器的巨大用处就是：能够迅速判断一个元素是否在一个集合中。因此它有三个使用场景：")]),e._m(20),_("p",[e._v("其内部维护一个全为0的bit数组，需要说明的是，布隆过滤器有一个误判率的概念，误判率越低，则数组越长，所占空间越大。误判率越高，则数组越小，所占的空间越小。")]),_("p",[e._v("假设根据误判率，我们生成一个10位的bit数组，以及2个hash函数(f_1, f_2)，假设输入集合为(N_1, N_2)，经计算(f_1(N_1))得到的数值得为2，(f_2(N_1))得到的数值为5，则将数组下标为2和下标为5 的位置置为1。同理，经过计算(f_1(N_2))得到的数值为3，(f_2(N_2))得到的数值为6，则将数组下标为3和下标为6的位置置为2。这个时候，我们有第三个数(N_3)，我们判断N_3在不在集合(N_1, N_2)中，就进行(f_1(N_3), f_2(N_3))的计算。")]),e._m(21),_("h4",[e._v("8.2 优点")]),e._m(22),_("h4",[e._v("8.3 缺点")]),e._m(23),_("h3",[e._v("九、缓存雪崩")]),_("p"),_("p")],1)},s=[function(){var e=this,i=e.$createElement,_=e._self._c||i;return _("ul",[_("li",[e._v("string：是redis最基本的类型，一个key对应一个value。最大能存储512MB。")]),_("li",[e._v("hash：是一个键值对集合，是一个string类型的field和value的映射表，hash特别适合用于存储对象。每个hash可以存储2"),_("sup",[e._v("32")]),e._v("-1 键值对(40多亿)。")]),_("li",[e._v("list：是简单的字符串列表，按照插入顺序排序。可以添加一个元素到列表的头部(左边)或者尾部(右边)。列表最多可存储2"),_("sup",[e._v("32")]),e._v("-1元素(4294967295)。")]),_("li",[e._v("set：redis的set是string类型的无序集合。集合通过哈希表实现的，所以添加、删除、查找的复杂度都是O(1)。集合中最大的成员数为2"),_("sup",[e._v("32")]),e._v("-1。")]),_("li",[e._v("zset：zset和set一样也是string类型元素的集合，且不允许重复的成员。不同的是每个元素都会关联一个double类型的分数，redis正是通过分数来为集合中的成员进行从小到大的排序。zset的成员是唯一的，但分数(score)却可以重复。")])])},function(){var e=this,i=e.$createElement,_=e._self._c||i;return _("ul",[_("li",[e._v("提高网络IO性能，典型的实现比如使用DPDK来替代内核网络栈的方式。")]),_("li",[e._v("使用多线程充分利用多核。")])])},function(){var e=this,i=e.$createElement,_=e._self._c||i;return _("ol",[_("li",[e._v("可以充分利用服务器CPU资源，目前主线程只能利用一个核。")]),_("li",[e._v("多线程任务可以分摊Redis同步IO读写负荷。")])])},function(){var e=this,i=e.$createElement,_=e._self._c||i;return _("p",[_("a",{attrs:{href:"https://www.cnblogs.com/gz666666/p/12901507.html",target:"_blank",rel:"noopener"}},[e._v("参考文章")])])},function(){var e=this,i=e.$createElement,_=e._self._c||i;return _("ul",[_("li",[e._v("Redis不支持回滚，Redis在事务失败时不进行回滚，而是继续执行余下的命令。")]),_("li",[e._v("如果在一个事务中的命令出现错误，那么所有的命令都不会执行。")]),_("li",[e._v("如果在一个事物中出现运行错误，那么正确的命令会被执行。")])])},function(){var e=this,i=e.$createElement,_=e._self._c||i;return _("ol",[_("li",[e._v("MULTI命令用于开启一个事物，它总是返回OK。MULTI执行之后，客户端可以继续向服务器发送任意多条命令。这些命令不会立即执行，而是被放到一个队列中。当EXEC命令被调用时，所有队列中的命令才会被执行。")]),_("li",[e._v("EXEC：执行所有事务块内的命令。返回事务块内所有命令的返回值，按命令执行的先后顺序排列。当操作被打断时，返回空值nil。")]),_("li",[e._v("通过调用DISCARD，客户端可以清空事务队列，并放弃执行事务，并且客户端会从事务状态中退出。")]),_("li",[e._v("WATCH命令可以为Redis事务提供check-and-set(CAS)行为。可以监控一个或多个键，一旦其中有一个键被修改(或删除)，之后的事务就不会执行，监控一直持续到EXEC命令。")])])},function(){var e=this,i=e.$createElement,_=e._self._c||i;return _("ul",[_("li",[e._v("RDB：是Redis DataBase的缩写，功能核心函数rdbSave(生成RDB文件)和rdbLoad(从文件加载内存)两个函数。")]),_("li",[e._v("AOF：是Append-only file的缩写，每当执行服务器(定时)任务或者函数时，flushAppendOnlyFile函数都会被调用，这个函数执行两个工作，aof写入保存：WRITE：根据条件，将aof_buf中的缓存写入到AOF文件。SAVE：根据条件，调用fsync或fdatasync函数，将AOF文件保存到磁盘中。存储结构是redis通讯协议(RESP)格式的命令文件存储。")])])},function(){var e=this,i=e.$createElement,_=e._self._c||i;return _("ol",[_("li",[e._v("aof文件比rdb更新频率高，优先使用aof还原数据。")]),_("li",[e._v("aof比rdb更安全也更大。")]),_("li",[e._v("rdb性能比aof好。")]),_("li",[e._v("如果两个都配置了优先加载AOF。")])])},function(){var e=this,i=e.$createElement,_=e._self._c||i;return _("ol",[_("li",[e._v("master/slave 角色。")]),_("li",[e._v("master/slave 数据相同。")]),_("li",[e._v("降低master读压力，转交从库。")])])},function(){var e=this,i=e.$createElement,_=e._self._c||i;return _("ol",[_("li",[e._v("无法保证高可用。")]),_("li",[e._v("没有解决master写的压力。")])])},function(){var e=this,i=e.$createElement,_=e._self._c||i;return _("ul",[_("li",[e._v("监控(Monitoring)：sentinel会不断地检查你的主服务器和从服务器是否运作正常。")]),_("li",[e._v("提醒(Notification)：当被监控的某个Redis服务器出现问题时，sentinel可以通过API向管理员或者其他应用程序发送通知。")]),_("li",[e._v("自动故障迁移(Automatic failover)：当一个主服务器不能正常工作时，sentinel会开始一次自动故障迁移操作。")])])},function(){var e=this,i=e.$createElement,_=e._self._c||i;return _("ol",[_("li",[e._v("保证高可用。")]),_("li",[e._v("监控各个节点。")]),_("li",[e._v("自动故障迁移。")])])},function(){var e=this,i=e.$createElement,_=e._self._c||i;return _("ol",[_("li",[e._v("多种hash算法：MD5、CRC16、CRC32、CRC32a、hsieh、murmur、Jenkins。")]),_("li",[e._v("支持失败节点自动删除。")]),_("li",[e._v("后端Sharding分配逻辑对业务透明，业务方的读写方式和操作单个Redis一致。")])])},function(){var e=this,i=e.$createElement,_=e._self._c||i;return _("ol",[_("li",[e._v("无中心架构(不存在哪个节点影响性能瓶颈)，少了proxy层。")]),_("li",[e._v("数据按照slot存储分布在多个节点，节点间数据共享，可动态调整数据分布。")]),_("li",[e._v("可扩展性，可线性扩展到1000个节点，节点可动态添加或删除。")]),_("li",[e._v("高可用性，部分节点不可用时，集群仍可用。通过增加Slave做备份数据副本。")]),_("li",[e._v("实现故障自动failover，节点之间通过gossip协议交换状态信息，用投票机制完成Slave到Master的角色提示。")])])},function(){var e=this,i=e.$createElement,_=e._self._c||i;return _("ol",[_("li",[e._v("资源隔离性较差，容易出现相互影响的情况。")]),_("li",[e._v("数据通过异步复制，不保证数据的强一致性。")])])},function(){var e=this,i=e.$createElement,_=e._self._c||i;return _("p",[_("a",{attrs:{href:"https://www.cnblogs.com/lpfuture/p/5796398.html",target:"_blank",rel:"noopener"}},[e._v("一致性哈希算法")])])},function(){var e=this,i=e.$createElement,_=e._self._c||i;return _("ol",[_("li",[e._v("单个key存储的value很大。")]),_("li",[e._v("hash、set、zset、list结构中存储过多的元素。")])])},function(){var e=this,i=e.$createElement,_=e._self._c||i;return _("ol",[_("li",[e._v("配送范围特别大的门店。")]),_("li",[e._v("促销活动特别多的门店、商家等。")]),_("li",[e._v("高频用户下的订单列表。")])])},function(){var e=this,i=e.$createElement,_=e._self._c||i;return _("pre",{staticClass:"language-java"},[_("code",[e._v("newHashKey = hashKey + (hash(field) % 10000);\nhset(newHashKey, field, value);\nhget(newHashKey, field);")])])},function(){var e=this,i=e.$createElement,_=e._self._c||i;return _("p",[_("a",{attrs:{href:"https://www.cnblogs.com/xgqfrms/p/13601959.html",target:"_blank",rel:"noopener"}},[e._v("参考文章")])])},function(){var e=this,i=e.$createElement,_=e._self._c||i;return _("ol",[_("li",[e._v("网页爬虫对URL的去重，避免爬取相同的URL地址。")]),_("li",[e._v("反垃圾邮件，从数十亿垃圾邮件列表中判断某邮箱是否垃圾邮箱。")]),_("li",[e._v("缓存穿透，将所有可能存在的时间缓存到布隆过滤器中，当访问不存在的缓存时讯飞返回，避免缓存及DB挂掉。")])])},function(){var e=this,i=e.$createElement,_=e._self._c||i;return _("ol",[_("li",[e._v("若值恰巧都位于上面的位置中，则认为N_3在集合(N_1, N_2)中。")]),_("li",[e._v("若值有一个不在上面的位置中，则任务N_3不在集合(N_1, N_2)中。")])])},function(){var e=this,i=e.$createElement,_=e._self._c||i;return _("ol",[_("li",[e._v("思路简单。")]),_("li",[e._v("保证一致性。")]),_("li",[e._v("性能强。")])])},function(){var e=this,i=e.$createElement,_=e._self._c||i;return _("ol",[_("li",[e._v("代码复杂度增加。")]),_("li",[e._v("需要另外维护一个集合来存放缓存的key。")]),_("li",[e._v("布隆过滤器不支持删值操作。")])])}],l=_("c276"),r={methods:{print:function(){l["a"].print()}}},v=r,n=_("5d22"),a=Object(n["a"])(v,t,s,!1,null,null,null);i["default"]=a.exports}}]);
//# sourceMappingURL=chunk-2d0b59ba.79c0ff26.js.map