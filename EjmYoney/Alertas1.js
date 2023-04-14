define(["modules/platform/platformModule"], function () {
  angular.module("platformModule").controller("ServiceAlertFormController", [
    "$scope",
    "w6serverServices",
    "$window",

    async function ($scope, w6serverServices, $window) {
      $scope.todos = [
        {
          id: 1,
          title: "Learn AngularJS",
          description: "Learn,Live,Laugh AngularJS",
          done: true,
        },
        {
          id: 2,
          title: "Explore hibernate",
          description: "Explore and use hibernate instead of jdbc",
          done: true,
        },
        {
          id: 3,
          title: "Play with spring",
          description: "spring seems better have a look",
          done: false,
        },
        {
          id: 4,
          title: "Try struts",
          description: "No more labour work..use struts",
          done: false,
        },
        {
          id: 5,
          title: "Try servlets",
          description: "Aah..servlets stack seems cool..why dont u try once",
          done: false,
        },
      ];

      $scope.Opciones = [
        {
          Key: 1199446016,
          Name: "New",
        },
        {
          Key: 1199446017,
          Name: "Acknowledge",
        },
        {
          Key: 1199446018,
          Name: "Not Relevant",
        },
        {
          Key: 857653251,
          Name: "Pending",
        },
        {
          Key: 857653252,
          Name: "Accepted",
        },
        {
          Key: 857653253,
          Name: "Closed",
        },
      ];
      $scope.LastServiceAlert = [];
      $scope.ServiceAlertKeys = [];
      $scope.mensaje = "msg";
      $scope.showLocationsCombo = true;
      $scope.textoUno = "";
      // $scope.Opciones = ["Accepted", "Not Relevant", "Closed"];
      // $scope.arreglo_test = Alerta[Alerta];
      $scope.arreglo = [];
      $scope.items1_1 = [{ a: "bien" }, { b: "mal" }];
      $scope.items1_2 = [{ c: "bien" }, { d: "mal" }];
      $scope.items1 = [{ a: "bien" }, { b: "mal" }];
      var TaskKey = "";
      var TaskCallID = "";
      $scope.serviceAlerts = {
        TaskCallID: "",
        TaskKey: "",
        TasKNumber: "",
      };

      $scope.init = function () {};
      TaskCallID = $scope.formInfo.object.CallID;
      TaskKey = $scope.formInfo.object.Key;
      var ServiceAlertQuery = {
        filter: "ReferencedTask/Key eq " + TaskKey,
      };
      var reqServiceAlerts = w6serverServices.getObjects(
        "ServiceAlert",
        ServiceAlertQuery,
        true
      );
      await reqServiceAlerts.$promise.then(
        async function (ServiceAlertData) {
          $scope.ServiceAlertKeys = ServiceAlertData;
          var ServiceAlertForUpdateQuery = {};
          var nextServiceAlertKey;
          if ($scope.ServiceAlertKeys !== null) {
            for (var j = 0; j < $scope.ServiceAlertKeys.length; j++) {
              // alertas.push($scope.ServiceAlertKeys[j]["Title"]);
              $scope.arreglo.push($scope.ServiceAlertKeys[j]["Title"]);
              nextServiceAlertKey = $scope.ServiceAlertKeys[j].Key;
              //Falta cambiar el service alert status para mostrarlo en la vista dependiendo del que tenga la alerta
              ServiceAlertForUpdateQuery = {
                "@objectType": "ServiceAlert",
                Key: nextServiceAlertKey,
                ServiceAlertStatus: {
                  Name: "Not Relevant", //$scope.ServiceAlertKeys[j].ServiceAlertStatus.@DisplayString
                },
              };

              var resultUpdateSAStatus = w6serverServices.updateObject(
                "ServiceAlert",
                ServiceAlertForUpdateQuery,
                false
              );
              await resultUpdateSAStatus.$promise.then(
                function (data) {
                  console.log(
                    "Se actualizo el estado del service alert " + data
                  );
                },
                function (error) {
                  console.log("Info data error", error);
                  // alert(
                  //   "Failed to update object. Error information: " +
                  //     error.data.ExceptionMessage
                  // );
                }
              );
            }
            $scope.LastServiceAlert = $scope.ServiceAlertKeys[$scope.ServiceAlertKeys.length -1];
            console.log("*********************************************");
            console.log($scope.LastServiceAlert);
          }
        },
        function (error) {
          alert(
            "Failed to update Service Alert object. Error information: " +
              error.ServiceAlertData.ExceptionMessage
          );
          return error;
        }
      );
    },
  ]);
});
