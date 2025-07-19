import RouterAbstrac from '../RouterAbstrac';

export default class RouterEquipos extends RouterAbstrac {
    constructor(prefix: string) {
        super(prefix);
    }
    // Publicas
    public construirRutas() {
        this.router.get('/todos', (ctx) => {
            ctx.body = 'Universitario - Cienciano - Melgar - Sporting Cristal';
        });
        return this.router;
    }
}
