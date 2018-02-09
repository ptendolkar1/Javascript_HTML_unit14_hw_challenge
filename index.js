// Questions - Two separate parts? 1 for submit, 2nd for search?
// Append in both places? - in data.js & page if displayed?
// How to show that it appended? The length is so huge!
// 

// querySelector() gets 1st element in html document with class="example" 
// or id="example" below:
//     document.querySelector(".example");   // for class="example" in html file 
//     document.querySelector("#example");   // for id="example" in html file 

// Get references to the submitted field values, and submit button

var state = {
  page: 1,
  currentResult: dataSet
}

var $previousBtn = document.querySelector("#previous");
var $nextBtn = document.querySelector("#next");

// click handler for next button
$previousBtn.addEventListener("click", handlePreviousBtnClick);

function handlePreviousBtnClick(event) {
      event.preventDefault()
      state.page = state.page - 1
      renderTable(state.currentResult)
}

$nextBtn.addEventListener("click", handleNextBtnClick);

function handleNextBtnClick(event) {
      event.preventDefault()
      state.page = state.page + 1
      renderTable(state.currentResult)
}

var $subDate = document.querySelector("#sub_date");
var $subCity = document.querySelector("#sub_city");
var $subState = document.querySelector("#sub_state");
var $subCountry = document.querySelector("#sub_country");
var $subShape = document.querySelector("#sub_shape");
var $subDuration = document.querySelector("#sub_duration");
var $subComments = document.querySelector("#sub_comments");
var $submitBtn = document.querySelector("#submit");

// Get references to the input 'search' field values, and search button
var $tbody = document.querySelector("tbody");
var $dateIn = document.querySelector("#datetime"); //selected by id="datetime"
var $cityIn = document.querySelector("#city");
var $stateIn = document.querySelector("#state");
var $countryIn = document.querySelector("#country");
var $shapeIn = document.querySelector("#shape");
var $searchBtn = document.querySelector("#search");

//console.log("before submitBtn");
// Add an event listener to the searchButton, call handleSearchButtonClick when clicked
$submitBtn.addEventListener("click", handleSubmitClick);
$searchBtn.addEventListener("click", handleSearchClick);

function handleSubmitClick(event) {
    event.preventDefault();
    // For preventDefault', 'stopPropagation', and 'return false' refer to link below. 
    // https://stackoverflow.com/questions/30473581/when-to-use-preventdefault-vs-return-false
    // Create a new movie patron object that will hold the data used to populate the page
    //console.log("in handleSubmitClick")
    var newUFO = {
      datetime: $subDate.value.trim(),
      city: $subCity.value.trim().toLowerCase(),
      state: $subState.value.trim().toLowerCase(),
      country: $subCountry.value.trim().toLowerCase(),
      shape: $subShape.value.trim().toLowerCase(),
      duration: $subDuration.value.trim().toLowerCase(),
      comments: $subComments.value.trim().toLowerCase(),
    };
    console.log("after newUFO")
    // Clear the input fields
    $subDate.value = "";
    $subCity.value = "";
    $subState.value = "";
    $subCountry.value = "";
    $subShape.value = "";
    $subDuration.value = "";
    $subComments.value = "";

    dataSet.unshift(newUFO);   //inserts entered element('newUFO') at the top
    //console.log("after unshift");
    renderTable(dataSet);
    //console.log("In handleSubmitClick(), after renderTable");
  }

// 'filtered' is initialised to all data, but will hold filtered elements. 
filtered = dataSet.slice();    //slice() with no arguments includes everything.
//console.log(filtered);
// renderTable renders the filteredelements to the tbody
// This function is called when the page loads i.e. before the 'click'; 
// see last command at the bottom of this file.

function renderTable(data) {
  console.log("data received in renderTable=", data)
  //before for loop figure out starting and ending indices.
  if (data.length > 0) {
    var pageNum = state.page
    var pageAmount = 10
    var high = pageNum*10
    var low = high - pageAmount
    $tbody.innerHTML = "";
    for (var i = low; i < high; i++) {
      // Get the current element object and its fields
      var element = data[i]; 
      var fields = Object.keys(element); //if only one value instead of key:value, then 'keys' will fetch that one value.
      // Create a new row in the tbody, set the index to be i + startingIndex
      var $row = $tbody.insertRow();
      for (var j = 0; j < fields.length; j++) {
       // For every field in the element object, create a new cell and 
        //set its inner text to be the current value at the current 
        //element's field.
        var field = fields[j];
        var $cell = $row.insertCell();  //empty cell gets created.
        $cell.innerText = element[field];
      }
    }
  }
  else {
    $tbody.innerHTML = "NO SIGHTINGS MATCHED YOUR SERACH. ENTER ANOTHER SEARCH.";
  }
}

function handleSearchClick() {
  // Format the user's search by removing leading and trailing whitespace, 
  //and lowercase the string

  var filters = {       // user input values for 'search'.
      datetime: $dateIn.value.trim(), 
      city: $cityIn.value.toLowerCase().trim(),
      state: $stateIn.value.toLowerCase().trim(),
      country: $countryIn.value.toLowerCase().trim(),
      shape: $shapeIn.value.toLowerCase().trim(),
  }

      $dateIn.value = "";
      $cityIn.value = "";
      $stateIn.value = "";
      $countryIn.value = "";
      $shapeIn.value = "";
      $searchBtn.value = "";

   filtered = dataSet.slice()    //slice() with no arguments includes everything.
   filtersArr = Object.entries(filters)  //filtersArr=[[key1,value1],[key2,value2]],..]
   if (filtersArr[3][1] == "usa") {
      filtersArr[3][1] = "us";
   }
   if (filtersArr[3][1] == "canada") {
    filtersArr[3][1] = "ca";
   }
   if (filtersArr[3][1] == "australia") {
    filtersArr[3][1] = "au";
   }
   if (filtersArr[3][1] == "uk" || filtersArr[3][1] == "england" || filtersArr[3][1] == "united kingdom" || filtersArr[3][1] == "great britain") {
      filtersArr[3][1] = "gb";
   }

   // Applying filters
  for (var i = 0; i < filtersArr.length; i++){
    //console.log("filtersArr=", filtersArr, "filtersArr[i][1]len=", filtersArr[i][1].length);
      if (filtersArr[i][1].length > 0) {
        filtered = filtered.filter(function(element) {
          var vals = Object.values(element); //Object.values() method returns array of the  object's own enumerable property values
          //console.log("i=", i,"vals[i]=", vals[i], " filtersArr[i][1]=", filtersArr[i][1])
          return vals[i] === filtersArr[i][1]
        }) 
      } 
  }
  console.log("i=", i, " filtered after for loop=", filtered)
  state.currentResult = filtered
  state.page = 1
  renderTable(filtered);
}

// Render the table for the first time on page load (click happens later)
renderTable(dataSet);
