const input = document.getElementById('input-busca');
const apiKey = '46e6dbd86e77cc6216eb7e7fa6170d4e';

function movimentoInput(inputValue) {
    const visibility = input.style.visibility;

inputValue && procurarCidade(inputValue);

visibility === 'hidden' ? abrirInput() : fecharImput();
}

function botaoDeBusca() {
    const inputValue = input.value;
    
    movimentoInput(inputValue);
}

function fecharImput() {
   input.style.visibility = 'hidden';
   input.style.widht = '40px';
   input.style.padding =  '0.5rem 0.5rem 0.5rem 2.6rem';
   input.style.transition =  'all 0.5s ease-in-out 0s';
   input.value = "";
}

function abrirInput() {
   input.style.visibility = 'visible';
   input.style.widht = '300px';
   input.style.padding =  '0.5rem 0.5rem 0.5rem 3.1rem';
   input.style.transition =  'all 0.5s ease-in-out 0s';
   input.value = "";
}

input.addEventListener('keyup', function(event) {
    if(event.keyCode === 13){
        const valorinput = input.value;
        movimentoInput(valorinput)
    }
})

document.addEventListener('DOMContentLoaded', () => {
    fecharImput();
})

async function procurarCidade(city){ 
    try {
        const dados = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=pt_br`);
        
        if (dados.status === 200) {
        const resultado = await dados.json();
        
        mostrarClimaNaTela(resultado);
        console.log(resultado, '<<')
      } else{
        throw new Error
      }
    } catch {
      alert('A pesquisa por cidade deu errado!');       
    }
}
function mostrarClimaNaTela(resultado) {
    document.querySelector('.nome-cidade').innerHTML = `${resultado.name}`;
    document.querySelector('.temperatura').innerHTML = `${resultado.main.temp.toFixed(0)}°C`;
    document.querySelector('.maxTemperatura').innerHTML = `máx: ${resultado.main.temp_max.toFixed(0)}°C`;
    document.querySelector('.minTemperatura').innerHTML = `min: ${resultado.main.temp_min.toFixed(0)}°C`;
    
}

