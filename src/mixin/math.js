export default{
    methods: {
        getRandomNumberByRange(start, end){
             return Math.floor(Math.random() * (end - start) + start)
            ;
        },
        myname(){
            return "林强"
        },
        
    },
}