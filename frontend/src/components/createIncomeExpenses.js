export class CreateIncomeExpenses {
    constructor() {
        this.typeOperation = null;
        this.typeCategory = null;
        this.sumOperation = null;
        this.dateOperation = null;
        this.commentOperation = null;
        this.createOperation = document.getElementById('createOperation');

        this.createOperation.onclick = () => {
            this.createNewCategory();
        }
    }

    createNewCategory() {
        this.typeOperation = document.getElementById('typeOperation').value;
        this.typeCategory = document.getElementById('typeCategory').value;
        this.sumOperation = document.getElementById('sumOperation').value;
        this.dateOperation = document.getElementById('dateOperation').value;
        this.commentOperation = document.getElementById('commentOperation').value;
    }
}