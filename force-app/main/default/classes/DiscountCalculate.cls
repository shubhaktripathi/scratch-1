public class DiscountCalculate {
    
    public  void calDis(String name){
      
        String n= name;
	    List<Broker__c> broker= [SELECT id,Price__c, Discount__c,Final_Price__c,name from Broker__c where Name=:n];
        List<Broker__c> bro= new List<Broker__c>();
        for(Broker__c b:broker){
             b.Final_Price__c= (b.Price__c*b.Discount__c)/100;
             system.debug(b.Final_Price__c);
             bro.add(b);
        }
        update(bro);
        AggregateResult[] r=[SELECT sum(Final_Price__c) from Broker__c where Name=:n];
        system.debug(r[0]);
        
       
    }
    

}