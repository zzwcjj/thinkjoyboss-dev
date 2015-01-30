App

    .factory("BridgeService", function ($http, $q, SERVER) {

        return {

            //发送邮件
            getServerList: function () {
                var defer = $q.defer();

                $http.get(SERVER.url.mBrige + "/systems",{})
                    .success(function(data) {
                        defer.resolve(data);
                    })
                    .error(function(err) {
                        defer.reject(err);
                    });

                return  defer.promise;
            },


            getUrlList: function (url,sysCode,pageIndex,pageSize) {
                var defer = $q.defer();
                $http.get(SERVER.url.mBrige + "/url/list",{
                    params : {
                        url : url,
                        sysCode : sysCode,
                        pageIndex : pageIndex,
                        pageSize  : pageSize
                    }
                })
                    .success(function(data) {
                        defer.resolve(data);
                    })
                    .error(function(err) {
                        defer.reject(err);
                    });
                return  defer.promise;
            }
        }
    });