


// object -to- formdata function:
const isUndefined = (value) => value === undefined;

const isNull = (value) => value === null;

const isBoolean = (value) => typeof value === 'boolean';

const isObject = (value) => value === Object(value);

const isArray = (value) => Array.isArray(value);

const isDate = (value) => value instanceof Date;

const isBlob = (value) =>
  value &&
  typeof value.size === 'number' &&
  typeof value.type === 'string' &&
  typeof value.slice === 'function';

const isFile = (value) =>
  isBlob(value) &&
  typeof value.name === 'string' &&
  (typeof value.lastModifiedDate === 'object' ||
    typeof value.lastModified === 'number');

const serialize = (obj, cfg, fd, pre) => {
  cfg = cfg || {};

  cfg.indices = isUndefined(cfg.indices) ? false : cfg.indices;

  cfg.nullsAsUndefineds = isUndefined(cfg.nullsAsUndefineds) ?
    false :
    cfg.nullsAsUndefineds;

  cfg.booleansAsIntegers = isUndefined(cfg.booleansAsIntegers) ?
    false :
    cfg.booleansAsIntegers;

  fd = fd || new FormData();

  if (isUndefined(obj)) {
    return fd;
  } else if (isNull(obj)) {
    if (!cfg.nullsAsUndefineds) {
      fd.append(pre, '');
    }
  } else if (isBoolean(obj)) {
    if (cfg.booleansAsIntegers) {
      fd.append(pre, obj ? 1 : 0);
    } else {
      fd.append(pre, obj);
    }
  } else if (isArray(obj)) {
    if (obj.length) {
      obj.forEach((value, index) => {
        const key = pre + '[' + (cfg.indices ? index : '') + ']';

        serialize(value, cfg, fd, key);
      });
    }
  } else if (isDate(obj)) {
    fd.append(pre, obj.toISOString());
  } else if (isObject(obj) && !isFile(obj) && !isBlob(obj)) {
    Object.keys(obj).forEach((prop) => {
      const value = obj[prop];

      if (isArray(value)) {
        while (prop.length > 2 && prop.lastIndexOf('[]') === prop.length - 2) {
          prop = prop.substring(0, prop.length - 2);
        }
      }

      const key = pre ? pre + '[' + prop + ']' : prop;

      serialize(value, cfg, fd, key);
    });
  } else {
    fd.append(pre, obj);
  }

  return fd;
};

//end of function





function getDate(ele) {
  let timeObj = $(ele).val()
  let dateObj = moment(timeObj, "hh:mm a").toDate();
  // console.log(dateObj)
  if (dateObj == "Invalid Date") {
    return 0;
  }
  return dateObj
}

function checkValue(ele) {
  if ($(ele).prop("checked") == true) {
    return 1;
  } else {
    return 0;
  }
}

function imageHandler(form_data) {
  form_data.append("mainImage", $('#mainImage')[0].files[0])
  form_data.append("brandLogo", $('#brandLogo')[0].files[0])
  let ins = $('#otherImages')[0].files.length;
  for (var xl = 0; xl < ins; xl++) {
    form_data.append("otherImages", $('#otherImages')[0].files[xl])
  }
  if ($("#spaceType").val() === "coworking") {
    $("#coworkingPackageManager").find(".contentParent").each(function () {
      let pkgImgEle = $(this).find("#unitImages");
      let imgName = "pkg-" + $(this).index().toString();
      // console.log(imgName);
      let ins = $(pkgImgEle)[0].files.length;
      for (var xl = 0; xl < ins; xl++) {
        form_data.append(imgName, $(pkgImgEle)[0].files[xl])
      }
    });
  }
}

function getPackages() {
  const domain = $("#spaceType").val();
  let packageList = []
  if (domain === "coworking") {
    $("#coworkingPackageManager").find(".contentParent").each(function () {
      let packageObj = {
        pkgIndex: $(this).index(),
        spaceType: $(this).find("#coworkingSpaceType").children("option:selected").text(),
        title: $(this).find("#packageTitle").val(),
        description: $(this).find("#packageDescription").val(),
        seatCapacity: $(this).find("#seatCapacity").val(),
        billingInfo: {
          billingCycle: $(this).find("#billingCycle").val(),
          billingDuration: $(this).find("#billingDuration").val(),
        },
        price: $(this).find("#price").val(),
      }
      packageList.push(packageObj);
    });
    packageList = {
      coworking: packageList
    }
  } else if (domain === "pet") {
    $("#petPackageManager").find(".deleteContent").each(function () {
      let packageObj = {
        petType: $(this).find("#petType").val(),
        petCount: $(this).find("#petCount").val(),
        petBillingCycle: $(this).find("#petBillingCycle").children("option:selected").text(),
        billingDuration: $(this).find("#billingDuration").val(),
        price: $(this).find("#price").val(),
      }
      packageList.push(packageObj);
    });
    packageList = {
      pet: packageList
    }
  } else if (domain === "dance") {
    $("#dancePackageManager").find(".deleteContent").each(function () {
      let packageObj = {
        slot: {
          start: $(this).find("#start").val(),
          end: $(this).find("#end").val(),
        },
        day: $(this).parents(".dayParent").attr("id"),
        danceStyle: $(this).find("#danceStyle").val(),
        description: $(this).find('#description').val(),
        classLink: $(this).find("#classLink").val(),
        price: $(this).find("#price").val(),
      }
      packageList.push(packageObj);
    });
    packageList = {
      dance: packageList
    }
  } else if (domain === "gym") {
    $("#gymPackageManager").find(".deleteContent").each(function () {
      let packageObj = {
        slot: {
          start: $(this).find("#start").val(),
          end: $(this).find("#end").val(),
        },
        day: $(this).parents(".dayParent").attr("id"),
        danceStyle: $(this).find("#fitnessStyle").val(),
        description: $(this).find('#description').val(),
        classLink: $(this).find("#classLink").val(),
        price: $(this).find("#price").val(),
      }
      packageList.push(packageObj);
    });
    packageList = {
      gym: packageList
    }
  }
  console.log(packageList);
  return packageList;
}



function getAmenities() {
  let amenitiesList = [];
  let domain = $("#spaceType").val();
  $(".amenitiesContainer").find("." + domain + "Check").each(function () {
    if ($(this).find("input").is(":checked")) {
      amenitiesList.push($(this).find("input").val());
    }
  });
  if (domain == "coworking") {
    amenitiesList = {
      coworking: amenitiesList
    }
  } else if (domain === "dance") {
    amenitiesList = {
      dance: amenitiesList
    }
  } else if (domain === "pet") {
    amenitiesList = {
      pet: amenitiesList
    }
  } else if (domain === "gym") {
    amenitiesList = {
      gym: amenitiesList
    }
  }
  // console.log(amenitiesList);

  return amenitiesList;
}

function getCategories() {
  let categoriesList = [];
  let domain = $("#spaceType").val();
  $(".categoriesContainer").find("." + domain + "Check").each(function () {
    if ($(this).find("input").is(":checked")) {
      categoriesList.push($(this).find("input").val());
    }
  });
  if (domain == "coworking") {
    categoriesList = {
      coworking: categoriesList
    }
  } else if (domain === "dance") {
    categoriesList = {
      dance: categoriesList
    }
  } else if (domain === "pet") {
    categoriesList = {
      pet: categoriesList
    }
  } else if (domain === "gym") {
    categoriesList = {
      gym: categoriesList
    }
  }
  // console.log(categoriesList);
  return categoriesList;
}


function inputSize() {
  $(".aFormGroup").each(function () {
    if ($(this).hasClass('noInputResize')) {
      return
    } else {
      let inputWidth = $(this).width() - $(this).find("label").outerWidth(true) - 20;
      $(this).find("input").outerWidth(inputWidth);
      $(this).find("textarea").outerWidth(inputWidth);
    }
  });
}

function billingCycleText() {
  $(".billingCycle").on('change', function () {
    if ($(this).val() !== "Billing Cycle") {
      $(this).parents(".row.contentParent").find(".billingDurationIn").text("( in " + $(this).val() + " )")
    } else {
      $(this).parents(".row.contentParent").find(".billingDurationIn").text("")
    }
    inputSize();
  });
}

function automationFormSubmitHandler() {
  const data = {
    brand: {
      brandTitle: $("#brandTitle").val(),
      brandName: $("#brandName").val(),
      brandLogo: $("#brandLogo").val(),
      phoneNo: $("#phoneNo").val(),
      officePhoneNo: $("#officePhoneNo").val(),
      brandEmail: $("#emailAddress").val(),
      brandDescription: $("#brandDescription").val(),
      brandSpaceCount: $("#spaceCount").val(),
      brandAddress: {
        flatDetails: $("#brandflatDetails").val(),
        floorDetails: $("#brandfloorDetails").val(),
        buildingDetails: $("#brandbuildingDetails").val(),
        streetDetails: $("#brandstreetDetails").val(),
        cityName: $("#brandcityName").val(),
        pinCode: $("#brandpincode").val(),
        landmark: $("#brandLandmark").val(),
        stateName: $("#brandstateName").val(),
        country: $("#brandcountry").val(),
        gpsLocation: $("#brandgpsLocation").val(),
      },
    },
    advDeposit: $("#advDeposit").val(),
    title: $("#spaceTitle").val(),
    spaceName: $("#spaceName").val(),
    description: $("#description").val(),
    domain: $("#spaceType").val().charAt(0).toUpperCase() + $("#spaceType").val().slice(1),

    rules: $("#rules").val(),

    openHours: {
      isTwentyFourSeven: $("#twentyfourseven").val(),
      monday: {
        isOpen: checkValue($("#monday")),
        start: getDate($("#monStart")),
        end: getDate($("#monEnd")),
      },
      tuesday: {
        isOpen: checkValue($("#tuesday")),
        start: getDate($("#tueStart")),
        end: getDate($("#tueEnd")),
      },
      wednesday: {
        isOpen: checkValue($("#wednesday")),
        start: getDate($("#wedStart")),
        end: getDate($("#wedEnd")),
      },
      thursday: {
        isOpen: checkValue($("#thursday")),
        start: getDate($("#thuStart")),
        end: getDate($("#thuEnd")),
      },
      friday: {
        isOpen: checkValue($("#friday")),
        start: getDate($("#friStart")),
        end: getDate($("#friEnd")),
      },
      saturday: {
        isOpen: checkValue($("#saturday")),
        start: getDate($("#satStart")),
        end: getDate($("#satEnd")),
      },
      sunday: {
        isOpen: checkValue($("#sunday")),
        start: getDate($("#sunStart")),
        end: getDate($("#sunEnd")),
      }
    },
    address: {
      flatDetails: $("#flatDetails").val(),
      floorDetails: $("#floorDetails").val(),
      buildingDetails: $("#buildingDetails").val(),
      streetDetails: $("#streetDetails").val(),
      cityName: $("#cityName").val(),
      pinCode: $("#pincode").val(),
      landmark: $("#Landmark").val(),
      stateName: $("#stateName").val(),
      country: $("#country").val(),
      gpsLocation: $("#gpsLocation").val(),
    },
    amenities: getAmenities(),
    categories: getCategories(),
    priceStructure: getPackages(),
    policies: $("#policies").val(),
  }

  // for (var key in data) {
  //   form_data.append(key, (JSON.stringify(data[key])));
  // }





  const options = {

    indices: true,

    nullsAsUndefineds: false,

    booleansAsIntegers: false,
  };

  const formData = serialize(
    data,
    options, // optional
  );

  console.log(formData);
  // for (var pair of form_data.entries()) {
  //   console.log(pair[0] + ', ' + pair[1]);
  // }
  imageHandler(formData);


  $.ajax({
    type: 'POST',
    url: "/user/space/",
    data: formData,
    processData: false,
    contentType: false,
    success: function (data) {
      console.log("submitted successfully");
    }
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
  let per = ((n / 4) * 100).toString() + "%";
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
    document.getElementById("nextBtn").innerHTML = "<span id=\"automationFormSubmit\">Submit<span>";
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
  y = x[currentTab];
  // y = x[currentTab].getElementsByTagName("input");
  // // A loop that checks every input field in the current tab:
  // for (i = 0; i < y.length; i++) {
  //   // If a field is empty...
  //   if (y[i].value == "") {
  //     // add an "invalid" class to the field:
  //     y[i].className += " invalid";
  //     // and set the current valid status to false:
  //     valid = false;
  //   }
  // }
  $(y).find("input.required").each(function(){
    if($(this).val() === "" || $(this).val() === "null"){
      valid = false;
      $(this).addClass("invalid");
    }
  });
  $(y).find("textarea.required").each(function(){
    if($(this).val() === "" || $(this).val() === "null"){
      valid = false;
      $(this).addClass("invalid");
    }
  });
  $(y).find("select.required").each(function(){
    if($(this).val() === "null"){
      valid = false;
      $(this).addClass("invalid");
    }
  });

  // If the valid status is true, mark the step as finished and valid:
  if (valid) {
    document.getElementsByClassName("step")[currentTab].className += " finish";
  }
  return valid; // return the valid status
  // return true;
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
    // document.getElementById("regForm").submit();
    automationFormSubmitHandler();
    return false;
  }
  // Otherwise, display the correct tab:
  showTab(currentTab);
}
$(document).ready(function () {
  showTab(currentTab); // Display the current tab
});


$(document).ready(function () {
  $(".aFormGroup").each(function () {
    if ($(this).hasClass('noInputResize')) {
      return
    } else {
      let inputWidth = $(this).width() - $(this).find("label").outerWidth(true) - 20;
      $(this).find("input").outerWidth(inputWidth);
      $(this).find("textarea").outerWidth(inputWidth);
    }
  });
});






// timepicker js


$(document).ready(function () {

  $(".timePicker").bootstrapMaterialDatePicker({
    date: false,
    format: "hh:mm a",
    shortTime: true
  });

});



$(document).ready(function () {
  $("#sameaddress").click(function () {
    if ($(this).prop('checked')) {
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

  $("#spacename").click(function () {
    if ($(this).prop('checked')) {
      $("#spaceName").val($("#spaceTitle").val());
    } else {
      $("#spaceName").val("");
    }
  });

  $("#twentyfourseven").click(function () {
    if ($(this).prop('checked')) {
      $(".openHoursDay").each(function () {
        $(this).prop('checked', true);
      });
    } else {
      $(".openHoursDay").each(function () {
        $(this).prop('checked', false);
      });
    }
  });
});



//payment js
$(document).ready(function () {
  $('#spaceType').on('change', function () {
    var space = this.value;
    $(".spaceTag").each(function () {
      $(this).hide();
    });
    $("." + space + "Check").each(function () {
      $(this).show();
    });
    $(".packageManager").each(function () {
      $(this).hide();
    });
    const currType = "#" + $(this).val() + "PackageManager";
    $(currType).show();

  });
  // $('.coworkingSpaceType').on('change', function () {
  //   $('coworkingSpace').hide();
  //   if ($(this).val() === "1") {
  //     $(this).parents("div.coworkingSelectParent").find(".desk").show();
  //     $(this).parents("div.coworkingSelectParent").find(".nodesk").hide();
  //   } else {
  //     $(this).parents("div.coworkingSelectParent").find(".desk").hide();
  //     $(this).parents("div.coworkingSelectParent").find(".nodesk").show();
  //   }
  // });

  //add button click event
  $(".addBtn").click(function () {
    // alert(space);
    if ($("#spaceType").val() === "coworking") {
      $("#coworkingContainer").append(
        '            <div class="row contentParent coworkingSelectParent">' +
        // '<div class="col-12 aFormGroup">' +
        // '                    <label for="advDeposit">Advance Deposit:</label>' +
        // '                    <input id="advDeposit" type="number" class="aForm"' +
        // '                        oninput="this.className = \'aForm\'">' +
        // '                </div>' +
        '                <div class="col-12 col-md-6">' +
        '                    <label for="packageTitle">Title:</label>' +
        '                    <input type="text" id="packageTitle" class="aForm" placeholder="Title..."' +
        '                        oninput="this.className = \'aForm\'">' +
        '                </div>' +
        '                <div class="col-12">' +
        '                    <label for="packageDescription">Description:</label>' +
        '                    <textarea type="text" id="packageDescription" class="aForm" placeholder="Description..."' +
        '                        oninput="this.className = \'aForm\'"></textarea>' +
        '                </div>' +
        '<div class="col-12  aFormGroup">' +
        '                    <label for="unitImages">Images:</label>' +
        '                    <input name="unitImages" multiple type="file" id="unitImages">' +
        '                </div>' +
        '                <div class="col-12">' +
        '                    <label for="coworkingSpaceType">Space Type:</label>' +
        '                    <select class="coworkingSpaceType" name="coworkingSpaceType" id="coworkingSpaceType">' +
        '                        <option value="0">Space Type</option>' +
        '                        <option value="1">Desk</option>' +
        '                        <option value="2">Meeting Room</option>' +
        '                        <option value="3">Event Space</option>' +
        '                        <option value="4">Cabin</option>' +
        '                    </select>' +
        '                </div>' +
        '                <div class="col-12">' +
        '                    <label for="seatCapacity">Capacity:</label>' +
        '                    <input type="number" id="seatCapacity" class="aForm" placeholder="Seat Capacity..."' +
        '                        oninput="this.className = \'aForm\'">' +
        '                </div>' +
        '                <div class="col-12 col-md-6">' +
        '                    <label for="billingCycle">Billing Cycle:</label>' +
        '                    <select class="billingCycle" name="billingCycle" id="billingCycle">' +
        '                        <option value="Billing Cycle">Billing Cycle</option>' +
        '                        <option value="days">Day</option>' +
        '                        <option value="weeks">Week</option>' +
        '                        <option value="months">Month</option>' +
        '                        <option value="years">Year</option>' +
        '                    </select>' +
        '                </div>' +
        '                <div class="col-12 col-md-6">' +
        '                    <label for="billingDuration">Billing Duration<span class="billingDurationIn"></span>:</label>' +
        '                    <input style="width: 5rem;" type="number" id="billingDuration" value="1" class="aForm" placeholder="Billing Duration..."' +
        '                        oninput="this.className = \'aForm\'">' +
        '                </div>' +
        '                <div class="col-12 nodesk coworkingSpace">' +
        '                    <label for="price">Price (in ₹):</label>' +
        '                    <input type="number" id="price" class="aForm" placeholder="Price..."' +
        '                        oninput="this.className = \'aForm\'">' +
        '                </div>' +
        '                <div class="col-12 desk coworkingSpace">' +
        '                    <label for="pricePerSeat">Price per Seat (in ₹):</label>' +
        '                    <input type="number" id="pricePerSeat" class="aForm" placeholder="Price per Seat..."' +
        '                        oninput="this.className = \'aForm\'">' +
        '                </div>' +
        '                <div class="col-12 deleteBtn"><i class="fas fa-trash-alt"></i></div>' +
        '            </div>');

      billingCycleText();
    } else if ($("#spaceType").val() === "dance") {

      $(this).parent().parent().find(".danceDayParent").append('<div class="col-12 aFormGroup deleteContent">' +
        '                    <div class="container-fluid">' +
        '                        <div class="row">' +
        '                            <div class="col-12">' +
        '                                Slot: <input id="start" value="" class="slot" type="text"> to <input id="end"' +
        '                                    value="" class="slot" type="text">' +
        '                            </div>' +
        '<div class="col-12">' +
        '                    <label for="danceStyle">Dance Type:</label>' +
        '                    <select class="danceStyle" name="danceStyle" id="danceStyle">' +
        '                        <option value="0">Dance Style</option>' +
        '                        <option value="Ballet">Ballet</option>' +
        '                        <option value="Kathak">Kathak</option>' +
        '                        <option value="Break Dance">Break Dance</option>   ' +
        '                        <option value="Lion Dance">Lion Dance</option>   ' +
        '                        <option value="Tap Dance">Tap Dance</option>   ' +
        '                        <option value="Salsa">Salsa</option>   ' +
        '                        <option value="Belly Dance">Belly Dance</option>   ' +
        '                    </select>' +
        '                </div>' +
        '                            <div class="col-12">' +
        '                                <label for="classLink">Class Link:</label>' +
        '                                <input type="text" id="classLink" class="aForm" placeholder="Link..."' +
        '                                    oninput="this.className = \'aForm\'">' +
        '                            </div>' +
        '<div class="col-12"><label class="textareaLabel" for="description">Space Description:</label>' +
        '<textarea id="description" class="aForm" placeholder="Description..."' +
        '    oninput="this.className = \'aForm\'"></textarea></div>' +
        '                             <div class="col-12">' +
        '                                 <label for="price">Price (in ₹):</label>' +
        '                                 <input type="number" id="price" class="aForm" placeholder="Price..." oninput="this.className = \'aForm\'">' +
        '                              </div>' +
        '                              <div class="col-12 deleteBtn"><i class="fas fa-trash-alt"></i></div>' +
        '                        </div>' +
        '                    </div>' +
        '                </div>');
      $(".slot").bootstrapMaterialDatePicker({
        date: false,
        format: "hh:mm a",
        shortTime: true
      });
    } else if ($("#spaceType").val() === "gym") {

      $(this).parent().parent().find(".gymDayParent").append('<div class="col-12 aFormGroup deleteContent">' +
        '                    <div class="container-fluid">' +
        '                        <div class="row">' +
        '                            <div class="col-12">' +
        '                                Slot: <input id="start" value="" class="slot" type="text"> to <input id="end"' +
        '                                    value="" class="slot" type="text">' +
        '                            </div>' +
        '<div class="col-12">' +
        '                    <label for="fitnessStyle">Fitness Type:</label>' +
        '                    <select class="fitnessStyle" name="fitnessStyle" id="fitnessStyle">' +
        '                        <option value="0">Fitness Style</option>' +
        '                        <option value="MMA">MMA</option>' +
        '                        <option value="Cardio">Cardio</option>' +
        '                        <option value="Zumba">Zumba</option>   ' +
        '                        <option value="Cross Functional Training">Cross Functional Training</option>   ' +
        '                    </select>' +
        '                </div>' +
        '                            <div class="col-12">' +
        '                                <label for="classLink">Class Link:</label>' +
        '                                <input type="text" id="classLink" class="aForm" placeholder="Link..."' +
        '                                    oninput="this.className = \'aForm\'">' +
        '                            </div>' +
        '<div class="col-12"><label class="textareaLabel" for="description">Space Description:</label>' +
        '<textarea id="description" class="aForm" placeholder="Description..."' +
        '    oninput="this.className = \'aForm\'"></textarea></div>' +
        '                             <div class="col-12">' +
        '                                 <label for="price">Price (in ₹):</label>' +
        '                                 <input type="number" id="price" class="aForm" placeholder="Price..." oninput="this.className = \'aForm\'">' +
        '                              </div>' +
        '                              <div class="col-12 deleteBtn"><i class="fas fa-trash-alt"></i></div>' +
        '                        </div>' +
        '                    </div>' +
        '                </div>');
      $(".slot").bootstrapMaterialDatePicker({
        date: false,
        format: "hh:mm a",
        shortTime: true
      });
    } else if ($("#spaceType").val() === "pet") {
      $('<div class="col-12 aFormGroup dayParent noInputResize deleteContent">' +
        '        <div class="container-fluid">' +
        '            <div class="row petDayParent contentParent">' +
        '                <div class="col-12">' +
        '                    <label for="petType">Pet Type:</label>' +
        '                    <select class="petType" name="petType" id="petType">' +
        '                        <option value="0">Pet Type</option>' +
        '                        <option value="dog">Dog</option>' +
        '                        <option value="cat">Cat</option>' +
        '                        <option value="bird">Bird</option>   ' +
        '                    </select>' +
        '                </div>' +
        '                <div class="col-12 col-md-6">' +
        '                    <label for="petCount">Number of Pets:</label>' +
        '                    <input type="number" id="petCount" class="aForm" placeholder="Number of Pets..."' +
        '                        oninput="this.className = \'aForm\'">' +
        '                </div>' +
        '                <div class="col-12 col-md-6">' +
        '                    <label for="petBillingCycle">Billing Cycle:</label>' +
        '                    <select class="billingCycle" name="petBillingCycle" id="petBillingCycle">' +
        '                        <option value="Billing Cycle">Billing Cycle</option>' +
        '                        <option value="days">Day</option>' +
        '                        <option value="weeks">Week</option>' +
        '                        <option value="months">Month</option>' +
        '                        <option value="years">Year</option>' +
        '                    </select>' +
        '                </div>' +
        '                <div class="col-12 col-md-6">' +
        '                    <label for="billingDuration">Billing Duration<span class="billingDurationIn"></span>:</label>' +
        '                    <input style="width:5rem;" type="number" id="billingDuration" value="1" class="aForm" placeholder="Billing Duration..."' +
        '                        oninput="this.className = \'aForm\'">' +
        '                </div>' +
        '                <div class="col-12">' +
        '                    <label for="price">Price (in ₹):</label>' +
        '                    <input type="number" id="price" class="aForm" placeholder="Price..."' +
        '                        oninput="this.className = \'aForm\'">' +
        '                </div>' +
        '                 <div class="col-12 deleteBtn"><i class="fas fa-trash-alt"></i></div>' +
        '            </div>' +
        '        </div>' +
        '    </div>').insertBefore(".addBtnDiv.petBtn");
      billingCycleText();
    }
    $(".deleteBtn").click(function () {
      $(this).parents('div.deleteContent').remove();
    });
    $('.coworkingSpaceType').on('change', function () {
      $('coworkingSpace').hide();
      if ($(this).val() === "1") {
        $(this).parents("div.coworkingSelectParent").find(".desk").show();
        $(this).parents("div.coworkingSelectParent").find(".nodesk").hide();
      } else {
        $(this).parents("div.coworkingSelectParent").find(".desk").hide();
        $(this).parents("div.coworkingSelectParent").find(".nodesk").show();
      }
    });
  });

  $(".deleteBtn").click(function () {
    $(this).parents('div.deleteContent').remove();
  });
});


$(document).ready(function () {
  window.onresize = inputSize();
  billingCycleText();

});


// $(document).ready(function(){
//   $(".aFormGroup input").focus(function(){
//     $(".aFormGroup").each(function(){
//       $(this).removeClass("inputFocused");
//     });
//     $(this).parents(".aFormGroup").addClass("inputFocused");
//   });
//   $(".aFormGroup input").blur(function(){
//     $(".aFormGroup").each(function(){
//       $(this).removeClass("inputFocused");
//     });
//   });
//   $(".aFormGroup textarea").focus(function(){
//     $(".aFormGroup").each(function(){
//       $(this).removeClass("inputFocused");
//     });
//     $(this).parents(".aFormGroup").addClass("inputFocused");
//   });
//   $(".aFormGroup textarea").blur(function(){
//     $(".aFormGroup").each(function(){
//       $(this).removeClass("inputFocused");
//     });
//   });
// });


$(document).ready(function(){
  $(".aFormGroup input").focus(function(){
    $(".aFormGroup").each(function(){
      $(this).removeClass("inputFocused");
    });
    $(this).parents(".aFormGroup").addClass("inputFocused");
  });
  $(".aFormGroup input").blur(function(){
    $(".aFormGroup").each(function(){
      $(this).removeClass("inputFocused");
    });
  });
  $(".aFormGroup textarea").focus(function(){
    $(".aFormGroup").each(function(){
      $(this).removeClass("inputFocused");
    });
    $(this).parents(".aFormGroup").addClass("inputFocused");
  });
  $(".aFormGroup textarea").blur(function(){
    $(".aFormGroup").each(function(){
      $(this).removeClass("inputFocused");
    });
  });
});






/* function inputSize(){
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
    document.getElementById("nextBtn").innerHTML = "Submit";
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
      function getPackages(){
        const domain = "coworking";
        if(domain === "coworking"){
          var packageList = []
          $(packageParentClass).each(function(){
            let packageObj = {
              // coworkingspaceType: $(coworkingSpaceType).find("#coworkingSpaceType").children("option:selected").val(),
              // title: $(this).find('#title').val();
              packageTitle: $("#packageTitle").val(),
              packageDescription: $("#packageDescription").val(),
              coworkingspaceType: $("#coworkingSpaceType").find("#coworkingSpaceType").children("option:selected").val(),
              seatCapacity: $("#seatCapacity").val(),
              billingCycle: $("#billingCycle").find("#billingCycle").children("option:selected").val(),
              billingDuration: $("#billingDuration").val(),
              price: $("#price").val(),
              pricePerSeat: $("#pricePerSeat").val(),
            }
            packageList.push(packageObj);
          });
          let priceStruct = {
            coworking:packageList
          }
        }
      }  
      function getPackages(){
        const domain = "pet";
        if(domain === "pet"){
          var packageList = []
          $(packageParentClass).each(function(){
            let packageObj = {
              // coworkingspaceType: $(coworkingSpaceType).find("#coworkingSpaceType").children("option:selected").val(),
              // title: $(this).find('#title').val();
              petType: $("#petType").val(),
              petCount: $("#petCount").val(),
              petBillingCycle: $("#petBillingCycle").find("#petBillingCycle").children("option:selected").val(),
              billingDuration: $("#billingDuration").val(),
              price: $("#price").val(),
              pricePerSeat: $("#pricePerSeat").val(),
            }
            packageList.push(packageObj);
          });
          let priceStruct = {
            pet:packageList
          }
        }
      } 

      brandtitle: $("#brandTitle").val(),
      brandName: $("#brandName").val(),
      brandLogo: $("#brandLogo").val(),
      emailAddress: $("#emailAddress").val(),
      phoneNo: $("#phoneNo").val(),
      officePhoneNo: $("#officePhoneNo").val(),
      brandLocation: $("#brandAddress").val()

      brandAddress{
        brandflatDetails: $("#brandflatDetails").val(),
        brandfloorDetails: $("#brandfloorDetails").val(),
        brandbuildingDetails: $("#brandbuildingDetails").val(),
        brandstreetDetails: $("#brandstreetDetails").val(),
        brandcityName: $("#brandcityName").val(),
        brandpincode: $("#brandpincode").val(),
        brandlandmark: $("#brandLandmark").val(),
        brandstateName: $("#brandstateName").val(),
        brandcountry: $("#brandcountry").val(),
        brandgpsLocation: $("#brandgpsLocation").val(),
        spaceCount: $("#spaceCount").val(),

      spaceTitle: $("#spaceTitle").val(),
      spaceName: $("#spaceName").val(),
      description: $("#description").val(),
      spaceType: $("#spaceType").val(),

      rules: $("#rules").val(),
      policies: $("#policies").val(),

      twentyfourseven: $("#twentyfourseven").val(),

      monday: $("#monday").val(),
      monStart: $("#monStart").val(),
      monEnd: $("#monEnd").val(),

      tuesday: $("#tuesday").val(),
      tueStart: $("#tueStart").val(),
      tueEnd: $("#tueEnd").val(),

      wednesday: $("#wednesday").val(),
      wedStart: $("#wedStart").val(),
      wedEnd: $("#wedEnd").val(),

      thursday: $("#thursday").val(),
      thuStart: $("#thuStart").val(),
      thuEnd: $("#thuEnd").val(),

      frisday: $("#friday").val(),
      friStart: $("#friStart").val(),
      friEnd: $("#friEnd").val(),

      saturday: $("#saturday").val(),
      satStart: $("#satStart").val(),
      satEnd: $("#satEnd").val(),
      
      sunday: $("#sunday").val(),
      sunStart: $("#sunStart").val(),
      sunEnd: $("#sunEnd").val(),

      address:{
        flatDetails: $("#flatDetails").val(),
        floorDetails: $("#floorDetails").val(),
        buildingDetails: $("#buildingDetails").val(),
        streetDetails: $("#streetDetails").val(),
        cityName: $("#cityName").val(),
        pincode: $("#pincode").val(),
        landmark: $("#Landmark").val(),
        stateName: $("#stateName").val(),
        country: $("#country").val(),
        gpsLocation: $("#gpsLocation").val(),
      }
      
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
    } else if($("#spaceType").val() === "dance"){
      
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
    
}); */









