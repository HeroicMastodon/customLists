import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import Login from '../views/Login.vue';
import Lists from '../views/Lists.vue';
import { useUsers } from '@/services/userService';
import { isNullOrWhitespace } from '@/util/stringUtils';

const user = useUsers();

const routes: Array<RouteRecordRaw> = [
	{
		path: '/',
		name: 'Home',
		component: Login,
	},
	{
		path: '/lists',
		name: 'Lists',
		component: Lists,
	},
];

const router = createRouter({
	history: createWebHistory(process.env.BASE_URL),
	routes,
});

router.beforeEach((to, from, next) => {
	if (to.path !== '/' && isNullOrWhitespace(user.username)) {
    next('/');
    return;
	}
  
	next();
});

export default router;
