
var con = require('./connection')
var express = require('express');
var app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))


app.get('/', function (req, res) {
    res.sendFile(__dirname + '/register.html')
})

app.post('/', function (req, res) {
    var name = req.body.name
    var ip_address = req.body.ip_address

    con.connect((error) => {
        if (error) {
            return console.log(error);
        }
        con.query("insert into just_testin (name, ip_address) values('" + name + "','" + ip_address + "')", (error, result) => {
            if (error) {
                return console.log(error);
            }
            res.send('register successful')
            console.log(result)
        })
    })
})


app.listen(7000);