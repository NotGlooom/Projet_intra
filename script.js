// Document est prêt
$(document).ready(function () {

    // Valider le nom
    let nomError = true;
    $("#check-nom").hide();
    $("#eventName").keyup(function () {
        validateNom();
    })

    function validateNom() {
        let nomValue = $("#eventName").val();
        if (nomValue.length === 0) {
            $("#check-nom").show().html("**Entrez le nom")
            nomError = false;
            return false;
        } else if (nomValue.length < 5 || nomValue.length > 20) {
            $("#check-nom").show().html("**La longeur doit être comprise entre 5 et 20 caractères")
            nomError = false;
            return false;
        } else {
            $("#check-nom").hide();
        }
    }


    // Valider heure de fin
    $("#check-hour-end").hide();
    let endError = true;
    $("#eventEndTime").change(function () {
        validateEnd();
    })

    function convertTo24Hour(time, period) {
        let [hours, minutes] = time.split(":");
        hours = parseInt(hours);
        minutes = parseInt(minutes);

        if (period === "PM" && hours !== 12) {
            hours += 12;
        }
        if (period === "AM" && hours === 12) {
            hours = 0;
        }
        return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}`;
    }

    function validateEnd() {
        let startValue = $("#eventStartTime").val();
        let endValue = $("#eventEndTime").val();

        if (startValue && endValue) {
            // Extract the period from the time string
            let startPeriod = startValue.split(" ")[1];
            let endPeriod = endValue.split(" ")[1];

            startValue = convertTo24Hour(startValue, startPeriod);
            endValue = convertTo24Hour(endValue, endPeriod);

            let startTime = new Date(`2023-10-26T${startValue}`);
            let endTime = new Date(`2023-10-26T${endValue}`);

            if (endTime < startTime) {
                $("#check-hour-end").show().html("L'heure de fin doit être supérieure à celle de début");
                endError = false;
                return false;
            } else {
                $("#check-hour-end").hide();
            }
        }
    }

    // Box Journée Complète
    $("#allDay").change(function() {
        if(this.checked) {
            // Si la case est cochée, mettez 12:00 AM à 11:59 PM
            $("#eventStartTime").val("00:00");
            $("#eventEndTime").val("23:59");
            $("#check-hour-end").hide();
        } else {
            // Si la case est décochée, réinitialisez les champs de temps
            $("#eventStartTime").val("");
            $("#eventEndTime").val("");
            $("#check-hour-end").hide();
        }
    });



    // Valider la description
    $("#check-desc").hide();
    let descError = true;
    $("#eventDescription").keyup(function () {
        validateDesc();
    })

    function validateDesc() {
        let descValue = $("#eventDescription").val();
        if (descValue.length > 50) {
            $("#check-desc").show().html("La description ne peut excéder 50 charactères")
            descError = false;
            return false;
        } else {
            $("#check-desc").hide();
        }
    }

    // Event soummettre
    $("#submitBtn").click(validateForm);

    function validateForm() {
        validateNom();
        validateEnd();
        validateDesc();
        if (nomError === true && endError === true && descError === true) {
            // Récupérer les valeurs du formulaire
            let nom = $("#eventName").val();
            let startValue = $("#eventStartTime").val();
            let endValue = $("#eventEndTime").val();
            let description = $("#eventDescription").val();
            let color = $("#eventColor").val();

            // Créer un nouvel événement (élément div)
            let newEvent = document.createElement("div");
            newEvent.classList.add("event");
            newEvent.style.border = `5px solid ${color}`; // Appliquer la couleur

            // Remplir le contenu de l'événement
            newEvent.innerHTML = `
            <h3>${nom}</h3>
            <p>Début : ${startValue}</p>
            <p>Fin : ${endValue}</p>
            <p>Description : ${description}</p>
        `;

            // Récupérer le jour de la semaine du formulaire
            let dayOfWeek = $("#dayOfWeek").val();

            // Sélectionner la colonne appropriée dans l'horaire
            let scheduleColumn = $(`.calender .col:contains(${dayOfWeek})`);

            // Ajouter l'événement à la colonne
            scheduleColumn.append(newEvent);


            // Vider les inputs
            $("#eventName").val("");
            $("#eventStartTime").val("");
            $("#eventEndTime").val("");
            $("#allDay").prop("checked", false);
            $("#eventDesc").val("");
            $("#eventColor").val("#0d6efd");


            return false;
        }
    }

})

