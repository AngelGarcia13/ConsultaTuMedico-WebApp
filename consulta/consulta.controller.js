(function() {
'use strict';

    angular
        .module('consulta')
        .controller('ConsultaController', ConsultaController);

    ConsultaController.$inject = ['MedicosService', '$mdDialog'];
    function ConsultaController(MedicosService, $mdDialog) {
        var vm = this;
        var alert;
        vm.formulario = {
            medicoName: ''
        };
        vm.dataFromServer = [];
        vm.buscarMedicos = buscarMedicos;
        vm.titulo = 'Procesando petición.';
        vm.loadingData = false;
        vm.dataLoaded = false;

        function buscarMedicos() {
            //Validate the input is not empty, show native error
            if(vm.formulario.medicoName == undefined){
                vm.formulario.medicoName = '';
            }
            if (vm.formulario.medicoName.toString().trim().length > 2) {
                vm.dataLoaded = true;
                showLoading();
                MedicosService.getMedicosByName(vm.formulario.medicoName)
                .then(function(data) {
                    console.log(data);
                    vm.dataFromServer = data;
                    if(data.length <= 0){
                        showAlert("Oops", "No se encontraron resultados")
                    }
                    hideLoading();
                }).catch(function (data) {
                    console.log("Error: " + data);
                    hideLoading();
                    showAlert("Oops", "Ha ocurrido un error, revise su conexión");
                });
                    
            }else{
                showAlert("Oops", "Favor introduzca el nombre del médico, mínimo 3 caracteres");
            }
        }
        
        function showLoading() {
            //Show loading
            vm.loadingData = true;
            vm.titulo = 'Procesando petición.';
        }
        
        function hideLoading() {
            //Hide loading
            vm.loadingData = false;
            vm.titulo = 'Resultados de la consulta.';
        }
        
        function showAlert(title, body) {
            alert = $mdDialog.alert({
                title: title,
                textContent: body,
                ok: 'OK'
            });
            $mdDialog
                .show( alert )
                .finally(function() {
                alert = undefined;
                });
        }
    }
})();