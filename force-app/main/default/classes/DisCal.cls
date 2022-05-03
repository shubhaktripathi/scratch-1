public class DisCal {

    public  void calDis(Decimal Price, Decimal Discount, String n){
      
       
	    List<Broker__c> broker= [SELECT id,Price__c, Discount__c,Final_Price__c,name from Broker__c where name=:n];
        
        Decimal f= (Price*Discount)/100;
        
        
       
    }
    

}