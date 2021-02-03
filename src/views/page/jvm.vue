<template>
    <div class="suyan__home">
        <h1>JVM<el-button class="suyan__btn__print" type="primary" plain @click="print">打印pdf</el-button></h1><el-divider></el-divider>
        <p>一、内存区域</p>
<p>1、JVM规范《The Java Virtual Machine Specificati1on, Java SE 8 Edition》2.5 Run-Time Data Areas中描述的运行时数据区分为6个区域</p>
<ul>
<li>程序计数器（The pc Register）：当前线程所执行的字节码的行号指示器，用于记录正在执行的虚拟机字节指令地址，线程私有。</li>
<li>虚拟机栈（Java Virtual Machine Stacks）：存放基本数据类型、对象的引用、方法出口等，线程私有。</li>
<li>堆（Heap）：java内存最大的一块，所有对象实例、数组都存放在堆里，GC回收的地方，线程共享。</li>
<li>方法区（Native Method Stacks）：存放已被加载的类信息、常量、静态变量、即时编译器编译后的代码数据等。回收目标主要是常量池的回收和类型的卸载，各线程共享。</li>
</ul>
<p>二、JVM内存为什么要分成新生代、老年代、持久代，新生代中为什么要分为Eden和Servivor？</p>
<p>1、新生代:</p>
<p>&nbsp; &nbsp; 新生代主要用来存放新生的对象。一般占据堆空间的1/3。在新生代中，保存着大量的刚刚创建的对象，但是大部分的对象都是朝生夕死，所以在新生代中会频繁的进行MinorGC，进行垃圾回收。新生代又细分为三个区：Eden区、SurvivorFrom、SurvivorTo区，三个区的默认比例为8：1：1。</p>
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