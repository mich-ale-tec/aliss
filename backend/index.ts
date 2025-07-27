import Server from './src/server/Server';
import Router from './src/router/Router';

// Servidor
const server = new Server();
server.cargarAdministradorError();
server.cargarConfiguracion();
server.cargarPlugins();
server.cargarLimites();
// Router
const router = new Router();
router.construirRutas();
const routes = router.obtenerRouter;
server.inyectarRutas(routes);
// Iniciar
server.iniciar();
// Recuperar recursos
process.on('SIGINT', function () {
    console.info('Caught interrupt signal');
    process.exit();
});
