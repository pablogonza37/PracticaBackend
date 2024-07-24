const transporter = require('../helpers/nodemailer')

const registroUsuario = async(nombre, apellido, emailUsuario) => {
  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: `Bienvenido a nuestra pagina!!!👻" <${process.env.GMAIL_USER}>`, // sender address
    to: `andresperlo5@gmail.com`, // list of receivers
    subject: "Bienvenido ✔", // Subject line
    html: `
     <div>
        <div style='display: flex; justify-content: center;'>
            <img src="https://images.vexels.com/content/234933/preview/bienvenida-badge-banner-8aaee8.png" alt="">
        </div>
        
        <div>
            <img src="https://www.shutterstock.com/image-photo/young-smiling-male-businessman-founder-600nw-2454061349.jpg" alt="" width="100%">
        </div>
    </div>
    `, // html body
  });
}

const pagoProductosUsuario = async() => {
  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: `Pago exitoso!!!👻" <${process.env.GMAIL_USER}>`, // sender address
    to: `andresperlo5@gmail.com`, // list of receivers
    subject: "Gracias por tu compra ✔", // Subject line
    html: `
     <div>
        <div style='display: flex; justify-content: center;'>
            <img src="https://images.vexels.com/content/234933/preview/bienvenida-badge-banner-8aaee8.png" alt="">
        </div>
        
        <div>
            <img src="https://www.shutterstock.com/image-photo/young-smiling-male-businessman-founder-600nw-2454061349.jpg" alt="" width="100%">
        </div>
    </div>
    `, // html body
  });
}

const recuperoContraseniaUsuario = async(token) => {
  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: `Pago exitoso!!!👻" <${process.env.GMAIL_USER}>`, // sender address
    to: `andresperlo5@gmail.com`, // list of receivers
    subject: "Gracias por tu compra ✔", // Subject line
    html: `
     <div>
        <div style='display: flex; justify-content: center;'>
            <img src="https://images.vexels.com/content/234933/preview/bienvenida-badge-banner-8aaee8.png" alt="">
        </div>
        
        <div>
            <img src="https://www.shutterstock.com/image-photo/young-smiling-male-businessman-founder-600nw-2454061349.jpg" alt="" width="100%">
        </div>
    </div>
    `, // html body
  });
}

module.exports = {
  registroUsuario,
  pagoProductosUsuario,
  recuperoContraseniaUsuario
}
