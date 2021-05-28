const btn = document.querySelector("#addButton");
const amount = document.querySelector("#amount");
const desc = document.querySelector("#desc");
let totalExpenses = 0;
const expenseList = [];

function totalExpenseFunc() {
    const amountEl = amount.value;
    const descEl = desc.value;
    if (descEl == null || descEl == "") {
        alert("Please enter the desciption");
        return;
    }
    if (amountEl == null || amountEl == "") {
        alert("Please enter the amount");
        return;
    }
    const expenseObj = {};
    expenseObj.amount = amountEl;
    expenseObj.desc = descEl;
    expenseObj.dateObj = new Date();
    expenseList.push(expenseObj);
    totalExpenses = totalExpenses + parseInt(amountEl, 10);
    totalExpenseId.textContent = `Total: ${totalExpenses}₹`;
    const tableContent = expenseList.map(el => generateExpenseTemplate(el)).join("");
    tableResult.innerHTML = tableContent;
}

function generateExpenseTemplate({ desc, amount, dateObj }) {
    return `<div class="container" style="border: 1.5px solid silver; padding: 1.5%; margin: 1%;">
    <div class="row" style="margin: inherit";>
    <div class="col">
        ${desc}
    </div>
    <div class="col">
        ${amount}₹
    </div>
    <div class="col">
        ${getDate(dateObj)}
    </div>
    <div class="col">
        <button type="button" class="btn btn-outline-danger" 
        onclick="deleteRecord(${dateObj.valueOf()})"> 
            <i class="fa fa-trash-o" style="font-size:20px;"></i>
        </button>
    </div>
        </div>
    </div>`;
}

function getDate(dateObj) {
    return dateObj.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric'});
}
function deleteRecord(dateValue) {
    const tempArr = [];
    for(let i=0; i<expenseList.length; i++) {
        if(expenseList[i].dateObj.valueOf() !== dateValue) {
           tempArr.push(expenseList[i]);
        } if(expenseList[i].dateObj.valueOf() === dateValue) {
            totalExpenses = totalExpenses - expenseList[i].amount;
        }
    }
    expenseList.splice(0,expenseList.length);
    for(let i=0; i<tempArr.length; i++) {
        expenseList.push(tempArr[i]);
    }
    totalExpenseId.textContent = `Total: ${totalExpenses}₹`;
    const tableContent = expenseList.map(el => generateExpenseTemplate(el)).join("");
    tableResult.innerHTML = tableContent;
}
    

btn.addEventListener("click", totalExpenseFunc, false);
