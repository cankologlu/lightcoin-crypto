
class Account {
  constructor(username) {

    this.username = username;
    this.transactions = [];
  }

  get balance () {
    let balance = 0;
    for (let t of this.transactions) {
      balance += t.value
    }
    return balance;
  }

  addTransaction(transaction) {
    this.transactions.push(transaction);
  }
}

class Transaction {

  constructor(amount, account) {
    this.amount = amount;
    this.account = account;
  }

  commit() {
    if(!this.isAllowed()) return false;
    this.time = new Date();
    this.account.addTransaction(this);
  }
}

class Withdrawal extends Transaction {

  get value () {

    return -this.amount;
  }
  isAllowed () {
    return (this.account.balance - this.amount >= 0);
  }
}

class Deposit extends Transaction {

  get value () {

    return this.amount;
  }
  isAllowed() {
    return true;
  }
}




// DRIVER CODE BELOW
// We use the code below to "drive" the application logic above and make sure it's working as expected
const myAccount = new Account("izbetric");
const t1 = new Deposit(60, myAccount)
t1.commit();
console.log(`Transaction 1: ${t1}`);
console.log("Account balance t1;", myAccount.balance);
console.log("Transaction datat1", myAccount.transactions);


const t2 = new Withdrawal(10, myAccount);
t2.commit();
console.log('Transaction 2:', t2);

// t3 = new Deposit(170, myAccount);
// t3.commit();
// console.log('Transaction 3:', t3);



console.log('Balance:', myAccount.balance);
