'use strict';

/**
 * Config for the router
 */
App
  .run(
    [          '$rootScope', '$state', '$stateParams',
      function ($rootScope,   $state,   $stateParams) {
          $rootScope.$state = $state;
          $rootScope.$stateParams = $stateParams;        
      }
    ]
  )



    .config(
    [          '$stateProvider', '$urlRouterProvider',
      function ($stateProvider,   $urlRouterProvider) {

          $urlRouterProvider
              .otherwise('/app/home');

          $stateProvider

              .state('app', {
                  abstract: true,
                  url: '/app',
                  templateUrl: 'share/tpl/app.html'
              })

              //首页
              .state('app.home', {
                  url: '/home',
                  templateUrl: 'boss/tpl/home/home.html',
                  controller: "HomeCtrl as home"
              })



              //学校管理
              .state("app.school", {
                  url: "/school",
                  templateUrl: "boss/tpl/school/school.html",
                  controller: "SchoolCtrl"
              })



              //基础审核
              .state("app.audit",{
                  url : "/audit",
                  abstract : true,
                  templateUrl : "boss/tpl/audit/audit.html",
                  controller : "AuditCtrl"


              })

              //审核学校
              .state("app.audit.school",{
                  url : "/school",

                  "views" : {
                      "audit-school":{
                          templateUrl : "boss/tpl/audit/audio_school.html",
                          controller : "AuditSchoolCtrl"
                      }
                  }

              })

              //审核班级
              .state("app.audit.class",{
                  url : "/class",
                  "views" : {
                      "audit-class":{
                          templateUrl : "boss/tpl/audit/audio_class.html",
                          controller : "AuditClassCtrl"
                      }
                  }


              })

              //审核科目
              .state("app.audit.subject",{
                  url : "/subject",
                  "views" : {
                      "audit-subject":{
                          templateUrl : "boss/tpl/audit/audio_subject.html",
                          controller : "AuditSubjectCtrl"
                      }
                  }
              })


              .state("app.user", {
                  url: "/user",
                  templateUrl: "boss/tpl/user/userManager.html",
                  controller: "UserCtrl as test"
              })

              .state("app.sms", {
                  url: "/sms",
                  templateUrl: "boss/tpl/message/sms/smsQuery.html",
                  controller: "SMSCtrl"
              })

              .state("app.feedback", {
                  url: "/feedback",
                  templateUrl: "boss/tpl/message/feedback/feedbackQuery.html",
                  controller: "FeedbackCtrl"
              })




             //sop 路由部分
              .state("app.sop", {
                  abstract: true,
                  url : "/sop",
                  templateUrl : "sop/tpl/sop.html"

              })
              //地域分布图
              .state("app.sop.userMap", {
                  url : "/userMap",
                  templateUrl : "sop/tpl/userMap.html",
                  controller : "userMapCtrl"
              })
              //7日趋势图
              .state("app.sop.7Trend", {
                  url : "/7Trend",
                  templateUrl : "sop/tpl/7Trend.html",
                  controller : "7TrendCtrl"
              })
              //报表
              .state("app.sop.report", {
                  url : "/report",
                  templateUrl : "sop/tpl/report.html",
                  controller : "ReportCtrl"
              })
             //sop 路由部分




              //brige 路由部分

              //brige 路由部分

      }
    ]
  );


//配置http 拦截器
App.config(function($httpProvider){
    $httpProvider.interceptors.push("AjaxInterceptors");

});
