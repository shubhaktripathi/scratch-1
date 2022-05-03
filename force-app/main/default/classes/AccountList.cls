public with sharing class AccountList {

  
      @AuraEnabled(cacheable=true)
      public static List<Account> getAccounts()
      {
          return [SELECT Id,Name, Industry, Phone FROM Account ORDER BY CreatedDate DESC LIMIT 10];
      }
  

  @AuraEnabled(cacheable=true)
  public static list<Account> getAccount(String accName) {
    try {
      return [
        SELECT id, name, industry, type, phone,rating
        FROM Account
        WHERE Name LIKE : accName + '%'
      ];
    } catch (Exception e) {
      throw new AuraHandledException(e.getMessage());
    }
  }

  @AuraEnabled
  public static list<Contact> getContact(Id conId) {
    try {
      return [SELECT id, Name, phone, LastName FROM contact WHERE AccountId = :conId];
    } catch (Exception e) {
      throw new AuraHandledException(e.getMessage());
    }
  }

  // @AuraEnabled //-----------Method 1 Using object
  // public static Boolean deleteCon(List<Contact> coList){
  //     try {
  //        Database.delete(coList,false);
  //       return true;
  //    } catch (Exception e) {
  //        throw new  AuraHandledException(e.getMessage());
  //    }

  @AuraEnabled // Method 2 Using Id
  public static List<Contact> deleteCon(List<Id> coList) {
    try {
      List<contact> con = [SELECT id FROM contact WHERE Id IN :coList];
      Database.delete(con, false);
      return [
        SELECT id, name
        FROM contact
        WHERE ID IN :coList AND IsDeleted = TRUE
        ALL ROWS
      ];
    } catch (Exception e) {
      throw new AuraHandledException(e.getMessage());
    }
  }

  @AuraEnabled
  public static List<contact> undeleteAcc(Id undId) {
    try {
      list<Contact> c = [
        SELECT id, name, LastName
        FROM contact
        WHERE id = :undId AND isDeleted = TRUE
        ALL ROWS
      ];
      // Database.undelete(objAccount,false);
      Database.undelete(c, false);
      return c;
    } catch (Exception e) {
      throw new DmlException(e.getMessage());
    }
  }

  @AuraEnabled
  public static List<Contact> updateCon(  List<contact> obj) {
    try {
  //     List<Contact> con = [SELECT Id, Name, phone FROM Contact WHERE ID IN:id LIMIT 1];


  //   list<contact> cont =new List<contact>();

  //     for (contact c : con) {
  //       c.LastName = obj.Name;
  //       c.Phone = obj.Phone;
  //     }

      update obj;
      return obj;

     
    } catch (Exception e) {
      throw new AuraHandledException(e.getMessage());
    }
  }
}