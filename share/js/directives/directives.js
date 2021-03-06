App

    .directive("tablePaging", function ($http,$rootScope,Util) {
        return {
            restrict: "AE",
            templateUrl: "share/tpl/directives/tabPaging.html",
            transclude: true,
            scope: {
                params: "=",
                url: "=",
                results : "=",
                refresh : "=",
                isSubmit : "=",
                contentType : "@"
            },
            link: function (scope, element, attrs) {

                var resNameArray = element.attr("resultsName").split(".");
                var totalArray   = element.attr("total").split(".");

                scope.pageIndex =  element.attr("pageIndex");
                scope.pageSize =   element.attr("pageSize");
                scope.preName =   element.attr("preName") || "上一页";
                scope.nextName =   element.attr("nextName") || "下一页";
                scope.firstName = element.attr("firstName") || "首页";
                scope.lastName = element.attr("lastName") || "尾页";

                if(scope.preName == "num")
                    scope.preName = "";

                if(scope.nextName == "num")
                    scope.nextName = "";


                var getReName = function(resNameArray,res){

                    for(var i= 0; i<resNameArray.length;i++){
                        if(resNameArray.length == 1){
                            return res[resNameArray[0]];
                        }
                        else if(resNameArray.length == 2){
                            return res[resNameArray[0]][resNameArray[1]]
                        }
                    }

                }



                scope.$watch("refresh",function(newD,oldD){

                    if(newD){
                        scope.pageIndex = 1;
                        loadList(true);
                    }

                });


                var loadList = function (isFirst) {

//                    var index = (scope.pageIndex-1) * scope.pageSize;
                    var index = scope.pageIndex - 1;
                    var  params;
                    if(scope.contentType == "json"){
                        params = scope.params;
                        params.data.pageIndex = index;
                        params.data.pageSize = parseInt(scope.pageSize);

                    }
                    else{
                        params = angular.extend([],{pageIndex:index,pageSize:scope.pageSize},scope.params);
                    }
                    scope.isSubmit = true;

                    if(scope.contentType == "json"){

                        $http.post(scope.url,params
                        ,{headers:{"is-json-data":1}})
                        .success(function (res) {

                            //加载结果集
                            scope.results = getReName(resNameArray,res);

                            if(isFirst){
                                //分页
                                scope.pageTotal = getReName(totalArray,res);
                                Util.caclTotal(scope);
                            }
                            scope.isSubmit = false;

                        })
                        .error(function () {
                            $rootScope.alertError("网络错误！");
                            scope.isSubmit = false;
                        });


                    }
                    else{

                        $http.get(scope.url, {
                            params:  params
                        })

                            .success(function (res) {

                                //加载结果集
                                scope.results = getReName(resNameArray,res);


                                if(isFirst){
                                    //分页
                                    scope.pageTotal = getReName(totalArray,res);
                                    Util.caclTotal(scope);
                                }

                                scope.isSubmit = false;


                            })
                            .error(function () {
                                $rootScope.alertError("网络错误！");
                                scope.isSubmit = false;
                            });

                    }




                    scope.refresh = false;

                }

                loadList(true);


                var $page = element.find(".pager");

                //首页
                $page.find(".first > button").click(function(){
                    Util.calcPage(scope,"first");
                    loadList();
                });

                //上一页
                $page.find(".previous > button").click(function(){
                    Util.calcPage(scope,"prev");
                    loadList();
                });

                //下一页
                $page.find(".next > button").click(function(){
                    Util.calcPage(scope,"next");
                    loadList();

                });

                //尾页
                $page.find(".last > button").click(function(){
                    Util.calcPage(scope,"last");
                    loadList();
                });

            }
        }
    })


.directive("jsonFormat", function ($http,$rootScope,Util) {

    return {
        restrict: "AE",
        transclude: true,
        scope: {
            json  : "=",
            error : "="
        },
        link: function (scope,element, attrs) {
            var newV = scope.json;
            var result = "";
            if(newV){
                try {

                    if(newV == "null"){
                        newV =  {};
                    }
                    else if( typeof newV == "string"){

                        newV =  JSON.stringify(JSON.parse(newV));
                    }
                    else{
                        newV =  JSON.stringify(newV);
                    }

                    result = jsonlint.parse(newV);
                    var  vk = JSON.stringify(result, null, "  ");
                    element.val(vk);
                    element.trigger("input");

                } catch(e) {
                    var str = JSON.stringify(e.message);
                    console.log(e);
                }

            }


//                scope.$watch("json",function(newV,oldVal){
//
//
//                });

        }
    }

})




