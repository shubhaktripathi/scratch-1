public class MyVFFpage {

    public Account acc{get;set;}
    public Contact con{get;set;}
    public opportunity opp{get;set;}
    
    public MyVFFpage ()
    {
    
    Account acc= new Account();
    Contact con= new Contact();
    Opportunity opp= new Opportunity();
    }
    
    public pagereference save()
    {   Account acc= new Account();
        insert acc;
        con.Accountid= acc.id;
        insert con;
        opp.accountid= acc.id;
        insert opp;
        return new pagereference('/'+acc.id);
        
    
    }
}