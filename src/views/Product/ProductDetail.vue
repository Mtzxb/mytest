<template>
  <div>
    <el-row>
      <el-col>
        <div class="block">
          <el-carousel height="400px" indicator-position="none" autoplay >
            <el-carousel-item v-for="(item,index) in dialogStatus" :key="index">
              <img :src="item.purl">
            </el-carousel-item>
          </el-carousel>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<style lang="stylus" rel='stylesheet/stylus' scoped>
.el-row 
    margin-bottom: 30px
    &:last-child 
      margin-bottom: 0
    
  
.el-col 
    border-radius: 4px
  
.el-carousel__item h3 
  color: #475669
  font-size: 14px
  opacity: 0.75
  line-height: 150px
  margin: 0


.el-carousel__item:nth-child(2n) 
  background-color: #99a9bf


.el-carousel__item:nth-child(2n + 1) 
  background-color: #d3dce6

.el-dialog__body{
	  position: relative;
    top: -15px;
}
.el-dialog__header{
	padding: 0;
}

.el-dialog__headerbtn
	top:5px
	font-size:20px
	font-weight:bold	

img{
	width: (320*2)px;
	height: (200*2)px;
}
</style>


<script>
export default {
  props: {
    dialogStatus: "",
    form: {
      name: ""
    },
    formLabelWidth: ""
  },
  data() {
    return {
    	
    };
  },
  created(){
  	console.log(this.dialogStatus)
  },
  methods: {}
};
</script>