// Importa o módulo readline-sync para ler entradas do usuário de forma síncrona.
const readline = require('readline-sync');
// Importa a classe Tarefa do arquivo Tarefas.js.
const { Tarefa } = require('./Tarefas.js');

// Define o caminho do arquivo onde as tarefas serão armazenadas.
const caminhoArquivo = './tarefas.json';

// Cria o arquivo de tarefas se ele não existir.
Tarefa.criarArquivoTarefa(caminhoArquivo);

// Lê as tarefas existentes no arquivo.
let tarefas = Tarefa.lerArquivoTarefa(caminhoArquivo);

// Função que exibe o menu de opções para o usuário.
const exibirMenu = () => {

    // Exibe as opções do menu.
    console.log("\nGerenciador de Tarefas");
    console.log("1 - Adicionar Tarefa");
    console.log("2 - Listar Tarefas");
    console.log("3 - Sair");

    // Lê a opção escolhida pelo usuário.
    let opcao = readline.questionInt("Escolha uma opção:");

    // Usa uma estrutura switch para executar ações com base na opção escolhida.
    switch (opcao) {
        case 1:
            // Caso o usuário escolha adicionar uma tarefa:
            
            // Cria uma nova instância de Tarefa com os dados fornecidos pelo usuário.
            novaTarefa = new Tarefa(
                null, // O ID da tarefa será gerado automaticamente (não é fornecido pelo usuário).
                readline.question("Descrição da Tarefa:"), // Lê a descrição da tarefa.
                readline.question("Data Prevista para Conclusão da Tarefa:"), // Lê a data prevista de conclusão.
                readline.question("Data de Conclusão da Tarefa:"), // Lê a data real de conclusão.
                readline.question("Status da Tarefa:") // Lê o status da tarefa.
            );

            // Adiciona a nova tarefa ao arquivo de tarefas.
            novaTarefa.adicionarTarefa(caminhoArquivo, tarefas);

            // Recarrega a lista de tarefas a partir do arquivo atualizado.
            tarefas = Tarefa.lerArquivoTarefa(caminhoArquivo);

            // Exibe as tarefas cadastradas após adicionar a nova tarefa.
            Tarefa.listarTarefas(tarefas);

            // Chama a função exibirMenu novamente para que o usuário possa escolher outra opção.
            exibirMenu();
            break;

        case 2:
            // Caso o usuário escolha listar as tarefas:

            // Exibe a lista de todas as tarefas cadastradas.
            Tarefa.listarTarefas(tarefas);

            // Chama a função exibirMenu novamente para que o usuário possa escolher outra opção.
            exibirMenu();
            break;

        case 3:
            // Caso o usuário escolha sair:
            
            // Exibe uma mensagem de despedida.
            console.log("Até Logo!");
            break;

        default:
            // Caso o usuário insira uma opção inválida:
            
            // Informa que a opção é inválida e chama novamente a função exibirMenu para o usuário tentar novamente.
            console.log('Opção Inválida!');
            exibirMenu();
    }

}

// Chama a função exibirMenu para mostrar o menu para o usuário pela primeira vez.
exibirMenu();
