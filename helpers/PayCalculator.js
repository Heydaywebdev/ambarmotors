class PayCalculator{

  static MonthlyPayment(apr, years, down, cost){
    try{
      let r = (apr / 12) / 100;
      let n = years * 12;
      let d = down;
      let p = cost - d;
      let per_month = p * ((r * Math.pow((1 + r), n)) / (Math.pow((1 + r), n) - 1));
      return per_month.toFixed(0);
    }
    catch (e) {
      return null;
    }
  }

}

export default PayCalculator
