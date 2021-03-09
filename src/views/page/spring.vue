<template>
    <div class="suyan__home">
        <h1>Spring<el-button class="suyan__btn__print" type="primary" plain @click="print">打印pdf</el-button></h1><el-divider></el-divider>
        <h3>一、Spring事务传播机制</h3>
<ul>
<li>PROPAGATION_REQUIRED(必须的)：支持当前事务，如果当前没有事务，就新建一个事务，如果已经存在一个事务中，加入到这个事务中。这是最常见的选择，也是spring默认的传播机制。</li>
<li>PROPAGATION_REQUIRES_NEW(隔离)：不支持当前事务。新建事务，如果当前存在事务中，把当前的事务挂起。新建的事务将和被挂起的事务没有任何关联，是两个独立的事务，外层事务失败回滚之后，不能回滚内层事务执行的结果，内层事务失败抛出异常，外层事务捕获，也可以不处理回滚操作。</li>
<li>PROPAGATION_SUPPORTS(支持)：支持当前事务，如果当前没有事务，就以非事务方式执行。</li>
<li>PROPAGATION_MANDATORY(强制)：支持当前的事务，如果当前没有事务，就抛出异常。</li>
<li>PROPAGATION_NOT_SUPPORTED(不支持)：不支持当前事务。以非事务方式执行操作，如果当前存在事务，就把当前事务挂起。</li>
<li>PROPAGATION_NEVER(强制非事务)：不支持当前事务。以非事务方式执行，如果当前存在事务，则抛出异常。</li>
<li>PROPAGATION_NESTED(嵌套事务)：如果一个活动的事务存在，则运行在一个嵌套的事务中。如果没有活动事务，则按REQUIRED属性执行。它使用了一个单独的事务，这个事务拥有多个可以回滚的保存点。内部事务的回滚不会对外部事务造成影响。它只对DataSourceTransactionManager事务管理器起效。</li>
</ul>
<p>二、</p>
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