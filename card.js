
var cards=[];
var books=[];
var visitors=[];
var id=1;
var borrowdate; 
var returndate;
var btnSaveCard = document.querySelector(".cardSavebtn");
var btnNewCard = document.querySelector(".newCardBtn");

function reloadDropdownItems(){
	var select = document.getElementById('book');
	var selVisitor = document.getElementById('visitor');
	var length = select.options.length;
	for (i = length-1; i >= 1; i--) {
  	select.options[i] = null;
}
var length1 = selVisitor.options.length;
	for (i = length1-1; i >= 1 ; i--) {
  	selVisitor.options[i] = null;

}
}


function loadDataCard(){

	document.getElementById("cardTableRows").innerHTML ="";
	cards = JSON.parse(localStorage.getItem('cardList')) == null ? cards =[] : JSON.parse(localStorage.getItem('cardList'));
	for(var i=0; i<cards.length; i++){
		updateTableCard(i, cards[i].id, cards[i].visitorname, cards[i].booktitle, cards[i].borrowdate, cards[i].returndate);
	}
}

function updateTableCard(index, id, visitor, book, borrowdate, returndate){

	var cardObj = cards[index];
	borrowdate = new Date();
	var month = borrowdate.getUTCMonth() + 1; //months from 1-12
	var day = borrowdate.getUTCDate();
	var year = borrowdate.getUTCFullYear();
	borrowdate = day + "-" + month + "-" + year;

	var cardtable= document.getElementById("cardTableRows");
	var row = cardtable.insertRow();
	var cardidcell = row.insertCell(0);
	var cardvisitorcell =row.insertCell(1);
	var cardbookcell = row.insertCell(2);
	var cardborrowcell = row.insertCell(3);
	var cardreturncell = row.insertCell(4);

	cardidcell.innerHTML = id;
	cardvisitorcell.innerHTML = visitor;
	cardbookcell.innerHTML = book;
	cardborrowcell.innerHTML = borrowdate;
	if(cardObj.returndate==""){
		cardreturncell.innerHTML = '<button onclick="Return('+index+')">&#8634;</button>';
	}
	else{
		cardreturncell.innerHTML = cardObj.returndate;
	}
	}

function loadDataToForm(){
	 visitors = JSON.parse(localStorage.getItem('visitorList')) == null ? visitors =[] : JSON.parse(localStorage.getItem('visitorList'));
	 books = JSON.parse(localStorage.getItem('booklist')) == null ? books =[] : JSON.parse(localStorage.getItem('booklist'));
	 var selectVisitor = document.getElementById("visitor");
	 var selectBook = document.getElementById("book");


	for(var i=0; i<visitors.length; i++){;
		var option = document.createElement("OPTION"),
			txt = document.createTextNode(visitors[i].fname);
			option.appendChild(txt);
			option.setAttribute("value",visitors[i].fname);
			selectVisitor.insertBefore(option,selectVisitor.lastChild);
	}


	for(var i=0; i<books.length; i++){;
		if(books[i].NumberOfCopies > 0){
			var option = document.createElement("OPTION"),
				txt = document.createTextNode(books[i].title);
				option.appendChild(txt);
				option.setAttribute("value",books[i].title);
				selectBook.insertBefore(option,selectBook.lastChild);
		}
	}
}

// returning the book function
function Return(index){
	var cardObj = cards[index];
	var tempId= cardObj.id;
	returndate = new Date();
	var month = returndate.getUTCMonth() + 1; //months from 1-12
	var day = returndate.getUTCDate();
	var year = returndate.getUTCFullYear();
	returndate = day + "-" + month + "-" + year;

	var returnObj = { 
		"id" : tempId,
		"visitorname" : cardObj.visitorname,
		"booktitle" : cardObj.booktitle,
		"borrowdate": cardObj.borrowdate,
		"returndate": returndate
	};

	cards.splice(index, 1, returnObj);	
	localStorage.setItem("cardList", JSON.stringify(cards));
	loadDataCard();

for(var i=0; i<books.length; i++){
		if(books[i].title == cardObj.booktitle){
	   var returnBookNum= books[i].NumberOfCopies += 1;
	   var returnTempId = books[i].id;
	   var returnTempTitle = books[i].title;
	   var returnAuthor = books[i].author;
	   var returnYear = books[i].year;
	   var returnPublisher = books[i].publisher; 
	   var returnPage = books[i].pages;
	   var returnBookIndex = books.findIndex(id => id.id == returnTempId);

	}
	
}
		var returnObj = { 
		"id" : returnTempId,
		"title" : returnTempTitle,
		"author" : returnAuthor,
		"year" : returnYear,
		"publisher" : returnPublisher,
		"pages" : returnPage,
		"NumberOfCopies" : returnBookNum
	};
	books.splice(returnBookIndex, 1, returnObj);
	localStorage.setItem("booklist", JSON.stringify(books));
	loadData();
	reloadDropdownItems();
	loadDataToForm();

}

// ==============function increase number of copy when return =============


// search by visitor name
var btnCardSearch = document.getElementById("cardSearchBtn");
btnCardSearch.addEventListener("click", ()=>{
	var input, filter, table, tr, td, i, txtValue, txtValue1;
  input = document.getElementById("searchcard");
  filter = input.value.toUpperCase();
  table = document.getElementById("cardtable");
  tr = table.getElementsByTagName("tr");
  for (i = 0; i < tr.length; i++) {
    td = tr[i].getElementsByTagName("td")[1];
    td1 = tr[i].getElementsByTagName("td")[2];
    if (td || td1) {
      txtValue = td.textContent || td.innerText;
      txtValue1 = td1.textContent || td1.innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1 || txtValue1.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    }       
  }
});


// ==================sort table function=================

var cbtn = document.getElementById("btnCard");
cbtn.addEventListener("click", () =>{

	var cSelect = document.getElementById('sortCard');
	var cSortValue = cSelect.value;
  var table, rows, switching, i, x, y, shouldSwitch;
  table = document.getElementById("cardtable");
  switching = true;

  while (switching) {

    switching = false;
    rows = table.rows;
    for (i = 1; i < (rows.length - 1); i++) {
      shouldSwitch = false;
     if(cSortValue=="id"){
     	 x = rows[i].getElementsByTagName("td")[1];
     	 y = rows[i + 1].getElementsByTagName("td")[1];
  	}
      else if(cSortValue=="return"){
      	x = rows[i].getElementsByTagName("td")[4];
      	y = rows[i + 1].getElementsByTagName("td")[4];
  	}
   
      if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
        shouldSwitch = true;

        break;
      }
    }
    if (shouldSwitch) {
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      switching = true;
    }
  }
});



 // ================when save card button is clicked================

function validateFormCard(){
	event.preventDefault();
	cards = JSON.parse(localStorage.getItem('cardList')) == null ? cards =[] : JSON.parse(localStorage.getItem('cardList'));
	id = cards[Object.keys(cards)[Object.keys(cards).length-1]] != null? cards[Object.keys(cards)[Object.keys(cards).length - 1]].id + 1 : id++;
	books = JSON.parse(localStorage.getItem('booklist')) == null ? books =[] : JSON.parse(localStorage.getItem('booklist'));

	borrowdate = new Date();
	var month = borrowdate.getUTCMonth() + 1; //months from 1-12
	var day = borrowdate.getUTCDate();
	var year = borrowdate.getUTCFullYear();
	borrowdate = day + "-" + month + "-" + year;

	var selVisitor = document.getElementById('visitor');
	var selBook = document.getElementById('book');
	var visitor=selVisitor.value;
    var book =selBook.value;

    var bookTempId;
	var bookTempTitle;
	var tempAuthor, tempYear, tempPublisher, tempPage, tempCopy, updatedCopynum;
	
	var obj = { 
		"id" : id,
		"visitorname" : visitor,
		"booktitle" : book,
		"borrowdate": borrowdate,
		"returndate": ""
	};

	for(var i=0; i<books.length; i++){
		if(books[i].title == book){
	 	updatedCopynum= books[i].NumberOfCopies -= 1;

	 
	 	bookTempId = books[i].id;
	 	bookTempTitle = books[i].title;
		tempAuthor = books[i].author;
	 	tempYear = books[i].year;
	 	tempPublisher = books[i].publisher; 
	 	tempPage = books[i].pages;
		var bookIndex = books.findIndex(id => id.id == bookTempId);
	}
}
	var borrowObj = { 
		"id" : bookTempId,
		"title" : bookTempTitle,
		"author" : tempAuthor,
		"year" : tempYear,
		"publisher" : tempPublisher,
		"pages" : tempPage,
		"NumberOfCopies" : updatedCopynum
	};

	books.splice(bookIndex, 1, borrowObj);
	localStorage.setItem("booklist", JSON.stringify(books));

	cards.push(obj);
	
	localStorage.setItem("cardList", JSON.stringify(cards));
	document.getElementById('cform').reset();
	loadDataCard();
	loadData();
	if(updatedCopynum<1){
		reloadDropdownItems();
		loadDataToForm();
	}

}


var newCardBtn = document.querySelector(".newCardBtn");
newCardBtn.addEventListener("click", () =>{
		reloadDropdownItems();
		loadDataToForm();
});