import nodemailer from 'nodemailer'
import dotenv from 'dotenv'
import orderModel from '../models/orderModel.js';

dotenv.config();

const config = {
  service: "gmail",
  auth: {
    user: process.env.DIR_GMAIL,
    pass: process.env.PASS_GMAIL
  }
}

export const transporter = nodemailer.createTransport(config);

export default async function mailGenerator(type, info) {
  let html;

  switch (type) {
    case 'register':
      html = (
        "<h2>Register successfully in AMBAR e-commerce</h2>" +
        "<br />" +
        "<h4>You new user is:</h4>" +
        `<p>ID: ${info.firebaseUid} </p>` +
        `<p>Name: ${info.name} </p>` +
        `<p>Email: ${info.email} </p>` +
        `<p>Phone: ${info.phone} </p>` +
        `<p>City: ${info.city} </p>` +
        `<p>Address: ${info.address} </p>` +
        "<br /><br />" +
        "<p>Please remember and do not share your password... </p>" +
        "<br />" +
        "<p>Thank you for registering in our app, enjoy!</p>" +
        "<br />" +
        "<h3>AMBAR</h3>");

      return {
        from: process.env.DIR_GMAIL,
        to: info.email,
        subject: "Register successfully ✔",
        text: "Register successfully in AMBAR e-commerce",
        html: html
      }
      break;

    case 'editUser':
      html = (
        "<h2>User updated successfully in AMBAR e-commerce</h2>" +
        "<br />" +
        "<h4>You new user is:</h4>" +
        `<p>ID: ${info.firebaseUid} </p>` +
        `<p>Name: ${info.name} </p>` +
        `<p>Email: ${info.email} </p>` +
        `<p>Phone: ${info.phone} </p>` +
        `<p>City: ${info.city} </p>` +
        `<p>Address: ${info.address} </p>` +
        "<br /><br />" +
        "<p>Please remember and do not share your password... </p>" +
        "<br />" +
        "<p>Thank you for use our app, enjoy!</p>" +
        "<br />" +
        "<h3>AMBAR</h3>");

      return {
        from: process.env.DIR_GMAIL,
        to: info.email,
        subject: "User updated successfully ✔",
        text: "User updated successfully in AMBAR e-commerce",
        html: html
      }
      break;

    case 'createOrder':
      const order = await orderModel.findById(info._id).populate('user').populate('items.product');

      const itemsHtml = order.items.map((item) => {
        return (
          `<div key=${item.product._id} id=${item.product._id}>`+
          `<p>${item.qty} - ${item.product.name} - ${item.product.brand}</p>` +
          `<p>$${item.product.price} X ${item.qty} units = $${item.product.price * item.qty}</p>` +
          `</div>`)
      })

      html = (
        `<h2>Thanks you for your order in AMBAR e-commerce</h2>` +
        `<h3>Your Order number: ${order._id}</h3>` +
        `<hr/>` +
        `<p>Name: ${order.user.name}</p>` +
        `<p>Phone: ${order.user.phone}</p>` +
        `<p>Email: ${order.user.email}</p>` +
        `<p>Delivery: ${order.deliveryOptions}</p>` +
        `<p>Address: ${order.deliveryAddress}</p>` +
        `<p>Payment: ${order.paymentOptions}</p>` +
        `<p>Date: ${order.createdAt}</p>` +
        `<hr/>` +
        `<h3>ITEMS ORDERED</h3>` +
        `${itemsHtml}` +
        `<hr/>` +
        `<h2>TOTAL: ${order.total}</h2>` +
        `<hr/>` +
        `<p>Your order was successfully registered ✔</p>` +
        `<h3>AMBAR</h3>`);

      return {
        from: process.env.DIR_GMAIL,
        to: order.user.email,
        subject: "Order register successfully ✔",
        text: "Thanks you for your order in AMBAR e-commerce",
        html: html
      }
      break;

      case 'contact':
        html = (
          "<h2>You have received a message from your contact form on AMBAR's page</h2>" +
          "<h4>contact information</h4>" +
          `<p>Name: ${info.name} </p>` +
          `<p>Email: ${info.email} </p>` +
          `<p>Phone: ${info.phone} </p>` +
          "<hr/>" +
          `<p>Subject: ${info.subject} </p>` +
          `<p>Message: ${info.message} </p>` +
          "<hr/>" +
          "<h3>AMBAR</h3>");
  
        return {
          from: process.env.DIR_GMAIL,
          to: [process.env.DIR_GMAIL, info.email],
          subject: "Contact message received",
          text: "You have received a message from your contact form on AMBAR's page",
          html: html
        }
        break;

    default:
      console.log('type of mail incorrect')
      break;
  }
}