
// =========================active visitor statistics fucntion=====================

var cards=[];
var vNameList=[];
var add = "";
var activeVisitor = document.getElementById("activeVisitor");
var mybutton_counter=0;

activeVisitor.addEventListener("click", ()=>{
	mybutton_counter++;

cards = JSON.parse(localStorage.getItem('cardList')) == null ? cards =[] : JSON.parse(localStorage.getItem('cardList'));
statistictable.style.display= "block";
statistictable1.style.display= "none";

if(cards.length==0){
	alert("There is no data.");
	return false;

}


for(var i=0; i<cards.length; i++){
 add+= cards[i].visitorname+",";
}

var vNameList = add.split(",");

var counts = {};
var sortable = [];

for (var i = 0; i < vNameList.length-1; i++) {
  
  if(counts[vNameList[i]] == undefined){
  	counts[vNameList[i]]=0;

  }
  	counts[vNameList[i]]++;
}
counts =Object.entries(counts).sort((a,b) => b[1]-a[1]);

 for(var i in counts){
	  sortable.push(counts[i]);
	  console.log(i+ '=' + counts[i]);

}

var statisticTable= document.getElementById("statistictable");

if(mybutton_counter <=1){
for (var i=0; i<5; i++ )
{
  for (var j=0; j<i; j++ )
  {
   
  }

  var row = statistictable.insertRow();

     var row = statistictable.insertRow();
     var statisticNumCell = row.insertCell(0);
	var statisticNameCell =row.insertCell(1);
	var statisticTimeNumCell = row.insertCell(2);

  	 statisticNumCell.innerHTML =i+1;;
 	 statisticNameCell.innerHTML= sortable[i][0];
     statisticTimeNumCell.innerHTML =sortable[i][1];
}
}

});





// ========================= popular book statistics fucntion=====================
var mybutton_counter1=0;
var popBook =document.getElementById("popBook");
var bList=[];
var addBook = "";

popBook.addEventListener("click", ()=>{

	if(cards.length==0){
	alert("There is no data.");
	return false;
}

mybutton_counter1++;

statistictable1.style.display= "block";
statistictable.style.display= "none";
 for(var i=0; i<cards.length; i++){
 addBook+= cards[i].booktitle + ",";
}

bList = addBook.split(",");

var countBooks = {};
var sortBook = [];

for (var i = 0; i < bList.length-1; i++) {
  
  if(countBooks[bList[i]] == undefined){
  	countBooks[bList[i]]=0;

  }
  	countBooks[bList[i]]++;
}
countBooks =Object.entries(countBooks).sort((a,b) => b[1]-a[1]);

// var test2="";
 for(var i in countBooks){
	  sortBook.push(countBooks[i]);

}

var statisticTable= document.getElementById("statistictable1");
if(mybutton_counter1<=1){
for (var i=0; i<5; i++ )
{
  for (var j=0; j<i; j++ )
  {
   
  }

  var row = statistictable1.insertRow();

     var row = statistictable1.insertRow();
     var statisticNumCell = row.insertCell(0);
	var statisticNameCell =row.insertCell(1);
	var statisticTimeNumCell = row.insertCell(2);

  	 statisticNumCell.innerHTML =i+1;;
 	 statisticNameCell.innerHTML= sortBook[i][0];
     statisticTimeNumCell.innerHTML =sortBook[i][1];
}
}
});


// function statistic(){
// 	location.reload();
// }