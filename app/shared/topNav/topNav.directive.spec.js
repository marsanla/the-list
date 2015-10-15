'use strict';

describe('Directive: topNav', function () {

    // load the directive's module and view
    beforeEach(module('topNav'));

    var element, scope;

    beforeEach(inject(function ($rootScope) {
        scope = $rootScope.$new();
    }));

    // Create a simple test
    it('should create a top nav with a title', inject(function ($compile) {
        element = angular.element('<top-nav title="test app"></top-nav>');
        element = $compile(element)(scope);
        scope.$apply();
        expect(element.find('h1').text()).toBe('test app');
    }));
});
