'use strict';

describe('Directive: userList', function () {

    // load the directive's module and view
    beforeEach(module('userList'));

    var element, scope;

    beforeEach(inject(function ($rootScope) {
        scope = $rootScope.$new();
    }));

    // Create a simple test
    it('should show empty message', inject(function ($compile) {
        element = angular.element('<user-list></user-list>');
        element = $compile(element)(scope);
        scope.$apply();
        expect(element.find('p').text()).toBe('Upps, there aren\'t contacts.');
    }));

    // Create a simple test
    it('should get list of users', inject(function ($compile) {

        element = angular.element('<user-list users="users"></user-list>');
        element = $compile(element)(scope);
        scope.users = [{
            firstName: 'test',
            lastName: 'user',
            email: 'hello@world.com'
        }];
        scope.$apply();
        expect(element.find('img').attr('alt')).toBe('test user');
    }));
});
