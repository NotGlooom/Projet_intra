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
    let startError = true;
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
                startError = false;
            } else {
                $("#check-hour-end").hide();
            }
        }
    }









})

