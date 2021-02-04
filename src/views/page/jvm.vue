<template>
    <div class="suyan__home">
        <h1>JVM<el-button class="suyan__btn__print" type="primary" plain @click="print">打印pdf</el-button></h1><el-divider></el-divider>
        <p><strong>一、内存区域</strong></p>
<p>1、JVM规范《The Java Virtual Machine Specificati1on, Java SE 8 Edition》2.5 Run-Time Data Areas中描述的运行时数据区分为6个区域</p>
<ul>
<li>程序计数器（The pc Register）：当前线程所执行的字节码的行号指示器，用于记录正在执行的虚拟机字节指令地址，线程私有。</li>
<li>虚拟机栈（Java Virtual Machine Stacks）：存放基本数据类型、对象的引用、方法出口等，线程私有。</li>
<li>堆（Heap）：java内存最大的一块，所有对象实例、数组都存放在堆里，GC回收的地方，线程共享。</li>
<li>方法区（Native Method Stacks）：存放已被加载的类信息、常量、静态变量、即时编译器编译后的代码数据等。回收目标主要是常量池的回收和类型的卸载，各线程共享。</li>
</ul>
<p>2、具体虚拟机实现角度</p>
<p>Java8内存区域划分大致分为6个区域：</p>
<ul>
<li>线程私有的三个区域，分别是虚拟机栈、本地方法栈、程序计数器</li>
<li>本地内存（或者说非堆）包含元数据区和直接内存，其中元数据区又包含方法区和运行时常量池</li>
<li>堆区，它是JVM上最大的内存区域</li>
</ul>
<p><strong>二、JVM内存为什么要分成新生代、老年代、持久代，新生代中为什么要分为Eden和Survivor？</strong></p>
<p>1、新生代:</p>
<p>新生代主要用来存放新生的对象。一般占据堆空间的1/3。在新生代中，保存着大量的刚刚创建的对象，但是大部分的对象都是朝生夕死，所以在新生代中会频繁的进行MinorGC，进行垃圾回收。新生代又细分为三个区：Eden区、SurvivorFrom、SurvivorTo区，三个区的默认比例为8：1：1。</p>
<ul>
<li>Eden区：Java新创建的对象绝大部分会分配在Eden区（如果对象太大，则直接分配到老年代）。当Eden区内存不够的时候，就会触发MinorGC（新生代采用的是复制算法），对新生代进行一次垃圾回收。</li>
<li>SurvivorFrom区和To区：在GC开始的时候，对象只会存在于Eden区和名为From的Survivor区，To区是空的，一次MinorGC过后，Eden区和SurvivorFrom区存活的对象会移动到SurvivorTo区中，然后会清空Eden区和SurvivorFrom区，并对存活的对象的年龄+1。如果对象的年龄达到15，则直接分配到老年代。MinorGC完成后，SurvivorFrom区和SurvivorTo区的功能进行互换。下一次MinorGC时，会把SurvivorTo区和Eden区存活的对象放入SurvivorFrom区中，并计算对象存活的年龄。</li>
</ul>
<p>2、老年代</p>
<p>老年代主要存放应用中生命周期长的内存对象。老年代比较稳定，不会频繁的进行MajorGC。而在MajorGC之前才会先进行一次MinorGC，使得新生的对象进入老年代而导致空间不够才会触发。当无法找到足够大的连续分配给新创建的较大对象也会提前触发一次MajorGC，进行垃圾回收腾出空间。</p>
<p>在老年代中，MajorGC采用了标记-清除算法：首先扫描一次所有老年代里的对象，标记处存活的对象，然后回收没有标记的对象。MajorGC的耗时比较长。因为要扫描再回收。MajorGC会产生内存碎片，当老年代也没有内存分配给新来的对象的时候，就会抛出OOM(Out of Memory)异常。</p>
<p>3、永久代</p>
<p>永久代指的是永久保存区域。主要存放Class和Meta(元数据)的信息。Classic在被加载的时候被放入永久区域，它和存放的实例的区域不同，在Java8中，词锋代已经被移除，取而代之的是一个称为&rdquo;元数据区&ldquo;(元空间)的区域。元空间和永久代类似，都是对JVM中规范方法的实现。不过云空间与永久代之间最大的区别在于：元空间并不在虚拟机中，而是使用本地内存。因此，默认情况下，元空间的大小仅受本地内存的限制。类的元数据放入native memory，字符串池和类的静态变量放入Java堆中。这样可以加载多少类的元数据就不再由MaxPermSize控制，而由系统的实现可用空间来控制。</p>
<p>采用元空间而不用永久代的原因：</p>
<ul>
<li>为了解决永久代的OOM问题，元数据和class对象存放在永久代中，容易出现性能问题和内存溢出。</li>
<li>类及方法的信息等比较难确定其大小，因此对于永久代大小指定比较困难，大小容易出现永久代溢出，太大容易导致老年代溢出(堆内存不变，此消彼长)。</li>
<li>永久代会为GC带来不必要的复杂度，并且回收效率偏低。</li>
</ul>
<p>4、新生代中为什么要分为Eden和Survivor</p>
<ul>
<li>如果没有Survivor区会出现什么情况：此时每触发一次MinorGC，就会把Eden区的对象复制到老年代，这样当老年代满了之后会触发MajorGC，比较耗时。</li>
<li>如果只有一个Survivor区，那当Eden区满了之后，就会复制对象到Survivor区，容易产生内存碎片化，严重影响性能。</li>
<li>使用2个Survivor区，始终保持有一个空的Survivor区，可以避免内存碎片化。</li>
</ul>
<p><strong>三、JVM中一次完整的GC流程是怎样的，对象如何晋升老年代？</strong></p>
<p>对象优先在新生代区中分配，若没有足够空间，Minor GC；&nbsp;</p>
<p>大对象（需要大量连续内存空间）直接进入老年态；长期存活的对象进入老年态。如果对象在新生代出生并经过第一次MGC后仍然存活，年龄+1，若年龄超过一定限制（15），则被晋升到老年态。</p>
<p><strong>四、你知道的垃圾收集器，各自的优缺点</strong></p>
<div><span style="background-color: #ced4d9;">1、Serial收集器：</span></div>
<div>最基本、历史最悠久的垃圾收集器。<br />它的单线程的意义不仅仅意味着它只会使用一条垃圾收集器线程去完成垃圾收集工作，更重要的是它在进行垃圾收集器工作的时候必须暂停其他所以的工作线程(Stop The World)，直到它收集结束<br />特点：</div>
<ol>
<li>针对新生代的收集器</li>
<li>采用复制算法</li>
<li>单线程收集</li>
<li>进行垃圾收集时，必须暂停所有工作线程，直到完成</li>
</ol>
<div>配置参数：-XX:+UseSerialGC<br />应用场景：</div>
<ol>
<li>依然是HotSpot在Client模式下默认的新生代收集器</li>
<li>对于限定单个CPU的环境来说，Serial收集器没有线程交互开销，可以获得最高的单线程收集效率</li>
<li>在用户的桌面应用场景中，可用内存一般不大，可以在较短时间内完成垃圾收集，只要不频繁发生，这是可以接受的</li>
</ol>
<p><span style="background-color: #ced4d9;">2、ParNew收集器</span></p>
<div>Serial收集器的多线程版本，除了使用多线程进行垃圾收集外，其余行为(控制参数、收集算法、回收策略)都一样，也需要stop the world，目前只有它能与CMS收集器配合工作<br />配置参数：-XX:+UseParNewGC<br />为什么只有ParNew能与CMS收集器配合？</div>
<ol>
<li>CMS是HotSpot在JDK1.5推出的第一款真正意义上的并发收集器，第一次实现了垃圾回收器线程与用户线程(基本上)同时工作</li>
<li>CMS作为老年收集器，但却无法与JDK1.4已经存在的新生代收集器Parallel Scavenge配合工作</li>
<li>因为Parallel Scavenge(以及G1)都没有使用传统的GC收集器代码框架，而另外单独实现；而其余几种收集器则共用了部分的框架代码</li>
</ol>
<p><span style="background-color: #ced4d9;">3、Parallel Scavenge收集器</span></p>
<p>新生代收集器，复制算法，并行多线程收集器。Parallel Scavenge收集器关注点是吞吐量，CMS等关注点是用户线程的停顿时间。所谓吞吐量就是CPU中用于运行用户代码的时间与CPU总消耗时间的比值。<br />应用场景：</p>
<ol>
<li>高吞吐量为目标，即减少垃圾收集时间，让用户代码获得更长运行时间</li>
<li>当应用程序运行在具有多个CPU上，对暂停时间没有特别高的要求时。即程序主要在后台进行计算，而不需要与用户太多交互</li>
<li>批量处理、订单处理、工资支付、科学计算的应用程序</li>
</ol>
<div>两个参数用于精确控制吞吐量：<br />控制最大垃圾收集停顿时间：-XX:MaxGCPauseMillis<br />设置垃圾收集时间占总时间的比率：-XX:GCTimeRatio<br />GC自适应调教策略：-XX:+UseAdptiveSizePolicy</div>
<div><span style="background-color: #ced4d9;">4、Serial Old收集器</span></div>
<div>
<div>标记-整理-压缩算法，是Serial收集器的老年代版本，单线程收集器。<br />应用场景：</div>
<ol>
<li>主要用于Client模式</li>
<li>在Server模式：在JDK1.5及以前，与Parallel Scavenge收集器搭配使用，1.6有Parallel Old搭配Parallel Scavenge收集器；作为CMS收集器的后备预案，在并发收集发生Concurrent Mode Failure时使用</li>
</ol>
<p><span style="background-color: #ced4d9;">5、Parallel Old收集器</span></p>
<p>是Parallel Scavenge收集器的老年代版本，使用多线程，标记-整理算法。1.6才有</p>
<p>配置参数：-XX:+UseParallelOldGC</p>
<div>应用场景：</div>
<ol>
<li>JDK1.6之后用来代替老年代的Serial Old收集器</li>
<li>特别是在Server模式，多CPU情况下，这样在注重吞吐量已经CPU资源敏感的场景，就有了Parallel Old搭配Parallel Scavenge收集器的应用组合</li>
</ol>
<div><span style="background-color: #ced4d9;">6、CMS(Concurrent Mark Sweep)收集器</span></div>
<div><span style="background-color: #ced4d9;"><span style="background-color: #ffffff;">CMS(Concurrent Mark Sweep)收集器是一种以获取最短回收停顿时间为目标的收集器。它非常适合在注重用户体验的应用上使用。采用标记清除算法，运作过程：初始标记、并发标记、重新标记、并发清除，手机结束会产生大量空间碎片。CMS是HotSpot在JDK1.5推出的第一款真正意义上的并发收集器。</span></span></div>
<div><span style="background-color: #ced4d9;"><span style="background-color: #ffffff;">配置参数：-XX:+UseConcMarkSweepGC</span></span></div>
<div>
<div>应用场景：</div>
<ol>
<li>与用户交互较多的场景</li>
<li>希望系统停顿时间最短，注重服务的响应速度</li>
</ol>
<div>运作过程：</div>
<ol>
<li>初始标记：暂停所有的其它线程，初始标记仅仅标记GC Roots能直接关联到的对象，速度很快</li>
<li>并发标记：是进行GC Roots Tracing的过程，同时开启GC和用户线程，用一个闭包结构去记录可达对象。但在这个阶段结束，这个闭包结构并不能保证包含当前所有的可达对象。因为用户线程可能会不断的更新引用域，所以GC线程无法保证可达性分析的实时性。所以这个算法会跟踪记录这些发生引用更新的地方</li>
<li>重新标记：就是为了修正并发标记期间因为用户程序继续运行而导致标记产生变动的那一部分对象的标记记录(采用多线程并行来提升效率)；需要Stop The World，且停顿时间比初始标记稍长，但远比并发标记端</li>
<li>并发清除：开启用户线程，用时GC线程开始对为标记的区域做清扫，回收所有的垃圾对象</li>
</ol>
<p>缺点：</p>
<ol>
<li>对CPU资源敏感：在并发阶段，虽然不会导致用户线程停顿，但会因为占用了一部分线程(CPU资源)而导致应用程序变慢，总吞吐量会降低。</li>
<li>无法处理浮动垃圾：在并发清除时，用户线程新产生的垃圾，称为浮动垃圾。解决办法：设置CMS预留老年代内存空间-XX:CMSInitiatingOccupancyFraction</li>
<li>产生大量内存碎片：由于CMS是标记清除算法来回收老年代对象的，因此长时间运行后会产生大量的空间碎片问题，可能导致新生代对象晋升到老年代失败。解决办法：使用-XX:+UseCMSCompactAtFullCollection(不进行Full GC，而开启内存碎片的合并整理过程，默认开启，但不会进行，需要配合下一个参数使用)和-XX:+CMSFULLGCsBeforeCompaction(在多少次不压缩的Full GC之后，对空间碎片进行压缩整理，默认为0，也就是不会进行压缩整理)结合使用</li>
</ol>
<p><span style="background-color: #ced4d9;">7、G1收集器</span></p>
</div>
<div>上一代的垃圾收集器(串行serial，并行parallel，CMS)都把堆内存划分为固定大小的三个部分：年轻代、老年代、持久态<br />G1(Garbage-First)是JDK7-u4才推出商用的收集器。标记清理，精确控制停顿，划分Java堆区域，维护优先列表。<br />G1是一款面向服务器的垃圾收集器，主要针对配备多颗处理器及大容量内存的及其。以极高概率满足GC停顿时间要求的同时，还具备高吞吐量性能特征。被视为JDK1.7中HotSpot虚拟机的一个重要进化特征。G1的使命是在未来替换CMS，并且在JDK1.9已经成为默认的收集器。<br />特点：<br />1.并行与并发：G1能充分利用CPU、多核环境下的硬件优势，使用多个CPU来缩短stop-the-world停顿时间。部分其他收集器原本需要停顿Java线程执行的GC动作，G1收集器仍然可以通过并发的方式让Java程序继续执行。<br />2.分代收集：虽然G1可以不需要其他收集器配合就能独立管理整个GC堆，但还是保留了分代的概念。</div>
<ol>
<li>能独立管理整个GC堆(新生代和老年代)，而不需要与其他收集器搭配</li>
<li>能够采用不同方式处理不同时期的对象</li>
<li>虽然保留分代概念，但Java堆的内存布局有很大差别</li>
<li>将整个堆划分为多个大小相等的独立区域(Region)</li>
<li>新生代和老年代不再是物理隔离，它们都是一部分Region(不需要连续)的集合</li>
</ol>
<div>3.空间整合：与CMS的标记-清理算法不同，G1从整体来看是基于标记整理算法实现的，从局部上来看是基于复制算法实现的。</div>
<ol>
<li>从整体看，是基于标记整理算法</li>
<li>从局部(两个Region间)看，是基于复制算法，这是一种类似火车算法的实现，不会产生内存碎片，有利于长时间运行(火车算法是分代收集器所用的算法，目的是在成熟对象空间中提供限定时间的渐进收集)</li>
</ol>
<div>4.可预测的停顿：降低停顿时间是G1和CMS共同的关注点，但G1除了追求低停顿外，还能建立可预测的停顿时间模型。可以明确指定M毫秒时间片内，垃圾收集消耗的时间不超过N毫秒。在低停顿的同时实现高吞吐量</div>
</div>
<div>为什么G1可以实现可预测停顿？</div>
<div>
<ol>
<li>可以有计划地避免在Java堆的进行全区域的垃圾收集</li>
<li>G1收集器将内存大小相等的独立区域(Region)，新生代和老年代概念保留，但是已经不再物理隔离</li>
<li>G1跟踪各个Region获得其收集价值大小，在后台维护一个优先列表</li>
<li>每次根据允许的收集时间，优先回收价值最大的Region(名称Garbage-First的由来)</li>
</ol>
<p>一个对象被不同区域引用的问题：</p>
<p>一个Region不可能是孤立的，一个Region中的对象可能被其它任意Region中对象引用，判断对象存活时，是否需要扫描整个Java堆才能保证准确？<br />解决办法：无论G1还是其它分代收集器，JVM都是使用Remembered Set来避免全局扫描，每个Region都有一个对应的Remembered Set。每次Reference类型数据写操作时，都会产生一个Write Barrier暂停中断操作。然后检查将要写入的引用指向的对象是否和该Reference类型数据在不同的Region(其它收集器检查老年代对象是否引用了新生代对象)。如果不同，通过CardTable把相关引用信息记录到引用指向对象所在Region对应的Remembered Set中。当进行垃圾收集时，在GC根节点的枚举范围加入Remembered Set。就可以保证不进行全局扫描，也不会有遗漏</p>
<p>配置参数：</p>
<p>-XX:+UseG1GC：使用G1收集器<br />-XX:InitiatingHeapOccupancyPercent：当整个Java堆的占用率达到参数值时，开始并发标记阶段；默认45<br />-XX:MaxGCPauseMillis：为G1设置暂停时间目标，默认为200毫秒<br />-XX:G1HeapRegionSize：设置每个Region大小，范围1MB到32MB；目标是最小Java堆时可以拥有约2048个Region<br />-XX:G1NewSizePercent：新生代最小值，默认值5%<br />-XX:G1MaxNewSizePercent：新生代最大值，默认值60%<br />-XX:ParallelGCThreads：设置STW期间，并行GC线程数<br />-XX:ConcGCThreads：设置并发标记阶段，并行执行的线程数</p>
</div>
<p>应用场景：</p>
<p>1.面向服务端应用，针对具有大内存、多处理器的机器<br />2.最主要的应用是为需要低GC延迟，并具有大堆的应用程序提供解决方案<br />具体什么情况用G1比CMS好：(不是绝对)<br />&nbsp;1.超过50%的Java堆被活动数据占用<br />&nbsp;2.对象分配评率或年代的提示频率变化很大<br />&nbsp;3.GC停顿时间过长(长于0.5至1秒)<br />建议：<br />1.如果现在采用的收集器没有出现问题，不用急着去选择G1<br />2.如果应用程序追求低停顿，可以尝试选择G1<br />3.是否替代CMS只有需要实际场景测试才知道</p>
<div><strong>五、垃圾收集算法</strong></div>
<div>1、引用计数算法：给对象中添加一个引用计数器，每当有一个地方引用它时，计数器值就加1；当引用失效时，计数器值就减1；任何时刻计数器为0的对象就是不可能再被使用的。这种方式一方面无法区分软、虚、弱、强引用类别。并一方面，会造成死锁。假设两个对象相互引用始终无法释放counter，永远不能GC。</div>
<div>2、可达性分析算法(根搜索算法)：通过一系列为GC Roots的对象作为起始点，从这些节点向下搜索，搜索所走过的路径被称为引用链。当一个对象到GC Roots没有任何引用链相连时，则证明该对象是不可用。可作为GC Roots的对象包括：虚拟机栈(栈帧中的本地变量表)中引用的对象、方法区中类静态属性引用的对象、方法区中常量引用的对象、本地方法栈中JNI(即一般说的Native方法)引用的对象。</div>
<div>3、标记清除算法：是一种非常基础和常见的垃圾收集算法，该算法被J.McCarthy等人在1960年提出并应用于Lisp语言。</div>
<div>执行过程：当堆中的有效内存空间(available memory)被耗尽的时候，就会停止整个程序(stop the world)，然后进行两项工作，第一项是标记，第二项是清除。</div>
<ul>
<li>标记：Collector从引用根节点开始遍历，标记所有被引用的对象。一般是在对象的Header中记录为可达对象。</li>
<li>清除：Collector对堆内存从头到尾进行线性遍历，如果发现某个对象在Header中没有标记为可达对象，则将其回收。</li>
</ul>
<p>缺点：</p>
<ul>
<li>效率不算高</li>
<li>在进行GC的时候，需要停止整个应用过程，导致用户体验差</li>
<li>这种方式清理出来的空闲内存是不连续的，产生内存碎片。需要维护一个空闲列表</li>
</ul>
<p>这里所谓的清除并不是真的置空，而是把需要清除的地址保存在空闲的地址列表里。下次有新对象需要加载时，判断垃圾的位置空间是否够，如果够就存放。</p>
<div>5、复制算法：将内存划分为两个区间，在任意时间点，所有动态分配的对象都只能分配在其中一个区间(称为活动区间)，而另外一个区间(称为空闲区间)则是空的。当有效内存空间耗尽时，JVM将暂停程序运行，开始复制算法GC线程。接下来GC线程会将活动区间内的存活对象，全部复制到空闲区间，且严格按照内存地址依次排列，与此同时，GC线程将更新存活对象的内存引用地址指向新的内存地址。此时，空闲区间已经与活动区间交换，而垃圾对象现在已经全部留在了原来的活动区间，也就是现在的空闲区间。事实上，在活动区间转换为空闲区间的同时，垃圾对象已经被一次性全部回收。</div>
<div>缺点：</div>
<ul>
<li>浪费了一半的内存</li>
<li>如果对象的存活率很高，假设是100%存活，那么需要将所有对象都复制一遍，并将所有的引用地址重置一遍。复制这一个工作所花费的时间，在对象存活率达到一定程度时，将会变的不可忽视。</li>
</ul>
<div>6、标记整理算法：与标记清除算法非常相似，也是分为两个阶段：标记和整理。</div>
<ul>
<li>标记：第一个阶段与标记清除算法是一样的，均是遍历GC Roots，然后将存活的对象标记。</li>
<li>整理：移动所有存活的对象，且按照内存地址次序依次排列，然后将末端地址以后的内存全部回收。</li>
</ul>
<p>标记的存活对象将会被整理，按照内存地址依次排列，而未被标记的内存会被清理掉。当我们需要给新对象分配内存时，JVM只需要持有一个内存的起始地址即可，这比维护一个空闲列表少了许多开销。</p>
<div>7、分代收集算法：在Java虚拟机分代垃圾回收机制中，应用程序可用的堆空间可以分为年轻代和老年代，年轻代分为Eden区和From区与To区。当系统创建一个对象的时候，总是在Eden区域操作，当这个区满了，就会触发一次YoungGC，也就是年轻代的垃圾回收。一般来说这时候不是所有的对象都没用了，所以就会把还能用的对象复制到From区。这样整个Eden区就被整理干净了，可以继续创建新的对象。当Eden区再次被用完，就再触发一次YoungGC。这次触发YoungGC后，会将Eden区与From区还在被使用的对象复制到To区，再下一次YoungGC的时候，则是将Eden区与To区中还在使用的对方复制到From区。经过若干次YoungGC后，有些对象在From与To之间来回游荡，这时候From区与To区亮出了底线(阙值)，这些还没挂掉的对象会被复制到老年代。老年代空间被用完，就会执行FullGC，也就是全量回收。</div>
<p><strong>六、类加载的过程</strong></p>
<ol>
<li>加载(Loading)：读取类文件产生二进制流，并转为特定数据结构，初步校验cafe babe魔法书、常量池、文件长度、是否有父类等，然后创建对应类的java.lang.Class对象。</li>
<li>验证(Verification)：文件格式验证、元数据验证、字节码验证、符号引用验证。</li>
<li>准备(Preparation)：正式为类变量分配内存并设置初始值。</li>
<li>解析(Resolution)：把间接引用转换为直接引用。</li>
<li>初始化(Initializtion)：执行&lt;clinit&gt;方法，初始化类变量、静态代码库</li>
<li>使用(Using)</li>
<li>卸载(Unloading)</li>
</ol>
<p><strong>七、说说你了解的类加载器</strong></p>
<p>类加载器就是根据指定全限名称将class文件加载到JVM内存，转成Class对象。</p>
<ul>
<li>启动类加载器(Bootstrap ClassLoader)：由C++语言实现(针对HotSpot)，负责将存放在&lt;JAVA_HOMT&gt;\lib目录或-XBootclasspath参数指定的路径中的类库加载到内存中。</li>
<li>扩展类加载器(Extension ClassLoader)：负责加载&lt;JAVA_HOME&gt;\lib\ext目录或java.ext.dirs系统变量指定的路径中国的所有类库。</li>
<li>应用程序加载器(Application ClassLoader)：负责加载用户类路径(classpath)上指定的类库，我们可以直接使用这个类加载器。一般情况，如果我们没有自定义类加载器默认就是用这个加载器。</li>
<li>双亲委派模式：双亲委派模式是在Java 1.2后引入的，其工作原理的是，如果一个类加载器收到了类加载请求，它并不会自己先去加载，而是把这个请求委托给父类的加载器去执行，如果父类加载器还存在其父类加载器，则进一步向上委托，依次递归，请求最终将到达顶层的启动类加载器，如果父类加载器可以完成类加载任务，就成功返回，倘若父类加载器无法完成此加载任务，子加载器才会尝试自己去加载，这就是双亲委派模式。采用双亲委派模式的是好处是Java类随着它的类加载器一起具备了一种带有优先级的层次关系，通过这种层级关可以避免类的重复加载，当父亲已经加载了该类时，就没有必要子ClassLoader再加载一次。其次是考虑到安全因素，java核心api中定义类型不会被随意替换，假设通过网络传递一个名为java.lang.Integer的类，通过双亲委托模式传递到启动类加载器，而启动类加载器在核心Java API发现这个名字的类，发现该类已被加载，并不会重新加载网络传递的过来的java.lang.Integer，而直接返回已加载过的Integer.class，这样便可以防止核心API库被随意篡改。</li>
</ul>
<p>怎么打破双亲委派模型：不仅要基础ClassLoader类，还要重新loadClass和findClass方法。</p>
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