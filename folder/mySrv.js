app.factory('mySrv', function ($q, $http) {

    function loadMyCities(countryName) {
        var cities = [];
        var async = $q.defer()
        var urlCall = 'clients.json'

        $http.get(urlCall).then(function (response) {

            for (var i = 0; i < response.data['Customers'].length; i++) {

                if (response.data['Customers'][i]['Country'] === countryName) {
                    var newCity = response.data['Customers'][i]['City'];
                    if (cities.indexOf(newCity) === -1) {
                        newCity = response.data['Customers'][i]['City'];
                        cities.push(newCity);
                    }
                }
            }
            async.resolve(cities);
        }, function (response) {
            console.error(response)
            async.reject([])
        });

        return async.promise;

    }

    function loadMyCompanies(cityName) {
        var company = [];
        var async = $q.defer()
        var urlCall = 'clients.json'

        $http.get(urlCall).then(function (response) {

            for (var i = 0; i < response.data['Customers'].length; i++) {
                if (response.data['Customers'][i]['City'] === cityName) {
                    var newCompany = response.data['Customers'][i]['CompanyName'];
                    if (company.indexOf(newCompany) === -1) {
                        newCompany = response.data['Customers'][i]['CompanyName'];
                        company.push(newCompany);
                    }
                }
            }
            async.resolve(company);
        }, function (response) {
            console.error(response)
            async.reject([])
        });

        return async.promise;

    }

    function getMyAddress(CompanyName) {

        var async = $q.defer()
        var urlCall = 'clients.json'

        $http.get(urlCall).then(function (response) {

            for (var i = 0; i < response.data['Customers'].length; i++) {
                if (response.data['Customers'][i]['CompanyName'] === CompanyName) {
                    var street = response.data['Customers'][i]['Address']
                    var city = response.data['Customers'][i]['City']
                    var address = street + ", " + city
                }
            }
            console.log(address);
            async.resolve(address);
        }, function (response) {
            console.error(response)
            async.reject([])
        });

        return async.promise;

    }

    function checkNumOfCitiesPerCountry() {
        var countries = [];
        var cities = [];
        var async = $q.defer()
        var urlCall = 'clients.json'

        $http.get(urlCall).then(function (response) {
            for (var i = 0; i < response.data['Customers'].length; i++) {
                var currCity = response.data['Customers'][i]['City'];
                if (cities.indexOf(currCity) === -1) {
                    cities.push(currCity)
                    var newCountry = response.data['Customers'][i]['Country'];
                    countries.push(newCountry)
                    var result = orderByNumOf(countries)
                }
            }
            async.resolve(result);
        }, function (response) {
            console.error(response)
            async.reject([])
        });

        return async.promise;

    }

    function orderByNumOf(countries) {
        var CountriesByNumOfCIty = _.countBy(countries)
        // console.log(CountriesByNumOfCIty);
        keysSorted = Object.keys(CountriesByNumOfCIty).sort(function (a, b) { return CountriesByNumOfCIty[b] - CountriesByNumOfCIty[a] })
        // console.log(keysSorted);
        return keysSorted
    }

    function getCitiesByNumOfCompanies(countryName) {

        var cities = [];
        var companies = [];
        var async = $q.defer()
        var urlCall = 'clients.json'

        $http.get(urlCall).then(function (response) {
            for (var i = 0; i < response.data['Customers'].length; i++) {
                if (response.data['Customers'][i]['Country'] == countryName) {
                    var currCompany = response.data['Customers'][i]['CompanyName'];
                    if (companies.indexOf(currCompany) === -1) {
                        companies.push(currCompany)
                        var newCity = response.data['Customers'][i]['City'];
                        cities.push(newCity)
                        var result = orderByNumOf(cities)
                        // console.log(result);
                    }
                }
            }
            async.resolve(result);
        }, function (response) {
            console.error(response)
            async.reject([])
        });

        return async.promise;

    }

    function getGeo(location) {
        var location = location;
        var async = $q.defer()
        var urlCall = 'https://maps.googleapis.com/maps/api/geocode/json'

        $http.get(urlCall, {
            params: {
                address: location,
                key: 'AIzaSyBrpOj8jzu7qcD-OhqIxZ8pcFZf3KM0oo8'
            }
        }).then(function (response) {
            // console.log(response.data);

            async.resolve(response);
        }, function (response) {
            console.error(response)
            async.reject([])
        });

        return async.promise;

    }

    return {
        loadMyCities: loadMyCities,
        loadMyCompanies: loadMyCompanies,
        getMyAddress: getMyAddress,
        checkNumOfCitiesPerCountry: checkNumOfCitiesPerCountry,
        getCitiesByNumOfCompanies: getCitiesByNumOfCompanies,
        getGeo: getGeo
    }

});