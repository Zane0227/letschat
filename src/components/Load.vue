<template>
    <div>
      <el-input v-model="input" placeholder="请输入用户名" class="chat"></el-input>
      <div class="load">
              <el-button @click="upload()" class="send" >登陆</el-button>
      </div>
    </div>
</template>

<script>
export default {
  data(){
    return{
      input:''
    }
  },
  methods:{
    upload(){
      if(this.input!==''){
        this.$emit("usrload",this.input)
      }else{
        alert("请输入您的用户名")
      }
      
    }
  }
}
</script>

<style scoped>
.chat{
  margin-top: 150px;
  width: 70%
}
.load{
  margin-top: 50px;
}
</style>