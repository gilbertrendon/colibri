define(['modules/platform/platformModule'], function () {
    angular.module('platformModule')
        .controller('AssistantAllocationController',
            ['$scope', 'w6serverServices', '$location', function ($scope, w6serverServices, $location) {
                //Define parameters and functions of custom controller with the $scope
                populatePanelData();
                function populatePanelData() {
                    //This method populates the data related to Assistant and AssistantAllocation for the engineer

                    var engKey = $scope.formInfo.object.Key;
                    if (engKey == -1)
                        return;

                    //Fetch data
                    $scope.allocations = [];
                    $scope.assistants = [];
                    var queryForAssistant = {
                        filter: "EngineerKey eq " + engKey,
                    };
                    var j = 0;
                    var reqAllocations = w6serverServices.getObjects("AssistantAllocation", queryForAssistant, false);
                    reqAllocations.$promise.then(
                        function (data) {
                            for (var i = 0; i < data.length; i++) {
                                $scope.allocations.push(data[i]);
                                //var reqAssistants = w6serverServices.getObject("Assistant", $scope.allocations[i].RefObject.Key, false);
                                var reqAssistants = w6serverServices.getObject("Assistant", data[i].RefObject.Key, false);
                                reqAssistants.$promise.then(
                                    function (assistantData) {
                                        for (var j = 0; j < $scope.allocations.length; j++) {
                                            if ($scope.allocations[j].RefObject.Key == assistantData.Key) {
                                                $scope.allocations[j].RefObject = assistantData;
                                            }
                                        }

                                        //$scope.allocations[j].RefObject = assistantData;
                                        // $scope.assistants.push(assistantData);
                                        // $scope.allocations[j].RefObject.Name = assistantData.Name;
                                        // $scope.allocations[j].RefObject.ID = assistantData.ID;
                                        //j = j + 1;
                                    },
                                    function (error) {
                                        alert("Failed to update object. assistantData: "
                                            + error.assistantData.ExceptionMessage);
                                    }
                                );
                            }

                        },
                        function (error) {
                            alert("Failed to update object. data: "
                                + error.data.ExceptionMessage);
                        }
                    );
                }

                $scope.editPersonas = function (index) {
                    //This method opens up the Persona form when clicked on the edit image 

                    var assistantKey = $scope.allocations[index].RefObject.Key;
                    if (assistantKey != -1) {
                        if (confirm("El proceso que intenta realizar requiere que este formulario sea cerrado.Asegurese de haber aplicado los cambios efectuados, de lo contrario estos cambios se perderán.¿Desea continuar con el proceso?")) {
                            // Open View
                            var url2 = $location.url() + 'Assistant/' + assistantKey + '/form/';
                            $location.url(url2);

                        } else {
                            // Do Nothing
                        }

                    }
                    else {
                    }
                }

                // $scope.addPersonas = function () {
                //     //This method opens up the new AssistantAllocation form when clicked on the Add button 

                //     var url2 = $location.url() + 'AssistantAllocation/' + 'new/form/';
                //     $location.url(url2);
                // }
                //endregion                   
            }
            ])
});