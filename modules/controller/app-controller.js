
angular.module("hbd").controller('appCtrl',function ($rootScope, $scope, $firebaseArray, $firebaseStorage, $timeout) {

    var self = this;

    $scope.countdown = {
        "after": false
    }

    self.wish = {
        "name":"",
        "msg":"",
        "pic":""
    };

    self.deadline = new Date(2019, 0, 25, 0, 0, 0, 0);

    // Initialize Firebase
    var config = {
        apiKey: "AIzaSyAi3BYleJ4x6wgLG3vRb0Viak2fHXO5dxI",
        authDomain: "rajan-8f98f.firebaseapp.com",
        databaseURL: "https://rajan-8f98f.firebaseio.com",
        projectId: "rajan-8f98f",
        storageBucket: "rajan-8f98f.appspot.com",
        messagingSenderId: "39700434850"
    };
    firebase.initializeApp(config);

    $scope.strgUrl = "https://firebasestorage.googleapis.com/v0/b/rajan-8f98f.appspot.com/o/pics%2F";
    $scope.code = "?alt=media&token=0d14b835-a72a-4abf-af6b-cc08b41786a9";
    var ref = firebase.database().ref().child("messages");


    $scope.sendWish = function () {
        $scope.messages = $firebaseArray(ref);

        console.log(self.wish);
        $scope.messages.$add(self.wish)
            .then(function (data) {
                console.log(data);
                $scope.showSuccess("Wish sent successfully", 6000);
                $scope.addImage(document.getElementById("profilePic").files[0], data.key);
            })
            .catch(function (error) {
                console.log(error);
                $scope.showError("Try again", 6000);
            })


    }

    //onchange="angular.element(this).scope().addImage(this)"

    $scope.addImage = function (obj, key) {
        console.log(obj);
        var imgRef = firebase.storage().ref("pics/"+key);
        $scope.images = $firebaseStorage(imgRef);

        var progress = $scope.images.$put(obj);
        progress.$progress(function (snapshot) {

            var percentUploaded = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log(percentUploaded);
        })
        // $scope.images.$getDownloadURL().then(function (url) {
        //     $scope.messages = $firebaseArray(ref);
        //     console.log($scope.messages);
        //     $scope.messages[key] = url;
        //
        //     $scope.messages.$save(key)
        //         .then(function (data) {
        //             console.log(data);
        //         })
        //         .catch(function (error) {
        //             console.log(error);
        //         })
        //
        //
        // })
        // self.imageResponse = null;
        // var reader,fileV;
        // fileV = obj.files[0];
        // if(fileV) {
        //     reader = new FileReader();
        //     reader.onload = function(e){
        //         $scope.$apply(function() {
        //             self.wish.pic = e.target.result;
        //         });
        //     };
        //     reader.readAsDataURL(fileV);
        //     // reader.readAsDataURL(element.files[0]);
        // }
        // else {
        //     self.wish.pic = undefined;
        // }
        //
        // $scope.$evalAsync();

    }

    $scope.getWishes = function () {

        $scope.showLoader = true;

        $scope.messages = $firebaseArray(ref);

        $scope.messages.$loaded()
            .then(function (data) {
                console.log(data);
                $scope.showLoader = false;
            })
            .catch(function (error) {
                console.log(error);
                $scope.showLoader = false;
                $scope.showError("Something went wrong", 6000);
            })
    };

    $scope.showSuccess = function (msg, duration) {
        var time = duration != undefined ? duration : 4000;
        $rootScope.successMesssage = msg;
        $('#commonSucess').show();
        $timeout(function () {
            $('#commonSucess').fadeOut(800)
        }, time);
    }

    $scope.showError = function (msg, duration) {
        var time = duration != undefined ? duration : 4000;
        $rootScope.errorMesssage = msg;
        $('#commonError').show();
        $timeout(function () {
            $('#commonError').fadeOut(800)
        }, time);
    }


    function getTimeRemaining(endtime) {
        var t = Date.parse(endtime) - Date.parse(new Date());
        if(t <= 0)
        {
            return {
                'total': t,
                'days': 0,
                'hours': 0,
                'minutes': 0,
                'seconds': 0
            }

        }
        var seconds = Math.floor((t / 1000) % 60);
        var minutes = Math.floor((t / 1000 / 60) % 60);
        var hours = Math.floor((t / (1000 * 60 * 60)) % 24);
        var days = Math.floor(t / (1000 * 60 * 60 * 24));
        return {
            'total': t,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        };
    }

    $scope.initializeClock = function(id) {

        var endtime = self.deadline;
        $timeout(function () {
            var clock = document.getElementById(id);
            var daysSpan = clock.querySelector('.days');
            var hoursSpan = clock.querySelector('.hours');
            var minutesSpan = clock.querySelector('.minutes');
            var secondsSpan = clock.querySelector('.seconds');

            function updateClock() {
                var t = getTimeRemaining(endtime);
                daysSpan.innerHTML = t.days;
                hoursSpan.innerHTML = ('0' + t.hours).slice(-2);
                minutesSpan.innerHTML = ('0' + t.minutes).slice(-2);
                secondsSpan.innerHTML = ('0' + t.seconds).slice(-2);

                if (t.total <= 0) {
                    $scope.countdown.after = true;
                    $scope.$apply();
                    clearInterval(timeinterval);
                }
            }

            updateClock();
            var timeinterval = setInterval(updateClock, 1000);


            header = $('.header.counthead');

            setInterval(nextBackground, 500);

            header.css('background-image', backgrounds[0]);

        }, 1000);

    }

    var header;

    var backgrounds = new Array(
        'url("img/countdown_low.gif")'
//      , 'url("img/gif/2.jpg")'
//      , 'url("img/gif/3.jpg")'
//      , 'url("img/gif/4.jpg")'
//      , 'url("img/gif/5.jpg")'
//      , 'url("img/gif/6.jpg")'
//      , 'url("img/gif/7.jpg")'
//      , 'url("img/gif/8.jpg")'
//      , 'url("img/gif/7.jpg")'
//      , 'url("img/gif/6.jpg")'
//      , 'url("img/gif/5.jpg")'
//      , 'url("img/gif/4.jpg")'
//      , 'url("img/gif/3.jpg")'
//      , 'url("img/gif/2.jpg")'
    );

    var current = 0;

    function nextBackground() {
        current++;
        current = current % backgrounds.length;
        header.css('background-image', backgrounds[current]);
    }

});
