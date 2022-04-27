public class AccountTrigger1 {
    
  public void createContact(List<Account> Acclist){
      
      List<contact> conList= new List<Contact>();
        
      for(Account acc:Acclist){
          Contact c= new Contact();
          c.LastName=acc.Name;
          c.AccountId=acc.id;
          conList.add(c);
			   
      }
      insert conList;
      
    }

}