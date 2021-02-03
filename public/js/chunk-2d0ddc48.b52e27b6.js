(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d0ddc48"],{8390:function(r,i,e){"use strict";e.r(i);var v=function(){var r=this,i=r.$createElement,e=r._self._c||i;return e("div",{staticClass:"suyan__home"},[e("h1",[r._v("JVM"),e("el-button",{staticClass:"suyan__btn__print",attrs:{type:"primary",plain:""},on:{click:r.print}},[r._v("打印pdf")])],1),e("el-divider"),e("p",[r._v("一、内存区域")]),e("p",[r._v("1、JVM规范《The Java Virtual Machine Specificati1on, Java SE 8 Edition》2.5 Run-Time Data Areas中描述的运行时数据区分为6个区域")]),r._m(0),e("p",[r._v("2、具体虚拟机实现角度")]),e("p",[r._v("Java8内存区域划分大致分为6个区域：")]),r._m(1),e("p",[r._v("二、JVM内存为什么要分成新生代、老年代、持久代，新生代中为什么要分为Eden和Servivor？")]),e("p",[r._v("1、新生代:")]),e("p",[r._v("新生代主要用来存放新生的对象。一般占据堆空间的1/3。在新生代中，保存着大量的刚刚创建的对象，但是大部分的对象都是朝生夕死，所以在新生代中会频繁的进行MinorGC，进行垃圾回收。新生代又细分为三个区：Eden区、SurvivorFrom、SurvivorTo区，三个区的默认比例为8：1：1。")]),r._m(2),e("p",[r._v("2、老年代")]),e("p",[r._v("老年代主要存放应用中生命周期长的内存对象。老年代比较稳定，不会频繁的进行MajorGC。而在MajorGC之前才会先进行一次MinorGC，使得新生的对象进入老年代而导致空间不够才会触发。当无法找到足够大的连续分配给新创建的较大对象也会提前触发一次MajorGC，进行垃圾回收腾出空间。")]),e("p",[r._v("在老年代中，MajorGC采用了标记-清除算法：首先扫描一次所有老年代里的对象，标记处存活的对象，然后回收没有标记的对象。MajorGC的耗时比较长。因为要扫描再回收。MajorGC会产生内存碎片，当老年代也没有内存分配给新来的对象的时候，就会抛出OOM(Out of Memory)异常。")]),e("p",[r._v("3、永久代")]),e("p",[r._v("永久代指的是永久保存区域。主要存放Class和Meta(元数据)的信息。Classic在被加载的时候被放入永久区域，它和存放的实例的区域不同，在Java8中，词锋代已经被移除，取而代之的是一个称为”元数据区“(元空间)的区域。元空间和永久代类似，都是对JVM中规范方法的实现。不过云空间与永久代之间最大的区别在于：元空间并不在虚拟机中，而是使用本地内存。因此，默认情况下，元空间的大小仅受本地内存的限制。类的元数据放入native memory，字符串池和类的静态变量放入Java堆中。这样可以加载多少类的元数据就不再由MaxPermSize控制，而由系统的实现可用空间来控制。")]),e("p",[r._v("采用元空间而不用永久代的原因：")]),r._m(3),e("p"),e("p"),e("p")],1)},a=[function(){var r=this,i=r.$createElement,e=r._self._c||i;return e("ul",[e("li",[r._v("程序计数器（The pc Register）：当前线程所执行的字节码的行号指示器，用于记录正在执行的虚拟机字节指令地址，线程私有。")]),e("li",[r._v("虚拟机栈（Java Virtual Machine Stacks）：存放基本数据类型、对象的引用、方法出口等，线程私有。")]),e("li",[r._v("堆（Heap）：java内存最大的一块，所有对象实例、数组都存放在堆里，GC回收的地方，线程共享。")]),e("li",[r._v("方法区（Native Method Stacks）：存放已被加载的类信息、常量、静态变量、即时编译器编译后的代码数据等。回收目标主要是常量池的回收和类型的卸载，各线程共享。")])])},function(){var r=this,i=r.$createElement,e=r._self._c||i;return e("ul",[e("li",[r._v("线程私有的三个区域，分别是虚拟机栈、本地方法栈、程序计数器")]),e("li",[r._v("本地内存（或者说非堆）包含元数据区和直接内存，其中元数据区又包含方法区和运行时常量池")]),e("li",[r._v("堆区，它是JVM上最大的内存区域")])])},function(){var r=this,i=r.$createElement,e=r._self._c||i;return e("ul",[e("li",[r._v("Eden区：Java新创建的对象绝大部分会分配在Eden区（如果对象太大，则直接分配到老年代）。当Eden区内存不够的时候，就会触发MinorGC（新生代采用的是复制算法），对新生代进行一次垃圾回收。")]),e("li",[r._v("SurvivorFrom区和To区：在GC开始的时候，对象只会存在于Eden区和名为From的Survivor区，To区是空的，一次MinorGC过后，Eden区和SurvivorFrom区存活的对象会移动到SurvivorTo区中，然后会清空Eden区和SurvivorFrom区，并对存活的对象的年龄+1。如果对象的年龄达到15，则直接分配到老年代。MinorGC完成后，SurvivorFrom区和SurvivorTo区的功能进行互换。下一次MinorGC时，会把SurvivorTo区和Eden区存活的对象放入SurvivorFrom区中，并计算对象存活的年龄。")])])},function(){var r=this,i=r.$createElement,e=r._self._c||i;return e("ul",[e("li",[r._v("为了解决永久代的OOM问题，元数据和class对象存放在永久代中，容易出现性能问题和内存溢出。")]),e("li",[r._v("类及方法的信息等比较难确定其大小，因此对于永久代大小指定比较困难，大小容易出现永久代溢出，太大容易导致老年代溢出(堆内存不变，此消彼长)。")]),e("li",[r._v("永久代会为GC带来不必要的复杂度，并且回收效率偏低。")])])}],n=e("c276"),t={methods:{print:function(){n["a"].print()}}},o=t,_=e("5d22"),l=Object(_["a"])(o,v,a,!1,null,null,null);i["default"]=l.exports}}]);
//# sourceMappingURL=chunk-2d0ddc48.b52e27b6.js.map