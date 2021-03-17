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
<p><a href="https://blog.csdn.net/top_code/article/details/54615853" target="_blank" rel="noopener">参考文章</a></p>
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