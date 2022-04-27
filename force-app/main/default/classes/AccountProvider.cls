public class AccountProvider {

 

    @AuraEnabled
 
     public static List<Account> AccountDetails(String AccName){
 
         if(String.isNotBlank(AccName)){
 
         return ([SELECT Id,Name,Type,Industry,SLA__c,Rating FROM Account WHERE Name =:AccName LIMIT 1]);
 
         }
 
         else{
 
             return null;
 
         }
 
     }
 
     @AuraEnabled
 
     public static List<Contact> ContactDetails(Id accId){
 
         if(accId != null){
 
         return ([SELECT Id,FirstName,LastName,AccountId FROM Contact WHERE AccountId =:accId]);
 
         }
 
         else{
 
             return null;
 
         }
 
     }
 
    
 
     @AuraEnabled
 
     public static String deleteContactList(List<Contact> ConList){
 
        Database.delete(ConList,false);
 
        return('Contacts Deleted Successfully');
 
    
 
     }
 
  
 
     @AuraEnabled
 
     public static string createAccountMethod(Account objAcc){
 
         try {
 
             Database.insert(objAcc,false);
 
             return('Record created Successfully...!!!!');
 
         }
 
         catch (Exception e) {
 
             throw new AuraHandledException(e.getMessage());
 
         }
 
     }
 
  
 
     @AuraEnabled
 
     public static Account searchAccountMethod(Account objAcc){
 
         try {
 
             return([SELECT Id,Name,Type,Rating,SLA__c,Industry FROM Account WHERE Name=:objAcc.Name LIMIT 1]);
 
         } catch (Exception e) {
 
             throw new AuraHandledException(e.getMessage());
 
         }
 
     }
 
  
 
     @AuraEnabled
 
     public static string editAccountMethod(Account objAcc){
 
         try {
 
            Database.update(objAcc,false);
 
            return('Record updated Successfully....!!!!');
 
         } catch (Exception e) {
 
             throw new AuraHandledException(e.getMessage());
 
         }
 
     }
 
  
 
     @AuraEnabled
 
     public static string deleteAccountMethod(Account objAcc){
 
         try {
 
             Database.delete(objAcc,false);
 
             return('Record deleted successfully....!!!!');
 
         } catch (Exception e) {
 
             throw new AuraHandledException(e.getMessage());
 
         }
 
     }
 
  
 
     @AuraEnabled
 
     public static string undeleteAccountMethod(Account objAcc){
 
         try {
 
             Account objAccount = [SELECT Id,Name,Type,Rating,SLA__c,Industry FROM Account WHERE Name=:objAcc.Name and isDeleted=true LIMIT 1 ALL ROWS];
 
             Database.undelete(objAccount,false);
 
             return('Record restore successfully....!!!');
 
         } catch (Exception e) {
 
             throw new AuraHandledException(e.getMessage());
 
         }
 
     }
 
  
 
     @AuraEnabled
 
     public static List<Account> getAllAccountRecords(String accType){
 
         try {
 
             if(String.isNotBlank(accType)){
 
             return([SELECT Id,Name,Type,Rating,SLA__c,Industry FROM Account WHERE Type=:accType]);
 
             }
 
             else{
 
                 return null;
 
             }
 
         } catch (Exception e) {
 
             throw new AuraHandledException(e.getMessage());
 
         }
 
     }
 
  
 
     @AuraEnabled
 
     public static List<Contact> getAllContacts(String accName){
 
         try {
 
             Id accId=[SELECT Id,Name,Type,Rating,SLA__c,Industry FROM Account WHERE Name=:accName].Id;
 
             return([SELECT Id,FirstName,LastName,AccountId FROM Contact WHERE AccountId=:accId]);
 
         } catch (Exception e) {
 
             throw new AuraHandledException(e.getMessage());
 
         }
 
     }
 
  
 
     @AuraEnabled
 
     public static String deleteSelectedContacts(List<Id> conList){
 
         try {
 
          
                List<Contact> con=[select id from contact where Id IN: conList];
                // delete([select Id from Contact where Id IN : conList]);
                Database.delete(con);
 
                 return 'Selected Records have been deleted successfully...!!!';
 
          
 
         } catch (Exception e) {
 
             System.debug('@Error'+e.getMessage());
 
             throw new AuraHandledException(e.getMessage());
 
         }
 
     }
 
  
 
    
 
 }