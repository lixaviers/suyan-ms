<template>
    <div class="suyan__home">
        <h1>Redis<el-button class="suyan__btn__print" type="primary" plain @click="print">打印pdf</el-button></h1><el-divider></el-divider>
        <h3>一、Redis支持数据类型</h3>
<p>Redis支持五种数据类型：string(字符串)、hash(哈希)、list(列表)、set(集合)、zset(sorted set：有序集合)。</p>
<ul>
<li>string：是redis最基本的类型，一个key对应一个value。最大能存储512MB。</li>
<li>hash：是一个键值对集合，是一个string类型的field和value的映射表，hash特别适合用于存储对象。每个hash可以存储2<sup>32</sup>-1 键值对(40多亿)。</li>
<li>list：是简单的字符串列表，按照插入顺序排序。可以添加一个元素到列表的头部(左边)或者尾部(右边)。列表最多可存储2<sup>32</sup>-1元素(4294967295)。</li>
<li>set：redis的set是string类型的无序集合。集合通过哈希表实现的，所以添加、删除、查找的复杂度都是O(1)。集合中最大的成员数为2<sup>32</sup>-1。</li>
<li>zset：zset和set一样也是string类型元素的集合，且不允许重复的成员。不同的是每个元素都会关联一个double类型的分数，redis正是通过分数来为集合中的成员进行从小到大的排序。zset的成员是唯一的，但分数(score)却可以重复。</li>
</ul>
<h3>二、Redis是多线程还是单线程的</h3>
<h4>2.1 Redis6.0之前版本</h4>
<p>官方表示，因为redis是基于内存的操作，CPU不是瓶颈，瓶颈最有可能是机器内存的大小或者带宽。既然单线程实现容易，而且CPU不会成为瓶颈，那就顺理成章地采用单线程的方案。</p>
<h4>2.2 Redis6.0版本</h4>
<p>6.0之前使用了单线程，可维护性高。多线程模型虽然在某些方面表现优异，但是它却引入了程序执行顺序的不确定性，带来了并发读写的一系列问题，增加了系统复杂度，同时可能存在线程切换，甚至加锁解锁、死锁造成的性能损耗。redis通过AE事件模型以及IO多路复用等技术，处理性能非常高，因此没有必要使用多线程。Redis的瓶颈不在CPU，而在内存和网络。内存不够的话，可以加内存或者做数据结构优化和其它优化等，但网络的性能优化才是大头，网络IO的读写在Redis整个执行期间占用了大部分的CPU时间，如果把网络处理这部分做成多线程处理方式，那对整个Redis的性能会有很大的提升。优化方向：</p>
<ul>
<li>提高网络IO性能，典型的实现比如使用DPDK来替代内核网络栈的方式。</li>
<li>使用多线程充分利用多核。</li>
</ul>
<p>总结起来，Redis支持多线程主要就是两个原因：</p>
<ol>
<li>可以充分利用服务器CPU资源，目前主线程只能利用一个核。</li>
<li>多线程任务可以分摊Redis同步IO读写负荷。</li>
</ol>
<p>redis并没有默认开启多多线程，在conf文件进行配置，io-threads-do-reads yes，io-threads 线程数，官方建议：4核的集群建议设置为2或3个线程，8核的建议设置为6个线程，线程数一定要小于机器核数，尽量不超过8个。开启多线程后，不会出现线程并发安全问题，redis的多线程部分只是用来处理网络数据的读写和协议解析，执行命令仍然是单线程顺序执行。</p>
<p><a href="https://www.cnblogs.com/gz666666/p/12901507.html" target="_blank" rel="noopener">参考文章</a></p>
<h3>三、Redis操作怎么保证原子性</h3>
<p>对于Redis而已，命令的原子性指的是：一个操作的不可再分，操作要么执行，要么不执行。之所以是原子性，因为是单线程操作。Redis本身提供的所有API都是原子操作，redis中的事务其实是保证批量操作的原子性，多个命令在并发中不一定是原子性。</p>
<h3>四、Redis事务</h3>
<p>Redis事务功能是通过MULTI、EXEC、DISCARD和WATCH四个原语实现的。Redis会将一个事务中的所有命令序列化，然后顺序执行。</p>
<ul>
<li>Redis不支持回滚，Redis在事务失败时不进行回滚，而是继续执行余下的命令。</li>
<li>如果在一个事务中的命令出现错误，那么所有的命令都不会执行。</li>
<li>如果在一个事物中出现运行错误，那么正确的命令会被执行。</li>
</ul>
<ol>
<li>MULTI命令用于开启一个事物，它总是返回OK。MULTI执行之后，客户端可以继续向服务器发送任意多条命令。这些命令不会立即执行，而是被放到一个队列中。当EXEC命令被调用时，所有队列中的命令才会被执行。</li>
<li>EXEC：执行所有事务块内的命令。返回事务块内所有命令的返回值，按命令执行的先后顺序排列。当操作被打断时，返回空值nil。</li>
<li>通过调用DISCARD，客户端可以清空事务队列，并放弃执行事务，并且客户端会从事务状态中退出。</li>
<li>WATCH命令可以为Redis事务提供check-and-set(CAS)行为。可以监控一个或多个键，一旦其中有一个键被修改(或删除)，之后的事务就不会执行，监控一直持续到EXEC命令。</li>
</ol>
<h3>五、什么是Redis持久化？Redis有几种持久化方式？优缺点是什么？</h3>
<p>持久化就是把内存的数据写到磁盘中去，防止服务器宕机内存数据丢失。Redis提供了两种持久化方式：RDB(默认)、AOF。</p>
<ul>
<li>RDB：是Redis DataBase的缩写，功能核心函数rdbSave(生成RDB文件)和rdbLoad(从文件加载内存)两个函数。</li>
<li>AOF：是Append-only file的缩写，每当执行服务器(定时)任务或者函数时，flushAppendOnlyFile函数都会被调用，这个函数执行两个工作，aof写入保存：WRITE：根据条件，将aof_buf中的缓存写入到AOF文件。SAVE：根据条件，调用fsync或fdatasync函数，将AOF文件保存到磁盘中。存储结构是redis通讯协议(RESP)格式的命令文件存储。</li>
</ul>
<p>比较：</p>
<ol>
<li>aof文件比rdb更新频率高，优先使用aof还原数据。</li>
<li>aof比rdb更安全也更大。</li>
<li>rdb性能比aof好。</li>
<li>如果两个都配置了优先加载AOF。</li>
</ol>
<h4>5.1 解释下什么是RESP？有什么特点？</h4>
<p>RESP，REmote Dictionary Server(远程字段服务)，而Redis的协议规范是Redis Serialization Protocol(Redis序列化协议)，该协议是用于与Redis服务器通信的，用的较多的是Redis-cli通过pipe与Redis服务器联系。协议：客户端以规定格式的形式发送命令给服务器，服务器在执行最后一条命令后，返回结果。</p>
<p>RESP是redis客户端和服务端之间使用的一种通讯协议。特点：实现简单、快速解析、可读性好。</p>
<h3>六、Redis有哪些架构模式？讲讲各自的特点</h3>
<h4>6.1 单机版</h4>
<p>特点：简单。</p>
<p>问题：1、内存容量有限。2、处理能力有限。3、无法高可用</p>
<h4>6.2 主从复制</h4>
<p>Redis的复制(replication)功能允许用户根据一个Redis服务器来创建任意多个该服务器的复制品，其中被复制的服务器为主服务器(master)，而通过复制创建出来的服务器复制品则为从服务器(slave)。只要主从服务器之间的网络连接正常，主从数据库两者会具有相同的数据，主服务器就会一直将自己身上的数据更新同步给从服务器，从而一直保证主从服务器的数据相同。</p>
<p>特点：</p>
<ol>
<li>master/slave 角色。</li>
<li>master/slave 数据相同。</li>
<li>降低master读压力，转交从库。</li>
</ol>
<p>问题：</p>
<ol>
<li>无法保证高可用。</li>
<li>没有解决master写的压力。</li>
</ol>
<h4>6.3 哨兵</h4>
<p>Redis sentinel是一个分布式系统监控redis主从服务器，并在主服务器下线时自动进行故障转移。其中三个特效：</p>
<ul>
<li>监控(Monitoring)：sentinel会不断地检查你的主服务器和从服务器是否运作正常。</li>
<li>提醒(Notification)：当被监控的某个Redis服务器出现问题时，sentinel可以通过API向管理员或者其他应用程序发送通知。</li>
<li>自动故障迁移(Automatic failover)：当一个主服务器不能正常工作时，sentinel会开始一次自动故障迁移操作。</li>
</ul>
<p>特点：</p>
<ol>
<li>保证高可用。</li>
<li>监控各个节点。</li>
<li>自动故障迁移。</li>
</ol>
<p>缺点：主从模式，切换需要时间丢数据，没有解决master写的压力。</p>
<h4>6.4 集群(proxy型)</h4>
<p>Twemproxy是一个Twitter开源的一个redis和memcache快速/轻量级代理服务器，Twemproxy是一个快速的单线程代理程序，支持Memcached ASCII协议和redis协议。</p>
<p>特点：</p>
<ol>
<li>多种hash算法：MD5、CRC16、CRC32、CRC32a、hsieh、murmur、Jenkins。</li>
<li>支持失败节点自动删除。</li>
<li>后端Sharding分配逻辑对业务透明，业务方的读写方式和操作单个Redis一致。</li>
</ol>
<p>缺点：增加了新的proxy，需要维护其高可用。failover逻辑需要自己实现，其本身不能支持故障的自动转移可扩展性差，进行扩缩容都需要手动干预。</p>
<h4>6.5 集群(直连型)</h4>
<p>从redis3.0之后版本支持redis-cluster集群，redis-cluster采用无中心结构，每个节点保存数据和整个集群状态，每个节点都和其它所有节点连接。</p>
<p>特点：</p>
<ol>
<li>无中心架构(不存在哪个节点影响性能瓶颈)，少了proxy层。</li>
<li>数据按照slot存储分布在多个节点，节点间数据共享，可动态调整数据分布。</li>
<li>可扩展性，可线性扩展到1000个节点，节点可动态添加或删除。</li>
<li>高可用性，部分节点不可用时，集群仍可用。通过增加Slave做备份数据副本。</li>
<li>实现故障自动failover，节点之间通过gossip协议交换状态信息，用投票机制完成Slave到Master的角色提示。</li>
</ol>
<p>缺点：</p>
<ol>
<li>资源隔离性较差，容易出现相互影响的情况。</li>
<li>数据通过异步复制，不保证数据的强一致性。</li>
</ol>
<p><a href="https://www.cnblogs.com/lpfuture/p/5796398.html" target="_blank" rel="noopener">一致性哈希算法</a></p>
<p>添加节点：</p>
<p>集群创建成功后可以向集群中添加节点，如添加7007节点，执行命令：./redis-trib.rb add-node 127.0.01:7007&nbsp;</p>
<p>查看</p>
<h3>七、Redis大key问题</h3>
<h4>7.1 什么是Redis大key</h4>
<ol>
<li>单个key存储的value很大。</li>
<li>hash、set、zset、list结构中存储过多的元素。</li>
</ol>
<h4>7.2 可能存在Redis大key的业务场景</h4>
<ol>
<li>配送范围特别大的门店。</li>
<li>促销活动特别多的门店、商家等。</li>
<li>高频用户下的订单列表。</li>
</ol>
<h4>7.3 Redis大key的危害</h4>
<p>OPS低也会导致内存占用多、流量大。比如一次取走100K的数据，当OPS为1000时，就会产生100M/s的流量。如果为list、hash等数据结构，大量的elements需要多次遍历，多次系统调用拷贝数据消耗时间。主动删除、被动过期删除、数据迁移等，由于处理这一个key时间长，导致服务器发送阻塞。</p>
<h4>7.4 如何找出Redis大key</h4>
<p>redis可使用redis-cli的&ldquo;--bigkeys&rdquo;选项查找大key。</p>
<p>jimdb管理端，拓扑Tab页，点击实例可以使用Redis大key扫描功能，该功能底层使用scan扫描所有key，会影响实例性能，选择在业务低峰进行。</p>
<h4>7.5 如何解决Redis大key问题</h4>
<p>对于需要整取value的大key，可以尝试将对象分拆成几个key-value，使用multiGet获取值，这样分拆的意义在于分拆单次操作的压力，将操作压力平铺到多个实例中，降低对单个实例的IO影响。</p>
<p>对于每次需要取部分value的大key，同样可以拆成几个key-value，也可以将这些存储在一个hash中，每个field代表具体属性，使用hget、hmget来获取部分value，使用hset、hmset来更新部分属性。</p>
<p>对于value中存储过多元素的key，同样可以将这部分元素拆分。</p>
<p>示例：可以固定一个桶数量，比如1W，每次存取的时候，先在本地计算field的hash值，对1W取模，确定field落在哪个key上。</p>
<pre class="language-java"><code>newHashKey = hashKey + (hash(field) % 10000);
hset(newHashKey, field, value);
hget(newHashKey, field);</code></pre>
<p><a href="https://www.cnblogs.com/xgqfrms/p/13601959.html" target="_blank" rel="noopener">参考文章</a></p>
<h3>八、布隆过滤器处理缓存穿透问题</h3>
<h4>8.1 原理</h4>
<p>布隆过滤器的巨大用处就是：能够迅速判断一个元素是否在一个集合中。因此它有三个使用场景：</p>
<ol>
<li>网页爬虫对URL的去重，避免爬取相同的URL地址。</li>
<li>反垃圾邮件，从数十亿垃圾邮件列表中判断某邮箱是否垃圾邮箱。</li>
<li>缓存穿透，将所有可能存在的时间缓存到布隆过滤器中，当访问不存在的缓存时讯飞返回，避免缓存及DB挂掉。</li>
</ol>
<p>其内部维护一个全为0的bit数组，需要说明的是，布隆过滤器有一个误判率的概念，误判率越低，则数组越长，所占空间越大。误判率越高，则数组越小，所占的空间越小。</p>
<p>假设根据误判率，我们生成一个10位的bit数组，以及2个hash函数(f_1, f_2)，假设输入集合为(N_1, N_2)，经计算(f_1(N_1))得到的数值得为2，(f_2(N_1))得到的数值为5，则将数组下标为2和下标为5 的位置置为1。同理，经过计算(f_1(N_2))得到的数值为3，(f_2(N_2))得到的数值为6，则将数组下标为3和下标为6的位置置为2。这个时候，我们有第三个数(N_3)，我们判断N_3在不在集合(N_1, N_2)中，就进行(f_1(N_3), f_2(N_3))的计算。</p>
<ol>
<li>若值恰巧都位于上面的位置中，则认为N_3在集合(N_1, N_2)中。</li>
<li>若值有一个不在上面的位置中，则任务N_3不在集合(N_1, N_2)中。</li>
</ol>
<h4>8.2 优点</h4>
<ol>
<li>思路简单。</li>
<li>保证一致性。</li>
<li>性能强。</li>
</ol>
<h4>8.3 缺点</h4>
<ol>
<li>代码复杂度增加。</li>
<li>需要另外维护一个集合来存放缓存的key。</li>
<li>布隆过滤器不支持删值操作。</li>
</ol>
<p><a href="https://www.cnblogs.com/rinack/p/9712477.html" target="_blank" rel="noopener">参考文章</a></p>
<h3>九、缓存雪崩</h3>
<p>缓存雪崩是指在我们设置缓存时采用了相同的过期时间，导致缓存在某一时刻同时失效，请求全部发到DB，DB瞬间压力过重雪崩。</p>
<p>解决方案：缓存失效时的雪崩效应对底层系统的冲击非常可怕，大多数系统设计者考虑加锁或者队列的方式保证缓存的单线程(进程)写，从而避免失效时大量的并发请求落到底层存储系统上。简单方案：在原有的失效时间基础上增加一个随机值，比如1-5分钟，这样每个缓存的过期时间重复率就会降低，就很难引发集体失效的事件。</p>
<h3>十、缓存击穿</h3>
<p>与缓存雪崩的区别在于这里针对某一个key缓存，雪崩则是很多key。缓存在某个时间点过期的时候，恰好在这个时间点对这个key有大量的并发请求过来，这些请求发现缓存过期一般都会从后端DB加载数据并回设到缓存，这个时候大并发的请求可能会瞬间把后端DB压垮。</p>
<p>解决方案：</p>
<h4>10.1 使用互斥锁(mutex key)</h4>
<p>业界比较常用的做法是使用mutex。简单地来说，就是在缓存失效的时候(判断拿出来的值为空)，不是立即去load db，而是先使用缓存工具的某些带成功操作返回值的操作(Redis的SETNX)去set一个mutex key，当操作返回成功时，在进行load db的操作并回设缓存；否则就重试整个get缓存的方法。</p>
<p>SETNX，就是[SET if not exists]的缩写，也就是只有不存在的时候才设置，可以利用它来实现锁的效果。</p>
<pre class="language-java"><code>public String get(String key) {
    String value = redis.get(key);
    if (value == null) { //代表缓存值过期
        //设置3min的超时，防止del操作失败的时候，下次缓存过期一直不能load db
        if (redis.setnx(key_mutex, 1, 3 * 60) == 1) {  //代表设置成功
            value = db.get(key);
            redis.set(key, value, expire_secs);
            redis.del(key_mutex);
        } else {  //这个时候代表同时候的其他线程已经load db并回设到缓存了，这时候重试获取缓存值即可
            sleep(50);
            get(key);  //重试
        }
    } else {
        return value;
    }
}</code></pre>
<h4>10.2 &ldquo;提前&rdquo;使用互斥锁(mutex key)</h4>
<p>在value内部设置一个超时值(timeout1)，比实际timeout小。当从cache读取到timeout发现它已经过期，马上延长timeout1并重新设置到cache，再从数据库加载数据并设置到cache中。</p>
<h3>十一、过期策略和内存淘汰机制</h3>
<h4>11.1 过期策略</h4>
<p>Redis采用的是定期删除+惰性删除策略。</p>
<p>为什么不采用定时删除策略：定时删除，用一个定时器来负责监视key，过期则自动删除。虽然内存及时释放，但是十分消耗CPU资源。在大并发请求下，CPU要将时间应用在处理请求，而不是删除key，因此没有采用这一策略。</p>
<p>定期删除+惰性删除是如何工作的：redis默认每个100ms检查，是否有过期的key，有过期的key则删除。过期扫描不会遍历过期字典中所有的key，而是采用了一种简单的贪心策略。</p>
<ol>
<li>从过期字典中随机20个key。</li>
<li>删除这20个key中已经过期的key。</li>
<li>如果过期的key比率超过1/4，那就重复步骤1。</li>
</ol>
<p>因此，会导致很多key到时间没有删除。于是惰性删除派上了用场，当你获取某个key的时候，redis会检查一下，这个key如果设置了过期时间，过期了就会删除。</p>
<p>定期删除+惰性删除的问题：如何定期删除没删除key，也没及时去请求key，这样redis的内存就会越来越高，那么就采用内存淘汰机制。</p>
<h4>11.2 内存淘汰机制</h4>
<ol>
<li>noeviction：当内存使用超过配置时会返回错误，不会驱逐任何键。</li>
<li>allkeys-lru：加入键的时候如果过限，首先通过LRU算法驱逐最久没有使用的键。</li>
<li>allkeys-random：加入键的时候如果过限，从所有key随机删除。</li>
<li>allkeys-lfu：从所有键中驱逐使用频率最少的键。</li>
<li>volatile-lru：加入键的时候如果过限，首先从设置了过期时间的键集合中驱逐最久没有使用的键。</li>
<li>volatile-random：加入键的时候如果过限，从过期的集合中随机驱逐。</li>
<li>volatile-ttl：从配置了过期时间的键中驱逐马上就要过期的键。</li>
<li>volatile-lfu：从所有配置了过期时间的键中驱逐使用频率最少的键。</li>
</ol>
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