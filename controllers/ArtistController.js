let artistData = require('../models/ArtistData');
let loadData = new Promise(function (resolve, reject) {
    let loadDataList = []
    artistData.getall().then(([rows, fieldData]) => {
        rows.forEach(element => {
            let data = {}
            data.imageURL = element.imageURL
            data.name = element.name
            data.about = element.about
            loadDataList.push(data);
        });
    })
    resolve(loadDataList)
})
exports.getAllPeople = (req, res, next) => {
    let Peoples = artistData.getall();
    Peoples.then(([rows, fieldData]) => {
        res.render('home', { pageTitle: 'Lab5', heading: 'Welcome to People App' });
    })
};

exports.getAddPeople = (req, res, next) => {
    res.render('peopleadd', { formsCSS: true });
};

exports.getPeople = (req, res, next) => {
    let id = req.params.id;
    let People = artistData.getpeople(id);
    People.then(([data, metadata]) => {
        res.render('people', { people: data[0], peopleCSS: true });
    });
}

exports.postAddPeople = (req, res, next) => {
    loadData.then((loadDataList)=>{
        let p_name = req.body.name;
        let p_about = req.body.about;
        let p_imageURL = req.body.imageURL;
        let pOject = {
            name: p_name,
            about: p_about,
            imageURL: p_imageURL
        }
        artistData.add(pOject).then(()=>{
            res.redirect(301, '/home')
        })
        // res.render('home', { pageTitle: 'Lab5', heading: 'Welcome to Artist App', data: loadDataList, hasData: loadDataList.length > 0})
        
    })
}

exports.postDeletePeople = (req, res, next) => {
    let name = req.body.name
    artistData.getPeopleName(name).then(([data, metadata]) => {
        console.log(data[0])
        let id = data[0].id
        artistData.deletepeople(id).then(()=>{
            res.redirect(301, '/home')
        })  
    })
    
}

