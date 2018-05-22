var create = document.getElementById('formstruct');
var del = document.getElementById('deleteshop');
var downtown = new Shop('Downtown', 8, 43, 4.5);
var capHill = new Shop('Capitol Hill', 4, 37, 2);
var southLU = new Shop('South Lake Union', 9, 23, 6.33);
var wedge = new Shop('Wedgewood', 2, 28, 1.25);
var bal = new Shop('Ballard', 8, 58, 3.75);
var allshops = [];

function Shop(locationz, minCustHr, maxCustHr, avgDonutsCust){
	this.locationz = locationz;
	this.minCustHr = minCustHr;
	this.maxCustHr = maxCustHr;
	this.avgDonutsCust = avgDonutsCust;
	this.hoursOpen = 12;
	this.hourlySold =[];
	this.dayTotal;

}

//generate customers for each location
function generateCustomers(shopObject){
		 var custy = Math.random() * (shopObject.maxCustHr - shopObject.minCustHr + 1) + shopObject.minCustHr;
		 return custy;
};
	//generate donuts bought for each location
function donutsBought (customers, shopObject){
		var donBot =  Math.round(customers * shopObject.avgDonutsCust);
		return donBot;
};
	//calulate both donut sales per hour and per day total
function hourlyTotal (shopObject){
	shopObject.hourlySold = [];
		for (i = 0; i < shopObject.hoursOpen; i++){
			var thisHourCust = generateCustomers(shopObject);
			var thisHourDonutsBought = donutsBought(thisHourCust, shopObject)
			//shopObject.dayTotal += hourSold;
			shopObject.hourlySold.push(thisHourDonutsBought);
		};
		console.log(shopObject.hourlySold);
		shopObject.dayTotal = shopObject.hourlySold.reduce(add, 0);
}

function add(a, b) {
    return a + b;
}


//display data to table
function render(shopObject){
	var row = document.createElement('tr');
	var data = document.createElement('th');
	data.textContent = shopObject.locationz;
	row.appendChild(data);

		for(i=0; i < shopObject.hoursOpen; i++){
			data = document.createElement('td');
			data.textContent = shopObject.hourlySold[i];
			row.appendChild(data);
		}

	data = document.createElement('th');
	data.className = 'total';
	data.textContent = shopObject.dayTotal;
	row.appendChild(data);
	document.getElementById('tbody').appendChild(row);
};

//take input from fields and append in new row to table
var submitNewShop = function(event){

	event.preventDefault();
	if (!event.target.shop.value || !event.target.minCustHr.value || !event.target.maxCustHr.value || !event.target.avgDonutsCust.value) {
		 alert('Fields cannot be empty!');
	}
	else {
		var locale = event.target.shop.value;
		var min = event.target.minCustHr.value;
		var max = event.target.maxCustHr.value;
		var donPerCust = event.target.avgDonutsCust.value;
		var newShop = new Shop(locale, min, max, donPerCust);
		allshops.push(newShop);
		localStorage['shopz'] = JSON.stringify(allshops);
	}
	location.reload();
};

//remove most recent row from table
function deleteNewShop(){
	var elements = document.getElementsByTagName('tr');
	var myEl = elements.length-1;
	var removeEl = document.getElementsByTagName('tr')[myEl];
	var container = removeEl.parentNode;
	container.removeChild(removeEl);
	allshops.pop();
	localStorage['shopz'] = JSON.stringify(allshops);

}

function initialize(){
	if (localStorage.length <= 0){
		allshops = [downtown, capHill, southLU, wedge, bal];
	}
	else{

		allshops = JSON.parse(localStorage['shopz']);
	}

	allshops.forEach(function(place){
		hourlyTotal(place);
		render(place);
	});

	create.addEventListener('submit', submitNewShop);
	del.addEventListener('click', deleteNewShop);

}

var ctx = document.getElementById("mychart").getContext("2d");
var data = [
    {
        value: 300,
        color:"#957F58",
        highlight: "#957F58",
        label: "Tan"
    },
    {
        value: 50,
        color: "#1F2630",
        highlight: "#1F2630",
        label: "Dark Blue"
    },
    {
        value: 100,
        color: "#C8CDD1",
        highlight: "#C8CDD1",
        label: "Light Blue"
    },
    {
        value: 175,
        color: "#493628",
        highlight: "#493628",
        label: "Brown"
    },
    {
    	value: 130,
    	color: 'white',
    	highlight: 'white',
    	label: 'White'
    }
]
var myPieChart = new Chart(ctx).Pie(data);
initialize();
