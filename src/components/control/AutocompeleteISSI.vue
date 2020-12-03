<template>
   <AutoComplete
        v-model="value2"
        @on-search="handleSearch2"
        placeholder="input here"
        :transfer='transfer'
        style="width:200px">
        <Option v-for="item in data2" :value="item.issi" :key="item">
            <div>
                <span><i class="material-icons" >{{item.type}}</i></span> <span> {{ item.issi }}({{ item.name }})</span>
            </div>           
        </Option>
    </AutoComplete>
</template>
<script>
import { AutoComplete,Option  } from 'iview';
    export default {
        data () {
            return {
                   value2: '',
                   transfer:false,
                   data2: []
            }
        },
        components:{
            AutoComplete,Option
        },
        methods: {
             handleSearch2 (value) {
                 if (value.indexOf('2')>=0){
                    this.data2 = [
                                {'type':'person','issi':'24001','name':'张警官'},
                                {'type':'group','issi':'822889','name':'TG1'}
                                ]
                 }else{
               
                                  this.data2 = []
                }
            }
        }
    }
</script>
<style scoped>
.ivu-select-item div span:nth-child(1){
    float: left;
    width: 20px;
    margin-top: -5px;
    margin-left: -15px;
}

.ivu-select-item div span:nth-child(2){
      margin-left: 10px;
   
}
.ivu-select-item{
    text-align: left;
    font-size: 14px !important;
}
</style>
<style >
 .demo-auto-complete-item{
        padding: 4px 0;
        border-bottom: 1px solid #F6F6F6;
    }
    .demo-auto-complete-group{
        font-size: 12px;
        padding: 4px 6px;
    }
    .demo-auto-complete-group span{
        color: #666;
        font-weight: bold;
    }
    .demo-auto-complete-group a{
        float: right;
    }
    .demo-auto-complete-count{
        float: right;
        color: #999;
    }
    .demo-auto-complete-more{
        display: block;
        margin: 0 auto;
        padding: 4px;
        text-align: center;
        font-size: 12px;
    }
</style>