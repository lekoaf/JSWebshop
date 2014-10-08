var express = require('express');
var http = require('http');
var nodemailer = require('nodemailer');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var address = 'mongodb://localhost:27017';

var app = express();

app.use(express.static(__dirname + "/public"));

mongoose.connect(address + "/jswebshop");

mongoose.connection.on('connected', function(){
	console.log("Connected to MongoDB JSWebshop.");
});

mongoose.connection.on('error', function(){
	console.log("Unable to connect to MongoDB.");
});

var Schema = mongoose.Schema;

var itemSchema = new Schema({
	artno: {type: Number, required: true},
	name: String,
	stock: Number,
	price: Number,
	image: String,
	description: String,
	featured: Boolean,
	active: Boolean
	categoryId: Schema.Types.ObjectId
});
itemSchema.index({artno: 1}, {unique: true});

var categorySchema = new Schema({
	name: String,
	active: Boolean
});

var userSchema = new Schema({
	email: {type: String, required: true},
	password: {type: String, required: true},
	isadmin: {type: Boolean, default: false},
	statistics: {
		signup: {type: Date, default: Date.now},
		lastlogin: {type: Date, default: Date.now},
		numlogins: Number
	},
	orders:[{
		orderId: Schema.Types.ObjectId,
		artno: Number,
		pcs: Number
	}]
});
userSchema.index({email: 1}, {unique: true});

var settingsSchema = new Schema({
	copyright: String,
	headerimg: String,
	terms: String,
	conditions: String,
	disclaimer: String,
	contact:{
		name: String,
		address: String,
		zip: String,
		city: String,
		phone: String,
		email: String
	},
	social: {
		fb: String, //Facebook
		tw: String,	//Twitter
		li: String, //LinkedIn
		gh: String, //GitHub
		gp: String, //Google+
		em: String, //Email
		ig: String, //Instagram
		yt: String, //Youtube
		fl: String  //Flickr
	}
});

var Item = mongoose.model('Item', itemSchema);
var Category = mongoose.model('Category', categorySchema);
var User = mongoose.model('User', userSchema);

// Routes
// GET /items - Get item list
// POST /items - Add new item from admin
// PUT /items/id - Update an item
// DELETE /items/id - Delete an item (Soft delete?)
// GET /categories - Get list of categories
// POST /categories - Add new category from admin
// PUT /categories/id - Change name of category
// DELETE /categories/id - Delete category (Soft delete?)
// GET /featured - Get front page items. Get 4-6 random items if no featured items

// Keep people from seeing admin template
// 	http://stackoverflow.com/questions/25347851/how-to-hide-admin-parts-of-angular-site

app.get('/', function (req, res){
	res.sendfile('./index.html');
});

app.post('/send', function (req, res){

	if (!req.body || !req.body.basket){
		res.send(400);
	}

	var data = req.body;

	var plainBody = "";
	var htmlBody = "";

	// create reusable transporter object using SMTP transport
	var transporter = nodemailer.createTransport({
	    service: 'Gmail',
	    auth: {
	        user: 'email@gmail.com',
	        pass: 'userpass'
	    }
	});

	// NB! No need to recreate the transporter object. You can use
	// the same transporter object for all e-mails

	// setup e-mail data with unicode symbols
	var mailOptions = {
	    from: 'John Doe <john@doe.com>', // sender address
	    to: 'jane.doek@email.com', // list of receivers
	    subject: 'Order from the webshop', // Subject line
	    text: 'Hello world ✔', // plaintext body
	    html: '<b>Hello world ✔</b>' // html body
	};

	// send mail with defined transport object
	transporter.sendMail(mailOptions, function(error, info){
	    if(error){
	        console.log(error);
	    }else{
	        console.log('Message sent: ' + info.response);
	    }
	});
});

http.createServer(app).listen(3000);