/* -----------------objects info section -------------------*/
var bio = {
    /* bio contains name, role, welcomeMessage, and biopic strings, contacts 
    object and skills array of skill strings. The contacts object 
    should contain a mobile number, email address, github username, twitter handle and location. 
    The twitter property is optional. */
    "name": "Franz Ronay",
    "role": "Engineer & Medical Student",
    "contacts": {
        "mobile": "+43 699 *** ** *2",
        "email": "franz.ronay@gmail.com",
        "github": "sniperdrone",
        "twitter": "@sniperdrone",
        "location": "Vienna, Austria"
    },
    "welcomeMessage": "Jack of all trades, MSc. of none...",
    "skills": ["Python", "JavaScript", "Matlab", "Languages: English/German/Chinese"],
    "biopic": "images/me1.jpg"
};

// work contains an array of jobs. 
// Each object in the jobs array should contain an employer, 
// title, location, dates worked and description strings.
var work = {
    "jobs": [{
            "title": "Data Center Engineer",
            "employer": "Google Inc",
            "dates": "2014 - 2016",
            "location": "Dublin, Ireland",
            "description": "Worked on team designing and building Google's Data Centers across Europe. " +
                "Promoted to Lead Electrical Engineer for $150M facility in Ireland. " +
                "Programming exposure through projects on simulating electrical system transients in Matlab/Simulink and " +
                "analysing historical energy use.",
            "link": "http://www.independent.ie/business/technology/google-expands-in-ireland-opens-new-150m-data-centre-34807006.html"
        },

        {
            "title": "Research Assistant",
            "employer": "Technical University of Vienna",
            "dates": "2013 - 2014",
            "location": "Vienna, Austria",
            "description": "Brief stint as research assistant working on microfluidics simulation " +
            "and building prototype diagnostic chip.",
            "link": "https://www.isas.tuwien.ac.at/home/EN/"
        },
        {
            "title": "Engineering Intern",
            "employer": "Austrian Power Grid AG",
            "dates": "Summer 2012",
            "location": "Vienna, Austria",
            "description": "Optimising grid carrying capacity for all climate situations based on historic data.",
            "link": "http://www.abb.com/cawp/seitp202/86eb1446ac0b218b852573360080b739.aspx"
        },
        {
            "title": "Engineering Intern",
            "employer": "Shanghai Morimatsu",
            "dates": "Summer 2010",
            "location": "Shanghai, China",
            "description": "CAD construction of heavy industrial equipment and translation (English/Mandarin).",
            "link": "http://www.morimatsu-eng.com.cn/en/"
        }
    ]
};

var education = {
    "schools": [{
            "name": "Medical University of Vienna",
            "location": "Vienna, Austria",
            "degree": "Student (DDS Program)",
            "dates": "2016 - ongoing",
            "majors": ["General Medicine, Dentistry"],
            "link": "http://meduniwien.ac.at/"
        },
        {
            "name": "Cambridge University",
            "location": "Cambridge, UK",
            "degree": "M.Eng. Electrical Engineering",
            "dates": "2009 - 2013",
            "majors": ["Power Engineering", "Thesis on Offshore Power Transmission"],
            "link": "http://www.undergraduate.study.cam.ac.uk/courses/engineering"
        }
    ],
    "onlineCourses": [{
        "title": "Front-End Web Development Nanodegree",
        "school": "Udacity",
        "dates": "Jun - Aug 2016",
        "url": "https://www.udacity.com"

    }]
};

/* projects contains an array of projects. 
	Each object in the projects array should contain title,
	 dates and description strings, and an images array with URL strings for project images. */
var projects = {
    "projects": [{
            "title": "Blink Assisted Communications",
            "dates": "Summer 2017",
            "description": "Minimal prototype for assisted communications device using" +
                " webcam + python image processing libraries to enable speech through eye movements.",
            "images": ["images/example.png"],
            "link": "https://github.com/sniperdrone/blink_to_morse"
        },
        {
            "title": "Dental X-Ray Analysis",
            "dates": "Summer 2016",
            "description": "Helper functions for eventual goal of automating dental X-Ray diagnostic steps such as cephalometry & caries detection.",
            "images": ["images/skull.png", "images/jaw.png"],
            "link": "https://github.com/sniperdrone/image_analysis_playground"
        }
    ]
};

/* ----------------- helper functions -------------------*/
function frep(HTMLelement, newContent, HTMLstring = "%data%") {
    // frep = 'formatted replace' - replaces %data% by default in HTML Element with insertion data
    // otherwise uses supplied HTMLstring e.g. "#" for replace
    // made copy-paste a bit easier; originally also appended/prepended element
    var formattedElement = HTMLelement.replace(HTMLstring, newContent);
    return formattedElement;
}

/* ----------------- header, skills & biopic -------------------*/

bio.display = function() {
    // name & role at top
    $("#header").prepend(frep(HTMLheaderRole, bio.role));
    $("#header").prepend(frep(HTMLheaderName, bio.name));

    // add contacts to top and bottom of page
    ["#topContacts", "#footerContacts"].forEach(function(id) {
        $(id).append(frep(HTMLemail, bio.contacts.email));
        $(id).append(frep(HTMLmobile, bio.contacts.mobile));
        $(id).append(frep(HTMLlocation, bio.contacts.location));
        $(id).append(frep(HTMLgithub, bio.contacts.twitter));
    });

    $("#header").append(frep(HTMLwelcomeMsg, bio.welcomeMessage));

    //biopic 
    $("#header").append(frep(HTMLbioPic, bio.biopic));


    // append skills to header
    if (bio.skills.length > 0) {
        $("#header").append(HTMLskillsStart);
        bio.skills.forEach(function(element) {
            var formattedSkill = HTMLskills.replace("%data%", element);
            $("#skills").append(formattedSkill);
        });
    }
};

bio.display();

/* ----------------- work -------------------*/
work.display = function() {
    work.jobs.forEach(function(cj) {
        // cj as in current job in loop
        $("#workExperience").append(HTMLworkStart);
        var loc = frep(HTMLworkLocation, cj.location);
        $(".work-entry:last").append(loc);
        var emp = frep(HTMLworkEmployer, cj.employer);
        // modified frep() call using optional third attribue, to replace link in href instead of %data%
        emp = frep(emp, cj.link, "#");
        var tit = frep(HTMLworkTitle, cj.title);
        $(".work-entry:last").append(emp + tit);
        var dat = frep(HTMLworkDates, cj.dates);
        $(".work-entry:last").append(dat);
        var desc = frep(HTMLworkDescription, cj.description);
        $(".work-entry:last").append(desc);
    });
};
work.display();

/* ----------------- education -------------------*/

education.display = function() {
    // first off: traditional university courses
    education.schools.forEach(function(cs) {
        // cs as in current school in loop
        $("#education").append(HTMLschoolStart);
        var nam = frep(HTMLschoolName, cs.name);
        nam = frep(nam, cs.link, "#");
        //$(".education-entry:last").append(nam);
        var deg = frep(HTMLschoolDegree, cs.degree);
        $(".education-entry:last").append(nam + deg);
        var dat = frep(HTMLschoolDegree, cs.dates);
        $(".education-entry:last").append(dat);
        var loc = frep(HTMLschoolLocation, cs.location);
        $(".education-entry:last").append(loc);
        var maj = frep(HTMLschoolMajor, cs.majors);
        $(".education-entry:last").append(maj);
    });
    // next up: online courses
    $("#education").append(HTMLonlineClasses);
    education.onlineCourses.forEach(function(cs) {
        // cs as in current school in loop
        $("#education").append(HTMLschoolStart);
        var tit = frep(HTMLonlineTitle, cs.title);
        tit = frep(tit, cs.url, "#");
        var sch = frep(HTMLonlineSchool, cs.school);
        $(".education-entry:last").append(tit + sch);
        var dat = frep(HTMLonlineDates, cs.dates);
        $(".education-entry:last").append(dat);
        // don't need to append url as link already in online course title
        // var url = frep(HTMLonlineURL, cs.url);
        // $(".education-entry:last").append(url);
    });
};

education.display();

/* ----------------- projects -------------------*/
projects.display = function() {
    projects.projects.forEach(function(cp) {
        // cp as in current project in loop
        $("#projects").append(HTMLprojectStart);
        var tit = frep(HTMLprojectTitle, cp.title);
        tit = frep(tit, cp.link, "#");
        $(".project-entry:last").append(tit);
        var dat = frep(HTMLprojectDates, cp.dates);
        $(".project-entry:last").append(dat);
        var desc = frep(HTMLprojectDescription, cp.description);
        $(".project-entry:last").append(desc);
        if (cp.images.length > 0) {
            cp.images.forEach(function(img) {
                form = frep(HTMLprojectImage, img);
                $(".project-entry:last").append(form);
            });
        }
    });
};

projects.display();


/* ----------------- google map -------------------*/
$("#mapDiv").append(googleMap);


/* ----------------- internationalise button of questionable value -------------------*/
function inName(name) {
    name = name.trim().split(" ");
    console.log(name);
    name[1] = name[1].toUpperCase();
    name[0] = name[0].slice(0, 1).toUpperCase() + name[0].slice(1).toLowerCase();
    return name[0] + " " + name[1];
}
$("#main").append(internationalizeButton);


/* ----------------- add scrolling nav arrows ---------------*/
function constructArrow(link, down = true) {
    // construct nav arrows with hrefs which we can later append to each major container
    var orientation = (down ? "class='down'" : "class = 'up'");
    var arrowDiv = "<div class='arrowContainer' href='" + link + "'> <arrow " + orientation + " ></arrow></div>";
    return arrowDiv;
}

// in total, need 3 downwards arrows and one upwards arrow to return
$("#header").append(constructArrow("#workExperience"));
$("#workExperience").append(constructArrow("#projects"));
$("#projects").append(constructArrow("#education"));
$("#education").append(constructArrow("#mapDiv"));
$("#mapDiv").append(constructArrow("#header", false));


//Smooth Scrolling (adapted from W3 example template)
$(document).ready(function() {
    // Add smooth scrolling to all arrow containers
    $(".arrowContainer").on('click', function(event) {
        var scrollTarget = $(this).attr("href");
        // Make sure scroll target has a value before overriding default behavior
        if (scrollTarget) {
            // Prevent default anchor click behavior
            event.preventDefault();
            // Using jQuery's animate() method to add smooth page scroll
            // The optional number (800) specifies the number of milliseconds it takes to scroll to the specified area
            $('html, body').animate({
                scrollTop: $(scrollTarget).offset().top
            }, 600, function() {
                // console.log("scrolling!")
                // Add hash (#) to URL when done scrolling (default click behavior)
                //window.location.hash = scrollTarget;
            });

        } else {
            console.log("could not scroll");
        }
    });
});