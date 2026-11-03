//Manipulação - DOM
const resposta = document.querySelector("#resposta");
const lista = document.querySelector("#lista-animes");
const modelo = document.querySelector("#modelo-animes");

const apiKey="cv_IcxfCXU5WJp4k8hcPnujQbNhZ3wDjJ_-DptbgL1J8gNJByz4QMy5IbP-4V_3Y9X5";
const apiUrl="https://api-ds.codeverse.dev.br/api/animes";

//Funcao que busca todos os animes da API

async function buscarAnimes() {
  resposta.textContent = "Carregando animes..."

  try {
    //Fazer uma requisicao GET para buscar os animes
    const retorno = await fetch(apiUrl, {
      method: "GET",
      headers: {"x-api-key": apiKey}
    });

    if(!retorno.ok){
      throw new Error("Nao foi possivel buscar os herois")
    }

    //converter para JSON
    const resultado = await retorno.json();

    //Percorrer todos os animes e montar o anime.

    for (const anime of resultado.data) {
      const card = modelo.content.cloneNode(true);

      card.querySelector(".tittle").textContent = anime.title;
      card.querySelector(".genero").textContent = anime.genero;
      card.querySelector(".numero_episodios").textContent = anime.numero_episodios;
      card.querySelector(".ano_lancamento").textContent = anime.ano_lancamento;
      card.querySelector(".estudio").textContent = anime.estudio;
      const imagem = card.querySelector("img");

      if(anime.imageUrl){
        imagem.src = anime.imageUrl;
        imagem.alt =  anime.title;
      } else {
        imagem.remove();
      }

      lista.appendChild(card);
    }

    resposta.textContent="";


  } catch (error) {
    resposta.textContent = "Não foi possivel carregar os herois. Tente novamente!"
    console.error(error);
  }

}

//executo a funcao
buscarAnimes();