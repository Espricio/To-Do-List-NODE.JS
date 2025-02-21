const fs = require('fs');

class Tarefa {
    id;
    descricao;
    dataPrevistaConclusao;
    dataConclusao;
    status;

    constructor(id, descricao, dataPrevistaConclusao, dataConclusao, status) {
        this.id = id || null; // Permite id opcional
        this.descricao = descricao;
        this.dataPrevistaConclusao = dataPrevistaConclusao;
        this.dataConclusao = dataConclusao || null; // Permite data de conclusão opcional
        this.status = status || "pendente"; // Define um status padrão
    }

    static criarArquivoTarefa(caminho) {

        if (!fs.existsSync(caminho)) {

            try {

                fs.writeFileSync(caminho, "[]");
                return true;

            } catch (err) {

                console.error('Erro ao criar o arquivo:', err);
                return false;

            }
        }

        return true;

    }

    static lerArquivoTarefa(caminho) {

        try {

            let conteudo = fs.readFileSync(caminho, 'utf-8');
            conteudo = JSON.parse(conteudo);

            const tarefas = conteudo.map(
                c => new Tarefa(c.id, c.descricao, c.dataPrevistaConclusao, c.dataConclusao, c.status)
            );

            return tarefas;

        } catch (err) {

            console.error('Erro ao ler o arquivo:', err);
            return [];

        }

    }

    adicionarTarefa(caminho, tarefas) {

        let qtdTarefas = tarefas.length + 1;

        let novaTarefa = new Tarefa(qtdTarefas, this.descricao, this.dataPrevistaConclusao, this.dataConclusao, this.status);

        // Adiciona a nova tarefa ào final da lista de tarefas.
        tarefas.push(novaTarefa);

        // Converte a lista de tarefas atualizada para JSON.
        const tarefaJSON = JSON.stringify(tarefas, null, 4);

        try {

            fs.writeFileSync(caminho, tarefaJSON);
            console.log('Tarefa adicionada com sucesso!');

        } catch (err) {

            console.error('Erro ao adicionar a tarefa:', err);

        }

    }

    static listarTarefas(tarefas){

        let qtdTarefas = tarefas.length;

        if (qtdTarefas >= 1) {
            
            tarefas.forEach(t => {
                console.log(`\n${t.id}- ${t.descricao} | ${t.dataPrevistaConclusao} | ${t.dataConclusao} | ${t.status}`);
            });

        } else {

            console.log('Não há tarefas cadastradas!');
            
        }

    }

}

module.exports = { Tarefa };