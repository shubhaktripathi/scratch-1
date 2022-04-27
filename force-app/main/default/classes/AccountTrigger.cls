public class AccountTrigger {

    public static void Method1(List<Account> acc){
         List<contact> cont= new List<contact>();
                    for(Account a:Acc) {
                        if(A.industry=='Banking'){
                            Contact con= new contact();
                            con.lastname=a.name;
                            con.phone= a.phone;
                            con.AccountId=a.Id;
                            cont.add(con);
                    }
                    
                insert cont;
                }
    }
        
        
    
}