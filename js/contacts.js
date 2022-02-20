/* sticky header */
window.onscroll = function showHeader() {
    var header = document.querySelector('.header');
    if(window.pageYOffset > 0){
        header.classList.add('header_fixed');
    } else{
        header.classList.remove('header_fixed');
    }
}


/* Modal window */
var btnOpen = document.getElementById('phone-btn');
var modal = document.getElementById('first-modal');

var overlay = document.getElementById('overlay');
var btnClose = document.getElementById('btn-close');

btnOpen.addEventListener('click',function(){
    modal.classList.add('active');
});

function closeModal(){
    modal.classList.remove('active');
}

overlay.addEventListener('click',closeModal);
btnClose.addEventListener('click',closeModal);



// Validate

$(document).ready(function() {
    $('.header__burger').click(function(event) {
		$('.hheader__burger,.header__menu').toggleClass('active');
		$('body'),toggleClass('lock');
	});

    $('[data-submit]').on('click', function(e) {
        e.preventDefault();
        $(this).parent('form').submit();
    })
    $.validator.addMethod(
        "regex",
        function(value, element, regexp) {
            var re = new RegExp(regexp);
            return this.optional(element) || re.test(value);
        },
        "Please check your input."
    );

    // Function-validation and show-message
    function valEl(el) {
        el.validate({
            rules: {
                phoneNumber: {
                    required: true,
                    regex: '^([\+]+)*[0-9\x20\x28\x29\-]{5,20}$',
                    minlength : 10,
                    maxlength : 13        
                },
                firstName: {
                    required: true,
                    regex : "[A-Za-zА-Яа-яЁё]{1,32}"
                },
                email: {
                    required: true,
                    email: true,
                    regex : "[A-Za-z]{1,32}"
                },
                message: {
                    required: true,
                    regex : "[A-Za-zА-Яа-яЁё]{1,32}"
                }
            },
            messages: {
                phoneNumber: {
                    required: 'Введите номер телефона',
                    regex: 'Пожалуйста, введите корректно Ваш номер телефона'
                },
                firstName: {
                    required: 'Введите Имя'
                },
                email: {
                    required: 'Введите адрес электронной почты',
                    email: 'Пожалуйста, введите корректный адрес электронной почты'
                },
                message: {
                    required: 'Напишите сообщение',
                    email: 'Пожалуйста, напишите сообщение'
                }
            },

            // Checking form id="" 
            submitHandler: function(form) {
                $('#loader').fadeIn();
                var $form = $(form);
                var $formId = $(form).attr('id');
                switch ($formId) {
                    // If form has id="popupResult" - do it:
                    case 'popupResult':
                        $.ajax({
                                type: 'POST',
                                url: $form.attr('action'),
                                data: $form.serialize()
                            })
                            .always(function() {
                                console.log('Always');
                                setTimeout(function() {
                                    $('#second-modal').fadeIn();
                                    $form.trigger('reset');
                                    $('#first-modal').fadeOut();
                                    $form.trigger('reset');
                                }, 1100);
                                $('#second-modal').on('click', function(e) {
                                    $(this).fadeOut();
                                    
                                });
                            
                            });
                        break;
                        case 'contacts__form':
                            $.ajax({
                                    type: 'POST',
                                    url: $form.attr('action'),
                                    data: $form.serialize()
                                })
                                .done(function() {
                                    console.log('Success');
                                })
                                .fail(function() {
                                    console.log('Fail');
                                })
                                .always(function() {
                                    console.log('Always');
                                    setTimeout(function() {
                                        $('#message__succes').fadeIn();
                                        $form.trigger('reset');
                                        //строки для остлеживания целей в Я.Метрике и Google Analytics
                                    }, 1100);
                                    $('#message__succes').on('click', function(e) {
                                        $(this).fadeOut();
                                    });
    
                                });
                            break;
                }
                return false;
            }
        })
    }
    // form-validation run, if she have a class .js-form
    $('.js-form').each(function() {
        valEl($(this));
    });
    $('.contacts__form').each(function() {
        valEl($(this));
    });

});


