import { createStore, Store, useStore as vuexUseStore } from "vuex";
import { InjectionKey } from "vue";
import { INotificacao } from "@/interfaces/INotificacao";
import { EstadoProjeto, projeto } from "./modulos/projeto";
import { EstadoTarefa, tarefa } from "./modulos/tarefa";
import { NOTIFICAR } from "./tipo-mutacoes";

export interface Estado {
    tarefa: EstadoTarefa, 
    notificacoes: INotificacao[],
    projeto: EstadoProjeto
}

export const key: InjectionKey<Store<Estado>> = Symbol()

export const store = createStore<Estado>({
    state:{
        tarefa: {
            tarefas: []
        },
        notificacoes: [],
        projeto: {
            projetos: []
        }
    },
    mutations:{ 
        [NOTIFICAR] (state, novaNotificacao:INotificacao){
            novaNotificacao.id = new Date().getTime();
            state.notificacoes.push(novaNotificacao);
            setTimeout(() => {
                state.notificacoes = state.notificacoes.filter(not => not.id != novaNotificacao.id);
            },3000);
        }
    }, 
    modules: {
        projeto,
        tarefa
    }
});

export function useStore(): Store<Estado>{
    return vuexUseStore(key);
}