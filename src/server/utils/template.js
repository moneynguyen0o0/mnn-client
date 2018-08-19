import serialize from 'serialize-javascript';

export default ({ markup, state, assets, helmet, styleTags, loadableState }) => {
  const {
    title,
    meta,
    link
  } = helmet;
  const {
    styles = [],
    scripts = []
  } = assets;

  return `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, minimum-scale=1.0">
        <link rel="shortcut icon" href="/favicon.ico">
        ${title.toString()}
        ${meta.toString()}
        ${link.toString()}
        ${styleTags}
        ${styles.map(href => `<link href="${href}" rel="stylesheet" type="text/css">`).join('\n')}
      </head>
      <body>
        <div id="app">${markup}</div>
        ${loadableState.getScriptTag()}
        <script>
          window.__INITIAL_STATE__ = ${serialize(state)}
        </script>
        ${scripts.map(script => `<script src="${script}"></script>`).join('\n')}
      </body>
    </html>
  `;
};
