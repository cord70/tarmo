
// переход на ../index.html
  
const Link = document.querySelector('link[rel="canonical"]');
var url = Link ? Link.href : null;

if(url!=null && url.endsWith("/index.html"))
{
  var dir= url.slice(0, -11);
  dir= dir.slice(Math.max(dir.lastIndexOf('.'),dir.lastIndexOf('/'))+1);
  url= window.location.href;     
  if(url.endsWith(dir)) url= url+"/";

  if(url.endsWith(dir+"/")) {url= url+"index.html";  window.location.href= url; }
}
