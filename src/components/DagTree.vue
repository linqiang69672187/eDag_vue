<template>
<div class="vuetree">
    <Tree :data="data3" @on-select-change="selectchange" @on-check-change="checkchange"	 :load-data="loadData" show-checkbox></Tree>
</div>
</template>
<script>
import Vue from 'vue';
import { Tree  } from 'iview';
    export default {
        data () {
            return {
                data3: [
                    {
                        title: 'loading',
                        loading: false,
                        children: [],
                        checked:true,
                        id:0,
                      
                    }
                     
                ],
                uncheckedEnitity:[],
                uncheckedtype:[],
            }
        },
        mounted(){
            this.initEntity();
        },
        components:{
          Tree
        },
        methods: {
            loadData (item, callback) {
                 console.info(item);
                 let type=item.type;
                 let entity=item.entityid;
                  Vue.axios.get('/Handlers/MVCEasy.ashx', { //'/app/data/json/tree.json','/Handlers/MVCEasy.ashx'
                            params: {
                                ctrl:'DialPadDao',
                                action: "GetTreeChildrenNode",
                                entityId:entity,
                                type:type,
                                gettime:new Date().getTime()  
                            }
                          }).then((res) => {
                              if (res.data!=''){  
                                                        
                              callback(res.data);
                              }
                          }).catch((err) => {
                            console.log(err)
                           
                          });
                
            },
            selectchange(array,item){
                let treeNode={entityId:item.id,objType:item.type,name:item.title};  
              
                displaypolicelistsdiv();//调用原来方法
                window.frames['policelists'].Displayprocessbar();//调用原来方法
                switch(treeNode.objType){
                    case "entity":
                        window.frames['policelists'].getpolices(treeNode.name, treeNode.entityId); 
                        window.frames['policelists'].createpolicetable_ajax(treeNode.objType, treeNode.entityId, "");
                         break;
                    case "zhishuuser":
                        window.frames['policelists'].getpolices(treeNode.name, ""); 
                        window.frames['policelists'].createpolicetable_ajax(treeNode.objType, treeNode.entityId, "");
                        break;
                    case "usertype":
                        window.frames['policelists'].getpolices(treeNode.name, treeNode.entityId); 
                        window.frames['policelists'].createpolicetable_ajax(treeNode.objType, treeNode.name, item.entityid);  
                        break;
                    default:
                        break;
                }
                console.info(item);
            },
            checkchange(array,yitem){
                console.info(this.data3);
                this.uncheckedEnitity.splice(0);
                this.uncheckedtype.splice(0)
                this.checkchildren(this.data3);
                let returnval='/';
                console.info(this.uncheckedEnitity);
                this.uncheckedEnitity.forEach(function(thisitem) {
                           returnval+=thisitem+',';   
                     });
                returnval+='/';
                this.uncheckedtype.forEach(function(thisitem) {
                           returnval+=thisitem+';';   
                     }); 
            uncheckedEnitity=returnval;  //全局变量赋值


            console.info(returnval);
                //以下是原有发送选中的方法
                //  for (let i = array.length-1; i >=0; i--){
                //     if(!array[i].children) continue;
                //    for (let n = 0; n <array[i].children.length; n++){
                //        let index =this.checkparent(array,array[i].children[n]); //检查父节点是否已经选中，如果已经包含则该节点排除
                //        array.splice(index,1); 
                //    }       
                //  }
                //   let zhishuString="";
                //   let entityString="";
                //   let typeString="";
                //   for (let i = array.length-1; i >=0; i--){
                //       switch (array[i].type) {
                //           case "zhishuuser":
                //              zhishuString+=array[i].id+',';
                //               break;
                //           case "usertype":
                //               typeString+=array[i].entityid+":"+array[i].id+';';
                //               break;  
                //           default:
                //               entityString+=array[i].id+',';
                //               break;
                //       }
                //  }
                //  let returnString =zhishuString+"/"+entityString+"/"+typeString;
                 //checkedEntity = returnString;//全局赋值单位选择，赋值原有全局属性值
                ReLoadUser();//刷新地图人员，调用原有方法
            },
           checkchildren(children){
           
              for (let i = children.length-1; i >=0; i--){
                    let item =children[i];
                    if (item.checked)continue;  //选中的情况       
                      switch (item.type) {
                          case "zhishuuser":
                         if(!item.indeterminate){  //确定非选中
                              if (this.uncheckedEnitity.indexOf(item.id)<0){
                               this.uncheckedEnitity.push(item.id);
                              }
                              }
                              else{
                                  this.checkchildren(item.children)  
                              }
                              break;
                          case "usertype":
                 
                             if (this.uncheckedEnitity.indexOf(item.entityid)<0){
                               this.uncheckedtype.push(item.entityid+':'+item.id);
                              }
                              break;  
                          default:
                            if(!item.indeterminate){  //确定非选中
                                 let _this =this;
                        
                                 JSON.parse(item.child).forEach((thisitem)=> {
                                     if (_this.uncheckedEnitity.indexOf(thisitem)<0){
                                        _this.uncheckedEnitity.push(thisitem);
                                     }
                                 })
                            }
                            else{  //未选中，且未确定
                                this.checkchildren(item.children)
                            } 
                            break;
                      }
             

                } 
      
           },
           checkparent(array,item){
            for (let i = 0; i <array.length; i++){
                   if (array[i].nodeKey==item.nodeKey) return i;
                 }
                 return -1;

           },
           initEntity(){
               let _this=this;
               Vue.axios.get('/Handlers/MVCEasy.ashx', { //'/app/data/json/tree.json','/Handlers/MVCEasy.ashx'
                            params: {
                                ctrl:'DialPadDao',
                                action: "GetTreeChildrenNode",
                                entityId:"",
                                type:"entity"  
                            }
                          }).then((res) => {
                              if (res.data!=''){                         
                              _this.data3=res.data;
                              }
                          }).catch((err) => {
                            console.log(err)
                           
                          });
           }

        }
    }
</script>
<style scoped>
.vuetree{
    margin: 0px;
    width: 200px;
    text-align: left;
    padding-left: 5px;
    color: #000;
    height: calc(100% - 30px);
    overflow: auto;
    position: relative;
    z-index: 2;
}

</style>