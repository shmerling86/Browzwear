app.factory('mySrv', function ($q, $http) {

    const loadMyCities = (countryName) => {
        const cities = [];
        const async = $q.defer()
        const urlCall = 'clients.json'

        $http.get(urlCall).then((response) => {

            for (let i = 0; i < response.data['Customers'].length; i++) {

                if (response.data['Customers'][i]['Country'] === countryName) {
                    let newCity = response.data['Customers'][i]['City'];
                    if (cities.indexOf(newCity) === -1) {
                        newCity = response.data['Customers'][i]['City'];
                        cities.push(newCity);
                    }
                }
            }
            async.resolve(cities);
        }, (response) => {
            console.error(response)
            async.reject([])
        });

        return async.promise;

    }

    const loadMyCompanies = (cityName) => {
        const company = [];
        const async = $q.defer()
        const urlCall = 'clients.json'

        $http.get(urlCall).then((response) => {

            for (let i = 0; i < response.data['Customers'].length; i++) {
                if (response.data['Customers'][i]['City'] === cityName) {
                    let newCompany = response.data['Customers'][i]['CompanyName'];
                    if (company.indexOf(newCompany) === -1) {
                        newCompany = response.data['Customers'][i]['CompanyName'];
                        company.push(newCompany);
                    }
                }
            }
            async.resolve(company);
        }, (response) => {
            console.error(response)
            async.reject([])
        });

        return async.promise;

    }

    const getMyAddress = (CompanyName) => {

        const async = $q.defer()
        const urlCall = 'clients.json'

        $http.get(urlCall).then((response) => {

            for (let i = 0; i < response.data['Customers'].length; i++) {
                if (response.data['Customers'][i]['CompanyName'] === CompanyName) {
                    let street = response.data['Customers'][i]['Address']
                    let city = response.data['Customers'][i]['City']
                    var address = street + ", " + city
                }
            }
            // console.log(address);
            async.resolve(address);
        }, (response) => {
            console.error(response)
            async.reject([])
        });

        return async.promise;

    }

    const checkNumOfCitiesPerCountry = () => {
        const countries = [];
        const cities = [];
        const async = $q.defer()
        const urlCall = 'clients.json'

        $http.get(urlCall).then((response) => {
            for (let i = 0; i < response.data['Customers'].length; i++) {
                let currCity = response.data['Customers'][i]['City'];
                if (cities.indexOf(currCity) === -1) {
                    cities.push(currCity)
                    let newCountry = response.data['Customers'][i]['Country'];
                    countries.push(newCountry)
                    var result = orderByNumOf(countries)
                }
            }
            async.resolve(result);
        }, (response) => {
            console.error(response)
            async.reject([])
        });
        return async.promise;
    }

    const orderByNumOf = (countries) => {
        const CountriesByNumOfCIty = _.countBy(countries)
        keysSorted = Object.keys(CountriesByNumOfCIty).sort((a, b) => { return CountriesByNumOfCIty[b] - CountriesByNumOfCIty[a] })
        return keysSorted
    }

    const getCitiesByNumOfCompanies = (countryName) => {

        const cities = [];
        const companies = [];
        const async = $q.defer()
        const urlCall = 'clients.json'

        $http.get(urlCall).then((response) => {
            for (let i = 0; i < response.data['Customers'].length; i++) {
                if (response.data['Customers'][i]['Country'] == countryName) {
                    let currCompany = response.data['Customers'][i]['CompanyName'];
                    if (companies.indexOf(currCompany) === -1) {
                        companies.push(currCompany)
                        let newCity = response.data['Customers'][i]['City'];
                        cities.push(newCity)
                        var result = orderByNumOf(cities)
                    }
                }
            }
            async.resolve(result);
        }, (response) => {
            console.error(response)
            async.reject([])
        });

        return async.promise;

    }

    const getGeo = (location) => {
         locations = location;
        const async = $q.defer()
        const urlCall = 'https://maps.googleapis.com/maps/api/geocode/json'

        $http.get(urlCall, {
            params: {
                address: locations,
                key: 'AIzaSyBrpOj8jzu7qcD-OhqIxZ8pcFZf3KM0oo8'
            }
        }).then((response) => {
            async.resolve(response);
        }, (response) => {
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