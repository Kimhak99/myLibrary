
var visitors=[];
var id=1;

var newvisitorbtn = document.querySelector(".newvisitor");
newvisitorbtn.addEventListener("click", () =>{
		document.getElementById('vform').reset();
		visitorSelectedIndex =-1
	    document.querySelector(".vSavebtn").value="SAVE";
});

var btnSaveVisitor = document.querySelector(".vSavebtn");

// btnSaveVisitor.addEventListener("click", () => {
	
// });

function loadDataVisitor(){

	document.getElementById("visitortablerows").innerHTML ="";
	visitors = JSON.parse(localStorage.getItem('visitorList')) == null ? visitors =[] : JSON.parse(localStorage.getItem('visitorList'));
	for(var i=0; i<visitors.length; i++){
		updateTableVisitor(i, visitors[i].id, visitors[i].fname, visitors[i].number);
	}
}

function updateTableVisitor(index, id, fullname, phonenum){

	var visitortable= document.getElementById("visitortablerows");
	var row = visitortable.insertRow();
	var visitoridcell = row.insertCell(0);
	var visitorfullnamecell =row.insertCell(1);
	var visitorphonenumbercell = row.insertCell(2);
	var visitoractioncell = row.insertCell(3);

	visitoridcell.innerHTML=id;
	visitorfullnamecell.innerHTML=fullname;
	visitorphonenumbercell.innerHTML = phonenum;
	visitoractioncell.innerHTML = '<button onclick="edit('+index+')" data-target="#mymodel1" data-toggle="modal">Edit</button>';

}
var visitorTempId;
var visitorSelectedIndex =-1;

function edit(index){
	console.log("click");
	document.getElementById("mymodel1").style.display = "block";

	var visitorObj = visitors[index];
	    visitorSelectedIndex=index;
		visitorTempId=visitorObj.id;
		document.getElementById("name").value=visitorObj.fname;
		document.getElementById("number").value=visitorObj.number;
		document.querySelector(".vSavebtn").value="UPDATE";

}

var btnVSearch = document.getElementById("vSearchBtn");
btnVSearch.addEventListener("click", ()=>{
	var input, filter, table, tr, firstCol, secondCol, i, txtValue, txtValue1;
  input = document.getElementById("searchvisitor");
  filter = input.value.toUpperCase();
  table = document.getElementById("visitortable");
  tr = table.getElementsByTagName("tr");
  for (i = 0; i < tr.length; i++) {
    firstCol = tr[i].getElementsByTagName("td")[1];
    secondCol = tr[i].getElementsByTagName("td")[2];
    if (firstCol || secondCol) {
      txtValue = firstCol.textContent || firstCol.innerText;
      txtValue1 = secondCol.textContent || secondCol.innerText;
      // txtValue1 = secondCol.textContent || secondCol.innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1 || txtValue1.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    }  
    }
});


// ==================sort table function=================

var vbtn = document.getElementById("vSelectBtn");
vbtn.addEventListener("click", () =>{

	var vSelect = document.getElementById('sortVisitor');
	var vSortValue = vSelect.value;
  var table, rows, switching, i, x, y, shouldSwitch;
  table = document.getElementById("visitortable");
  switching = true;

  while (switching) {

    switching = false;
    rows = table.rows;
    for (i = 1; i < (rows.length - 1); i++) {
      shouldSwitch = false;
     if(vSortValue=="id"){
     	 x = rows[i].getElementsByTagName("td")[0];
     	 y = rows[i + 1].getElementsByTagName("td")[0];
  	}
      else if(vSortValue=="name"){
      	x = rows[i].getElementsByTagName("td")[1];
      	y = rows[i + 1].getElementsByTagName("td")[1];
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

function validateFormVisitor(){
	event.preventDefault();
	visitors = JSON.parse(localStorage.getItem('visitorList')) == null ? visitors =[] : JSON.parse(localStorage.getItem('visitorList'));
	id = visitors[Object.keys(visitors)[Object.keys(visitors).length-1]] != null? visitors[Object.keys(visitors)[Object.keys(visitors).length - 1]].id + 1 : id++;

	var fullname= document.getElementById("name").value;
	var phonenum= document.getElementById("number").value;
	var phoneRGEX = /(\d{3})[ -]?(\d{3})[ -]?(\d{3,4})/;
  var phoneResult = phoneRGEX.test(phonenum);

  		if(!phoneResult){
  	 alert("wrong phone number format");
  	 return false;
  	}


	var obj = { 
		"id" : id,
		"fname" : fullname,
		"number" : phonenum
	};

	if(visitorSelectedIndex ===-1){
		visitors.push(obj);
	}
	else{
		var newobj = {
		"id" : visitorTempId,
		"fname" : fullname,
		"number" : phonenum
	};
		visitors.splice(visitorSelectedIndex, 1, newobj);
	}
	
	localStorage.setItem("visitorList", JSON.stringify(visitors));
	document.getElementById('vform').reset();
	loadDataVisitor();
}

	

