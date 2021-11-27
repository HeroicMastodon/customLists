import { createRouter, createWebHistory, LocationAsPath, LocationQueryRaw, RouteLocationRaw, RouteRecordRaw } from 'vue-router';
import Login from '../views/Login.vue';
import Lists from '../views/Lists.vue';
import List from '../views/List.vue';

import { useUsers, userService } from '@/services/userService';
import { isNullOrWhitespace } from '@/util/stringUtils';

const user = useUsers();

const loginPath = '/login';
const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        name: 'Home',
        component: Lists,
        // props: route => ({ directTo: route.query.previous  })
    },
	{
		path: loginPath,
		name: 'Login',
		component: Login,
	},
    {
        path: '/:id',
        name: 'List',
        component: List,
        props: true
    },
];

const router = createRouter({
	history: createWebHistory(process.env.BASE_URL),
	routes,
});

router.beforeEach(async (to, from, next) => {
	const isAuthenticated = ( await userService.authenticate() );
    console.log({isAuthenticated, to, from})
	if (to.path !== loginPath && ! isAuthenticated) {
		const redirect: RouteLocationRaw = {
			path: loginPath,
			query: {
				previous: to.path
			}
		};

		next(redirect);
		return;
	}
    if (to.path === loginPath && isAuthenticated) {
        const redirect: RouteLocationRaw = {
            path: "/"
        };

        next(redirect);
        return;
    }

	next();
});

export default router;
