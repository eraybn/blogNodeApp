//test.js yi deneme yapmak için oluşturduk projeden bağımsız veritabanı bağlantısı oluşturmak için 
const mongoose=require('mongoose')
const Post=require('./models/Post')

mongoose.connect('mongodb://127.0.0.1/blognode_testdb')

Post.findByIdAndDelete('66df50ed216cf77de76adb70',{})
.then(post => {
  console.log(post)
})
.catch(err => {
  console.error(err)
})
// id noya göre güncelleme yapma
/* Post.findByIdAndUpdate('66de147b4cde06343e7d8762',{
  tittle:'Benim 1. Postum'
}).then(post => {
  console.log(post);
})
.catch(err => {
  console.error(err);
})
 */
/* Post.findById('66de147b4cde06343e7d8762', (error,post)=>{  //bu da id nosuna göre listeliyor
  console.log(error,post)
}) */
// oluşturduğumuz içerikleri görüntülemek için gerekli kodu yazacağız find ile
//direk tablo da ki tüm verileri göstersin istersek post.find({}) süslü parantez içi boş bırakırız
/* Post.find({})
.then(post => {
  console.log(post);
})
.catch(err => {
  console.error(err);
}) */

//belirli bir özelliğe göre örnek tittle ye göre verileri göstermek istersek
/* Post.find({
  tittle:'Benim ikinci Post Başlığım.' 
}).then(post => {
  console.log(post);
})
.catch(err => {
  console.error(err);
}) */

// aşağı da veri oluşturma tabloya veri aktarma işlemi yaptık
/* Post.create({
    tittle: 'Benim ikinci Post Başlığım.',
    content: 'İkinci post içeriği, lorem ipsum.'
}).then(post => {
    console.log(post);
  })
  .catch(err => {
    console.error(err);
  }); */