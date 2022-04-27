public class DeleteContact {
    
    
   public void deleteq(){
      //   date d=system.today();   
         
        List<Account> con= [SELECT id from Account where CreatedDate = LAST_MONTH];
       try {
       delete con;
           system.debug('Success');
           }
       
       catch (DmlException e)
       {
            system.debug(e);
    // Process exception here
       }
   }
}