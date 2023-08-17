var app = angular.module('passagesApp', []);

app.filter("filterall",function($filter) {

  return function(arr,t){ 
    (t?t.split(/\s+/):[]).forEach(function(v){ 
      arr = $filter('filter')(arr,v); 
    });
    return arr;
  };

});

app.filter("tagFilter", function ($filter) {
  
  return function(inputArray = "", searchText = "") {
    var searchTerms = (searchText).toLowerCase().split(/\s+/);
    var result = inputArray;
    searchTerms.forEach(function(searchTerm) {
        result = $filter('filter')(result, searchTerm);
    });

    return result;
  };

});

app.controller('biblePassagesCtrl', function($scope, $http) { 

$http.get("data/biblePassagesSearch.json").then(function (response) {
  $scope.bookNames = Object.values(response.data.books);
  for(i = 0; i < 66; i++) {
    $scope.bookNames[i].passages = Object.values($scope.bookNames[i].passages);
  }
});

$http.get("amhbible.json").then(function (response) {
  $scope.books = Object.values(response.data.books);
  books = $scope.books;

  var url = getUrlVars();

  var toEnd = false;

  if (url.book) { //if passage submitted

    url.book = decodeURI(url.book.replace("+", " "));

    if(!isNaN(url.book)) url.book =  books[url.book-1].name;
    var passage = [];
    var indicator = "";

    for (b = 0; b < 66; b++) {
      if (url.book == books[b].name) {

        indicator = url.book + " " + url.sc + ":" + url.sv;

        if (!url.ev) {
          url.ev = url.sv;
        } else if (url.ev.toLowerCase() == "end" || url.ev == 999) {
          url.ev = 999;
          toEnd = true;
        } else {
          if (url.ec && url.ec != url.sc) {
            indicator += "-" + url.ec + ":" + url.ev
          }
          else indicator += "-" + url.ev
        }
        
        for(c = Number(url.sc); c <= Number(url.ec); c++) {
          
          if (c == Number(url.ec)){
            for (v = 1; v <= Number(url.ev); v++) {
              if (books[b].chapters[c].verses[v]) {
                passage.push({"b": b+1, "c": c, "v":v, "text": books[b].chapters[c].verses[v]});
              } else {
                url.ev = v - 1;
                if (toEnd) indicator += "-" + url.ec + ":" + url.ev
                continue;
              }
            }
          } else if(c == Number(url.sc)) {
            for (v = Number(url.sv); v <= 150; v++) {
              if (books[b].chapters[c].verses[v]) {
                passage.push({"b": b+1, "c": c, "v":v, "text": books[b].chapters[c].verses[v]});
              } else {
                continue;
              }
            }
          } else {
            for (v = 1; v <= 150; v++) {
              if (books[b].chapters[c].verses[v]) {
                passage.push({"b": b+1, "c": c, "v":v, "text": books[b].chapters[c].verses[v]});
              } else {
                continue;
              }
            }
          }

        }

        $scope.book = url.book;
        $scope.chapter = url.sc;
        $scope.v_prev = url.sv == 1 ? url.sv : url.sv - 1;
        $scope.sv = url.sv;
        $scope.ev = url.ev;
        $scope.v_next = parseInt(url.ev) + 1;
        $scope.passageTextarea = ">**" + indicator + "** - " + passage;
        $scope.indicator = indicator;
        $scope.passage = passage;

        continue;
      }
    }
  }

});



});