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
<p>&nbsp;</p>
<p>&nbsp;</p>
<p>&nbsp;</p>
<p>&nbsp;</p>
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
        }
    }
}
</script>