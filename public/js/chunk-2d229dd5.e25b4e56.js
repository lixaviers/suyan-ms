(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d229dd5"],{deec:function(t,e,i){"use strict";i.r(e);var d=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"suyan__home"},[i("h1",[t._v("消息中间件"),i("el-button",{staticClass:"suyan__btn__print",attrs:{type:"primary",plain:""},on:{click:t.print}},[t._v("打印pdf")])],1),i("el-divider"),i("h3",[t._v("一、为什么要使用MQ？")]),t._m(0),i("h3",[t._v("二、RocketMQ由哪些角色组成，每个角色作用和特点是什么？")]),t._m(1),i("h3",[t._v("三、RocketMQ如何做负载均衡？")]),i("p"),i("h3",[t._v("四、如何处理RocketMQ消息重复消费？")]),i("p"),i("h3",[t._v("五、如何让RocketMQ保证消息的顺序消费？")]),i("p"),i("p"),i("p"),i("p"),i("p"),i("p"),i("p"),i("p")],1)},a=[function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("table",{staticStyle:{"border-collapse":"collapse",width:"auto"},attrs:{border:"1"}},[i("tbody",[i("tr",[i("td",{staticStyle:{width:"80px"}},[t._v("作用")]),i("td",{staticStyle:{width:"auto"}},[t._v("描述")])]),i("tr",[i("td",{staticStyle:{width:"80px"}},[t._v("解耦")]),i("td",{staticStyle:{width:"auto"}},[t._v("系统耦合度降低，没有强依赖关系")])]),i("tr",[i("td",{staticStyle:{width:"80px"}},[t._v("异步")]),i("td",{staticStyle:{width:"auto"}},[t._v("不需要同步执行的远程调用，可以有效提高响应时间")])]),i("tr",[i("td",{staticStyle:{width:"80px"}},[t._v("削峰")]),i("td",{staticStyle:{width:"auto"}},[t._v("请求达到峰值后，后端service还可以保持固定消费速率消费，不会被压垮")])])])])},function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("table",{staticStyle:{"border-collapse":"collapse",width:"100%"},attrs:{border:"1"}},[i("tbody",[i("tr",[i("td",{staticStyle:{width:"48.8717%"}},[t._v("角色")]),i("td",{staticStyle:{width:"48.948%"}},[t._v("作用")])]),i("tr",[i("td",{staticStyle:{width:"48.8717%"}},[t._v("Nameserver")]),i("td",{staticStyle:{width:"48.948%"}},[t._v("无状态，动态列表；这也是和zk的重要区别之一，zk有状态")])]),i("tr",[i("td",{staticStyle:{width:"48.8717%"}},[t._v("Producer")]),i("td",{staticStyle:{width:"48.948%"}},[t._v("消息生产着，负责发消息到Broker")])]),i("tr",[i("td",{staticStyle:{width:"48.8717%"}},[t._v("Broker")]),i("td",{staticStyle:{width:"48.948%"}},[t._v("就是MQ本身，负责收发消息、持久化消息等")])]),i("tr",[i("td",{staticStyle:{width:"48.8717%"}},[t._v("Consumer")]),i("td",{staticStyle:{width:"48.948%"}},[t._v("消息消费者，负责从Broker上拉去消息进行消费，消费完进行ack")])])])])}],r=i("c276"),c={methods:{print:function(){r["a"].print()}}},s=c,l=i("5d22"),_=Object(l["a"])(s,d,a,!1,null,null,null);e["default"]=_.exports}}]);
//# sourceMappingURL=chunk-2d229dd5.e25b4e56.js.map