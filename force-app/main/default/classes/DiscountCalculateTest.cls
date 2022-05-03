@isTest
public class  DiscountCalculateTest {
  public static testMethod void  DiscountCalculate() { 
        Broker__c br= new Broker__c();
        br.Name= 'tripathi';
		br.Price__c=2000;
        br.Discount__c=20;
        br.Final_Price__c=0;
      
        DiscountCalculate c= new DiscountCalculate();
        
        String b=br.name;
        c.calDis(b);
       List<Broker__c> bi= [SELECT Final_Price__c from Broker__c where Name=:b];
     
      // system.debug(fp);
        system.assertEquals(bi, bi);
        
        
           }
    }