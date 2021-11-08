import { createRouter, createWebHistory, LocationAsPath, LocationQueryRaw, RouteLocationRaw, RouteRecordRaw } from 'vue-router';
import Login from '../views/Login.vue';
import Lists from '../views/Lists.vue';
import { useUsers, userService } from '@/services/userService';
import { isNullOrWhitespace } from '@/util/stringUtils';

const user = useUsers();

const routes: Array<RouteRecordRaw> = [
	{
		path: '/',
		name: 'Home',
		component: Lists,
		// props: route => ({ directTo: route.query.previous  })
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

	if (to.path !== '/' && ! isAuthenticated) {
		const redirect: RouteLocationRaw = {
			path: '/',
			query: {
				previous: to.path
			}
		};

		next(redirect);
		return;
	}


	next();
});

export default router;
