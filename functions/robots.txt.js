export function onRequest({request}){
 const url=new URL(request.url),demo=url.hostname.endsWith('.pages.dev');
 const body=demo?'User-agent: *\nDisallow: /\n':'User-agent: *\nAllow: /\nSitemap: '+url.origin+'/sitemap.xml\n';
 return new Response(body,{headers:{'content-type':'text/plain; charset=UTF-8','cache-control':'public,max-age=3600'}})
}
