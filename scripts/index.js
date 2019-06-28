const alfabeto = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"]


// Criptografa o texto
document.getElementsByClassName('button')[0].addEventListener('click', () => {
    let posicoes = retornaPosicoes(removeAcento(capturaInput(1)))
    let palavra = removeAcento(capturaInput(0))
    let retorno = ""
    let anchor = 0

    for (let i = 0; i < palavra.length; i++) {

        if(palavra[i] == " "|| palavra[i] == "'"|| palavra[i] == "!"|| palavra[i] == "@"|| palavra[i] == "#"|| palavra[i] == "$"|| palavra[i] == "%"|| palavra[i] == "¨"|| palavra[i] == "&"|| palavra[i] == "*"|| palavra[i] == "("|| palavra[i] == ")"|| palavra[i] == "-"|| palavra[i] == "_"|| palavra[i] == "="|| palavra[i] == "+"|| palavra[i] == '"'|| palavra[i] == "|"|| palavra[i] == ","|| palavra[i] == "."|| palavra[i] == ";"|| palavra[i] == "<"|| palavra[i] == ">"|| palavra[i] == ":"|| palavra[i] == "?"|| palavra[i] == "/"|| palavra[i] == "ª"|| palavra[i] == "º"|| palavra[i] == "§"){
            retorno += palavra[i]
        }else{
            if(anchor == posicoes.length){
                anchor = 0
                retorno += alfabeto[ criptografaCaracter( retornaPosicoes( palavra[i] ), posicoes[anchor] ) ]
                anchor++
            }
            else{
                retorno += alfabeto[ criptografaCaracter( retornaPosicoes( palavra[i] ), posicoes[anchor] ) ]
                anchor++
            }
        }
        
    }
    devolveHTML(retorno);
    
})

// Descriptografa o texto
document.getElementsByClassName('button')[1].addEventListener('click', () => {
    let posicoes = retornaPosicoes(removeAcento(capturaInput(1)))
    let palavra = removeAcento(capturaInput(0))
    let retorno = ""
    let anchor = 0

    for (let i = 0; i < palavra.length; i++) {
        
        if(palavra[i] == " "|| palavra[i] == "'"|| palavra[i] == "!"|| palavra[i] == "@"|| palavra[i] == "#"|| palavra[i] == "$"|| palavra[i] == "%"|| palavra[i] == "¨"|| palavra[i] == "&"|| palavra[i] == "*"|| palavra[i] == "("|| palavra[i] == ")"|| palavra[i] == "-"|| palavra[i] == "_"|| palavra[i] == "="|| palavra[i] == "+"|| palavra[i] == '"'|| palavra[i] == "|"|| palavra[i] == ","|| palavra[i] == "."|| palavra[i] == ";"|| palavra[i] == "<"|| palavra[i] == ">"|| palavra[i] == ":"|| palavra[i] == "?"|| palavra[i] == "/"|| palavra[i] == "ª"|| palavra[i] == "º"|| palavra[i] == "§"){
            retorno += palavra[i]
        }else{
            if(anchor == posicoes.length){
                anchor = 0
                retorno += alfabeto[ descriptografaCaracter( retornaPosicoes( palavra[i] ), posicoes[anchor] ) ]
                anchor++
            }
            else{
                retorno += alfabeto[ descriptografaCaracter( retornaPosicoes( palavra[i] ), posicoes[anchor] ) ]
                anchor++
            }
        }
        
    }
    devolveHTML(retorno);
    
})

const retornaPosicoes = (palavra) => {
    let posicoes = []
    for (let i = 0; i < palavra.length; i++) {
        for (let j = 0; j < alfabeto.length; j++) {
            if (palavra[i] == alfabeto[j]) {
                posicoes.push(j)
            }
        }
    }
    return posicoes
}

const removeAcento = (palavra) => {
    let texto = palavra

    texto = texto.replace(new RegExp('[ÁÀÃÂ]', 'gi'), 'A');
    texto = texto.replace(new RegExp('[ÉÈÊ]', 'gi'), 'E');
    texto = texto.replace(new RegExp('[ÍÌÎ]', 'gi'), 'I');
    texto = texto.replace(new RegExp('[ÓÒÔÕ]', 'gi'), 'O');
    texto = texto.replace(new RegExp('[ÚÙÛ]', 'gi'), 'U');
    texto = texto.replace(new RegExp('[Ç]', 'gi'), 'C');

    return texto
}

const capturaInput = (posicao) => {
    return (document.getElementsByClassName('input')[posicao].value).toUpperCase()
}

const criptografaCaracter = (posicaoLetra, posicaoChave) => {
    

    if( ((posicaoLetra[0] + posicaoChave) % Math.pow(alfabeto.length, 2)) > alfabeto.length - 1){
        return (posicaoLetra[0] + posicaoChave) % Math.pow(alfabeto.length, 2) - alfabeto.length
    }
    else{
        return (posicaoLetra[0] + posicaoChave) % Math.pow(alfabeto.length, 2)
    }
}

const descriptografaCaracter = (posicaoLetra, posicaoChave) => {
     
    if( ((posicaoLetra[0] - posicaoChave) % Math.pow(alfabeto.length, 2)) < 0 ){
        return (posicaoLetra[0] - posicaoChave) % Math.pow(alfabeto.length, 2) + alfabeto.length
    }
    else{
        return (posicaoLetra[0] - posicaoChave) % Math.pow(alfabeto.length, 2)
    }   
}

const devolveHTML = (retorno) => {
    if(retorno.length < 40){
        document.getElementById("retorno").innerHTML = retorno
    }
    else{
        document.getElementById("retorno-container").innerHTML = retorno
        document.getElementsByClassName("container-return")[0].style.display = "block"
    }
}

document.getElementsByClassName('button-close')[0].addEventListener('click', () =>{
    document.getElementsByClassName("container-return")[0].style.display = "none"
})