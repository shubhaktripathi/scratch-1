trigger Contact on Contact (after insert, after update, after delete,before insert) {

    /*Write a trigger to update the field called “Count of Contacts” on Account Object. When
we add the Contacts for that Account then count will populate in the field on the Account
details page. */

     if(trigger.Isafter){
        Set<id> AccountIdset = new Set<id>();
        List<contact> contactList= new List<contact>();
        if(trigger.isDelete){
            
                contactList= trigger.new;            
        }
        else{
            
            contactList= trigger.new;
        }
        
        for(Contact  Con:contactList){
            
            if(con.AccountID!=null){
                AccountIdset.add(con.AccountId);
                
            }
            
            if(trigger.Isupdate){
                Contact oldContact= trigger.oldmap.get(con.id);
                if(oldContact.AccountId!=con.AccountId){
                    AccountIdset.add(con.AccountId);
                    
                }
            }
            
            
            Map<id,Account> accountMap= new Map<id,Account>();
            List<Contact> conList= new List<Contact>();
            conList=[SELECT id,name,AccountId from contact where AccountId IN:AccountIdset];
            for(Contact C:conList){
                if(!    accountMap.containskey(c.AccountId)){
                    accountMap.put(c.AccountId, new Account(Id=c.AccountId, Total_Count_of_Contact__c =1));
                    
                }
                else{
                    
                    Account temp=accountMap.get(c.AccountId);
                    temp.Total_Count_of_Contact__c +=1;
                    accountMap.put(c.AccountId,temp);
                }                
                
            }
              update accountMap.values();
            
            
        }
        
    }
    
    
    /* Prevent Creating Contact If no of contacts are greater than 3 for an Account*/
    
    if(trigger.IsBefore){
        if(trigger.isInsert){
            Set<id> Accid= new set<id>();
            for(Contact Con:trigger.new){

                if(Con.AccountId!=Null){
                    Accid.add(Con.AccountId);
                }                
            }            
             List<contact> ccList = new List<contact> ();

           List<Account> accLst = [select id,(select id from contacts) from account where id IN : Accid] ;
                    for(account accObj : accLst ){
                       for(contact c : accObj.contacts){     
                       ccList.add(c);
                       }
                         }
                      
                    for(contact oCon:trigger.new)   
                     if(ccList.size() > 0 ){
                         oCon.addError('you can not add more then once contact for this account'); 
                           
                         }        }
    }
}