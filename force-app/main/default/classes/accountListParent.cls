public with sharing class accountListParent {
    
    @AuraEnabled(cacheable=true)
        public static list<account> getAccount( String accName){
        try {
            return [select id,name,phone, industry from account where Name like: '%'+accName+'%'];
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }

    @AuraEnabled
    public static list<contact> getContact( Id conId){
        try {
            return [select id, name, phone from contact where AccountId=:conId];
            
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }

    @AuraEnabled
public static List<contact> deleteCon(Id contId){
    try {
        List<contact> conList= [Select id from contact where Id=:contId];
        delete conList;
        return [select id, name from contact where Id=:contId and  isDeleted=true ALL ROWS];
  
       

    } catch (Exception e) {
        throw new DmlException(e.getMessage());
    }
   
    
}
}