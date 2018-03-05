"use strict";

function getData(file) {
    return $.ajax({
        url: file
    });
}

getData("/restaurants.json")
    .then((restarauntArray) => {
        let restaurantList = restarauntArray.restaurants;
        let ratingArray = [];
        let sortedByRating = ratingArray.sort(function (a, b) {
            return a - b;
        });

        function compare(a, b) {
            const ratingA = a.my_rating;
            const ratingB = b.my_rating;

            let comparison = 0;
            if (ratingA < ratingB) {
                comparison = 1;
            } else if (ratingA > ratingB) {
                comparison = -1;
            }
            return comparison;
        }

        console.log("Restaraunt Object, sorted by ratings: ", restarauntArray.restaurants.sort(compare));
        let restarauntByRatingsObj = restarauntArray.restaurants.sort(compare);
        console.log(restarauntByRatingsObj);

        function getCityListData(cityListFile) {
            return $.ajax({
                url: cityListFile
            });
        }

        getCityListData("/cities.json")
            .then((citiesArray) => {
                console.log("test");
                console.log(citiesArray.cities);


                for (let i = 0; i < restarauntByRatingsObj.length; i++) {
                    document.getElementById("restaraunts").innerHTML += `${i + 1}. ${restarauntByRatingsObj[i].restaurant} <br>   `;
                }

                document.getElementById("citiesSelect").innerHTML += `<option value="all">All Cities</option>`;

                for (let i = 0; i < citiesArray.cities.length; i++) {
                    let cityNames = citiesArray.cities;
                    console.log(citiesArray.cities[i].city);
                    document.getElementById("citiesSelect").innerHTML += `<option value="${citiesArray.cities[i].id}">${citiesArray.cities[i].city}</option>`;
                    document.getElementById("addRestarauntCity").innerHTML += `<option value="${citiesArray.cities[i].id}">${citiesArray.cities[i].city}</option>`;

                }

                let citySelectionIdValue = document.getElementsByTagName("option")[0].getAttribute("value");
                var src = document.getElementById("homePic");

                $("#citiesSelect").change(function () {
                    src.innerHTML = ``; //Eliminates home img tag
                    let e = document.getElementById("citiesSelect");
                    let citySelectionValue = e.options[e.selectedIndex].value;
                    console.log(citySelectionValue);
                    document.getElementById("restaraunts").innerHTML = ``;

                    let dropDownSelection = restarauntByRatingsObj.filter(function (restarauntByRatingsObj) {
                        return restarauntByRatingsObj.city_id === Number(citySelectionValue);
                    });

                    if (citySelectionValue === "all") {
                        console.log("this works");

                        for (let i = 0; i < restarauntByRatingsObj.length; i++) {
                            document.getElementById("restaraunts").innerHTML += `${i + 1}. ${restarauntByRatingsObj[i].restaurant} <br>   `;
                        }

                    }
                    else {
                        for (let i = 0; i < dropDownSelection.length; i++) {
                            document.getElementById("restaraunts").innerHTML += `${i + 1}. ${dropDownSelection[i].restaurant} <br>   `;
                        }
                    }

                    if (Number(citySelectionValue) === 7) {
                        src.innerHTML = `<img src="/imHome.jpg">`;
                    }
                });


                let restarauntToAdd = document.getElementById("addRestarauntNameInput");
                let ratingToAdd = document.getElementById("addRatingInput");
                let dateToAdd = document.getElementById("addDateVisitedInput");
                let idToAdd = restarauntByRatingsObj.length + 1;
            });
    });

