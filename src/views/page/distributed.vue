<template>
    <div class="suyan__home">
        <h1>分布式<el-button class="suyan__btn__print" type="primary" plain @click="print">打印pdf</el-button></h1><el-divider></el-divider>
        <h3>一、RPC实现及原理</h3>
<h4>1.1 RPC概述</h4>
<p>RPC(Remote Procedure Call)即远程过程调用，允许一台计算机调用另一台计算机上的程序得到结果，而代码中不需要做额外的编程，就像在本地调用一样。现在互联网应用的量级越来越大，单台计算机的能力有限，需要借助可扩展的计算机来完成，分布式的应用可以借助RPC来完成机器之间的调用。</p>
<h4>1.2 RPC框架原理</h4>
<p>在RPC框架中主要有三个角色：Provider、Consumer和Registry。</p>
<h4>1.3 RPC调用流程</h4>
<p>一次完整的RPC调用流程如下：</p>
<ol>
<li>服务消费方(client)调用以本地调用方法调用服务。</li>
<li>client stub接受到调用后负责将方法、参数等组装成能够进行网络传输的消息体。</li>
<li>client stub找到服务地址，并将消息发送到服务端。</li>
<li>server stub收到消息后进行解码。</li>
<li>server stub根据解码结果调用本地的服务。</li>
<li>本地服务执行并将结果返回给server stub。</li>
<li>server stub将返回结果打包成消息并发送到消费方。</li>
<li>client stub接收到消息，并进行解码。</li>
<li>服务消费方得到最终结果。</li>
</ol>
<p>RPC框架的目标就是要将2-8步骤封装起来，让用户对这些细节透明。</p>
<h4>1.4 服务注册 &amp; 发现</h4>
<p>服务提供者启动后主动向注册中心注册机器ip、port以及提供的服务列表。服务消费者启动时向注册中心获取服务提供方地址列表，可实现软负载均衡和Failover。</p>
<h4>1.5 使用到的技术</h4>
<ol>
<li>动态代理：生成client stub和server stub需要用到Java动态代理技术，可以使用JDK原生的动态代理机制，可以使用一些开源字节码工具，如：CgLib、Javassist等。</li>
<li>序列化：为了能在网络上传输和接收Java对象，我们需要对它进行序列化和反序列化操作。序列化：将Java对象转成byte[]的过程，也就是编码的过程；反序列化：将byte[]转换成Java对象的过程。可以使用Java原生的序列化机制，但是效率非常低，推荐使用开源的：protobuf、Thrift、hessian、Kryo、Msgpack。</li>
<li>NIO：当前很多RPC框架都直接基于netty这一IO通讯框架，如阿里的HSF、Dubbo、Hadoop Avro，推荐使用Netty作为底层通信框架。</li>
<li>服务注册中心：Redis、Zookeeper、Consul、Etcd、Nacos。</li>
</ol>
<p><a href="https://blog.csdn.net/top_code/article/details/54615853" target="_blank" rel="noopener">参考文章</a></p>
<h3>二、CAP原理和BASE思想</h3>
<ul>
<li>Consistency(一致性)：数据一致更新，所有数据变动都是同步的。</li>
<li>Availability(可用性)：好的响应性能。</li>
<li>Partition tolerance(分区容忍性)可靠性。</li>
</ul>
<p>定理：任何分布式系统只可同时满足两点，没法三者兼顾。</p>
<p>关系数据库的ACID模型拥有高一致性+可用性：</p>
<ul>
<li>Atomicity原子性：一个事务中所有操作都必须全部完成，要么全部不完成。</li>
<li>Consistency一致性：在事务开始或结束时，数据库应该在一致状态。</li>
<li>Isolation隔离性：事务将假定只有它自己在操作数据库，彼此不知晓。</li>
<li>Durability持久性：一旦事务完成，就不能返回。</li>
</ul>
<p>跨数据库两段提交事务：2PC(two-phase commit)，2PC是反可伸缩模式的，JavaEE中的JTA事务可以支持2PC。因为2PC是反模式，尽量不要使用，使用BASE来回避。</p>
<p>BASE模式反ACID模型，完全不同ACID模型，牺牲高一致性，获得可用性或可靠性：</p>
<ul>
<li>Basically Available基本可用，支持分区失败(sharding碎片划分数据库)。</li>
<li>Soft state软状态，状态可以有一段时间不同步，异步。</li>
<li>Eventually consistent最终一致，最终数据是一致的就可以了，而不是实时高一致。</li>
</ul>
<p>BASE思想的主要实现有：</p>
<ol>
<li>按功能划分数据库。</li>
<li>sharding碎片。</li>
</ol>
<p>BASE思想主要强调基本的可用性，如何你需要高可用性，也就是纯粹的高性能，那么就要以一致性或容忍性为牺牲，BASE思想的方案在性能上还是有潜力可挖的。</p>
<p>现在NOSQL运动丰富拓展了BASE思想，可按照具体情况定制特别方案，比如忽视一致性，获得高可用性等，NOSQL应该有下面两个流派：</p>
<ol>
<li>Key-Value存储，如Amaze Dynamo等，可根据CAP三原则灵活选择不同倾向的数据库产品。</li>
<li>领域模型+分布式缓存+存储，可根据CAP三原则结合自己项目定制灵活的分布式方案，难度高。</li>
</ol>
<p>这两者共同点：都是关系数据库SQL以外的可选方案，逻辑随着数据分布，任何模型都可以自己持久化，将数据处理和数据存储分离，将读写分离，存储可以是异步或同步，取决于对一致性的要求程度。</p>
<p>不同点：NOSQL之类的Key-Value存储产品是和关系数据库头碰头的产品BOX，可是适合非Java如PHP、Ruby等领域，是一种可以拿来就用的产品，而领域模型+分布式缓存+存储是一种复杂的架构解决方案，不是产品，但这种方式更灵活，更应该是架构师必须掌握的。</p>
<p><a href="https://www.jdon.com/37625" target="_blank" rel="noopener">参考文章</a></p>
<h3>三、XA、2PC、TCC、Saga、Seata</h3>
<h4>3.1 为什么XA大家都不用</h4>
<p>其实也并非不用，例如在IBM大型机上基于CICS很多跨资源是基于XA协议实现的分布式事务，事实上XA也算分布式事务处理的规范了，但为什么在互联网中很少使用，究其原因有以下几点：</p>
<ul>
<li>性能：阻塞性协议，增加响应时间，锁时间、死锁。</li>
<li>数据库支持完善度：MySQL5.7之前都有缺陷。</li>
<li>协调者依赖独立的J2EE中间件(早期重量级Weblogic、Jboss、后期轻量级Atomikos、Narayana和Bitronix)。</li>
<li>运维复杂，DBA缺少这方面经验。</li>
<li>并不是所有资源都支持XA协议。</li>
<li>大厂懂所以不使用，小公司不懂所以不敢用。</li>
</ul>
<p>准确讲XA是一个规范、协议，它只是定义了一系列的接口，只是目前大多数实现XA的都是数据库或者MQ，所以提起XA往往多指基于资源层的底层分布式解决方案。其实现在也有些数据分片框架或者中间件也支持XA协议，毕竟它兼容性、普遍性更好。</p>
<h4>3.2 两阶段提价的&ldquo;提升&rdquo;</h4>
<p>基于数据库的XA协议本质上就是两阶段提交，但由于性能原因在互联网高并发场景下并不适用。如果数据库只能保证本地ACID时，那么其中出现交易异常后，如何实现整个交易原子性A，从而保证一致性C呢？另外在处理过程中如何保证隔离性呢？</p>
<p>最直接的方法就是按照逻辑依次调用服务，但出现异常怎么办？那就对那些已经成功的进行补偿，补偿成功就一致了，这种朴素的模型就是Saga。但Saga这种方式并不能保证隔离性，于是出现了TCC。在实际交易逻辑前先做业务检查，对设计到的业务资源进行&ldquo;预留&rdquo;，或者说是一种&ldquo;中间状态&rdquo;，如果都预留成功则完成这些预留资源的真正业务处理，典型的如票务座位等场景。</p>
<p>当然还有像Ebay提出的基于消息表，即可靠消息最终一致模型，但本质上这也属于Saga模式的一种特点实现，它的关键点有两个：</p>
<ul>
<li>基于应用共享事务记录执行轨迹。</li>
<li>然后通过异步重试确保交易最终一致。</li>
</ul>
<p>这类分布式事务场景并不是微服务才出现的，在SOA时代其实就有了，场景的Saga、TCC、可靠消息最终一致性等模型也都是很多年前就有了，只是最近几年随着微服务兴起，这些方案又重新被人关注了起来。仔细对比这些方案与XA，会发现这些方案本质上都是将两阶段提交从资源层提升到了应用层。</p>
<ul>
<li>Saga的核心就是补偿，一阶段就是服务的正常顺序调用(数据库事务正常提交)，如果都执行成功，则第二阶段什么都不做。但如果其中有执行发生异常，则依次调用其补偿服务(一般多逆序调用未已执行服务的反交易)来保证整个交易的一致性。应用实施成本一般。</li>
<li>TCC的特点在于业务资源检查与加锁，一阶段进行校验，资源锁定。如果第一阶段都成功，二阶段对锁定资源进行交易逻辑。否则，对锁定资源进行释放。应用实施成本较高。</li>
<li>基于可靠消息最终一致性，一阶段服务正常调用，同时事务记录消息表，二阶段则进行消息的投递、消费。应用实施成本较低。</li>
</ul>
<p>具体到基于这些模型实现的分布式事务框架，也多借鉴了DTP(Distributed Transaction Processing)模型。DTP模型：</p>
<ul>
<li>RM负责本地事务的提交，同时完成分支事务的注册、锁的判断，扮演事务参与者角色。</li>
<li>TM负责整体事务的提交与回滚的指令的触发，扮演事务的总体协调者角色。</li>
</ul>
<p>不同框架在实现时，各组件角色的功能、部署形态会根据需求进行调整，例如TM有的是以jar包形式与应用部署在一起，有的则剥离出来需要单独部署(如Seata中将TM的主要功能放到一个逻辑上集中的Server中，叫做TC(Transaction Coordinator))。</p>
<h4>3.3 Seata架构得与失</h4>
<p>19年初，阿里发布了开源分布式事务框架Fescar，后来根蚂蚁TCC方案整合后改名为Seata。Seata对MT以及TCC的支持亮点有限，这两种模式更多是为了兼容已有应用生态。特点：</p>
<ul>
<li>应用层基于SQL解析实现了自动补偿，从而最大程度的降低业务侵入性。</li>
<li>将分布式事务TC(事务协调器)独立部署，负责事务的注册、回滚。</li>
<li>通过全局锁实现了写隔离和读隔离。</li>
</ul>
<p>性能损耗：一条Update的SQL，需要全局事务xid获取(与TC通讯)、before image(解析SQL，查询一次数据库)、after image(查询一次数据库)、insert undo log(写一次数据库)、before commit(与TC通讯，判断锁冲突)，这些操作都需要一次远程通讯RPC，而且是同步的。另外undo log写入时blob字段的插入性能也是不高的。每条写SQL都会增加这么多开销，错略估计会增加5倍响应时间(二阶段虽然是异步的，但其实也会占用系统资源、网络、线程、数据库)。前后镜像通过druid解析SQL，然后复用业务SQL中的where条件生成select SQL执行。</p>
<p>为了进行自动补偿，需要对所有交易生成前后镜像并持久化，在实际业务场景下成功率有多高，或者说分布式事务失败需要回滚的有多少比例，这个比例在不同场景下是不一样的。考虑到执行事务编排前，很多都会校验业务的正确性，所以发生回滚的概率其实相对较低。按照二八原则预估，即为了20%的交易回滚，需要将80%的成功交易的响应时间增加5倍，这样的代价相比于让应用开发一个补偿交易是否是值得，这值得我们深思。业界还有种思路，通过数据库binlog恢复SQL执行前后镜像，这样省去了同步undo log生成记录，减少性能损耗，同时对业务零侵入。</p>
<p>全局锁：</p>
<ul>
<li>热点数据：Seata在每个分支事务中会携带对应的锁信息，在before commit阶段会依次获取锁(因为需要将所有SQL执行完才能拿到所有锁信息，所以放在commit前判断)。相比XA，Seata虽然在一阶段成功后会是否数据库锁，但一阶段在commit前全局锁的判断也拉长了对数据锁的占有时间，这个开销比XA的prepare低多少需要根据实际业务场景进行测试。全局锁的引入实现了隔离性，但带来的问题就是阻塞，降低并发性，尤其是热点数据，这个问题会更加严重。</li>
<li>回滚锁释放时间：Seata在回滚时，需要先删除各节点的undo log，然后才能释放TC内存中的锁，如果第二阶段是回滚，释放锁的时间会更长。</li>
<li>死锁问题：Seata的引入全局锁会额外增加死锁的风险，但如果实现死锁，会不断进行重试，最后靠等待全局锁超时，这种方式并不优雅，也延长了对数据库锁的占有时间。</li>
</ul>
<p>在数据库本地事务隔离级别<strong>读已提交(Read Committed)</strong>的基础上，Seata(AT模式)的默认全局隔离级别是<strong>读未提交(Read Uncommitted)</strong>。如果应用在特定场景下，必须要求全局的读已提交，目前Seata的方式是通过SELECT FOR UPDATE语句的代理。</p>
<p><a href="https://www.sohu.com/a/336224977_673711" target="_blank" rel="noopener">参考文章</a> <a style="padding-left: 10px;" href="http://seata.io/zh-cn/docs/overview/what-is-seata.html" target="_blank" rel="noopener">Seata官方文档</a></p>
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