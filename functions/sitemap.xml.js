export function onRequest({request}){
  const base=new URL(request.url).origin;
  const routes=['/','/usluge/','/o-nama/','/galerija/','/kontakt/','/politika-privatnosti/','/uvjeti-koristenja/','/politika-kolacica/'];
  const xml='<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'+routes.map(path=>'  <url><loc>'+base+path+'</loc></url>').join('\n')+'\n</urlset>';
  return new Response(xml,{headers:{'content-type':'application/xml; charset=UTF-8','cache-control':'public,max-age=3600'}})
}
