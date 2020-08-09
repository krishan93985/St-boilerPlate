function inputSize(){
  $(".aFormGroup").each(function(){
    if($(this).hasClass('noInputResize')){
      return
    } else {
      let inputWidth = $(this).width() - $(this).find("label").outerWidth(true) -20;
      $(this).find("input").outerWidth(inputWidth);
      $(this).find("textarea").outerWidth(inputWidth);
    }
  });
}
function billingCycleText(){
  $(".billingCycle").on('change', function(){
    if($(this).val() !== "Billing Cycle"){
      $(this).parents(".row.contentParent").find(".billingDurationIn").text( "( in " + $(this).val() + " )")
    } else {
      $(this).parents(".row.contentParent").find(".billingDurationIn").text("")
    }
    inputSize();
  });
}


var currentTab = 0; // Current tab is set to be the first tab (0)
function fixStepIndicator(n) {
  // This function removes the "active" class of all steps...
  var i,
    x = document.getElementsByClassName("step");
  for (i = 0; i < x.length; i++) {
    x[i].className = x[i].className.replace(" active", "");
  }
  //... and adds the "active" class to the current step:
  x[n].className += " active";
}
function showTab(n) {
  // This function will display the specified tab of the form ...
  var x = document.getElementsByClassName("tab");
  x[n].style.display = "block";
  let per = ((n/4)*100).toString() + "%";
  inputSize();
  $(".progress").width(per);
  $(".slot").bootstrapMaterialDatePicker({
    date: false,
    format: "hh:mm a",
    shortTime: true
  });
  // ... and fix the Previous/Next buttons:
  if (n == 0) {
    document.getElementById("prevBtn").style.display = "none";
  } else {
    document.getElementById("prevBtn").style.display = "inline";
  }
  if (n == x.length - 1) {
    document.getElementById("nextBtn").innerHTML = "submit";
  } else {
    document.getElementById("nextBtn").innerHTML = "Next";
  }
  // ... and run a function that displays the correct step indicator:
  fixStepIndicator(n);
}

function validateForm() {
  // This function deals with validation of the form fields
  var x,
    y,
    i,
    valid = true;
  x = document.getElementsByClassName("tab");
  y = x[currentTab].getElementsByTagName("input");
  // A loop that checks every input field in the current tab:
  for (i = 0; i < y.length; i++) {
    // If a field is empty...
    if (y[i].value == "") {
      // add an "invalid" class to the field:
      y[i].className += " invalid";
      // and set the current valid status to false:
      valid = false;
    }
  }
  // If the valid status is true, mark the step as finished and valid:
  if (valid) {
    document.getElementsByClassName("step")[currentTab].className += " finish";
  }
  // return valid; // return the valid status
  return true;
}
function nextPrev(n) {
  
  // This function will figure out which tab to display
  var x = document.getElementsByClassName("tab");
  // Exit the function if any field in the current tab is invalid:
  if (n == 1 && !validateForm()) return false;
  // if (n == 1 ) return false;
  // Hide the current tab:
  x[currentTab].style.display = "none";
  // Increase or decrease the current tab by 1:
  currentTab = currentTab + n;
  // if you have reached the end of the form... :
  if (currentTab >= x.length) {
    //...the form gets submitted:
    document.getElementById("regForm").submit();
    return false;
  }
  // Otherwise, display the correct tab:
  showTab(currentTab);
}
$(document).ready(function () {
  showTab(currentTab); // Display the current tab
});


$(document).ready(function(){
  $(".aFormGroup").each(function(){
    if($(this).hasClass('noInputResize')){
      return
    } else {
      let inputWidth = $(this).width() - $(this).find("label").outerWidth(true) -20;
      $(this).find("input").outerWidth(inputWidth);
      $(this).find("textarea").outerWidth(inputWidth);
    }
  });
});






// timepicker js


$(document).ready(function() {
  function check(id, isOpen){
    if(isOpen){
      $("#"+id).prop("checked", true);
    } else {
      $("#"+id).prop("checked", false);
    }
  }
  function setTimePicker(id, timeObj){
    $(".timePicker").val("");
    setTimeout(function(){

      $("#"+id).bootstrapMaterialDatePicker('setDate', moment(timeObj).format('hh:mm a'));
    }, 1);
  }
  function getDate(id) {
    let timeObj = $("#" + id).val()
    let dateObj = moment(timeObj, "hh:mm a").toDate();
    // console.log(dateObj)
    return dateObj
  }
  function getSpace(){
    return {
      title: $("#spaceTitle").val(),
      address: {
        flatDetails:$("#flatDetails").val(),
        floorNo:$("#floorNo").val(),
        buildingDetails:$("#buildingDetails").val(),
        streetDetails:$("#streetDetails").val(),
        cityName:$("#cityName").val(),
        pinCode:$("#pinCode").val(),
        landmark:$("#landmark").val(),
        stateName:$("#stateName").val(),
        country:$("#country").val(),
        gpsLocation:$("#gpsLocation").val()
      },
      priceStructure:{
        hourly: $("#price").val()
      },
      description: $("#desc").val(),
      openHours: {
        monday: {
          isOpen: $("#monday").prop("checked"),
          startTime: getDate("monStart"),
          endTime: getDate("monEnd")
        },
        tuesday: {
          isOpen: $("#tuesday").prop("checked"),
          startTime: getDate("tueStart"),
          endTime: getDate("tueEnd")
        },
        wednesday: {
          isOpen: $("#wednesday").prop("checked"),
          startTime: getDate("wedStart"),
          endTime: getDate("wedEnd")
        },
        thursday: {
          isOpen: $("#thursday").prop("checked"),
          startTime: getDate("thuStart"),
          endTime: getDate("thuEnd")
        },
        friday: {
          isOpen: $("#friday").prop("checked"),
          startTime: getDate("friStart"),
          endTime: getDate("friEnd")
        },
        saturday: {
          isOpen: $("#saturday").prop("checked"),
          startTime: getDate("satStart"),
          endTime: getDate("satEnd")
        },
        sunday: {
          isOpen: $("#sunday").prop("checked"),
          startTime: getDate("sunStart"),
          endTime: getDate("sunEnd")
        }
      }
    }
  }
  function setValues(data){
    $("#spaceTitle").val(data.title);
    // $("#address").val(data.address.flatDetails+" "+data.address.streetDetails+", "+data.address.cityName+", "+data.address.stateName+" - "+data.address.pinCode);
    $("#desc").val(data.description);
    $("#flatDetails").val(data.address.flatDetails);
    $("#floorNo").val(data.address.floorNo);
    $("#buildingDetails").val(data.address.buildingDetails);
    $("#streetDetails").val(data.address.streetDetails);
    $("#cityName").val(data.address.cityName);
    $("#pinCode").val(data.address.pinCode);
    $("#landmark").val(data.address.landmark);
    $("#stateName").val(data.address.stateName);
    $("#country").val(data.address.country);
    $("#gpsLocation").val(data.address.gpsLocation);
    $("#price").val(data.priceStructure.hourly);
    
    check("monday", data.openHours.monday.isOpen);
    setTimePicker("monStart", data.openHours.monday.startTime);
    setTimePicker("monEnd", data.openHours.monday.endTime);

    check("tuesday", data.openHours.tuesday.isOpen);
    setTimePicker("tueStart", data.openHours.tuesday.startTime);
    setTimePicker("tueEnd", data.openHours.tuesday.endTime);

    check("wednesday", data.openHours.wednesday.isOpen);
    setTimePicker("wedStart", data.openHours.wednesday.startTime);
    setTimePicker("wedEnd", data.openHours.wednesday.endTime);

    check("thursday", data.openHours.thursday.isOpen);
    setTimePicker("thuStart", data.openHours.thursday.startTime);
    setTimePicker("thuEnd", data.openHours.thursday.endTime);

    check("friday", data.openHours.friday.isOpen);
    setTimePicker("friStart", data.openHours.friday.startTime);
    setTimePicker("friEnd", data.openHours.friday.endTime);

    check("saturday", data.openHours.saturday.isOpen);
    setTimePicker("satStart", data.openHours.saturday.startTime);
    setTimePicker("satEnd", data.openHours.saturday.endTime);

    check("sunday", data.openHours.sunday.isOpen);
    setTimePicker("sunStart", data.openHours.sunday.startTime);
    setTimePicker("sunEnd", data.openHours.sunday.endTime);
  }

  $(".timePicker").bootstrapMaterialDatePicker({
    date: false,
    format: "hh:mm a",
    shortTime: true
  });
  const space = $.ajax('/dashboard/my-space/map/edit/data', {
    dataType:'json',
    success: function(data, status, xhr){
      setValues(data);
      return data
    }
  });

  // form handler
  // form save handler
  $("#editMapForm").submit(function(event){
    const data = {
      name: $("#name").val(),
      brandtitle: $("#brandtitle").val(),
      brandtitle: "brandtitle",
      brand:{
        brandtitle:''
      }
    }
    event.preventDefault();
    $.ajax({
      type: 'POST',
      url: "/dashboard/my-space/map/edit",
      data: JSON.stringify(data),
      contentType: 'application/json; charset=utf-8',
      dataType: 'json',
      success: function(data) {
        console.log("submitted successfully");

      }
    });
  });
  // form reset handler
  $("#resetForm").on('click', function(){
    setValues(space.responseJSON);
  });
  $.ajax({
    type: 'POST',
    url: "",
    data: JSON.stringify(filterData),
    contentType: 'application/json; charset=utf-8',
    dataType: 'json',
    success: function (data) {
        console.log(data);
        if(data.searchResults.length === 0){
            $("#initialRes").css('display', 'none');
            $("#filterRes").html(
            ).fadeIn('fast', function(){
                // $("filterRes").css('display', 'flex');
            });

        }else{
            console.log(data);
            $("#initialRes").css('display', 'none');
            let source = document.getElementById('result-template').innerHTML;
            let template = Handlebars.compile(source);
            let html = template(data);
        }
    }
});
});



$(document).ready(function(){
  $("#sameaddress").click(function(){
    if($(this).prop('checked')){
      $("#flatDetails").val($("#brandflatDetails").val());
      $("#floorDetails").val($("#brandfloorDetails").val());
      $("#buildingDetails").val($("#brandbuildingDetails").val());
      $("#streetDetails").val($("#brandstreetDetails").val());
      $("#cityName").val($("#brandcityName").val());
      $("#pincode").val($("#brandpincode").val());
      $("#landmark").val($("#brandlandmark").val());
      $("#stateName").val($("#brandstateName").val());
      $("#country").val($("#brandcountry").val());
      $("#gpsLocation").val($("#brandgpsLocation").val());
    } else {
      $("#flatDetails").val("");
      $("#floorDetails").val("");
      $("#buildingDetails").val("");
      $("#streetDetails").val("");
      $("#cityName").val("");
      $("#pincode").val("");
      $("#landmark").val("");
      $("#stateName").val("");
      $("#country").val("");
      $("#gpsLocation").val("");
    }
  });

  $("#spacename").click(function(){
    if($(this).prop('checked')) {
      $("#spaceName").val($("#spaceTitle").val());
    } else {
      $("#spaceName").val("");
    }
  });

  $("#twentyfourseven").click(function(){
    if($(this).prop('checked')) {
      $(".openHoursDay").each(function(){
        $(this).prop('checked', true);
      });
    } else {
      $(".openHoursDay").each(function() {
        $(this).prop('checked', false);
      });
    }
  });
});



//payment js
$(document).ready(function(){
  $('#spaceType').on('change', function() {
    var space = this.value;
    $(".spaceTag").each(function(){
      $(this).hide();
    });
    $("."+space+"Check").each(function(){
      $(this).show();
    });
    $(".packageManager").each(function(){
      $(this).hide();
    });
    const currType = "#" + $(this).val() + "PackageManager";
    $(currType).show();
    
  });
  $('.coworkingSpaceType').on('change', function() {
    $('coworkingSpace').hide();
    if($(this).val() === "1"){
      $(this).parents("div.coworkingSelectParent").find(".desk").show();
      $(this).parents("div.coworkingSelectParent").find(".nodesk").hide();
    } else {
      $(this).parents("div.coworkingSelectParent").find(".desk").hide();
      $(this).parents("div.coworkingSelectParent").find(".nodesk").show();
    }
  });

  //add button click event
  $(".addBtn").click(function(){
    // alert(space);
    if($("#spaceType").val() === "coworking"){
      $('<div class="col-12 aFormGroup noInputResize package deleteContent">'+
      '        <div class="container-fluid">'+
      '            <div class="row contentParent coworkingSelectParent">'+
      '                <div class="col-12 col-md-6">'+
      '                    <label for="packageTitle">Title:</label>'+
      '                    <input type="text" id="packageTitle" class="aForm" placeholder="Title..."'+
      '                        oninput="this.className = \'aForm\'">'+
      '                </div>'+
      '                <div class="col-12">'+
      '                    <label for="packageDescription">Description:</label>'+
      '                    <textarea type="text" id="packageDescription" class="aForm" placeholder="Description..."'+
      '                        oninput="this.className = \'aForm\'"></textarea>'+
      '                </div>'+
      '                <div class="col-12">'+
      '                    <label for="coworkingSpaceType">Space Type:</label>'+
      '                    <select class="coworkingSpaceType" name="coworkingSpaceType" id="coworkingSpaceType">'+
      '                        <option value="0">Space Type</option>'+
      '                        <option value="1">Desk</option>'+
      '                        <option value="2">Meeting Room</option>'+
      '                        <option value="3">Event Space</option>'+
      '                        <option value="4">Cabin</option>'+
      '                    </select>'+
      '                </div>'+
      '                <div class="col-12">'+
      '                    <label for="seatCapacity">Capacity:</label>'+
      '                    <input type="number" id="seatCapacity" class="aForm" placeholder="Seat Capacity..."'+
      '                        oninput="this.className = \'aForm\'">'+
      '                </div>'+
      '                <div class="col-12 col-md-6">'+
      '                    <label for="billingCycle">Billing Cycle:</label>'+
      '                    <select class="billingCycle" name="billingCycle" id="billingCycle">'+
      '                        <option value="Billing Cycle">Billing Cycle</option>'+
      '                        <option value="days">Day</option>'+
      '                        <option value="weeks">Week</option>'+
      '                        <option value="months">Month</option>'+
      '                        <option value="years">Year</option>'+
      '                    </select>'+
      '                </div>'+
      '                <div class="col-12 col-md-6">'+
      '                    <label for="billingDuration">Billing Duration<span class="billingDurationIn"></span>:</label>'+
      '                    <input style="width: 5rem;" type="number" id="billingDuration" value="1" class="aForm" placeholder="Billing Duration..."'+
      '                        oninput="this.className = \'aForm\'">'+
      '                </div>'+
      '                <div class="col-12 nodesk coworkingSpace">'+
      '                    <label for="price">Price (in ₹):</label>'+
      '                    <input type="number" id="price" class="aForm" placeholder="Price..."'+
      '                        oninput="this.className = \'aForm\'">'+
      '                </div>'+
      '                <div class="col-12 desk coworkingSpace">'+
      '                    <label for="pricePerSeat">Price per Seat (in ₹):</label>'+
      '                    <input type="number" id="pricePerSeat" class="aForm" placeholder="Price per Seat..."'+
      '                        oninput="this.className = \'aForm\'">'+
      '                </div>'+
      '                <div class="col-12 deleteBtn"><i class="fas fa-trash-alt"></i></div>'+
      '            </div>'+
      '        </div>'+
      '    </div>').insertBefore(".addBtnDiv.coworkingBtn");
      billingCycleText();
    } else if($("#spaceType").val() === ""){
      
      $(this).parent().parent().find(".danceDayParent").append('<div class="col-12 aFormGroup deleteContent">'+
      '                    <div class="container-fluid">'+
      '                        <div class="row">'+
      '                            <div class="col-12">'+
      '                                Slot: <input id="start" value="" class="slot" type="text"> to <input id="end"'+
      '                                    value="" class="slot" type="text">'+
      '                            </div>'+
      '                            <div class="col-12">'+
      '                                <label for="classLink">Class Link:</label>'+
      '                                <input type="text" id="classLink" class="aForm" placeholder="Link..."'+
      '                                    oninput="this.className = \'aForm\'">'+
      '                            </div>'+
      '<div class="col-12"><label class="textareaLabel" for="description">Space Description:</label>'+
      '<textarea id="description" class="aForm" placeholder="Description..."'+
      '    oninput="this.className = \'aForm\'"></textarea></div>'+
      '                             <div class="col-12">'+
      '                                 <label for="price">Price (in ₹):</label>'+
      '                                 <input type="number" id="price" class="aForm" placeholder="Price..." oninput="this.className = \'aForm\'">'+
      '                              </div>'+
      '                              <div class="col-12 deleteBtn"><i class="fas fa-trash-alt"></i></div>'+
      '                        </div>'+
      '                    </div>'+
      '                </div>');
      $(".slot").bootstrapMaterialDatePicker({
        date: false,
        format: "hh:mm a",
        shortTime: true
      });
    } else if($("#spaceType").val() === "pet"){
      $('<div class="col-12 aFormGroup dayParent noInputResize deleteContent">'+
      '        <div class="container-fluid">'+
      '            <div class="row petDayParent contentParent">'+
      '                <div class="col-12 col-md-6">'+
      '                    <label for="petType">Pet Type:</label>'+
      '                    <input type="text" id="petType" class="aForm" placeholder="Pet Type..."'+
      '                        oninput="this.className = \'aForm\'">'+
      '                </div>'+
      '                <div class="col-12 col-md-6">'+
      '                    <label for="petCount">Number of Pets:</label>'+
      '                    <input type="number" id="petCount" class="aForm" placeholder="Number of Pets..."'+
      '                        oninput="this.className = \'aForm\'">'+
      '                </div>'+
      '                <div class="col-12 col-md-6">'+
      '                    <label for="petBillingCycle">Billing Cycle:</label>'+
      '                    <select class="billingCycle" name="petBillingCycle" id="petBillingCycle">'+
      '                        <option value="Billing Cycle">Billing Cycle</option>'+
      '                        <option value="days">Day</option>'+
      '                        <option value="weeks">Week</option>'+
      '                        <option value="months">Month</option>'+
      '                        <option value="years">Year</option>'+
      '                    </select>'+
      '                </div>'+
      '                <div class="col-12 col-md-6">'+
      '                    <label for="billingDuration">Billing Duration<span class="billingDurationIn"></span>:</label>'+
      '                    <input style="width:5rem;" type="number" id="billingDuration" value="1" class="aForm" placeholder="Billing Duration..."'+
      '                        oninput="this.className = \'aForm\'">'+
      '                </div>'+
      '                <div class="col-12">'+
      '                    <label for="price">Price (in ₹):</label>'+
      '                    <input type="number" id="price" class="aForm" placeholder="Price..."'+
      '                        oninput="this.className = \'aForm\'">'+
      '                </div>'+
      '                 <div class="col-12 deleteBtn"><i class="fas fa-trash-alt"></i></div>'+
      '            </div>'+
      '        </div>'+
      '    </div>').insertBefore(".addBtnDiv.petBtn");
      billingCycleText();
    }
    $(".deleteBtn").click(function(){
      $(this).parents('div.deleteContent').remove();
    });
    $('.coworkingSpaceType').on('change', function() {
      $('coworkingSpace').hide();
      if($(this).val() === "1"){
        $(this).parents("div.coworkingSelectParent").find(".desk").show();
        $(this).parents("div.coworkingSelectParent").find(".nodesk").hide();
      } else {
        $(this).parents("div.coworkingSelectParent").find(".desk").hide();
        $(this).parents("div.coworkingSelectParent").find(".nodesk").show();
      }
    });
  });

  $(".deleteBtn").click(function(){
    $(this).parents('div.deleteContent').remove();
  });
});


$(document).ready(function(){
  window.onresize = inputSize();
  billingCycleText();
    
});