<!-- <template>
  <div class="lighting" style="width:100%;height:100%">
    <canvas id="lightId" width="200" height="200"></canvas>
  </div>
</template>

<script>
export default {
  name: 'table',
  data () {
    return {}
  },
  methods: {
    initLight () {
      const canv = document.getElementById('lightId')
      const ctx = canv.getContext('2d')
      console.log(ctx, '555')
      console.log(ctx.canvas.height, '556')
      console.log(ctx.canvas.width, '557')
      const canvWidth = ctx.canvas.width
      const canvHeight = ctx.canvas.height
      var x = 100
      var y = 0
      // const light = function () {
      // var r = 0
      ctx.beginPath()
      ctx.moveTo(x, y)
      // r = 30

      var drawLine = function (x, y) {
        if (y === 0) {
          ctx.moveTo(x, y)
        } else {
          ctx.lineTo(x, y)
          ctx.lineWidth = 3
          ctx.strokeStyle = 'rgba(255,255,0,1)'
          ctx.stroke()
        }
      }
      // for (var i = 0; i < 3; i++) {
      //   drawLine()
      // }
      // const time = setInterval(function () {
      //   if (x < 50) {
      //     x += Math.random() * 9
      //   } else if (x > 150) {
      //     x -= Math.random() * 9
      //   } else { x += Math.random() * 9 }
      //   y += 10
      //   if (y > canvHeight) {
      //     x = canvWidth / 2
      //     y = 0
      //   }
      //   console.log(x, y)
      //   drawLine(x, y)
      // }, 2000)

      // draw()
    }

  },
  mounted () {
    this.initLight()
  }
}
</script>
