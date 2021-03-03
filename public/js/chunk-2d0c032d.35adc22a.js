(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d0c032d"],{4182:function(e,t,n){"use strict";n.r(t);var r=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"suyan__home"},[n("h1",[e._v("线程"),n("el-button",{staticClass:"suyan__btn__print",attrs:{type:"primary",plain:""},on:{click:e.print}},[e._v("打印pdf")])],1),n("el-divider"),n("h3",[e._v("一、线程的生命周期(状态)")]),e._m(0),e._m(1),n("h3",[e._v("二、创建线程池")]),e._m(2),n("h3",[e._v("三、线程池核心参数，工作原理")]),n("h4",[e._v("3.1 核心参数")]),n("p",[e._v("我们可以通过ThreadPoolExecutor来创建一个线程池。")]),e._m(3),n("p",[e._v("创建一个线程池输入几个参数：")]),e._m(4),n("h4",[e._v("3.2 向线程池提交任务")]),n("p",[e._v("我们可以使用execute提交任务，但是execute方法没有返回值，所以无法判断任务是否被线程池执行成功。")]),e._m(5),n("p",[e._v("我们也可以使用submit方法来提交任务，它会返回一个future，可以通过这个future来判断任务是否执行成功，通过future的get方法来获取返回值，get方法会阻塞住直到任务完成。而使用get(long timeout, TimeUnit unit)方法则会阻塞一段时间后立即返回，这时有可能任务没有执行完。")]),e._m(6),n("h4",[e._v("3.3 线程池的关闭")]),n("p",[e._v("可以通过")]),n("p"),n("p"),n("p"),n("p"),n("p"),n("p"),n("p"),n("p")],1)},l=[function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("ol",[n("li",[e._v("新建(new Thread)：当创建一个Thread类的一个实例时，此线程进入新建状态(未被启动)。")]),n("li",[e._v("就绪(runnable)：线程已经被启动，正在等待分配CPU时间片，也就是说此时线程正在就绪队列中排队等待得到CPU资源。例如：t1.start()。")]),n("li",[e._v("运行(running)：线程获得CPU资源正在执行任务(run())，此时除非线程自动放弃CPU资源或者有优先级更高的线程进入，线程将一直运行到结束。")]),n("li",[e._v("死亡(dead)：当线程执行完毕或被其它线程杀死，线程进入死亡状态，这时线程不可能再进入就绪状态等待执行。自然终止：正常运行run()方法后终止。异常终止：调用stop()终止运行。")]),n("li",[e._v("堵塞(blocked)：由于某种原因导致正在运行的线程让出CPU并暂停自己的执行，即进入堵塞状态。正在睡眠：用sleep()方法可使线程进入睡眠状态，一个睡眠着的线程在指定的时间过去可进入就绪状态。正在等待：调用wait()方法(调用motify()方法回到就绪状态)。被另一个线程所阻塞：调用suspend()方法(调用resume()方法恢复)。")])])},function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("p",[n("a",{attrs:{href:"https://www.cnblogs.com/langjunnan/p/6444718.html",target:"_blank",rel:"noopener"}},[e._v("参考文章")])])},function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("ul",[n("li",[e._v("newFixedThreadPool(int nThreads)：创建一个固定长度的线程池，每当提交一个任务就创建一个线程，直到达到线程池的最多数量，这时线程规模将不再变化。当线程发送未预期的错误而结束时，线程池会补充一个新的线程。")]),n("li",[e._v("newCachedThreadPool()：创建一个可缓存的线程池，如果线程池的规模超过了处理需求，将自动回收空闲线程。而当需求增加时，则可以自动添加新线程，线程池的规模不存在任何限制。")]),n("li",[e._v("newSignleThreadExecutor()：单线程的Executor，它创建单个工作线程来执行任务，如果这个线程异常结束，会创建一个新的来替代它。它的特点是能确保依照任务在队列中的顺序来串行执行。")]),n("li",[e._v("newScheduledThreadPool(int corePoolSize)：创建一个固定长度的线程池，而且以低延迟或者定时的方式来执行任务，类似于Timer。")])])},function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("pre",{staticClass:"language-java"},[n("code",[e._v("new ThreadPoolExecutor(int corePoolSize, int maximumPoolSize, long keepAliveTime, TimeUnit unit, \nBlockingQueue<Runnable> workQueue, ThreadFactory threadFactory, RejectedExecutionHandler handler);")])])},function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("ul",[n("li",[e._v("corePoolSize(线程池的基本大小)：当提交一个任务到线程池时，线程池会创建一个线程来执行任务，即使其它空闲的基本线程能够执行新任务也会创建线程。等到需要执行的任务树大于线程池基本大小时就不在创建。如果调用了线程池的prestartAllCoreThreads方法，线程池会提前创建并启动所有基本线程。")]),n("li",[e._v("maximumPoolSize(线程池最大大小)：线程池允许创建的最大线程数。如果队列满了，并且已创建的线程数大于最大线程数，则线程池会再创建新的线程执行任务。值得注意的是如果使用了无界的任务队列这个参数就没什么效果。")]),n("li",[e._v("keepAliveTime(线程活动保持时间)：线程池的工作线程空闲后，保持存活的时间。如果任务很多，并且每个任务执行的时间比较短，可以调大这个时间，提高线程的利用率。")]),n("li",[e._v("timeUnit(线程活动保持时间的单位)：可选的单位有天(DAYS)，小时(HOURS)，分钟(MINUTES)，毫秒(MILLISECONDS)，微秒(MICROSECONDS，千分之一毫秒)和毫微秒(NANOSECONDS，千分之一微秒)。")]),n("li",[e._v("workQueue(任务队列)：用于保存等待执行的任务的阻塞队列。可选以下几个阻塞队列：")]),n("ol",[n("li",[e._v("ArrayBlockingQueue：一个基于数组结构的有界阻塞队列，此队列按FIFO(先进先出)原则对元素进行排序。")]),n("li",[e._v("LinkedBlockQueue：一个基于链表结构的阻塞队列，此队列按FIFO(先进先出)原则排序，吞吐量通常要高于ArrayBlockQueue。静态工厂方法Executors.newFixedThreadPool()使用了这个队列。")]),n("li",[e._v("SynchronousQueue：一个不存储元素的阻塞队列。每个插入操作必须等到另一个线程调用移除操作，否则插入操作一直处于阻塞状态，吞吐量通常要高于LinkedBlockQueue。静态工厂方法Executors.newCachedThreadPool使用了这个队列。")])]),n("li",[e._v("threadFactory：用于设置创建线程的工厂，可以通过线程工厂给每个创建处理的线程设置更有意义的名字，Debug和定位问题时非常有帮助。")]),n("li",[e._v("RejectedExecutionHandler(饱和策略)：当队列和线程池都满了，说明线程池处于饱和状态，那么必须采取一种策略处理提交的新任务。这个策略默认情况下是AbortPolicy，表示无法处理新任务时抛出异常。JDK1.5提供了四种策略：")]),n("ol",[n("li",[e._v("AbortPolicy：直接抛出异常。")]),n("li",[e._v("CallerRunsPolicy：只用调用者所在线程来运行任务。")]),n("li",[e._v("DiscardOldestPolicy：丢弃队列里最近的一个任务，并执行当前任务。")]),n("li",[e._v("DiscardPolicy：不处理，丢弃掉。")]),n("li",[e._v("也可以根据应用场景需要来实现RejectedExecutionHandler接口自定义策略。如记录日志或持久化不能处理的任务。")])])])},function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("pre",{staticClass:"language-java"},[n("code",[e._v("threadsPool.execute(new Runnable() {\n\t@Override\n\tpublic void run() {\n\t// TODO Auto-generated method stub\n\t}\n});")])])},function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("pre",{staticClass:"language-java"},[n("code",[e._v("try {\n\tObject s = future.get();\n} catch (InterruptedException e) {\n\t// 处理中断异常\n} catch (ExecutionException e) {\n\t// 处理无法执行任务异常\n} finally {\n\t// 关闭线程池\n\texecutor.shutdown();\n}")])])}],i=n("c276"),o={methods:{print:function(){i["a"].print()}}},a=o,u=n("5d22"),c=Object(u["a"])(a,r,l,!1,null,null,null);t["default"]=c.exports}}]);
//# sourceMappingURL=chunk-2d0c032d.35adc22a.js.map