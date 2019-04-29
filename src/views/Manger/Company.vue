<template>
	<div>
	  <el-table
	    :data="tableData"
	    stripe
	    style="width: 100%">
	    <el-table-column
	      prop="login_id"
	      label="账号"
	      width="180">
	    </el-table-column>
	    <el-table-column
	      prop="cname"
	      label="英文缩写"
	      width="180">
	    </el-table-column>
	    <el-table-column
	      prop="address"
	      label="地址">
	    </el-table-column>
	    <el-table-column
	      prop="linkman"
	      label="联系人">
	    </el-table-column>
	    <el-table-column
	      prop="linkphone"
	      label="联系电话">
	    </el-table-column>
	    <el-table-column
	      prop="abbreviation"
	      label="简称">
	    </el-table-column>
	    <!--<el-table-column
	      prop="createtime"
	      label="创建时间">
	    </el-table-column>-->
	  </el-table>
	</div>
</template>

<script>
	import { getBusinessList } from '../../api/api'
	export default{
		data(){
			return{
				tableData: [{
		          date: '2016-05-02',
		          name: '王小虎',
		          address: '上海市普陀区金沙江路 1518 弄'
		        }]
			}
		},
		created(){
			this.getBusinessList(0,10)
		},
		methods:{
			getBusinessList(pageIndex,pageSize,ids){
		  		var _this = this;
		    	var getBusinessListParams = {page:pageIndex,pagesize:pageSize}
		    	getBusinessList(getBusinessListParams).then(data =>{
		    		console.log(data)
		    		var results = data.response.data;
		    		this.tableData = results;
//		    		for(let i=0,len=results.length;i<len;i++){
//		    			var obj = {};
//		    			obj={
//		    				
//		    			}
//		    		}
		    	})
		  	}
		}
	}
</script>