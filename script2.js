if ("serviceWorker" in navigator) {
  if (navigator.serviceWorker.controller) {
    console.log("[PWA Builder] active service worker found, no need to register");
  } else {
    navigator.serviceWorker
      .register("pwabuilder-sw.js", {
        scope: "./"
      })
      .then(function (reg) {
        console.log("[PWA Builder] Service worker has been registered for scope: " + reg.scope);
      });
  }
}

// var bookNames = JSON.parse('{"1": "Genesis", "2": "Exodus", "3": "Leviticus", "4": "Numbers", "5": "Deuteronomy", "6": "Joshua", "7": "Judges", "8": "Ruth", "9": "1 Samuel", "10": "2 Samuel", "11": "1 Kings", "12": "2 Kings", "13": "1 Chronicles", "14": "2 Chronicles", "15": "Ezra", "16": "Nehemiah", "17": "Esther", "18": "Job", "19": "Psalms", "20": "Proverbs", "21": "Ecclesiastes", "22": "Song of Songs", "23": "Isaiah", "24": "Jeremiah", "25": "Lamentations", "26": "Ezekiel", "27": "Daniel", "28": "Hosea", "29": "Joel", "30": "Amos", "31": "Obadiah", "32": "Jonah", "33": "Micah", "34": "Nahum", "35": "Habakkuk", "36": "Zephaniah", "37": "Haggai", "38": "Zechariah", "39": "Malachi", "40": "Matthew", "41": "Mark", "42": "Luke", "43": "John", "44": "Acts", "45": "Romans", "46": "1 Corinthians", "47": "2 Corinthians", "48": "Galatians", "49": "Ephesians", "50": "Philippians", "51": "Colossians", "52": "1 Thessalonians", "53": "2 Thessalonians", "54": "1 Timothy", "55": "2 Timothy", "56": "Titus", "57": "Philemon", "58": "Hebrews", "59": "James", "60": "1 Peter", "61": "2 Peter", "62": "1 John", "63": "2 John", "64": "3 John", "65": "Jude", "66": "Revelation"}');

w3.hide("#display-passage");
w3.hide("#display-topic-results");

w3.getHttpObject("data/biblePassages.json", showPassages);

function showPassages(data) {

  console.log(data);
  
  w3.displayObject("passage-selector", data);

  // var object = {};
  // var passages = {};
  // var length = data.length;
  // var books = {};
  // var book = {};
  // var passage = {};
  
  // for(b = 1; b<=66; b++) {
  //   var n = 1;
  //   for(i = 0; i<length; i++) {
  //     if(idToVerse(data[i].p_start).b_num == b) {   
  //       passage.p_id = data[i].p_id;
  //       passage.p_title = data[i].p_title;
  //       passage.startBNum = idToVerse(data[i].p_start).b_num;
  //       passage.startCNum = idToVerse(data[i].p_start).c_num;
  //       passage.startVNum = idToVerse(data[i].p_start).v_num;
  //       passage.endBNum = idToVerse(data[i].p_end).b_num;
  //       passage.endCNum = idToVerse(data[i].p_end).c_num;
  //       passage.endVNum = idToVerse(data[i].p_end).v_num;
  //       passages[n] = passage;
  //       passage = {};
  //       n++;
  //     }
  //   } 
  //   book["b_id"] = b;
  //   book["b_name"] = bookNames[b];
  //   book["passages"] = passages; 
  //   passages = {};
  //   books[b] = book;
  //   book = {};
  // }

  // object["books"] = books;

  // var selected = getUrlVars();
  // var toEnd = false;

  // if (selected.passage) {
  //   w3.show("#display-topic-results");
  //   passage = decodeURI(selected.passage.replaceAll("+", " ")).toLowerCase();
  //   passages.topicResults = results;
  // }

  // w3.displayObject("passage-selector", passages);
}

Object.size = function (obj) {
  var size = 0,
    key;
  for (key in obj) {
    if (obj.hasOwnProperty(key)) size++;
  }
  return size;
};

function idToVerse(id) {
  var verse = {};
  verse.v_num = Number(id.substring(id.length - 3, id.length));
  verse.c_num = Number(id.substring(id.length - 5, id.length - 3));
  verse.b_num = Number(id.substring(id.length - 8, id.length - 6));

  return verse;
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
  var msg = document.getElementById(id).value;
  msg = msg.replaceAll("*","");
  msg = msg.replaceAll(">","");
  msg = msg.replaceAll(" - ",", ");
  console.log(msg);
  msg = new SpeechSynthesisUtterance(msg);
  var voicesList = speechSynthesis.getVoices();
  console.log(voicesList);
  msg.voice = voicesList.find((voice) => voice.lang === 'en-us');
  speechSynthesis.speak(msg);
}