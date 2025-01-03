const mongoose=require('mongoose')

const PostSchema=new mongoose.Schema({
    tittle: {type:String,required:true},          //required başlığın zorunlu olması anlamına gelir
    content: {type:String,required:true}, 
    date: {type:Date, default: Date.now}, 
    post_image: {type:String,required:true}
})  

module.exports=mongoose.model('Post',PostSchema)