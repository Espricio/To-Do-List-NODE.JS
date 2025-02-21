// Importa o módulo fs (File System) do Node.js, que permite ler e escrever arquivos.
const fs = require('fs');

// Classe Tarefa que representa uma tarefa no sistema.
class Tarefa {
    id; // Identificador único da tarefa.
    descricao; // Descrição da tarefa.
    dataPrevistaConclusao; // Data prevista para a conclusão da tarefa.
    dataConclusao; // Data real de conclusão da tarefa.
    status; // Status da tarefa (por exemplo, "pendente", "concluída").

    // Construtor da classe Tarefa, usado para criar novos objetos Tarefa.
    constructor(id, descricao, dataPrevistaConclusao, dataConclusao, status) {
        this.id = id || null; // Se o ID não for fornecido, ele será 'null' por padrão.
        this.descricao = descricao; // Define a descrição da tarefa.
        this.dataPrevistaConclusao = dataPrevistaConclusao; // Define a data prevista de conclusão.
        this.dataConclusao = dataConclusao || null; // Se não for fornecida uma data de conclusão, ela será 'null'.
        this.status = status || "pendente"; // Se não for fornecido um status, o padrão será "pendente".
    }

    // Função estática que cria um arquivo para armazenar tarefas, caso o arquivo não exista.
    static criarArquivoTarefa(caminho) {

        if (!fs.existsSync(caminho)) { // Verifica se o arquivo já existe.

            try {
                // Se o arquivo não existir, cria um arquivo vazio (JSON) para armazenar as tarefas.
                fs.writeFileSync(caminho, "[]");
                return true; // Retorna verdadeiro indicando que o arquivo foi criado com sucesso.

            } catch (err) {
                // Caso ocorra algum erro ao criar o arquivo, exibe o erro no console.
                console.error('Erro ao criar o arquivo:', err);
                return false; // Retorna falso indicando falha na criação do arquivo.
            }
        }

        return true; // Retorna verdadeiro se o arquivo já existir.
    }

    // Função estática para ler o arquivo de tarefas e retornar um array de tarefas.
    static lerArquivoTarefa(caminho) {

        try {
            // Lê o conteúdo do arquivo especificado no caminho.
            let conteudo = fs.readFileSync(caminho, 'utf-8');
            // Converte o conteúdo lido (em formato JSON) para um objeto JavaScript.
            conteudo = JSON.parse(conteudo);

            // Cria um array de objetos Tarefa a partir dos dados lidos do arquivo.
            const tarefas = conteudo.map(
                c => new Tarefa(c.id, c.descricao, c.dataPrevistaConclusao, c.dataConclusao, c.status)
            );

            return tarefas; // Retorna o array de tarefas.

        } catch (err) {
            // Caso ocorra algum erro ao ler o arquivo, exibe o erro no console e retorna um array vazio.
            console.error('Erro ao ler o arquivo:', err);
            return [];
        }
    }

    // Função para adicionar uma nova tarefa à lista de tarefas existente e salvar no arquivo.
    adicionarTarefa(caminho, tarefas) {

        let qtdTarefas = tarefas.length + 1; // Calcula o novo ID da tarefa (com base no número de tarefas).

        // Cria uma nova tarefa com os dados fornecidos.
        let novaTarefa = new Tarefa(qtdTarefas, this.descricao, this.dataPrevistaConclusao, this.dataConclusao, this.status);

        // Adiciona a nova tarefa à lista de tarefas.
        tarefas.push(novaTarefa);

        // Converte o array de tarefas para o formato JSON para salvar no arquivo.
        const tarefaJSON = JSON.stringify(tarefas, null, 4);

        try {
            // Escreve o array de tarefas de volta no arquivo, substituindo o conteúdo antigo.
            fs.writeFileSync(caminho, tarefaJSON);
            console.log('Tarefa adicionada com sucesso!'); // Exibe uma mensagem de sucesso.

        } catch (err) {
            // Caso ocorra algum erro ao adicionar a tarefa, exibe o erro no console.
            console.error('Erro ao adicionar a tarefa:', err);
        }
    }

    // Função estática para listar todas as tarefas armazenadas no arquivo.
    static listarTarefas(tarefas){

        let qtdTarefas = tarefas.length; // Obtém a quantidade de tarefas.

        if (qtdTarefas >= 1) { // Se houver tarefas cadastradas.
            
            // Exibe as informações de cada tarefa no formato desejado.
            tarefas.forEach(t => {
                console.log(`\n${t.id}- ${t.descricao} | ${t.dataPrevistaConclusao} | ${t.dataConclusao} | ${t.status}`);
            });

        } else {
            // Caso não haja tarefas cadastradas, exibe uma mensagem informando.
            console.log('Não há tarefas cadastradas!');
        }
    }

}

// Exporta a classe Tarefa para que possa ser usada em outros módulos.
module.exports = { Tarefa };
