<template>
    <div class="suyan__home">
        <h1>线程<el-button class="suyan__btn__print" type="primary" plain @click="print">打印pdf</el-button></h1><el-divider></el-divider>
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
<p>我们可以通过ThreadPoolExecutor来创建一个线程池。</p>
<pre class="language-java"><code>new ThreadPoolExecutor(int corePoolSize, int maximumPoolSize, long keepAliveTime, TimeUnit unit, 
BlockingQueue&lt;Runnable&gt; workQueue, ThreadFactory threadFactory, RejectedExecutionHandler handler);</code></pre>
<p>创建一个线程池输入几个参数：</p>
<ul>
<li>corePoolSize(线程池的基本大小)：当提交一个任务到线程池时，线程池会创建一个线程来执行任务，即使其它空闲的基本线程能够执行新任务也会创建线程。等到需要执行的任务树大于线程池基本大小时就不在创建。如果调用了线程池的prestartAllCoreThreads方法，线程池会提前创建并启动所有基本线程。</li>
<li>maximumPoolSize(线程池最大大小)：线程池允许创建的最大线程数。如果队列满了，并且已创建的线程数大于最大线程数，则线程池会再创建新的线程执行任务。值得注意的是如果使用了无界的任务队列这个参数就没什么效果。</li>
<li>keepAliveTime(线程活动保持时间)：线程池的工作线程空闲后，保持存活的时间。如果任务很多，并且每个任务执行的时间比较短，可以调大这个时间，提高线程的利用率。</li>
<li>&nbsp;</li>
</ul>
<p>&nbsp;</p>
<p>&nbsp;</p>
<p>&nbsp;</p>
<p>&nbsp;</p>
<p>&nbsp;</p>
<p>&nbsp;</p>
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