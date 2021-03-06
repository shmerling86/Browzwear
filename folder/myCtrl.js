app.controller('myCtrl', function (mySrv, $scope) {

    $scope.locationOfCompany = [];
    const initialize = (loc) => {

        $scope.locationOfCompany = [
            { lat: 44.0284944, lng: -123.0731791 },
        ];

        if (loc) {
            $scope.locationOfCompany.splice(0, 1, loc);
        }

        $scope.map = new google.maps.Map(document.getElementById('map'), {
            zoom: 20,
            center: $scope.locationOfCompany[0]
        });

        const marker = new google.maps.Marker({
            position: new google.maps.LatLng($scope.locationOfCompany[0].lat, $scope.locationOfCompany[0].lng),
            map: $scope.map
        });


        google.maps.event.addListener(marker, 'click', ((marker, content) => {
            return () => {
                $scope.infowindow.setContent(content);
                $scope.infowindow.open($scope.map, marker);
            };
        })(marker, $scope));

    };
    initialize()


    google.maps.event.addDomListener(window, 'load', initialize);

    // // //LOAD LISTS // // // // // // // // // // // // // // // // // // // // // // // // // // 
    $scope.countries = []
    mySrv.checkNumOfCitiesPerCountry().then((countries) => {
        $scope.countries = countries
    });

    $scope.cities = [];
    mySrv.loadMyCities("USA").then((cities) => {
        $scope.cities = cities
    });

    $scope.companies = [];
    mySrv.loadMyCompanies("Eugene").then((companies) => {
        $scope.companies = companies
    });

    // // // LISTS BY CLICK// // // // // // // // // // // // // // // // // // // // // // // // // // // // 

    $scope.showMyCities = (countryName) => {
        $scope.cities = [];
        mySrv.getCitiesByNumOfCompanies(countryName).then((cities) => {
            $scope.cities = cities
        });
    }

    $scope.showMyCompanies = (city) => {
        $scope.companies = [];
        mySrv.loadMyCompanies(city).then((companies) => {
            $scope.companies = companies
        });
    }

    // // //ACTIVE MARK // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // 

    $scope.selected = 0;
    $scope.selectedCity = 0;
    $scope.selectedCompany = 0;

    $scope.select = (index) => {
        $scope.selected = index;
    };

    $scope.selectCity = (index) => {
        $scope.selectedCity = index;
    };

    $scope.selectCompany = (index) => {
        $scope.selectedCompany = index;
    };

    // // // GET THE CLICKED COMPANY ADDRESS // // // // // // // // // // // // // // // // // // // // // // // 

    $scope.getMyAddress = (company) => {

        mySrv.getMyAddress(company).then((location) => {

            mySrv.getGeo(location).then((response) => {
                $scope.locationOfCompany = response.data.results[0].geometry.location;
                initialize($scope.locationOfCompany)

            });
        });
    }
});