<template>
  <div class="box formulario">
    <div class="columns">
      <div
        class="column is-5"
        role="form"
        aria-label="Formulário para criação de uma nova tarefa"
      >
        <input
          type="text"
          class="input"
          placeholder="Qual tarefa você deseja iniciar?"
          v-model="descricao"
        />
      </div>
      <div class="column is-3">
        <div class="select">
          <select v-model="idProjeto">
            <option value="">Selecione o projeto</option>
            <option
              :value="projeto.id"
              v-for="projeto in projetos"
              :key="projeto.id"
            >
              {{ projeto.nome }}
            </option>
          </select>
        </div>
      </div>
      <div class="column">
        <Temporizador @aoTemporizadorFinalizado="finalizarTarefa"/>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { TipoNotificacao } from "@/interfaces/INotificacao";
import { defineComponent, computed, ref } from "vue";
import { useStore } from "@/store";
import Temporizador from './Temporizador.vue'
import { notificacaoMixin } from "@/mixins/notificar";

export default defineComponent({
  name: "Formulário", 
  emits: ['aoSalvarTarefa'],
  components: {
    Temporizador
  }, 
  setup(props, { emit }){

    const descricao = ref("");
    const idProjeto = ref("");
    const store = useStore(); 
    const projetos = ref(computed(()=> store.state.projeto.projetos))
    const notificar = notificacaoMixin.methods.notificar;

    const finalizarTarefa = (tempoDecorrido: number) : void => {
      const projeto = projetos.value.find((p) => p.id == idProjeto.value); // primeiro, buscamos pelo projeto
      if(!projeto) { 
        notificar(TipoNotificacao.FALHA,'Falha na tentativa de cadastro','Selecione um projeto antes de finalizar a tarefa!'); // notificamos o usuário
          return; // ao fazer return aqui, o restante do método salvarTarefa não será executado. chamamos essa técnica de early return :)
      }
      emit('aoSalvarTarefa', {
        duracaoEmSegundos: tempoDecorrido,
        descricao: descricao.value,
        projeto: projetos.value.find(proj => proj.id == idProjeto.value)
      })
      descricao.value = ''
    }



    return { 
      descricao,
      idProjeto,
      finalizarTarefa,
      projetos
    }
  }
});
</script>
<style>
.formulario {
  color: var(--texto-primario);
  background-color: var(--bg-primario);
}
</style>