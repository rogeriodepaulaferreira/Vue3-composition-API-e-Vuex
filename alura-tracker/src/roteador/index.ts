import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import Tarefas from "../Views/Tarefas.vue";
import Projetos from "../Views/Projetos.vue"
import Formulario from "../Views/Projetos/Formulario.vue"
import Lista from "../Views/Projetos/Lista.vue"

const rotas: RouteRecordRaw[] = [
    {
        path: '/',
        name: 'Tarefas',
        component: Tarefas
    },
    {
        path:'/projetos',
        component: Projetos,
        children:[
            {
                path: '',
                name: 'Projetos',
                component: Lista
            },
            {
                path: 'novo',
                name: 'Novo Projetos',
                component: Formulario
            },
            {
                path: ':id',
                name: 'Editar Projetos',
                component: Formulario,
                props: true
            }
        ]
    }
];

const roteador = createRouter({
    history: createWebHashHistory(),
    routes: rotas
});

export default roteador;