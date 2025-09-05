
var nome1 = document.getElementById('nome1')
var nome2 = document.getElementById('nome2')
var num1 = document.getElementById('num1')
var num2 = document.getElementById('num2')
num1.tabIndex = -1;
num2.tabIndex = -1;
var btn1 = document.getElementById('btn1')
var btn2 = document.getElementById('btn2')
var pts1 = document.getElementById('pts1')
var pts2 = document.getElementById('pts2')
let valoresNum1 = [] // vetor ou array
let valoresNum2 = [] // vetor ou array
let placarMaximo = 3000 // valor padrão

function bloquearInputs(bloquear){
    nome1.disabled = bloquear
    nome2.disabled = bloquear
    btn1.disabled = bloquear
    btn2.disabled = bloquear
    pts1.disabled = bloquear
    pts2.disabled = bloquear
}


document.getElementById('placarMaximo').addEventListener('change', function() {
    // Só permite mudar se placares estiverem zerados
    if (Number(num1.value) !== 0 || Number(num2.value) !== 0){
        alert('Só é possível mudar o placar máximo com o placar zerado!')
        this.value = placarMaximo // Volta para o valor anterior
        return
    }
    placarMaximo = Number(this.value);

    // Bloqueia se o placarMaximo for 0 ou '' (vazio)
    if(!placarMaximo || placarMaximo <= 0){
        alert('Defina um placar máximo maior que zero!')
        bloquearInputs(true)
        this.focus()
    } else {
        bloquearInputs(false)
    }
});

function somar(){
    let adicionou = false

    if (pts1.value !== '') {
        valoresNum1.push(Number(pts1.value))
        adicionou = true
    }
    if (pts2.value !== '') {
        valoresNum2.push(Number(pts2.value))
        adicionou = true
    }
    if (!adicionou) {
        alert('Insira um número para pelo menos uma equipe!')
        return
    }
        // Soma simples dos arrays
        let total1 = 0
        for (let i in valoresNum1) {  // 'i' seria de indice pq ela percorre tds os indices e soma eles!
            total1 += valoresNum1[i]
        }
        let total2 = 0
        for (let i in valoresNum2) {
            total2 += valoresNum2[i]
        }

        num1.value = total1
        num2.value = total2
        pts1.value = ''
        pts2.value = ''
    
    setTimeout(() => { // --> essa flechinha é uma function() sem parâmetro, tanto que tem um () atrás dela
    if (total1 >= placarMaximo || total2 >= placarMaximo) {
        if (total1 > total2) {
            if(nome1.value == ''){
                nome1.value = 'Equipe 1'
                nome2.value = 'Equipe 2'
            }
            if (confirm(`Vencedor: ${nome1.value} \nPlacar: ${total1} \n\nParabéns! \n\nDeseja zerar o placar?`)){
            valoresNum1 = []
            valoresNum2 = []
            num1.value = ''
            num2.value = ''
            pts1.value = ''
            pts2.value = ''
        }else{
            //Não faz nada, porém 'trava' a colocação dos números.
            pts1.style.pointerEvents = 'none' //desabilita o input
            pts2.style.pointerEvents = 'none' //desabilita o input
            nome1.style.pointerEvents = 'none' //desabilita o input
            nome2.style.pointerEvents = 'none' //desabilita o input
        }
 
        } else if (total2 > total1) {
            if(nome2.value == ''){
                nome2.value = 'Equipe 2'
                nome1.value = 'Equipe 1'
            }
            if(confirm(`Vencedor: ${nome2.value} \nPlacar: ${total2} \n\nParabéns! \n\nDeseja zerar o placar?`)){
            valoresNum1 = []
            valoresNum2 = []
            num1.value = ''
            num2.value = ''
            pts1.value = ''
            pts2.value = ''
        }else{
            //Não faz nada, porém 'trava' a colocação dos números.
            pts1.style.pointerEvents = 'none' //desabilita o input
            pts2.style.pointerEvents = 'none' //desabilita o input
            nome1.style.pointerEvents = 'none' //desabilita o input
            nome2.style.pointerEvents = 'none' //desabilita o input
        }
        } else {
            // Empate: sempre pergunta se deseja continuar
            if (confirm(`Empate! Ambas equipes fizeram: ${total1} pontos! \n\nQuer fazer o desempate?`)) {
                // Se clicar em OK, apenas continua o jogo (não faz nada)
            } else {
                alert('Zerando o jogo...')
                valoresNum1 = []
                valoresNum2 = []
                num1.value = ''
                num2.value = ''
                pts1.value = ''
                pts2.value = ''
            }
        }
    }
}, 10) // --> 10 milisegundos para executar o bloco  
    
}

function zerar(){
    if(confirm('Tem certeza que deseja zerar o placar?')){
        // Se clicar em OK (Sim)
        valoresNum1 = []
        valoresNum2 = []
        num1.value = ''
        num2.value = ''
        pts1.value = ''
        pts2.value = ''
        pts1.style.pointerEvents = 'auto' // habilita o input
        pts2.style.pointerEvents = 'auto' // habilita o input
        nome1.style.pointerEvents = 'auto' // habilita o input
        nome2.style.pointerEvents = 'auto' // habilita o input
    } else{
        // Se clicar em cancelar (Não) ele não faz nada
    }
}

pts1.addEventListener('keydown', function(e) {
    if (e.key === 'Enter') {
        somar();
    }
});
pts2.addEventListener('keydown', function(e) {
    if (e.key === 'Enter') {
        somar();
    }
});

nome1.addEventListener('input', ajustarFonte)
nome2.addEventListener('input', ajustarFonte)

function ajustarFonte(){
    if(nome1.value.length >= 10){
        nome1.style.fontSize = '1.0em'
    }else {
        nome1.style.fontSize = '1.5em'
    }

    if(nome2.value.length >= 10){
        nome2.style.fontSize = '1.0em'
    }else {
        nome2.style.fontSize = '1.5em'
    }
}

 
// aceitar somente o '-' nos valores de pts1 e pts2 e somente numeros sem '.' ou ','
// mudar para colocar o nome do jogo
// mudar para adicionar ou tirar quantidade de pessoas do jogo
// adicionar placar geral
