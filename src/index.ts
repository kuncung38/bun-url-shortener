import { Elysia, error, t } from 'elysia';
import { staticPlugin } from '@elysiajs/static';
import { html } from '@elysiajs/html';
import { swagger } from '@elysiajs/swagger';
import { nanoid } from 'nanoid';
import { db } from './db';
import { shortener } from './db/schema';
import { validateUrl } from './helper/url';
import { generateHTML } from './helper';
import { eq } from 'drizzle-orm';

const app = new Elysia();

app.use(swagger());
app.use(staticPlugin());
app.use(html());

app.get('/', () => {
  return new Response(Bun.file('./src/index.html'));
});

app.get('/:id', async ({ params: { id }, set }) => {
  const url = await db
    .select({ url: shortener.url })
    .from(shortener)
    .where(eq(shortener.urlId, id))
    .get();

  if (!url) {
    return error('Bad Request', { statusCode: 404, message: 'URL not found' });
  }

  set.redirect = url.url;
});

app.post(
  '/shorten',
  async ({ body: { url } }) => {
    if (!validateUrl(url)) {
      return error('Bad Request', {
        statusCode: 400,
        message: 'Please give me valid URL',
      });
    }

    const existingUrlId = await db
      .select({ urlId: shortener.urlId })
      .from(shortener)
      .where(eq(shortener.url, url))
      .get();

    const urlId = nanoid(7);
    if (!existingUrlId) {
      await db.insert(shortener).values({
        url,
        urlId,
      });
    }

    const redirect = `http://${Bun.env.HOST_URL}/${existingUrlId ?? urlId}`;

    return generateHTML(redirect);
  },
  {
    body: t.Object({
      url: t.String({
        default: 'https://www.example.com',
      }),
    }),
  }
);

app.listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
