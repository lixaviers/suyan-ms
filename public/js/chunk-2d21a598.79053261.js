(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d21a598"],{baad:function(a,t,e){"use strict";e.r(t);var n=function(){var a=this,t=a.$createElement,e=a._self._c||t;return e("div",{staticClass:"suyan__home"},[e("h1",[a._v("锁机制"),e("el-button",{staticClass:"suyan__btn__print",attrs:{type:"primary",plain:""},on:{click:a.print}},[a._v("打印pdf")])],1),e("el-divider"),e("h3",[a._v("一、说说线程安全问题")]),e("p",[a._v("线程安全是指要控制多个线程对某个资源的有序访问或修改，而在这些线程之间没有产生冲突。在Java里，线程安全一般体现在两个方面：")]),a._m(0),e("h3",[a._v("二、volatile实现原理")]),e("p",[a._v("用法：volatile通常被比喻成”轻量级的synchronized“，也就是Java并发编程中比较重要的一个关键字。和synchronized不同，volatile是一个变量修饰符，只能用来修饰变量，无法修饰方法及代码块等。volatile的用法比较简单，只需要在声明一个可能被多线程同时访问的变量时，使用volatile修饰就可以了。")]),e("p",[a._v("原理：为了提高处理器的执行速度，在处理器和内存之间增加了多级缓存来提升。但是由于引入了多级缓存，就存在缓存数据不一致的问题。但是，对于volatile变量，当对volatile变量进行写操作的时候，JVM会向处理器发送一个lock前缀的指令，将这个缓存中的变量回写到系统主存中。但是就算写回到内存，如果其他处理器缓存的值还是旧的，再执行计算操作就会有问题。所以在多处理器下，为了保证各个处理器的缓存是一致的，就会实现缓存一致性协议。缓存一致性协议：每个处理器通过嗅探在总线上传播的数据来检查自己缓存的值是不是过期了，当处理器发现自己缓存行对应的内存地址被修改，就会将当前处理器的缓存行设置成无效状态，当处理器要对这个数据进行修改操作的时候，会强制重新从系统内存里把数据读到处理器缓存里。")])],1)},i=[function(){var a=this,t=a.$createElement,e=a._self._c||t;return e("ol",[e("li",[a._v("多个thread对同一个Java实例的访问(read和modify)不会相互干扰，它主要体现在关键字synchronized。如ArrayList和Vector，HashMap和HashTable(后者每个方法前都有synchronized关键字)。如果你在操作一个List对象时，其它线程remove一个element，问题就出现了。")]),e("li",[a._v("每个线程都有自己的字段，而不会在多个线程之间共享。它主要体现在java.lang.ThreadLocal类，而没有Java关键字支持，如像static、transient那样。")])])}],l=e("c276"),r={methods:{print:function(){l["a"].print()}}},o=r,s=e("5d22"),v=Object(s["a"])(o,n,i,!1,null,null,null);t["default"]=v.exports}}]);
//# sourceMappingURL=chunk-2d21a598.79053261.js.map