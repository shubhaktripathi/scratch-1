public with sharing class eCart {
    
    
    @AuraEnabled(cacheable= true)
    public static List<Item__c> getItem(){
        try {
            return [select id, Name from Item__c];
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
}