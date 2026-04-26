<template>
  <div
    class="home"
    :style="{ width: width, height: height }"
    style="background: #fff"
  >
    <P>原型原型链</P>
    <pre>
        原型：每个函数都有prototype属性，该属性指向原型对象。
          使用原型对象的好处是所有对象实例共享它所包含的属性和方法
        原型链：访问一个对象的属性时，如果该对象内部不存在这个属性，那么就会沿着它的_proto_ 属性所指向的那个对象（父对象）里找，直到为null为止，这样一层一层的就构成了原型链。
          主要解决了继承的问题。
          
          类：是用于创建对象的模板
          声明类有两种方法：(1)使用关键字class eg: class Hz{}
                           (2)使用表达式。 eg: 匿名类  let Hz = class{}   命名类：let Hz = class Hz1 {}
                                     console.log(Hz.name) // Hz1
          在JavaScript中，constructor属性是专门为function设计的，它存在于每一个function的prototype属性中。这个constructor保存了指向
          function的一个引用。
          在定义一个函数时： function hz(){}
               javascript内部会执行如下几个动作：1.为该函数添加一个原型（即prototype）属性2.为prototype对象额外添加一个constructor属性，
                                               并且该属性保存指向函数hz的一个引用
          这样当我们把函数hz作为自定义构造函数来创建对象的时候，对象实例内部会自动保存一个指向其构造函数（这里是hz）的prototype对象的一个属性proto
          所以我们在每一个对象实例中就可以访问构造函数的prototype所有拥有的全部属性和方法，就好像他们是实例自己的一样。当然该实例也有一个
          constructor属性（从prototype那里获得的），每一个对象实例都可以通过consructor对象访问他的构造函数，请看下面的代码：
          var f = new hz();
          console.log(f.constructor === hz) // true
          console.log(f.constructor === hz.prototype.constructor) // true
          我们可以利用这个特性来完成下面的事情：
          对象类型判断：如if(f.constructor === hz){}
          其实constructor的出现原本就是用来进行对象类型判断的，但是constructor属性易变性，不可信赖。我们有一种更加安全可靠的判定方法
          instanceof操作符 if(f instancof hz){}
          原型链继承，由于constructor存在于prototype对象上，因此我们可以结合constructor沿着原型链找到最原始的构造函数
          看这个例子：
          function Base() {}
          function Sub1(){}
          Sub1.prototype = new Base();
          Sub1.prototype.constructor = Sub1;
          Sub1.superclass = Base.prototype;
          function Sub2(){}
          Sub2.prototype = new Sub1();
          Sub2.prototype.constructor = Sub2;
          Sub2.superclass = Sub1.prototype;
          alert(Sub2.prototype.constructor);// function Sub2(){}
          alert(Sub2.superclass.constructor);// function Sub1(){}
          alert(Sub2.superclass.constructor.superclass.constructor);// function Base(){}
          上面这个例子只是为了说明constructor在原型链中的作用，更实际一点的意义在于：一个子类对象可以获得其父类的所有属性和方法，称之为继承

          之前提到constructor易变，那是因为函数的prototype属性容易被更改，我们用下面这个代码来说明问题：
          function F(){}
            F.prototype = {
              _name:'hhz',
              getName:function(){
                return this._name
              }
            }
            初看这种方式并无问题，但是你会发现下面的代码失效了
            var f=new F()
            console.log(f.constructor === F) // false
            怎么回事？F不是实例对象f的构造函数了吗？当然是，只不过构造函数F的原型被开发者重写了，这种方式将原有的Prototype对象用一个对象
            字面量{}来代替。而新建的对象{}只是Object的一个实例，系统(或者说浏览器)，在解析的时候并不会在{}上自动添加一个constructor属性
            ，因为这是function创建时的专属操作，仅当你声明函数的时候解析器才会做此动作。然而你会发现constructor并不是不存在的，下面代码
            可以测试它的存在性：
            console.log(typeof f.constructor == 'undefined');// false
            既然存在，那这个constructor是从哪儿冒出来的呢？我们要回头分析这个对象字面量{}。因为{}是创建对象的一种简写，所以{}相当于
            是new Object()。那既然{}是Object的实例，自然而然的他获得一个执行构造函数Object()的prototype属性的一个引用proto，
            又因为Object.prototype上有一个指向Object本身的constructor属性，所以可以看出这个constructor其实就是Object.prototype的
            constructor
            console.log(f.constructor === Object.prototype.constructor) // true
            console.log(f.constructor === Object) // true
            一个解决办法就是手动恢复他的constructor，下面代码非常好的解决了这个问题
            function F(){}
            F.prototype={
              constructor:F,
              _name:'hhz',
              getName:function(){
                return this._name
              }
            }
            之后一切恢复正常，constructor重新获得的构造函数的引用，我们可以再一次测试上面的代码，这次返回true
            var f = new F();
            console.log(f.constructor === F); // true
            解惑：构造函数上怎么还有一个constructor？他又是哪儿来的？
            像JavaScript内建的构造函数，如Array,RegExp,String,Number,Object,Function等等居然自己也有一个constructor
            console.log(Array.constructor != 'undefined') // true
            console.log(typeof Array.prototype.constructor === Array) // true
            不过这件事情也是好理解的，因为构造函数也是函数。是函数说明他就是Function构造函数的实例对象，自然它内部也有一个指向Function.prototype
            的内部引用proto了，因此我们很容易得出结论，这个constructor（构造函数上的constructor不是prototype上的）其实就是Function构造
            函数的引用
            console.log(Array.constructor === Function) // true
            console.log(Function.constructor === Function) // true

          constructor方法是类的构造函数，是一个默认方法，通过new命令创建对象实例时，自动调用调用该方法。一个类必须有constructor方法
          ，如果没有显式定义，一个默认的constructor方法会被默认添加，所以既是你没有添加构造函数，也是会有一个默认的构造函数的。一般
          constructor方法返回实例对象this，但是也可以指定constructor方法返回一个全新的对象，让返回的实例对象不是该类的实例
          constructor方法是一个特殊的方法，这种方法用于创建和初始化一个由class创建的对象。一个类只能有一个constructor

          super这个关键字，既可以当函数使用，也可以当做对象使用。这两种情况下，它的用法完全不同
          1.当函数使用：
            class A{}
            class B extends A{
              contructor(){
                super(); // es6要求，子类的构造函数必须执行一次super函数，否则会报错
              }
            }
            注：在contructor中必须调用super方法，因为子类没有自己的this对象，而是继承父类的this对象，然后对其进行加工，
                而super内部的this指的是B，因此super()这里相当于A.prototype.contrcutor.call(this,props)
             class A{
              constructor(){
                console.log(new.target.name) // new.target 指向当前正在执行的函数
              }
             }
             class B extends A{
              constructor(){
                super();
              }
             }
             new A(); // A
             new B(); // B
             可以看到，在super()执行时，它指向的是子类B的构造函数，而不是父类A的构造函数。也就是说super()内部的this指向的是B
             2.当做对象使用
             super当做对象使用时，在普通方法中，指向父类的原型对象，在静态方法中，指向父类
             class A{
              c(){ // 普通方法
                return 2
              }
             }
             class B extends A{
              constructor(){
                super();
                console.log(super.c()) // 2
              }
             }
             let b = new B();
             上面代码中，子类B当中的super.c(),就是将super当做一个对象使用，这时，super在普通方法中，指向A.prototype,所以
             super.c()就相当于A.prototype.c()
             通过super调用父类的方法时，super会绑定子类的this
             calss A{
              constructor(){
                this.x = 1;
              }
              s(){  // 普通方法
                console.log(this.x)
              }
             }
             class B extends A{
              constructor(){
                super();
                this.x = 2;
              }
              m(){          // 普通方法
                super.s()
              }
             }
             let b = new B();
             b.m() // 2
             上面代码中，super.s()虽然调用的是A.prototype.s()，但是A.prototype.s()会绑定子类B的this，导致输出的是2而不是1.也就是说，实际上
             执行的是super.s.call(this)
             由于绑定子类的this，所以如果通过super对某个属性赋值，这时super就是this，赋值的属性会变成子类实例的属性。
             class A{
              constructor(){
                this.x = 1;
              }
             }
             class B extends A{
              constructor(){
                super();
                this.x = 2;
                super.x = 3;
                console.log(super.x);// undefined
                console.log(this.x); // 3
              }
             }
             let b = new B()
             上面代码中，super.x赋值为3,这时等同于对this.x赋值为3.而当读取super.x的时候，调用的是A.prototype.x
             但是冰优优x方法，所以返回undefined
             注意，使用super的时候，必须显式指定是作为函数还是作为对象使用，否则会报错
             class A{}
             calss B extends A{
              super();
              console.log(super); // 报错
             }
             上面代码中，console.log(super);当中的super,无法看出是作为函数使用还是作为对象使用，所以JavaScript引擎
             解析代码的时候就会报错，这时，如果能清晰的表明super的数据类型，就不会报错
             最后，由于对象总是继承其他对象的，所有可以在任意一个对象中，使用super关键字

          一个构造函数可以使用super关键字来调用一个父类的构造函数

           class类中的实例属性，静态属性，原型属性：
          实例的属性必须定义在类的方法里
          eg:class Rectangle {
            contructor(height,width){
              this.height=height;
              this.width=width;
            }
          }
          静态属性或原型数据属性必须定义在类定义的外面
          eg: Rectangle.staticWidth = 20
              Rectangle.prototype.prototypeWidth = 25

          class类中使用extends扩展子类
       </pre
    >
  </div>
</template>

<script>
export default {
  name: "BasePrototype",
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
