import Koa from 'koa';

const app = new Koa();

app.use(async (ctx) => {
    ctx.body = 'Hola pai desde Koa con TypeScript';
});

app.listen(3000, () => {
    console.log('Servidor corriendo en http://localhost:3000');
});
