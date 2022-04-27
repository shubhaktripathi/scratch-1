//2.Prefix first name with Dr when new Lead is created or updated
trigger Leadtrigger on Lead (before insert, before update) {
    
    if((trigger.isBefore && trigger.isUpdate) || (trigger.isBefore && trigger.isInsert)){
        

        for(Lead l:trigger.new){
            l.FirstName= 'Dr' + l.FirstName;
        }
    }
    

}