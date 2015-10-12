'use strict';

angular.module('lodash', [])
    .factory('_', function ($window) {
        // remove lodash from global object
        var _ = $window._;
        delete $window._;

        // mixin functions
        _.mixin({'groupFilter': groupFilter});

        return _;

        /**
         * Group an array of objects into several arrays by the given
         * criteria, each group sorted by groupSort, each group consists
         * of items named groupItemsName.
         */
        function groupFilter(data, criteria, groupSort, groupItemsName) {
            if (!data || !data.length) {
                return data;
            }

            groupItemsName = groupItemsName || 'items';

            return _
                .chain(data)
                .sortBy(groupSort)
                .groupBy(criteria)
                .pairs()
                .map(function (currentItem) {
                    return _.object(_.zip(['key', groupItemsName], currentItem));
                })
                .sortBy('key')
                .value();
        }
    });
