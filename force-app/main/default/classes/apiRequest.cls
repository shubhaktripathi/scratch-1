@RestResource(urlMapping='/AccountApi/*')

global with sharing class apiRequest {
    
    @HTTPGet
    global static List<Account> getAcount() {
        
        List<Account> accList = [SELECT Id, Name FROM Account LIMIT 5];
        return accList;
    }

}