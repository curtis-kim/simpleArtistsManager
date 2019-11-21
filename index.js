let express = require('express')
let app = express();
var port = process.env.PORT;
console.log(port)
let bodyParser = require('body-parser');
let path = require('path');
let db = require('./util/database');

const expressHbs = require('express-handlebars');
app.engine(
    'hbs',
    expressHbs({
      layoutsDir: 'views/layouts/',
      defaultLayout: 'main-layout',
      extname: 'hbs'
    })
  );
  app.set('view engine', 'hbs');
  app.set('views', 'views');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false })) // middleware

// parse application/json
app.use(bodyParser.json()) // middleware

let routers = require('./routes/routers');

app.use(express.static(path.join(__dirname,'public')));


let ArtistData = require('./models/ArtistData')
let loadData=[];
app.use((req, res, next)=>{
  loadData = []
  ArtistData.getall().then(([rows, fieldData]) =>{
    rows.forEach(element => {
      let data = {}
      data.imageURL = element.imageURL
      data.name = element.name
      data.about = element.about
      loadData.push(data);
    });
    // console.log(loadData)
    next()
})
})
app.get('/', function (req,res) {
  
  res.render('login', { pageTitle: 'Lab6', heading: 'Welcome to Artist App', userImage: true});

});

app.get('/home', function(req, res){
  console.log(loadData)
  res.render('home', { pageTitle: 'Lab6', heading: 'Welcome to Artist App', data: loadData, hasData: loadData.length > 0})

})
app.use(routers);


// Need to change port to port
app.listen(port, function(){
  
  console.log("PORT: " + port)
})



