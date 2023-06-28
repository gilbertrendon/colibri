define(["modules/platform/platformModule"], function () {
  var LastServiceAlert = [];
  var data = {};
  var serviceAlerts = {
    TaskCallID: "",
    TaskKey: "",
    TasKNumber: "",
  };

  angular.module("platformModule").controller("ServiceAlertFormController", [
    "$scope",
    "w6serverServices",
    "$window",

    async function ($scope, w6serverServices, $window) {
      $scope.managementDateToShow = "";
      $scope.actualAction = "";
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
          Key: 857653251,
          Name: "Pending",
        },
        {
          Key: 857653252,
          Name: "Accepted",
        },
        // {
        //   Key: 857653253,
        //   Name: "Closed",
        // },
      ];
      $scope.Acciones = [
        {
          Key: 989003776,
          Name: "Llamar al proveedor",
        },
        {
          Key: 989011968,
          Name: "Llamar al cliente",
        },
      ];
      $scope.LastServiceAlert = [];
      $scope.ServiceAlertKeys = [];
      $scope.mensaje = "msg";
      $scope.showLocationsCombo = true;
      $scope.textoUno = "";
      $scope.arreglo = [];
      $scope.items1_1 = [{ a: "bien" }, { b: "mal" }];
      $scope.items1_2 = [{ c: "bien" }, { d: "mal" }];
      $scope.items1 = [{ a: "bien" }, { b: "mal" }];
      var TaskKey = "";
      var TaskCallID = "";
      $scope.CallIDg = "4444";
      $scope.serviceAlerts = {
        TaskCallID: "1",
        TaskKey: "",
        TasKNumber: "",
      };

      $scope.init = async function () {
        TaskCallID = $scope.formInfo.object.CallID;
        TaskKey = $scope.formInfo.object.Key;
        $scope.CallIDg = TaskCallID;
        var ServiceAlertQuery = {
          filter: "ReferencedTask/Key eq " + TaskKey,
        };
        var reqServiceAlerts = w6serverServices.getObjects(
          "ServiceAlert",
          ServiceAlertQuery,
          false
        );
        await reqServiceAlerts.$promise.then(
          function (ServiceAlertData) {
            data = ServiceAlertData;

            $scope.ServiceAlertKeys = ServiceAlertData;

            if ($scope.ServiceAlertKeys !== null) {
              $scope.LastServiceAlert =
                $scope.ServiceAlertKeys[$scope.ServiceAlertKeys.length - 1];
              $scope.ServiceAlertKeys.pop();

              LastServiceAlert = $scope.LastServiceAlert;
              $scope.selectedState = $scope.LastServiceAlert.ServiceAlertStatus;
            }
            $scope.actualAction =
              LastServiceAlert.FollowUpAction["@DisplayString"];
            if (
              LastServiceAlert.ServiceAlertStatus["@DisplayString"] == "Pending"
            ) {
              $scope.Opciones = [
                {
                  Key: 857653252,
                  Name: "Accepted",
                },
              ];
            } else {
              $scope.Opciones = [];
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
      };

      TaskCallID = $scope.formInfo.object.CallID;
      TaskKey = $scope.formInfo.object.Key;
      $scope.CallIDg = TaskCallID;
      var ServiceAlertQuery = {
        filter: "ReferencedTask/Key eq " + TaskKey,
      };
      var reqServiceAlerts = w6serverServices.getObjects(
        "ServiceAlert",
        ServiceAlertQuery,
        false
      );
      await reqServiceAlerts.$promise.then(
        function (ServiceAlertData) {
          data = ServiceAlertData;

          $scope.ServiceAlertKeys = ServiceAlertData;

          if ($scope.ServiceAlertKeys !== null) {
            $scope.LastServiceAlert =
              $scope.ServiceAlertKeys[$scope.ServiceAlertKeys.length - 1];
            $scope.ServiceAlertKeys.pop();

            LastServiceAlert = $scope.LastServiceAlert;
            $scope.selectedState = $scope.LastServiceAlert.ServiceAlertStatus;
          }
          $scope.actualAction =
            LastServiceAlert.FollowUpAction["@DisplayString"];
          if (
            LastServiceAlert.ServiceAlertStatus["@DisplayString"] == "Pending"
          ) {
            $scope.Opciones = [
              {
                Key: 857653252,
                Name: "Accepted",
              },
            ];
          } else {
            $scope.Opciones = [];
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

      $scope.updating = async function (
        UserManag,
        Coment,
        State,
        actionName,
        actionKey
      ) {
        if(State.Name == "Accepted"){
            State.Key = 857653252;
        }else{
          State.Name = "Accepted";
          State.Key = 857653252;
        }  
        if (
          (LastServiceAlert.ServiceAlertStatus["@DisplayString"] == "Pending" &&
            State.Name == "Accepted") ||
          (LastServiceAlert.ServiceAlertStatus["@DisplayString"] ==
            "Accepted" &&
            State.Name == "Closed")
        ) {
          const numberOfMlSeconds = new Date(Date.now()).getTime();
          var newDateObj = new Date(numberOfMlSeconds);
          var newDateObjj = new Date(numberOfMlSeconds - 18000000);
          const hoyy = new Date(newDateObj);
          const hoy = new Date(hoyy);
          const managemethoy = new Date(newDateObjj);
          const managementD = new Date(managemethoy);
          var fechaInicioo = LastServiceAlert.CreationTime;
          var fechaAcceptedd = LastServiceAlert.managementDate;
          var fechaFinn = hoy;
          var fechaInicio = new Date(fechaInicioo).getTime();
          const numberOfMlSecondss = new Date(fechaAcceptedd).getTime();
          var newDateObjj = new Date(numberOfMlSecondss - 18000000);
          var hoyacc = new Date(newDateObjj);
          var hoyac = new Date(hoyacc);
          var fechaAccepted = new Date(hoyac).getTime();
          var fechaFin = new Date(fechaFinn).getTime();
          var diff = fechaFin - fechaInicio;
          var diff2 = fechaFin - fechaAccepted;
          var ServiceAlertForUpdateQuery = {};
          var nextServiceAlertKey;
          nextServiceAlertKey = LastServiceAlert["Key"];
          $scope.LastServiceAlert.ServiceAlertStatus["@DisplayString"];
          if (
            LastServiceAlert.ServiceAlertStatus["@DisplayString"] ==
              "Pending" &&
            State.Name == "Accepted"
          ) {
            if (
              actionName == "Llamar al proveedor" ||
              actionName == "Llamar al cliente"
            ) {
              ServiceAlertForUpdateQuery = {
                "@objectType": "ServiceAlert",
                Key: nextServiceAlertKey,
                managementDate: managementD,
                notManageTime: Math.trunc(diff / (60 * 1000)), //Estos son los minutos que han pasado sin aceptar la alerta
                ServiceAlertStatus: {
                  Name: State["Name"],
                  Key: State["Key"],
                },
                FollowUpUser: UserManag,
                FollowUpComments: Coment,
                FollowUpAction: {
                  Name: actionName,
                  Key: actionKey,
                },
              };
            } else {
              ServiceAlertForUpdateQuery = {
                "@objectType": "ServiceAlert",
                Key: nextServiceAlertKey,
                managementDate: managementD,
                notManageTime: Math.trunc(diff / (60 * 1000)), //Estos son los minutos que han pasado sin aceptar la alerta
                ServiceAlertStatus: {
                  Name: State["Name"],
                  Key: State["Key"],
                },
                FollowUpUser: UserManag,
                FollowUpComments: Coment,
              };
            }
          } else if (
            LastServiceAlert.ServiceAlertStatus["@DisplayString"] ==
              "Accepted" &&
            State.Name == "Closed"
          ) {
            if (
              actionName == "Llamar al proveedor" ||
              actionName == "Llamar al cliente"
            ) {
              ServiceAlertForUpdateQuery = {
                "@objectType": "ServiceAlert",
                Key: nextServiceAlertKey,
                closeAlert: hoy,
                manageTime: Math.trunc(diff2 / (60 * 1000)), //Estos son los minutos de gestión de la alerta
                ServiceAlertStatus: {
                  Name: State["Name"],
                  Key: State["Key"],
                },
                FollowUpUser: UserManag,
                FollowUpComments: Coment,
                FollowUpAction: {
                  Name: actionName,
                  Key: actionKey,
                },
              };
            } else {
              ServiceAlertForUpdateQuery = {
                "@objectType": "ServiceAlert",
                Key: nextServiceAlertKey,
                closeAlert: hoy,
                manageTime: Math.trunc(diff2 / (60 * 1000)), //Estos son los minutos de gestión de la alerta
                ServiceAlertStatus: {
                  Name: State["Name"],
                  Key: State["Key"],
                },
                FollowUpUser: UserManag,
                FollowUpComments: Coment,
              };
            }
          }

          var resultUpdateSAStatus = w6serverServices.updateObject(
            "ServiceAlert",
            ServiceAlertForUpdateQuery,
            false
          );
          await resultUpdateSAStatus.$promise.then(
            async function (data) {
              var ServiceAlertQuery = {
                filter: "Key eq " + LastServiceAlert.Key,
              };
              var finalresult = w6serverServices.getObjects(
                "ServiceAlert",
                ServiceAlertQuery
              );
              await finalresult.$promise.then(async function (data) {
                LastServiceAlert = data;
                $scope.LastServiceAlert = LastServiceAlert[0];
                $scope.actualAction =
                  $scope.LastServiceAlert.FollowUpAction["@DisplayString"];
              });
            },
            function (error) {
              alert(error);
            }
          );
        } else {
          // alert("Transicion de estados no permitida");
        }
      };
    },
  ]);
});
