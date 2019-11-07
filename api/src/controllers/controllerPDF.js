'use strict'
require('../config/config')
const {successResponse, errorResponse} = require('../helpers/apiResponse')
const jwt = require('jsonwebtoken')
const pdf = require('html-pdf')
const pdfTemplate = require('../helpers/generatePDF')
const path = require('path')
const nodemailer = require('nodemailer')

class controllerPdf{
        
    /**
     * Generate report in PDF.
     * 
     * @method POST
     * @param void
     */
    static async create(req, res){
        let respp, config;
        config ={
            format: 'Letter' ,
            paginationOffset: 1,       // Override the initial pagination number
            // "header": {
            //   "height": "45mm",
            //   "contents": '<div style="text-align: center;">Author: Marc Bachmann</div>'
            // },
        }

        await pdf.create(pdfTemplate(req.body), config).toFile('reporte001.pdf', (err) =>{
                if(err){
                    return res.send(Promise.recject())
                }
                    // console.log(resp);
                return res.send(Promise.resolve())
                // return res.send(resp)
                // res.send(Promise.resolve())
           })

        // successResponse(res, "Success", 200, resp)
    }


      /**
     * Generate report in PDF.
     * 
     * @method POST
     * @param void
     */
    static async emails(req, res){
        // let message = {
        //     from: '',
        //     to: 'Nodemailer <example@nodemailer.com>',
        //     subject: 'AMP4EMAIL message',
        //     text: 'For clients with plaintext support only',
        //     html: '<p>For clients that do not support AMP4EMAIL or amp content is not valid</p>',
        //     amp: `<!doctype html>
        //     <html ⚡4email>
        //       <head>
        //         <meta charset="utf-8">
        //         <style amp4email-boilerplate>body{visibility:hidden}</style>
        //         <script async src="https://cdn.ampproject.org/v0.js"></script>
        //         <script async custom-element="amp-anim" src="https://cdn.ampproject.org/v0/amp-anim-0.1.js"></script>
        //       </head>
        //       <body>
        //         <p>Image: <amp-img src="https://cldup.com/P0b1bUmEet.png" width="16" height="16"/></p>
        //         <p>GIF (requires "amp-anim" script in header):<br/>
        //           <amp-anim src="https://cldup.com/D72zpdwI-i.gif" width="500" height="350"/></p>
        //       </body>
        //     </html>`
        // }

        let transporter  = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            secure: false, // upgrade later with STARTTLS
            auth: {
              user: "pedro.rivas@tigears.com",
              pass: "04148721258Ab/*"
            },
            tls: {
                rejectUnauthorized: false
            }
        });

        let mailOptions = {
            // should be replaced with real recipient's account
            from: 'pedro.rivas@tigears.com',
            to: 'josesleiter@gmail.com',
            subject: 'Tu pedido es ',
            text: 'Postcard',
            html: `<!DOCTYPE html>
            <html lang="en-US">
            <head>
                <meta charset="utf-8">
                <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0" />
                <!-- <link href="https://fonts.googleapis.com/css?family=Raleway&display=swap" rel="stylesheet"> -->
                <style>
                    *{
                        font-family: 'Raleway', sans-serif;
                    }
                    .btn, .text {
                        margin: 0px;
                        padding: 0px;
                    }
                    body{
                        box-sizing: border-box;
                    }
                    body table#content-mail {
                        width: 45% !important;
                        height: 700px !important;
                        margin: auto !important;
                        background: black !important;
                        max-width: 800px;
                        min-width: 600px;
                        padding: 60px;
                    }
                    body table#content-mail-2 {
                        width: 45% !important;
                        height: 200px !important;
                        margin: auto !important;
                        background: #707070 !important;
                        max-width: 800px;
                        min-width: 600px;
                        padding: 60px;
                    }
            
                    .auto{
                        margin: auto !important;
                    }
                    /* .table {width:195px !important;margin:auto !important;} */
                    .text-white{
                        color: white !important;
                    }        
                    .text-blue{
                        color: #02d4ff !important;
                    }
                    .text-black{
                        color: black !important;
                    }
                    .backgrwhite{
                        background: white;
                    }
                    .price-text{
                        color: black !important;
                        font-weight: bold;
                    }
                    p,h1,h2,h3{
                        text-align: center !important;
                        font-family: 'Raleway', sans-serif;
                        color: white !important;
                        font-weight: bold;
                    }
            
                    a{
                        text-decoration: none;
                        cursor: pointer;
                    }
                   
                    .text-upp{
                        text-transform: uppercase;
                    }
                    .font20{
                        font-size: 20px;
                    }
                    .text-bold{
                        font-weight: bold;
                    }
                    .btn{
                        width: 60%;
                        height: 60px;
                        border-radius: 40px;
                        cursor: pointer !important;
                    }
                  
                    .btn-primary{
                        border: none;
                        background:  #02d4ff !important;
                        padding: 0px;
                        margin: 0px;
                    }      
                    .inlineonly{
                        display: inline;
                    }
                    .inline{
                        display: inline-block;
                        margin: 0px 60px;
                    }
                    #table-content{
                        width: 100% !important;
                        margin: auto !important;
                        max-width: 1400px !important;
                        min-width: 1400px !important;  
                        height: 100%;
                    }
                    </style>
            </head>
            <body>
                <table id="table-content" align="center" >
                    <tr>
                        <td>
                            <table id="content-mail" align="center" style="background: black;">
                               
                                <tr>
                                    <td align="center" class="title-mail font20 text-upp">                 
                                        <p> confirmación de pedido </p>
                                    </td>
                                </tr>
                                <tr>
                                    <td align="center" class="title-mail">                 
                                        <p> Hola, ${ req.body.name }</p>
                                        <p> el id de tu pedido es</p>
                                    </td>
                                </tr>                          
                                <tr>
                                    <td align="center" style="height: 60px;" class="backgrwhite">
                                            <p class="price-text font20">${ req.body.name }</p>
                                    </td>
                                </tr>
                                <tr>
                                    <td align="center"  style="height: 60px;">
                                        <p> Fecha y Hora</p>
                                    </td>                            
                                </tr>                     
                                <tr>
                                    <td align="center" style="height: 60px;" class="backgrwhite">
                                        <p class="price-text font20">{{$data->class_fecha}}, {{$data->class_hours}}</p>
                                    </td>
                                </tr>
                                <tr>
                                    <td align="center"  style="height: 60px;">
                                        <br>
                                        <p> Con</p>
                                    </td>                            
                                </tr>
                                <tr>                        
                                    <td align="center" style="height: 60px;" class="backgrwhite">
                                            <p class="price-text font20">{{$data->coach_name}}</p>
                                    </td>
                                </tr>
                                <tr>
                                    <td align="center"  style="height: 60px;">
                                        <br>
                                        <p> Mat</p>
                                    </td>                            
                                </tr>
                                <tr>                        
                                    <td align="center" style="height: 60px;" class="backgrwhite">
                                            <p class="price-text font20">14</p>
                                    </td>
                                </tr>                                                           
                            </table>
                            <table id="content-mail-2" align="center">
                                <tr>
                                    <td  align="center" >
                                        <p class="font20">
                                            Para más informacion sobre tu reservacion o para
                                            <br>
                                            cancelarla te pedimos ingreses a mi cuenta
                                        </p>        
                                        <br>                    
                                        <a class="btn btn-primary" href="{{ url('auth/verify', $data->verification_code)}}" target="_blank" style="display: inline-block; color: #3498db; background-color: transparent; box-sizing: border-box; cursor: pointer; text-decoration: none;  font-weight: bold; margin: 0;  text-transform: capitalize; border-color: #3498db; padding: 2.5% 0;">
                                            <p style="margin: 0;" class="font20 text-upp ">mi cuenta</p>
                                        </a>                                                    
                                    </td>
                                </tr>       
                            </table>
                                                                
                            <table  id="" align="center" height="250" width="100%" style="border-top: 1px solid #02d4ff !important;">
                                <tr>
                                    <td align="center">
                                        <a title="{{$data->shop_name}}" href="{{ url($data->shop_url, '')}}"  class="text-white">
                                            <img src="{{ asset($data->shop_logo_b) }}" alt="{{$data->shop_name}}" />
                                        </a>                                                
                                        <br>
                                        <a title="{{$data->shop_faceb_name}}" href="{{$data->shop_faceb_url}}"  class="text-white">
                                            <img src="{{ asset($data->shop_faceb_footer) }}" alt="{{$data->shop_faceb_url}}" />
                                        </a>
                                        <a title="{{$data->shop_insta_name}}" href="{{$data->shop_insta_url}}"  class="text-white">
                                            <img src="{{ asset($data->shop_insta_footer) }}" alt="{{$data->shop_insta_url}}" />
                                        </a>
                                        
                                    </td>
                                </tr>
                                <tr  style="border-bottom:4px solid #333333;padding:7px 0">
                                    <td>
                                        <p class="text-black font20 text-bold">¿Necesitas ayuda?
                                            <br>
                                            <a class="text-black" href="mailto:{{$data->shop_mail}}">contacto@barremx.com</a>
                                        </p>
                                    </td>
                                </tr>
                    
                            </table> 
                        </td>
                    </tr>
                    
                </table>                   
            </body>
            </html>`
        };

        // transporter.verify(function(error, success) {
        //     if (error) {
        //       console.log(error);
        //     } else {
        //       console.log("Server is ready to take our messages");
        //     }
        // });

        await transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return console.log(error);
            }
            console.log('Message %s sent: %s', info.messageId, info.response);
        });
       
        successResponse(res, "Success", 200, [])
    }

    
    /**
     * Download report in PDF.
     * 
     * @method GET
     * @param ObjectId Id del producto a solicitar
     */
    static async download(req, res){
        res.sendFile(path.join(__dirname,'../../','reporte001.pdf'))
    }
}
module.exports = controllerPdf;