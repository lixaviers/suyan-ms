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