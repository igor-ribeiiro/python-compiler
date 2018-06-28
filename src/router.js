import Vue from 'vue';
import Router from 'vue-router';
import About from './components/About.vue';
import Editor from './components/Editor.vue';
import Files from './components/Files.vue';

Vue.use(Router);

export default new Router({routes:[
    {
        path: '/about',
        name: 'about',
        component: About,
    },
    {
        path: '/editor',
        name: 'editor',
        component: Editor,
    },
    {
        path: '/drive',
        name: 'drive',
        component: Files,
    },
]});