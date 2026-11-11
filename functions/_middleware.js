/** Cloudflare Pages Functions. SEO tags use the real deployed hostname. */
export async function onRequest(context) {
  const response = await context.next();
  const type = response.headers.get('content-type') || '';
  if (!type.includes('text/html')) return response;
  const original = new URL(context.request.url);
  const path = original.pathname.endsWith('/') ? original.pathname : (original.pathname.endsWith('.html') ? original.pathname : `${original.pathname}/`);
  const cleanPath = (path === '/index.html') ? '/' : path;
  const url = original.origin + cleanPath;
  const image = original.origin + '/assets/images/og-cover.png';
  const demo = original.hostname.endsWith('.pages.dev');
  const out = new HTMLRewriter().on('head', {
    element(element) {
      element.append(`<link rel="canonical" href="${url}"><meta property="og:url" content="${url}"><meta property="og:image" content="${image}"><meta name="twitter:image" content="${image}">`, {html: true});
    }
  }).transform(response);
  if (demo) {
    const headers = new Headers(out.headers);
    headers.set('X-Robots-Tag', 'noindex, nofollow');
    return new Response(out.body, {status:out.status, statusText:out.statusText, headers});
  }
  return out;
}
