<template>
  <div>
    <div style="margin-bottom:30px ; overflow:hidden">
      <el-col :span="24">
        <el-col :span="20" :offset="2">
          <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="简易查询" name="third">
            	
              <el-col :span="24" style="margin:5px 0">
                <el-col :span="1" style="font-size:12px; color:#909399; margin:5px 0 ">成品</el-col>
                <el-col :span="23">
                  <el-radio-group v-model="radio1" size="mini">
                    <el-radio-button v-for="(item,index) in categorysList.Category" :label="item.catename" :key="index" @click.native="changeCategory(item.id)"></el-radio-button>
                  </el-radio-group>
                </el-col>
              </el-col>

              <el-col :span="24" style="margin:5px 0">
                <el-col :span="1" style="font-size:12px; color:#909399; margin:5px 0 ">款式</el-col>
                <el-col :span="23">
                  <el-radio-group v-model="radio2" size="mini">
                    <el-radio-button v-for="(item,index) in categorysList.CaType" :label="item.catename" :key="index" @click.native="changeCaType(item.id)"></el-radio-button>
                  </el-radio-group>
                </el-col>
              </el-col>
              
              <el-col :span="24" style="margin:5px 0">
                <el-col :span="1" style="font-size:12px; color:#909399; margin:5px 0 ">颜色</el-col>
                <el-col :span="23">
                  <el-radio-group v-model="radio3" size="mini">
                    <el-radio-button v-for="(item,index) in categorysList.Color" :label="item.basename" :key="index" @click.native="changeColor(item.id)"></el-radio-button>
                  </el-radio-group>
                </el-col>
              </el-col>
              
              <el-col :span="24" style="margin:5px 0">
              	<el-button round size="mini" v-if="radio1" @click="test(1)">{{radio1}}  <i class="el-icon-close"></i></el-button>
              	<el-button round size="mini" v-if="radio2" @click="test(2)">{{radio2}}  <i class="el-icon-close"></i></el-button>
              	<el-button round size="mini" v-if="radio3" @click="test(3)">{{radio3}}  <i class="el-icon-close"></i></el-button>
              </el-col>
              
            </el-tab-pane>
          </el-tabs>
        </el-col>
      </el-col>
    </div>

    <el-row>
      <el-col :span="4" v-for="(o, index) in productsList " :key="index" :offset="index%5 == 0 ? 0 : 1">
        <el-card
          :body-style="{ padding: '0px' }"
          class="productsCard"
          style="margin-bottom:20px;"
          @click.native="opendetail(o.imgslist)"
        >
          <img
            :src="o.pimg||'http://pic.520zhubao.com/jade/DM000003/8770d9d46d91446b9b236d556366c057.jpg?x-oss-process=image/resize,m_pad,w_220,h_220'"
            class="image"
          >
          <div class="productDetail">
            <b>{{o.pname}}</b><br />
            <span><b>货号</b>：{{o.pnum}}</span><br />
            <span><b>价格</b>：￥{{o.price}}</span>
            <div class="bottom clearfix">
              	<span><b>库存</b>：在售</span>
              	<span v-if="o.productCategoryA"><b>类型</b>：{{o.productCategoryA.catename}}</span>
              	<span v-if="o.productCategory1"><b>题材</b>：{{o.productCategory1.catename}}</span>
              	<span v-if="o.p_color"><b>色调</b>：{{o.p_color.basename}}</span>
              	<span v-if="o.p_shape"><b>形体</b>：{{o.p_shape.basename}}</span>
              	<span v-if="o.p_purity"><b>纯度</b>：{{o.p_purity.basename}}</span>
              	<span v-if="o.prpwoco"><b>色力</b>：{{o.prpwoco}}</span>
              	<span v-if="o.pguandu"><b>光度</b>：{{o.pguandu}}</span>
              	<span v-if="o.pwenlie"><b>纹裂</b>：{{o.pwenlie}}</span>
              	<p v-if="o.pguige"><b>规格</b>：{{o.pguige}}（cm）</p>
              	<p v-if="o.pdesc"><b>描述</b>：{{o.pdesc}}</p>
              	<span class="customerService" @click.stop="customerService()"><i class="el-icon-service"></i>咨询</span>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <el-col :span="24" class="toolbar">
      <el-pagination layout="prev, pager, next" :page-size="pageSize" :total="dataCount" style="float:right" @current-change="handleCurrentChange"></el-pagination>
    </el-col>
		
    <el-dialog :title="title" :visible.sync="dialogTableVisible" width="600px">
      <ProductDetail :form="form" :formLabelWidth="formLabelWidth" :dialogStatus="dialogStatus"></ProductDetail>
    </el-dialog>
  </div>
</template>
<style>
.el-radio-button__inner{
	border-left: 1px solid #DCDFE6
}
.el-tab-pane {
  padding-bottom: 20px;
}

.productsCard{
	font-size: 14px;
	padding: 0px;
  height: 310px;
  overflow: hidden;
  transition: all 0.3s;
  position: relative;
}
.productsCard span{
	margin-top: 5px;
	display: inline-block;
}

.productsCard:hover img{
	transform: scale(1.1,1.1);
	transition: all 0.3s;
}
.productsCard:hover .productDetail{
	transform: translateY(-68%);
	transition: all 0.5s;
}

.productDetail{ 
	padding: 5px;
  overflow: hidden;
  background-color: rgba(255,255,255,0.9);
}

.bottom{
	margin-top: 10px;
}
.bottom span{
	display: inline-block;width: 50%;float: left;margin-top: 5px;
	font-size: 14px;text-align: left;
}
.bottom p{
	width: 100%;
	float: left;
	text-align: left;margin: 0;margin-top: 5px;
}

.bottom .customerService{
	color: #2D8CF0;
  margin-top: 10px;
  cursor: pointer;
  width: 50px;
}
.el-icon-close{
	position: relative;
  font-weight: 900;
  left: 6px;
}

.clearfix:after{
	/*清除浮动*/
	clear: both;
	display: block;
	content: "";
}
</style>

<script>
import { getProduct } from '../../api/api';
import { getCategory } from '../../api/api';
import ProductDetail from "./ProductDetail";

export default {
  components: {
    ProductDetail
  },
  data() {
    return {
      dataCount: 0,//总数据条数
      pageSize:25,//每一页展示数量
      currentPage: 0,//当前页码
      activeName: "third",//简易查询name
      addLoading: false,
      
      activeColor:"",//当前选择颜色值
      activeCaTypeId:"",//当前款式
      activeCategoryId:"",//当前成品值
      
      radio1:"",//成品显示值
      radio2:"",
      radio3:"",
      
      dialogTableVisible: false,
      dialogStatus: "",
      title: "",
      form: {
        name: ""
      },
      formLabelWidth: "",
      productsList:[],//商品列表
      categorysList:{
      	CaType:[],
      	Category:[],
      	Color:[],
      },//属性列表
    };
  },
  created(){
  	this.getProducts(0,25)//获取商品
    this.getCategorys()//获取属性分类
  },
  methods: {
  	handleClick(){
  		
  	},
  	handleCurrentChange(currentPage){//分页
  		var that=this;
      that.currentPage = currentPage;
      this.getProducts(currentPage,25)
      //this.initList()//点击第几页
  	},
    opendetail(index) {
    	console.log(index.length)
    	if(index.length == 0){
    		return
    	}
      this.dialogTableVisible = true;
      this.dialogStatus = index;
      this.form.name = "bgyl";
      this.formLabelWidth = "100";
    },
		getCategorys(){//获取属性
			var _this = this;	
			getCategory().then(data =>{
    		if(data.response != undefined){
    			console.log(data)
    			this.categorysList = data.response;
    		}
    	})
		},
		customerService(){//联系我们按钮
			console.log("联系我们")
		},
		//筛选
		changeCaType(CaTypeId){//改变当前款式值并筛选数据
			this.activeCaTypeId = CaTypeId;
    	this.getProducts(0,25)
		},
		changeCategory(CategoryId){//改变当前成品值并筛选数据
			this.activeCategoryId = CategoryId;
    	this.getProducts(0,25)
		},
		changeColor(colorNum){//改变当前颜色值并筛选数据
			this.activeColor = colorNum;
    	this.getProducts(0,25)
		},
		test(type){
			//清空选择
			switch(type)
				{
				case 1:
				  this.radio1 = ""//成品
				  this.activeCategoryId = ""//当前成品值
				  break;
				case 2:
					this.radio2 = ""//款式
				  this.activeCaTypeId = ""//当前款式
				  break;
				case 3:
					this.radio3 = ""//颜色
				  this.activeColor = "";//当前选择颜色值
				  break;
				default:
				  break;
				}
				this.getProducts(0,25)
		},
		
    getProducts(page,pagesize){//获取page页的商品
    	var _this = this;
    	var getProductsParams = {page:page,pagesize:pagesize};
			if(_this.activeColor != ""){
				getProductsParams.color = _this.activeColor;
			}
			if(_this.activeCaTypeId != ""){
				getProductsParams.type1 = _this.activeCaTypeId;
			}
			if(_this.activeCategoryId != ""){
				getProductsParams.type = _this.activeCategoryId;
			}
    	getProduct(getProductsParams).then(data =>{
    		if(data.response != undefined){
    			console.log(data)
    			_this.productsList = data.response.data;
    			_this.dataCount = data.response.dataCount;
    		}
    	})
    }
  }
};
</script>