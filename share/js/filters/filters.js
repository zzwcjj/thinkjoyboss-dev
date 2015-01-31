App

.filter("status",function(){
        return function(status) {
           if(status == 0){
               return "未审核";
           }
            else{
               return "已审核";
           }
        };
    })

    .filter("smsResult", function() {
        return function(status) {
            if (status == "success") {
                return "提交成功";
            } else if (status == "fail") {
                return "提交失败";
            }

            return status;
        }
    })

    .filter("colorClass",function(){
        return function(res) {
            if(res){
                var color=  res.testResult;

                if(color == "success"){
                    return "success";
                }
                else if(color == "error"){
                    return "danger";
                }
                else if(color == "warn"){
                    return "warning";
                }
                else{
                    return "info";
                }
            }
            else{
                return "info";
            }

        };
    })


.filter("userType",function(){
    return function(res) {

        if(!res){
            return "";
        }

        //老师
        if(res.teacherInfo.length > 0 &&  res.childInfo.length > 0){
            return "家长&老师";
        }

        else if(res.teacherInfo.length > 0 ){
            return "老师";
        }
        else{
            return "家长";
        }
    };

})
    .filter("feedbackUserType", function() {
        return function(status) {
            if (status == 0) {
                return "家长";
            }
            else {
                return "老师";
            }
        }

    })

    .filter("limitContent", function() {
        return function(content) {
            if (content.length > 20) {
                content = content.sub(0, 20) + "...";
            }

            return content;
        }
    })

    .filter('fromNow', function() {
        return function(date) {
            return moment(date).fromNow();
        }
    })
    .filter("SCEformat", function($sce) {
        return function(url) {
            return $sce.trustAsResourceUrl(url);
        }
    });