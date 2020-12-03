<template>
<div class="row">
    <Table :loading="loading" :columns="historyColumns" :data="historyData"></Table>
    <Page :total="dataCount" :page-size="pageSize" show-total class="paging" @on-change="changepage"></Page>
</div>
</template>
<script>
import { Table,Page  } from 'iview';

let testData = {
        "histories": [
            {
                "ISSI": "24001",
                "status": "已发送",
                "time": "2019-09-16 18:11"
            },
            {
                "ISSI": "24002",
                "status": "已通过",
                "time": "2019-09-16 18:11"
            },
             {
                "ISSI": "24001",
                "status": "已发送",
                "time": "2019-09-16 18:11"
            },
            {
                "ISSI": "24002",
                "status": "已通过",
               "time": "2019-09-16 18:11"
            },
             {
                "ISSI": "24001",
                "status": "已发送",
                "time": "2019-09-16 18:11"
            },
            {
                "ISSI": "24002",
                "status": "已通过",
                "time": "2019-09-16 18:11"
            },
             {
                "ISSI": "24001",
                "status": "已发送",
                "time": "2019-09-16 18:11"
            },
            {
                "ISSI": "24002",
                "status": "已通过",
                "time": "2019-09-16 18:11"
            },
             {
                "ISSI": "24001",
                "status": "已发送",
               "time": "2019-09-16 18:11"
            },
            {
                "ISSI": "24002",
                "status": "已通过",
                "time": "2019-09-16 18:11"
            },
            
        ],
    
    }
    export default {
        data () {
                return {
                     
                        ajaxHistoryData:[],
                // 初始化信息总条数
                dataCount:0,
                // 每页显示多少条
                pageSize:6,
              
                historyData: [],
                historyColumns: [
                    {
                        title: 'ISSI',
                        key: 'ISSI'
                    },
                    {
                        title: '时间',
                        key: 'time'
                    },
                    {
                        title: '操作',
                        key: 'status'
                    }

                ],
                }
        },
        props:['loading'],
        components:{
     
          Table,Page
       
        },
        methods: {
             // 获取历史记录信息
            handleListApproveHistory(){
                
                // 保存取到的所有数据
                this.ajaxHistoryData = testData.histories
                this.dataCount = testData.histories.length;
                // 初始化显示，小于每页显示条数，全显，大于每页显示条数，取前每页条数显示
                if(testData.histories.length < this.pageSize){
                    this.historyData = this.ajaxHistoryData;
                }else{
                    this.historyData = this.ajaxHistoryData.slice(0,this.pageSize);
                }
                    
               
            },
             changepage(index){
                var _start = ( index - 1 ) * this.pageSize;
                var _end = index * this.pageSize;
                this.historyData = this.ajaxHistoryData.slice(_start,_end);
            },
            creatindextable(datas,Columns){
                     // 保存取到的所有数据
                this.historyColumns=Columns;
                this.ajaxHistoryData = datas
                this.dataCount = datas.length;
                // 初始化显示，小于每页显示条数，全显，大于每页显示条数，取前每页条数显示
                if(datas.length < this.pageSize){
                    this.historyData = this.ajaxHistoryData;
                }else{
                    this.historyData = this.ajaxHistoryData.slice(0,this.pageSize);
                } 
            }
            
         },
        created(){
           
        },
        mounted() {
       },
       
    }
</script>
<style scoped>

</style>