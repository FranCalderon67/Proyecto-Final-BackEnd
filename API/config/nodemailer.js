const { createTransport } = require('nodemailer')

require('dotenv').config()

const transporter = createTransport({
    service: "gmail",
    port: 587,
    auth: {
        user: 'franciscocalderon1990@gmail.com',
        pass: process.env.gmailPass,
    },
});

const adminEmail = process.env.ADMINMAIL

const notifyNewUser = async (data) => {
    try {
        const status = await transporter.sendMail({
            from: "Admin <administrador@sticker.com>",
            to: adminEmail,
            subject: "Nuevo usuario",
            html: `
            <h1>Nuevo usuario registrado</h1>
            <ul>
            <li>Usuario: ${data.email}</li>
            <li>Nombre: ${data.nombre} ${data.apellido}</li>
            <li>Direccion: ${data.direccion}, ${data.numeracion}, ${data.ciudad}, ${data.provincia}, ${data.pais}</li>
            <li>Edad: ${data.edad}</li>
            <li>Telefono:${data.prefijo} ${data.telefono}</li>
            </ul>
            `,
        });
        console.log(status);
    } catch (error) {
        console.error(error);
    }
};


const notifyOrder = async (data) => {
    try {
        const status = await transporter.sendMail({
            from: "Admin <administrador@sticker.com>",
            to: adminEmail,
            subject: "Nuevo compra realizada",
            html: `
            <h1>Nuevo Compra en tienda Stickers</h1>
            <ul>
            <li>Usuario: ${data.email}</li>
            <li>Nombre: ${data.nombre} ${data.apellido}</li>
            <li>Direccion: ${data.direccion}, ${data.numeracion}, ${data.ciudad}, ${data.provincia}, ${data.pais}</li>
            <li>Edad: ${data.edad}</li>
            <li>Telefono:${data.prefijo} ${data.telefono}</li>
            <li>Carrito: ${data.carrito.map((p) => `<ul><li><li><img src="${p.image}"/></li>Producto:${p.name} - $:${p.price}</li></ul>`)}
            </li>
            </ul>
            `,
        });
        console.log(status);
    } catch (error) {
        console.error(error);
    }
};

module.exports = { notifyNewUser, notifyOrder };