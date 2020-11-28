var dados = [];

function ApagaRegistro(id){
	let _confirm = confirm("Deseja realmente excluir esse registro? ");

	if(_confirm){

		for(let i=0; i < dados.length; i++){

			if(dados[i].ID == id){
				//Apaga os dados do id escolhido e somente ele
				dados.splice(i, 1);//se o i,1 fosse i,3/4 apagaria ele e os demais por quantidade
				alert("Excluido com sucesso!")


			}
		}
		PopulaTabela();
	}
}

function EditaRegistro(id){
	$("#modalRegistro").modal("show");

	dados.forEach(function(item){

		if(item.ID == id){

			$("#hdID").val(item.ID);
			$("#txtNome").val(item.Nome);
			$("#txtSobrenome").val(item.Sobrenome);
			$("#txtDtNascimento").val(
				item.DtNascimento.substr(6, 4) + "-" + item.DtNascimento.substr(3,2) + "-" + item.DtNascimento.substr(0,2));
			$("#txtFormacao").val(item.Formacao);
		}
	})
}

function PopulaTabela(){
	if(Array.isArray(dados)){
		//Escreve no banco local os dados salvos
		localStorage.setItem("__dados__", JSON.stringify(dados));

		$("#tblDados tbody").html("");

		//Constrói o Array(Lista) verificando os campos salvos no banco local
		dados.forEach(function (item){
		
			//TEMPLATE STRING
			$("#tblDados tbody").append(
				`<tr>
					<td>${item.ID}</td>
					<td>${item.Nome}</td>
					<td>${item.Sobrenome}</td>
					<td>${item.DtNascimento}</td>
					<td>${item.Formacao}</td>
					<td>
						<button type="button" onclick="javascript:EditaRegistro(${item.ID});"
						class="btn btn-primary"><i class="fa fa-edit" /></button>
					</td>

					<td>
						<button type="button" onclick="javascript:ApagaRegistro(${item.ID});"
						class="btn btn-danger"><i class="fa fa-trash" /></button>
					</td>

				</tr>`);
		})
	}
}

$(function(){//EXECUTA AO CARREGAR A TELA
	dados = JSON.parse(localStorage.getItem("__dados__"));

	if(dados){
		PopulaTabela();
	}

	//AÇÃO DO BOTÃO SALVAR
	$("#btnSalvar").click(function(){
		
		let _id = $("#hdID").val();

		let Nome = $("#txtNome").val();
		let Sobrenome = $("#txtSobrenome").val();
		let DtNascimento = new Date($("#txtDtNascimento").val()).toLocaleDateString("pt-br", {  timeZone: "UTC" });
		let Formacao = $("#txtFormacao").val();


		if( !_id || _id == "0"){

			let registro = {}

			registro.Nome = Nome;
			registro.Sobrenome = Sobrenome;
			registro.DtNascimento = DtNascimento;
			registro.Formacao = Formacao;


			registro.ID = dados.length + 1;
			//ADIÇÃO NO ARRAY(Lista) DE DADOS
			dados.push(registro);

			//AVISO DE REGISTRADO
			alert("Registro salvo com sucesso!");
			//FECHA A MODAL E VOLTA PARA A INDEX PARA VISUALIZAR OS DADOS SALVOS
			$("#modalRegistro").modal("hide");
			//AÇÃO DE CRIAÇÃO DE NOVO ID
		


		}else{

			dados.forEach(function(item){

				if(item.ID == _id){
					item.Nome = Nome;
					item.Sobrenome = Sobrenome;
					item.DtNascimento = DtNascimento;
					item.Formacao = Formacao;
					
					alert("Registro atualizado com sucesso!");
					$("#modalRegistro").modal("hide");
				}
			})
		}
		

		//Limpeza dos campos da Modal para novos valores
		$("#hdID").val("0");
		$("#txtNome").val("");
		$("#txtSobrenome").val("");
		$("#txtDtNascimento").val("");
		$("#txtFormacao").val("");

		PopulaTabela();

	})

})