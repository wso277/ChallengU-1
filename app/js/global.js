(function () {
    angular.element(document).ready(function () {
        angular.element('a[title]').tooltip();
    });

    document.querySelector('.material-design-hamburger__icon').addEventListener(
        'click',
        function (event) {
            var child;

            document.body.classList.toggle('background--blur');
            this.parentNode.nextElementSibling.classList.toggle('menu--on');
            //$('.menu .row span').fadeOut();

            child = this.childNodes[1].classList;

            if (child.contains('material-design-hamburger__icon--to-arrow')) {
                child.remove('material-design-hamburger__icon--to-arrow');
                child.add('material-design-hamburger__icon--from-arrow');
            } else {
                child.remove('material-design-hamburger__icon--from-arrow');
                child.add('material-design-hamburger__icon--to-arrow');
            }
        });
})();