function afficher() {
// GET JSON : Obtenir les données du serveur JSON
    $.getJSON('https://641b49f71f5d999a44603cd2.mockapi.io/users')
        // .done() est exécuté quand on a reçu la réponse du serveur
        .done(function (users) { // users va contenir la liste d'objets json
            for (user of users) { // user représente chaque objet
                $("body").append(`
                <p id='user${user.id}'>${user.id}, ${user.username}, ${user.email}</p>
            `)
            }
        });
}

$("form").submit(function (){
    //POST : Envoyer des données au serveur JSON
    $.ajax('https://641b49f71f5d999a44603cd2.mockapi.io/users', {
        // on envoie le nouvel objet json à ajouter au serveur
        data : JSON.stringify({ "username": $("#username").val(), "email" : $("#email").val() }),
        contentType : 'application/json',
        type : 'POST'
    });
});

function modifier(){
    //Modifier l'utilisateur avec le id choisi.
    //Référence : https://github.com/mockapi-io/docs/wiki/Code-examples
    fetch('https://641b49f71f5d999a44603cd2.mockapi.io/users/'+$("#id").val(), {
        method: 'PUT', // or PATCH
        headers: {'content-type':'application/json'},
        body: JSON.stringify({ "username": $("#username").val(), "email" : $("#email").val() })
    }).then(function (){
        //Mette à jour l'affichage de façon dynamique, sans recharger la page
        $("#user"+$("#id").val()).text($("#id").val() + ", " + $("#username").val() + ", " + $("#email").val());
    })
}

function supprimer(){
    //Supprimer le user avec le id choisi à l'aide de la commande ajax fetch et la methode delete du serveur.
    //Référence : https://github.com/mockapi-io/docs/wiki/Code-examples
    fetch('https://641b49f71f5d999a44603cd2.mockapi.io/users/'+$("#id").val(), {
        method: 'DELETE',
    }).then(function (){
        $("#user"+$("#id").val()).remove();
    });
}

afficher();