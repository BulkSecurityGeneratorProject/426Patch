(function () {
	'use strict';

	angular
		.module('acmeApp')
		.controller('UserManagementDialogController', UserManagementDialogController);

	UserManagementDialogController.$inject = ['$stateParams', '$uibModalInstance', 'entity', 'User'];

	function UserManagementDialogController($stateParams, $uibModalInstance, entity, User) {
		var vm = this;

		vm.roles = ['ADMIN', 'MANAGER', 'EMPLOYEE', 'USER'];
		vm.clear = clear;
		vm.languages = null;
		vm.save = save;
		vm.user = entity;

		function clear() {
			$uibModalInstance.dismiss('cancel');
		}

		function onSaveSuccess(result) {
			vm.isSaving = false;
			$uibModalInstance.close(result);
		}

		function onSaveError() {
			vm.isSaving = false;
		}

		function save() {
			vm.isSaving = true;
			if (vm.user.id !== null) {
				User.update(vm.user, onSaveSuccess, onSaveError);
			} else {
				vm.user.langKey = 'en';
				User.save(vm.user, onSaveSuccess, onSaveError);
			}
		}
	}
})();