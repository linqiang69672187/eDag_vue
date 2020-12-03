<template>
    <div>{{lockid}}Hello vue{{news}},{{points}}
        <Button  @click="increase(5)"  >点击{{say_hi('lq')}}</Button><Button  type="primary">dbc{{say_hi()}}</Button><Button  type="success">dbc{{myname2()}}</Button>
        <Table width="550" border :columns="columns2" :data="data3"></Table>
        <QRCode>
            您好，这里是插槽
        </QRCode>
        <div id="main"></div>
  
       
    </div>

</template>
<script>
import store from "@/vuex/store"
import {INCREASE} from '@/vuex/modul_types'
import { Button, Table } from 'iview';

import conmonjs from "@/mixin/common_hi"
import annother from "@/mixin/annother"
import QRCode from "@/components/QRCode.vue"

export default {
    data(){
       return{
            news:'aaaa',
            name:'lq',
             columns2: [
                    {
                        title: 'Name',
                        key: 'name',
                        width: 100,
                        fixed: 'left'
                    },
                    {
                        title: 'Age',
                        key: 'age',
                        width: 100,
                         fixed: 'left'
                    },
                    {
                        title: 'Province',
                        key: 'province',
                        width: 100
                    },
                    {
                        title: 'City',
                        key: 'city',
                        width: 100
                    },
                    {
                        title: 'Address',
                        key: 'address',
                        width: 200
                    },
                    {
                        title: 'Postcode',
                        key: 'zip',
                        width: 100
                    },
                    {
                        title: 'Action',
                        key: 'action',
                        fixed: 'right',
                        width: 120,
                        render: (h, params) => {
                            return h('div', [
                                h('Button', {
                                    props: {
                                        type: 'text',
                                        size: 'small'
                                    }
                                }, 'View'),
                                h('Button', {
                                    props: {
                                        type: 'text',
                                        size: 'small'
                                    }
                                }, 'Edit')
                            ]);
                        }
                    }
                ],
                data3: [
                    {
                        name: 'John Brown',
                        age: 18,
                        address: 'New York No. 1 Lake Park',
                        province: 'America',
                        city: 'New York',
                        zip: 100000
                    },
                    {
                        name: 'Jim Green',
                        age: 24,
                        address: 'Washington, D.C. No. 1 Lake Park',
                        province: 'America',
                        city: 'Washington, D.C.',
                        zip: 100000
                    },
                    {
                        name: 'Joe Black',
                        age: 30,
                        address: 'Sydney No. 1 Lake Park',
                        province: 'Australian',
                        city: 'Sydney',
                        zip: 100000
                    },
                    {
                        name: 'Jon Snow',
                        age: 26,
                        address: 'Ottawa No. 2 Lake Park',
                        province: 'Canada',
                        city: 'Ottawa',
                        zip: 100000
                    }
                ],
       }
    },
    mixins:[conmonjs,annother]
    ,
    mounted() {
        this.$chart.line1('main');
    },
    computed:{
        points:function(){
            return store.getters.get_points
        },
          lockid:function(){
            return store.getters.get_id
        },
            
        
    },
    components:{
        Button,
        Table,
    
        QRCode
    },
    methods:{
        increase:function(val){
            store.dispatch(INCREASE,val)
        }
    }
}
</script>
<style scoped>
  #main {
    width: 300px;
    height: 300px;
  }
</style>