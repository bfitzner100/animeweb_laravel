/*!
 * jQuery.ellipsis
 * https://github.com/jjenzz/jquery.ellipsis
 * --------------------------------------------------------------------------
 * Copyright (c) 2013 J. Smith (@jjenzz)
 * Dual licensed under the MIT and GPL licenses:
 * https://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl.html
 *
 * adds a class to the last 'allowed' line of text so you can apply
 * text-overflow: ellipsis;
 */
(function(a){if(typeof define==="function"&&define.amd){define(["jquery"],a)}else{a(jQuery)}}(function(d){var c="ellipsis",b='<span style="white-space: nowrap;">',e={lines:"auto",ellipClass:"ellip",responsive:false};function a(h,q){var m=this,w=0,g=[],k,p,i,f,j,n,s;m.$cont=d(h);m.opts=d.extend({},e,q);function o(){m.text=m.$cont.text();m.opts.ellipLineClass=m.opts.ellipClass+"-line";m.$el=d('<span class="'+m.opts.ellipClass+'" />');m.$el.text(m.text);m.$cont.empty().append(m.$el);t()}function t(){if(typeof m.opts.lines==="number"&&m.opts.lines<2){m.$el.addClass(m.opts.ellipLineClass);return}n=m.$cont.height();if(m.opts.lines==="auto"&&m.$el.prop("scrollHeight")<=n){return}if(!k){return}s=d.trim(m.text).split(/\s+/);m.$el.html(b+s.join("</span> "+b)+"</span>");m.$el.find("span").each(k);if(p!=null){u(p)}}function u(x){s[x]='<span class="'+m.opts.ellipLineClass+'">'+s[x];s.push("</span>");m.$el.html(s.join(" "))}if(m.opts.lines==="auto"){var r=function(y,A){var x=d(A),z=x.position().top;j=j||x.height();if(z===f){g[w].push(x)}else{f=z;w+=1;g[w]=[x]}if(z+j>n){p=y-g[w-1].length;return false}};k=r}if(typeof m.opts.lines==="number"&&m.opts.lines>1){var l=function(y,A){var x=d(A),z=x.position().top;if(z!==f){f=z;w+=1}if(w===m.opts.lines){p=y;return false}};k=l}if(m.opts.responsive){var v=function(){g=[];w=0;f=null;p=null;m.$el.html(m.text);clearTimeout(i);i=setTimeout(t,100)};d(window).on("resize."+c,v)}o()}d.fn[c]=function(f){return this.each(function(){try{d(this).data(c,(new a(this,f)))}catch(g){if(window.console){console.error(c+": "+g)}}})}}));

// Determina quantas linhas serão vistas nos excerpts da home
//$('.articleTitulo').ellipsis({ lines: 2 });

/*
Código retirado do CodePen
Link: https://codepen.io/jovanivezic/pen/ZLgXPJ
Finalidade: Botão de Exibir mais ou menos a sinopse
*/
var showChar = 500; // Quantidade de Caracteres à exibir
var ellipsestext = "...";
var moretext = "Mostrar mais";
var lesstext = "Mostrar menos";

// Cortar o texto baseado no tamanho da sinopse
if ($(".toggle-text").length) {
    $(".toggle-text").each(function() {

        var content = $(this).html();
        //console.log(content);
 
        if(content.length > showChar) {
 
            var contentExcert = content.substr(0, showChar);
            var contentRest = content.substr(showChar, content.length - showChar);
            var html = contentExcert + '<span class="toggle-text-ellipses">' + ellipsestext + ' </span> <span class="toggle-text-content"><span>' + contentRest + '</span><a href="javascript:;" class="toggle-text-link">' + moretext + '</a></span>';
 
            $(this).html(html);
        }
    });
}

// Trocar o conteúdo quando clicar no link de ler mais
$(".toggle-text-link").click(function(){
    if($(this).hasClass("less")) {
        $(this).removeClass("less");
        $(this).html(moretext);
    } else {
        $(this).addClass("less");
        $(this).html(lesstext);
    }
    $(this).parent().prev().toggle();
    $(this).prev().toggle();
    return false;
});

/*
Código retirado do Github
Link: https://gist.github.com/kottenator/9d936eb3e4e3c3e02598
Finalidade: criar paginação com números
*/
function pagination(currentPage, pageCount, delta = 2) {
    const separate = (a, b) => [a, ...({
      0: [],
      1: [b],
      2: [a + 1, b],
    }[b - a] || ['...', b])]
  
    return Array(delta * 2 + 1)
      .fill()
      .map((_, index) => currentPage - delta + index)
      .filter(page => 0 < page && page <= pageCount)
      .flatMap((page, index, { length }) => {
        if (!index) return separate(1, page)
        if (index === length - 1) return separate(page, pageCount)
  
        return [page]
    })
}