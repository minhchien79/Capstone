function Validation() {
    this.kiemTraRong = function(value, divID, message) {
        if (value === "") {
            getEle(divID).innerHTML = message;
            return false;
        }
        getEle(divID).innerHTML = "";
        return true;
    }
}
