public class caseH {
    public  list<case> getcase(){
       List<case> caseN= [select CaseNumber,Reason,Status,Priority from Case where CaseNumber='00001028'];

          for(case c:caseN){ 
                 c.Status='New';        
         }
        update caseN;
        system.debug(caseN);

        return [select CaseNumber,Reason,Status,Priority from Case where CaseNumber='00001028'];
     

}
       public  list<case> getcase1(){
       List<case> caseH= [select CaseNumber,Reason,Status,Priority from Case where CaseNumber='00001028'];
           list<case> caseZ= new list<case>();

          for(case c:caseH){ 
                 c.Status='Working';  
              caseZ.add(c);
         }
        update caseZ;
        system.debug(caseZ);

        return [select CaseNumber,Reason,Status,Priority from Case where CaseNumber='00001028'];
     

}
           public  list<case> setcase(){

     //method 1
          List<case> caseN= [select CaseNumber,Description,Reason,Status,Priority from Case where CaseNumber='00001028'];

          for(case c:caseN){ 
              c.Description='shubham';        
      }
    update caseN;
    return [select CaseNumber,Reason,Status,Priority from Case where CaseNumber='00001028'];
}
}