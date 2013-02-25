// See http://en.wikipedia.org/wiki/Comma-separated_values
"use strict"; // Use ECMAScript 5 strict mode in browsers that support it

$(document).ready(function() {
   $("button").click(function() {
     calculate();
   });
 });

function calculate() {
  var result;
  var original       = document.getElementById("original");
  var temp = original.value;
  var regexp = /"(\s*\w+\s*,?)+"(,|$)|(\s*\w+\s*)+(,|$)/g;
  var lines = temp.split(/\n+\s*/);
  var commonLength = NaN;
  var r = [];
  // Template using underscore
  var row = "<% _.each(items, function(name) { %>"     +
            "                    <td><%= name %></td>" +
            "              <% }); %>";

  if (window.localStorage) localStorage.original  = temp;
  
  for(var t in lines) {
    var temp = lines[t];
    var m = temp.match(regexp);
    var n = temp.replace(/\s*/g,'');
    
    var aux = 0;
    /*Si hay menos simbolos en la cadena que se guarda tras el matching que en la cadena
     original quiere decir que esa cadena no tenia el formato CSV*/
    alert(n);
     alert(n.length);
    for(var i in m) {
      aux = aux + m[i].replace(/\s*/g,'').length;
    }   
    var result = [];
    var error = false;
    
    alert(aux);
    
    if (m && n.length == aux) {
      if (commonLength && (commonLength != m.length)) {
        //alert('ERROR! row <'+temp+'> has '+m.length+' items!');
        error = true;
      }
      else {
        commonLength = m.length;
        error = false;
      }
      for(var i in m) {
        var removecomma = m[i].replace(/,\s*$/,'');
        var remove1stquote = removecomma.replace(/^\s*"/,'');
        var removelastquote = remove1stquote.replace(/"\s*$/,'');
        var removeescapedquotes = removelastquote.replace(/\\"/,'"');
        result.push(removeescapedquotes);
      }
      var tr = error? '<tr class="error">' : '<tr>';
      r.push(tr+_.template(row, {items : result})+"</tr>");
    }
    else {
      alert('ERROR! row '+temp+' does not look as legal CSV');
      r.push(tr+_.template(row, {items : result})+"</tr>");
      error = true;
    }
  }
  r.unshift('<p>\n<table class="center" id="result">');
  r.push('</table>');
  //alert(r.join('\n')); // debug
  finaltable.innerHTML = r.join('\n');
}

window.onload = function() {
  // If the browser supports localStorage and we have some stored data
  if (window.localStorage && localStorage.original) {
    document.getElementById("original").value = localStorage.original;
  }
};


/*
 * 0, 1, 2, 3, 4
0, c, "d", 3, "5", "PAN, VINO"
4, "d", 6, 7, "pin", "PAN" "VINO"
8, e, 10, 11, "c", PIN
12, "f", 14, 15, "d", "PAN vino"
 * */

/* 
 Si no ponemos lo del && este caso lo haria mal, al menos con mi ER
 "987","juan","87345","10 norte 342" 7
"876","pedro","43649" "8 oriente 342"
"123","jorge","03342","av libertad 23"
"69","vicente","61560","valencia n183"
"18","lorenzo","06490","sol n18"
*/