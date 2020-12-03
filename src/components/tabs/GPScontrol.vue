<template>
<div :style="backgroundDiv" class="row">
    <div class="left">
        <div>
            <ul>
                <li>单位:</li>
                <li><Cascader :data="data" filterable change-on-select></Cascader></li>
            </ul>
        </div>
        <div>
             <ul>
                <li>时间:</li>
                <li> <DatePicker :value="sDate" format="yyyy/MM/dd" type="daterange" placement="bottom-end" placeholder="Select date" style="width: 200px"></DatePicker></li>
            </ul>
        </div>
        <div>
              <ul>
                <li>关键字:</li>
                <li> 
                   <Input placeholder="终端号码/姓名" style="width: 200px" />
                 </li>
                 <li><i class="material-icons">search</i> </li>
            </ul>
        </div>
         <div>
             <Button type="primary" :loading="loading" @click="toLoading">
                <span v-if="!loading">查询</span>
                <span v-else>正在查询..</span>
            </Button>
        </div>
    </div>
    <div class="middle"><Divider type="vertical" /></div>
    <div class="right"><Table ref="tabledata" :loading="loading"></Table></div>
</div>
</template>
<script>
import {Cascader,DatePicker,Input,Button,Divider } from 'iview';
import Table from "@/components/control/tables"
  export default {
        data () {
            return {
                loading:false,
                sDate: ['2019-09-16', '2019-09-17'],
                backgroundDiv: {
                            backgroundImage: 'url(' + require('@/assets/images/tabs_table_bg2.jpg') + ')'
                    } ,  
                data: [{
                    value: 'jiangsu',
                    label: '杭州市公安局',
                    children: [
                        {
                            value: 'nanjing',
                            label: '滨江公安分局',
                            children: [
                                {
                                    value: 'fuzimiao',
                                    label: '浦沿派出所',
                                }
                            ]
                        },
                        {
                            value: 'suzhou',
                            label: '上城区公安分局',
                            children: [
                                {
                                    value: 'zhuozhengyuan',
                                    label: '吴山派出所',
                                },
                                {
                                    value: 'shizilin',
                                    label: '小营派出所',
                                }
                            ]
                        }
                    ],
                },
                {
                    value: 'beijing',
                    label: '特警大队',
                    children: [
                        {
                            value: 'gugong',
                            label: '一大队'
                        },
                        {
                            value: 'tiantan',
                            label: '二大队'
                        },
                        {
                            value: 'wangfujing',
                            label: '三大队'
                        }
                    ]
                }],
            }
        },
        components:{
            Table,Cascader,DatePicker,Input,Button,Divider,
        },
        methods: {
            toLoading () {
                this.loading = true;
                let _this =this;
                setTimeout(function(){
                _this.loading = false;
                _this.$refs.tabledata.handleListApproveHistory();
                },2000);
            },
        }
    }
</script>
<style scoped>

 .row{
         height: 220px;
         width: 100%;
         background:no-repeat no-repeat;;
         background-size: 100%;  
         color: #fff;
    }
.left{
    width: 250px;
    margin-left: 10px;
    float: left; 
    height:220px ;  
    vertical-align: middle; 
  
}
.middle{
    width: 20px;
   
    float: left;   
    height:220px ;  
}
.right{
    width:  calc(100% - 290px);;
  
    float: left; 
    height:220px ; 
    margin-top: 10px;   
}
.left>div{
    width: 100%;
    height: 40px;

    float: left;
}
.left>div:nth-child(1){
    margin-top: 10px;
}
.left>div>ul>li{
   display: inline;
   float: left;
   width: 40px;
}
.left>div>ul>li:nth-child(1){
  padding-top: 10px;;
}
.left>div:nth-child(1)>ul>li:nth-child(2){
    width: 200px;
}
.left>div:nth-child(3)>ul>li:nth-child(2){
    width: 150px;
}
.ivu-divider-vertical {
    height: 80%;
    margin-top: 20px;
}

</style>
<style >
.left .ivu-input{
    background-color: transparent !important;
    border: 1px solid #fff  !important;
    color: #fff !important;
}
.left .ivu-input-prefix i, .left .ivu-input-suffix i{
     color: #fff !important;
}

.left  .ivu-picker-panel-body{
    color: #000 !important;
}
.left .ivu-cascader-label{
    text-align: left;
}

.left .material-icons{
    margin-top: 8px !important;
    margin-left: 25px;
    font-size: 20px;
}
.right .ivu-table,.right .ivu-table td, .right .ivu-table-wrapper,.right .ivu-page,.right .ivu-table tr, .right .ivu-table-header, .right table,.right .ivu-table-cell{
    background-color: transparent !important;
    border: 0 !important;
    color: #fff;
}
.right th{
    background-color: #2B81BE !important;
    height:30px !important;
     border: 0 !important;
     font-weight: normal;
}
.right .ivu-table td{
   height: 25px;
}
.right .ivu-table::after{
    width: 0 !important;
}
.right .ivu-table:before {
     width: 0 !important;  
}
.right .ivu-table tr:nth-child(even) td{
    background-color: #213366 !important;
}
.right .ivu-table tr:nth-child(odd) td{
    background-color: #13204d !important;
}
.right .ivu-page-next, .right .ivu-page-prev,.right .ivu-page-item,.right .ivu-page-item a {
    background-color: transparent !important;
    color: #fff;
    min-width: 22px;
    height: 22px;
    line-height: 20px;
    
}
.right .paging {
  text-align: right;
}
.right .ivu-spin-fix{
   background-color: rgba(255,255,255,.3);
}

</style>