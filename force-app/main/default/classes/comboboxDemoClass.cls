public class comboboxDemoClass {

    @AuraEnabled
    public static List<Account> getAccounts (){
        List<Account> accountList = [Select Id,Name From Account];
        return accountList;
            
    } 
}