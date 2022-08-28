let nomeUsuario;



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

setInterval(manterConexao,5000);

function manterConexao(){
    axios.post('https://mock-api.driven.com.br/api/v6/uol/status', nomeUsuario);
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

        if(mensagens[i].type === "private_message" && mensagens[i].to === nameUsuario){
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
