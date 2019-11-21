let db = require('../util/database');
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

exports.getUser = (req, res, next) => {

    let userName = req.body.uname
    let password = req.body.psw
    matchedUser(userName, password).then(([rows, fieldData]) => {
        if (rows.length == 1) {
            let loadDataList = loadData
            // let loadDataList = []
            loadDataList.then(loadDataList => {
                console.log("Login Success!")
                console.log(loadDataList)
                res.render('home', { pageTitle: 'Lab6', heading: 'Welcome to Artist App', data: loadDataList, hasData: loadDataList.length > 0 });
            })

        }
        else {
            console.log("Login Failed");
            res.render('login', { pageTitle: 'Lab6', heading: 'Welcome to Artist App', userImage: true, loginFailed: true});
        }
    })
}

function matchedUser(username, password) {
    return db.execute("SELECT * FROM users WHERE username = ? AND password = ?", [username, password]);
    // return db.execute("Select * from users where username = " + username + " and password = " + password);
}
