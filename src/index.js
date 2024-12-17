gopeed.events.onResolve(async (ctx) => {
  const url = ctx.req.url;
  const html = await fetch(url).then((res) => res.text());

  const match = html.match(/data-tralbum="([^"]*)"/);
  if (!match) return;

  gopeed.logger.debug('tralbum', match[1]);

  const tralbum = JSON.parse(match[1].replace(/&quot;/g, '"').replace(/&amp;/g, '&'));

  ctx.res = {
    name: tralbum.current.title,
    files: tralbum.trackinfo
      .map((e) => ({
        name: e.title + '.mp3',
        req: {
          url: e.file['mp3-128'],
        },
      }))
      .filter((e) => e.req.url),
  };
});
