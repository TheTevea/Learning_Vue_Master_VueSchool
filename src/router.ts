import { createWebHistory, createRouter } from 'vue-router/auto';
import { routes } from 'vue-router/auto-routes';

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
});

router.beforeEach(async (to) => {
    const useAuth = useAuthStore();
    await useAuth.getSession();

    const isAuthPage = ['/login', '/register'].includes(to.path);

    if (!useAuth.user && !isAuthPage) {
        return {
            name: '/login',
        };
    }
    if (useAuth.user && isAuthPage) {
        return {
            name: '/',
        };
    }
});

export default router;
