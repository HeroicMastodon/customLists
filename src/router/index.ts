import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import Login from '../views/Login.vue';
import Lists from '../views/Lists.vue';
import { useUsers, userService } from '@/services/userService';
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

router.beforeEach(async (to, from, next) => {
	const isAuthenticated = ( await userService.authenticate() );	
	console.log(isAuthenticated)
	if (to.path !== '/' && ! isAuthenticated) {
		next('/');
		return;
	}


	next();
});

export default router;
