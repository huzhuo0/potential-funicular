export const baseRoutes = [
  {
    path: "/base",
    name: "Base",
    meta: {
      title: "基础",
    },
    redirect: "/base/base-charts", // 添加默认重定向
    children: [
      {
        path: "/base/base-charts",
        name: "BaseCharts",
        meta: {
          title: "基础echarts",
        },
        component: () =>
          import(
            /* webpackChunkName: "about" */ "@/views/base/base-charts/BaseCharts.vue"
          ),
      },
      {
        path: "/base/base-progress",
        name: "BaseProgress",
        meta: {
          title: "基础progress",
        },
        component: () =>
          import(
            /* webpackChunkName: "about" */ "@/views/base/base-progress/BaseProgresses.vue"
          ),
      },
      {
        path: "/base/base-kpi",
        name: "BaseKpi",
        meta: {
          title: "基础kpi",
        },
        component: () =>
          import(
            /* webpackChunkName: "about" */ "@/views/base/base-kpi/BaseKpi.vue"
          ),
      },

      {
        path: "/base/base-animation",
        name: "BaseAnimation",
        meta: {
          title: "基础动画",
        },
        component: () =>
          import(
            /* webpackChunkName: "about" */ "@/views/base/base-animation/BaseAnimations.vue"
          ),
      },
      {
        path: "/base/base-font",
        name: "BaseFont",
        meta: {
          title: "基础字体",
        },
        component: () =>
          import(
            /* webpackChunkName: "about" */ "@/views/base/base-font/BaseFont.vue"
          ),
      },
      {
        path: "/base/base-table",
        name: "BaseTable",
        meta: {
          title: "基础表格",
        },
        component: () =>
          import(
            /* webpackChunkName: "about" */ "@/views/base/base-table/BaseTable.vue"
          ),
      },
      {
        path: "/base/base-slot",
        name: "BaseSlot",
        meta: {
          title: "基础插槽",
        },
        component: () =>
          import(
            /* webpackChunkName: "about" */ "@/views/base/base-slot/BaseSlot.vue"
          ),
      },
      {
        path: "/base/base-vuex",
        name: "BaseVuex",
        meta: {
          title: "基础vuex",
        },
        component: () =>
          import(
            /* webpackChunkName: "about" */ "@/views/base/base-vuex/BaseVuex.vue"
          ),
      },
      {
        path: "/base/base-router",
        name: "BaseRouter",
        meta: {
          title: "基础vue-router",
        },
        component: () =>
          import(
            /* webpackChunkName: "about" */ "@/views/base/base-router/BaseRouter.vue"
          ),
      },

      {
        path: "/base/base-card",
        name: "BaseCard",
        meta: {
          title: "基础Card",
        },
        component: () =>
          import(
            /* webpackChunkName: "about" */ "@/views/base/base-card/BaseCard.vue"
          ),
      },
      {
        path: "/base/base-closure",
        name: "BaseClosure",
        meta: {
          title: "基础闭包",
        },
        component: () =>
          import(
            /* webpackChunkName: "about" */ "@/views/base/base-closure/BaseClosure.vue"
          ),
      },
      {
        path: "/base/base-prototype",
        name: "BasePrototype",
        meta: {
          title: "基础原型-原型链",
        },
        component: () =>
          import(
            /* webpackChunkName: "about" */ "@/views/base/base-prototype/BasePrototype.vue"
          ),
      },
      {
        path: "/base/base-js-methods",
        name: "BaseJsMethods",
        meta: {
          title: "js方法汇总",
        },
        component: () =>
          import(
            /* webpackChunkName: "about" */ "@/views/base/base-js-methods/BaseJsMethods.vue"
          ),
      },
      {
        path: "/base/base-promise",
        name: "BasePromise",
        meta: {
          title: "promise详解",
        },
        component: () =>
          import(
            /* webpackChunkName: "about" */ "@/views/base/base-promise/BasePromise.vue"
          ),
      },
      {
        path: "/base/base-html-market",
        name: "BaseHtmlMarket",
        meta: {
          title: "html不常见的标签",
        },
        component: () =>
          import(
            /* webpackChunkName: "about" */ "@/views/base/base-html-market/BaseHtmlMarket.vue"
          ),
      },
    ],
  },
  {
    path: "/comp",
    name: "Comp",
    meta: {
      title: "组件",
    },
    redirect: "/comp/comp-tree", // 添加默认重定向
    children: [
      {
        path: "/comp/comp-tree",
        name: "CompTree",
        meta: {
          title: "comp树",
        },
        component: () =>
          import(
            /* webpackChunkName: "about" */ "@/views/comp/comp-tree/CompTree.vue"
          ),
      },
      {
        path: "/comp/video-demo",
        name: "videoDemo",
        meta: {
          title: "视频播放器(liveqing)",
        },
        component: () =>
          import(
            /* webpackChunkName: "about" */ "@/views/comp/video-demo/VideoDemo.vue"
          ),
      },
      {
        path: "/comp/marquee-comp",
        name: "MarqueeComp",
        meta: {
          title: "Marquee跑马灯组件",
        },
        component: () =>
          import(
            /* webpackChunkName: "about" */ "@/views/comp/marquee-comp/MarqueeComp.vue"
          ),
      },
      {
        path: "/comp/qr-code",
        name: "QrCode",
        meta: {
          title: "二维码生成与下载",
        },
        component: () =>
          import(
            /* webpackChunkName: "about" */ "@/views/comp/qr-code/QrCode.vue"
          ),
      },
    ],
  },
  {
    path: "/one-map",
    name: "onmMap",
    meta: {
      title: "地图",
    },
    redirect: "/one-map/base-map", // 添加默认重定向
    children: [
      {
        path: "/one-map/base-map",
        name: "BaseMap",
        meta: {
          title: "初始化地图",
        },
        component: () =>
          import(
            /* webpackChunkName: "about" */ "@/views/one-map/base-map/BaseMap.vue"
          ),
      },
    ],
  },
  {
    path: "/inspect",
    name: "Inspect",
    meta: {
      title: "巡查",
    },
    redirect: "/inspect/inspect-template", // 添加默认重定向
    component: () =>
      import(/* webpackChunkName: "about" */ "@/views/inspect/Index.vue"),
    children: [
      {
        path: "/inspect/inspect-template",
        name: "InspectTemplate",
        meta: {
          title: "巡查模版",
        },
        component: () =>
          import(
            /* webpackChunkName: "about" */ "@/views/inspect/inspect-template/InspectTemplate.vue"
          ),
      },
      {
        path: "/inspect/inspect-record",
        name: "InspectRecord",
        meta: {
          title: "巡查记录",
        },
        component: () =>
          import(
            /* webpackChunkName: "about" */ "@/views/inspect/inspect-record/InspectRecord.vue"
          ),
      },
    ],
  },
];
