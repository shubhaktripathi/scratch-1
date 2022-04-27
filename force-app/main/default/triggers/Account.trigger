trigger Account on Account (after insert,before delete,before update,after update) {

   /*Whenever account is created with industry as banking then create a contact for account,
      contact lastname as account name and contact phone as account phone */
    

  if(trigger.isAfter){
        if(trigger.IsInsert){
              AccountTrigger.Method1(trigger.new);
              List<contact> cont= new List<contact>();
              
                }
    /*Write a trigger to update a field (city) in Account when same field(city) is updated in opportunity*/

   /*   if(trigger.isAfter){
          if(trigger.isUpdate){
              Set<id> AccId= new Set<id>();
              for(Account Acc:trigger.new){
                  if(Acc.city__c!=trigger.oldMap.get(Acc.Id).city__c){
                      AccId.add(Acc.Id);
                  }
              }
              
              List<Opportunity> opp= [SELECT id, city__c from Opportunity where AccountId IN:AccId];
              for(Opportunity o:opp){
                  o.city__c=trigger.newMap.get(o.AccountId).city__c;
              }
              
              update opp;
          }
      }
  }*/
    
        /* Write a trigger if we want to prevent user from deleting the account */


    if(trigger.isbefore)
    
        {
            If(trigger.Isdelete){
                  
                for(Account acc : trigger.old){
                acc.adderror('Account Cannot be deleted');
                }
            }
         
        }
  
    
    // Prevent account from deleting, if it has 2 or more contacts
    
    
    
    if(trigger.isDelete && trigger.isBefore){
        set<Id> accId= new set<Id>();
        for(Account acc:trigger.old){
            accId.add(acc.Id);
        }
        
       List<Account> accList=[Select id,name, (select id,name from Contacts) from Account where ID IN:accId];
       
        Map<id,Account> mapAcc=new Map<id,Account>(accList);
        for(Account acc:trigger.old){
            
             if(mapAcc.get(acc.id).contacts.size()>0)
        {
              acc.adderror('Account cannot be deleted');
            
            }
        
        
        }
        
    }

      
      
            
            /* Whenever phone field is updated in account then the name field should also get updated
        with name and phone number in accounts*/
            
            if(trigger.IsUpdate){
                
                for(Account acc:trigger.new){
                    if(acc.Phone!=trigger.oldMap.get(acc.id).Phone){
                        acc.name=acc.name+acc.phone;
                    }
                }
            }
        }
}