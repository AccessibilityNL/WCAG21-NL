function titleToPathFrag (title) {
  return title.toLowerCase().replace(/[\s,]+/g, '-').replace(/[\(\)]/g, '');
}

function linkUnderstanding() {
  var understandingBaseURI = 'https://www.w3.org/WAI/WCAG21/Understanding/';
  document.querySelectorAll('.sc').forEach(function(node){
    var altId = node.dataset.altId || '';
    var heading = node.firstElementChild.textContent;
    var pathFrag = altId
      ? titleToPathFrag(altId)
      : 'index';
    var el = document.createElement('div');
    el.setAttribute('class', 'doclinks');
    el.innerHTML = '<a hreflang="en" href="' + understandingBaseURI + pathFrag   + '.html">' + heading + ' begrijpen</a> <span class="screenreader">|</span> <br /><a href="https://www.w3.org/WAI/WCAG21/quickref/#' + altId + '">Hoe te voldoen aan ' + heading + '</a>';
    node.insertBefore(el, node.children[1]);
  });
}

function createSpan(title) {
  var prefixElement = document.createElement('span');
  prefixElement.textContent = title;

  return prefixElement;
}

function addTextSemantics() {
  var principlePrefix = createSpan('Principe');
  var guidelinePrefix = createSpan('Richtlijn');
  var scPrefix = createSpan('Succescriterium');

  // remove the change marker
  document.querySelectorAll('p.change').forEach(function(node){
    node.parentNode.removeChild(node);
  });
  // put level before and parentheses around the conformance level marker
  document.querySelectorAll('p.conformance-level').forEach(function(node){
    var level = node.textContent;
    node.textContent = '(Niveau ' + level + ')';
  });
  // put principle in principle headings
  document.querySelectorAll('section.principle > h2 > .secno').forEach(function(node){
    node.parentElement.insertBefore(principlePrefix.cloneNode(true), node);
  });
  // put guideline in GL headings
  document.querySelectorAll('section.guideline > h3 > .secno').forEach(function(node){
    node.parentElement.insertBefore(guidelinePrefix.cloneNode(true), node);
  });
  // put success criterion in SC headings
  document.querySelectorAll('section.sc > h4 > .secno').forEach(function(node){
    node.parentElement.insertBefore(scPrefix.cloneNode(true), node);
  });
}

function markConformanceLevel() {
}

function swapInDefinitions() {
  if (new URLSearchParams(window.location.search).get('defs') != null) document.querySelectorAll('.internalDFN').forEach(function(node){
    node.title = node.textContent;
    node.textContent = findDef(document.querySelector(node.href.substring(node.href.indexOf('#'))).parentNode.nextElementSibling.firstElementChild).textContent;
  });
  function findDef(el){
    if (el.hasAttribute('class')) return findDef(el.nextElementSibling);
    else return el;
  }
}

require(['core/pubsubhub'], function(respecEvents) {
  'use strict';
  respecEvents.sub('end', function(message) {
    	if (message === 'core/link-to-dfn') {
    		linkUnderstanding();
    	}
  });
});

// Change the authors credit to WCAG 2.0 editors credit
require(['core/pubsubhub'], function(respecEvents) {
  'use strict';
  respecEvents.sub('end', function(message) {
    	if (message === 'core/link-to-dfn') {
    		document.querySelectorAll('div.head dt').forEach(function(node){
    			if (node.textContent == 'Former editors:') node.textContent = 'WCAG 2.0 Editors (until December 2008):';
    		});
    	}
  });
});

// Fix the scroll-to-fragID problem:
require(['core/pubsubhub'], function (respecEvents) {
  'use strict';
  respecEvents.sub('end-all', function () {
    if(window.location.hash) {
      window.location = window.location.hash;
    }
  });
});
