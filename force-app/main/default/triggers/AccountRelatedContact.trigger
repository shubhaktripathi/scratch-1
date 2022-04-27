trigger AccountRelatedContact on Account (after insert) {
    if(trigger.isAfter){  
        if(trigger.isInsert){
         {
             AccountTrigger1 t= new AccountTrigger1();
             t.createContact(trigger.new);
             
         }
            
        }
    
}
}