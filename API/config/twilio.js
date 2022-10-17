require('dotenv').config()
const twilio = require('twilio')

const accountSid = process.env.twilioSid
const authToken = process.env.twilioToken

const client = twilio(accountSid, authToken)

const enviarMsn = async (data) => {
    try {
        const message = await client.messages.create({
            body: `
            Nuevo usuario registrado:
            Usuario: ${data.email}
            Nombre: ${data.nombre} ${data.apellido}
            Direccion: ${data.direccion}, ${data.numeracion}, ${data.ciudad}, ${data.provincia}, ${data.pais}
            Edad: ${data.edad}
            Telefono:${data.prefijo} ${data.telefono}
            `,
            from: 'whatsapp:+14155238886',
            to: `whatsapp:${process.env.adminPhone}`
        })
        return message
    } catch (error) {
        console.log("error=>", error)
    }

}

const enviarMsnCompra = async (data) => {
    try {
        const message = await client.messages.create({
            body: `
            Nueva compra realizada:
            Usuario: ${data.email}
            Nombre: ${data.nombre} ${data.apellido}
            Direccion: ${data.direccion}, ${data.numeracion}, ${data.ciudad}, ${data.provincia}, ${data.pais}
            Edad: ${data.edad}
            Telefono:${data.prefijo} ${data.telefono}
            carrito: ${data.carrito}
            `,
            from: 'whatsapp:+14155238886',
            to: `whatsapp:${process.env.adminPhone}`
        })
        return message
    } catch (error) {
        console.log("error=>", error)
    }

}

const enviarMsnCompraCliente = async (data) => {
    try {
        const message = await client.messages.create({
            body: `
            Tu pedido ha sido recibido y se encuentra en proceso.
            `,
            messagingServiceSid: 'MGbd717680be186fb3e4ae9ef7ff9f0f64',
            to: `${data.prefijo}${data.telefono}`
        })
        return message
    } catch (error) {
        console.log("error=>", error)
    }

}



module.exports = { enviarMsn, enviarMsnCompra, enviarMsnCompraCliente };