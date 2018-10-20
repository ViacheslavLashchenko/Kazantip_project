$(function() {
 $("div[id*='menu-']").hide(); 
})();

function toggle(objName) {
 var obj = $(objName),
 blocks = $("div[id*='menu-']");
 
 if (obj.css("display") != "none") {
 obj.animate({ height: 'hide' }, 500);
 } else {
 var visibleBlocks = $("div[id*='menu-']:visible");

 if (visibleBlocks.length < 1) {
 obj.animate({ height: 'show' }, 500);
 } else {
 $(visibleBlocks).animate({ height: 'hide' }, 500, function() {
 obj.animate({ height: 'show' }, 500);
 }); 
 }
 }
}