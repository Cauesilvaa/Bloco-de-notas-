// Variaveis
const novaNota = document.getElementById('nova-nota');
const adicionar = document.getElementById('adicionar');
const titulo = document.getElementById('titulo');
const txtArea = document.getElementById('nota');
const tituloVisualizar = document.getElementById('titulo-visualizar');
const txtAreaVisualizar = document.getElementById('nota-visualizar');
const tbody = document.getElementById('tbody');

const arrays = {
    id: 1,
    idArray: 1
}

let arrayNotas = []

function inputLength(){
    // Retorna o valor e a quantidade de caracteres do 'titulo'
    return titulo.value.length;
}

function readDados(){

    //Cria 'objeto notaCompleta'
    let notaCompleta = {};

    /*Atribuindo o valor do input e do txtarea a os atributos 'id', 'titulo'
    e 'txtArea'
    criados agr do objeto 'notaCompleta'*/
    notaCompleta.id = arrays.id++;
    notaCompleta.titulo = titulo.value;
    notaCompleta.TxtArea = txtArea.value;

    return notaCompleta;
}

/* Função q adiciona o 'n' no array, e no evento click do 'adicionar'
eu passo para função 'Add()' o 'notas' (q recebe o obj) como 'n', então o 'notas'
q é o obj, é ele q eu aadiciono no array*/
function Add(n){
    arrayNotas.push(n);
    arrays.idArray++;
}

// Criar linha
function createListElement(){

    tbody.innerText = ``;
    
    /* For que percorre todo o 'arrayNotas', e a cada obj no array
    vai criar as linha e as colunas*/
    for (i = 0; i < arrayNotas.length; i++) {
        
        let row = tbody.insertRow();
        let numero = row.insertCell();
        let tituloo = row.insertCell();
        let visualizar = row.insertCell();
        let excluir = row.insertCell();

        // numero.innerText += arrayNotas[i].id
        // tituloo.innerText += arrayNotas[i].titulo

        let numeroText = document.createTextNode(arrayNotas[i].id);
        numero.appendChild(numeroText);

        let titulooText = document.createTextNode(arrayNotas[i].titulo);
        tituloo.appendChild(titulooText);
    
        visualizar.innerHTML = 
            `<button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" onclick="modal(arrayNotas[${i}])">
            Visualizar nota
          </button>`;
    
        excluir.innerHTML =
          `<button type="button" class="btn btn-primary" onclick="deleteRoww(${arrayNotas[i].id})">
          Excluir
        </button>`
    }

}

function modal(nota){
  console.log(nota);
  tituloVisualizar.value = nota.titulo;
  txtAreaVisualizar.value = nota.TxtArea;
}

// Limpar formulario/modal
novaNota.addEventListener('click', ()=>{
    titulo.value = '';
    txtArea.value = '';
})

// Deletar linha
function deleteRoww(id){
    console.log(`Deletar o id ${id}`)

    // For para percorrer todo a array de objetos
   for (let i = 0; i < arrayNotas.length; i++){
    
    // Se o id do objeto no array for igual ao id passado no onclick, faça ...
    if(arrayNotas[i].id == id){
      
      // Passando p o spllice o indice q eu quero deletar (i) e quantos (1)
        arrayNotas.splice(i, 1) 
        
        //Passando o indice i para o deleteRow() do tbody
        tbody.deleteRow(i)
    }
   }

   /* Mesma logica 

   forEach para percorrer todo a array de objetos
   arrayNotas.forEach((v, i, a)=>{

    // Se o id do objeto no array for igual ao id passado no onclick, faça ...
    if(v.id == id){

      // Passando p o spllice o indice q eu quero deletar (i) e quantos (1)
      arrayNotas.splice(i, 1) 

      //Passando o indice i para o deleteRow() do tbody
      tbody.deleteRow(i)
    }
   })*/
   console.log(arrayNotas)
}

// Adicionar linha e nota
adicionar.addEventListener('click', ()=>{
    
    if(inputLength() > 0 ){

      // Atribuindo o objeto criado na função 'readDados' a variavel 'nota'
      let nota = readDados();

      Add(nota);

      createListElement();

    console.log(arrayNotas);
  } else {
      alert('Preencha o campo de titulo');
  }
});
