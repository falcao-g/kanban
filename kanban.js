class Tarefa {
	constructor(id, nome, tipo, descricao) {
		this.id = id
		this.nome = nome
		this.tipo = tipo
		this.descricao = descricao
	}
}

//arquivo com o código do Kanban
const kanban = Vue.createApp({
	// o método createApp cria um objeto Vue e o método mount() monta o componente na página.
	data() {
		//dados da aplicação
		return {
			codigoAtual: 0,
			tarefa: new Tarefa(this.gerarId(), "", "", ""),
			tarefas: [],
		}
	},
	methods: {
		//métodos da aplicação
		gerarId() {
			return ++this.codigoAtual
		},
		adicionarTarefa() {
			this.tarefa.lista = this.tarefa.tipo
			this.tarefa = new Tarefa(this.gerarId(), "", "", "")
			this.tarefas.push(this.tarefa)
		},
		excluir(id, status) {
			if (status === "todo") {
				this.tarefas = this.tarefas.filter((item) => item.id != id)
			} else if (status == "doing") {
				this.tarefas = this.tarefas.filter((item) => item.id != id)
			} else if (status == "done") {
				this.tarefas = this.tarefas.filter((item) => item.id != id)
			}
		},
		startDrag(evt, item) {
			evt.dataTransfer.dropEffect = "move"
			evt.dataTransfer.effectAllowed = "move"
			evt.dataTransfer.setData("itemID", item.id)
		},
		onDrop(evt, list) {
			const itemID = evt.dataTransfer.getData("itemID")
			const item = this.tarefas.find((item) => item.id == itemID)
			item.lista = list
		},
	},
	computed: {
		//dados computados da aplicação
		listaFazer() {
			return this.tarefas.filter((tarefa) => tarefa.lista == 1)
		},
		listaFazendo() {
			return this.tarefas.filter((tarefa) => tarefa.lista == 2)
		},
		listaFeito() {
			return this.tarefas.filter((tarefa) => tarefa.lista == 3)
		},
	},
	created() {
		this.adicionarTarefa()
	},
})
