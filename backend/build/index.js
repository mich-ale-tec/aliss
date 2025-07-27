"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Server_1 = __importDefault(require("./src/server/Server"));
const Router_1 = __importDefault(require("./src/router/Router"));
// Servidor
const server = new Server_1.default();
server.cargarAdministradorError();
server.cargarConfiguracion();
server.cargarPlugins();
server.cargarLimites();
// Router
const router = new Router_1.default();
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
