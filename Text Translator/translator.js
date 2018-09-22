var url = "https://translate.yandex.net/api/v1.5/tr.json/";
var apiKey = "trnsl.1.1.20180922T003145Z.15d942b688933f9c.a3c24dbeab469786aad20c45e52146c5282921a6";


angular.module('transApp', [])

    .controller('transController', function ($scope, $http) {
        $scope.outputText = "";
        $scope.langs = Array({key:"", value:""});
        $scope.init = function() {
            var handler0 = $http.get(url + "getLangs" +
                "?key=" + apiKey +
                "&ui=en");
            handler0.success(function (data) {
                if (data != null && data.langs != null && data.langs !== undefined) {
                    $scope.langs = Object.keys(data.langs).map(function (k) {
                        $scope.isLoading = false;
                        var i = data.langs[k];
                        return {key: k, value: i}
                    })
                }
            });
        };

        $scope.translate = function () {
            var sourceText = document.getElementById("source").value;
            var sourceLang = document.getElementById("lang_from").value;
            var dstLang = document.getElementById("lang_to").value;
            if (sourceLang !== "") {
                sourceLang += "-";
            }
            if (sourceText != null && sourceText !== "") {
                var handler = $http.get(url + "translate" +
                    "?key=" + apiKey +
                    "&text=" + sourceText +
                    "&lang=" + sourceLang + dstLang);
                handler.success(function (data) {
                    $scope.outputText = data.text[0];
                });
                handler.error(function (data) {
                    alert("There was some error processing your request. Please try after some time.");
                });
            }
        };
    });


