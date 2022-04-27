public with sharing class caseHandler {
  @AuraEnabled
  public static List<case> getCase(String caseNum) {
    try {
      return [
        SELECT CaseNumber, Reason, IsEscalated, Status, Priority
        FROM Case
        WHERE CaseNumber = :caseNum
      ];
    } catch (Exception e) {
      throw new AuraHandledException(e.getMessage());
    }
  }
  @AuraEnabled
  public static List<case> reOpen(String cNum) {
    try {
      //method 1
      List<case> caseN = [
        SELECT CaseNumber, Reason, Status, Priority
        FROM Case
        WHERE CaseNumber = :cNum
      ];

      for (case c : caseN) {
        c.Status = 'New';
      }
      update caseN;
      return [
        SELECT CaseNumber, Reason, Status, Priority
        FROM Case
        WHERE CaseNumber = :cNum
      ];

      // method 2

      // List<case> caseH= [select CaseNumber,Reason,Status,Priority from Case where CaseNumber=cNum];
      //    list<case> caseZ= new list<case>();

      //   for(case c:caseH){
      //          c.Status='Working';
      //       caseZ.add(c);
      //  }
      // update caseZ;
      // system.debug(caseZ);
    } catch (Exception e) {
      throw new AuraHandledException(e.getMessage());
    }
  }

  @AuraEnabled
  public static List<case> escalate(List<case> obj, String reason) {
    try {
      //     List<case> caseN= [select CaseNumber,Description from Case where CaseNumber=:obj];

      //       for(case c:caseN){
      //           c.Description=reason;
      //   }
      // update caseN;
      for (case c : obj) {
        c.Description = reason;
        c.Status='Escalated';
      }
      update obj;
      return obj;
    } catch (Exception e) {
      throw new AuraHandledException(e.getMessage());
    }
  }
}