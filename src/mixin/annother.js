export default{
    methods: {
        say_hi(name){
            
            job.sayhi();
        },
        myname2(){
            let p = new Person();
          return  p.sayhello()
        }
    },
}

function Person() {
    this.username='小林',
    this.age=18,
    setInterval(() => {
        console.info(this.username)
    }, 1000),
    this.sayhello=function(){
        return  this.username;
    }
}

const job ={
    name:"码农", 
    sayhi:function(){
        console.info(this.name)
    }
}