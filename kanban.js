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
			dataTodo: [],
			dataDoing: [],
			dataDone: [],
			codigoAtual: 0,
			tarefa: new Tarefa(this.gerarId(), "", "", ""),
		}
	},
	methods: {
		//métodos da aplicação
		gerarId() {
			return ++this.codigoAtual
		},
		adicionarTarefa() {
			if (this.tarefa.tipo == 1) {
				this.dataTodo.push(this.tarefa)
			} else if (this.tarefa.tipo == 2) {
				this.dataDoing.push(this.tarefa)
			} else if (this.tarefa.tipo == 3) {
				this.dataDone.push(this.tarefa)
			}

			this.tarefa = new Tarefa(this.gerarId(), "", "", "")
		},
		excluir(id, status) {
			if (status === "todo") {
				this.dataTodo = this.dataTodo.filter((item) => item.id != id)
			} else if (status == "doing") {
				this.dataDoing = this.dataDoing.filter((item) => item.id != id)
			} else if (status == "done") {
				this.dataDone = this.dataDone.filter((item) => item.id != id)
			}
		},
		mover(id, status) {
			if (status === "todo") {
				this.dataDoing.push(this.dataTodo.find((item) => item.id == id))
				this.dataTodo = this.dataTodo.filter((item) => item.id != id)
			} else if (status === "doing") {
				this.dataDone.push(this.dataDoing.find((item) => item.id == id))
				this.dataDoing = this.dataDoing.filter((item) => item.id != id)
			} else if (status === "done") {
				this.dataTodo.push(this.dataDone.find((item) => item.id == id))
				this.dataDone = this.dataDone.filter((item) => item.id != id)
			}
		},
	},
	computed: {
		//dados computados da aplicação
	},
	created() {
		this.adicionarTarefa()
	},
})
