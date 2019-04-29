<template>
  <div style="margin-top:50px">
    <el-row>
      <el-col :span="10" style="margin-top: 200px;">
        <el-col :span="10">
          <el-upload
					  class="upload-demo"
					  ref="uploadImg"
					  :limit="5"
					  :action="imgUploadUrl"
					  :on-change="changeFile"
					  :on-success="uploadSuccess"
					  :auto-upload="false">
					  <el-button slot="trigger" size="small" type="primary">选取图片</el-button>
					  <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，最多5张，且不超过500kb</div>
					</el-upload>
        </el-col>
      </el-col>
      
      <el-col :span="12">
        <el-form ref="ruleForm" :model="ruleForm" label-width="80px" :rules="rules" size="mini">
        
        	<el-form-item label="产品名称" prop="pname">
            <el-col :span="10">
              <el-input v-model="ruleForm.pname"></el-input>
            </el-col>
          </el-form-item>
        
          <el-form-item label="产品条码" prop="pnum">
            <el-col :span="10">
              <el-input v-model="ruleForm.pnum"></el-input>
            </el-col>
          </el-form-item>
          
          <el-form-item label="类型" prop="ptype">
            <el-col :span="6">
              <el-select v-model.number="ruleForm.ptype" placeholder="请选择">
						    <el-option
						      v-for="item in productCategory"
						      :key="item.value"
						      :label="item.label"
						      :value="item.value">
						    </el-option>
						  </el-select>
            </el-col>
          </el-form-item>
          
				  
          <el-form-item label="题材" prop="ptype1">
            <el-col :span="6">
              <el-select v-model.number="ruleForm.ptype1" placeholder="请选择">
						    <el-option
						      v-for="item in productCaType"
						      :key="item.value"
						      :label="item.label"
						      :value="item.value">
						    </el-option>
						  </el-select>
            </el-col>
          </el-form-item>
          <el-form-item label="重量" prop="weight">
            <el-col :span="6">
              <el-input v-model.number="ruleForm.weight" autocomplete="off"></el-input>
            </el-col>
          </el-form-item>

          <el-form-item label="规格" prop="pguige">
            <el-col :span="8">
              <el-input v-model="ruleForm.pguige"></el-input>
            </el-col>
          </el-form-item>

          <el-form-item label="镶嵌" prop="pxqstat">
            <el-col :span="12">
              <el-radio-group v-model="ruleForm.pxqstat" size="medium">
                <el-radio border :label="false">无镶嵌</el-radio>
                <el-radio border :label="true" >镶嵌</el-radio>
              </el-radio-group>
            </el-col>
          </el-form-item>

          <el-form-item label="具体说明" prop="pdesc">
            <el-col :span="12">
              <el-input type="textarea" v-model="ruleForm.pdesc"></el-input>
            </el-col>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click.native="submitForm" :loading="Logining">确定</el-button>
            <el-button @click.native="resetForm">取消</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>


<script>
import { fail } from "assert";
import { getCategory,updataProduct } from '../../api/api';
export default {
  data() {
    return {
    	productCategory:[],//产品类型
      productCaType:[],//产品题材
      
      Logining: false,
      imgUploadUrl:'http://192.168.0.158:8122/api/Img/Pic',
			//imgUploadUrl:'http://api.520zhubao.com/api/JadePicture/UploadImgOss?token=eba1ddeb2fa7c2761955b71ce4b5afd7&id=12',
			fileList:[],//上传文件列表
			uploadFlag:0,//上传文件 计数器
			UploadImgArr:[],//上传图片拼接数组
			
      ruleForm: {
      	pimg:"",
        pnum: "", // 产品条码
        pname: "", // 产品名称
        ptype:"",//产品类型
        ptype1:"",//题材
        weight: 0, // 重量
        pguige: "", // 规格
        pxqstat: "", //  镶嵌
        pdesc: "", // 具体说明,
        radstr: Math.random().toString(36) + Date.parse(new Date()),
      },
      rules: {
        pnum: [
          { required: true, message: "请输入产品条码", trigger: "blur" },
          { min: 3, max: 20, message: "长度为 3 到 20 个字符", trigger: "blur" }
        ],
        pname: [
          { required: true, message: "请输入产品名称", trigger: "blur" },
          { min: 3, max: 20, message: "长度为 3 到 20 个字符", trigger: "blur" }
        ],
        ptype:[
        	{required:true,message:"请选择类型",trigger:"blur"},
        ],
        ptype1:[
        	{required:true,message:"请选择题材",trigger:"blur"},
        ],
        weight: [
          { required: true, message: "请输入产品重量" },
          {	type: "number",message: "重量必须为数字值",trigger: "blur",min: 0}
        ],
        pguige: [
          { required: true, message: "请输入产品规格", trigger: "blur" },
        ],
        pxqstat: [{ required: true, message: "请选择是否镶嵌", trigger: "change" }]
      }
    	
    };
  },
  created(){
  	getCategory().then(data =>{//获取到产品的类型跟题材选项
			if(data.response != undefined){
				var category_data = data.response;
				var arr = [];
				for(let i=0,len = category_data.Category.length;i<len;i++ ){
					var obj = {}
					obj.value = category_data.Category[i].id;
					obj.label = category_data.Category[i].catename;
					arr.push(obj)
				}
				this.productCategory = arr;

				var CaTypearr = [];
				for(let i=0,len = category_data.CaType.length;i<len;i++ ){
					var obj = {}
					obj.value = category_data.CaType[i].id;
					obj.label = category_data.CaType[i].catename;
					CaTypearr.push(obj)
				}
				this.productCaType = CaTypearr;
			}
		})
  },
  methods: {
    submitForm (){//提交表单
    	//必须先提交图片
    	this.uploadFlag = 0;//上传文件计数器
    	this.$refs.uploadImg.submit();
    },
    resetForm() {
      this.$refs[ruleForm].resetFields()
    },
    
	  changeFile(file,filelist){//辅助表单数据提交
	  	this.fileList = filelist
	  },
	  uploadSuccess(a){//图片上传完成、上传表单数据
	  	this.uploadFlag++
	  	this.UploadImgArr.push('http://192.168.0.158:8122/'+a.response)
	  	if(this.fileList.length == this.uploadFlag){
	  		var pimg = this.UploadImgArr.join(",");
	  		console.log(pimg)
	  		//图片提交成功之后再提交数据
		  	if(a.response != undefined){
		  		this.ruleForm.pimg = pimg;
		  	}
		  	this.$refs.ruleForm.validate(valid => {
	        if (valid) {
	          let para = Object.assign({ radstr: this.radstr }, this.ruleForm)
	          console.log(para);
	          updataProduct(para).then(data =>{
			    			console.log(data)
			    	})
	        } else {
	          console.log("error submit!!")
	          return false;
	        }
	      });
	  	}
	  }
  },
  watch: {
    "ruleForm.productweight": {
      deep: true,
      handler: function(newVal, oldVal) {
        //console.log(newVal,oldVal)
      }
    }
  }
};
</script>