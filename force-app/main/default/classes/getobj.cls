public class getobj {
      public  void getReocrd(String str){
          
        
          String s=str;
            
              String s1 = 'Select Id from ' +s;

              List<sObject> sobjList = Database.query(s1);
          system.debug(sobjList);
             

              try {
                //return sobjList;
               
              } catch (Exception e) {
                throw new AuraHandledException(e.getMessage());
              }
            }

}