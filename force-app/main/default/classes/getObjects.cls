public with sharing class getObjects {

    @auraenabled (cacheable=true)
    public static list<string> getObjectList()
    {
        //Returns a map of all sObject names (keys) to sObject tokens (values) for the standard and custom objects defined in your organization.
         Map<String, Schema.SObjectType> gd = Schema.getGlobalDescribe(); 

        // fetch all the object names from the Map
        set<String> keys =gd.keyset();

          // create a list to Store Object names And store them
          List<String> objnames = new list<String> (Keys);

          List<string> customObj= new List<string>();  

          objnames.sort();
          for (String i : objnames) {
            if(i.contains('__c')){

                customObj.add(i);
            }
          
        }
          
          
try{

 
    return customObj;
   
} catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
          }
    
        }



        @auraenabled (cacheable=true)
        public static list<string> getstandardObj()
        {
            //Returns a map of all sObject names (keys) to sObject tokens (values) for the standard and custom objects defined in your organization.
             Map<String, Schema.SObjectType> gd = Schema.getGlobalDescribe(); 
    
            // fetch all the object names from the Map
            set<String> keys =gd.keyset();
    
              // create a list to Store Object names And store them
              List<String> objnames = new list<String> (Keys);
    
              List<string> stdObj= new List<string>();  
    
              objnames.sort();
              for (String i : objnames) {
                if(i.contains('__c')){
    
                  System.debug('hi');
    
    
                }
                else{
                    stdObj.add(i);
    
                }
              
            }
              
              
    try{
    
        //return objnames;
        return stdObj;
       
    } catch (Exception e) {
                throw new AuraHandledException(e.getMessage());
              }
        
            }


            @AuraEnabled
            public static List<sObject> getReocrd(String str){
            
              String s1 = 'select name from ' + str;

              List<sObject> sobjList = Database.query(s1);
             

              try {
                return sobjList;
               
              } catch (Exception e) {
                throw new AuraHandledException(e.getMessage());
              }
            }
    }