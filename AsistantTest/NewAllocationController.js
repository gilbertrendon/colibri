define(['modules/platform/platformModule'], function () {
    angular.module('platformModule')
        .controller('NewAllocationController',
            ['$rootScope', '$scope', 'w6serverServices', '$location', '$filter', '$q', function ($rootScope, $scope, w6serverServices, $location, $filter, $q) {
                //Define parameters and functions of custom controller with the $scope
                var new_ST;
                var new_FT;
                var new_Engineer = '';
                var new_Company = '';
                var new_RefObject = '';
                var myStr = $location.url();
                $scope.allAllocations = [];

                var subStr = myStr.match("Assistant/(.*)/form/AssistantAllocation");
                var subStr2 = subStr[1].match(/\d+/g);
                if (subStr2 != null)
                    var assistantKey = subStr2[0];

                if (!isNaN(assistantKey)) {
                    var reqAssistant = w6serverServices.getObject("Assistant", assistantKey, false);
                    reqAssistant.$promise.then(
                        function (asstData) {
                            $scope.formInfo.object.RefObject = asstData;
                        },
                        function (error) {
                            alert("Failed to update object. data: "
                                + error.data.ExceptionMessage);
                        }
                    );
                }

                if (assistantKey != undefined) {
                    var exisAllQuery = {
                        filter: "RefObject/Key eq " + assistantKey,
                    }

                    var reqExistingAllocations = w6serverServices.getObjects("AssistantAllocation", exisAllQuery, false);
                    reqExistingAllocations.$promise.then(
                        function (allocationData) {
                            $scope.allAllocations = allocationData;
                        },
                        function (error) {
                            alert("Failed to update object. data: "
                                + error.data.ExceptionMessage);
                        }
                    );
                }

                $scope.formInfo.beforeApplyClick = function () {

                    var counter = 0;
                    var counter_abs = 0;
                    var ST = $scope.formInfo.object.StartTime;
                    var FT = $scope.formInfo.object.FinishTime;

                    if (FT != undefined) {
                        var res = FT.substring(0, 11);
                        FT = res + "23:59:00";
                    }

                    var df2 = 'yyyy-MM-dd' + 'T' + '00:00:00';
                    var today = $filter('date')(new Date(), df2);

                    //Validations Start

                    if (ST < today) {
                        //if(($filter('date')(ST, 'MM/dd/yyyy')) < ($filter('date')(today, 'MM/dd/yyyy'))){
                        if ($scope.formInfo.object.Key == "new" || $scope.formInfo.object.Key == -1) {
                            alert("Fecha de inicio menor que hoy");
                            var defer = $q.defer();
                            defer.reject();
                            return defer.promise;
                        }
                    }
                    if ($scope.formInfo.object.Key == "new" || $scope.formInfo.object.Key == -1) {
                        if (FT < today) {
                            //if(($filter('date')(FT, 'MM/dd/yyyy')) < ($filter('date')(today, 'MM/dd/yyyy'))){
                            alert("Fecha de fin menor que hoy");
                            var defer = $q.defer();
                            defer.reject();
                            return defer.promise;
                        }
                    } else {
                        var xyz5 = $filter('date')(today, 'MM/dd/yyyy');
                        var myDate5 = new Date(xyz5);
                        var res5 = new Date(myDate5.getTime() - 1 * 24 * 60 * 60 * 1000);
                        today = $filter('date')(res5, df2);
                        if (FT < today) {
                            //if(($filter('date')(FT, 'MM/dd/yyyy')) < ($filter('date')(today, 'MM/dd/yyyy'))){
                            alert("Fecha de fin menos que ayer");
                            var defer = $q.defer();
                            defer.reject();
                            return defer.promise;
                        }
                    }

                    if (ST == "1899-12-30T00:00:00" || ST == undefined) {
                        alert("Fecha de inicio no ingresada");
                        var defer = $q.defer();
                        defer.reject();
                        return defer.promise;

                    }

                    if (FT == "1899-12-30T00:00:00" || FT == undefined) {
                        alert("Fecha de fin no ingresada");
                        var defer = $q.defer();
                        defer.reject();
                        return defer.promise;

                    }

                    if (FT < ST) {
                        alert("Período de fechas inválido.");
                        var defer = $q.defer();
                        defer.reject();
                        return defer.promise;
                    }

                    if (!$scope.formInfo.object.Absence) {
                        for (var i = 0; i < $scope.allAllocations.length; i++) {
                            if ($scope.allAllocations[i].Key != $scope.formInfo.object.Key) {
                                //Checking if other allocations overlap
                                if ((ST >= $scope.allAllocations[i].StartTime && ST <= $scope.allAllocations[i].FinishTime) || (FT >= $scope.allAllocations[i].StartTime && FT <= $scope.allAllocations[i].FinishTime)) {
                                    if ($scope.allAllocations[i].Absence) {
                                        counter_abs = counter_abs + 1;
                                        break;
                                    } else {
                                        counter = counter + 1;
                                        break;
                                    }

                                }
                            }
                        }

                        if (counter > 0) {
                            //There is currently an assignment to a gang that overlaps with the assignment you are trying to create
                            alert("Actualmente existe una asignación a una cuadrilla que se solapa con la asignación que esta intentado crear");
                            var defer = $q.defer();
                            defer.reject();
                            return defer.promise;
                        }

                        if (counter_abs > 0) {
                            //There is currently an absence that overlaps with the gang assignment that you are trying to create
                            alert("Actualmente se existe una ausencia que se solapa con la asignación de cuadrilla que esta intentado crear");
                            var defer = $q.defer();
                            defer.reject();
                            return defer.promise;
                        }
                    }

                    //Validations End
                }


                $scope.formInfo.beforeOKClick = function () {
                    var counter = 0;
                    var counter_abs = 0;
                    var ST = $scope.formInfo.object.StartTime;
                    var FT = $scope.formInfo.object.FinishTime;

                    if (FT != undefined) {
                        var res = FT.substring(0, 11);
                        FT = res + "23:59:00";
                    }

                    var df2 = 'yyyy-MM-dd' + 'T' + '00:00:00';
                    var today = $filter('date')(new Date(), df2);

                    //Validations Start

                    if (ST < today) {
                        //if(($filter('date')(ST, 'MM/dd/yyyy')) < ($filter('date')(today, 'MM/dd/yyyy'))){
                        if ($scope.formInfo.object.Key == "new" || $scope.formInfo.object.Key == -1) {
                            alert("Fecha de inicio menor que hoy");
                            var defer = $q.defer();
                            defer.reject();
                            return defer.promise;
                        }
                    }

                    if ($scope.formInfo.object.Key == "new" || $scope.formInfo.object.Key == -1) {
                        if (FT < today) {
                            //if(($filter('date')(FT, 'MM/dd/yyyy')) < ($filter('date')(today, 'MM/dd/yyyy'))){
                            alert("Fecha de fin menor que hoy");
                            var defer = $q.defer();
                            defer.reject();
                            return defer.promise;
                        }
                    } else {
                        var xyz5 = $filter('date')(today, 'MM/dd/yyyy');
                        var myDate5 = new Date(xyz5);
                        var res5 = new Date(myDate5.getTime() - 1 * 24 * 60 * 60 * 1000);
                        today = $filter('date')(res5, df2);
                        if (FT < today) {
                            //if(($filter('date')(FT, 'MM/dd/yyyy')) < ($filter('date')(today, 'MM/dd/yyyy'))){
                            alert("Fecha de fin menos que ayer");
                            var defer = $q.defer();
                            defer.reject();
                            return defer.promise;
                        }
                    }


                    if (ST == "1899-12-30T00:00:00" || ST == undefined) {
                        alert("Fecha de inicio no ingresada");
                        var defer = $q.defer();
                        defer.reject();
                        return defer.promise;

                    }

                    if (FT == "1899-12-30T00:00:00" || FT == undefined) {
                        alert("Fecha de fin no ingresada");
                        var defer = $q.defer();
                        defer.reject();
                        return defer.promise;

                    }

                    if (FT < ST) {
                        alert("Período de fechas inválido.");
                        var defer = $q.defer();
                        defer.reject();
                        return defer.promise;
                    }

                    //Validations End

                    if (!$scope.formInfo.object.Absence) {
                        for (var i = 0; i < $scope.allAllocations.length; i++) {
                            if ($scope.allAllocations[i].Key != $scope.formInfo.object.Key) {
                                //Checking if other allocations overlap
                                if ((ST >= $scope.allAllocations[i].StartTime && ST <= $scope.allAllocations[i].FinishTime) || (FT >= $scope.allAllocations[i].StartTime && FT <= $scope.allAllocations[i].FinishTime)) {
                                    if ($scope.allAllocations[i].Absence) {
                                        counter_abs = counter_abs + 1;
                                        break;
                                    } else {
                                        counter = counter + 1;
                                        break;
                                    }

                                }
                            }
                        }

                        if (counter > 0) {
                            //There is currently an assignment to a gang that overlaps with the assignment you are trying to create
                            alert("Actualmente existe una asignación a una cuadrilla que se solapa con la asignación que esta intentado crear");
                            var defer = $q.defer();
                            defer.reject();
                            return defer.promise;
                        }

                        if (counter_abs > 0) {
                            //There is currently an absence that overlaps with the gang assignment that you are trying to create
                            alert("Actualmente se existe una ausencia que se solapa con la asignación de cuadrilla que esta intentado crear");
                            var defer = $q.defer();
                            defer.reject();
                            return defer.promise;
                        }

                        // for(var i = 0 ; i< $scope.allAllocations.length; i++){  
                        //   if($scope.allAllocations[i].Absence){
                        //       if((ST <= $scope.allAllocations[i].StartTime && ST <= $scope.allAllocations[i].FinishTime) || (FT >= $scope.allAllocations[i].StartTime && FT >= $scope.allAllocations[i].FinishTime)){
                        //             counter2 = counter2 + 1;
                        //               break;
                        //            alert("Absence Request already exists for the selected time period");
                        //       }
                        //   }
                        // }

                    }
                    else {
                        //create/edit absence request
                        for (var i = 0; i < $scope.allAllocations.length; i++) {
                            if ((ST > $scope.allAllocations[i].StartTime && ST < $scope.allAllocations[i].FinishTime) && (FT > $scope.allAllocations[i].StartTime && FT < $scope.allAllocations[i].FinishTime)) {
                                //between the dates

                                //create new assistant allocation with StartTime as FT+ 1 day and FinishTime as new_FT
                                var xyz1 = $filter('date')($scope.allAllocations[i].FinishTime, 'MM/dd/yyyy HH:mm:ss');
                                var myDate1 = new Date(xyz1);
                                var res1 = new Date(myDate1.getTime());
                                var df1 = 'yyyy-MM-dd' + 'T' + 'hh:mm:ss';
                                new_FT = ($filter('date')(res1, df1)).substring(0, 11) + "00:00:00";
                                //new_FT = $scope.allAllocations[i].FinishTime;

                                var xyz1 = $filter('date')(FT, 'MM/dd/yyyy HH:mm:ss');
                                var myDate1 = new Date(xyz1);
                                var res1 = new Date(myDate1.getTime() + 1 * 24 * 60 * 60 * 1000);
                                var df1 = 'yyyy-MM-dd' + 'T' + 'hh:mm:ss';
                                new_ST = ($filter('date')(res1, df1)).substring(0, 11) + "00:00:00";
                                new_Engineer = $scope.allAllocations[i].Engineer;
                                new_RefObject = $scope.allAllocations[i].RefObject;


                                //Updating the existing allocation
                                //$scope.allAllocations[i].FinishTime =  ST - one day; //update db

                                var xyz = $filter('date')(ST, 'MM/dd/yyyy HH:mm:ss');
                                var myDate = new Date(xyz);
                                var res = new Date(myDate.getTime() - 1 * 24 * 60 * 60 * 1000);
                                var df = 'yyyy-MM-dd' + 'T' + 'hh:mm:ss';
                                var result = $filter('date')(res, df);

                                $scope.allAllocations[i].FinishTime = result.substring(0, 11) + "23:59:00";
                                //$scope.allAllocations[i].FinishTime = result.substring(0, 11) + "00:00:00";

                                var updateAllocQuery = {
                                    "@objectType": "AssistantAllocation",
                                    Key: $scope.allAllocations[i].Key, //Key of AssistantAllocation object
                                    FinishTime: $scope.allAllocations[i].FinishTime
                                }

                                var resultAllocationObj = w6serverServices.updateObject("AssistantAllocation", updateAllocQuery, false)
                                resultAllocationObj.$promise.then(
                                    function (data) {
                                        //Do nothing
                                        //Create new asslocation with new dates

                                        var alloc = {
                                            "@objectType": "AssistantAllocation", //"@objectType" must be the first attribute.
                                            StartTime: new_ST,
                                            FinishTime: new_FT,
                                            EngineerKey: new_Engineer.Key,
                                            Engineer: {
                                                Key: new_Engineer.Key,
                                            },
                                            RefObject: {
                                                Key: new_RefObject.Key,
                                            }
                                        }

                                        var createAllocation = w6serverServices.createObject("AssistantAllocation", alloc, false);
                                        createAllocation.$promise.then(
                                            function (newAllocData) {
                                            },
                                            function (error) {
                                                alert(error + "No hay conexión con el servidor.");
                                            }
                                        );
                                    },
                                    function (error) {
                                        alert("Failed to update object. Error information: "
                                            + error.data.ExceptionMessage);
                                    }
                                );
                            }
                            if ($scope.formInfo.object.Key != $scope.allAllocations[i].Key) {
                                if ((ST <= $scope.allAllocations[i].StartTime) && (FT < $scope.allAllocations[i].FinishTime && FT > $scope.allAllocations[i].StartTime)) {
                                    //Left side
                                    //$scope.allAllocations[i].StartTime = FT + one day;
                                    //alert("Left side");

                                    var xyz = $filter('date')(FT, 'MM/dd/yyyy');
                                    var myDate = new Date(xyz);
                                    var res = new Date(myDate.getTime() + 1 * 24 * 60 * 60 * 1000);
                                    var df = 'yyyy-MM-dd' + 'T' + 'hh:mm:ss';
                                    var result = $filter('date')(res, df);
                                    $scope.allAllocations[i].StartTime = result.substring(0, 11) + "00:00:00";

                                    var updateAllocQuery = {
                                        "@objectType": "AssistantAllocation",
                                        Key: $scope.allAllocations[i].Key, //Key of AssistantAllocation object
                                        StartTime: $scope.allAllocations[i].StartTime
                                    }

                                    var resultAllocationObj = w6serverServices.updateObject("AssistantAllocation", updateAllocQuery, false)
                                    resultAllocationObj.$promise.then(
                                        function (data) {
                                            //Do nothing
                                        },
                                        function (error) {
                                            alert("Failed to update object. Error information: "
                                                + error.data.ExceptionMessage);
                                        }
                                    );
                                }
                            }
                            if ($scope.formInfo.object.Key != $scope.allAllocations[i].Key) {
                                if ((ST > $scope.allAllocations[i].StartTime && ST < $scope.allAllocations[i].FinishTime) && (FT >= $scope.allAllocations[i].FinishTime)) {
                                    //Right side
                                    //$scope.allAllocations[i].FinishTime = ST - one day;
                                    //alert("Right side");

                                    var xyz = $filter('date')(ST, 'MM/dd/yyyy');
                                    var myDate = new Date(xyz);
                                    var res = new Date(myDate.getTime() - 1 * 24 * 60 * 60 * 1000);
                                    var df = 'yyyy-MM-dd' + 'T' + 'hh:mm:ss';
                                    var result = $filter('date')(res, df);
                                    $scope.allAllocations[i].FinishTime = result.substring(0, 11) + "23:59:00";

                                    var updateAllocQuery = {
                                        "@objectType": "AssistantAllocation",
                                        Key: $scope.allAllocations[i].Key, //Key of AssistantAllocation object
                                        FinishTime: $scope.allAllocations[i].FinishTime
                                    }

                                    var resultAllocationObj = w6serverServices.updateObject("AssistantAllocation", updateAllocQuery, false)
                                    resultAllocationObj.$promise.then(
                                        function (data) {
                                            //Do nothing
                                        },
                                        function (error) {
                                            alert("Failed to update object. Error information: "
                                                + error.data.ExceptionMessage);
                                        }
                                    );
                                }
                            }
                            if ($scope.formInfo.object.Key != $scope.allAllocations[i].Key) {
                                if ((ST == $scope.allAllocations[i].StartTime && FT == $scope.allAllocations[i].FinishTime) || (ST == $scope.allAllocations[i].StartTime && FT > $scope.allAllocations[i].FinishTime)
                                    || (FT == $scope.allAllocations[i].FinishTime && $scope.allAllocations[i].StartTime > ST) || (ST < $scope.allAllocations[i].StartTime && FT > $scope.allAllocations[i].FinishTime)) {
                                    //alert("AR overlapping Allocation");
                                    var resultAllocationObj = w6serverServices.deleteObject("AssistantAllocation", $scope.allAllocations[i].Key, false)
                                    resultAllocationObj.$promise.then(
                                        function (data) {
                                            //Do nothing
                                        },
                                        function (error) {
                                            alert("Failed to update object. Error information: "
                                                + error.data.ExceptionMessage);
                                        }
                                    );
                                }
                            }
                        }
                    }
                }

                //endregion                   
            }])
});