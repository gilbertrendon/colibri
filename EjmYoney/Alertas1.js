define(["modules/platform/platformModule"], function () {
  var todos = [];
  var Opciones = [];
  var LastServiceAlert = [];
  var data = {};
  var ServiceAlertKeys = [];
  var mensaje = "";
  var showLocationsCombo = true;
  var textoUno = "";
  var rreglo = [];
  var items1_1 = [{ a: "bien" }, { b: "mal" }];
  var items1_2 = [{ c: "bien" }, { d: "mal" }];
  var items1 = [{ a: "bien" }, { b: "mal" }];
  var TaskKey = "";
  var TaskCallID = "";
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
        function (ServiceAlertData) {
          data = ServiceAlertData;
          $scope.ServiceAlertKeys = ServiceAlertData;

          if ($scope.ServiceAlertKeys !== null) {
            // for (var j = 0; j < $scope.ServiceAlertKeys.length-2; j++) {
            //   $scope.arreglo.push($scope.ServiceAlertKeys[j]["Title"]);
            // }
            $scope.LastServiceAlert =
              $scope.ServiceAlertKeys[$scope.ServiceAlertKeys.length - 1];
            $scope.ServiceAlertKeys.pop();
            console.log("*********************************************");
            console.log($scope.LastServiceAlert);
            LastServiceAlert = $scope.LastServiceAlert;
            // data.ServiceAlert =
            //   LastServiceAlert[$scope.ServiceAlertKeys.length - 1]["Title"];
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
        UserManag, //Este usuario es el que está logueado para gestionarla
        Detail,
        Coment,
        State
      ) {
        // alert(
        //   "management date:" + UpTimeModified+
        //   "management date:" + UserManag+
        //   "management date:" + Detail+
        //   "management date:" + Coment+
        //   "management date:" + State

        // );
        // console.log("Pending"+LastServiceAlert.ServiceAlertStatus["@DisplayString"],"Accepted"+State.Name,"Closed"+LastServiceAlert.ServiceAlertStatus["@DisplayString"]);
        if (
          (LastServiceAlert.ServiceAlertStatus["@DisplayString"] == "Pending" &&
            State.Name == "Accepted") ||
          (LastServiceAlert.ServiceAlertStatus["@DisplayString"] ==
            "Accepted" &&
            State.Name == "Closed")
        ) {
        // console.log("adfadfasdfadf");
        const tiempoTranscurrido = Date.now();
        const hoy = new Date(tiempoTranscurrido);
        var ServiceAlertForUpdateQuery = {};
        var nextServiceAlertKey;
        nextServiceAlertKey = LastServiceAlert["Key"];
        ServiceAlertForUpdateQuery = {
          "@objectType": "ServiceAlert",
          Key: nextServiceAlertKey,
          managementDate: hoy,
          ServiceAlertStatus: {
            Name: State["Name"],
          },
          FollowUpUser: UserManag,
          Description: Detail,
          FollowUpComments: Coment,
        };

        var resultUpdateSAStatus = w6serverServices.updateObject(
          "ServiceAlert",
          ServiceAlertForUpdateQuery,
          false
        );
        await resultUpdateSAStatus.$promise.then(
          function (data) {
            alert("Se actualizo el estado del service alert " + data);
          },
          function (error) {
            // alert(
            //   "Failed to update object. Error information: " +
            //     error.data.ExceptionMessage
            // );
          }
        );
        window.location.reload();
        }else{
          alert("Transicion de estados no permitida")
          window.location.reload();
        }
      };
    },
  ]);
});
