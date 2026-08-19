/* ==========================================================================
   Currency icons from GitHub.
   Drop this in a <script> AFTER the game's item-art code, or fold it into
   patch.js as a step. It overrides itemArt() for currency only and leaves
   every other item type alone.
   ========================================================================== */
window.CURRENCY_ART_BASE =
  'https://raw.githubusercontent.com/Graphic37/Characters/main/ashen-hollow-models/ui/currency/';

(function(){
  /* ids that have art. Anything not listed keeps the procedural icon, so a new
     currency without an image degrades instead of showing a broken box. */
  var HAVE = { cu_exalt:1, cu_annul:1, cu_qual:1, cu_socket:1,
               cu_corrupt:1, cu_grkey:1, cu_vault:1 };

  var prev = window.itemArt;
  if(typeof prev !== 'function') return;

  window.itemArt = function(it){
    if(it && it.kind === 'currency' && HAVE[it.baseId]){
      return '<img src="' + window.CURRENCY_ART_BASE + it.baseId + '.png" ' +
             'alt="" draggable="false" ' +
             'style="width:100%;height:100%;object-fit:contain;' +
             'image-rendering:auto;pointer-events:none">';
    }
    return prev.apply(this, arguments);
  };
})();
