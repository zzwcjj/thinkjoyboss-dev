App

    .controller("ClassCtrl", function ($rootScope, $scope, $state, $window, $log, $q, $timeout, ClassService,Util, SERVER) {

        console.log("class....");

        //班级信息
        $scope.classMsgPosts = [];

        //每页显示信息数量
        $scope.pageSize = 10;


        $scope.classInfo = "";

        $scope.busy = false;

        $scope.isFirst = true;

        //form
        $scope.fm = {
            classCode : "14100"
        }

        var  msgPic  = [
            "http://i2.tietuku.com/030735a8a54241c9.jpg",
            "http://i2.tietuku.com/7955f088b5561205.jpg",
            "http://i2.tietuku.com/947d4df5ea8c7434.jpg",
            "http://i2.tietuku.com/43ce0a6e07897c7d.jpg"
        ]

        //查询班级信息
        var loadClassMg = function(classCode,type,pageSize){
            pageSize = pageSize || $scope.pageSize;
            if(type == "all"){
                ClassService.getClassMessageInfoByCode(classCode,pageSize).then(function(res){


                    $scope.classMsgPosts  = $scope.classMsgPosts.concat(res.bizData);

//                    for( var i =0 ;  i<$scope.classMsgPosts.length;i++){
//                        $scope.classMsgPosts[i].messageInfo.messagePics =  msgPic;
//                    }

                    $scope.isFirst= false;
                    $scope.busy = false;


                },function(){

                    $scope.isFirst= false;
                    $scope.busy = false;

                });
            }

        }

        var loadClassInfo = function(classCode){
            ClassService.getClassInfo(classCode).then(function(res){
                $scope.classInfo  =  res.bizData;
            },function(){

            });
        }


        //查询班级
         $scope.searchClass = function(){
             console.log("search...");
             loadClassMg($scope.fm.classCode,"all",$scope.pageSize);
             loadClassInfo($scope.fm.classCode);

        }


        $scope.loadMore = function(){

            if(!$scope.isFirst){

                console.log("load more..");
                if ($scope.busy) return;
                    $scope.busy = true;
                loadClassMg($scope.fm.classCode,"all",$scope.pageSize);

            }

        }













    });