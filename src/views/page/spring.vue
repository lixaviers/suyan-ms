<template>
    <div class="suyan__home">
        <h1>Spring<el-button class="suyan__btn__print" type="primary" plain @click="print">打印pdf</el-button></h1><el-divider></el-divider>
        <h3>一、Spring事务原理</h3>
<h4>1.1 事务的基本原理</h4>
<p>Spring事务的本质其实就是数据库对事务的支持，没有数据库的事务支持，Spring是无法提供事务功能的。对于纯JDBC操作数据库，想要用到事务，可以按照以下步骤进行：</p>
<pre class="language-java"><code>1.获取连接 Connection con = DriverManager.getConnection()
2.开启事务con.setAutoCommit(true/false);
3.执行CRUD
4.提交事务/回滚事务 con.commit() / con.rollback();
5.关闭连接 conn.close();</code></pre>
<p>使用Spring的事务管理功能后，我们可以不再写步骤2和4的代码，而是由Spring自动完成。那么Spring是如何在我们书写的CRUD之前和之后开启事务和关闭事务呢？以注解方式为例子：</p>
<pre class="language-java"><code>1.配置文件开启注解驱动，在相关的类和方法上通过注解@Transactional标识。
2.spring 在启动的时候会去解析生成相关的bean，这时候会查看拥有相关注解的类和方法，并且为这些类和方法生成代理，并根据@Transaction的相关参数进行相关配置注入，这样就在代理中为我们把相关的事务处理掉了（开启正常提交事务，异常回滚事务）。
3.真正的数据库层的事务提交和回滚是通过bin log或者redo log实现的。</code></pre>
<h4>1.2 Spring事务的传播机制</h4>
<p>所谓Spring事务的传播机制，就是定义在存在多个事务同时存在的时候，Spring应该如何处理这些事务的行为。这些属性在TransactionDefinition中定义，具体如下：</p>
<ul>
<li>PROPAGATION_REQUIRED(必须的)：支持当前事务，如果当前没有事务，就新建一个事务，如果已经存在一个事务中，加入到这个事务中。这是最常见的选择，也是spring默认的传播机制。</li>
<li>PROPAGATION_REQUIRES_NEW(隔离)：不支持当前事务。新建事务，如果当前存在事务中，把当前的事务挂起。新建的事务将和被挂起的事务没有任何关联，是两个独立的事务，外层事务失败回滚之后，不能回滚内层事务执行的结果，内层事务失败抛出异常，外层事务捕获，也可以不处理回滚操作。</li>
<li>PROPAGATION_SUPPORTS(支持)：支持当前事务，如果当前没有事务，就以非事务方式执行。</li>
<li>PROPAGATION_MANDATORY(强制)：支持当前的事务，如果当前没有事务，就抛出异常。</li>
<li>PROPAGATION_NOT_SUPPORTED(不支持)：不支持当前事务。以非事务方式执行操作，如果当前存在事务，就把当前事务挂起。</li>
<li>PROPAGATION_NEVER(强制非事务)：不支持当前事务。以非事务方式执行，如果当前存在事务，则抛出异常。</li>
<li>PROPAGATION_NESTED(嵌套事务)：如果一个活动的事务存在，则运行在一个嵌套的事务中。如果没有活动事务，则按REQUIRED属性执行。它使用了一个单独的事务，这个事务拥有多个可以回滚的保存点。内部事务的回滚不会对外部事务造成影响。它只对DataSourceTransactionManager事务管理器起效。</li>
</ul>
<h4>1.3 数据库隔离级别</h4>
<table style="border-collapse: collapse; width: 620px;" border="1">
<tbody>
<tr>
<td style="width: 180px;">隔离级别</td>
<td style="width: 140px;">隔离级别的值</td>
<td style="width: 300px;">导致的问题</td>
</tr>
<tr>
<td style="width: 180px;">Read-Uncommitted</td>
<td style="width: 140px;">0</td>
<td style="width: 300px;">导致脏读</td>
</tr>
<tr>
<td style="width: 180px;">Read-Committed</td>
<td style="width: 140px;">1</td>
<td style="width: 300px;">避免脏读，允许不可重复读和幻读</td>
</tr>
<tr>
<td style="width: 180px;">Repeatable-Read</td>
<td style="width: 140px;">2</td>
<td style="width: 300px;">避免脏读，不可重复读，允许幻读</td>
</tr>
<tr>
<td style="width: 180px;">Serializable</td>
<td style="width: 140px;">3</td>
<td style="width: 300px;">串行化读，事务只能一个一个执行，避免脏读、不可重复读、幻读。执行效率慢，使用时慎用</td>
</tr>
</tbody>
</table>
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