// vars globais:
let nomeUsuario = "";

// funcao para pegarUsername
function pegarUsuario(){
    nomeUsuario = prompt('Qual o usuário?');

    return {
        name: nomeUsuario,
    }
}
let req = pegarUsuario();



// enviar ao servidor o usuario

const promessa = axios.post('https://mock-api.driven.com.br/api/v6/uol/participants', req);
console.log(promessa);

promessa.then(callback);
promessa.catch(callbackError);


function callback(resposta){

    if(
        resposta.status == 200
    ){('Bem vindo!')}
}

function callbackError(erro){
    alert('User já existente!');
}

// function para manter o servidor

setInterval(manterConexao,5000);

function manterConexao(){
    axios.post('https://mock-api.driven.com.br/api/v6/uol/status', req);
    console.log('teste')
}


// pegar mensagens