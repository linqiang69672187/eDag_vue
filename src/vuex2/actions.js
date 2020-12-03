const actions={
    addAsync(context,step){
        setTimeout(() => {
            context.commit('countAdd',step)
        }, 1000);
    }
}
export default actions