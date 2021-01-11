<template>
    <div>
        <!-- 别人的消息 -->
        <div class="ohtermessage" v-if="!Messages.own">
            <el-avatar 
            src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"
            :size=50
            >
            </el-avatar>
            <div class="span">
            {{Messages.message}}
            </div>
        </div>
        <!-- 自己的消息 -->
        <div class="ownmessage" v-if="Messages.own">
            <div class="ownspan">
            {{Messages.message}}
            </div>
            <el-avatar 
            src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
            :size=50
            >
            </el-avatar>
        </div>
    </div>
</template>

<script>
export default {
    props:{
        Messages:Object,
    },
    mounted(){
    
    }
}
</script>

<style scoped>
.ohtermessage{
    display: flex;
    align-items: center;
}
.ownmessage{
    display: flex;
    align-items: center;
}
.span{
    padding: 10px;
    margin-left: 10px;
    font-size: 15px;
    border-radius: 10px;
    max-width: 70%;
    font-family: Avenir, Helvetica, Arial, sans-serif;
    color: #2c3e50;
    background-color: white;
}
.ownspan{
    padding: 10px;
    margin-right: 10px;
    font-size: 15px;
    border-radius: 10px;
    font-family: Avenir, Helvetica, Arial, sans-serif;
    color: #2c3e50;
    background-color: #a9ea7a;
}
</style>