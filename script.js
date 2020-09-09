var books=[];
var id=1;
var newbookbtn = document.querySelector(".newbook");
newbookbtn.addEventListener("click", () =>{
	document.querySelector('form').reset();
	selectedIndex =-1
	document.querySelector(".savebtn").value="SAVE";

});

var btnSave = document.querySelector(".savebtn");

// btnSave.addEventListener("click", () => {
	
// });


function loadData(){

	document.getElementById("tablerows").innerHTML ="";
	books = JSON.parse(localStorage.getItem('booklist')) == null ? books =[] : JSON.parse(localStorage.getItem('booklist'));
	for(var i=0; i<books.length; i++){
		updateTable(i, books[i].id, books[i].title, books[i].author, books[i].year, books[i].publisher, books[i].pages, books[i].NumberOfCopies)
	}

}

function updateTable(index, id, title, bookauthor, year, publisher, pagenum, copynum){

	var booktable= document.getElementById("tablerows");
	var row = booktable.insertRow();
	var idcell = row.insertCell(0);
	var titlecell =row.insertCell(1);
	var authorcell = row.insertCell(2);
	var yearcell =row.insertCell(3);
	var publishercell = row.insertCell(4);
	var pagecell =row.insertCell(5);
	var copycell = row.insertCell(6);
	var actioncell =row.insertCell(7);

	idcell.innerHTML=id;
	titlecell.innerHTML=title;
	authorcell.innerHTML = bookauthor;
	yearcell.innerHTML = year;
	publishercell.innerHTML = publisher;
	pagecell.innerHTML = pagenum;
	copycell.innerHTML = copynum;
	actioncell.innerHTML = '<button onclick="editPressed('+index+')" data-target="#mymodel" data-toggle="modal">Edit</button>&nbsp;&nbsp;<button onclick="deleteTableRow('+index+')">Delete</button>';

}
function deleteTableRow(index){

	books.splice(index,1);
	localStorage.setItem("booklist", JSON.stringify(books));
	loadData();

}
var tempId;
var selectedIndex =-1;
function editPressed(index){
	document.getElementById("mymodel").style.display = "block";

	var bookObj = books[index];
		selectedIndex=index;
		tempId=bookObj.id;
		document.getElementById("booktitle").value=bookObj.title;
		document.getElementById("bookauthor").value=bookObj.author;
 		document.getElementById("year").value=bookObj.year;
 		document.getElementById("publisher").value=bookObj.publisher;
		document.getElementById("pagenum").value=bookObj.pages;
		document.getElementById("copynum").value=bookObj.NumberOfCopies;
		document.querySelector(".savebtn").value="UPDATE";

}

var btnVSearch = document.getElementById("searchbtn");
btnVSearch.addEventListener("click", ()=>{
	var input, filter, table, tr, firstCol, secondCol, thirdCol, i, txtValue, txtValue1, txtValue2;
  input = document.getElementById("searchbook");
  filter = input.value.toUpperCase();
  table = document.getElementById("booktable");
  tr = table.getElementsByTagName("tr");
  for (i = 0; i < tr.length; i++) {
    firstCol = tr[i].getElementsByTagName("td")[1];
    secondCol = tr[i].getElementsByTagName("td")[2];
    thirdCol = tr[i].getElementsByTagName("td")[4];
    if (firstCol || secondCol || thirdCol) {
      txtValue = firstCol.textContent || firstCol.innerText;
      txtValue1 = secondCol.textContent || secondCol.innerText;
      txtValue2 = thirdCol.textContent || thirdCol.innerText;

      if (txtValue.toUpperCase().indexOf(filter) > -1 || txtValue1.toUpperCase().indexOf(filter) > -1
      	|| txtValue2.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    }  
    }
});



// ==================sort table function=================

var btnSort = document.getElementById("sortbtn");
btnSort.addEventListener("click", () =>{
	var select = document.getElementById('sort');
	var sortValue =select.value;
  var table, rows, switching, i, x, y, shouldSwitch;
  table = document.getElementById("booktable");
  switching = true;

  while (switching) {

    switching = false;
    rows = table.rows;
    for (i = 1; i < (rows.length - 1); i++) {
      shouldSwitch = false;
     if(sortValue=="name"){
     	 x = rows[i].getElementsByTagName("td")[1];
     	 y = rows[i + 1].getElementsByTagName("td")[1];
  	}
      else if(sortValue=="author"){
      	x = rows[i].getElementsByTagName("td")[2];
      	y = rows[i + 1].getElementsByTagName("td")[2];
  	}
  	else if(sortValue=="copy"){
      	x = rows[i].getElementsByTagName("td")[6];
      	y = rows[i + 1].getElementsByTagName("td")[6];
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

function validateForm() {
	event.preventDefault();
  	books = JSON.parse(localStorage.getItem('booklist')) == null ? books =[] : JSON.parse(localStorage.getItem('booklist'));
	id = books[Object.keys(books)[Object.keys(books).length - 1]] != null? books[Object.keys(books)[Object.keys(books).length - 1]].id +  1 : id++;
	var title= document.getElementById("booktitle").value;
	var bookauthor= document.getElementById("bookauthor").value;
	var year= document.getElementById("year").value;
	var publisher= document.getElementById("publisher").value;
	var pagenum= document.getElementById("pagenum").value;
	var copynum= document.getElementById("copynum").value;

	var obj = {
		"id" : id,
		"title" : title,
		"author" : bookauthor,
		"year" : year,
		"publisher" : publisher,
		"pages" : pagenum,
		"NumberOfCopies" : copynum

	};

	if(selectedIndex ===-1){
		books.push(obj);
	}
	else{
		var newobj = {
		"id" : tempId,
		"title" : title,
		"author" : bookauthor,
		"year" : year,
		"publisher" : publisher,
		"pages" : pagenum,
		"NumberOfCopies" : copynum

	};
		books.splice(selectedIndex, 1, newobj);
	}
	
	localStorage.setItem("booklist", JSON.stringify(books));
	document.querySelector('form').reset();
	loadData();

  }

var btnClose = document.querySelector(".close");

btnClose.addEventListener("click", () => {

		location.reload();
});

