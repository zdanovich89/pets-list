document.addEventListener ('DOMContentLoaded', function(){

  var form = document.querySelector('form');
  var name = document.querySelector('input[id=name]');
  var owner = document.querySelector('input[id=owner]');
  var date = document.querySelector('input[id=date]');
  var time = document.querySelector('input[id=time]');
  var notes = document.querySelector('textarea[id=notes]');
  var userItems = document.querySelector('.userItems');
  var arrUserValue = [];
  var select = document.querySelector('select');
  var search = document.getElementById('search_bar');
  var searchResults = arrUserValue.slice();

  function UserValue (name, owner, date, time, notes) {
    this.name = name;
    this.owner = owner;
    this.date = date;
    this.time = time;
    this.notes = notes;
  }

  function checkContent (inputData) {
    if (inputData.value) {
      inputData.classList.remove('invalid');
      return true;
    }
    else {
      inputData.classList.add('invalid');
      return false;
    }
  }

  form.onsubmit = function(e) {
    e.preventDefault();
    var checkName = checkContent(name);
    var checkOwner = checkContent(owner);
    var checkDate = checkContent(date);
    var checkTime = checkContent(time);
    var checkNotes = checkContent(notes);
    if (checkName && checkOwner && checkDate && checkTime && checkNotes) {
      var userObj = new UserValue(name.value, owner.value, date.value, time.value, notes.value);
      arrUserValue.push(userObj); 
      searchResults.push(userObj); 
      name.value = '';
      owner.value = '';
      date.value = '';
      time.value = '';
      notes.value = '';
      updateMarkup(arrUserValue);
    }   
  }
  
  function updateMarkup(tempArr) {
    userItems.innerHTML = '';
    for (var i = 0; i < tempArr.length; i++) {
      var tempUserData = createSingleElement(tempArr[i], i);
      userItems.append(tempUserData);
    }
  }  

  function createSingleElement(userObj,index) {

    var divList = document.createElement('div');
    divList.classList.add('list');

    var divImg = document.createElement('div');
    divImg.classList.add('imgDiv');
      
    var img = document.createElement('img');
    var imgSrc = './img/w512h5121380984637delete1.png';
    img.setAttribute('src', imgSrc);      

    var newDivName = document.createElement('div');
    newDivName.textContent = userObj.name;
    newDivName.classList.add('newName');    

    var newDivDate = document.createElement('div');
    newDivDate.textContent = userObj.date;
    newDivDate.classList.add('newDate');

    var newDivTime = document.createElement('div');
    newDivTime.textContent = userObj.time;
    newDivTime.classList.add('newTime');

    var newDivOwner = document.createElement('div');
    newDivOwner.textContent = userObj.owner;
    newDivOwner.classList.add('newOwner');
      
    var newDivNotes = document.createElement('div');
    newDivNotes.textContent = userObj.notes;
    newDivNotes.classList.add('newNotes');   
 
    divImg.onclick = function() {
      arrUserValue.splice(index, 1);
      updateMarkup(arrUserValue);
    }

    divImg.append(img);
    userItems.append(divList);
    divList.append(divImg, newDivName, newDivDate, newDivTime, newDivOwner, newDivNotes);
    return divList;
  }
   
  select.onchange = function() {    
      var currentOption = select[select.selectedIndex].value;    
      function sortObjects(a,b) {
        if(a[currentOption] > b[currentOption]) return 1;
        else return -1;
      }
      searchResults.sort(sortObjects);
    updateMarkup(searchResults);    
  }
 
  function searchOption () {
    var searchText = this.value.toLowerCase();
    searchResults = arrUserValue.filter(function(item) {
      for (var key in item) {
        if (item[key].toLowerCase().indexOf(searchText) != -1) return true;    
      }
    })  
    updateMarkup(searchResults);
  }
  search.addEventListener('keyup', searchOption);

})