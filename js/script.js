$(document).ready(function () {


/** ------------ DATEPICKER JAVASCRIPT ------------ */

// Initialize datepicker on the inputs:
$("#startDate").datepicker({
    // formatting we want: dd-mm-yy
    dateFormat: "dd-mm-yy",
    onSelect: function() {
        const startDate = $("#startDate").datepicker("getDate");
        console.log(startDate);
        const diffDays = calculateDays();
        populateResults(diffDays);
    }
});

$("#endDate").datepicker({
    // formatting we want: dd-mm-yy
    dateFormat: "dd-mm-yy",
    onSelect: function() {
        const endDate = $("#endDate").datepicker("getDate");
        console.log(endDate);
        // run the calculate function
       const diffDays = calculateDays();
        populateResults(diffDays);
    }
});

// Calculate the difference between the two dates:
function calculateDays() {
    const startDate = $("#startDate").datepicker("getDate"); 
    const endDate = $("#endDate").datepicker("getDate");

    // check if we have a start date and an end date;
    if (startDate && endDate) {
        // calculate the difference:
        const timeDiff = Math.abs(endDate.getTime() - startDate.getTime()); // makes sure that the number is a positive number
        console.log(timeDiff);

        // 1000 milliseconds per second 
        // 3600 seconds per hour
        // 24 hours in a day
        // 1000 * 3600 * 24 = number of milliseconds in a day

        // timeDiff / number of milliseconds in a day = number of days
        // make sure the number of days is a whole number, we use Math.ceil()
        const diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
        console.log(diffDays);

        // update number of days span
        $("#numberOfDays").text(diffDays);
        // return the diffDays to make it accessible to the populate function
        return diffDays;
    } else {
        // make sure the number of days is empty;
        $("#numberOfDays").text(""); // this sets it to empty
    }
}

// Filtering Dates with Hotels

const availableHotels = [
    {
        id: 1,
        name: 'Boulcott Suites',
        minStay: 3,
        maxStay: 10,
    },
    {
        id: 2,
        name: 'DoubleTree Hilton',
        minStay: 1,
        maxStay: 7,
    },
    {
        id: 3,
        name:' Quest Wellington',
        minStay: 6,
        maxStay: 9,
    },
    {
        id: 4,
        name: 'Trinity Hotel',
        minStay: 2,
        maxStay: 6,
    },
];

function populateResults(diffDays) {
    // clear out the results div
    $("#results").html = ("");
    // run a for loop over the hotel array to do this for each hotel
   availableHotels.forEach(availableHotel => {
        // check if number of days entered by user is more than hotel min stay or less than hotel max stay
        if (diffDays >= availableHotel.minStay && diffDays <= availableHotel.maxStay) {
            $("#results").append(`<p> <i class="fa-solid fa-location-dot"></i>  ${availableHotel.name} </p>`);
        } else {
            $("#results").append(``);
        }
    });
}



/** ------------- MAPBOX JAVASCRIPT -------------- */


mapboxgl.accessToken = 'pk.eyJ1IjoiY2lhcmFuc2xvdyIsImEiOiJjbHY0ZW91YnYwOGV3MmlwOGQ5b3l3a3J3In0.EFWZEAWA13ehFAw5jdLqJA';

// Hotels Array Data
const hotels = [
    {
        name: 'Boulcott Suites',
        address: "5 O'Reily Ave, Wellington",
        longitude: 174.77395912208956,
        latitude: -41.288892599727355
    },
    {
        name: 'DoubleTree Hilton',
        address: '28 Grey Street, Lambton Quay, Wellington',
        longitude:  174.7756735025577,
        latitude: -41.284057384293014
    },
    {
        name: 'Quest Wellington',
        address: '33 Hunter Street, Wellington',
        longitude: 174.77618629690755,
        latitude: -41.28532604740522,
    },
    {
        name: 'Trinity Hotel',
        address: '166 Willis Street, Te Aro, Wellington',
        longitude: 174.7736876950568,
        latitude: -41.29055056506054
    },
];



// Initialise the map
const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v11',
    center: [174.7762, -41.2865],
    zoom: 13
});

// Add markers to the map
hotels.forEach(hotel => {
    const marker = new mapboxgl.Marker()
        .setLngLat([hotel.longitude, hotel.latitude])
        .setPopup(new mapboxgl.Popup({ offset: 25})
        .setHTML(`<h3>${hotel.name}</h3><p>${hotel.address}</p>`))
        .addTo(map);
});

// Create buttons:
const buttonsContainer = document.querySelector('.buttons');

hotels.forEach((hotel, index) => {
    const button = document.createElement('button'); // makes a button
    button.className = 'button'; // attach a class name to the button
    button.textContent = hotel.name; // places the name from the attractions array inside the button
    // onClick to do the 'fly to'
    button.addEventListener('click', function() {
        map.flyTo({
            center: [hotel.longitude, hotel.latitude],
            essential: true,
            zoom: 15
        }); // end of fly to
    }); // end of onClick
    // append buttons to the container
    buttonsContainer.appendChild(button);
});






}); // END OF JAVASCRIPT