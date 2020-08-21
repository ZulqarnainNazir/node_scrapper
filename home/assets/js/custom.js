var browser_update_message = 'Sie verwenden einen veralteten Browser. Das Zeichentool setzt Funktionen vorraus, die nur in modernen Browsern vorhanden sind. Bitte aktualisieren Sie Ihren Browser, um das Zeichentool korrekt nutzen zu können. Eine Aktualisierung dauert nur wenige Minuten und macht das Surfen sicherer! <a href="http://browser-update.org/de/update.html" target="_blank">Hier erfahren Sie, wie einfach Sie Ihren Browser aktualisieren können.</a>';

var $buoop = {
   vs: {
       i: 10,
       f: 23,
       o: 11,
       s: 4,
       n: 9
   }
   ,
   l: 'en'                       // set a language for the message, e.g. "en"
   ,
   test: false // true = always show the bar (for testing)
   ,
   text: browser_update_message // custom notification html text
}
$buoop.ol = window.onload;
window.onload = function () {
   try {
       if ($buoop.ol)
           $buoop.ol();
   } catch (e) {
   }
   var e = document.createElement("script");
   e.setAttribute("type", "text/javascript");
   e.setAttribute("src", "https://browser-update.org/update.js");
   document.body.appendChild(e);
}
         
 /* <![CDATA[ */
 var _gaq = _gaq || [];
 _gaq.push(['_setAccount', 'UA-44707912-1']);
 _gaq.push(['_trackPageview']);
 _gaq.push(['_setDomainName', 'www.bestell-dein-blech.de']);
 _gaq.push(['_setAllowLinker', true]);
 _gaq.push(['_gat._anonymizeIp']);
 _gaq.push(['_trackPageview']);
 (function() {
   var ga = document.createElement('script');
   ga.type = 'text/javascript';
   ga.async = true;
   ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
   var s = document.getElementsByTagName('script')[0];
   s.parentNode.insertBefore(ga, s);
 })();
 /* ]]> */