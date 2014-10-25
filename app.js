var express = require('express')
  , app = express()
  , cons = require('consolidate');

app.engine('html', cons.swig);
app.set('view engine', 'html');
app.set('views', __dirname + '/views');
//we use this body parser now as middleware!
//I get error with how body-parser is declared. Now I need to install it separate.
//app.use(express.bodyParser());
app.use(require('body-parser')());

//app.use(app.router);//deprecated message when starting up server 10-14-2014

// Handler for internal server errors
function errorHandler(err, req, res, next) {
    console.error(err.message);
    console.error(err.stack);
    res.status(500);
    res.render('error_template', { error: err });//see error_template under views
}

app.use(errorHandler);

//we'll render the fruitpicker template located under views directory
app.get('/', function(req, res, next) {
    res.render('fruitPicker', { 'fruits' : [ 'apple', 'orange', 'banana', 'peach' ] });
});

app.post('/favorite_fruit', function(req, res, next) {
    var favorite = req.body.fruit;
    if (typeof favorite == 'undefined') {
        next(Error('Please choose a fruit!'));//no entry was selected on the form
    }
    else {
        res.send("Your favorite fruit is " + favorite);
    }
});

app.listen(3000);
console.log('Express server listening on port 3000');

/*
When starting server => node app.js I get thie error
Error: Most middleware (like bodyParser) is no longer bundled with Express and must be installed separately. Please see https://github.com/senchalabs/connect#middleware.
    at Function.Object.defineProperty.get (/Users/admin33/nodeTestApp/node_modules/express/lib/express.js:89:13)

*/

/* 
After I did all changes, node server starts but i get this warning:
body-parser deprecated bodyParser: use individual json/urlencoded middlewares app.js:11:31
body-parser deprecated undefined extended: provide extended option ../node_modules/body-parser/index.js:85:29
*/
