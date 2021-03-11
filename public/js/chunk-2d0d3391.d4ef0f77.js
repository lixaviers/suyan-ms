(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d0d3391"],{"5c9f":function(t,i,e){"use strict";e.r(i);var n=function(){var t=this,i=t.$createElement,e=t._self._c||i;return e("div",{staticClass:"suyan__home"},[e("h1",[t._v("Spring"),e("el-button",{staticClass:"suyan__btn__print",attrs:{type:"primary",plain:""},on:{click:t.print}},[t._v("打印pdf")])],1),e("el-divider"),e("h3",[t._v("一、Spring事务原理")]),e("h4",[t._v("1.1 事务的基本原理")]),e("p",[t._v("Spring事务的本质其实就是数据库对事务的支持，没有数据库的事务支持，Spring是无法提供事务功能的。对于纯JDBC操作数据库，想要用到事务，可以按照以下步骤进行：")]),t._m(0),e("p",[t._v("使用Spring的事务管理功能后，我们可以不再写步骤2和4的代码，而是由Spring自动完成。那么Spring是如何在我们书写的CRUD之前和之后开启事务和关闭事务呢？以注解方式为例子：")]),t._m(1),e("h4",[t._v("1.2 Spring事务的传播机制")]),e("p",[t._v("所谓Spring事务的传播机制，就是定义在存在多个事务同时存在的时候，Spring应该如何处理这些事务的行为。这些属性在TransactionDefinition中定义，具体如下：")]),t._m(2),e("h4",[t._v("1.3 数据库隔离级别")]),t._m(3),e("p",[t._v("二、")])],1)},a=[function(){var t=this,i=t.$createElement,e=t._self._c||i;return e("pre",{staticClass:"language-java"},[e("code",[t._v("1.获取连接 Connection con = DriverManager.getConnection()\n2.开启事务con.setAutoCommit(true/false);\n3.执行CRUD\n4.提交事务/回滚事务 con.commit() / con.rollback();\n5.关闭连接 conn.close();")])])},function(){var t=this,i=t.$createElement,e=t._self._c||i;return e("pre",{staticClass:"language-java"},[e("code",[t._v("1.配置文件开启注解驱动，在相关的类和方法上通过注解@Transactional标识。\n2.spring 在启动的时候会去解析生成相关的bean，这时候会查看拥有相关注解的类和方法，并且为这些类和方法生成代理，并根据@Transaction的相关参数进行相关配置注入，这样就在代理中为我们把相关的事务处理掉了（开启正常提交事务，异常回滚事务）。\n3.真正的数据库层的事务提交和回滚是通过bin log或者redo log实现的。")])])},function(){var t=this,i=t.$createElement,e=t._self._c||i;return e("ul",[e("li",[t._v("PROPAGATION_REQUIRED(必须的)：支持当前事务，如果当前没有事务，就新建一个事务，如果已经存在一个事务中，加入到这个事务中。这是最常见的选择，也是spring默认的传播机制。")]),e("li",[t._v("PROPAGATION_REQUIRES_NEW(隔离)：不支持当前事务。新建事务，如果当前存在事务中，把当前的事务挂起。新建的事务将和被挂起的事务没有任何关联，是两个独立的事务，外层事务失败回滚之后，不能回滚内层事务执行的结果，内层事务失败抛出异常，外层事务捕获，也可以不处理回滚操作。")]),e("li",[t._v("PROPAGATION_SUPPORTS(支持)：支持当前事务，如果当前没有事务，就以非事务方式执行。")]),e("li",[t._v("PROPAGATION_MANDATORY(强制)：支持当前的事务，如果当前没有事务，就抛出异常。")]),e("li",[t._v("PROPAGATION_NOT_SUPPORTED(不支持)：不支持当前事务。以非事务方式执行操作，如果当前存在事务，就把当前事务挂起。")]),e("li",[t._v("PROPAGATION_NEVER(强制非事务)：不支持当前事务。以非事务方式执行，如果当前存在事务，则抛出异常。")]),e("li",[t._v("PROPAGATION_NESTED(嵌套事务)：如果一个活动的事务存在，则运行在一个嵌套的事务中。如果没有活动事务，则按REQUIRED属性执行。它使用了一个单独的事务，这个事务拥有多个可以回滚的保存点。内部事务的回滚不会对外部事务造成影响。它只对DataSourceTransactionManager事务管理器起效。")])])},function(){var t=this,i=t.$createElement,e=t._self._c||i;return e("table",{staticStyle:{"border-collapse":"collapse",width:"620px"},attrs:{border:"1"}},[e("tbody",[e("tr",[e("td",{staticStyle:{width:"180px"}},[t._v("隔离级别")]),e("td",{staticStyle:{width:"140px"}},[t._v("隔离级别的值")]),e("td",{staticStyle:{width:"300px"}},[t._v("导致的问题")])]),e("tr",[e("td",{staticStyle:{width:"180px"}},[t._v("Read-Uncommitted")]),e("td",{staticStyle:{width:"140px"}},[t._v("0")]),e("td",{staticStyle:{width:"300px"}},[t._v("导致脏读")])]),e("tr",[e("td",{staticStyle:{width:"180px"}},[t._v("Read-Committed")]),e("td",{staticStyle:{width:"140px"}},[t._v("1")]),e("td",{staticStyle:{width:"300px"}},[t._v("避免脏读，允许不可重复读和幻读")])]),e("tr",[e("td",{staticStyle:{width:"180px"}},[t._v("Repeatable-Read")]),e("td",{staticStyle:{width:"140px"}},[t._v("2")]),e("td",{staticStyle:{width:"300px"}},[t._v("避免脏读，不可重复读，允许幻读")])]),e("tr",[e("td",{staticStyle:{width:"180px"}},[t._v("Serializable")]),e("td",{staticStyle:{width:"140px"}},[t._v("3")]),e("td",{staticStyle:{width:"300px"}},[t._v("串行化读，事务只能一个一个执行，避免脏读、不可重复读、幻读。执行效率慢，使用时慎用")])])])])}],r=e("c276"),c={methods:{print:function(){r["a"].print()}}},l=c,_=e("5d22"),s=Object(_["a"])(l,n,a,!1,null,null,null);i["default"]=s.exports}}]);
//# sourceMappingURL=chunk-2d0d3391.d4ef0f77.js.map