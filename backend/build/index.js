"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Server_1 = __importDefault(require("./src/server/Server"));
const Router_1 = __importDefault(require("./src/router/Router"));
function init() {
    return __awaiter(this, void 0, void 0, function* () {
        // Servidor
        const server = new Server_1.default();
        server.cargarAdministradorError();
        server.cargarConfiguracion();
        server.cargarPlugins();
        server.cargarLimites();
        // Router
        const router = new Router_1.default();
        yield router.construirRutas();
        const routes = router.obtenerRouter;
        server.inyectarRutas(routes);
        // Iniciar
        server.iniciar();
        // Recuperar recursos
        process.on('SIGINT', function () {
            console.info('Caught interrupt signal');
            process.exit();
        });
    });
}
init()
    .then(e => {
    console.log('Servidor Listo');
})
    .catch(e => {
    console.error(e);
});
