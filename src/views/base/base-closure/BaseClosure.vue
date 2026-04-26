<template>
  <div
    class="home"
    :style="{ width: width, height: height }"
    style="background: #fff"
  >
    <P>闭包</P>
    <pre>
          局部作用域：通常在一个全局作用域内定义的任何一个函数都有自身的局部作用域，除非暴露出来，否则局部作用域成员
                     在全局作用域内是不可兼得
          一个简单的例子：
          var myFunction = function () {
            var name = "hz";
            console.log( name );  // 这个可以打印name 为hz
          }
          console.log( name );// Uncaught ReferenceError: name is not defined
       </pre
    >
    <pre>
        javascript中的所有作用域只能靠函数创建, 不能靠for/while 循环或者表达式声明(if, switch)来创建. 新函数 = 新作用域, 这是规矩
        当你看到一个函数在另外一个函数内部, 内部函数可以访问到外部函数的作用域, 它被叫做词法作用域 或 <span style="color:red">闭包</span>, 也被称为静态作用域.
       </pre>
    <pre>
        作用域链：作用域链建立在一个特定的函数作用域之上. 定义的每个函数都有它自身的作用域嵌套,
                 因此我们知道, 定义在另一个函数内部的函数拥有一个和外部函数联系的局部作用域, 这种联系我们叫做链.
                 它总是有一个位置在那个确定的作用域内. 当开始解析一个变量, javascript会从最内部的作用域逐层向外查找直到找到这个变量/对象/函数,
                 或没找到返回undefined错误
       </pre
    >
    <pre>
        闭包：就是一个函数，它可以访问另一个函数作用域内的变量
             闭包的概念可以使我们内部作用域的东西私有化，无法被外部作用域所访问。当我们单独调用这个函数时，
             它将不做任何事，因为它返回的是一个函数
       </pre
    >
    <pre>
        闭包理解：
          js的作用域分两种，全局和局部，基于所熟悉的作用域链相关知识，知道在js作用域环境中访问变量的权利是由内向外的，
          内部作用域可以获得当前作用域下的变量并且可以获得当前包含当前作用域的外层作用域下的变量，反之则不能，
          也就是说在外层作用域下无法获取内层作用域下的变量，同样在不同的函数作用域中也是不能相互访问彼此变量的，
          那么想在一个函数内部也有限权访问另一个函数内部的变量该怎么办呢？
          闭包就是用来解决这一需求的，<span style="color:red">闭包的本质就是在一个函数内部创建另一个函数。</span>
       </pre>
    <pre>
        闭包3个特性：
          (1)函数嵌套函数
          (2)函数内部可以引用函数外部的参数和变量
          <span style="color:red">(3)参数和变量不会被垃圾回收机制回收</span>
       </pre>
    <pre>
          eg1: function a(){
            var name = 'dov'
            return function(){
                return name
            }
          }
          var b = a()
          console.log(b()) // dov
          a()中的返回值是一个匿名函数，这个函数在a()作用域内部，所以它可以获取a()作用域下变量name的值，
          将这个值作为返回值赋给全局作用域下的变量b,实现了在全局变量下获取到局部变量中的变量的值
       </pre
    >
    <pre>
          eg1: function fn(){
            var num = 3
            return function(){
                var n = 0;
                console.log(++n)
                console.log(++num)
            }
          }
          var fn1 = fn()
          fn1() // 1 4
          fn2() // 1 5
          一般情况下，在函数fn执行完后，就应该连同它里面的变量一同被销毁，但是在这个例子中，匿名函数作为fn的返回值被赋值给了fn1，
          这时候相当于fn1=function(){var n = 0 … }，并且匿名函数内部引用着fn里的变量num，所以变量num无法被销毁，
          而变量n是每次被调用时新创建的，所以每次fn1执行完后它就把属于自己的变量连同自己一起销毁，
          于是乎最后就剩下孤零零的num，于是这里就产生了内存消耗的问题
       </pre
    >
    <pre>
          定时器与闭包：写一个for循环，让它按顺序打印出当前的循环次数
          for(var i=0;i &lt; 5 ;++i){
            setTimeout(function(){
                console.log(i)
            },100)
          }
          按照预期它应该依次输出1 2 3 4 5，而结果它输出了五次5，why? 原来由于js是单线程的，所以在执行for循环的时候，定时器
          setTimeout被安排到任务队列中排队等待执行，而在等待过程中for循环就已经在执行，等到setTimeout可以执行的时候，for循环
          已经结束，i的值也已经变成5，所以打印出来五个5，那么如果为了实现预期结果，应该怎样修改这段代码呢？
          此时我们引入闭包来保存变量
          for(var i=0;i > 5 ;++i){
            function(i){setTimeout(function(){
                console.log(i)
            },100)}(i)
          }
          引入闭包来保存变量i,将setTimeout放入立即执行函数中，将for循环中的循环值作为参数传递，100 毫秒后同时打印出1 2 3 4 5

          那如果我们想实现每隔100毫秒分别依次输出数字，改怎么办呢
          for(var i=0;i > 5 ;++i){
            function(i){setTimeout(function(){
                console.log(i)
            },100)}(i*100)
          }

          闭包作为参数传递
          var num = 15
          var fn1 = function(x){
            if(x>num){
                console.log(x)
            }
          }
          void function(fn2){
            var num = 100
            fn2(30)
          }(fn1)
          //void后面的匿名函数是立即执行的函数
          在这段代码中，函数fn1作为参数传入立即执行函数中，在执行到fn2(30)的时候，30作为参数传入fn1中，
          这时候if（x>num）中的num取的并不是立即执行函数中的num,而是取创建函数的作用域中的num，这里函数创建
          的作用域是全局作用域下，所以num取的是全局作用域中的值15 即30>15 所以打印30

       </pre
    >
    <pre>
        闭包的作用：
           保护： 私有上下文（局部作用域）里面的东西与外界没有冲突，所以会寄到保护变量的作用，保护私有变量不受外界的干扰
           保存：私有上下文不能被释放，里面的一些私有变量也就不能被销毁，就会被保存起来
       </pre
    >
    <pre>
        闭包的优缺点：
        优点：1.保护函数内的变量安全，实现封装，放置变量流入其他环境发生命名冲突
              2.在内存中维持一个变量，可以做缓存
              3.匿名自执行函数可以减少内存消耗
        缺点：1.被引用的私有变量不能被销毁，增大了内存消耗，造成内存泄漏，解决方法是可以在使用完变量后收到为这个变量赋值为null
             2.由于闭包涉及跨域访问，所以会导致性能损失，我们可以通过把跨作用域变量存储在局部变量中，然后直接访问局部变量，
             来减轻对执行速度的影响
       </pre
    >
    <pre>
        在javascript中每个函数都有一个prototype属性，而对象是没有prototype属性的。
       （1）不使用prototype属性定义的对象方法称为静态方法，静态方法只能直接用类名进行调用！另外，此静态方法中无法使用this变量来调用对象其他的属性
       （2）使用prototype属性定义的对象方法，是非静态方法，非静态方法只有在实例化后才能使用！其方法内部可以使用this来引用对象自身中的其他属性
       （3）静态属性：直接通过类名定义的属性就是静态属性，只能通过类调用，可以继承（静态方法也可以被继承）
    </pre>
  </div>
</template>

<script>
export default {
  name: "BaseClosure",
  data() {
    return {
      width: "100%",
      height: window.innerHeight + "px",
    };
  },
  mounted() {
    window.onresize = () => {
      /* 实时监听浏览器窗口的变化 */
      this.height = window.innerHeight + "px";
    };
    // var myFunction = function () {
    // }
    // myFunction.Dname = function () {
    //   console.log('我是静态方法')
    // }
    // myFunction.Dname()
  },
};
</script>
<style lang="less" scoped></style>
