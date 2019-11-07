module.exports = ({productos, client, order_num, order_estado, tienda }) => {
    const today = new Date();
return `
<!doctype html>
<html>
   <head>
      <meta charset="utf-8">
      <title>PDF Result Template</title>
      <style>
          p{
            margin: 0px;
          }
         .invoice-box {
         max-width: 800px;
         margin: auto;
         padding: 30px;
         border: 1px solid #eee;
         box-shadow: 0 0 10px rgba(0, 0, 0, .15);
         font-size: 16px;
         line-height: 24px;
         font-family: 'Helvetica Neue', 'Helvetica';
         /* color: #555; */
         }
         .margin-top {
         margin-top: 50px;
         }
         .justify-center {
         text-align: center;
         }
         .invoice-box table {
         width: 100%;
         line-height: inherit;
         text-align: left;
         }
         .invoice-box table td {
         padding: 5px;
         vertical-align: top;
         }
         .invoice-box table tr td.info-company:nth-child(2) {
         text-align: right;
         }
         .invoice-box table tr#pageHeader.top table td {
         padding-bottom: 20px;
         }
         .invoice-box table tr#pageHeader.top table td.title {
         font-size: 45px;
         line-height: 45px;
         color: #333;
         }
         .invoice-box table tr.information table td {
         padding-bottom: 40px;
         }
         .invoice-box table tr.heading td {
         background: #eee;
         border-bottom: 1px solid #ddd;
         font-weight: bold;
         }
         .invoice-box table tr.details td {
         padding-bottom: 20px;
         }
         .invoice-box table tr.item td {
         border-bottom: 1px solid #eee;
         }
         .invoice-box table tr.item.last td {
         border-bottom: none;
         }
         .invoice-box table tr.total td:nth-child(2) {
         border-top: 2px solid #eee;
         font-weight: bold;
         }
         @media only screen and (max-width: 600px) {
         .invoice-box table tr.top table td {
         width: 100%;
         display: block;
         text-align: center;
         }
         .invoice-box table tr.information table td {
         width: 100%;
         display: block;
         text-align: center;
         }             
         }
         .invoice-box table tr.information table td.text-align-right{
            text-align: right !important;
         }
      </style>
   </head>
   <body>
      <div class="invoice-box">
         <table cellpadding="0" cellspacing="0">
            <tr id="pageHeader" class="top">
               <td colspan="4">
                  <table>
                     <tr>
                        <td width="50%" class="title">
                            <img  src="https://i.ibb.co/0hfqJFr/logo.png"
                           style="width:100%; max-width:156px;">
                        </td>
                        <td class="info-company">
                           <p>${`${today.getDate()} de ${monthName(today.getMonth())} del ${today.getFullYear()}`}</p>
                           <strong><p> ${tienda.title} </p></strong>                               
                           <p>RIF: J-${tienda.rif} </p>
                           <p> ${tienda.direccion} </p>
                           <p> Tlf. ${tienda.phone} </p>
                        </td>
                     </tr>
                  </table>
               </td>
            </tr>
            <tr id="pageHeader" class="information">
               <td colspan="4">
                  <table>
                     <tr>
                        <td>
                           <p>Cliente: ${client.name}</p>
                           <p>Cedula: ${client.cedula}</p>
                           <p>Direccion: ${client.direccion.localidad}</p>
                           <p>C. Postal: ${client.direccion.codpost}</p>
                        </td>
                        <td class="text-align-right">
                           <strong><p>Factura #${order_num}</p></strong>  
                           <p>Estado de la orden: ${order_estado}</p>
                           <p>Cantidad de productos: ${orderDatos(productos).countProductxUnit} Uni.</p>
                           <strong> <p>Total a pagar: ${orderDatos(productos).totalOrderPrices} BsS</p></strong>  
                        </td>
                     </tr>
                  </table>
               </td>
            </tr>
            <tr class="heading">
               <td>Producto</td>
               <td>Precio Unitario</td>
               <td>Cantidad</td>
               <td>Total</td>
            </tr>
            ${generateTableProduct(productos)}       
         </table>
         <br />
      </div>
   </body>
</html>
    `;
};

function generateTableProduct(productos){
   let html = '';
   productos.map( product =>{
      html += `<tr class="item">
      <td>${product.title}</td>
      <td>${parseInt(product.prices)}</td>
      <td>${product.quantity}</td>
      <td>${parseInt(product.quantity*product.prices)}</td>
      </tr>`     
   })
   return html
}

function orderDatos(productos){
   let countProduct = 0;
   let totalOrderPrices = 0;
   let countProductxUnit = 0;
   
   productos.map( product =>{
      countProduct += 1;
      countProductxUnit += product.quantity;
      totalOrderPrices += parseInt( product.quantity * product.prices )
   })

   return {
      countProduct,
      countProductxUnit,
      totalOrderPrices
   }
}

function monthName(numMonth){
   const nomthNames = [
      'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio',
      'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
   ]

   return nomthNames[numMonth]
}