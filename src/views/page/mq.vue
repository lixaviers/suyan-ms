<template>
    <div class="suyan__home">
        <h1>消息中间件<el-button class="suyan__btn__print" type="primary" plain @click="print">打印pdf</el-button></h1><el-divider></el-divider>
        <h3>一、为什么要使用MQ？</h3>
<table style="border-collapse: collapse; width: auto;" border="1">
<tbody>
<tr>
<td style="width: 80px;">作用</td>
<td style="width: auto;">描述</td>
</tr>
<tr>
<td style="width: 80px;">解耦</td>
<td style="width: auto;">系统耦合度降低，没有强依赖关系</td>
</tr>
<tr>
<td style="width: 80px;">异步</td>
<td style="width: auto;">不需要同步执行的远程调用，可以有效提高响应时间</td>
</tr>
<tr>
<td style="width: 80px;">削峰</td>
<td style="width: auto;">请求达到峰值后，后端service还可以保持固定消费速率消费，不会被压垮</td>
</tr>
</tbody>
</table>
<h3>二、RocketMQ由哪些角色组成，每个角色作用和特点是什么？</h3>
<table style="border-collapse: collapse; width: 100%;" border="1">
<tbody>
<tr>
<td style="width: 48.8717%;">角色</td>
<td style="width: 48.948%;">作用</td>
</tr>
<tr>
<td style="width: 48.8717%;">Nameserver</td>
<td style="width: 48.948%;">无状态，动态列表；这也是和zk的重要区别之一，zk有状态</td>
</tr>
<tr>
<td style="width: 48.8717%;">Producer</td>
<td style="width: 48.948%;">消息生产着，负责发消息到Broker</td>
</tr>
<tr>
<td style="width: 48.8717%;">Broker</td>
<td style="width: 48.948%;">就是MQ本身，负责收发消息、持久化消息等</td>
</tr>
<tr>
<td style="width: 48.8717%;">Consumer</td>
<td style="width: 48.948%;">消息消费者，负责从Broker上拉去消息进行消费，消费完进行ack</td>
</tr>
</tbody>
</table>
<h3>三、RocketMQ如何做负载均衡？</h3>
<p>&nbsp;</p>
<h3>四、如何处理RocketMQ消息重复消费？</h3>
<p>影响消息正常发送和消费的重要原因是网络的不稳定性。</p>
<p>引起重复消费的原因：</p>
<ul>
<li>ACK：正常情况下在consumer真正消费完消息后应该发送ack，通知Broker该消息已正常消费，从queue中剔除。当ack因为网络原因无法发送到Broker，Borker会认为此消息没有被消费，此后会开启消息重投机制把消息再次投递到consumer。</li>
<li>消费模式：在CLUSTERING模式下，消息在Broker中会保证相同group的consumer消费一次，但是针对不同group的consumer会推送多次。</li>
</ul>
<p>解决方案：</p>
<ul>
<li>数据库表：处理消息钱，使用消息主键在表中带有约束的字段中insert</li>
<li>Map：单机时可以使用map</li>
<li>Redis：分布式锁</li>
</ul>
<h3>五、如何让RocketMQ保证消息的顺序消费？</h3>
<p>多个queue只能保证单个queue里的顺序，queue是典型的FIFO(First Input First Output)先进先出队列，天然顺序。多个queue同时消费是无法绝对保证消息的有序性的。同一个topic，同一个queue，发消息的时候一个线程去发送消息，消费的时候一个线程去消费一个queue里的消息。</p>
<p>怎么保证消息发送到同一个queue？</p>
<p>RocketMQ给我们提供了MessageQueueSelector接口，可以自己重写里面的接口，实现自己的算法。比如：i % 2 == 0，那就都放到queue1里，否则放到queue2里。</p>
<h3>六、RocketMQ如何保证消息不丢失？</h3>
<p>1、Producer端如何保证消息不丢失</p>
<ul>
<li>采用send()同步发消息，发送接口是同步感知的</li>
<li>发送失败后可以重试，设置重试次数，默认3次。producer.setRetryTimesWhenSendFailed(10);</li>
<li>集群部署，比如发送失败了的原因可能是当前Broker宕机了，重试的时候会发送到其他Broker上</li>
</ul>
<p>2、Broker端如何保证消息不丢失</p>
<ul>
<li>修改刷盘策略为同步刷盘。默认情况下是异步刷盘。flushDiskType=SYNC_FLUSH</li>
<li>集群部署，主从模式，高可用</li>
</ul>
<p>3、Consumer端如何保证消息不丢失</p>
<ul>
<li>完全消费正常后在进行手动ack确认</li>
</ul>
<h3>七、RocketMQ的消息堆积如何处理？</h3>
<p>&nbsp;</p>
<h3>八、RocketMQ在分布式事务支持这块机制的底层原因</h3>
<p>RocketMQ4.3+提供分布式事务功能，通过RocketMQ事务消息能达到分布式事务的最终一致。</p>
<p>RocketMQ实现方式：</p>
<ul>
<li>Half Message：预处理消息，当broker收到此类消息后，会存储到RMQ_SYS_TRANS_HALF_TOPIC的消息消费队列中。</li>
<li>检查事务状态：broker会开始一个定时任务，消费RMQ_SYS_TRANS_HALF_TOPIC队列中的消息，每次执行任务会向消息发送者确认事务执行状态(提交、回滚、未知)，如果是未知，broker会定时去回调重新检查。</li>
<li>超时：如果超过回查次数，默认回滚消息。</li>
</ul>
<p>也就是它并未真正进入Topic的queue，而是用了临时queue来放所谓的half message，等提交事务后才会真正的将half message转移到topic下的queue。</p>
<h3>九、RocketMQ是如何保证数据的高容错性的？</h3>
<ul>
<li>在不开启容错的情况下，轮询队列进行发送，如果失败了，重试的时候过滤失败的Broker。</li>
<li>如果开启了容错策略，会通过RocketMQ的预测机制来预测一个Broker是否可用。</li>
<li>如果上次失败的Broker可用那么还是选择该Broker队列。</li>
<li>如果上述情况失败，则随机选择一个进行发送。</li>
<li>在发送消息的时候会记录一下调用的时间与是否报错，根据该时间去预测Broker的可用时间。</li>
</ul>
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