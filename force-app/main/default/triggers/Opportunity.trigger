//3. Update Account Rating to ‘Hot ‘on account when opportunity stage equals ‘closed Won’
trigger Opportunity on Opportunity (after insert, after update) {
    if(trigger.isAfter &&( trigger.isInsert || trigger.isUpdate)){
        	
        Set<id> accId= new Set<id>();
        List<Account> Accounts = new List<Account>();
        for(Opportunity opp:trigger.new){
            if(opp.StageName=='Closed Won'){
                
               accId.add(opp.AccountId);
                
                
            }
            
            List<Account> acc= [Select id, name, rating from Account where Id IN:accId];
            if(acc!=null){
                for(Account a:acc){
                    a.Rating='Hot';
                    Accounts.add(a);
                    
                }
            }
            update Accounts;
        }
        
    }
    
}