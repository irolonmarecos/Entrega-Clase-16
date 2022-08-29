const socket = io()

socket.on('connect', ()=>{
    console.log('Conectado al Servidor');
})

socket.on('MOSTRAR_PRODUCTOS', async(msg)=>{
    document.getElementsByClassName('lista').innerHTML = "" ;

    Catalogo(msg)
})


function AgregarProducto (){
    const nombre = document.getElementById('nombre').value;
    const precio = document.getElementById('precio').value;
    const uru = document.getElementById('uru').value;
    socket.emit('ENVIAR_PRODUCTO',{ nombre, precio, uru})
}

const Catalogo =  (prods) => {
    
        return fetch("../views/main.hbs").then((resp) => {
            return resp.text();
        }).then((text) => {
          const template = Handlebars.compile(text);
          const html = template({prods:prods});
          document.getElementById('listado-prods').innerHTML = html;
            

        });
}



//    CHAT



socket.on('connect', ()=>{
    console.log('Conectado al CHAT del servidor');
})

socket.on('TOTAL_MENSAJES',(msg)=>{
    document.getElementById('chat').innerHTML = ''
    //console.log(MensajesRecibidos(msg));
    MensajesRecibidos(msg)
})
socket.on('NUEVO_MENSAJE', (msj)=>{
    agregarMsj(msj)
})

function agregarMsj(msg) {
    console.log(msg);
    document.getElementById("msj-chat").innerHTML += `
        <div>
          <b class="infoMail" style="color: black">${msg.email}:</b> 
          <b class="infoMail" style="color: rgb(76, 216, 118)">${msg.created_at}:</b> 
          <b class="infoMsj" style="color: black">${msg.mensaje}</b> 

          </hr>
        </div>
    `;
}  

const MensajesRecibidos =  (msj) => {
    console.log(msj);

    return fetch("../views/partials/chat.hbs").then((resp) => {
        return resp.text();
    }).then((text) => {
      const template = Handlebars.compile(text);
      const html = template({msj:msj});
      document.getElementById('msj-chat').innerHTML = html;
    });
}   

function enviarMensaje(){
    const email = document.getElementById('email').value;
    const mensaje = document.getElementById('mensaje').value;
    socket.emit('ENVIAR_MENSAJE', { email, mensaje })

} 