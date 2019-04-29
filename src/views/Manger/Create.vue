<template>
	<div style="padding-top: 20px;">
		<el-col :span="12">
			<el-form :model="CompanyForm" status-icon :rules="rules2" ref="CompanyForm" label-width="100px" class="demo-ruleForm">
			  <el-form-item label="账号" prop="login_id">
			    <el-input v-model="CompanyForm.login_id"></el-input>
			  </el-form-item>
			  
			  <el-form-item label="密码" prop="login_pwd">
			    <el-input type="password" v-model="CompanyForm.login_pwd"></el-input>
			  </el-form-item>
			  <el-form-item label="英文缩写" prop="cname">
			    <el-input v-model="CompanyForm.cname"></el-input>
			  </el-form-item>
			  
			  <el-form-item label="地址" prop="address">
			    <el-input v-model="CompanyForm.address"></el-input>
			  </el-form-item>
			  <el-form-item label="联系人" prop="linkman">
			    <el-input v-model="CompanyForm.linkman"></el-input>
			  </el-form-item>
			  <el-form-item label="联系电话" prop="linkphone">
			    <el-input v-model="CompanyForm.linkphone"></el-input>
			  </el-form-item>
			  <el-form-item label="简称" prop="abbreviation">
			    <el-input v-model="CompanyForm.abbreviation"></el-input>
			  </el-form-item>
			  <el-form-item>
			    <el-button type="primary" @click="submitForm('CompanyForm')">提交</el-button>
			    <el-button @click="resetForm('CompanyForm')">重置</el-button>
			  </el-form-item>
			</el-form>
		</el-col>
	</div>
			
</template>
<script>
/*{
  "login_id": "string",
  "cname": "string",
  "login_pwd": "string",
  "address": "string",
  "linkman": "string",
  "linkphone": "string",
  "abbreviation": "string"
  login_id	账号
cname	英文缩写
address	地址
linkman	联系人
linkphone	联系电话
abbreviation	简称
createtime	创建时间
logo	企业logo
}*/
	import { CreateCompany } from '../../api/api';
	export default{
		data() {
	      return {
	        CompanyForm: {
	          "login_id": "",
			  "cname": "",
			  "login_pwd": "",
			  "address": "",
			  "linkman": "",
			  "linkphone": "",
			  "abbreviation": ""
	        },
	        rules2: {
	          login_id: [
	            { required: true, message: "请输入账号", trigger: "blur" },
          		{ min: 5, max: 20, message: "长度为 5到 20 个字符", trigger: "blur" }
	          ],
	          cname: [
	            { required: true, message: "请输入英文缩写", trigger: "blur" },
          		{ min: 5, max: 20, message: "长度为 5到 20 个字符", trigger: "blur" }
	          ],
	          login_pwd: [
	            { required: true, message: "请输入密码", trigger: "blur" },
          		{ min: 5, max: 200, message: "长度为 5到 200 个字符", trigger: "blur" }
	          ],
	          address: [
	            { required: true, message: "请输入地址", trigger: "blur" },
          		{ min: 5, max: 200, message: "长度为 5到 200 个字符", trigger: "blur" }
	          ],
	          linkman: [
	            { required: true, message: "请输入联系人", trigger: "blur" },
          		{ min: 1, max: 50, message: "长度为 1到 50 个字符", trigger: "blur" }
	          ],
	          linkphone: [
	            { required: true, message: "请输入联系电话", trigger: "blur" },
          		{ min: 7, max: 15, message: "长度为 7到 15 个字符", trigger: "blur" }
	          ],
	          abbreviation: [
	            { required: true, message: "请输入简称", trigger: "blur" },
          		{ min: 5, max: 20, message: "长度为 5到 20 个字符", trigger: "blur" }
	          ],
	        }
	      };
	    },
	    methods: {
	      submitForm(CompanyForm) {
	        this.$refs.CompanyForm.validate(valid => {
		        if (valid) {
		          	let para = this.CompanyForm;
		          	console.log(para);
		          	CreateCompany(para).then(data =>{
				    	console.log(data)
				    })
		        } else {
		          console.log("error submit!!")
		          return false;
		        }
		    })
	      },
	      resetForm(formName) {
	        this.$refs[formName].resetFields();
	      }
	    }
		
	}
</script>