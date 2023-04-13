var a = "gilber";
define(["modules/platform/platformModule"], function () {
  angular.module("platformModule").controller("ServiceAlertFormController", [
    "$scope",
    "w6serverServices",
    "$window",
    function ($scope, w6serverServices, $window) {
      $scope.mensaje = "Yoney Arias";
      $scope.showLocationsCombo = true;
      $scope.textoUno = "";
      $scope.Opciones = ["Santa Marta", "Medellín", "Bogotá"];

      $scope.serviceAlerts = {
        TaskCallID: "",
        TaskKey: "",
        TasKNumber: "",
      };

      //onsole.log($scope.serviceAlerts);

      /* Init */
      //Función Sincronica
      $scope.init = function () {
        var TaskCallID = $scope.formInfo.object.CallID;
        var TaskKey = $scope.formInfo.object.Key;
        var ServiceAlertQuery = {
          filter: "ReferencedTask/Key eq " + TaskKey,
        };
        var TasKNumber = $scope.formInfo.object.Number;
        var TasKDistrict = $scope.formInfo.object.District;
        var reqServiceAlerts = w6serverServices.getObjects(
          "ServiceAlert",
          ServiceAlertQuery,
          true
        );
        var a = "control";
        console.log(reqServiceAlerts);
        // reqServiceAlerts = 'https://fse-na-sb.cloud.clicksoftware.com/SO/API/Objects/ServiceAlert?filter=ReferencedTask/Key%20eq%471351296';

        //https://fse-na-sb.cloud.clicksoftware.com/SO/API/Objects/ServiceAlert?filter=ReferencedTask/Key%20eq%000305452269;
        // https://fse-na-sb.cloud.clicksoftware.com/SO/API/Objects/Task?$filter=CallID%20eq%000305452269
        reqServiceAlerts.$promise.then(
          function (ServiceAlertData) {
            console.log("Resultado ", ServiceAlertData);
            //En la variable scope.ServiceAlertKeys se carga todas las alertas
            $scope.ServiceAlertKeys = ServiceAlertData;
            console.log("*******************************")
            console.log($scope.ServiceAlertKeys)
            if ($scope.ServiceAlertKeys !== null) {
              for (var j = 0; j < $scope.ServiceAlertKeys.length; j++) {
                // var nextPartOrderStatusForbidden = $scope.ServiceAlertKeys[j].ToOrderStatus;
                var nextServiceAlertKey = $scope.ServiceAlertKeys[j];
                // if ($scope.nextAvailableTransitionKeys.includes(nextPartOrderStatusForbidden)) {
                //   var index = $scope.nextAvailableTransitionKeys.indexOf(nextPartOrderStatusForbidden);
                // $scope.nextAvailableTransitionKeys.splice(index, 1);
                //    }
              }
            }
          },
          function (error) {
            alert(
              "Failed to update Service Alert object. Error information: " +
                error.ServiceAlertData.ExceptionMessage
            );
          }
        );
      };
    },
  ]);
});
