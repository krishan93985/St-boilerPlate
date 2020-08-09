const express = require("express");
const router = express.Router();
const moment = require("moment");
const { v4: uuidv4 } = require("uuid");
// ⇨ '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed'

/* GET home page. */
router.get("/", function (req, res, next) {
  console.log("hello");
  res.render("main/index", { isIndexPage: true });
});

router.get("/filter", function (req, res, next) {
  res.render("main/filter");
  // res.render('main/filter',{details: json});
});

router.get("/map2", function (req, res, next) {
  res.render("main/map2");
});

router.get("/comp", function (req, res, next) {
  res.render("main/comp");
});
router.get("/virtualclass", function (req, res, next) {
  res.render("main/virtualclass");
});

router.get("/danceMap", function (req, res, next) {
  res.render("main/danceMap");
});

router.get("/covidfilter", function (req, res, next) {
  res.render("main/covidfilter");
});

/* router.get('/filter', function(req, res, next) {

    res.render('main/filter');
  
  });*/

router.get("/filter3", function (req, res, next) {
  res.render("main/filter3");
});

router.get("/danceMap", function (req, res, next) {
  res.render("main/danceMap");
});

router.get("/pet_tag", function (req, res, next) {
  res.render("main/pet_tag");
});

router.get("/autoForm", function (req, res, next) {
  res.render("main/autoForm");
});

router.get("/petStudioForm", function (req, res, next) {
  res.render("main/petStudioForm");
});

router.get("/danceStudioForm", function (req, res, next) {
  var d = new Date();

  let days = [];
  let date = [];
  let day = [];

  let daysRequired = 6;

  for (let i = 0; i <= daysRequired; i++) {
    //days.push(moment().add(i, "days").format("dddd, Do MMMM YYYY"));
    //date.push(  moment().add(i, 'days').format('Do')  )
    let obj = {
      day: moment().add(i, "days").format("dddd"),
      date: moment().add(i, "days").format("Do"),
      days: moment().add(i, "days").format("dddd-Do-MMMM-YYYY"),
    };
    day.push(obj);
  }

  console.log(days);

  res.render("main/danceStudioForm", {
    month: moment().add(0, "days").format("MMMM"),
    date,
    day,
  });
});

router.post("/danceStudioForm", function (req, res) {
  let danceUnits = [];
  console.log(req.body.allDates)
  
  var l;
  if (Array.isArray(req.body.danceType)) {
    l = Math.max(req.body.danceType.length, 0);
    for (i = 0; i < l; i++) {
      danceUnits.push({
        publicID: "jhdjcsvdjcvs_id",
        space: "shdbjsds_id",
        date: eval('req.body.dates'+i),
        /* date:
          i === 0
            ? req.body.dates
            : i === 1
            ? req.body.dates1
            : i === 2
            ? req.body.dates2
            : i === 3
            ? req.body.dates3
            : i === 4
            ? req.body.dates4
            : i === 5
            ? req.body.dates5
            : i === 6
            ? req.body.dates6
            : null, */
        domain: "Dance",
        time: {
          startTime: req.body.startSlot[i],
          endTime: req.body.endSlot[i],
        },
        slotType: req.body.danceType[i],
        description: req.body.danceDescription[i],
        classLink: req.body.danceLink[i],
        price: req.body.dancePrice[i],
        gst: 18,
      });
    }
  } else if (req.body.danceType) {
    danceUnits.push({
      publicID: "jhdjcsvdjcvs_id",
      space: "shdbjsds_id",
      date: req.body.dates0,
      domain: "Dance",
      time: {
        startTime: req.body.startSlot,
        endTime: req.body.endSlot,
      },
      slotType: req.body.danceType,
      description: req.body.danceDescription,
      classLink: req.body.danceLink,
      price: req.body.dancePrice,
      gst: 18,
    });
  }

  /* const SlotSchema = {
        publicID: "jhdjcsvdjcvs_id",
        space: "shdbjsds_id",
        date: req.body.dates,
        domain: 'Dance',
        time: {
            startTime: req.body.startSlot[0],
            endTime: req.body.endSlot[0],
        },
        slotType: req.body.danceType[0],
        description: req.body.danceDescription[0],
        classLink: req.body.danceLink[0],
        price: req.body.dancePrice[0],
        gst: 18
    } */
    res.send('success');
  //console.log(danceUnits);
});

router.get("/colivingForm", function (req, res, next) {
  res.render("main/colivingForm");
});

router.post("/colivingForm", function (req, res) {
  const jsonData = {
    _id: {
      $oid: "5f1fff19da5aa238d09597e0",
    },
    spaceCategories: {
      coworking: req.body.categories ? req.body.categories : [],
      dance: [],
      gym: [],
      pet: [],
    },
    openHours: {
      monday: {
        isOpen: req.body.isOpen[0],
        start: req.body.start[0],
        end: req.body.end[0],
      },
      tuesday: {
        isOpen: req.body.isOpen[1],
        start: req.body.start[1],
        end: req.body.end[1],
      },
      wednesday: {
        isOpen: req.body.isOpen[2],
        start: req.body.start[2],
        end: req.body.end[2],
      },
      thursday: {
        isOpen: req.body.isOpen[3],
        start: req.body.start[3],
        end: req.body.end[3],
      },
      friday: {
        isOpen: req.body.isOpen[4],
        start: req.body.start[4],
        end: req.body.end[4],
      },
      saturday: {
        isOpen: req.body.isOpen[5],
        start: req.body.start[5],
        end: req.body.end[5],
      },
      sunday: {
        isOpen: req.body.isOpen[6],
        start: req.body.start[6],
        end: req.body.end[6],
      },
      isTwentyFourSeven: req.body.twentyfourseven,
    },
    amenities: {
      coliving: [],
      coworking: req.body.amenities ? req.body.amenities : [],
      dance: [],
      gym: [],
      pet: [],
    },
    images: {
      otherImages: [req.body.otherImages],
      mainImage: req.body.mainImage,
    },
    priceStructure: {
      coworking: [],
      pet: [],
      dance: [],
      gym: [],
    },
    rules: [req.body.rules],
    policies: [req.body.policies],
    title: req.body.title,
    spaceName: req.body.spaceName,
    domain: "Co-Living space",
    ratings: [],
    reviews: [],
    schedule: [],
    tags: [],
    covidGuidelines: req.body.covidGuidelines ? req.body.covidGuidelines : [],
    pestList: [],
    publicID: "ZVeYTMxjDE4OV51EYNXTlmI7EZdU9A7E",
    owner: {
      $oid: "5f1edde653b52c33b04e5686",
    },
    brand: {
      $oid: "5f1edde653b52c33b04e5686",
    },
    address: {
      floorNo: req.body.floorNo,
      buildingDetails: req.body.buildingDetails,
      streetDetails: req.body.streetDetails,
      cityName: req.body.cityName,
      pinCode: req.body.pinCode,
      landmark: req.body.landmark,
      stateName: req.body.stateName,
      country: req.body.country,
      gpsLocation: req.body.gpsLocation,
    },
    description: req.body.description,
    advDeposit: req.body.advDeposit,
  };

  const Deskunit = {
    publicID: "",
    space: "",
    domain: "Coliving",
    packageType: "Desk",
    title: req.body.title2[0],
    description: req.body.description2[0],
    details: [],
  };

  var l;
  if (Array.isArray(req.body.DeskbillingCycle)) {
    l = Math.max(req.body.DeskbillingCycle.length, 0);
    for (i = 0; i < l; i++) {
      Deskunit.details.push({
        name: req.body.Deskname[i],
        capacity: req.body.Deskcapacity[i],
        unitImages: [],
        billingCycle: req.body.DeskbillingCycle[i],
        billingDuration: req.body.DeskbillingDuration[i],
        price: req.body.Deskprice[i],
        gst: 18,
      });
    }
  } else if (req.body.DeskbillingCycle) {
    Deskunit.details.push({
      name: req.body.Deskname,
      capacity: req.body.Deskcapacity,
      unitImages: [],
      billingCycle: req.body.DeskbillingCycle,
      billingDuration: req.body.DeskbillingDuration,
      price: req.body.Deskprice,
      gst: 18,
    });
  }

  const MRunit = {
    publicID: "",
    space: "",
    domain: "Coliving",
    packageType: "Meeting Room",
    title: req.body.title2[1],
    description: req.body.description2[1],
    details: [],
  };

  var l;
  if (Array.isArray(req.body.MRbillingCycle)) {
    l = Math.max(req.body.MRbillingCycle.length, 0);
    for (i = 0; i < l; i++) {
      MRunit.details.push({
        name: req.body.MRname[i],
        capacity: req.body.MRcapacity[i],
        unitImages: [],
        billingCycle: req.body.MRbillingCycle[i],
        billingDuration: req.body.MRbillingDuration[i],
        price: req.body.MRprice[i],
        gst: 18,
      });
    }
  } else if (req.body.MRbillingCycle) {
    MRunit.details.push({
      name: req.body.MRname,
      capacity: req.body.MRcapacity,
      unitImages: [],
      billingCycle: req.body.MRbillingCycle,
      billingDuration: req.body.MRbillingDuration,
      price: req.body.MRprice,
      gst: 18,
    });
  }

  const ESunit = {
    publicID: "",
    space: "",
    domain: "Coliving",
    packageType: "Event Space",
    title: req.body.title2[2],
    description: req.body.description2[2],
    details: [],
  };

  var l;
  if (Array.isArray(req.body.ESbillingCycle)) {
    l = Math.max(req.body.ESbillingCycle.length, 0);
    for (i = 0; i < l; i++) {
      ESunit.details.push({
        name: req.body.ESname[i],
        capacity: req.body.EScapacity[i],
        unitImages: [],
        billingCycle: req.body.ESbillingCycle[i],
        billingDuration: req.body.ESbillingDuration[i],
        price: req.body.ESprice[i],
        gst: 18,
      });
    }
  } else if (req.body.ESbillingCycle) {
    ESunit.details.push({
      name: req.body.ESname,
      capacity: req.body.EScapacity,
      unitImages: [],
      billingCycle: req.body.ESbillingCycle,
      billingDuration: req.body.ESbillingDuration,
      price: req.body.ESprice,
      gst: 18,
    });
  }

  const Cunit = {
    publicID: "",
    space: "",
    domain: "Coliving",
    packageType: "Cabin",
    title: req.body.title2[3],
    description: req.body.description2[3],
    details: [],
  };

  var l;
  if (Array.isArray(req.body.CbillingCycle)) {
    l = Math.max(req.body.CbillingCycle.length, 0);
    for (i = 0; i < l; i++) {
      Cunit.details.push({
        name: req.body.Cname[i],
        capacity: req.body.Ccapacity[i],
        unitImages: [],
        billingCycle: req.body.CbillingCycle[i],
        billingDuration: req.body.CbillingDuration[i],
        price: req.body.Cprice[i],
        gst: 18,
      });
    }
  } else if (req.body.CbillingCycle) {
    Cunit.details.push({
      name: req.body.Cname,
      capacity: req.body.Ccapacity,
      unitImages: [],
      billingCycle: req.body.CbillingCycle,
      billingDuration: req.body.CbillingDuration,
      price: req.body.Cprice,
      gst: 18,
    });
  }

  console.log(jsonData, Deskunit, MRunit, ESunit, Cunit);
  // console.log(req.body)
});

router.get("/coworkingForm", function (req, res, next) {
  res.render("main/coworkingForm");
});

router.post("/coworkingForm", function (req, res) {
  const jsonData = {
    _id: {
      $oid: "5f1fff19da5aa238d09597e0",
    },
    spaceCategories: {
      coworking: req.body.categories ? req.body.categories : [],
      dance: [],
      gym: [],
      pet: [],
    },
    openHours: {
      monday: {
        isOpen: req.body.isOpen[0],
        start: req.body.start[0],
        end: req.body.end[0],
      },
      tuesday: {
        isOpen: req.body.isOpen[1],
        start: req.body.start[1],
        end: req.body.end[1],
      },
      wednesday: {
        isOpen: req.body.isOpen[2],
        start: req.body.start[2],
        end: req.body.end[2],
      },
      thursday: {
        isOpen: req.body.isOpen[3],
        start: req.body.start[3],
        end: req.body.end[3],
      },
      friday: {
        isOpen: req.body.isOpen[4],
        start: req.body.start[4],
        end: req.body.end[4],
      },
      saturday: {
        isOpen: req.body.isOpen[5],
        start: req.body.start[5],
        end: req.body.end[5],
      },
      sunday: {
        isOpen: req.body.isOpen[6],
        start: req.body.start[6],
        end: req.body.end[6],
      },
      isTwentyFourSeven: req.body.twentyfourseven,
    },
    amenities: {
      coliving: [],
      coworking: req.body.amenities ? req.body.amenities : [],
      dance: [],
      gym: [],
      pet: [],
    },
    images: {
      otherImages: [req.body.otherImages],
      mainImage: req.body.mainImage,
    },
    priceStructure: {
      coworking: [],
      pet: [],
      dance: [],
      gym: [],
    },
    rules: [req.body.rules],
    policies: [req.body.policies],
    title: req.body.title,
    spaceName: req.body.spaceName,
    domain: "Co-Working space",
    ratings: [],
    reviews: [],
    schedule: [],
    tags: [],
    covidGuidelines: req.body.covidGuidelines ? req.body.covidGuidelines : [],
    pestList: [],
    publicID: "ZVeYTMxjDE4OV51EYNXTlmI7EZdU9A7E",
    owner: {
      $oid: "5f1edde653b52c33b04e5686",
    },
    brand: {
      $oid: "5f1edde653b52c33b04e5686",
    },
    address: {
      floorNo: req.body.floorNo,
      buildingDetails: req.body.buildingDetails,
      streetDetails: req.body.streetDetails,
      cityName: req.body.cityName,
      pinCode: req.body.pinCode,
      landmark: req.body.landmark,
      stateName: req.body.stateName,
      country: req.body.country,
      gpsLocation: req.body.gpsLocation,
    },
    description: req.body.description,
    advDeposit: req.body.advDeposit,
  };

  const Deskunit = {
    publicID: "",
    space: "",
    domain: "Coworking",
    packageType: "Desk",
    title: req.body.title2[0],
    description: req.body.description2[0],
    details: [],
  };

  var l;
  if (Array.isArray(req.body.DeskbillingCycle)) {
    l = Math.max(req.body.DeskbillingCycle.length, 0);
    for (i = 0; i < l; i++) {
      Deskunit.details.push({
        name: req.body.Deskname[i],
        capacity: req.body.Deskcapacity[i],
        unitImages: [],
        billingCycle: req.body.DeskbillingCycle[i],
        billingDuration: req.body.DeskbillingDuration[i],
        price: req.body.Deskprice[i],
        gst: 18,
      });
    }
  } else if (req.body.DeskbillingCycle) {
    Deskunit.details.push({
      name: req.body.Deskname,
      capacity: req.body.Deskcapacity,
      unitImages: [],
      billingCycle: req.body.DeskbillingCycle,
      billingDuration: req.body.DeskbillingDuration,
      price: req.body.Deskprice,
      gst: 18,
    });
  }

  const MRunit = {
    publicID: "",
    space: "",
    domain: "Coworking",
    packageType: "Meeting Room",
    title: req.body.title2[1],
    description: req.body.description2[1],
    details: [],
  };

  var l;
  if (Array.isArray(req.body.MRbillingCycle)) {
    l = Math.max(req.body.MRbillingCycle.length, 0);
    for (i = 0; i < l; i++) {
      MRunit.details.push({
        name: req.body.MRname[i],
        capacity: req.body.MRcapacity[i],
        unitImages: [],
        billingCycle: req.body.MRbillingCycle[i],
        billingDuration: req.body.MRbillingDuration[i],
        price: req.body.MRprice[i],
        gst: 18,
      });
    }
  } else if (req.body.MRbillingCycle) {
    MRunit.details.push({
      name: req.body.MRname,
      capacity: req.body.MRcapacity,
      unitImages: [],
      billingCycle: req.body.MRbillingCycle,
      billingDuration: req.body.MRbillingDuration,
      price: req.body.MRprice,
      gst: 18,
    });
  }

  const ESunit = {
    publicID: "",
    space: "",
    domain: "Coworking",
    packageType: "Event Space",
    title: req.body.title2[2],
    description: req.body.description2[2],
    details: [],
  };

  var l;
  if (Array.isArray(req.body.ESbillingCycle)) {
    l = Math.max(req.body.ESbillingCycle.length, 0);
    for (i = 0; i < l; i++) {
      ESunit.details.push({
        name: req.body.ESname[i],
        capacity: req.body.EScapacity[i],
        unitImages: [],
        billingCycle: req.body.ESbillingCycle[i],
        billingDuration: req.body.ESbillingDuration[i],
        price: req.body.ESprice[i],
        gst: 18,
      });
    }
  } else if (req.body.ESbillingCycle) {
    ESunit.details.push({
      name: req.body.ESname,
      capacity: req.body.EScapacity,
      unitImages: [],
      billingCycle: req.body.ESbillingCycle,
      billingDuration: req.body.ESbillingDuration,
      price: req.body.ESprice,
      gst: 18,
    });
  }

  const Cunit = {
    publicID: "",
    space: "",
    domain: "Coworking",
    packageType: "Cabin",
    title: req.body.title2[3],
    description: req.body.description2[3],
    details: [],
  };

  var l;
  if (Array.isArray(req.body.CbillingCycle)) {
    l = Math.max(req.body.CbillingCycle.length, 0);
    for (i = 0; i < l; i++) {
      Cunit.details.push({
        name: req.body.Cname[i],
        capacity: req.body.Ccapacity[i],
        unitImages: [],
        billingCycle: req.body.CbillingCycle[i],
        billingDuration: req.body.CbillingDuration[i],
        price: req.body.Cprice[i],
        gst: 18,
      });
    }
  } else if (req.body.CbillingCycle) {
    Cunit.details.push({
      name: req.body.Cname,
      capacity: req.body.Ccapacity,
      unitImages: [],
      billingCycle: req.body.CbillingCycle,
      billingDuration: req.body.CbillingDuration,
      price: req.body.Cprice,
      gst: 18,
    });
  }

  console.log(jsonData, Deskunit, MRunit, ESunit, Cunit);
  // console.log(req.body)
});

router.get("/petMap", function (req, res, next) {
  const details = {
    _id: {
      $oid: "5f1c76147ca0b0655899b4d0",
    },
    spaceCategories: {
      coliving: [],
      coworking: [],
      dance: [],
      gym: [],
      pet: [
        "Adoption",
        "Boarding",
        "Doggie Daycare",
        "Grooming",
        "Socializing",
        "Pet Parties",
      ],
    },
    priceStructure: {
      coworking: [],
      pet: [
        {
          _id: {
            $oid: "5f1c7400a2008167c4d391e4",
          },
          unitImages: [
            "https://stbeta.s3.ap-south-1.amazonaws.com/petStudio/tIGHuMUdAsnmV0zJZxT5GgcgPyeuVpLS/4.jpeg",
          ],
          publicID: "mRkURLjYqRqw11eXEZA4aqwssq8FuqyB",
          space: {
            $oid: "5f1c76147ca0b0655899b4d0",
          },
          domain: "Pet",
          packageType: "Boarding",
          title: "Pet Boa   rding",
          description:
            "Pricing ranges from 1000 to 1500 depending on the room and package. The pet list includes - Dogs, Cats, Fish, Turtle and Birds.",
          capacity: 50,
          billingInfo: {
            billingCycle: "Hours",
            billingDuration: 1,
          },
          price: 1000,
          gst: 18,
          __v: 0,
        },
      ],
      dance: [],
      gym: [],
    },
    openHours: {
      monday: {
        isOpen: false,
      },
      tuesday: {
        isOpen: false,
      },
      wednesday: {
        isOpen: false,
      },
      thursday: {
        isOpen: false,
      },
      friday: {
        isOpen: false,
      },
      saturday: {
        isOpen: false,
      },
      sunday: {
        isOpen: false,
      },
      isTwentyFourSeven: true,
    },
    amenities: {
      coliving: [],
      coworking: [],
      dance: [],
      gym: [],
      pet: [
        "AC",
        "Outdoor Play Area",
        "Indoor Play Area",
        "Swimming Pool",
        "Dog Park",
        "24x7 Pet Cam Access",
        "Pick and Drop Service",
      ],
    },
    images: {
      otherImages: [
        "https://stbeta.s3.ap-south-1.amazonaws.com/petStudio/tIGHuMUdAsnmV0zJZxT5GgcgPyeuVpLS/1.jpeg",
        "https://stbeta.s3.ap-south-1.amazonaws.com/petStudio/tIGHuMUdAsnmV0zJZxT5GgcgPyeuVpLS/2.jpeg",
        "https://stbeta.s3.ap-south-1.amazonaws.com/petStudio/tIGHuMUdAsnmV0zJZxT5GgcgPyeuVpLS/4.jpeg",
        "https://stbeta.s3.ap-south-1.amazonaws.com/petStudio/tIGHuMUdAsnmV0zJZxT5GgcgPyeuVpLS/5.jpeg",
      ],
      mainImage:
        "https://stbeta.s3.ap-south-1.amazonaws.com/petStudio/tIGHuMUdAsnmV0zJZxT5GgcgPyeuVpLS/3.jpeg",
    },
    ratings: [],
    reviews: [],
    schedule: [],
    tags: [],
    covidGuidelines: [],
    pestList: [],
    publicID: "tIGHuMUdAsnmV0zJZxT5GgcgPyeuVpLS",
    title: "The Bark Club",
    spaceName: "The Bark Club",
    domain: "Pet Studio",
    owner: {
      $oid: "5ed662287fd1870a4852be55",
    },
    brand: {
      $oid: "5ed662287fd1870a4852be55",
    },
    address: {
      flatDetails: "Plot 41A ",
      buildingDetails: "Brick Bunder",
      streetDetails:
        "Lane next to Laxmi Ent PETROL PUMP, Reay Road, East, Hay Bunder Rd, Kushal Nagar, Byculla",
      cityName: "Mumbai",
      pinCode: 400033,
      landmark: "Near Reay Road Station",
      stateName: "Maharashtra",
      country: "India",
      gpsLocation:
        "https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d15091.560707245304!2d72.851456!3d18.980457!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x1fca5cd6b20ecf3d!2sThe%20Bark%20Club!5e0!3m2!1sen!2sin!4v1595419116715!5m2!1sen!2sin",
    },
    description:
      "The Bark Club is South Mumbai\u2019s state-of-the-art pet boarding facility. Built over a sprawling 2,200 sq ft area, it is a revolutionary space, equipped with glass kennels, air conditioning, CCTV access and monitoring, swimming pools, 24 hour on call vets, and other cutting edge facilities to ensure maximum safety and a homelike environment for your pets.",
    rules: ["No rules for pets, just have a good time"],
    policies: ["No Refund after Payment"],
    createdAt: {
      $date: "2020-07-25T18:12:36.181Z",
    },
    updatedAt: {
      $date: "2020-07-25T18:12:36.181Z",
    },
    __v: 0,
  };

  res.render("main/petMap", { space: details });
});

router.get("/d", function (req, res, next) {
  const details = {
    _id: {
      $oid: "5f1c76147ca0b0655899b4d0",
    },
    spaceCategories: {
      coliving: [],
      coworking: [],
      dance: [],
      gym: [],
      pet: [
        "Adoption",
        "Boarding",
        "Doggie Daycare",
        "Grooming",
        "Socializing",
        "Pet Parties",
      ],
    },
    priceStructure: {
      coworking: [],
      pet: [
        {
          _id: {
            $oid: "5f1c7400a2008167c4d391e4",
          },
          unitImages: [
            "https://stbeta.s3.ap-south-1.amazonaws.com/petStudio/tIGHuMUdAsnmV0zJZxT5GgcgPyeuVpLS/4.jpeg",
          ],
          publicID: "mRkURLjYqRqw11eXEZA4aqwssq8FuqyB",
          space: {
            $oid: "5f1c76147ca0b0655899b4d0",
          },
          domain: "Pet",
          packageType: "Boarding",
          title: "Pet Boa   rding",
          description:
            "Pricing ranges from 1000 to 1500 depending on the room and package. The pet list includes - Dogs, Cats, Fish, Turtle and Birds.",
          capacity: 50,
          billingInfo: {
            billingCycle: "Hours",
            billingDuration: 1,
          },
          price: 1000,
          gst: 18,
          __v: 0,
        },
      ],
      dance: [],
      gym: [],
    },
    openHours: {
      monday: {
        isOpen: false,
      },
      tuesday: {
        isOpen: false,
      },
      wednesday: {
        isOpen: false,
      },
      thursday: {
        isOpen: false,
      },
      friday: {
        isOpen: false,
      },
      saturday: {
        isOpen: false,
      },
      sunday: {
        isOpen: false,
      },
      isTwentyFourSeven: true,
    },
    amenities: {
      coliving: [],
      coworking: [],
      dance: [],
      gym: [],
      pet: [
        "AC",
        "Outdoor Play Area",
        "Indoor Play Area",
        "Swimming Pool",
        "Dog Park",
        "24x7 Pet Cam Access",
        "Pick and Drop Service",
      ],
    },
    images: {
      otherImages: [
        "https://stbeta.s3.ap-south-1.amazonaws.com/petStudio/tIGHuMUdAsnmV0zJZxT5GgcgPyeuVpLS/1.jpeg",
        "https://stbeta.s3.ap-south-1.amazonaws.com/petStudio/tIGHuMUdAsnmV0zJZxT5GgcgPyeuVpLS/2.jpeg",
        "https://stbeta.s3.ap-south-1.amazonaws.com/petStudio/tIGHuMUdAsnmV0zJZxT5GgcgPyeuVpLS/4.jpeg",
        "https://stbeta.s3.ap-south-1.amazonaws.com/petStudio/tIGHuMUdAsnmV0zJZxT5GgcgPyeuVpLS/5.jpeg",
      ],
      mainImage:
        "https://stbeta.s3.ap-south-1.amazonaws.com/petStudio/tIGHuMUdAsnmV0zJZxT5GgcgPyeuVpLS/3.jpeg",
    },
    ratings: [],
    reviews: [],
    schedule: [],
    tags: [],
    covidGuidelines: [],
    pestList: [],
    publicID: "tIGHuMUdAsnmV0zJZxT5GgcgPyeuVpLS",
    title: "The Bark Club",
    spaceName: "The Bark Club",
    domain: "Pet Studio",
    owner: {
      $oid: "5ed662287fd1870a4852be55",
    },
    brand: {
      $oid: "5ed662287fd1870a4852be55",
    },
    address: {
      flatDetails: "Plot 41A ",
      buildingDetails: "Brick Bunder",
      streetDetails:
        "Lane next to Laxmi Ent PETROL PUMP, Reay Road, East, Hay Bunder Rd, Kushal Nagar, Byculla",
      cityName: "Mumbai",
      pinCode: 400033,
      landmark: "Near Reay Road Station",
      stateName: "Maharashtra",
      country: "India",
      gpsLocation:
        "https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d15091.560707245304!2d72.851456!3d18.980457!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x1fca5cd6b20ecf3d!2sThe%20Bark%20Club!5e0!3m2!1sen!2sin!4v1595419116715!5m2!1sen!2sin",
    },
    description:
      "The Bark Club is South Mumbai\u2019s state-of-the-art pet boarding facility. Built over a sprawling 2,200 sq ft area, it is a revolutionary space, equipped with glass kennels, air conditioning, CCTV access and monitoring, swimming pools, 24 hour on call vets, and other cutting edge facilities to ensure maximum safety and a homelike environment for your pets.",
    rules: ["No rules for pets, just have a good time"],
    policies: ["No Refund after Payment"],
    createdAt: {
      $date: "2020-07-25T18:12:36.181Z",
    },
    updatedAt: {
      $date: "2020-07-25T18:12:36.181Z",
    },
    __v: 0,
  };

  res.render("main/d", { space: details });
});

router.get("/reviews", function (req, res, next) {
  res.render("main/reviews");
  // res.render('main/filter',{details: json});
});

router.get("/center", function (req, res, next) {
  //   res.render('main/center');

  res.render("main/center");
});

// router.get('/', function(req, res, next) {

//   res.render('main/book');

// });
router.get("/review", function (req, res, next) {
  res.render("main/review");
});

router.get("/dancetag", function (req, res, next) {
  res.render("main/dancetag");
});

module.exports = router;
