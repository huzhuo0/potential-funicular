<template>
  <div class="inspect-pie-chart">
    <XCharts :options="option" class="line-chart"></XCharts>
  </div>
</template>

<script setup>
// import * as echarts from "echarts";
import { graphic } from "echarts";
import { ref, onMounted } from "vue";
import XCharts from "@/components/echart/XCharts";

const option = ref({});

onMounted(() => {
  getData();
  // console.log(112)
});

function getData() {
  option.value = warnLineOptions({
    warnData: 58,
    xData: ["04-10", "04-11", "04-12", "04-13", "04-14", "04-15", "04-16"],
    yData1: [14, 36, 58, 62, 64, 65, 61],
    // yData2: [3, 7, 3, 4, 0, 0, 0, 0, 0, 0, 0, 0],
    // yData3: [40, 20, 25, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  });
}

function warnLineOptions(seriesData) {
  // let yData1 = seriesData ? seriesData.yData1 : [0, 0, 0, 0, 0, 0];
  // let yData2 = seriesData ? seriesData.yData2 : [0, 0, 0, 0, 0, 0];
  // // 左侧和右侧数据的最大值和最小值
  // let leftYAxisMin = Math.floor(Math.min(...yData1, ...yData2) / 10) * 10;
  // let leftYAxisMax = Math.ceil(Math.max(...yData1, ...yData2) / 9.5) * 10;
  //  let rightYAxisMin = Math.floor(Math.min(...yData2) / 10) * 10;
  //  let rightYAxisMax = Math.ceil(Math.max(...yData2) / 9.5) * 10;
  // let splitNumber = 5;
  // const leftSpan = (leftYAxisMax - leftYAxisMin) / splitNumber;
  //  const rightSpan = (rightYAxisMax - rightYAxisMin) / splitNumber;
  let option = {
    backgroundColor: "transparent",
    tooltip: {
      // 提示框组件
      trigger: "axis",
      confine: true,
      position: "top",
      className: "custom-tooltip-box",
      formatter: function (params) {
        let str = "";
        params.forEach((item, index) => {
          if (index === 0) {
            str += `${item.name}
            <br/>
            `;
          }

          if (item.seriesName.indexOf("水位") > -1) {
            str += `${item.marker}
            <span class='tool-label'>${item.seriesName}</span>
             <span  class='tool-value' style='color:${item.color}'>${item.value}</span><span class='tool-unit'>m</span>`;
            if (index + 1 < params.length) {
              str += "<br/> ";
            }
          }
        });
        str = `<div class='tooltip-content'>${str}</div>`;
        return str;
      },
      //   formatter: '{b}<br />{a0}: {c0}<br />{a1}: {c1}',
      //   axisPointer: {
      //     type: 'shadow',
      //     label: {
      //       backgroundColor: '#6a7985'
      //     }
      //   },
      //   textStyle: {
      //     color: '#fff',
      //     fontStyle: 'normal',
      //     fontFamily: '微软雅黑',
      //     fontSize: 12
      //   }
    },
    grid: {
      left: "1%",
      right: "1%",
      bottom: "4%",
      top: 40,
      padding: "0 0 10 0",
      containLabel: true,
    },
    legend: {
      show: true,
      // 图例组件，颜色和名字
      left: "center",
      top: 40,
      itemGap: 16,
      itemWidth: 8,
      itemHeight: 8,
      data: [
        {
          name: `水位`,
          // icon:'image:// ../wwwroot/js/url2.png', // 路径
        },
      ],
      textStyle: {
        color: "#FFFFFF",
        fontStyle: "normal",
        fontFamily: "微软雅黑",
        fontSize: 12,
      },
    },
    xAxis: [
      {
        type: "category",
        boundaryGap: true, // 坐标轴两边留白
        data:
          seriesData && seriesData.xData
            ? seriesData.xData
            : ["04-10", "04-11", "04-12", "04-13", "04-14", "04-15", "04-16"],
        nameLocation: "center",
        axisLabel: {
          // 坐标轴刻度标签的相关设置。
          interval: 0, // 设置为 1，表示『隔一个标签显示一个标签』
          // margin: 20,
          // rotate: 15, // 标签旋转的角度，默认为 0，不旋转，正值是逆时针，负值是顺时针
          align: "center",
          textStyle: {
            color: "#FFFFFF",
            fontStyle: "normal",
            fontFamily: "PingFangSC, PingFang SC",
            fontSize: 12,
          },
          formatter: function (params) {
            let val = "";
            if (params.length > 10) {
              val = params.substring(0, 4) + "...";
              return val;
            }
            return params;
          },
        },
        axisTick: {
          // 坐标轴刻度相关设置。
          show: false,
        },
        axisLine: {
          show: false,
          // 坐标轴轴线相关设置
          lineStyle: {
            color: "#fff",
            opacity: 0.2,
          },
        },
        splitLine: {
          // 坐标轴在 grid 区域中的分隔线。
          show: false,
        },
      },
    ],
    yAxis: [
      {
        name: "水位：m",
        nameTextStyle: {
          color: "#B3CEFF",
          padding: [0, 30, 0, 55],
        },
        // align: "left",
        type: "value",
        splitNumber: 5,
        // min: leftYAxisMin,
        // max: leftYAxisMax || 10,
        // interval: leftSpan || 2,
        axisLabel: {
          textStyle: {
            color: " #B3CEFF",
            fontStyle: "normal",
            fontFamily: "PingFangSC, PingFang SC",
            fontSize: 12,
          },
        },
        axisLine: {
          show: false,
        },
        axisTick: {
          show: false,
        },
        splitLine: {
          show: true,
          lineStyle: {
            color: "rgba(0, 85, 167, 0.80)",
          },
        },
      },
    ],
    series: [
      {
        name: `水位`,
        type: "line",
        data:
          seriesData && seriesData.yData1
            ? seriesData.yData1
            : [14, 36, 58, 62, 64, 65, 61],
        smooth: true,
        lineStyle: {
          normal: {
            color: "rgba(95, 153, 243, 1)",
            shadowColor: "rgba(0, 0, 0, .3)",
            shadowBlur: 0,
          },
        },
        label: {
          show: false,
          position: "top",
          textStyle: {
            color: "rgba(95, 153, 243, 1)",
          },
        },
        itemStyle: {
          color: "rgba(95, 153, 243, 1)",
        },
        areaStyle: {
          normal: {
            color: new graphic.LinearGradient(
              0,
              0,
              0,
              1,
              [
                {
                  offset: 0,
                  color: "rgba(95, 153, 243, 0.15)",
                },
                {
                  offset: 1,
                  color: "rgba(95, 153, 243, 0)",
                },
              ],
              false
            ),
            shadowColor: "rgba(108,80,243, 0.9)",
            shadowBlur: 20,
          },
        },
        symbol: "none",
        markPoint: {
          label: {
            normal: {
              padding: [5, 10, 10, 10],
              fontSize: 14,
              color: "#FF9200",
              align: "center",
              offset: [0, -30],
              formatter: [`{b|水位超警戒}`].join(""),
              rich: {
                a: {
                  backgroundColor: {
                    image:
                      "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAsAAAALCAYAAACprHcmAAAAAXNSR0IArs4c6QAAAERlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAA6ABAAMAAAABAAEAAKACAAQAAAABAAAAC6ADAAQAAAABAAAACwAAAACBvloGAAAA9klEQVQYGU2RsWoCQRRFHdMIChaJjUUaQUhIGllEBAurlIuNFlZ+RopgyA+kjY2V6S1TpBDs0oQEYS20ULEwBPwBYT13nFEfnL33vvcYZndN4qziOL4kBpCHH/g1xuzQU7F0AY/wDx/Qh2+IoHzaxNF4hU/Qiccih7CBe9vEBLCErBpoBTpw5XIb/+WXnwgvbtDC+1pgMq7/h88lCbcQqUmFB7HPa54llzW/0fIMCq45dirZwsRlzee6Yx301ikN0CY8Q9HlB/xU3hZhAO9g73jW18uvoOZ7Oi0Nb6Cv0oMuDGENDb9ovJEyuEOq4P/giD+ou9vaA8gQy49kjy8DAAAAAElFTkSuQmCC",
                  },
                  width: 16,
                  height: 16,
                },
                b: {
                  color: "#fff",
                  lineHeight: 20,
                  fontSize: 16,
                  padding: [10, 0, 0, 5],
                },
              },
            },
            emphasis: {
              show: false,
            },
          },
          data: [
            {
              coord: [2, 58],
              symbolSize: [1, 1],
              symbolOffset: [70, 28],
              label: {
                normal: {
                  show: true,
                  backgroundColor: {
                    image:
                      "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFwAAAAYCAYAAAB3JpoiAAAAAXNSR0IArs4c6QAAAERlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAA6ABAAMAAAABAAEAAKACAAQAAAABAAAAXKADAAQAAAABAAAAGAAAAADMezeWAAAOBUlEQVRoBYWaS48dRxWAu7r73pnxI3ZwIMQLcEikIGQkBAsWLLJlkQWb/IcIiVUEqyyzQEgIseFPZAkblrBE4rEhD+TEIYgAURI7fozv3Hu7i+87VXXnemJDjXtO1alT51XnnKrucer+T3v72rVXNnn+2arrLmZoc87dxGN/Bs5nYNCIq3jH0jte5bk7nlkf8/BgUrzcCiw8QXVDl7pzKYWMxmPHu8qP8Z4Ortvx2eMpXdM1aOa5m+GtLbbQp/EUgp6TthZ+ajjRH6BdqH+jZRzyGDfcTn6laXJXOd/9qOt+AtvHt7euXXvxw836t78/Wb17L013ZqSqHCDJeNZVdKbUpdwDMUQTpmZsKKK6oViaUj7a5q7vU1qxeJKXc7lugn2b7t92+UEPaAbof6aGrMYigQIZKDsY7VkTvPiFbg/QcStp0NuhncpygEQ2oLW2EdLsrznO+R6qbjGz65ApfDDnz9Zdt3GtaJ8cBKdj555L6SvXc/7e6OBR7ea1a5dzSm/cnKYbq2467nM3pL7H03OXjA4WTYRBTkxgvc4e0GJCpOOYxwb77gqGDyjbL4qwESwOl84fIhk8VDx6r5+Hedp2PTE1u33gUlrjlqNwFHpIXfCFoWKIW9fWOUDq8eW8gIP7HHh+RQtn1ijsEnKy21/0lgArQzP7oV/OU5/TFjGyLQ14mLqjzZQ3oZdY/YN+Or0HqpG4Gzl/8O2Uvv9Yh+PsX9/cbI7v5Pyfo344j7U9ynczTAYjFz76A49Hf8SgCe4LINGpmBA2OYuGRNBomhZ8HmGzYQNwJ8jBmNawos56zicjzENZoLJo274fZu1wwP5VKa4rbVu2l0GZU1xOw0hQ9IQ47FT4lL71pZuQ3aOQrcoLvqEDuHs5U1XdhsJFShUZUlri3oE1ZVl1NlNFfxRuzcx5pMPfe/bZ1+/n+Zs3Nid/OUTE1PVrXHaokMhNIQPH+zj7SpVpwVcBCVtAi1O8kGawnxS6orxrCXtijYgki8YagTsl526NwaGHDForlhaGDVdlFKNTt2RPVw0nzaxz+xrR9GMrGIuPHXWubgC25inPm7JdRf/mRmnPDeno7pTvhWwcHBFehAQqfrERVoedLW3mH88//+K03b761nr9p0WXJnMfUmppIr775AJTV7w7pk4L+oRqcSZazdSPGU1UMM/8TnlhJlh/pbcMEe0jZYrEseBUPPBkyGuso6cpzJgd/CDKLvudZMOpwUI9Hd4pTBTVdlOi2H3m85wWxLybK+M4EMPZ8hAx2FEAkL5nlfgSz113nOeVrGVpkzcbGHykO9elw+MuH6OtdQR59IC2KCuOfWgPOdy6zS688d68fXvbzauFwl00p3wxdeuTnA+00ZpWTqFSCiLC4L/FdSqQ0c51KpwpfH3qI7qdC1qVpQ8le5rXoQ9GWK0pJ5tlqVVYiPJS6VXmWZN76EnjA1fPVfug0bEim1fs13k3f5z7JaXuRLQtNgRY9Kjjqn84XSLs0M4NmcUBtmN9Vo77dWFIh7em6dhlrYbrdGvgfnvI4cuUfvPJPN2/Pc2fHsBeYZKX46nf5DQfGNXWXReWuWKofeu4yhiRjkOxLpEAJXUdl6ecAZQNEiVhDycSc6s5r5fsQF0HpsiIDr8Cn9NGh+tXx8ppraxrowIbbuq7xbqUpEA1/dqNpPBhZ2xeCtBCwtV2uzq7l41n08ElF/t0dGszP8DJbRrlqnZG+9kI//C5514/yfP1f2/Wfz5AFFWhJXWUBxwsckOIeOqHMnEVRJgSfOIOB1SMDgSSy1GFdo6JCGcDppK27oXZuQ2HZ6L7VN1QQD0bqkKSpttQYuuF51Q+InetrRFRzSbT4hrNLa5mmh3LCK3RV8t25eJ+JqOCAtIKG+2+w6FJlxbDwa0p87qBRJzs9kWE17FOjwj/F3Wbwav/3Gz/OHJ7k7MH1n6E6xA2j/SfF1oaJUWG8WPqcLSGSqnbkH560XOPW0vysmfzguHVj5pa6jgy5pwW5MX2AZk7ztxz4nYCvcUeOrPLEmZrBqbUkwlu/GlrThCz35eGAySyknK0JKhweLvj1JIJjXRNijKNhNvzRFKoRZF8WlS0JSpOyLKvcy/ldO5Wl1etpHij2zWcrV7j2y+8cHGcpjc+6qY3U891DKyFwSteiGHs5dNEIZXnw5SIxjxat6SJQ425CUeNvA553hkRgG6ZyrU7kwpoHciJWS7Z9DEWQH11crhH/bN2xwEp36jjEngOMKaJtrFNLttSj6xi4S35KzN+oUCcxAxH55mMdOCNi/eCkezdZuVLXvXyEuDakFFl3t3iD7wQ8hUAL2VIo41tkzTHuaNu6J/IeclVem2Eh4ENQuL7y/jUNP3wOE+b1ZRvq304Em2lk2kw55clxtdU1qwJkdEIVxHnm7GTCOn4IRoG0kczwiiV0zgV9hCUX6GlTqbtgNy4kutobzGlwY8TYKrXs4Z1Dv5rrh6Roe3wVJddU3larHEDyrAbxvFgNc1cOwui4IvGYY0HNZdYnLbl4jANqBA01daqdiwGFfajTDRL7ZXFcO6zlS4qzSltj4b/QmHeELl+bu/yYhOmKsAHQ2OMcykLnGbgMCoggkfLn3sgdcIpdMg+D5wuHXFIQdgSxc1juvCNTQpyMb4Xp4nDcmS/vN6TLVzcgd6JvQuHkhLSXCsNUibq/UTURIA5J761x/Wh8tPCuMahzWHco0CXlG/r78zlKui48WoB2MbqEkbVRTDWzvHCMCx4USqv+6SxNLHGCP94GH51ZZpevTSMT3+23X4Yu4HHokHQDIzbCYu3mloceV6HROSCi9d0JnzH1UkfT3Evjfn2YSeyAsaOXRffXmr/AQ74bJ7veeAos7XQhHTz8Kla7eYPhuH+xb4/32iF+zStv4+3f3+atreURd+sjSBxgkbgBXTOTxW2xke9dHob7xwpES02AD2/2PdH9zabcHhM1LKiD/uvv/POXUS8/ERK31oO6bwMLSsBWx/CwCFfFdjIDa/3s3XP6CuwhKz3NRURL6187Auto+JiTR17GJgqR7xTcRDG95qQjZID+WzfbTe1C75C8CfTtPF7g/JjTn14lLG0D/ShG494+5eGgcMc9vR9xPu5wgsp51SVWXk6x6LG/6F+XS/PxscD88o4Lg8HtNfRNjbBJl1gnrlx43d86/j5lTR8V3kxwS/6RVkRNIFfKULxIZ3Ib0RSgTiOMZvBezR0PI59nQwax+3BKwMHrOMwABo+SHQXF/2BY/l5n+lJc7Odf9Hs22KevpuwyhMHG7xd51ztq6s4H4PAt2H7QnW8zBWOXOXIQBcWJSF4+86HHpUWEL5o/JtfdIh9aRu0b6w/M/RHu5ceFa5t17v67ruvUdv+eqUfrg8cXF6B/NKHT04hFjsnjpNtzctR9hSn/vIml4lgbwM+PbjBWwp9TzZpMLhBNnzBfUFHOd/mLqR+ucgzPiiRPUBT5Mun4OJgZ13D8515Te30lTX4yEt9zCZxylSOuDJX9LisrH7od/zQacDTfsASFv5NThs/7BNlFLqH50f0f2pcHB60EK8RDnnoIox2Ms8vLYfhbxem6SpfYj6MWtUKFgpHLY7FYYTv9SeLvj80YeTNtzxQ7DaPyzxdVcgbeqn15f7uhvshx09GBV+qpbSXFwfL25sNX+YgMs2BTYXTfomTCCbyYLWdT55ADyU32qJFqavtfG4QMeiZui/0/fJTDkeVthREUyy6efeWl/ao1z7vci/XruLomK70YTsL1frqMBy+O8/xuh9pCd8qpSx59v33b1NaXr5APV+kUs+tr2UXEbzfZwkHTqSzOz3CzEiyFpaINYpLdDm/w0m7N2544QIe3GMPWecX6pB3GkXF8J0uztfnwTyf2C8ZY2SXvuOGa9C5pg8OP0Qmvi7BYsBwX9vxlee+fHk0mY+F2N98dnWxOOI7dIkL+Fp3XPdQ+8Wnn/79R08+eXSu73/A1n9QNy7u0LHnrid0vcfWa1C/6BMHhDfCko6siQ11O31hQk7URfGlNpbaLJ7si10PGniMPPxliO+zfPBXM2nq+rOw1U5pKP49n0k9Z0sdrrCNQ46y6iPeM4a7IZ8nEYlcKtNOz9ANvmHLY+SzZKdb68vHw9cxPklr3p7v1KvPN7ruO4j8fPvazZuvkepvXuz666ZxqeX2TCZ/eM8z13hIq1Whka5Qlh4j3ojaWqE11R8+H7ARrb67qtXonk8KqXsyjYepniOnZ0mRL5/2ozecF96du5V8lbiTT1+cPw2WUZFv/0q/OIzPEASGZ0bYBoex9gs3X4flWp4yUnLrFRhjfOIfT9TfF4Svjkv/NBg7raaPdLjz7NJLpMOl8yk9U0w6k06EiinG3dIXzY3fXhxbGlqZiNQmVIQK2k9Ry4041/jnH+ciZcHz+SBd7kmcOqd8mzSNj/32uI47/cxdfhMyGQevShMy6DvX5lu54w/V6RKy5KWcVjY9Pxp/8coVBo10j3tMoVqWXHOenPvyMCzb1dB1j2y/vH179crly384zPnH1PVPcCzfl840lLKRDZkS5NX3IaXMN2tiU1K4r3jrWzuDxlSERqPZtOHuzIcmcG0dUzv+bW2D0vDama+gh0YFnwobjbDh92m4TQy3kcWdfidLfk3uWchUzAkbzyZDWvWPv/3ifO3HN8Nyu/3Sla572vn/2fxvEkTDT3H4Jd3rm5mw9dtbpOP9vnRWHd+u9ud2eJSKfp3f4fd4u158k7XPp+GajH3afbqY3+PzOR2bnns0+7xCPrq2dTFWp6p/w+/LPKubY7Iv/pvEfwHpMxf7Rrrl/QAAAABJRU5ErkJggg==",
                  },
                  rich: {
                    a: {
                      color: "#FF9200",
                    },
                  },
                },
                emphasis: {
                  show: false,
                },
              },
            },
            {
              coord: [2, 58],
              symbolSize: [1, 1],
              label: {
                normal: {
                  show: true,
                  offset: [0, 0],
                  formatter: [`{a|}`].join(""),
                  backgroundColor: {
                    image: "transparent",
                  },
                  borderColor: "#f0f",
                  borderRadius: 6,
                  rich: {},
                },
                emphasis: {
                  show: false,
                },
              },
            },
          ],
        },
      },
      {
        name: "警戒水位",
        type: "line",
        markLine: {
          symbol: ["none", "none"],
          lineStyle: {
            width: 1,
            color: "rgba(255, 53, 53, 1)",
          },
          label: {
            formatter: `警戒水位：${seriesData.warnData}m`,
            fontSize: 16,
            fontWeight: "bold",
            color: "rgba(255, 37, 37, 1)",
            position: "insideStartTop",
          },
          data: [
            {
              yAxis: seriesData.warnData,
            },
          ],
        },
      },
    ],
  };
  return option;
}
</script>

<style lang="less" scoped>
:deep(.custom-tooltip-box) {
  border: none !important;
  background-color: transparent !important;
  margin: 0 !important;
  padding: 0 !important;

  .tooltip-content {
    width: 100%;
    height: 100%;
    padding: 8px !important;
    color: #fff;
    background-image: url("./images/tooltip-bg.png");
    background-size: 100% 100%;
    background-repeat: no-repeat;

    .tool-label {
      color: #ccddff;
    }

    .tool-unit {
      color: #ccddff;
    }

    .tool-value {
      margin: 0 2px 0 3px;
    }
  }
}

.inspect-pie-chart {
  width: 100%;
  height: 100%;
  background: linear-gradient(
    90deg,
    rgba(21, 33, 51, 0.76) 0%,
    rgba(25, 51, 105, 0.6) 100%
  );
}
</style>
