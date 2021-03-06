<template>
    <div class="suyan__home">
        <h1>线程<el-button class="suyan__btn__print" type="primary" plain @click="print">打印pdf</el-button><el-button class="suyan__btn__close" plain @click="closeAside"style="margin-right: 20px;">关闭导航</el-button></h1><el-divider></el-divider>
        <h3>一、线程的生命周期(状态)</h3>
<ol>
<li>新建(new Thread)：当创建一个Thread类的一个实例时，此线程进入新建状态(未被启动)。</li>
<li>就绪(runnable)：线程已经被启动，正在等待分配CPU时间片，也就是说此时线程正在就绪队列中排队等待得到CPU资源。例如：t1.start()。</li>
<li>运行(running)：线程获得CPU资源正在执行任务(run())，此时除非线程自动放弃CPU资源或者有优先级更高的线程进入，线程将一直运行到结束。</li>
<li>死亡(dead)：当线程执行完毕或被其它线程杀死，线程进入死亡状态，这时线程不可能再进入就绪状态等待执行。自然终止：正常运行run()方法后终止。异常终止：调用stop()终止运行。</li>
<li>堵塞(blocked)：由于某种原因导致正在运行的线程让出CPU并暂停自己的执行，即进入堵塞状态。正在睡眠：用sleep()方法可使线程进入睡眠状态，一个睡眠着的线程在指定的时间过去可进入就绪状态。正在等待：调用wait()方法(调用motify()方法回到就绪状态)。被另一个线程所阻塞：调用suspend()方法(调用resume()方法恢复)。</li>
</ol>
<p><a href="https://www.cnblogs.com/langjunnan/p/6444718.html" target="_blank" rel="noopener">参考文章</a></p>
<h3>二、创建线程池</h3>
<ul>
<li>newFixedThreadPool(int nThreads)：创建一个固定长度的线程池，每当提交一个任务就创建一个线程，直到达到线程池的最多数量，这时线程规模将不再变化。当线程发送未预期的错误而结束时，线程池会补充一个新的线程。</li>
<li>newCachedThreadPool()：创建一个可缓存的线程池，如果线程池的规模超过了处理需求，将自动回收空闲线程。而当需求增加时，则可以自动添加新线程，线程池的规模不存在任何限制。</li>
<li>newSignleThreadExecutor()：单线程的Executor，它创建单个工作线程来执行任务，如果这个线程异常结束，会创建一个新的来替代它。它的特点是能确保依照任务在队列中的顺序来串行执行。</li>
<li>newScheduledThreadPool(int corePoolSize)：创建一个固定长度的线程池，而且以低延迟或者定时的方式来执行任务，类似于Timer。</li>
</ul>
<h3>三、线程池核心参数，工作原理</h3>
<h4>3.1 核心参数</h4>
<p>我们可以通过ThreadPoolExecutor来创建一个线程池。</p>
<pre class="language-java"><code>new ThreadPoolExecutor(int corePoolSize, int maximumPoolSize, long keepAliveTime, TimeUnit unit, 
BlockingQueue&lt;Runnable&gt; workQueue, ThreadFactory threadFactory, RejectedExecutionHandler handler);</code></pre>
<p>创建一个线程池输入几个参数：</p>
<ul>
<li>corePoolSize(线程池的基本大小)：当提交一个任务到线程池时，线程池会创建一个线程来执行任务，即使其它空闲的基本线程能够执行新任务也会创建线程。等到需要执行的任务树大于线程池基本大小时就不在创建。如果调用了线程池的prestartAllCoreThreads方法，线程池会提前创建并启动所有基本线程。</li>
<li>maximumPoolSize(线程池最大大小)：线程池允许创建的最大线程数。如果队列满了，并且已创建的线程数大于最大线程数，则线程池会再创建新的线程执行任务。值得注意的是如果使用了无界的任务队列这个参数就没什么效果。</li>
<li>keepAliveTime(线程活动保持时间)：线程池的工作线程空闲后，保持存活的时间。如果任务很多，并且每个任务执行的时间比较短，可以调大这个时间，提高线程的利用率。</li>
<li>timeUnit(线程活动保持时间的单位)：可选的单位有天(DAYS)，小时(HOURS)，分钟(MINUTES)，毫秒(MILLISECONDS)，微秒(MICROSECONDS，千分之一毫秒)和毫微秒(NANOSECONDS，千分之一微秒)。</li>
<li>workQueue(任务队列)：用于保存等待执行的任务的阻塞队列。可选以下几个阻塞队列：</li>
<ol>
<li>ArrayBlockingQueue：一个基于数组结构的有界阻塞队列，此队列按FIFO(先进先出)原则对元素进行排序。</li>
<li>LinkedBlockQueue：一个基于链表结构的阻塞队列，此队列按FIFO(先进先出)原则排序，吞吐量通常要高于ArrayBlockQueue。静态工厂方法Executors.newFixedThreadPool()使用了这个队列。</li>
<li>SynchronousQueue：一个不存储元素的阻塞队列。每个插入操作必须等到另一个线程调用移除操作，否则插入操作一直处于阻塞状态，吞吐量通常要高于LinkedBlockQueue。静态工厂方法Executors.newCachedThreadPool使用了这个队列。</li>
</ol>
<li>threadFactory：用于设置创建线程的工厂，可以通过线程工厂给每个创建处理的线程设置更有意义的名字，Debug和定位问题时非常有帮助。</li>
<li>RejectedExecutionHandler(饱和策略)：当队列和线程池都满了，说明线程池处于饱和状态，那么必须采取一种策略处理提交的新任务。这个策略默认情况下是AbortPolicy，表示无法处理新任务时抛出异常。JDK1.5提供了四种策略：</li>
<ol>
<li>AbortPolicy：直接抛出异常。</li>
<li>CallerRunsPolicy：只用调用者所在线程来运行任务。</li>
<li>DiscardOldestPolicy：丢弃队列里最近的一个任务，并执行当前任务。</li>
<li>DiscardPolicy：不处理，丢弃掉。</li>
<li>也可以根据应用场景需要来实现RejectedExecutionHandler接口自定义策略。如记录日志或持久化不能处理的任务。</li>
</ol>
</ul>
<h4>3.2 向线程池提交任务</h4>
<p>我们可以使用execute提交任务，但是execute方法没有返回值，所以无法判断任务是否被线程池执行成功。</p>
<pre class="language-java"><code>threadsPool.execute(new Runnable() {
	@Override
	public void run() {
	// TODO Auto-generated method stub
	}
});</code></pre>
<p>我们也可以使用submit方法来提交任务，它会返回一个future，可以通过这个future来判断任务是否执行成功，通过future的get方法来获取返回值，get方法会阻塞住直到任务完成。而使用get(long timeout, TimeUnit unit)方法则会阻塞一段时间后立即返回，这时有可能任务没有执行完。</p>
<pre class="language-java"><code>try {
	Object s = future.get();
} catch (InterruptedException e) {
	// 处理中断异常
} catch (ExecutionException e) {
	// 处理无法执行任务异常
} finally {
	// 关闭线程池
	executor.shutdown();
}</code></pre>
<h4>3.3 线程池的关闭</h4>
<p>可以通过调用线程池的shutdown和shutdownNow方法来关闭线程池，但是它们的实现原理不同，shutdown的原理只是将线程池的状态设置为SHUTDOWN状态，然后中断所有没有正在执行任务的线程。shutdownNow的原理是遍历线程池中的工作线程，然后逐个调用线程的interrupt方法来中断线程，所以无法响应中断的任务可能永远无法终止。shutdownNow会首先将线程池的状态设置成STOP，然后尝试停止所有正在执行或暂停任务的线程，并返回等待执行任务的列表。</p>
<p>只要调用了这两个关闭方法的其中一个，isShutdown方法就会返回true。当所有的任务都已关闭后，才表示线程池关闭成功，这时调用isTerminaed方法会返回true。至于应该调用哪一种方法来关闭线程池，应该由提交到线程池的任务特效决定，通常调用shutdown来关闭线程池，如果任务不一定要执行完，则可以调用shutdownNow。</p>
<h4>3.4 线程池的分析</h4>
<p>线程池的只要工作流程如下图：</p>
<p><img style="display: block; margin-left: auto; margin-right: auto;" src="https://raw.githubusercontent.com/lixaviers/suyan-ms/main/src/assets/20210303-112159.jpg" alt="" width="500" height="293" /></p>
<p>当提交一个新任务到线程池时，线程池的处理流程如下：</p>
<ol>
<li>首先线程池判断基本线程池是否已满？没满，创建一个工作线程来执行任务。满了进入下个流程。</li>
<li>其次线程池判断工作队列是否已满？没满，则将新提交的任务存储在工作队列里。满了，则进入下个流程。</li>
<li>最后线程池判断整个线程池是否已满？没满，则创建一个新的工作线程来执行任务。满了，则交给饱和策略来处理这个任务。</li>
</ol>
<p>源代码。线程池执行任务的方法如下：</p>
<pre class="language-java"><code>public void execute(Runnable command) {
	if (command == null)
		throw new NullPointerException();
	//如果线程数小于基本线程数，则创建线程并执行当前任务
	if (poolSize &gt;= corePoolSize || !addIfUnderCorePoolSize(command)) {
	//如线程数大于等于基本线程数或线程创建失败，则将当前任务放到工作队列中。
	if (runState == RUNNING &amp;&amp; workQueue.offer(command)) {
		if (runState != RUNNING || poolSize == 0)
			ensureQueuedTaskHandled(command);
		}
		//如果线程池不处于运行中或任务无法放入队列，并且当前线程数量小于最大允许的线程数量，则创建一个线程执行任务。
		else if (!addIfUnderMaximumPoolSize(command))
			//抛出RejectedExecutionException异常
			reject(command); // is shutdown or saturated
		}
	}
}</code></pre>
<p>工作线程。线程池创建线程时，会将线程封装成工作线程Worker，Worker在执行完任务后，还会无限循环获取工作队列里的任务来执行。我们可以从Worker的run方法里看到这点：</p>
<pre class="language-java"><code>public void run() {
     try {
           Runnable task = firstTask;
           firstTask = null;
            while (task != null || (task = getTask()) != null) {
                    runTask(task);
                    task = null;
            }
      } finally {
             workerDone(this);
      }
}</code></pre>
<h4>3.5 合理的配置线程池</h4>
<p>要想合理的配置线程池，就必须首先分析任务特性，可以从以下几个角度来进行分析：</p>
<ol>
<li>任务的性质：CPU密集型任务，IO密集型任务和混合型任务。</li>
<li>任务的优先级：高，中和低。</li>
<li>任务的执行时间：长，中和短。</li>
<li>任务的依赖性：是否依赖其他系统资源，如数据库连接。</li>
</ol>
<p>任务性质不同的任务可以用不同规模的线程池分开处理。CPU密集型任务配置尽可能少的线程数量，如配置N<sub>cpu</sub>+1个线程的线程池。IO密集型任务则由于需要等待IO操作，线程并不是一直在执行任务，则配置尽可能多的线程，如2*N<sub>cpu</sub>。混合型的任务，如果可以拆分，则将其拆分成一个CPU密集型任务和一个IO密集型任务，只要这两个任务执行的时间相差不是太大，那么分解后执行的吞吐率要高于串行执行的吞吐率，如果这两个任务执行时间相差太大，则没必要进行分解。我们可以通过Runtime.getRuntime().availableProcessors()方法获得当前设备的CPU个数。</p>
<p>优先级不同的任务可以使用优先级队列PriorityBlockingQueue来处理。它可以让优先级高的任务先得到执行，需要注意的是如果一直有优先级高的任务提交到队列里，那么优先级低的任务可能永远不能执行。<br />执行时间不同的任务可以交给不同规模的线程池来处理，或者也可以使用优先级队列，让执行时间短的任务先执行。<br />依赖数据库连接池的任务，因为线程提交SQL后需要等待数据库返回结果，如果等待的时间越长CPU空闲时间就越长，那么线程数应该设置越大，这样才能更好的利用CPU。</p>
<p>建议使用有界队列，有界队列能增加系统的稳定性和预警能力，可以根据需要设大一点，比如几千。有一次我们组使用的后台任务线程池的队列和线程池全满了，不断的抛出抛弃任务的异常，通过排查发现是数据库出现了问题，导致执行SQL变得非常缓慢，因为后台任务线程池里的任务全是需要向数据库查询和插入数据的，所以导致线程池里的工作线程全部阻塞住，任务积压在线程池里。如果当时我们设置成无界队列，线程池的队列就会越来越多，有可能会撑满内存，导致整个系统不可用，而不只是后台任务出现问题。当然我们的系统所有的任务是用的单独的服务器部署的，而我们使用不同规模的线程池跑不同类型的任务，但是出现这样问题时也会影响到其他任务。</p>
<h4>3.6 线程池的监控</h4>
<p>通过线程池提供的参数进行监控。线程池里有一些属性在监控线程池的时候可以使用</p>
<ul>
<li>taskCount：线程池需要执行的任务数量。</li>
<li>completedTaskCount：线程池在运行过程中已完成的任务数量。小于或等于taskCount。</li>
<li>largestPoolSize：线程池曾经创建过的最大线程数量。通过这个数据可以知道线程池是否满过。如等于线程池的最大大小，则表示线程池曾经满了。</li>
<li>getPoolSize：线程池的线程数量。如果线程池不销毁的话，池里的线程不会自动销毁，所以这个大小只增不减。</li>
<li>getActiveCount：获取活动的线程数。</li>
</ul>
<p>通过扩展线程池进行监控。通过继承线程池并重写线程池的beforeExecute，afterExecute和terminated方法，我们可以在任务执行前，执行后和线程池关闭前干一些事情。如监控任务的平均执行时间，最大执行时间和最小执行时间等。</p>
<p><a href="http://ifeve.com/java-threadpool/" target="_blank" rel="noopener">参考文章</a></p>
<h3>四、ThreadLocal原理</h3>
<h4>4.1 理解</h4>
<p>ThreadLocal，很多地方叫做线程本地变量，也有些地方叫做线程本地存储。ThreadLocal为变量在每个线程中都创建了一个副本，那么每个线程可以访问自己内部的副本变量。在每个线程Thread内部有一个ThreadLocal，ThreadLocalMap类型的成员变量threadLocals，就是用来存储实际的变量副本的，键值为当前ThreadLocal变量，value为变量副本(即T类型的变量)。<br />初始化时，在Thread里面，threadLocals为空，当通过ThreadLocal变量调用get()或者set()，就会对Thread类中的threadLocals进行初始化，并且以当前ThreadLocal变量为键值，以ThreadLocal要保存的副本变量为value，存到threadLocals。</p>
<h4>4.2 应用场景</h4>
<p>用来解决数据库连接、session管理等。</p>
<h4>4.3 实现原理</h4>
<p>ThreadLocal是一个泛型类，保证可以接受任何类型的对象。因为一个线程内可以存在多个ThreadLocal对象，所以其实是ThreadLocal内部维护了一个Map，这个Map不是直接使用的HashMap，而是TreadLocal实现的一个叫做ThreadLocalMap的静态内部类。而我们使用的get()、set()其实都是调用了这个ThreadLocalMap类对应的get()、set()。如下：</p>
<pre class="language-java"><code>public void set(T value) {
    Thread t = Thread.currentThread();
    ThreadLocalMap map = getMap(t);
    if (map != null) {
        map.set(this, value);
    } else {
        createMap(t, value);
    }
}</code></pre>
<pre class="language-java"><code>public T get() {
    Thread t = Thread.currentThread();
    ThreadLocalMap map = getMap(t);
    if (map != null)
        return (T)map.get(this);

    // Maps are constructed lazily.  if the map for this thread   
    // doesn't exist, create it, with this ThreadLocal and its   
    // initial value as its only entry.   
    T value = initialValue();
    createMap(t, value);
    return value;
}</code></pre>
<pre class="language-java"><code>void createMap(Thread t, T firstValue) {
    t.threadLocals = new ThreadLocalMap(this, firstValue);
}</code></pre>
<p>ThreadLocalMap是个静态的内部类：</p>
<pre class="language-java"><code>static class ThreadLocalMap {   
    ........
}</code></pre>
<p>最终的变量时放在当前线程的ThreadLocalMap中，并不是存在ThreadLocal上，ThreadLocal可以理解为只是ThreadLocalMap的封装，传递了变量值。</p>
<h4>4.4 内存泄漏问题</h4>
<p>每个thread中都存在一个map，map的类型是ThreadLocal。ThreadLocalMap. Map中的key为一个threadlocal实例，这个Map的确使用了弱引用，不过弱引用只是针对key。每个key都弱引用指向threadlocal。当把threadlocal实例置为null以后，没有任何强引用指向threadlocal实例，所以threadlocal将会被gc回收。但是，我们的value却不能回收，因为存在一条从current thread连接过来的强引用。只有当前thread结束以后，current thread就不会存在栈中，强引用断开，Current Thread，Map，value将全部被GC回收。<br />所以得出一个结论就是只要这个线程对象被gc回收，就不会出现内存泄露，但在threadLocal设为null和线程结束这段时间不会被回收的，就发生了我们认为的内存泄露。其实这是一个对概念理解的不一致，也没什么好争论的。最要命的是线程对象不被回收的情况，这就发生了真正意义上的内存泄露。比如使用线程池的时候，线程结束是不会销毁的，会再次使用的。就可能出现内存泄露。<br />PS：Java为了最小化减少内存泄露的可能性和影响，在ThreadLocal的get，set的时候都会清除线程Map里所有key为null的value。所以最怕的情况就是，threadLocal对象设null了，开始发生&ldquo;内存泄露&rdquo;，然后使用线程池，这个线程结束，线程放回线程池中不销毁，这个线程一直不被使用，或者分配使用了又不再调用get、set方法，那么这个期间就会发生真正的内存泄露。</p>
<p><a href="https://www.cnblogs.com/luxiaoxun/p/8744826.html" target="_blank" rel="noopener">参考文章</a></p>
    </div>
</template>

<script>
import Util from '@/libs/util';
export default {
    methods: {
        print() {
            Util.print();
        },
        closeAside() {
            Util.closeAside();
        }
    }
}
</script>