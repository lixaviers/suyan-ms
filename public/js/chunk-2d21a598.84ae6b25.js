(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d21a598"],{baad:function(e,n,t){"use strict";t.r(n);var o=function(){var e=this,n=e.$createElement,t=e._self._c||n;return t("div",{staticClass:"suyan__home"},[t("h1",[e._v("锁机制"),t("el-button",{staticClass:"suyan__btn__print",attrs:{type:"primary",plain:""},on:{click:e.print}},[e._v("打印pdf")])],1),t("el-divider"),t("h3",[e._v("一、说说线程安全问题")]),t("p",[e._v("线程安全是指要控制多个线程对某个资源的有序访问或修改，而在这些线程之间没有产生冲突。在Java里，线程安全一般体现在两个方面：")]),e._m(0),t("h3",[e._v("二、volatile实现原理")]),t("p",[e._v("用法：volatile通常被比喻成”轻量级的synchronized“，也就是Java并发编程中比较重要的一个关键字。和synchronized不同，volatile是一个变量修饰符，只能用来修饰变量，无法修饰方法及代码块等。volatile的用法比较简单，只需要在声明一个可能被多线程同时访问的变量时，使用volatile修饰就可以了。")]),t("p",[e._v("原理：为了提高处理器的执行速度，在处理器和内存之间增加了多级缓存来提升。但是由于引入了多级缓存，就存在缓存数据不一致的问题。但是，对于volatile变量，当对volatile变量进行写操作的时候，JVM会向处理器发送一个lock前缀的指令，将这个缓存中的变量回写到系统主存中。但是就算写回到内存，如果其他处理器缓存的值还是旧的，再执行计算操作就会有问题。所以在多处理器下，为了保证各个处理器的缓存是一致的，就会实现缓存一致性协议。缓存一致性协议：每个处理器通过嗅探在总线上传播的数据来检查自己缓存的值是不是过期了，当处理器发现自己缓存行对应的内存地址被修改，就会将当前处理器的缓存行设置成无效状态，当处理器要对这个数据进行修改操作的时候，会强制重新从系统内存里把数据读到处理器缓存里。所以，如果一个变量被volatile所修饰的话，在每次数据变化之后，其值都会被强制刷入主存。而其他处理器的缓存由于遵守了缓存一致性协议，也会把这个变量的值从主存加载到自己的缓存中。这就保证了一个volatile在并发编程中，其值在多个缓存中是可见的。")]),t("p",[e._v("volatile与可见性：可见性是指当多个线程访问同一个变量时，一个线程修改了这个变量的值，其它线程能够立即看得到修改的值。Java内存模型规定了所有的变量都存储在主内存中，每条线程还有自己的工作内存，线程的工作内存中保存了该线程中是用到的变量的主内存副本拷贝，线程对变量的所有操作都必须在工作内存中进行，而不能直接读写主内存。不同的线程之间也无法直接访问对方工作内存中的变量，线程间变量的传递均需要自己的工作内存和主存之间进行同步进行。所以，就可能出现线程1改了某个变量的值，但是线程2不可见的情况。volatile关键字就是被其修饰的变量在被修改后可以立即同步到主内存，被其修饰的变量在每次是用之前都从主内存刷新。因此，可以使用volatile来保证多线程操作时变量的可见性。")]),t("p",[e._v("volatile与有序性：有序性即程序执行的顺序按照代码的先后顺序执行。除了引入了时间片以外，由于处理器优化和指令重排等，CPU还可能对输入代码进行乱序执行，比如load->add->save有可能被优化成load->save->add。这就是有可能存在有序性问题。而volatile除了可以保证数据的可见性之外，还有一个强大的功能，那就是它可以禁止指令重排优化等。普通的变量仅仅会保证在该方法的执行过程中所依赖的赋值结果的地方都能获得正确的结果，而不能保证变量的赋值操作的顺序与程序代码中的执行顺序一致。禁止指令重排，这就保证了代码的程序会严格按照代码的先后顺序执行，这就保证了有序性。")]),t("p",[e._v("volatile与原子性：原子性是指一个操作是不可中断的，要全部执行完成，要不就都不执行。线程是CPU调度的基本单位，CPU有时间片的概念，会根据不同的调度算法进行线程调度。当一个线程获得时间片之后开始执行，在时间片耗尽之后，就会失去CPU使用权。所以在多线程场景下，由于时间片在线程间轮换，就会发生原子性问题。为了保证原子性，需要通过字节码指令monitorenter和monitorexit，但是volatile和这两个指令之间是没有任何关系的。所以，volatile是不能保证原子性的。")]),e._m(1),t("h3",[e._v("三、Synchronized底层原理")]),t("h4",[e._v("3.1 synchronized的特性")]),e._m(2),t("h4",[e._v("3.2 用法")]),t("p",[e._v("synchronized可以修饰静态方法、成员函数，同时还可以直接定义代码块，但是归根结底它上锁的资源只有两类：一个是对象，一个是类。")]),t("h4",[e._v("3.3 实现")]),t("p",[e._v("synchronized有两种形式上锁，一个是对方法上锁，一个是构造同步代码块。它们的底层实现其实都一样，在进入同步代码之前先获取锁，获取到锁之后锁的计数器+1，同步代码执行完锁的计数器-1，如果获取失败就阻塞式等待锁的释放。只是它们在同步块识别方式上有所不一样，从class字节码文件可以表现出来，一个是通过方法flags标志，一个是monitorenter和monitorexit指令操作。")]),t("h4",[e._v("3.4 synchronized锁的底层实现")]),t("p",[e._v("在理解锁实现原理之前先了解一下Java的对象头和Monitor，在JVM中，对象是分为三部分存在的：对象头、实例数据、对其填充。实例数据和对其填充与synchronized无关，实例数据存放类的属性数据信息，包括父类的属性信息，如果是数组的实例部分还包括数字的长度，这部分内存按4字节对其；对其填充不是必须部分，由于虚拟机要求对象起始地址必须是8字节的整数倍，对其填充仅仅是为了使字节对其。对象头是我们需要关注的重点，它是synchronized实现锁的基础，因为synchronized申请锁、上锁、释放锁都与对象头有关。对象头主要结构是由 Mark Word 和 Class Metadata Address 组成，其中 Mark Word 存储对象的hashCode、锁信息或分代年龄或GC标志等信息，Class Metadata Address 是类型指针指向对象的类元数据，JVM通过该指针确定该对象是哪个类的实例。锁也分不同状态，JDK6之前只有两个状态：无锁、有锁(重量级锁)，而在JDK6之后对synchronized进行了优化，新增了两种状态，总共就是四个状态：无锁状态、偏向锁、轻量级锁、重量级锁。锁的类型和状态在对象头 Mark Word 中都有记录，在申请锁、锁升级等过程中JVM都需要读取对象的 Mark Word 数据。每一个锁都对应一个monitor对象，在HotSpot虚拟机中它是由ObjectMonitor实现的(C++实现)。每个对象都存在这一个monitor与之关联，对象与其monitor之间的关系有多种实现方式，如monitor可以与对象一起创建销毁或当线程试图获取对象锁时自动生成，但当一个monitor被某个线程持有后，它便处于锁定状态。ObjectMonitor中有两个队列_WaitSet和_EntryList，用来保存ObjectWaiter对象列表(每个等待锁的线程都会被封装ObjectWaiter对象)，_owner指向持有ObjectMonitor对象的线程，当多个线程同时访问一段同步代码时，首先会进入_EntryList 集合，当线程获取到对象的monitor后进入_Owner 区域并把monitor中的owner变量设置为当前线程，同时monitor中的计数器count加1，若线程调用 wait() 方法，将释放当前持有的monitor，owner变量恢复为null，count自减1，同时该线程进入 WaitSe t集合中等待被唤醒。若当前线程执行完毕也将释放monitor(锁)并复位变量的值，以便其他线程进入获取monitor(锁)。monitor对象存在于每个Java对象的对象头中(存储的指针的指向)，synchronized锁便是通过这种方式获取锁的，也是为什么Java中任意对象可以作为锁的原因，同时也是notify/notifyAll/wait等方法存在于顶级对象Object中的原因。")]),t("h4",[e._v("3.5 JVM对synchronized的优化")]),t("p",[e._v("Java的开发团队一直在对synchronized优化，其中最大一次优化就是在jdk6的时候，新增了两个锁状态，通过锁消除、锁粗化、自旋锁等方法使用各种场景，给synchronized性能带来了很大的提升。")]),t("p",[e._v("3.5.1、锁膨胀：上面讲到锁有四种状态，并且会因实际情况进行膨胀升级，其膨胀方向是：无锁 -> 偏向锁 -> 轻量级锁 -> 重量级锁，并且膨胀方向不可逆。")]),e._m(3),t("p",[e._v("3.5.2、锁消除：是虚拟机另外一种锁的优化，这种优化更彻底，在JIT编译时，对运行上下文进行扫描，去除不可能存在竞争的锁。")]),t("p",[e._v("3.5.3、锁粗化：是虚拟机对另一种极端情况的优化处理，通过扩大锁的范围，避免反复加锁和释放锁。")]),t("p",[e._v("3.5.4、自旋锁与自适应自旋锁：轻量级锁失败后，虚拟机为了避免线程真实地在操作系统层面挂起，还会进行一项称为自旋锁的优化手段。")]),e._m(4),e._m(5),t("h3",[e._v("四、Lock")]),t("p",[e._v("Lock是jdk1.5后新增的。")]),e._m(6),t("p",[e._v("Lock不是Java语言内置的，synchronized是Java语言的关键字，因此是内置特效。Lock是一个类，通过这个类可以实现同步访问。Lock和synchronized有一点非常大的不同，采用synchronized不需要用户去手动释放锁，当synchronized方法或者synchronized代码块执行完成之后，系统会自动让线程释放对象锁的占用。而Lock则必须要用户去手动释放锁，如果没有主动释放锁，就有可能出现导致出现死锁现象。")]),t("h4",[e._v("synchronized的局限性与Lock的优点")]),t("p",[e._v("如果一个代码块被synchronized关键字修饰，当一个线程获取了对应的锁，并执行该代码块时，其它线程便只能一直等到直至占有锁的线程释放锁。事实上，占有锁的线程释放锁一般会是以下三种情况之一：")]),e._m(7),t("p",[e._v("试着考虑以下三种情况：")]),e._m(8),t("p",[e._v("Lock接口")]),e._m(9),e._m(10),t("h3",[e._v("五、悲观锁 乐观锁")]),t("p",[e._v("乐观锁、悲观锁是一种思想，可以用在很多方面。")]),e._m(11),t("p",[e._v("本质来说，悲观锁认为总是有人抢我，乐观锁认为基本没人抢。")]),t("h4",[e._v("CAS 乐观锁")]),t("p",[e._v("乐观锁是一种思想，即认为读多写少，遇到并发写的可能性比较低，所以采取在写时先读出当前版本号，然后加锁操作(比较根上一次的版本号，如果一样则更新)，如果失败则要重复读-比较写的操作。")]),t("p",[e._v("CAS是一种更新的原子操作，比较当前值跟传入值是否一样，一样则更新，否则失败。CAS顶多算是乐观锁写那一步操作的一种实现罢了，不用CAS自己加锁也是可以的。")]),t("h4",[e._v("ABA问题")]),t("p",[e._v("ABA：如果另一个线程修改V值，假设原来是A，先修改成B，在修改成A，当前线程的CAS操作无法分辨当前V值是否发生过变化。")]),t("p"),t("p")],1)},i=[function(){var e=this,n=e.$createElement,t=e._self._c||n;return t("ol",[t("li",[e._v("多个thread对同一个Java实例的访问(read和modify)不会相互干扰，它主要体现在关键字synchronized。如ArrayList和Vector，HashMap和HashTable(后者每个方法前都有synchronized关键字)。如果你在操作一个List对象时，其它线程remove一个element，问题就出现了。")]),t("li",[e._v("每个线程都有自己的字段，而不会在多个线程之间共享。它主要体现在java.lang.ThreadLocal类，而没有Java关键字支持，如像static、transient那样。")])])},function(){var e=this,n=e.$createElement,t=e._self._c||n;return t("p",[t("a",{attrs:{href:"https://blog.csdn.net/zezezuiaiya/article/details/81456060",target:"_blank",rel:"noopener"}},[e._v("参考文章")])])},function(){var e=this,n=e.$createElement,t=e._self._c||n;return t("ul",[t("li",[e._v("原子性：所谓原子性就是指一个操作或者多个操作，要么全部执行并且执行的过程中不会被任何因素打断，要么就都不执行。在Java中，对基本数据类型的变量的读取和赋值操作是原子性操作，即这些操作都不可被中断，要么执行，要么不执行。但是像i++、i+=1等操作字符就不是原子性的，它们是分成读取、计算、赋值几步操作，原值在这些步骤还没完成时就可能已经被赋值了，那么最后赋值写入的数据就是脏数据，无法保证原子性。被synchronized修饰的类或对象的所有操作都是原子的，因为在执行操作之前必须先获得类或对象的锁，直到执行完才能释放，这中间的过程无法被中断(除了已经废弃的stop()方法)，即保证了原子性。"),t("span",{staticStyle:{color:"#e03e2d"}},[e._v("synchronized保证原子性，volatile不具备原子性。")])]),t("li",[e._v("可见性：可见性是指多个线程访问同一个资源时，该资源的状态、值信息等对于其他线程都是可见的。synchronized和volatile都具有可见性，其中synchronize对一个类或对象加锁时，一个线程如果要访问该类或对象必须先获得它的锁，而这个锁的状态对于其他任何线程都是可见的，并且在释放锁之前会将对变量的修改刷新到主存中，保证资源变量的可见性，如果某个线程占用了该锁，其他线程就必须在锁池中等待锁的释放。")]),t("li",[e._v("有序性：Java允许编译器和处理器对指令进行重排，但是指令重排并不会影响单线程的顺序，它影响的是多线程并发执行的顺序性。synchronized保证了每个时刻都只有一个线程同步代码块，也就确定了线程执行同步代码块是分先后顺序的，保证了有序性。")]),t("li",[e._v("可重入性：synchronized和ReentrantLock都是可重入锁。当一个线程视图操作一个由其它线程持有的对象锁的临界资源时，将会处于阻塞状态，但当一个线程再次请求自己持有对象锁的临界资源时，这种情况属于重入锁。通俗一点讲就是说一个线程拥有了锁仍然还可以重复申请锁。")])])},function(){var e=this,n=e.$createElement,t=e._self._c||n;return t("ul",[t("li",[e._v("偏向锁：一句话总结它的作用：减少统一线程获取锁的代价。在大多情况下，锁不存在多线程竞争，总是由同一线程多长获得，那么此时就是偏向锁。核心思想：如果一个线程获得了锁，那么锁就进入偏向模式，此时 Mark Word 的结构也就变为偏向锁结构，当该线程再次请求锁时，无需再做任何同步操作，即获取锁的过程只需检查 Mark Word 的锁标记位为偏向锁以及当前线程ID等于 Mark Word 的ThreadID即可，这样就省去了大量有关锁申请的操作。")]),t("li",[e._v("轻量级锁：是由偏向锁升级而来，当存在第二个线程申请同一个锁时，偏向锁就会升级为轻量级锁。注意这里的第二个线程只是申请锁，不存在两个线程同时竞争锁，可以是一前一后地交替执行同步块。")]),t("li",[e._v("重量级锁：由轻量级锁升级而来，当同一时间有多个线程竞争锁时，锁就会被升级成重量级锁，此时其申请锁带来的开销也就变大。重量级锁一般使用场景会在追求吞吐量，同步块或者同步方法执行较长的场景。")])])},function(){var e=this,n=e.$createElement,t=e._self._c||n;return t("ul",[t("li",[e._v("自旋锁：许多情况下，共享数据的锁定状态持续时间较短，切换线程不值得，通过让线程执行循环等待锁的释放，不让出CPU。如果得到锁，就顺利进入临界区。如果还不能获得锁，那就会将线程在操作系统层面挂起，这就是自旋锁的优化方式。但是它也存在缺点：如果锁被其它线程长时间占用，一直不释放CPU，会带来许多的性能开销。")]),t("li",[e._v("自适应自旋锁：这种相当于是对自旋锁优化方式的进一步优化，它的自旋次数不再固定，其自旋的次数由前一次在同一个锁上的自旋时间及锁的拥有者的状态来决定，这就解决了自旋锁带来的缺点。")])])},function(){var e=this,n=e.$createElement,t=e._self._c||n;return t("p",[t("a",{attrs:{href:"https://cloud.tencent.com/developer/article/1465413",target:"_blank",rel:"noopener"}},[e._v("参考文章")])])},function(){var e=this,n=e.$createElement,t=e._self._c||n;return t("ul",[t("li",[e._v("Lock和ReadWriteLock是两大锁的根接口，Lock代表实现类是ReentrantLock(可重入锁)，ReadWriteLock(读写锁)的代表实现类是ReentrantReadWriteLock。Lock接口支持那些语义不同(重入、公平等)的锁规则，可以在非阻塞式结构的上下文(包括hand-over-hand和锁重排算法)中使用这些规则。ReadWriteLock接口以类似方式定义了一些读取者可以共享而写入者独占的锁。此包只提供了一个实现，即ReentrantReadWriteLock，因为它适用于大部分的标准用法上下文，也可以创建自己的、适用于非标准要求的实现。")]),t("li",[e._v("Condition接口描述了可能会与锁有关的条件变量。这些变量在用法上与使用Object.wait访问的隐式监视器类似，但提供了更强大的功能。需要特别指出的是，单个Lock可能与多个Condition对象关联。为了避免兼容性问题，Condition方法的名称与对应的Object版本中的不同。")])])},function(){var e=this,n=e.$createElement,t=e._self._c||n;return t("ul",[t("li",[e._v("占有锁的线程执行完了该代码块，然后释放对锁的占有。")]),t("li",[e._v("占有锁线程执行发送异常，此时JVM会让线程自动释放锁。")]),t("li",[e._v("占有锁线程进入WAITING状态从而释放锁，例如在线程中调用wait()方法等。")])])},function(){var e=this,n=e.$createElement,t=e._self._c||n;return t("ul",[t("li",[e._v("在使用synchronized关键字的情况下，假如占有锁的线程由于要等待IO或其它原因(比如调用sleep方法)被阻塞了，但是又没有释放锁，那么其它线程就只能一直等待，别无他法。这会极大影响程序执行效率。因此，就需要有一种机制可以不让等待的线程一直无期限地等待下去(比如只等待一定的时间：解决方案 tryLock(long time, TimeUnit unit)或者能够响应中断： 解决方案 lockInterruptibly())，这种情况可以通过Lock解决。")]),t("li",[e._v("当多个线程读写文件时，读操作和写操作会发生冲突现象，写操作和写操作也会发生冲突现象，但是读操作和读操作不会发生冲突现象。但是如果采用synchronized关键字实现同步的话，就会导致一个问题，即当多个线程都只是进行读操作时，也只有一个线程可以进行读操作，其它线程只能等待锁的释放而无法进行读操作。因此，需要一种机制来使得当多个线程都只是进行读操作时，线程之间不会发生冲突。同样地，Lock也可以解决这种方案(ReentrantReadWriteLock)。")]),t("li",[e._v("可以通过Lock得知线程有没有成功获取到锁(ReentrantLock)，这个synchronized无法办到的。")])])},function(){var e=this,n=e.$createElement,t=e._self._c||n;return t("pre",{staticClass:"language-java"},[t("code",[e._v("// 获取锁  \nvoid lock()   \n\n// 如果当前线程未被中断，则获取锁，可以响应中断  \nvoid lockInterruptibly()   \n\n// 返回绑定到此 Lock 实例的新 Condition 实例  \nCondition newCondition()   \n\n// 仅在调用时锁为空闲状态才获取该锁，可以响应中断  \nboolean tryLock()   \n\n// 如果锁在给定的等待时间内空闲，并且当前线程未被中断，则获取锁  \nboolean tryLock(long time, TimeUnit unit)   \n\n// 释放锁  \nvoid unlock() ")])])},function(){var e=this,n=e.$createElement,t=e._self._c||n;return t("p",[t("a",{attrs:{href:"https://www.cnblogs.com/myseries/p/10784076.html",target:"_blank",rel:"noopener"}},[e._v("参考文章")])])},function(){var e=this,n=e.$createElement,t=e._self._c||n;return t("ul",[t("li",[e._v("数据库：悲观锁就是for update(锁定查询的行)，乐观锁就是version字段(比较根上一次的版本号，如果一样则更新，如果失败则要重复读-比价-写的操作)。")]),t("li",[e._v("JDK：悲观锁就是sync，乐观锁就是原子类(内部使用CAS实现)")])])}],r=t("c276"),a={methods:{print:function(){r["a"].print()}}},l=a,c=t("5d22"),v=Object(c["a"])(l,o,i,!1,null,null,null);n["default"]=v.exports}}]);
//# sourceMappingURL=chunk-2d21a598.84ae6b25.js.map