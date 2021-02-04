<template>
    <div class="suyan__home">
        <h1>消息中间件<el-button class="suyan__btn__print" type="primary" plain @click="print">打印pdf</el-button></h1><el-divider></el-divider>
        <h3>一、为什么要使用MQ？</h3>
<table style="border-collapse: collapse; width: 100%;" border="1">
<tbody>
<tr>
<td style="width: 48.8717%;">作用</td>
<td style="width: 48.948%;">描述</td>
</tr>
<tr>
<td style="width: 48.8717%;">解耦</td>
<td style="width: 48.948%;">系统耦合度降低，没有强依赖关系</td>
</tr>
<tr>
<td style="width: 48.8717%;">异步</td>
<td style="width: 48.948%;">不需要同步执行的远程调用，可以有效提高响应时间</td>
</tr>
<tr>
<td style="width: 48.8717%;">削峰</td>
<td style="width: 48.948%;">请求达到峰值后，后端service还可以保持固定消费速率消费，不会被压垮</td>
</tr>
</tbody>
</table>
<h3>二、RocketMQ由哪些角色组成，每个角色作用和特点是什么？</h3>
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