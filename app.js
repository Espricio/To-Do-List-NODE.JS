const readline = require('readline-sync');
const { Tarefa } = require('./Tarefas.js');

const caminhoArquivo = './tarefas.json';

// Criar o arquivo se não existir
Tarefa.criarArquivoTarefa(caminhoArquivo);

// Ler as tarefas existentes
let tarefas = Tarefa.lerArquivoTarefa(caminhoArquivo);

const exibirMenu = () => {

    console.log("\nGerenciador de Tarefas");
    console.log("1 - Adicionar Tarefa");
    console.log("2 - Listar Tarefas");
    console.log("3 - Sair");

    let opcao = readline.questionInt("Escolha uma opção:");

    switch (opcao) {
        case 1:

            novaTarefa = new Tarefa(
                null,
                readline.question("Descrição da Tarefa:"),
                readline.question("Data Prevista para Conclusão da Tarefa:"),
                readline.question("Data de Conclusão da Tarefa:"),
                readline.question("Status da Tarefa:")
            );

            novaTarefa.adicionarTarefa(caminhoArquivo, tarefas);

            tarefas = Tarefa.lerArquivoTarefa(caminhoArquivo);
            Tarefa.listarTarefas(tarefas);

            exibirMenu();
            break;

        case 2:

            Tarefa.listarTarefas(tarefas);
            exibirMenu();
            break;

        case 3:
            console.log("Até Logo!");
            break;

        default:
            console.log('Opção Inválida!');
            exibirMenu();
    }

}

exibirMenu();
