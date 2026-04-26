<template>
  <div class="home" :style="{ width: width, height: height }">
    <div style="margin: 20px; background: #fff">
      <p>路由的使用</p>
      <div>
        <p>一、vue-router中query传参和params传参的使用和区别</p>
        <p>路由</p>
        <pre>
var router = new VueRouter({
              routes:[{name:'register',path:'/register',component:regist}]
            })</pre
        >
        <p>导航</p>
        <p>query传参第一种方式：直接拼写在路由后面</p>
        <p style="margin-left: 50px">
          &lt;router-link&gt; to="/register?id=10&name=hz"&lt;router-link&gt;
        </p>
        <p>
          query传参第二种方式：动态绑定to属性，使用路由path属性，query参数写成对象模式
        </p>
        <p style="margin-left: 50px">
          &lt;router-link&gt;
          :to="{path:'/register',query:{id:10,name:'hz'}}"&lt;router-link&gt;
        </p>
        <p>
          query传参第三种方式：动态绑定to属性，使用路由name属性，query参数写成对象模式
        </p>
        <p style="margin-left: 50px">
          &lt;router-link&gt;
          :to="{name:'register',query:{id:10,name:'hz'}}"&lt;router-link&gt;
        </p>
        <hr />
        <p>params传参</p>
        <p>路由</p>
        <pre>
var router = new VueRouter({
              routes:[{name:'register',path:'/register/:id/:name',component:regist}]
            })</pre
        >
        <p>导航</p>
        <p>params传参第一种方式：直接拼写在路由后面</p>
        <p style="margin-left: 50px">
          &lt;router-link&gt; to="/register/10/hz"&lt;router-link&gt;
        </p>
        <p>
          params传参第二种方式：动态绑定to属性，使用路由name属性，params参数写成对象模式，<span
            style="color: red"
            >params必须用name属性来引入，不能用path</span
          >
        </p>
        <p style="margin-left: 50px">
          &lt;router-link&gt;
          :to="{path:'/register',query:{id:10,name:'hz'}}"&lt;router-link&gt;
        </p>
        <p style="color: red">
          注意：这里的10和hz 对应的是/:id/:name 这两个参数可以不写
          那么就不会在地址栏上显示 不过刷新页面参数会消失 写上参数刷新页面
          参数不会消失
        </p>
        <p>使用this.$router.push</p>
        <p>使用this.$router.push('/register/1/hz')</p>
        <p>
          使用this.$router.push({name:'register',params:{id:1,name:'hz'}})
          此时只能使用name
        </p>
      </div>
      <hr />
      <div>
        <p>二、Vue路由的hash模式与history模式的区别</p>
        <pre>
hash模式url里面永远带着#号，我们在开发当中默认使用这个模式，那么什么时候要用history模式呢？如果用户考虑url的规范那么就需要使用history模式
            ，因为history模式没有#号，这个正常的url适合推广宣传。当然其功能也有区别，比如我们在开发app的时候有分享页面，那么这个分享出去的页面就是用vue或是
            react做的，我们把这个页面分享到第三方的app里，有的app里面url是不允许带有#号的，所以要将#号去掉，那么就要使用history模式，但是使用histroy模式还有
            一个问题，就是在访问二级页面的时候，做刷新操作，会出现404错误，那么就需要和后端人员配合让它配置一下apache或是nginx的url重定向，重定向到你的首页路由上
            就可以了
          </pre
        >
        <p>hash路由模式原理：</p>
        <p style="margin-left: 50px">
          # 就是hash符号，哈希符号后面的值就是哈希值
        </p>
        <p style="margin-left: 50px">
          路由的hash模式其实就是利用了window可以监听onhashchange事件，如果url中的哈希值发生变化，前端就可以做到监听并作出一些响应
        </p>
        <p style="margin-left: 50px">
          这样一来，即使前端没有发送http请求，它也能够找到对应页面的代码进行按需加载
        </p>
        <p style="margin-left: 50px; color: red">
          build之后本地index.html打开正常
        </p>
        <p style="margin-left: 50px">
          hash 路由：监听 url 中 hash
          的变化，然后渲染不同的内容，这种路由不向服务器发送请求，不需要服务端的支持
        </p>
        <p>history路由模式原理：</p>
        <p style="margin-left: 50px">
          h5推出了pushState和replaceState这两个方法，这两个方法的作用就是可以将url替换并且不刷新页面，http并没有去请求服务器该路径下的资源
        </p>
        <p style="margin-left: 50px">
          利用H5的 history中新增的两个API pushState() 和 replaceState()
          和一个事件onpopstate监听URL变化
        </p>
        <p style="margin-left: 50px">
          一旦刷新就会显示404，解决刷新弊端，需要在服务器那边将不存在的路径请求重定向到入口文件
        </p>
        <p style="margin-left: 50px">build之后本地index.html打开是无效的</p>
        <p style="margin-left: 50px">
          history 模式改变 url
          的方式会导致浏览器向服务器发送请求，这不是我们想看到的，我们需要在服务器端做处理：如果匹配不到任何静态资源，则应该始终返回同一个
          html 页面。
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "BaseRouter",
  components: {},
  data() {
    return {
      width: "100%",
      height: window.innerHeight + "px",
      showCom: "showState",
    };
  },
  methods: {},
  computed: {},
};
</script>
<style lang="less" scoped></style>
