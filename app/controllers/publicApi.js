
var User = require('../models/users.js');
var Mail = require('../models/SendMail.js');
var SMS = require('../models/SendSms.js');
var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
var config = require('../../config/passport_config.js');
var jwt = require('jsonwebtoken');
var fs = require('fs');
var formidable = require("formidable");
var crypto = require('crypto');
var HttpStatus = require('http-status-codes');
var GlobalMessages = require('../../config/constantMessages');
var messageHandler = require('../../config/messageHandler');
var multer  =   require('multer');
const fileUpload = require('express-fileupload');

var fs = require('fs');
var mkdirp = require('mkdirp');
var path = require('path');
var async = require('async');
/*________________________________________________________________________
 * @Date:      	10 Nov,2017
 * @Method :   	Register
 * Modified On:	-
 * @Purpose:   	This function is used for sign up user.
 _________________________________________________________________________
 */

function writeFile(path, contents, cb) {
  mkdirp((path.dirname), function (err) {
    if (err) return cb(err);

    fs.writeFile(path, contents, cb);
  });
}

var createFile = function(req, res){
    var totalComponents = req.body.totalComponent;
    var componentName = req.body.componentName;
    console.log("componentName::",componentName);
    var filePath = '/home/kunvar/'+componentName+"/"+componentName+'.component.ts';
    var htmlfilePath = '/home/kunvar/'+componentName+"/"+componentName+'.component.html';
    var cssfilePath = '/home/kunvar/'+componentName+"/"+componentName+'.component.css';
    
    var tsContent = ``;
    var htmlContent =``;
    var obj = {html : '', ts: ''};

    if (!fs.existsSync('/home/kunvar/'+componentName)){
        fs.mkdirSync('/home/kunvar/'+componentName);
    }else{

    }

    async.waterfall([
        function(callback) {
            if(totalComponents){
                if(totalComponents.textbox){
                    console.log("textbox::",totalComponents.textbox.length);
                    for (var i = 0; i< totalComponents.textbox.length; i++) {
                        tsContent += totalComponents.textbox[i].modelName+" : any;"+"\n";
                        htmlContent += '<input type="text" name="'+totalComponents.textbox[i].modelName+'" placeholder="'+totalComponents.textbox[i].modelName+'" [(ngModel)]="'+totalComponents.textbox[i].modelName+'"/>';
                    }
                }
                
            }
            obj.html = htmlContent;
            callback(null, tsContent, htmlContent);
        },
        function(contentTs,contentHtml, callback){
            tsContent = contentTs;
            htmlContent = contentHtml;
            console.log("textarea",obj.html);
            if(totalComponents.textArea){
                    console.log("textarea::",totalComponents.textArea.length);
                    for (var i = 0; i< totalComponents.textArea.length; i++) {
                      tsContent += totalComponents.textArea[i].modelName+" : any;"+"\n";
                      htmlContent += '<input type="text" name="'+totalComponents.textArea[i].modelName+'" placeholder="'+totalComponents.textArea[i].modelName+'" [(ngModel)]="'+totalComponents.textArea[i].modelName+'"/>';
                     }
            }
            obj.html = htmlContent;
            callback(null, tsContent);
        },
        function(content, callback){
            tsContent = content;
            if(totalComponents.button){
                    console.log("button::",totalComponents.button.length);
                    for (var i = 0; i< totalComponents.button.length; i++) {
                       tsContent += totalComponents.button[i].defination+"\n"
                       htmlContent += '<input type="button" (click)="'+totalComponents.button[i].buttonName+'()" name="'+totalComponents.button[i].buttonName+'" value="'+totalComponents.button[i].buttonName+'"/>';
                    }
            }
            console.log("button",htmlContent);
            obj.html = htmlContent;
            callback(null, tsContent, htmlContent);
        },
        function(content, contentHtml, callback){
          tsContent = content;
          htmlContent = contentHtml;
            if(totalComponents.image){
                    console.log("image::",totalComponents.image.length);
                    for (var i = 0; i< totalComponents.image.length; i++) {
                       // tsContent += totalComponents.image[i].defination+"\n"
                       htmlContent += '<img src="'+totalComponents.image[i].src+'" alt="No image avaiable"/>';
                    }
            }
            console.log("image",htmlContent);
            obj.html = htmlContent;
            callback(null, tsContent, htmlContent);  
        },
        function(content, contentHtml, callback){
          tsContent = content;
          htmlContent = contentHtml;
            if(totalComponents.column1){
                    console.log("column1::",totalComponents.column1.length);
                    for (var i = 0; i< totalComponents.column1.length; i++) {
                       // tsContent += totalComponents.image[i].defination+"\n"
                       htmlContent += '<div src="'+totalComponents.column1[i].column1+'" class="cloumn1"><div/>';
                    }
            }
            console.log("column1",htmlContent);
            obj.html = htmlContent;
            callback(null, tsContent, htmlContent);    
        },
        function(content, contentHtml, callback){
          tsContent = content;
          htmlContent = contentHtml;
            if(totalComponents.column2){
                    console.log("column2::",totalComponents.column2.length);
                    for (var i = 0; i< totalComponents.column2.length; i++) {
                       // tsContent += totalComponents.image[i].defination+"\n"
                       htmlContent += '<div src="'+totalComponents.column2[i].column2+'" class="cloumn2"><div/>';
                    }
            }
            console.log("column2",htmlContent);
            obj.html = htmlContent;
            callback(null, tsContent, htmlContent);    
        },
        function(content, contentHtml, callback){
          tsContent = content;
          htmlContent = contentHtml;
            if(totalComponents.column3){
                    console.log("column3::",totalComponents.column3.length);
                    for (var i = 0; i< totalComponents.column3.length; i++) {
                       // tsContent += totalComponents.image[i].defination+"\n"
                       htmlContent += '<div src="'+totalComponents.column3[i].column3+'" class="cloumn3"><div/>';
                    }
            }
            console.log("column3",htmlContent);
            obj.html = htmlContent;
            callback(null, tsContent, htmlContent);    
        },
        function(content, contentHtml, callback){
          tsContent = content;
          htmlContent = contentHtml;
            if(totalComponents.column4){
                    console.log("column4::",totalComponents.column4.length);
                    for (var i = 0; i< totalComponents.column4.length; i++) {
                       // tsContent += totalComponents.image[i].defination+"\n"
                       htmlContent += '<div src="'+totalComponents.column4[i].column4+'" class="cloumn4"><div/>';
                    }
            }
            console.log("column4",htmlContent);
            obj.html = htmlContent;
            callback(null, tsContent, htmlContent);    
        }
    ], function (err, result, result1) {
    // console.log("result result1", result1);
    // Make HTML component---------------------------------
    if (fs.existsSync(htmlfilePath)) {
        fs.unlink(htmlfilePath,function(err){
                    if(err) return console.log(err);
                    createHtmlFile(htmlfilePath,result1,componentName, req, res);
            });
    }
    else{
        createHtmlFile(htmlfilePath,result1,componentName, req, res);
    }

    // Make TS component -----------------------------
    if (fs.existsSync(filePath)) {
            // if file exists then delete it and make new one
            fs.unlink(filePath,function(err){
                    if(err) return console.log(err);
                     createTsFile(filePath,result,componentName, req, res);
            }); 
    }else{
        createTsFile(filePath,result,componentName, req, res);
    }

    // Make CSS component -----------------------------
    if (fs.existsSync(cssfilePath)) {
            fs.unlink(cssfilePath,function(err){
                    if(err) return console.log(err);
                     createCSSFile(cssfilePath,'', req, res);
            }); 
    }else{
        createCSSFile(cssfilePath,'', req, res);
    }

    });
}

function createTsFile(filePath,fileContent,componentName, req, res){
    var startTs = `import { Component } from '@angular/core';
                    import { Http } from '@angular/http';
                      @Component({
                        selector: '`+componentName+`-root',
                        templateUrl: './`+componentName+`.component.html',
                        styleUrls: ['./`+componentName+`.component.css']
                      })
                      export class `+componentName[0].toUpperCase() + componentName.substring(1)+`Component {
                        constructor(private http : Http){};
                        title = '`+componentName+`';
                        `+fileContent+`
                    }`;
                    fs.appendFile(filePath,startTs,function(data){
                        console.log("TS file createed successfully!.");
                    });
}

function createHtmlFile(htmlfilePath,fileContent,componentName, req, res){
    var startHtml = `<!DOCTYPE html>
                 <html>
                 <title>`+componentName+` Page</title>
                 <style>.wrapper{ width: 600px; margin:0px auto; padding:40px; box-shadow: 0px 0px 7px #ededed;} </style>
                 <body class="wrapper">
                `+fileContent+`
                 </body>
                </html>`;
            fs.appendFile(htmlfilePath, startHtml ,function(data){
                console.log("HTML file createed successfully!.");
                res.send({status: 200, message:"Element created successfully!."});
            });
}


function createCSSFile(cssfilePath,fileContent, req, res){
    var startCss = `.body {
                             
                     }
                    `;
            fs.appendFile(cssfilePath, startCss ,function(data){
                console.log("CSS file createed successfully!.");
            });
}

var createElement = function(req, res){
    var elementType = req.body.type;
    var count = req.body.count;
    var tsContent = ``;    
    switch(elementType){
        case 'input' : 
            var content = '<input type="text" name="textbox" id="textbox">';
            tsContent = 'dynamic_text_'+count+" : any;";
            break;

        case 'button' :
            var content = '<input type="button" name="textbox" id="textbox">';
            tsContent = `dynamic_button_`+count+`(){

            };`;
            break;

        case 'textArea' :
             var content = '<input type="text" name="textbox" id="textbox">';
             tsContent = 'dynamic_text_'+count+" : any;";
            break;
    }
    
    var filePath = '/home/kunvar/login.component.ts';

            if (fs.existsSync(filePath)) {
                
            fs.readFile(filePath, function(err, data) {
                if(err) throw err;
                    theFile = data.toString().split("\n");
                    theFile.splice(-1,1);

                    theFile[theFile.length] = tsContent+"\n }";

                    fs.writeFile(filePath, theFile.join("\n"), function(err) {
                    if(err) {
                        return console.log(err);
                    }
                    console.log("Removed last 1 lines");
                    console.log(theFile.length);
                    res.send({status: 200, message:"Element createed successfully!."});
               });
            });

        // fs.appendFile('/home/kunvar/login.component.ts',tsContent,function(data){
            // res.send({status: 200, message:"Element createed successfully!."});
         // });

    }else{
        var start = `import { Component } from '@angular/core';
          @Component({
            selector: 'login-root',
            templateUrl: './login.component.html',
            styleUrls: ['./login.component.css']
          })
          export class LoginComponent {
            constructor(){};
            title = 'login';
            `+tsContent+`
        }`;
        fs.appendFile('/home/kunvar/login.component.ts',start,function(data){
            res.send({status: 200, message:"Element createed successfully!."});
        });
    }

     
} 

var check = function (req,res){
    res.send({name:req.body.name});
}

var updateMany = function (req,res){

    User.updateMany(
        {key: req.body.key},
        {$set: { "gender": req.body.gender}},
        function (err,data) {
            if (err) {
                res.status(HttpStatus.NOT_FOUND).send({msg:err,status:HttpStatus.NOT_FOUND});
            }
            else if(data){
                res.send({msg:'Updated',status:400,data : data});
            }
        });
}

var getUpdatedValues = function (req,res){

    User.findOneAndUpdate(
        { email: req.body.email },
        { $set: {"key": req.body.key} },
        { new: true },
        function (err,data) {
            if (err) {
                res.send({msg: err, status: 400 });
            }
            else if(data){
                res.send({msg:'Updated',status:400, data : data});
            }
        });
}

var register = function (req, res) {
    var user = {};
    user = req.body;
    console.log(req.body, 'user');
    var token;
    // var condition = { $and: [ { email: { $ne: 1.99 } }, { price: { $exists: true } } ] };
    
    if(!user || !user.email || !user.password && user.key) {
        res.status(HttpStatus.NOT_FOUND).send({msg:"Please provide all the details",status:HttpStatus.NOT_FOUND})
    } else {
        User.findOne({email: user.email,key : user.key},{}, function (err,data) {
            if (err) {
                res.status(HttpStatus.NOT_FOUND).send({msg:err,status:HttpStatus.NOT_FOUND});
            }
            else if(data){
                res.send({msg:"Someone is already using email: "+user.email+" and key: "+user.key,status:400});
            } else {
                crypto.randomBytes(10, function (err, buf) {
                    token = buf.toString('hex');
                    user.verificationToken = token;
                    user.verifyEmail = {
                        email: req.body.email.toLowerCase(),
                        verificationStatus: false
                    };
                    var errorMessage = "";
                    User(user).save(function (err, data) {
                        if (err) {
                             res.send(messageHandler.errMessage(err));
                        } else {
                            var verifyurl = 'verifyemail/' + user.verificationToken;
                            Mail.registerMail(user,verifyurl, function(msg) {
                                console.log('Mail sent successfully.')
                            });
                            res.status(HttpStatus.OK).send({msg: "user registered successfully.",status:HttpStatus.OK});
                        }
                    });
                });
            }
        });
    }
}

/*________________________________________________________________________
 * @Date:       10 Nov,2017
 * @Method :    verifyEmail
 * Modified On: -
 * @Purpose:    This function is used to verify user.
 _________________________________________________________________________
 */

var verifyEmail = function (req, res) {
    User.findOne({verificationToken: req.params.token}, function (err, data) {
        if (err) {
            res.status(203).send({msg: "Something went wrong."});
        } else {
            if (!data) {
                res.status(203).send({msg: "Token is expired."});
            } else {
                var verificationStatus = data.verifyEmail.verificationStatus;
                var user_id = data._id;
                if (verificationStatus === true) { // already verified
                    console.log("account verified");
                    res.status(200).send({msg: "Account Already verified."});
                } else { // to be verified
                    data.email = data.verifyEmail.email;
                    data.verifyEmail = {
                        email: data.verifyEmail.email,
                        verificationStatus: true
                    };
                    data.save(function (err, data) {
                        if (err) {
                            res.status(203).send({msg: "Something went wrong."});
                        } else {
                            Mail.verifyAccountMail(data.email, function (msg) {
                                console.log('Mail sent successfully.')
                            });
                            res.status(200).send({msg: "Account Activated successfully."});
                        }
                    });
                }
            }
        }
    });
};
/*________________________________________________________________________
 * @Date:       10 Nov,2017
 * @Method :    login
 * Modified On: -
 * @Purpose:    This function is used to authenticate user.
 _________________________________________________________________________
 */

var login = function (req, res) {
    var user = req.body;
    if (!user || !user.email) {
        res.status(HttpStatus.NOT_FOUND).send({msg: "Please provide valid email and password",status:HttpStatus.NOT_FOUND});
    } else {
        User.findOne({email: user.email},
            {}, function (err, data) {
                if (err) {
                    res.status(HttpStatus.NOT_FOUND).send({msg: err,status:HttpStatus.NOT_FOUND});
                } else {
                    if(data){
                        if(data.verifyEmail.verificationStatus == false) {
                            res.status(HttpStatus.NOT_FOUND).send({msg: "Your email is not verified.",status:HttpStatus.NOT_FOUND});
                        }else {
                            if (data) {
                                bcrypt.compare(user.password, data.password, function (err, result) {
                                    if (err) {
                                        res.status(HttpStatus.NON_AUTHORITATIVE_INFORMATION).send({msg: err,status:HttpStatus.NON_AUTHORITATIVE_INFORMATION});
                                    } else {
                                        if (result === true) {
                                            data.active = true;
                                            data.lastSeen = new Date().getTime();
                                            data.save(function (err, success) {
                                                if (!err) {
                                                    var token = jwt.sign({_id: data._id}, config.secret);
                                                    // to remove password from response.
                                                    data = data.toObject();
                                                    delete data.password;
                                                    res.status(HttpStatus.OK).json({token: token, data: data,status:HttpStatus.OK});
                                                }
                                            });
                                        } else {
                                            res.status(HttpStatus.NOT_FOUND).send({msg: 'Authentication failed due to wrong details.',status:HttpStatus.NOT_FOUND});
                                        }
                                    }
                                });
                            } else {
                                res.status(HttpStatus.NOT_FOUND).send({msg: 'No account found with given email.',status:HttpStatus.NOT_FOUND});
                            }
                    }
                }
                else{
                   res.status(HttpStatus.NOT_FOUND).send({msg: "Your email is not register with us. Please signup first",status:HttpStatus.NOT_FOUND}); 
                }
            }
        });
    }
};


/*________________________________________________________________________
 * @Date:       10 Nov,2017
 * @Method :    forgot_password
 * Modified On: -
 * @Purpose:    This function is used when user forgots password.
 _________________________________________________________________________
 */
var forgotPassword = function (req, res) {
    crypto.randomBytes(10, function (err, buf) {
        var token = buf.toString('hex');
        User.findOne({email: req.body.email}, function (err, data) {
            if (err) {
                res.status(HttpStatus.NON_AUTHORITATIVE_INFORMATION).send({msg: 'Please enter a valid email.',status:HttpStatus.NON_AUTHORITATIVE_INFORMATION});
            } else if (!data) {
                res.status(HttpStatus.NON_AUTHORITATIVE_INFORMATION).send({msg: 'Email does not exist.',status:HttpStatus.NON_AUTHORITATIVE_INFORMATION});
            } else {
                if (data) {
                    data.resetPasswordToken = token,
                    data.resetPasswordExpires = Date.now() + 3600000;

                    data.save(function (err, data) {
                        if (err) {
                            res.status(HttpStatus.NON_AUTHORITATIVE_INFORMATION).send({msg: 'Something went wrong.',status:HttpStatus.NON_AUTHORITATIVE_INFORMATION});
                        } else {
                            Mail.resetPwdMail(req.body, token, function (msg) {
                                console.log('Reset password mail sent successfully.')
                            });
                        }
                        res.status(HttpStatus.OK).send({msg: 'Email sent successfully.',status:HttpStatus.OK});
                    });
                }
            }
        });

    });
};


/*________________________________________________________________________
 * @Date:       10 Nov,2017
 * @Method :    resetPassword
 * Modified On: -
 * @Purpose:    This function is used when user reset password.
 _________________________________________________________________________
 */


var resetPassword = function (req, res) {
    if (req.body.newPassword && req.body.token) {
        User.findOne({resetPasswordToken: req.body.token}, function (err, data) {
            if (err) {
                res.status(HttpStatus.NON_AUTHORITATIVE_INFORMATION).send({msg: 'No record found.',status:HttpStatus.NON_AUTHORITATIVE_INFORMATION});
            } else {
                if (!data) {
                    res.status(HttpStatus.NON_AUTHORITATIVE_INFORMATION).send({msg: 'Reset Password token has been expired.',status:HttpStatus.NON_AUTHORITATIVE_INFORMATION});
                } else {

                    data.password = req.body.newPassword;
                    data.resetPasswordToken = undefined;
                    data.resetPasswordExpires = undefined;

                    data.save(function (err, data) {
                        if (err) {
                            res.status(HttpStatus.NON_AUTHORITATIVE_INFORMATION).send({msg: 'No record found.',status:NON_AUTHORITATIVE_INFORMATION});
                        } else {
                            Mail.resetConfirmMail(data, function (msg) {
                                console.log('Reset Confirmation mail sent successfully.')
                            });
                            res.status(HttpStatus.OK).send({msg: 'Password has been successfully updated.',status:HttpStatus.OK});
                        }
                    });
                }
            }
        });
    }
    else{
        res.status(HttpStatus.BAD_REQUEST).send({msg: GlobalMessages.CONST_MSG.fillAllFields,status:HttpStatus.BAD_REQUEST});
    }
};

/*________________________________________________________________________
 * @Date:       16 Nov,2017
 * @Method :    imageUpload
 * Modified On: -
 * @Purpose:    This function is used when user reset password.
 _________________________________________________________________________
 */
var storage =   multer.diskStorage({
      destination: function (req, file, callback) {
        callback(null, './uploads');
      },
      filename: function (req, file, callback) {
        callback(null, file.fieldname + '-' + Date.now());
      }
    });
    var upload = multer({ storage : storage},{limits: {
          fieldNameSize: 100,
          files: 2,
          fields: 5
    }}).single('userPhoto');
  
 var imageUpload = function (req, res) {
     upload(req,res,function(err) {
        if(err) {
            return res.send({msg:GlobalMessages.CONST_MSG.fileUploadError,err:err.message});
        }
        res.send({msg:GlobalMessages.CONST_MSG.fileUploadSuccess, status:HttpStatus.OK});
    });

 }



//  functions
exports.register = register;
exports.verifyEmail = verifyEmail;
exports.login = login;
exports.forgotPassword = forgotPassword;
exports.resetPassword = resetPassword;
exports.imageUpload = imageUpload;
exports.check = check;
exports.updateMany = updateMany;
exports.getUpdatedValues = getUpdatedValues;


exports.createElement = createElement;
exports.createFile = createFile;