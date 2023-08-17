function disp(a) {
  // console.trace;
  console.log(a)
}

Object.size = function (obj) {
  var size = 0,
    key;
  for (key in obj) {
    if (obj.hasOwnProperty(key)) size++;
  }
  return size;
};

function getUrlVars() {
  var vars = [],
    hash;
  var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
  for (var i = 0; i < hashes.length; i++) {
    hash = hashes[i].split('=');
    vars.push(hash[0]);
    vars[hash[0]] = hash[1];
  }
  return vars;
}

function copyText(id) {
  var txt = document.getElementById(id);

  txt.select();
  txt.setSelectionRange(0, 99999); /* For mobile devices */

  document.execCommand("copy");
}

function copyInnerHTML(e) {
  //TODO: get the new bible json with proper verse ids
  var textToCopy = document.querySelector(e);
  var textBox = document.querySelector(".clipboard");
  textBox.setAttribute('value', textToCopy.innerHTML);

  textBox.select();
  document.execCommand('copy');
}

function listen(id) {
  var msg = document.getElementById(id).innerText;
  msg = new SpeechSynthesisUtterance(msg);
  var voicesList = speechSynthesis.getVoices();
  console.log(voicesList);
  msg.voice = voicesList.find((voice) => voice.lang === 'en-us');
  speechSynthesis.speak(msg);
}

function idToVerse(id) {
  var verse = {};
  verse.v_num = Number(id.substring(id.length - 3, id.length));
  verse.c_num = Number(id.substring(id.length - 5, id.length - 3));
  verse.b_num = Number(id.substring(id.length - 8, id.length - 6));

  return verse;
}

function getHTTP(url) {
  fetch(url)
    .then(r => r.json())
    .then(data = function (data) {
      console.log(data);
      return data;
    })
    .catch(e => console.log("Booo"));
};

function goBack() {
  window.history.back();
}

collapseAll('passage-selector');
document.getElementById("search-field").focus();

function collapseAll(id) {
  parent = document.getElementById(id);
  elements = Object.values(parent.getElementsByClassName("accordion-collapse"));
  elements.forEach(function (element) {
    element.className = element.className.replaceAll("show", "");
  });
  buttons = Object.values(parent.getElementsByClassName("accordion-button"));
  buttons.forEach(function (button) {
    button.className = button.className + " collapsed ";
  });

}

function expandAll(id) {
  parent = document.getElementById(id);
  elements = Object.values(parent.getElementsByClassName("accordion-collapse"));
  elements.forEach(function (element) {
    element.className = element.className + " show";
  });
  buttons = Object.values(parent.getElementsByClassName("accordion-button"));
  buttons.forEach(function (button) {
    button.className = button.className.replaceAll("collapsed", "");
  });

}




function quizMe(id) {

  var quizMeBtn = document.getElementById("quiz-me-btn");
  quizMeBtn.classList.add("disabled");
  quizMeBtn.innerText = "Answers at the bottom";
  


  Array.prototype.remove = function () {
    var what, a = arguments,
      L = a.length,
      ax;
    while (L && this.length) {
      what = a[--L];
      while ((ax = this.indexOf(what)) !== -1) {
        this.splice(ax, 1);
      }
    }
    return this;
  };
  
  String.prototype.replaceNth = function (f, r, n) {
  
    text = this;
  
    var t = 0;
    text = text.replace(f, function (match) {
      t++;
      return (t - 1 === n) ? r : match;
    });
  
    return text;
  };
  
  String.prototype.quiz = function (w) {
    var html = this;
    for (var i = 0; i < w.length; i++) {
      var term = new RegExp(w[i], 'gi');
      var occ = Math.floor(Math.random() * (html.match(term) || []).length);
      input = '<input class="border-bottom bg-transparent text-light mx-1 px-1 py-0 question" id="q' + i + '" onkeyup="compare(\'q' + i + '\', \'' + w[i] + '\')">';
      html = html.replaceNth(term, input, occ);
    }
    return html;
  }
  
  Array.prototype.random = function (n) {
    var arr = [];
    for (var i = 0; i < n; i++) {
      var rand = this[Math.floor(Math.random() * this.length)];
      arr.push(rand);
    }
    return arr;
  }

  const words = ["with ", " what ", " how ", " why ", " where ", " when ", " who ", " which ", " they ", " a ", " the ", " to ", " and ", " an ", " for ", " off ", " of ", " if ", " this ", " is ", " was ", " are ", " \"", " as ", " in ", " not ", " i ", " it ", " they ", ":", "\\."];

  var strMessage1 = document.getElementById(id);

  var text = " " + strMessage1.innerText;
  text = text.replaceAll(new RegExp(words.join('|'), 'gmi'), ' ');
  text = text.replace(/(\r\n|\n|\r)/gim, " ");
  text = text.replaceAll("  ", " ");
  text = text.replaceAll("  ", " ");
  text = text.replaceAll("  ", " ");
  text = text.split(/[\s,]+/);
  text = text.remove("");
  console.log(text);
  blanks = text.random(Math.floor(Math.random() * text.length/40) + 2);

  var html = strMessage1.innerHTML;
  html = html.quiz(blanks);
  console.log(blanks);
  strMessage1.innerHTML = html;
  document.getElementById("display-answers").innerText = "Answers: "+blanks.join(", ");
}



function compare(id, correct) {
  var field = document.getElementById(id);
  var answer = field.value;
  if (answer.toLowerCase() == correct.toLowerCase()) {
    console.log("Nice");
    field.classList.add("success");
    //TODO: focus to next field
  }
}