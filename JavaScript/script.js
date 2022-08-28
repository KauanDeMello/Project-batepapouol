let nomeUsuario;
const todos = "todos";
const type = "message";



function recebernome(){
    nomeUsuario = prompt('Qual o seu nome?');

    const promessa = axios.post('https://mock-api.driven.com.br/api/v6/uol/participants', 
    
    {
        name: nomeUsuario
    });


    promessa.catch(erro);
    
};

recebernome();

function erro(){
    alert('User já existe!');
    recebernome();
}


//function para manter o servidor




const manterConexao = axios.post('https://mock-api.driven.com.br/api/v6/uol/status', 
{
    name: nomeUsuario
});

manterConexao.then(setInterval(manterConexao2, 5000)); 

function manterConexao2(respos){
    const manterConexao = axios.post('https://mock-api.driven.com.br/api/v6/uol/status', 
{
    name: nomeUsuario
});
}

// receber mensagens

function getM(){
    const terceiraPromessa = axios.get("https://mock-api.driven.com.br/api/v6/uol/messages");

    terceiraPromessa.then(renderM);
}

setInterval(getM, 3000);

function renderM(resposta) {
    const container = document.querySelector(".container");
    const mensagens = resposta.data;

    container.innerHTML = "";    

    for (i = 0; i < mensagens.length; i++){
        if(mensagens[i].type === "status"){
            container.innerHTML += `
            <div class="statusM">
                <div class="time">(${mensagens[i].time})</div>
                <div class="name">${mensagens[i].from}</div>
                <div class="text">${mensagens[i].text}</div>
            </div>`
        }

        if(mensagens[i].type === "message"){
            container.innerHTML += `
            <div class="publicM">
                    <div class="time">(${mensagens[i].time})</div>
                    <div class="name">${mensagens[i].from}</div>
                    para 
                    <div class="receiver">${mensagens[i].to}</div>
                    <div class="text">${mensagens[i].text}</div>
            </div>`
        }

        if(mensagens[i].type === "private_message" && mensagens[i].to === nomeUsuario){
            container.innerHTML += `
            <div class="privateM">
                    <div class="time">(${mensagens[i].time})</div>
                    <div class="name">${mensagens[i].from}</div>
                    para 
                    <div class="receiver">${mensagens[i].to}</div>
                    <div class="text">${mensagens[i].text}</div>
            </div>`
        }
    }
    
    const barraDeRolagem = document.querySelector('.container').lastElementChild
    barraDeRolagem.scrollIntoView();  
      
}

// enviar mensagem 

function enviarMensagem(){

    const messenger_text = document.querySelector('.messenger_text').value;
    const clean = document.querySelector('.messenger_text');

    const quartaPromessa = axios.post('https://mock-api.driven.com.br/api/v6/uol/messages',
    {
        from: nomeUsuario,
        to: todos,
        text: messenger_text,
        type: type, 
    }
    )
    

    quartaPromessa.catch(ausen)

    clean.value = ''
}

function ausen(){
    alert.location.reload();
}
