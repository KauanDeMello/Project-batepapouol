// vars globais:
let nomeUsuario = "";

// pegarUsername
function pegarUsuario(){
    nomeUsuario = prompt('Qual o usuário?');

    return {
        name: nomeUsuario,
    }
}
let req = pegarUsuario();



// pegar dados do servidor as mensagens
/* function PegarDados(){
    const promessa = axios.get('https://mock-api.driven.com.br/api/v6/uol/messages');
    promessa.then(renderizarDados) // sucesso
    promessa.cacth(mostrarErro) //erro
}   

function renderizarDados(resposta){

    const mensagens = document.querySelector(".m_in_out")

}/*

/*function mostrarErro(){
    alert.apply('erro')// vou usar if aqui para  os erros duas
    console.log()
}*/


// enviar ao servidor

const promessa = axios.post('https://mock-api.driven.com.br/api/v6/uol/participants', req);
console.log(promessa);

promessa.then(callback);
promessa.catch(callbackError);


function callback(resposta){

    if(
        resposta.status == 400
    ){console.log('User já existe, tente novamente!')}
}

function callbackError(erro){
    console.log(erro, 'User já existe, tente novamente!');
}