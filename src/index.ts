import { Elysia, t } from 'elysia';
import { staticPlugin } from '@elysiajs/static';
import { html } from '@elysiajs/html';
import { swagger } from '@elysiajs/swagger';

const app = new Elysia();

app.use(swagger());
app.use(staticPlugin());
app.use(html());

app.get('/', () => {
  return new Response(Bun.file('./src/index.html'));
});

app.post(
  '/shorten',
  ({ body }) => {
    return 'Shorten Url';
  },
  {
    body: t.Object({
      url: t.String(),
    }),
  }
);

app.listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
