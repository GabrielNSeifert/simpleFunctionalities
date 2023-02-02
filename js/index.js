function criarMenu() {
    const nav = document.querySelector('.menu');
    const btMenu = document.querySelector('.btMenu')
    let menuEstado = 0;

    btMenu.addEventListener('click', function () {
        if (menuEstado == 0) {
            nav.innerHTML =
                `<ul id="menuLista">
        <li title="Página Inicial"><a href="#pagInicial"><img src="./Assets/Menu-Home.png" alt="Página Inicial"></a></li>
        <li title="Cronômetro"><a href="#cronometro"><img src="./Assets/Menu-Cronometro.png" alt="Cronômetro"></a></li>
        <li title="Calculadora"><a href="#Cal"><img src="./Assets/Menu-Calculadora.png" alt="Calculadora"></a></li>
        <li title="Calculadora IMC"><a href="#calImc"><img src="./Assets/Menu-IMC.png" alt="Calculadora de IMC"></a></li>
        <li title="Formulário"><a href="#form"><img src="./Assets/Menu-Lista.png" alt="Lista de Tarefas"></a></li>
    </ul>`;
            menuEstado++;
        } else {
            nav.innerHTML = " ";
            menuEstado--;
        }
    });
}

function relogio() {

    const iniciar = document.querySelector("#iniciar");
    const pausar = document.querySelector("#pausar");
    const zerar = document.querySelector("#zerar");
    const div = document.querySelector(".timer");
    let segundos = 0;
    let segundosDezena = 0;
    let minutos = 0;
    let minutosDezena = 0;
    let horas = 0;
    let horasDezena = 0;

    function começar() {
        const setComeçar = setInterval(function () {
            segundos = ++segundos;
            div.innerHTML = `<b>${horasDezena}${horas}:${minutosDezena}${minutos}:${segundosDezena}${segundos}</b>`;

            if (segundos > 8) {
                segundos = -1;
                segundosDezena = ++segundosDezena;
            }

            if (segundosDezena === 6) {
                segundosDezena = 0;
                minutos = ++minutos;
            }

            if (minutos >= 10) {
                minutos = 0;
                minutosDezena = ++minutosDezena;
            }

            if (minutosDezena === 6) {
                minutosDezena = 0;
                horas = ++horas;
            }

            if (horas >= 10) {
                horas = 0;
                horasDezena = ++horasDezena;
            }

            if (horasDezena === 2 && horas === 4) {
                segundos = 0;
                segundosDezena = 0;
                minutos = 0;
                minutosDezena = 0;
                horas = 0;
                horasDezena = 0;
            }

        }, 1000)

        function pause() {
            clearInterval(setComeçar);
            document.querySelector(".timer").style.color = "crimson";
        }

        pausar.addEventListener('click', pause);

        function zerarTimer() {
            segundos = 0;
            segundosDezena = 0;
            minutosDezena = 0;
            minutos = 0;
            horas = 0;
            horasDezena = 0;
            document.querySelector(".timer").style.color = "white";
            div.innerHTML = `<b>${horasDezena}${horas}:${minutosDezena}${minutos}:${segundosDezena}${segundos}</b>`;
            clearInterval(setComeçar);
        }

        zerar.addEventListener('click', zerarTimer);

        document.querySelector(".timer").style.color = "white";

    };

    iniciar.addEventListener('click', começar);
}

function Calculadora() {
    this.display = document.querySelector('.display');

    this.inicia = () => {
        this.capturaCliques();
        this.capturaEnter();
    };

    this.capturaEnter = () => {
        document.addEventListener('keypress', e => {
            if (e.keyCode === 13) {
                this.realizaConta();
            }
        });
    };

    this.capturaCliques = () => {
        document.addEventListener('click', event => {
            const el = event.target;
            if (el.classList.contains('btn-num')) this.addNumDisplay(el);
            if (el.classList.contains('btn-clear')) this.clear();
            if (el.classList.contains('btn-del')) this.del();
            if (el.classList.contains('btn-eq')) this.realizaConta(el);
        });
    };

    this.realizaConta = () => {

        try {
            const conta = eval(this.display.value);

            if (!conta) {
                alert('Conta inválida');
                return;
            }

            this.display.value = conta;
        } catch (e) {
            alert('Conta inválida!');
            return;
        }
    };

    this.clear = () => this.display.value = '';

    this.del = () => this.display.value = this.display.value.slice(0, -1);

    this.addNumDisplay = el => {
        this.display.value += el.innerText;
        this.display.focus();
    };

}

function imcCalculadora() {
    const form = document.querySelector('.formImc');

    function calcularIMC(enviar) {
        enviar.preventDefault();

        const Altura = document.querySelector('#Altura');
        const Peso = document.querySelector('#Peso');
        const imc = Peso.value / Altura.value ** 2;
        let resultado = document.querySelector('.resultado');

        if (imc < 18.5) resultado.innerHTML = `Seu IMC é de ${imc.toFixed(2)} (Abaixo do Peso).`;
        else if (imc >= 18.5 && imc <= 24.9) resultado.innerHTML = `Seu IMC é de ${imc.toFixed(2)} (Peso Normal).`;
        else if (imc >= 25 && imc <= 29.9) resultado.innerHTML = `Seu IMC é de ${imc.toFixed(2)} (Sobrepeso).`;
        else if (imc >= 30 && imc <= 34.9) resultado.innerHTML = `Seu IMC é de ${imc.toFixed(2)} (Obesidade Grau 1).`;
        else if (imc >= 35 && imc <= 39.9) resultado.innerHTML = `Seu IMC é de ${imc.toFixed(2)} (Obesidade Grau 2).`;
        else if (imc > 40) resultado.innerHTML = `Seu IMC é de ${imc.toFixed(2)} (Obesidade Grau 3).`;
        else resultado.innerHTML = `Peso ou Altura Invalidos.`;

    }
    form.addEventListener('submit', calcularIMC);
}

class ValidaFormulario {
    constructor() {
        this.formulario = document.querySelector('.formulario');
        this.eventos();
    }

    eventos() {
        this.formulario.addEventListener('submit', e => {
            this.handleSubmit(e);
        });
    }

    handleSubmit(e) {
        e.preventDefault();
        const camposValidos = this.camposSaoValidos();
        const senhasValidas = this.senhasSaoValidas();

        if (camposValidos && senhasValidas) {
            alert('Formulário enviado.');
        }
    }

    senhasSaoValidas() {
        let valid = true;

        const senha = this.formulario.querySelector('#senha');
        const repetirSenha = this.formulario.querySelector('#repetirSenha');

        if (senha.value !== repetirSenha.value) {
            valid = false;
            this.criaErro(senha, 'Campos senha e repetir senha precisar ser iguais.');
            this.criaErro(repetirSenha, 'Campos senha e repetir senha precisar ser iguais.');
        }

        if (senha.value.length < 6 || senha.value.length > 12) {
            valid = false;
            this.criaErro(senha, 'Senha precisa estar entre 6 e 12 caracteres.');
        }

        return valid;
    }

    camposSaoValidos() {
        let valid = true;

        for (let errorText of this.formulario.querySelectorAll('.error-text')) {
            errorText.remove();
        }

        for (let campo of this.formulario.querySelectorAll('.validar')) {
            const label = campo.previousElementSibling.innerText;

            if (!campo.value) {
                this.criaErro(campo, `Campo " ${label} " não pode estar em branco.`);
                valid = false;
            }

            if (campo.classList.contains('cpff')) {
                if (!this.validaCPF(campo)) valid = false;
            }

            if (campo.classList.contains('usuarioo')) {
                if (!this.validaUsuario(campo)) valid = false;
            }

        }

        return valid;
    }

    validaUsuario(campo) {
        const usuario = campo.value;
        let valid = true;


        if (usuario.length < 3 || usuario.length > 12) {
            this.criaErro(campo, 'Usuário precisa ter entre 3 e 12 caracteres.');
            valid = false;
        }

        if (!usuario.match(/^[a-zA-Z0-9]+$/g)) {
            this.criaErro(campo, 'Usuário precisa conter apenas letras e números.');
            valid = false;
        }



        return valid;
    }

    validaCPF(campo) {
        const cpf = new ValidaCPF(campo.value);

        if (!cpf.valida()) {
            this.criaErro(campo, 'CPF inválido.');
            return false;
        }

        return true;
    }

    criaErro(campo, msg) {
        const div = document.createElement('div');
        div.innerHTML = msg;
        div.classList.add('error-text');
        campo.insertAdjacentElement('afterend', div);
    }
};

class ValidaCPF {
    constructor(cpfEnviado) {
        Object.defineProperty(this, 'cpfLimpo', {
            writable: false,
            enumerable: true,
            configurable: false,
            value: cpfEnviado.replace(/\D+/g, '')
        });
    }

    éSequência() {
        return this.cpfLimpo.charAt(0).repeat(11) === this.cpfLimpo;
    }

    geraNovoCpf() {
        const cpfSemDigitos = this.cpfLimpo.slice(0, -2);
        const digito1 = ValidaCPF.geraDigito(cpfSemDigitos);
        const digito2 = ValidaCPF.geraDigito(cpfSemDigitos + digito1);
        this.novoCPF = cpfSemDigitos + digito1 + digito2;
    }

    static geraDigito(cpfSemDigitos) {
        let total = 0;
        let reverso = cpfSemDigitos.length + 1;

        for (let stringNumerica of cpfSemDigitos) {
            total += reverso * Number(stringNumerica);
            reverso--;
        }

        const digito = 11 - (total % 11);
        return digito <= 9 ? String(digito) : '0';
    }

    valida() {
        if (!this.cpfLimpo) return false;
        if (typeof this.cpfLimpo !== 'string') return false;
        if (this.cpfLimpo.length !== 11) return false;
        if (this.éSequência()) return false;
        this.geraNovoCpf();

        return this.novoCPF === this.cpfLimpo;
    }
}


const valida = new ValidaFormulario();
const calculadora = new Calculadora();
calculadora.inicia();
relogio();
criarMenu();
imcCalculadora();
