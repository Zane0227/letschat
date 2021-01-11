<template>
  <div class="hello">
  <div class="head">
    当前在线人数：{{num}}
  </div>

    <div id="mainbox">
      <transition-group name="fade">
      <div :class=" Messages[key].own==true ? 'ownmessages' : 'othermessages' " v-for="(items,key) in Messages" :key="key">
        <Messages :Messages="Messages[key]" />
      </div>
      </transition-group>
    </div>

    <div class="inputbox">
      <el-input v-model="input" placeholder="请输入内容" class="chat" @keyup.enter.native="Send()"></el-input>
      <el-button @click="Send()" class="send" >发送</el-button>
    </div>

  </div>
</template>

<script>
import Messages from './Messages'

export default {
  name: 'HelloWorld',
  components: {
    Messages
  },
  props: {
    usrname: String
  },
  created(){
    this.initWebSocket();
  },
  mounted(){
    console.log(this.usrname)
  },
  methods:{
    Send(){
      if(this.input !== '')
      {
        this.Messages.push({
          message:this.input,
          own:true
        })
        this.upload.message = this.input
        let upload = JSON.stringify(this.upload)//对象转化为字符串
        this.ws.send(upload);
        this.input = ''
        this.listen()
      }
    },
    open() {
      this.$message(this.welcome);
    },
    listen(){
      this.$nextTick(() => {
          let msg = document.getElementById('mainbox') // 获取对象
          console.log(msg.scrollHeight)
          document.documentElement.scrollTop  = msg.scrollHeight // 滚动高度
          window.pageYOffset = msg.scrollHeight
        })
    },
    initWebSocket(){
      let _this = this;
      //判断页面有没有存在websocket连接
      if (window.WebSocket) {
        let adress = "ws://weichenhao.cn:8085/webSocket?username="+_this.usrname
        let ws = new WebSocket(adress);
        _this.ws = ws;
        ws.onopen = function(e) {
          console.log(e)
          console.log("服务器连接成功");
        };
        ws.onclose = function(d) {
          console.log(d)
          console.log("服务器连接关闭");
        };
        ws.onerror = function() {
          console.log("服务器连接出错");
        };
        ws.onmessage = function(e) {
          //接收服务器返回的数据
          var obj = JSON.parse(e.data);
          // console.log(obj)
          // _this.welcome = obj.content
          if(obj.fromName == null){
            _this.num = obj.message.length
            _this.welcome = "欢迎" + obj.message[_this.num-1]
            _this.open();
          }else{
            if(obj.fromName !== _this.usrname){
              _this.Messages.push({
                message:obj.message,
                own:false
              })
              _this.listen()
            }
          }
        }
      }
    }
  },
  data() {
    return {
      adress:'',
      welcome:'',
      num:0,
      input: '',
      isown:true,
      Messages:[],

      upload:{
        toName:'',
        message:''
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
.hello{
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
}
.head{
  font-size: 20px;
  width: 100%;
  height: 40px;
  background-color: #ffffff;
  position: fixed;
  top: 0%;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
}
#mainbox{
  margin-top:15px;
  background-color: #f5f5f5;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  padding-bottom: 70px;
  width: 100%;
}
.othermessages{
  margin-top: 10px;
  padding-left: 15px;
  display: flex;
  justify-content: flex-start;
}
.ownmessages{
  margin-top: 10px;
  padding-right: 15px;
  display: flex;
  justify-content: flex-end;
}
.inputbox{
  height: 60px;
  width: 100%;

  background-color: #f5f5f5;
  position: fixed;
  bottom: 0%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.chat{
  width: 70%;
  padding-right: 20px;
}

</style>
