$(document).ready(function () {
    let reportdeskemail = $("#userprofileid").val();
    if (reportdeskemail != null) {

        $("#topmaindiv").show();

        $("#userprofileid").val(reportdeskemail);

        $(".user_info").append('<h6>' + reportdeskemail + '</h6><p><span class="online_animation"></span> Online</p>')
        var formData = new FormData();

        userprofileid = $("#userprofileid").val();
        formData.append('question', $('#exampleFormControlTextarea1').val());
        formData.append('email', userprofileid);

        $.ajax({
            url: '/fetchhistory',
            type: 'POST',
            data: formData,
            processData: false,
            contentType: false,
            success: function (data) {


                $.each(data, function (index, value) {

                    console.log(data);
                    $('#questionappend').append('<div class="questionspan"><span> Q' + (index + 1) + '. ' + '</span><li class="questionli" onclick="sendParagraphText(this)"> ' + value[1] + '</li></div>');
                    scrollToBottomPrompt()

                });
            }
        });
    } else {

        $(".question").hide()
        $(".answer").hide()
        $("#topmaindiv").show();
        // $(".user_info").html('<h6>' + "User" + '</h6><p><span class="offline_animation"></span> Offline</p>')
    }

});
$(document).ready(function () {
    $("#searchq").click(function () {
        const divElement = document.querySelector('#questionappend'); // Replace 'yourDivId' with the actual ID of your div element
        const liElements = divElement.querySelectorAll('li');
        const totalCount = liElements.length;
        console.log(totalCount);
        const questionstring = $('#exampleFormControlTextarea1').val();
        if (questionstring.toLowerCase() == 'hi' || questionstring.toLowerCase() == 'hello') {
            $('#gptbody').append('<div class="footer question"><p>' + $('#exampleFormControlTextarea1').val() + '</p></div>');
            $('#gptbody').append('<div class="footer answer"><p>' + 'Hello! How can I assist you today?' + '</p></div>');
        } else {



            $('#questionappend').append('<div class="questionspan"><span> Q' + (totalCount + 1) + '. ' + '</span><li class="questionli" onclick="sendParagraphText(this)"> ' + $('#exampleFormControlTextarea1').val() + '</li></div>');
            $('#gptbody').append('<div class="footer question"><p>' + $('#exampleFormControlTextarea1').val() + '</p></div>');
            scrollToBottomPrompt()
            var formData = new FormData();
            userprofileid = $("#userprofileid").val();
            formData.append('question', $('#exampleFormControlTextarea1').val());
            formData.append('usersquestions', $('#usersquestions').val());
            formData.append('email', userprofileid);
            $('#exampleFormControlTextarea1').prop('readonly', true);
            $('.spinner').addClass("showspeaner");
            $('.spinner').removeClass("hidespeaner");
            scrollToBottom()
            $.ajax({
                url: '/anser',
                type: 'POST',
                data: formData,
                processData: false,
                contentType: false,
                success: function (data) {

                    $('#gptbody').append('<div class="footer answer"><p>' + data + '</p></div>');
                    $('#exampleFormControlTextarea1').val("")
                    $("#topmaindiv").hide();
                    $('#exampleFormControlTextarea1').prop('readonly', false);
                    scrollToBottom()
                    $('.spinner').addClass("hidespeaner");
                    $('.spinner').removeClass("showspeaner");
                    $('#usersquestions').val(parseInt($('#usersquestions').val()) + 1)
                }
            });
        }
    });
});

// Get the input field
var input = document.getElementById("exampleFormControlTextarea1");

// Execute a function when the user presses a key on the keyboard
input.addEventListener("keypress", function (event) {
    // If the user presses the "Enter" key on the keyboard
    if (event.key === "Enter") {
        const divElement = document.querySelector('#questionappend'); // Replace 'yourDivId' with the actual ID of your div element
        const liElements = divElement.querySelectorAll('li');
        const totalCount = liElements.length;
        console.log(totalCount);
        let questionstring = $('#exampleFormControlTextarea1').val()

        let more = questionstring.search("more");
        let additionals = questionstring.search("additional");

        if ($('#exampleFormControlTextarea1').val() == '') {
            alert("Please provide question");

        } else if (additionals != -1) {

            var formData = new FormData();

            userprofileid = $("#userprofileid").val();
            formData.append('question', $('#exampleFormControlTextarea1').val());
            formData.append('email', userprofileid);
            $('#exampleFormControlTextarea1').prop('readonly', true);
            $('.spinner').addClass("showspeaner");
            $('.spinner').removeClass("hidespeaner");
            scrollToBottom()
            $.ajax({
                url: '/more',
                type: 'POST',
                data: formData,
                processData: false,
                contentType: false,
                success: function (data) {

                    $('#gptbody').append('<div class="footer answer"><p>' + data + '</p></div>');
                    $('#exampleFormControlTextarea1').val("")
                    $('#exampleFormControlTextarea1').prop('readonly', false);
                    scrollToBottom()

                    $('.spinner').addClass("hidespeaner");
                    $('.spinner').removeClass("showspeaner");
                }
            });

        } else if (more != -1) {

            var formData = new FormData();

            userprofileid = $("#userprofileid").val();
            formData.append('question', $('#exampleFormControlTextarea1').val());
            formData.append('email', userprofileid);
            $('#exampleFormControlTextarea1').prop('readonly', true);
            $('.spinner').addClass("showspeaner");
            $('.spinner').removeClass("hidespeaner");
            scrollToBottom()

            $.ajax({
                url: '/more',
                type: 'POST',
                data: formData,
                processData: false,
                contentType: false,
                success: function (data) {

                    $('#gptbody').append('<div class="footer answer"><p>' + data + '</p></div>');
                    $('#exampleFormControlTextarea1').val("")
                    $('#exampleFormControlTextarea1').prop('readonly', false);
                    scrollToBottom()

                    $('.spinner').addClass("hidespeaner");
                    $('.spinner').removeClass("showspeaner");

                }
            });
        } else if (questionstring.toLowerCase() == 'hi' || questionstring.toLowerCase() == 'hello') {
            $('#gptbody').append('<div class="footer question"><p>' + $('#exampleFormControlTextarea1').val() + '</p></div>');
            $('#gptbody').append('<div class="footer answer"><p>' + 'Hello! How can I assist you today?' + '</p></div>');
            $('#exampleFormControlTextarea1').val("")
            $('#exampleFormControlTextarea1').prop('readonly', false);
        }
        else {

            $('#questionappend').append('<div class="questionspan"><span> Q' + (totalCount + 1) + '. ' + '</span><li class="questionli" onclick="sendParagraphText(this)"> ' + $('#exampleFormControlTextarea1').val() + '</li></div>');
            $('#gptbody').append('<div class="footer question"><p>' + $('#exampleFormControlTextarea1').val() + '</p></div>');
            scrollToBottomPrompt()
            var formData = new FormData();
            userprofileid = $("#userprofileid").val();
            formData.append('question', $('#exampleFormControlTextarea1').val());
            formData.append('usersquestions', $('#usersquestions').val());
            formData.append('email', userprofileid);
            $('#exampleFormControlTextarea1').prop('readonly', true);
            $('.spinner').addClass("showspeaner");
            $('.spinner').removeClass("hidespeaner");
            scrollToBottom()
            $.ajax({
                url: '/anser',
                type: 'POST',
                data: formData,
                processData: false,
                contentType: false,
                success: function (data) {

                    $('#gptbody').append('<div class="footer answer"><p>' + data + '</p></div>');
                    $('#exampleFormControlTextarea1').val("")
                    $('#exampleFormControlTextarea1').prop('readonly', false);
                    $("#topmaindiv").hide();
                    scrollToBottom()

                    $('.spinner').addClass("hidespeaner");
                    $('.spinner').removeClass("showspeaner");
                    $('#usersquestions').val(parseInt($('#usersquestions').val()) + 1)

                }
            });
        }
    }
});
$(document).ready(function () {
    $("#signupformsubmit").click(function () {

        // Get session data
        var email = sessionStorage.getItem('reportdeskemail');
        if (email != null) {
            console.log("User Exits Please login");
        } else {

            sessionStorage.setItem('reportdeskemail', $('#signupemail').val());
            var formData = new FormData();
            formData.append('email', $('#signupemail').val());
            formData.append('password', $('#signuppassword').val());
            $.ajax({
                url: '/saveCustomer',
                type: 'POST',
                data: formData,
                processData: false,
                contentType: false,
                success: function (data) {
                    $("#userprofileid").val(reportdeskemail);
                    $("#topmaindiv").show();
                    $(".question").show()
                    $(".answer").show()
                    $('#exampleFormControlTextarea1').prop('readonly', false);
                    console.log()
                    $.each(data, function (index, value) {

                        console.log(data);
                        $('#questionappend').append('<li><a href="#"> <span>' + value[1] + '</span></a></li>');
                        scrollToBottomPrompt()

                    });

                }
            });
        }
    });
});


$(document).ready(function () {
    $("#signinformsubmit").click(function () {
        var formData = new FormData();
        formData.append('email', $('#signinemail').val());
        formData.append('password', $('#signinpassword').val());
        $.ajax({
            url: '/signin',
            type: 'POST',
            data: formData,
            processData: false,
            contentType: false,
            success: function (data) {
                console.log(data)
                if (data != 'User does not exist' && data != 'Password is incorrect') {

                    $("#userprofileid").val($("#signinemail").val());
                    $(".question").show()
                    $("#topmaindiv").hide();
                    $(".answer").show()
                    $('#exampleFormControlTextarea1').prop('readonly', false);
                    // $(".user_info").html('<h6>' + $("#signinemail").val() + '</h6><p><span class="online_animation"></span> Online</p>')
                    $.each(data, function (index, value) {

                        console.log(data);
                        $('#questionappend').append('<li class="questionli" onclick="sendParagraphText(this)"> ' + value[1] + '</li>');
                        scrollToBottomPrompt()

                    });
                    var email = sessionStorage.getItem('email');
                    if (email != null) {
                        console.log("User Exits");
                    } else {

                        sessionStorage.setItem('reportdeskemail', $('#signinemail').val());
                    }
                }

                else {

                    alert(data);
                    $(".question").hide()
                    $(".answer").hide()

                }
            }
        });
    });
});


$(document).ready(function () {
    // Get Data

    $.ajax({
        url: '/allquestion',
        type: 'GET',
        headers: {

            'Access-Control-Allow-Origin': '*'
        },
        success: function (response) {

        },
        error: function (error) {
            console.log(error);
        }
    });

});
//SighUp JS
const loginText = document.querySelector(".title-text .login");
const loginForm = document.querySelector("form.login");
const loginBtn = document.querySelector("label.login");
const signupBtn = document.querySelector("label.signup");
const signupLink = document.querySelector("form .signup-link a");
signupBtn.onclick = (() => {
    loginForm.style.marginLeft = "-50%";
    loginText.style.marginLeft = "-50%";
});
loginBtn.onclick = (() => {
    loginForm.style.marginLeft = "0%";
    loginText.style.marginLeft = "0%";
});
signupLink.onclick = (() => {
    signupBtn.click();
    return false;
});

function scrollToBottom() {
    var container = document.getElementById("gptbody");
    container.scrollTop = container.scrollHeight;
}

function scrollToBottomPrompt() {
    var container = document.getElementById("questionappend");
    container.scrollTop = container.scrollHeight;
}

function sendParagraphText(element) {
    var text = element.textContent.trim();

    scrollToBottomPrompt()

    var formData = new FormData();

    userprofileid = $("#userprofileid").val();
    formData.append('question', text);
    formData.append('email', userprofileid);
    $('#exampleFormControlTextarea1').prop('readonly', true);
    $('#gptbody').append('<div class="footer question"><p>' + text + '</p></div>');
    $('.spinner').addClass("showspeaner");
    $('.spinner').removeClass("hidespeaner");

    scrollToBottom()

    $.ajax({
        url: '/anser',
        type: 'POST',
        data: formData,
        processData: false,
        contentType: false,
        success: function (data) {


            $('#gptbody').append('<div class="footer answer"><p>' + data + '</p></div>');
            $('#exampleFormControlTextarea1').val("")
            $('#exampleFormControlTextarea1').prop('readonly', false);
            $("#topmaindiv").hide();

            scrollToBottom()

            $('.spinner').addClass("hidespeaner");
            $('.spinner').removeClass("showspeaner");
        }
    });
}