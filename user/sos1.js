// document.addEventListener('DOMContentLoaded', function () {
//     const applySosForm = document.getElementById('applySosForm');

//     applySosForm.addEventListener('submit', function (event) {
//         event.preventDefault();
//         applySos();
//     });

//     function applySos() {

//         alert('Location sent')
//         // // Hardcoded mobile number
//         const fetchNumber = localStorage.getItem('mobileUser')
//         console.log(fetchNumber)
        
//         const sosMobile = fetchNumber;

//         // Fetch user's live location
//         if (navigator.geolocation) {
//             navigator.geolocation.getCurrentPosition(function (position) {
//                 const latitude = position.coords.latitude;
//                 const longitude = position.coords.longitude;
//                 const location = latitude + " , " + longitude
//                 console.log(latitude, longitude)
//                 // const location = Latitude: ${latitude} Longitude: ${longitude};

//                 // Hardcoded values for advance payment and customer
//                 const advancePayment = 'Rs. 100';
//                 const customer = 'customer';

//                 function geoLocationSuccess(pos) {
                  
//                     // Make a request to OpenStreetMap API
//                     $.get(
//                         "https://nominatim.openstreetmap.org/reverse?format=json&lat=" +
//                         latitude +
//                         "&lon=" +
//                         longitude
//                     )
//                         .done(function (data) {
//                             var locationName = data.display_name;
//                             console.log(locationName)
//                         })
//                         .fail(function () {
//                             console.error("Failed to fetch location details");
//                         });
//                 }
//                 geoLocationSuccess()

//                 // Send SOS request with live location
//                 fetch('http://localhost:8080/api/customer/sos', {
//                     method: 'POST',
//                     headers: {
//                         'Content-Type': 'application/json'
//                     },
//                     body: JSON.stringify({
//                         mobile: sosMobile,
//                         location: locationName,
//                         advance_payment: advancePayment,
//                         customer: customer
//                     })
//                 })
//                     .then(response => {
//                         if (!response.ok) {
//                             throw new Error('Failed to apply SOS');
//                         }
//                         alert('SOS applied successfully');
//                     })
//                     .catch(error => {
//                         console.error('Error applying SOS:', error);
//                     });
//             }, function (error) {
//                 console.error('Error getting user location:', error);
//             });
//         } else {
//             console.error('Geolocation is not supported by this browser');
//         }
//     }
// });



document.addEventListener('DOMContentLoaded', function () {
    const applySosForm = document.getElementById('applySosForm');

    // Fetch user's live location and display the location name
    fetchLocationName();

    applySosForm.addEventListener('submit', function (event) {
        event.preventDefault();
        applySos();
    });

    function fetchLocationName() {
        // Fetch user's live location
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function (position) {
                const latitude = position.coords.latitude;
                const longitude = position.coords.longitude;
                const location = latitude + " , " + longitude;

                // Make a request to OpenStreetMap API to get location name
                $.get(
                    "https://nominatim.openstreetmap.org/reverse?format=json&lat=" +
                    latitude +
                    "&lon=" +
                    longitude
                )
                    .done(function (data) {
                        var locationName = data.display_name;
                        // Update the HTML element with the location name
                        document.getElementById('locationLive').textContent = locationName;
                    })
                    .fail(function () {
                        console.error("Failed to fetch location details");
                    });
            }, function (error) {
                console.error('Error getting user location:', error);
            });
        } else {
            console.error('Geolocation is not supported by this browser');
        }
    }

    function applySos() {
        // Hardcoded mobile number
        const fetchNumber = localStorage.getItem('mobileUser');
        const sosMobile = fetchNumber;

        // Fetch user's live location
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function (position) {
                const latitude = position.coords.latitude;
                const longitude = position.coords.longitude;
                const location = latitude + " , " + longitude;

                // Make a request to OpenStreetMap API to get location name
                $.get(
                    "https://nominatim.openstreetmap.org/reverse?format=json&lat=" +
                    latitude +
                    "&lon=" +
                    longitude
                )
                    .done(function (data) {
                        var locationName = data.display_name;

                        // Send SOS request with live location and location name
                        sendSOS(sosMobile, location, locationName);
                    })
                    .fail(function () {
                        console.error("Failed to fetch location details");
                    });
            }, function (error) {
                console.error('Error getting user location:', error);
            });
        } else {
            console.error('Geolocation is not supported by this browser');
        }
    }

    function sendSOS(sosMobile, location, locationName) {
        // Hardcoded values for advance payment and customer
        const advancePayment = 'Rs. 100';
        const customer = 'customer';

        // Send SOS request with live location and location name
        fetch('http://192.168.1.46:8080/api/customer/sos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                mobile: sosMobile,
                location: locationName, // Use locationName instead of location
                advance_payment: advancePayment,
                customer: customer
            })
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to apply SOS');
                }
                alert('SOS applied successfully');
            })
            .catch(error => {
                console.error('Error applying SOS:', error);
            });
    }
});