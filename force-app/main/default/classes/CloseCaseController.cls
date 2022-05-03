public with sharing class CloseCaseController {
    
    @AuraEnabled(cacheable=true)
    public static List<CaseWrapper> getClosedCases(){

        List<CaseWrapper> caseList = new List<CaseWrapper>();
        system.debug('1');
        try {
            for(Case caseRecord : [SELECT Id, CaseNumber, Subject, Status FROM Case Where Status != 'Closed' LIMIT 10
            
            ]){
                CaseWrapper wrapper = new CaseWrapper(caseRecord);
                caseList.add(wrapper);
                
            }
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
        return caseList;
    }

    @AuraEnabled
    public static void claseSelectedCases(List<CaseWrapper> caseString){
        try {
system.debug('1');            
          //  List<CaseWrapper> caseList = (List<CaseWrapper>)JSON.deserialize(caseString, List<CaseWrapper>.class);
          List<CaseWrapper> caseList= caseString;
            system.debug('2');
            List<Case> caseToUpdate = new List<Case>();
            system.debug('3');
            for(CaseWrapper wrapper : caseList){
                if(wrapper.isSelected == true){
                    Case caseRecord = wrapper.caseRecord;
                    caseRecord.Status = 'Closed';
                    caseToUpdate.add(caseRecord);
                }
            }
            update caseToUpdate;
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }

    public class CaseWrapper {
        @AuraEnabled
        public Case caseRecord    { get; set; }
        @AuraEnabled
        public Boolean isSelected { get; set; }

        public CaseWrapper(Case caseRecord){
            this.isSelected = false;
            this.caseRecord = caseRecord;
        }
    }

}